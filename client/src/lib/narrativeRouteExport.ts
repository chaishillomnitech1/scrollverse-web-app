export type NarrativeRouteExportSection = {
  number: number;
  title: string;
  status: string;
  summary: string;
};

export type NarrativeRouteExport = {
  title: string;
  route: string;
  scope: string;
  sections: NarrativeRouteExportSection[];
  editorialModel?: string;
  selectedRecord?: string;
  creatorNotes?: string;
};

const SOURCE_BOUNDARY = "Narrative-only browser-local export. No upload, external sharing, publication, media release, account, financial, or rights action occurs.";

function escapeCsvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

/** Creates a portable, browser-local CSV representation of a planning route. */
export function createNarrativeRouteCsv(record: NarrativeRouteExport) {
  const metadataRows = [
    ["field", "value"],
    ["title", record.title],
    ["route", record.route],
    ["scope", record.scope],
    ["boundary", SOURCE_BOUNDARY],
    ["editorial_model", record.editorialModel ?? ""],
    ["selected_record", record.selectedRecord ?? ""],
    ["creator_notes", record.creatorNotes ?? ""],
    [],
    ["section_number", "section_title", "record_status", "summary"],
  ];
  const sectionRows = record.sections.map((section) => [section.number, section.title, section.status, section.summary]);
  return [...metadataRows, ...sectionRows].map((row) => row.map((cell) => escapeCsvCell(cell ?? "")).join(",")).join("\r\n");
}

function normalizePdfText(value: string) {
  const replacements: Record<string, string> = {
    "→": "->",
    "←": "<-",
    "×": "x",
    "—": "-",
    "–": "-",
    "•": "-",
    "…": "...",
    "’": "'",
    "‘": "'",
    "“": '"',
    "”": '"',
  };
  return value
    .replace(/[→←×—–•…’‘“”]/g, (character) => replacements[character] ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "?");
}

function escapePdfText(value: string) {
  return normalizePdfText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapPdfText(value: string, width = 84) {
  const words = normalizePdfText(value).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function buildPdfPages(record: NarrativeRouteExport) {
  const lines = [
    { text: record.title, size: 18, gap: 26 },
    { text: "NARRATIVE-ONLY ROUTE EXPORT", size: 10, gap: 17 },
    { text: `Route: ${record.route}`, size: 10, gap: 15 },
    { text: `Scope: ${record.scope}`, size: 10, gap: 15 },
    { text: `Boundary: ${SOURCE_BOUNDARY}`, size: 9, gap: 14 },
    ...(record.editorialModel ? [{ text: `Editorial model: ${record.editorialModel}`, size: 9, gap: 14 }] : []),
    ...(record.selectedRecord ? [{ text: `Selected record: ${record.selectedRecord}`, size: 9, gap: 14 }] : []),
    ...(record.creatorNotes ? [{ text: `Creator notes: ${record.creatorNotes}`, size: 9, gap: 16 }] : []),
    { text: "Planning records", size: 13, gap: 20 },
    ...record.sections.flatMap((section) => [
      { text: `${String(section.number).padStart(2, "0")} | ${section.title}`, size: 11, gap: 15 },
      { text: `Status: ${section.status}`, size: 9, gap: 13 },
      { text: section.summary, size: 9, gap: 15 },
    ]),
  ];

  const pages: Array<Array<{ text: string; size: number; gap: number }>> = [[]];
  let remaining = 720;
  lines.forEach((entry) => {
    const wrapped = wrapPdfText(entry.text);
    const required = Math.max(entry.gap, wrapped.length * entry.gap);
    if (remaining < required + 18 && pages.at(-1)?.length) {
      pages.push([]);
      remaining = 720;
    }
    wrapped.forEach((text) => {
      pages.at(-1)?.push({ text, size: entry.size, gap: entry.gap });
      remaining -= entry.gap;
    });
  });
  return pages;
}

/** Builds a compact standard-PDF document without uploading route data. */
export function createNarrativeRoutePdf(record: NarrativeRouteExport) {
  const pages = buildPdfPages(record);
  const pageObjectNumbers = pages.map((_, index) => 4 + index * 2);
  const objects = new Map<number, string>();
  objects.set(1, "<< /Type /Catalog /Pages 2 0 R >>");
  objects.set(2, `<< /Type /Pages /Kids [${pageObjectNumbers.map((number) => `${number} 0 R`).join(" ")}] /Count ${pages.length} >>`);
  objects.set(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  pages.forEach((page, index) => {
    const pageObject = pageObjectNumbers[index];
    const contentObject = pageObject + 1;
    const body = ["BT", ...page.flatMap((line, lineIndex) => [
      `/F1 ${line.size} Tf`,
      `1 0 0 1 52 ${760 - page.slice(0, lineIndex).reduce((total, previous) => total + previous.gap, 0)} Tm`,
      `(${escapePdfText(line.text)}) Tj`,
    ]), "ET"].join("\n");
    objects.set(pageObject, `<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R >> >> /MediaBox [0 0 612 792] /Contents ${contentObject} 0 R >>`);
    objects.set(contentObject, `<< /Length ${body.length} >>\nstream\n${body}\nendstream`);
  });

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  const objectCount = 3 + pages.length * 2;
  for (let index = 1; index <= objectCount; index += 1) {
    offsets[index] = pdf.length;
    pdf += `${index} 0 obj\n${objects.get(index)}\nendobj\n`;
  }
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objectCount; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function downloadBrowserLocalFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

/** Starts a browser-local PDF download. Route content is never sent to a service. */
export function downloadNarrativeRoutePdf(record: NarrativeRouteExport, filename: string) {
  downloadBrowserLocalFile(createNarrativeRoutePdf(record), filename);
}

/** Starts a browser-local CSV download. Route content is never sent to a service. */
export function downloadNarrativeRouteCsv(record: NarrativeRouteExport, filename: string) {
  const csv = createNarrativeRouteCsv(record);
  downloadBrowserLocalFile(new Blob([csv], { type: "text/csv;charset=utf-8" }), filename);
}
