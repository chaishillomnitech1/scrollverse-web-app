import { useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Fingerprint, ShieldCheck } from "lucide-react";
import type { Block145Receipt } from "./Block145Gallery";

type ReceiptViewerProps = {
  manifestId: string;
  receipts: Block145Receipt[];
};

export default function ReceiptViewer({ manifestId, receipts }: ReceiptViewerProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleReceipts = useMemo(() => (showAll ? receipts : receipts.slice(0, 5)), [receipts, showAll]);

  return (
    <section className="mb-10 rounded-[1.7rem] border border-[#00D4FF]/25 bg-[#00D4FF]/[.045] p-6" aria-labelledby="receipt-viewer-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]"><Fingerprint className="h-4 w-4" aria-hidden="true" /> METADATA RECEIPT VIEWER</p>
          <h2 id="receipt-viewer-heading" className="mt-2 text-2xl font-black text-white">Block 145 vault metadata</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#C8D8E7]">Exact SHA-256 identifiers and file metadata from the preserved local accession manifest. Hashes identify supplied bytes; they do not establish authorship, rights, publication, or external vault state.</p>
        </div>
        <div className="rounded-xl border border-[#00FF88]/30 bg-[#00FF88]/[.06] px-4 py-3 text-right">
          <p className="text-[10px] font-mono tracking-[.12em] text-[#A7F3C1]">RECEIPT SET</p>
          <p className="mt-1 text-xl font-black text-[#7CFFBB]">{receipts.length} records</p>
          <p className="text-[10px] font-mono text-[#AFC0CF]">{manifestId}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3" aria-live="polite">
        {visibleReceipts.map((receipt) => (
          <article key={`${receipt.filename}:${receipt.sha256}`} className="rounded-xl border border-white/10 bg-black/20 p-4 transition motion-safe:hover:border-[#00D4FF]/45 motion-safe:hover:bg-[#00D4FF]/[.06] motion-reduce:transition-none">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-all text-sm font-black text-white">{receipt.filename}</p>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-[.1em] text-[#AFC0CF]">{receipt.mime_guess} · {receipt.bytes.toLocaleString()} bytes · {receipt.classification}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 px-2.5 py-1 text-[10px] font-mono text-[#A7F3C1]"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> RECEIPT READY</span>
            </div>
            <p className="mt-3 break-all text-[11px] font-mono leading-5 text-[#9DEBFF]"><span className="text-[#AFC0CF]">SHA-256 · </span>{receipt.sha256}</p>
            <p className="mt-2 text-xs text-[#AFC0CF]">{receipt.display_scope} · accessioned {new Date(receipt.accessioned_at_utc).toLocaleString()}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setShowAll((current) => !current)} aria-expanded={showAll} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-4 py-2 text-xs font-black text-[#BCEEFF] transition motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          <ChevronDown className={`h-4 w-4 transition-transform motion-reduce:transition-none ${showAll ? "rotate-180" : ""}`} aria-hidden="true" /> {showAll ? "SHOW FEWER RECEIPTS" : `SHOW ALL ${receipts.length} RECEIPTS`}
        </button>
        <span className="inline-flex items-center gap-2 text-xs text-[#AFC0CF]"><ShieldCheck className="h-4 w-4 text-[#7CFFBB]" aria-hidden="true" /> Browser-local read-only metadata surface</span>
      </div>
    </section>
  );
}
