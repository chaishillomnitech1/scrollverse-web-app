import { Image as ImageIcon, LockKeyhole, Sparkles } from "lucide-react";

export type Block145Receipt = {
  filename: string;
  source_path: string;
  bytes: number;
  sha256: string;
  mime_guess: string;
  classification: string;
  display_scope: string;
  accessioned_at_utc: string;
};

type Block145GalleryProps = {
  receipts: Block145Receipt[];
};

export default function Block145Gallery({ receipts }: Block145GalleryProps) {
  return (
    <section className="mt-10" aria-labelledby="block145-gallery-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-mono tracking-[.16em] text-[#FFCF70]"><Sparkles className="h-4 w-4" aria-hidden="true" /> SOURCE-LABELED VISUAL ARCHIVE</p>
          <h2 id="block145-gallery-heading" className="mt-2 text-3xl font-black text-white">Block 145 image receipt gallery</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#C8D8E7]">A thumbnail-safe museum shelf for the newly accessioned image records. This metadata-only local accession preserves filenames and hashes while using a typographic fallback instead of embedding or executing supplied source bytes.</p>
        </div>
        <span className="rounded-full border border-[#FFCF70]/30 bg-[#FFCF70]/10 px-3 py-2 text-[10px] font-mono tracking-[.12em] text-[#FFE4A8]">{receipts.length} IMAGE RECEIPTS · LOCAL ONLY</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {receipts.map((receipt, index) => (
          <article key={`${receipt.filename}:${receipt.sha256}`} className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#071326] p-4 transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#FFCF70]/60 motion-safe:hover:shadow-[0_18px_60px_rgba(255,207,112,.12)] motion-reduce:transition-none" title={`${receipt.filename} · SHA-256 ${receipt.sha256}`}>
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-[#9DEBFF]/15 bg-[radial-gradient(circle_at_50%_35%,rgba(0,212,255,.18),transparent_42%),linear-gradient(135deg,#0d1b35,#050B1A)]">
              <div className="absolute inset-0 opacity-50 transition duration-500 motion-safe:group-hover:scale-110 motion-safe:group-hover:opacity-80 motion-reduce:transition-none" style={{ background: `radial-gradient(circle at ${22 + (index % 4) * 19}% ${30 + (index % 3) * 18}%, rgba(255,207,112,.26), transparent 17%), radial-gradient(circle at 78% 72%, rgba(124,255,187,.2), transparent 25%)` }} />
              <div className="relative z-10 text-center">
                <ImageIcon className="mx-auto h-10 w-10 text-[#9DEBFF] transition motion-safe:group-hover:scale-110 motion-reduce:transition-none" aria-hidden="true" />
                <p className="mt-3 px-4 text-xs font-black uppercase tracking-[.12em] text-[#FFE4A8]">Image receipt {String(index + 1).padStart(2, "0")}</p>
                <p className="mt-1 px-5 text-[10px] font-mono text-[#AFC0CF]">thumbnail fallback · source bytes preserved separately</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#7CFFBB]" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="break-all text-sm font-black text-white">{receipt.filename}</h3>
                <p className="mt-1 text-[10px] font-mono text-[#AFC0CF]">{receipt.bytes.toLocaleString()} bytes · {receipt.mime_guess}</p>
                <p className="mt-2 break-all text-[10px] font-mono leading-4 text-[#9DEBFF]">SHA-256 {receipt.sha256}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
