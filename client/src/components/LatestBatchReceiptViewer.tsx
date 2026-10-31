import { useMemo, useState } from "react";
import { Check, Copy, Fingerprint, ShieldCheck } from "lucide-react";
import {
  OCT30_LATEST_BATCH_ACCESSION_DATE,
  OCT30_LATEST_BATCH_BOUNDARY,
  OCT30_LATEST_BATCH_MANIFEST_ID,
  OCT30_LATEST_BATCH_RECEIPTS,
} from "@/data/oct30LatestSourceBatch";

type ReceiptType = "all" | "text/plain" | "text/html" | "image/jpeg" | "video/mp4";

export default function LatestBatchReceiptViewer() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ReceiptType>("all");
  const [copied, setCopied] = useState<string | null>(null);

  const filteredReceipts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return OCT30_LATEST_BATCH_RECEIPTS.filter((receipt) => {
      const matchesType = type === "all" || receipt.mime === type;
      const matchesQuery = !normalizedQuery || [receipt.filename, receipt.mime, receipt.sha256].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesType && matchesQuery;
    });
  }, [query, type]);

  const copyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(hash);
      window.setTimeout(() => setCopied((current) => (current === hash ? null : current)), 1600);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section aria-labelledby="oct30-receipt-viewer-heading" className="mt-8 rounded-[2rem] border border-[#7CFFBB]/25 bg-[radial-gradient(circle_at_90%_8%,rgba(124,255,187,.13),transparent_32%),rgba(255,255,255,.025)] p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-mono tracking-[.16em] text-[#A7F3C1]"><Fingerprint className="h-4 w-4" aria-hidden="true" /> LATEST SOURCE BATCH · METADATA RECEIPTS</p>
          <h2 id="oct30-receipt-viewer-heading" className="mt-2 text-2xl font-black text-white">Oct 30 creator-material index</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Search filenames, MIME types, or SHA-256 prefixes across the newest local receipt batch. No source body is opened, rendered, played, or executed here; this surface exposes metadata only.</p>
        </div>
        <div className="rounded-xl border border-[#7CFFBB]/30 bg-[#7CFFBB]/[.06] px-4 py-3 text-right">
          <p className="text-[10px] font-mono tracking-[.12em] text-[#A7F3C1]">RECEIPT SET</p>
          <p className="mt-1 text-xl font-black text-[#7CFFBB]">{OCT30_LATEST_BATCH_RECEIPTS.length} records</p>
          <p className="text-[10px] font-mono text-[#AFC0CF]">{OCT30_LATEST_BATCH_MANIFEST_ID}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#FFE7B3]/25 bg-[#FFE7B3]/[.05] p-4 text-xs leading-6 text-[#F0F5FA]">
        <strong className="text-[#FFE7B3]">METADATA-ONLY:</strong> {OCT30_LATEST_BATCH_BOUNDARY}.
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">SEARCH LATEST RECEIPT BATCH</span><input aria-label="Search latest receipt batch" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filename, MIME type, or SHA-256 prefix" className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-4 text-sm text-white outline-none placeholder:text-[#788FA4] focus:border-[#7CFFBB] focus:ring-2 focus:ring-[#7CFFBB]/20" /></label>
        <label className="block"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">FILTER TYPE</span><select aria-label="Filter latest receipt batch by type" value={type} onChange={(event) => setType(event.target.value as ReceiptType)} className="mt-2 min-h-12 w-full rounded-xl border border-white/15 bg-[#030713]/65 px-3 text-sm text-white outline-none focus:border-[#7CFFBB] focus:ring-2 focus:ring-[#7CFFBB]/20"><option value="all">All types</option><option value="text/plain">Text</option><option value="text/html">HTML</option><option value="image/jpeg">Images</option><option value="video/mp4">Video</option></select></label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#C7D7E6]" aria-live="polite">
        <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5">{filteredReceipts.length} matching records</span>
        <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5">Accessioned {OCT30_LATEST_BATCH_ACCESSION_DATE}</span>
        <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5">No external actions</span>
      </div>

      <div className="mt-5 grid gap-3" aria-live="polite">
        {filteredReceipts.map((receipt) => (
          <article key={`${receipt.filename}:${receipt.sha256}`} className="rounded-xl border border-white/10 bg-black/20 p-4 transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#7CFFBB]/50 motion-safe:hover:bg-[#7CFFBB]/[.06] motion-reduce:transition-none">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0"><p className="break-all text-sm font-black text-white">{receipt.filename}</p><p className="mt-1 text-[10px] font-mono uppercase tracking-[.1em] text-[#AFC0CF]">{receipt.mime} · {receipt.bytes.toLocaleString()} bytes</p></div>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#7CFFBB]/30 bg-[#7CFFBB]/10 px-2.5 py-1 text-[10px] font-mono text-[#A7F3C1]"><ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> METADATA-ONLY</span>
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><p className="break-all text-[11px] font-mono leading-5 text-[#9DEBFF]"><span className="text-[#AFC0CF]">SHA-256 · </span>{receipt.sha256}</p><button type="button" onClick={() => void copyHash(receipt.sha256)} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#9DEBFF]/35 bg-[#9DEBFF]/[.06] px-3 text-[11px] font-black text-[#BCEEFF] transition hover:bg-[#9DEBFF]/[.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{copied === receipt.sha256 ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />} {copied === receipt.sha256 ? "Copied" : "Copy SHA-256"}</button></div>
          </article>
        ))}
        {filteredReceipts.length === 0 && <p className="rounded-xl border border-white/10 bg-white/[.025] p-5 text-sm text-[#AFC2D3]">No receipt matches that search. The source body remains untouched.</p>}
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs text-[#AFC0CF]"><ShieldCheck className="h-4 w-4 text-[#7CFFBB]" aria-hidden="true" /> Browser-local read-only metadata surface; hashes identify supplied bytes, not authorship, rights, or publication.</p>
    </section>
  );
}
