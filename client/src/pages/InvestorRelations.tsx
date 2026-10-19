import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Film, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { INVESTOR_RELATIONS_RECORDS, getInvestorRelationSummary } from "@/lib/investorRelations";

export default function InvestorRelations() {
  const summary = getInvestorRelationSummary(INVESTOR_RELATIONS_RECORDS);

  return (
    <main className="min-h-screen bg-[#050b1a] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan-400/30 px-4 text-sm text-cyan-200 transition hover:border-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to ScrollVerse
        </Link>
        <header className="mt-10 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300">Source-labeled local showcase</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Investor Relations Dashboard</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">A clear presentation layer for selected creator-supplied still and motion references. This page presents the catalog and its provenance; it is not an investment offer, financial performance report, rights clearance, or publication record.</p>
        </header>

        <section aria-label="Catalog summary" className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["Catalog records", summary.total, "Source-labeled references"],
            ["Still masterpieces", summary.stills, "Displayed with descriptive labels"],
            ["Motion references", summary.motion, "Play only when selected"],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-black text-emerald-300">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{detail}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5 text-sm text-emerald-100" role="status">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p><strong>Local catalog status:</strong> {summary.externalActions} external actions. Hashes, source labels, and display boundaries remain in the accession records.</p>
        </div>

        <section aria-labelledby="investor-gallery-heading" className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300">Artifact wall</p>
              <h2 id="investor-gallery-heading" className="mt-2 text-3xl font-black">Motion to still masterpieces</h2>
            </div>
            <Link href="/digitalship-accession" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-300/30 px-4 text-sm text-amber-100 transition hover:border-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
              Open accession records <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {INVESTOR_RELATIONS_RECORDS.map((record) => (
              <article key={record.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
                <div className="aspect-[16/10] bg-black/30">
                  {record.kind === "still" && record.image ? (
                    <img src={record.image} alt={record.title} loading="lazy" className="h-full w-full object-cover" />
                  ) : record.video ? (
                    <video controls preload="none" poster={record.poster} className="h-full w-full object-cover" aria-label={`${record.title} motion reference`}>
                      <source src={record.video} />
                    </video>
                  ) : null}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cyan-300">
                    {record.kind === "still" ? <ImageIcon className="h-4 w-4" aria-hidden="true" /> : <Film className="h-4 w-4" aria-hidden="true" />}
                    {record.kind}
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{record.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{record.description}</p>
                  <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">Source: {record.sourceLabel}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
