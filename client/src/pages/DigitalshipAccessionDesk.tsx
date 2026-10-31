import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ACCESSION_RECORDS,
  buildAccessionCsv,
  filterAccessionRecords,
  getAccessionPreviewKind,
  getAccessionProfile,
  getAccessionStatusSummary,
  paginateAccessionRecords,
  sortAccessionRecords,
} from "@/lib/accessionRecords";
import LatestBatchReceiptViewer from "@/components/LatestBatchReceiptViewer";

type AccessionValues = {
  recordTitle: string;
  sourceType: string;
  accessStatus: string;
  publicScope: string;
  sourceSummary: string;
  preservationNote: string;
  creatorContext: string;
  sourceFilename: string;
  intendedRoute: string;
  intendedUse: string;
  displayTreatment: string;
};

const METHOD_STEPS = [
  { label: "RECOVER", detail: "Identify the original conversation, file, URL, or memory record without reconstructing absent content." },
  { label: "PRESERVE", detail: "Keep the supplied record, its origin, and any access constraint together before interpretation." },
  { label: "CLASSIFY", detail: "Separate creator-authored material, public sources, private records, and unsupported assertions." },
  { label: "CONNECT", detail: "Link only compatible records to relevant ScrollVerse story, planning, or provenance routes." },
  { label: "EXPAND", detail: "Develop original ideas from the record without treating a source as an external result or approval." },
  { label: "WRITE", detail: "Turn the classified material into a readable source note, scene, chapter, or planning record." },
  { label: "VERIFY", detail: "Assign the right review path for any external, legal, financial, scientific, or operational assertion." },
  { label: "PUBLISH", detail: "Choose a public scope only after the creator has the exact content, rights, and destination decision." },
  { label: "ARCHIVE", detail: "Retain source context, change history, and correction room for future readers." },
  { label: "EVOLVE", detail: "Use the archived record as a starting point for the next accountable creative iteration." },
] as const;

const METHOD_SEQUENCE = "RECOVER → PRESERVE → CLASSIFY → CONNECT → EXPAND → WRITE → VERIFY → PUBLISH → ARCHIVE → EVOLVE";

const INITIAL_VALUES: AccessionValues = {
  recordTitle: "",
  sourceType: "creator-supplied text",
  accessStatus: "available to creator",
  publicScope: "planning only — not public",
  sourceSummary: "",
  preservationNote: "",
  creatorContext: "",
  sourceFilename: "",
  intendedRoute: "not yet selected",
  intendedUse: "",
  displayTreatment: "no display selected — planning record only",
};

const ROUTE_DESTINATIONS: Record<string, { href: string; label: string }> = {
  "New Dominion Story Blueprint": { href: "/new-dominion-story-blueprint", label: "Open New Dominion Story Blueprint" },
  "Nine-Frame Manifestation Planning Packet": { href: "/nine-frame-manifestation-packet", label: "Open Nine-Frame Manifestation Planning Packet" },
  "Fluidity & Corpus Blueprint": { href: "/fluidity-corpus-blueprint", label: "Open Fluidity & Corpus Blueprint" },
  "Episode Brief Builder": { href: "/episode-brief-builder", label: "Open Episode Brief Builder" },
};

function downloadLocalAccession(values: AccessionValues, activeStep: number) {
  const record = {
    recordType: "scrollverse_digitalship_accession_record",
    status: "creator_led_browser_local_draft",
    method: METHOD_STEPS.map((step) => step.label),
    currentMethodLens: METHOD_STEPS[activeStep].label,
    record: values,
    selection: {
      sourceFilenameOrId: values.sourceFilename,
      intendedStoryRoute: values.intendedRoute,
      intendedNarrativeUse: values.intendedUse,
      displayTreatment: values.displayTreatment,
      displayScope: values.publicScope,
    },
    boundaries: {
      upload: "No file uploaded",
      sharing: "No external sharing performed",
      verification: "No legal, financial, scientific, or third-party verification performed",
      publication: "No publication action performed",
    },
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "scrollverse-digitalship-accession-record.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function DigitalshipAccessionDesk() {
  const [values, setValues] = useState<AccessionValues>(INITIAL_VALUES);
  const [activeStep, setActiveStep] = useState(0);
  const [exported, setExported] = useState(false);
  const [recordQuery, setRecordQuery] = useState("");
  const [recordSort, setRecordSort] = useState<"filename" | "largest" | "type">("filename");
  const [selectedRecordFilename, setSelectedRecordFilename] = useState(ACCESSION_RECORDS[0]?.filename ?? "");
  const [detailRecordFilename, setDetailRecordFilename] = useState<string | null>(null);
  const [recordPage, setRecordPage] = useState(1);
  const [recordsReady, setRecordsReady] = useState(false);
  const completedFields = useMemo(
    () => [values.recordTitle, values.sourceType, values.accessStatus, values.publicScope, values.sourceSummary].filter((value) => value.trim()).length,
    [values],
  );
  const activeMethodStep = METHOD_STEPS[activeStep];
  const selectedDestination = ROUTE_DESTINATIONS[values.intendedRoute];
  const selectionNeedsCompletion = !values.sourceFilename.trim() || values.intendedRoute === "not yet selected" || !values.intendedUse.trim();
  const filteredRecords = useMemo(() => sortAccessionRecords(filterAccessionRecords(ACCESSION_RECORDS, recordQuery), recordSort), [recordQuery, recordSort]);
  const recordPageData = useMemo(() => paginateAccessionRecords(filteredRecords, recordPage, 12), [filteredRecords, recordPage]);
  const accessionSummary = useMemo(() => getAccessionStatusSummary(ACCESSION_RECORDS), []);
  const selectedRecord = useMemo(() => getAccessionProfile(selectedRecordFilename), [selectedRecordFilename]);
  const detailRecord = useMemo(() => (detailRecordFilename ? getAccessionProfile(detailRecordFilename) : null), [detailRecordFilename]);

  const updateValue = (field: keyof AccessionValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setExported(false);
  };

  const revealRecords = () => {
    setRecordsReady(true);
  };

  const updateRecordQuery = (query: string) => {
    setRecordQuery(query);
    setRecordPage(1);
    setRecordsReady(true);
  };

  const downloadFilteredCsv = () => {
    const blob = new Blob([buildAccessionCsv(filteredRecords)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "scrollverse-filtered-accession-records.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] text-white">
      <section className="border-b border-[#D7A7FF]/25 bg-[radial-gradient(circle_at_12%_14%,rgba(215,167,255,.17),transparent_31%),radial-gradient(circle_at_88%_15%,rgba(112,217,255,.13),transparent_29%),radial-gradient(circle_at_65%_100%,rgba(255,207,115,.1),transparent_36%),#070913]">
        <div className="container py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#C9F3FF] transition hover:text-white">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#FFE7B3]">BOOK OF DIGITALSHIP · LOCAL SOURCE-RECORD WORKFLOW</p>
          <h1 aria-label="Digitalship Accession Desk" className="mt-4 max-w-5xl text-5xl font-black leading-[.9] tracking-tight md:text-7xl">Digitalship <span className="text-[#D7A7FF]">Accession Desk</span></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#D6E2EE]">A creator-led workspace for turning a conversation, file, link, image, or memory reference into a structured source record. The desk follows the recovery-to-archive method while keeping its limits visible at every stage.</p>
          <p className="mt-5 text-[10px] font-mono font-black tracking-[.15em] text-[#C9F3FF]">{METHOD_SEQUENCE}</p>
          <p className="mt-3 text-sm font-black text-[#EBDFFF]">Browser-local record · export stays on this device.</p>
          <div className="mt-8 rounded-2xl border border-[#FFE7B3]/30 bg-[#FFCF73]/[.06] p-4 text-sm leading-7 text-[#F0F5FA]">No file upload, external sharing, legal verification, financial action, account access, or publication action occurs here.</div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-8 xl:grid-cols-[.82fr_1.18fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[.025] p-5 md:p-6">
            <div className="flex items-end justify-between gap-3"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">THE DIGITALSHIP METHOD</p><h2 className="mt-2 text-2xl font-black">Move a source with care.</h2></div><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[10px] font-mono text-[#C9F3FF]">{completedFields}/5 CORE FIELDS</span></div>
            <div className="mt-6 space-y-2">{METHOD_STEPS.map((step, index) => { const active = index === activeStep; return <button key={step.label} type="button" onClick={() => setActiveStep(index)} aria-pressed={active} className="w-full rounded-xl border p-3 text-left transition hover:-translate-y-0.5" style={{ borderColor: active ? "rgba(215,167,255,.7)" : "rgba(255,255,255,.11)", background: active ? "rgba(215,167,255,.12)" : "rgba(255,255,255,.02)" }}><span className="text-[10px] font-mono tracking-[.16em]" style={{ color: active ? "#EBDFFF" : "#8FA1B3" }}>{String(index + 1).padStart(2, "0")} · {step.label}</span><span className="mt-1 block text-sm font-black text-white">{step.detail}</span></button>; })}</div>
          </aside>

          <section className="rounded-[2rem] border border-[#D7A7FF]/40 bg-[radial-gradient(circle_at_90%_8%,rgba(215,167,255,.16),transparent_30%),rgba(255,255,255,.025)] p-6 md:p-8">
            <p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">ACTIVE METHOD LENS · {activeMethodStep.label}</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">{activeMethodStep.detail}</h2>
            <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Use this form to record what you have, how it may be handled, and what must remain unresolved. The form creates a browser-local JSON record only.</p>

            <section aria-labelledby="accession-records-heading" className="mt-8 rounded-2xl border border-[#70D9FF]/30 bg-[#70D9FF]/[.045] p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">VERIFIED CREATOR-SUPPLIED RECORDS</p>
                  <h3 id="accession-records-heading" className="mt-2 text-2xl font-black">Find a local accession profile.</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#D6E2EE]">Read-only metadata from the 2026-10-18 accession manifest. Hashes identify supplied bytes; they do not establish authorship, rights, or external publication.</p>
                </div>
                <div role="status" aria-live="polite" className="rounded-full border border-[#8CEEDD]/30 bg-[#8CEEDD]/[.08] px-3 py-2 text-[10px] font-mono text-[#BDEEFF]">
                  {recordsReady ? "RECORDS READY · LOCAL ONLY" : "READY TO LOAD · LOCAL ONLY"}
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="block flex-1"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">SEARCH FILENAME, TYPE, OR HASH</span><input aria-label="Search accessioned records" value={recordQuery} onChange={(event) => updateRecordQuery(event.target.value)} placeholder="Example: mp4, implementation, or sha256 prefix" className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none placeholder:text-[#788FA4] focus:border-[#70D9FF] focus:ring-2 focus:ring-[#70D9FF]/20" /></label>
                <label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">SORT ACCESSION RECORDS</span><select aria-label="Sort accession records" value={recordSort} onChange={(event) => { setRecordSort(event.target.value as typeof recordSort); setRecordPage(1); setRecordsReady(true); }} className="mt-2 min-h-12 rounded-xl border border-white/15 bg-[#030713]/65 px-3 text-sm text-white outline-none focus:border-[#70D9FF] focus:ring-2 focus:ring-[#70D9FF]/20"><option value="filename">Filename A–Z</option><option value="largest">Largest first</option><option value="type">Type A–Z</option></select></label>
                <button type="button" onClick={revealRecords} className="min-h-12 rounded-xl border border-[#70D9FF]/40 bg-[#70D9FF]/[.08] px-4 text-sm font-black text-[#BCEEFF] transition hover:bg-[#70D9FF]/[.16] focus:outline-none focus:ring-2 focus:ring-[#70D9FF]/40">{recordsReady ? "Refresh local index" : "Load local index"}</button>
                <button type="button" onClick={downloadFilteredCsv} disabled={!recordsReady || filteredRecords.length === 0} className="min-h-12 rounded-xl border border-[#FFE7B3]/40 bg-[#FFE7B3]/[.08] px-4 text-sm font-black text-[#FFE7B3] transition hover:bg-[#FFE7B3]/[.16] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#FFE7B3]/40">Export filtered CSV</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#C7D7E6]" aria-live="polite">
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5">{recordsReady ? `${filteredRecords.length} matching records` : "Index not loaded"}</span>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5">{accessionSummary.metadataOnly} metadata-only</span>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5">No external actions</span>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2" aria-busy={!recordsReady}>
                {!recordsReady ? <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[.025] p-5 text-sm text-[#AFC2D3] motion-safe:animate-pulse">Local accession index is ready to load. Nothing is fetched or played.</div> : recordPageData.records.map((record) => <div key={record.filename} className="rounded-xl border border-white/10 bg-white/[.025] p-3"><button type="button" onClick={() => { setSelectedRecordFilename(record.filename); setDetailRecordFilename(record.filename); }} aria-label={`Open details for ${record.filename}`} aria-pressed={selectedRecordFilename === record.filename} className="min-h-16 w-full text-left transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#70D9FF]/50"><span className="block truncate text-sm font-black text-white">{record.filename}</span><span className="mt-1 block text-[11px] text-[#AFC2D3]">{record.classification} · {record.bytes.toLocaleString()} bytes</span></button><span className="mt-2 block text-[10px] font-mono uppercase tracking-[.14em] text-[#8CEEDD]">Details · metadata preview only</span></div>)}
                {recordsReady && filteredRecords.length === 0 && <p className="md:col-span-2 rounded-xl border border-[#FFCF73]/30 bg-[#FFCF73]/[.08] p-4 text-sm font-bold text-[#FFE7B3]">No accessioned record matches that search.</p>}
              </div>
              {recordsReady && recordPageData.totalPages > 1 && <nav aria-label="Accession record pages" className="mt-5 flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-[#C7D7E6]">Page {recordPageData.page} of {recordPageData.totalPages}</span><div className="flex gap-2"><button type="button" onClick={() => setRecordPage((page) => Math.max(1, page - 1))} disabled={recordPageData.page === 1} className="min-h-11 rounded-lg border border-white/15 px-3 text-xs font-black text-white disabled:opacity-40">Previous</button><button type="button" onClick={() => setRecordPage((page) => Math.min(recordPageData.totalPages, page + 1))} disabled={recordPageData.page === recordPageData.totalPages} className="min-h-11 rounded-lg border border-white/15 px-3 text-xs font-black text-white disabled:opacity-40">Next</button></div></nav>}
              {recordsReady && selectedRecord && <div className="mt-5 rounded-xl border border-[#D7A7FF]/35 bg-[#D7A7FF]/[.06] p-5" aria-live="polite"><p className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">READ-ONLY RECORD PROFILE</p><h4 className="mt-2 break-words text-lg font-black text-white">{selectedRecord.filename}</h4><dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2"><div><dt className="text-[#B9A5D5]">Classification</dt><dd className="mt-1 text-[#F0E9FF]">{selectedRecord.classification}</dd></div><div><dt className="text-[#B9A5D5]">Display scope</dt><dd className="mt-1 text-[#F0E9FF]">{selectedRecord.displayScope}</dd></div><div><dt className="text-[#B9A5D5]">Bytes</dt><dd className="mt-1 text-[#F0E9FF]">{selectedRecord.bytes.toLocaleString()}</dd></div><div className="sm:col-span-2"><dt className="text-[#B9A5D5]">SHA-256</dt><dd className="mt-1 break-all font-mono text-[#F0E9FF]">{selectedRecord.sha256}</dd></div></dl><p className="mt-4 text-xs leading-6 text-[#C7D7E6]">Accessioned {selectedRecord.accessionDate}. This profile does not open, upload, transform, publish, or validate the source.</p></div>}
            </section>

            <LatestBatchReceiptViewer />

            {detailRecord && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#02040b]/80 p-4 backdrop-blur-sm" role="presentation"><div role="dialog" aria-modal="true" aria-labelledby="accession-detail-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-[#70D9FF]/40 bg-[#080d1b] p-6 shadow-2xl md:p-8"><div className="flex items-start justify-between gap-5"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#BCEEFF]">ACCESSION DETAIL · READ ONLY</p><h3 id="accession-detail-title" className="mt-2 break-words text-2xl font-black text-white">{detailRecord.filename}</h3></div><button type="button" aria-label="Close accession record details" onClick={() => setDetailRecordFilename(null)} className="min-h-11 min-w-11 rounded-full border border-white/20 px-3 text-xl text-white focus:outline-none focus:ring-2 focus:ring-[#70D9FF]/60">×</button></div><div className="mt-6 grid gap-4 md:grid-cols-[.8fr_1.2fr]"><div className="rounded-2xl border border-[#D7A7FF]/30 bg-[#D7A7FF]/[.06] p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">RELATED FILE PREVIEW</p><div className="mt-4 flex min-h-40 items-center justify-center rounded-xl border border-dashed border-[#D7A7FF]/40 bg-[#030713]/60 p-5 text-center"><div><p className="text-4xl">{getAccessionPreviewKind(detailRecord.filename) === "image" ? "▧" : getAccessionPreviewKind(detailRecord.filename) === "video" ? "▶" : getAccessionPreviewKind(detailRecord.filename) === "audio" ? "◖" : "{}"}</p><p className="mt-3 text-sm font-black text-white">{getAccessionPreviewKind(detailRecord.filename)} preview</p><p className="mt-2 text-xs leading-5 text-[#C7D7E6]">Metadata placeholder only. The supplied file is not opened, fetched, played, or embedded.</p></div></div></div><div><p className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">FULL METADATA</p><dl className="mt-4 grid gap-3 text-sm"><div><dt className="text-[#B9A5D5]">Classification</dt><dd className="mt-1 text-[#F0E9FF]">{detailRecord.classification}</dd></div><div><dt className="text-[#B9A5D5]">Display scope</dt><dd className="mt-1 text-[#F0E9FF]">{detailRecord.displayScope}</dd></div><div><dt className="text-[#B9A5D5]">Byte count</dt><dd className="mt-1 text-[#F0E9FF]">{detailRecord.bytes.toLocaleString()}</dd></div><div><dt className="text-[#B9A5D5]">SHA-256</dt><dd className="mt-1 break-all font-mono text-[#F0E9FF]">{detailRecord.sha256}</dd></div></dl></div></div><div className="mt-6 rounded-2xl border border-white/10 bg-white/[.025] p-5"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">METADATA HISTORY</p><ol className="mt-4 space-y-4">{detailRecord.metadataHistory.map((event) => <li key={`${event.date}-${event.event}`} className="border-l-2 border-[#70D9FF]/50 pl-4"><p className="text-xs font-mono text-[#8CEEDD]">{event.date}</p><p className="mt-1 text-sm font-black text-white">{event.event}</p><p className="mt-1 text-xs leading-5 text-[#C7D7E6]">{event.detail}</p></li>)}</ol></div><p className="mt-6 text-xs leading-6 text-[#C7D7E6]">This detail view is a local presentation of preserved metadata. It does not establish authorship, rights, authenticity, external deployment, or publication.</p></div></div>}

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">RECORD TITLE</span><input value={values.recordTitle} onChange={(event) => updateValue("recordTitle", event.target.value)} placeholder="Example: Digitalship conversation chapter" className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none placeholder:text-[#788FA4] focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20" /></label>
              <label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">SOURCE TYPE</span><select value={values.sourceType} onChange={(event) => updateValue("sourceType", event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20"><option>creator-supplied text</option><option>creator-supplied image</option><option>creator-supplied video or audio</option><option>public URL or repository</option><option>conversation or replay record</option><option>other reference</option></select></label>
              <label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">ACCESS STATUS</span><select value={values.accessStatus} onChange={(event) => updateValue("accessStatus", event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20"><option>available to creator</option><option>available as public source</option><option>summary only — original unavailable</option><option>private or restricted — do not display</option><option>unknown — preserve before use</option></select></label>
              <label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">PUBLIC SCOPE</span><select value={values.publicScope} onChange={(event) => updateValue("publicScope", event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20"><option>planning only — not public</option><option>creator narrative — attribution required</option><option>public source link — source label required</option><option>needs rights and public-use review</option><option>do not publish</option></select></label>
            </div>

            <label className="mt-5 block"><span className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">SOURCE SUMMARY</span><textarea value={values.sourceSummary} onChange={(event) => updateValue("sourceSummary", event.target.value)} placeholder="Describe what is actually available, not what is inferred from it." rows={4} className="mt-2 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-[#788FA4] focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20" /></label>
            <div className="mt-5 grid gap-5 md:grid-cols-2"><label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">PRESERVATION NOTE</span><textarea value={values.preservationNote} onChange={(event) => updateValue("preservationNote", event.target.value)} placeholder="Original location, filename, date context, or access caution." rows={4} className="mt-2 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-[#788FA4] focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20" /></label><label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#C9F3FF]">CREATOR CONTEXT</span><textarea value={values.creatorContext} onChange={(event) => updateValue("creatorContext", event.target.value)} placeholder="What role does this record have in the creator’s original world, book, chapter, or planning path?" rows={4} className="mt-2 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-[#788FA4] focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/20" /></label></div>

            <div className="mt-6 rounded-2xl border border-[#70D9FF]/35 bg-[#70D9FF]/[.055] p-5 md:p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">EXACT SOURCE-SELECTION DECISION</p><h3 className="mt-2 text-xl font-black text-white">Name one source, then keep its next use visible.</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Record an exact filename or identifier, the intended first-party story route, the narrative role, and its display treatment. This does not access the file or convert a planning choice into a public release.</p><div className="mt-5 grid gap-5 md:grid-cols-2"><label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">SOURCE FILENAME OR ID</span><input value={values.sourceFilename} onChange={(event) => updateValue("sourceFilename", event.target.value)} placeholder="Example: source-file.mp4" className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none placeholder:text-[#788FA4] focus:border-[#70D9FF] focus:ring-2 focus:ring-[#70D9FF]/20" /></label><label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">INTENDED STORY ROUTE</span><select value={values.intendedRoute} onChange={(event) => updateValue("intendedRoute", event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none focus:border-[#70D9FF] focus:ring-2 focus:ring-[#70D9FF]/20"><option>not yet selected</option><option>New Dominion Story Blueprint</option><option>Nine-Frame Manifestation Planning Packet</option><option>Fluidity &amp; Corpus Blueprint</option><option>Episode Brief Builder</option><option>another first-party planning route</option></select></label><label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">INTENDED NARRATIVE USE</span><textarea value={values.intendedUse} onChange={(event) => updateValue("intendedUse", event.target.value)} placeholder="Example: story reference for New Dominion Act II, not yet a display decision." rows={3} className="mt-2 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-[#788FA4] focus:border-[#70D9FF] focus:ring-2 focus:ring-[#70D9FF]/20" /></label><label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">DISPLAY TREATMENT</span><select value={values.displayTreatment} onChange={(event) => updateValue("displayTreatment", event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none focus:border-[#70D9FF] focus:ring-2 focus:ring-[#70D9FF]/20"><option>no display selected — planning record only</option><option>text-only story reference</option><option>future visual review — no display</option><option>needs source and rights review</option></select></label></div><p className="mt-5 border-t border-[#70D9FF]/20 pt-4 text-xs leading-6 text-[#C7D7E6]">No selected file is opened, uploaded, embedded, played, transformed, or released by this record.</p>{selectedDestination && <div className="mt-5 rounded-xl border border-[#70D9FF]/30 bg-[#030713]/45 p-4"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">CONTINUE TO SELECTED STORY ROUTE</p><Link href={selectedDestination.href} className="mt-3 inline-flex rounded-lg bg-[#70D9FF] px-4 py-2 text-sm font-black text-[#071426] transition hover:brightness-110">{selectedDestination.label} →</Link><p className="mt-3 text-xs leading-6 text-[#C7D7E6]">The local accession record is not transferred automatically. Keep or export it as the source decision record before continuing.</p></div>}</div>

            <div className="mt-6 flex flex-wrap items-center gap-3">{selectionNeedsCompletion && <p role="status" className="w-full rounded-xl border border-[#FFCF73]/35 bg-[#FFCF73]/[.08] px-4 py-3 text-sm font-bold leading-6 text-[#FFE7B3]"><span className="text-[10px] font-mono tracking-[.16em]">SELECTION READY CHECK</span><br />Selection incomplete — add a source filename or ID, intended story route, and narrative use before export.</p>}<button type="button" disabled={selectionNeedsCompletion} onClick={() => { downloadLocalAccession(values, activeStep); setExported(true); }} className="rounded-xl bg-[#D7A7FF] px-5 py-3 text-sm font-black text-[#070611] transition hover:brightness-110 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-45">Export browser-local record ↓</button><button type="button" onClick={() => { setValues(INITIAL_VALUES); setActiveStep(0); setExported(false); }} className="rounded-xl border border-white/20 bg-white/[.04] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[.1]">Clear draft</button>{exported && <span role="status" className="text-sm font-black text-[#BDEEFF]">Local record exported. No upload or publication occurred.</span>}</div>
          </section>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07101E]"><div className="container py-12 md:py-16"><div className="grid gap-5 md:grid-cols-3"><article className="rounded-[1.6rem] border border-[#70D9FF]/35 bg-[#70D9FF]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">CONVERSATION AS ARCHAEOLOGY</p><h3 className="mt-3 text-2xl font-black">Preserve before conclusion.</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">An original exchange can become a chapter source, but only after its available record, author context, and access boundary are retained.</p></article><article className="rounded-[1.6rem] border border-[#D7A7FF]/35 bg-[#D7A7FF]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">SOURCE BEFORE SPECTACLE</p><h3 className="mt-3 text-2xl font-black">Classify what is known.</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Creator authorship, public reference, private material, and missing evidence can stand side by side without being collapsed into a single claim.</p></article><article className="rounded-[1.6rem] border border-[#FFCF73]/35 bg-[#FFCF73]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE7B3]">HUMAN DECISIONS STAY HUMAN</p><h3 className="mt-3 text-2xl font-black">Expand with a visible gate.</h3><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The record can inform a future story, research, rights, or publication decision; it cannot make that consequential decision on the creator’s behalf.</p></article></div></div></section>

      <section className="container py-12 md:py-16"><div className="grid gap-5 rounded-[2rem] border border-[#70D9FF]/30 bg-[radial-gradient(circle_at_88%_12%,rgba(112,217,255,.13),transparent_30%),rgba(112,217,255,.035)] p-6 md:grid-cols-[1.25fr_.75fr] md:p-8"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#BCEEFF]">CONNECT THE RECORD</p><h2 className="mt-3 text-3xl font-black">Bring an accession into the creator workflow.</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">After local export, use the Planning Atlas to choose an appropriate first-party story, brief, or provenance route. The accession record remains a planning aid until its exact next step is intentionally selected.</p></div><div className="flex items-center md:justify-end"><Link href="/planning-atlas" className="inline-flex rounded-xl bg-[#70D9FF] px-5 py-3 text-sm font-black text-[#071426] transition hover:brightness-110">Open Planning Atlas →</Link></div></div></section>
      <section className="container pb-12 md:pb-16"><div className="grid gap-5 rounded-[2rem] border border-[#70D9FF]/30 bg-[radial-gradient(circle_at_90%_10%,rgba(112,217,255,.14),transparent_30%),rgba(112,217,255,.035)] p-6 md:grid-cols-[1.2fr_.8fr] md:p-8"><div><p className="text-[10px] font-mono tracking-[.18em] text-[#BCEEFF]">SOURCE-LEDGER REFERENCE</p><h2 className="mt-3 text-3xl font-black">Need a categorized source summary first?</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">Open the read-only Omniversal Source Ledger to review the available source categories, planning treatments, and retained boundaries before naming one exact source in this local record.</p></div><div className="flex items-center md:justify-end"><Link href="/omniversal-source-ledger" className="inline-flex rounded-xl bg-[#70D9FF] px-5 py-3 text-sm font-black text-[#071426] transition hover:brightness-110">Open Omniversal Source Ledger →</Link></div></div></section>
    </main>
  );
}
