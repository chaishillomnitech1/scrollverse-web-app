import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const sourceDir = "/home/ubuntu/upload";
const outputDir = "/home/ubuntu/scrollverse-portal/docs";
const acceptedExtensions = new Set([".webp", ".gif", ".png", ".jpeg", ".jpg"]);

const accessions = new Map([
  ["780342170_1595206668807230_5658978462756720024_n.webp", "SV-EVO-001"],
  ["780520967_1065858366223990_3271803570171195693_n.webp", "SV-EVO-002"],
  ["780238741_1068001089113769_7778904387333172771_n.webp", "SV-EVO-003"],
  ["780201782_1261951042647206_330645861557828272_n.webp", "SV-EVO-004"],
  ["780266751_3403471169831225_9156535511846114359_n.webp", "SV-EVO-005"],
  ["774883606_1397465725865338_178016350610670731_n.webp", "SV-EVO-006"],
  ["780161176_1728226311724866_3775251990020906851_n.gif", "SV-EVO-007"],
  ["779728956_2039147510038990_7345657296617547530_n.webp", "SV-EVO-008"],
  ["778902449_1312218247651319_917225483648398045_n.webp", "SV-EVO-009"],
  ["780748644_1048871260883560_7194639821646281306_n.gif", "SV-EVO-010"],
  ["780520972_965509582615698_5540620332686900924_n.webp", "SV-EVO-011"],
  ["778938611_4550072005216657_2244897798349723924_n.gif", "SV-EVO-012"],
  ["780374539_1797329517934236_5705747323956403387_n.webp", "SV-EVO-013"],
  ["780380847_1056691323510302_4517851240306848686_n.gif", "SV-EVO-014"],
  ["780503607_1565108678740937_7120597408417150464_n.gif", "SV-EVO-015"],
]);

const reviewedDescriptions = new Map([
  ["SV-EVO-001", "Four-panel illustrated Evolution poster from instinct and office calculation to a blue futuristic figure; token and profit text appears as artwork."],
  ["SV-EVO-002", "Blue futuristic illustration of an armored character amid code panels, drones, tokens, and decorative price-style screens."],
  ["SV-EVO-013", "Vertical black leather-textured poster with ornate gold framing, ‘Who you got?’, a Chais nameplate, and a circular ScrollVerse 963Hz Sovereign emblem."],
  ["SV-EVO-014", "Vertical motion artwork showing three dark stylized faces above a misty landscape under a cloudy sky and warm horizon light."],
  ["SV-EVO-015", "Vertical motion artwork showing a gold-toned chain and a large clear faceted pendant against a dark background."],
]);

const familyFor = (name, extension) => {
  if (name.startsWith("IMG_")) return "IMG sequence";
  if (name.startsWith("att.")) return "Attachment JPEG sequence";
  if (extension === ".webp" || extension === ".gif") return "Numbered visual and motion works";
  return "Other visual source";
};

const fileSummary = (absolutePath) => {
  try {
    return execFileSync("file", ["-b", absolutePath], { encoding: "utf8" }).trim();
  } catch {
    return "Format summary unavailable";
  }
};

const files = readdirSync(sourceDir)
  .filter((name) => acceptedExtensions.has(path.extname(name).toLowerCase()))
  .sort((a, b) => a.localeCompare(b))
  .map((name) => {
    const absolutePath = path.join(sourceDir, name);
    const extension = path.extname(name).toLowerCase();
    const bytes = readFileSync(absolutePath);
    return {
      filename: name,
      extension: extension.slice(1).toUpperCase(),
      family: familyFor(name, extension),
      bytes: statSync(absolutePath).size,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      formatSummary: fileSummary(absolutePath),
      accession: accessions.get(name) ?? null,
    };
  });

const instancesByHash = new Map();
for (const file of files) {
  const existing = instancesByHash.get(file.sha256) ?? [];
  existing.push(file.filename);
  instancesByHash.set(file.sha256, existing);
}

const records = files.map((file) => {
  const duplicates = instancesByHash.get(file.sha256) ?? [];
  const duplicateCluster = duplicates.length > 1 ? `Duplicate cluster ${file.sha256.slice(0, 12)} (${duplicates.length} files)` : "Unique hash in current scan";
  const accessionState = file.accession ? "Browser-local exhibit accession" : file.filename === "IMG_1637(2).png" ? "Private review" : "Source intake";
  const displayState = file.accession ? "public image released in browser-local exhibit" : file.filename === "IMG_1637(2).png" ? "private source context; do not display" : "requires owner display review";
  const visibleNote = reviewedDescriptions.get(file.accession) ?? "Detailed visible-content description has not yet been added; retain as a source-labeled visual file pending direct review.";
  const altDraft = reviewedDescriptions.get(file.accession) ?? `Owner-supplied ${file.extension.toLowerCase()} visual file; detailed accessibility description pending direct review.`;
  return { ...file, duplicateCluster, accessionState, displayState, visibleNote, altDraft };
});

const countBy = (items, selector) => [...items.reduce((map, item) => map.set(selector(item), (map.get(selector(item)) ?? 0) + 1), new Map())].sort(([left], [right]) => String(left).localeCompare(String(right)));
const escapeCell = (value) => String(value).replaceAll("|", "\\|");
const totalBytes = records.reduce((total, record) => total + record.bytes, 0);
const duplicateGroups = [...instancesByHash.entries()].filter(([, names]) => names.length > 1).sort(([left], [right]) => left.localeCompare(right));

const markdown = [
  "# Phase 590 — Direct Source Manifest: Evolution Lookbook Visual Intake",
  "",
  "## Scope and Status",
  "",
  `This manifest records the **${records.length} image files** currently present in the owner-supplied local intake directory at generation time. SHA-256 values identify the received file bytes; they do not certify authorship, provenance, public-display permission, or external release status. Each record is therefore separated into a browser-local exhibit, private review, or source-intake state.`,
  "",
  "| Measure | Current scan |",
  "|---|---:|",
  `| Visual files | ${records.length} |`,
  `| Unique content hashes | ${instancesByHash.size} |`,
  `| Duplicate-hash clusters | ${duplicateGroups.length} |`,
  `| Repeated instances beyond the first | ${records.length - instancesByHash.size} |`,
  `| Total byte size | ${totalBytes.toLocaleString()} |`,
  "",
  "## Source-Family Counts",
  "",
  "| Source family | Files |",
  "|---|---:|",
  ...countBy(records, (record) => record.family).map(([family, count]) => `| ${family} | ${count} |`),
  "",
  "## Collection Group Labels",
  "",
  "| Group | Scope | Current state |",
  "|---|---|---|",
  "| Browser-local Evolution Lookbook | Fifteen named `SV-EVO` accessions | Public browser exhibit with per-item cards and accessibility text |",
  "| Numbered visual and motion works | Remaining WEBP and GIF source files | Source intake; selected items require direct review before public display |",
  "| IMG sequence | PNG source files supplied under `IMG_` filenames | Source intake, except the identified private-review candidate |",
  "| Attachment JPEG sequence | JPEG source files supplied under `att.` filenames | Source intake; duplicate clusters are not separate accessions |",
  "| Other visual source | Remaining PNG/JPEG/JPG source files | Source intake pending group selection and direct review |",
  "",
  "## Per-File Source Record",
  "",
  "| Filename | Format / local summary | SHA-256 | Family | Duplicate cluster | Accession review | Visible-content note | Alt-text draft | Display boundary |",
  "|---|---|---|---|---|---|---|---|---|",
  ...records.map((record) => `| ${escapeCell(record.filename)} | ${escapeCell(record.formatSummary)} | \`${record.sha256}\` | ${record.family} | ${record.duplicateCluster} | ${record.accession ?? "—"} · ${record.accessionState} | ${escapeCell(record.visibleNote)} | ${escapeCell(record.altDraft)} | ${record.displayState} |`),
  "",
  "## Duplicate-Hash Clusters",
  "",
  "Each cluster below contains identical received bytes in more than one filename. A duplicate cluster is an intake observation only; it is not a claim that the files are original, authorized, publicly displayable, or interchangeable for release.",
  "",
  "| SHA-256 | File instances |",
  "|---|---|",
  ...duplicateGroups.map(([hash, names]) => `| \`${hash}\` | ${names.map(escapeCell).join("<br />")} |`),
  "",
  "## Public-Display and Correction Path",
  "",
  "The current browser-local Evolution Lookbook uses only its fifteen named accessions. All other files remain source intake unless an owner-selected collection group receives a neutral visible-content description, accessibility draft, display decision, and correction record. New source evidence can be appended by filename and SHA-256 without overwriting the received file record. This manifest does not upload, publish, price, list, mint, transfer, connect a wallet, or activate a coin, token, marketplace, or provider.",
  "",
].join("\n");

mkdirSync(outputDir, { recursive: true });
writeFileSync(path.join(outputDir, "phase590-direct-source-manifest.md"), markdown);
writeFileSync(path.join(outputDir, "phase590-direct-source-manifest.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), records, duplicateGroups }, null, 2)}\n`);
console.log(`Generated manifest for ${records.length} visual files with ${instancesByHash.size} unique hashes and ${duplicateGroups.length} duplicate clusters.`);
