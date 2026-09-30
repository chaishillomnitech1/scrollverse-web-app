import { useMemo, useState } from "react";
import { Link } from "wouter";

type VolumeSlot = {
  id: string;
  label: string;
  sourceLabel: string;
  state: "Unselected";
  nextDecision: string;
};

const VOLUME_SLOTS: VolumeSlot[] = Array.from({ length: 9 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `volume-${number}`,
    label: `Volume ${number}`,
    sourceLabel: `Nine-volume proposal · slot ${number}`,
    state: "Unselected",
    nextDecision: "Supply an exact title or passage and intended first-party route",
  };
});

function downloadLocalIndex(visibleSlots: VolumeSlot[]) {
  const record = {
    recordType: "scrollverse_source_labeled_storybook_index",
    status: "creator_led_browser_local_planning",
    sourceReceipt: "pasted_content_4.txt",
    slots: visibleSlots,
    boundaries: {
      externalArtifacts: "No external artifact was opened, fetched, authenticated, downloaded, embedded, played, or copied.",
      consequentialActions: "No token, wallet, contract, payment, or publication action occurred.",
      selection: "Exact source, first-party route, narrative use, display treatment, accessibility treatment, and public scope remain required.",
    },
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "scrollverse-source-labeled-storybook-index.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function SourceLabeledStorybookIndex() {
  const [filter, setFilter] = useState("");
  const [exported, setExported] = useState(false);
  const visibleSlots = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return VOLUME_SLOTS;
    return VOLUME_SLOTS.filter((slot) => `${slot.label} ${slot.sourceLabel} ${slot.state} ${slot.nextDecision}`.toLowerCase().includes(query));
  }, [filter]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] text-white">
      <section className="border-b border-[#D7A7FF]/25 bg-[radial-gradient(circle_at_10%_10%,rgba(215,167,255,.16),transparent_32%),radial-gradient(circle_at_90%_8%,rgba(112,217,255,.14),transparent_30%),#070913]">
        <div className="container py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#EBDFFF] transition hover:text-white">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#EBDFFF]">SOURCE-LABELED STORY-BOOK INDEX · BROWSER-LOCAL PLANNING</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] tracking-tight md:text-7xl">Nine volumes, <span className="text-[#D7A7FF]">held with provenance.</span></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#D6E2EE]">A text-only index derived from the Phase 926 creator receipt. It reserves nine volume slots without inventing titles, recovering linked artifacts, or presenting a proposal as a published book.</p>
          <div className="mt-8 rounded-2xl border border-[#FFCF73]/30 bg-[#FFCF73]/[.06] p-4 text-sm leading-7 text-[#F0F5FA]">No external artifact was opened, fetched, authenticated, downloaded, embedded, played, or copied. No token, wallet, contract, payment, or publication action occurred.</div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="rounded-[2rem] border border-[#D7A7FF]/30 bg-[radial-gradient(circle_at_90%_8%,rgba(215,167,255,.13),transparent_30%),rgba(215,167,255,.035)] p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">PHASE 926 SOURCE RECEIPT · pasted_content_4.txt</p>
              <h2 className="mt-2 text-3xl font-black">Keep every volume selectable.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Volume 01 through Volume 09 stay unselected until the creator supplies an exact source and intended first-party use.</p>
            </div>
            <p aria-live="polite" className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[10px] font-mono text-[#EBDFFF]">{visibleSlots.length} visible slots</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="storybook-index-filter">Filter volume slots</label>
            <input id="storybook-index-filter" aria-label="Filter volume slots" value={filter} onChange={(event) => { setFilter(event.target.value); setExported(false); }} placeholder="Try: volume 01, unselected, first-party…" className="min-h-12 flex-1 rounded-xl border border-[#D7A7FF]/35 bg-[#030713]/70 px-4 text-sm text-white outline-none transition placeholder:text-[#788FA4] focus:border-[#D7A7FF] focus:ring-2 focus:ring-[#D7A7FF]/25" />
            {filter && <button type="button" onClick={() => { setFilter(""); setExported(false); }} className="min-h-12 rounded-xl border border-white/20 bg-white/[.04] px-4 text-sm font-black text-white transition hover:bg-white/[.1]">Clear filter</button>}
            <button type="button" onClick={() => { downloadLocalIndex(visibleSlots); setExported(true); }} className="min-h-12 rounded-xl bg-[#D7A7FF] px-5 text-sm font-black text-[#070611] transition hover:brightness-110 active:scale-[.98]">Download local story-book index</button>
          </div>
          {exported && <p role="status" className="mt-4 text-sm font-black text-[#EBDFFF]">Local story-book index exported. No external artifact or account action occurred.</p>}

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleSlots.map((slot) => (
              <article key={slot.id} className="rounded-2xl border border-white/10 bg-[#030713]/55 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D7A7FF]/55 hover:bg-[#D7A7FF]/[.06] focus-within:border-[#D7A7FF]/70">
                <div className="flex items-start justify-between gap-4"><p className="text-[10px] font-mono tracking-[.16em] text-[#D7A7FF]">{slot.label.toUpperCase()}</p><span className="rounded-full border border-[#FFCF73]/25 bg-[#FFCF73]/[.06] px-2 py-1 text-[9px] font-mono text-[#FFE7B3]">{slot.state}</span></div>
                <h3 className="mt-4 text-xl font-black">{slot.sourceLabel}</h3>
                <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{slot.nextDecision}.</p>
                <p className="mt-5 rounded-xl border border-[#70D9FF]/20 bg-[#70D9FF]/[.04] p-3 text-xs leading-6 text-[#BCEEFF]">Exact source selection is required before story, media, archive, or display continuation.</p>
              </article>
            ))}
            {visibleSlots.length === 0 && <p className="rounded-2xl border border-dashed border-white/20 p-5 text-sm text-[#C2D0DD] md:col-span-2 xl:col-span-3">No volume slot matches that filter. Try “volume” or “unselected.”</p>}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07101E]">
        <div className="container grid gap-5 py-12 md:grid-cols-3 md:py-16">
          <article className="rounded-[1.6rem] border border-[#D7A7FF]/35 bg-[#D7A7FF]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">01 · PRESERVE</p><h2 className="mt-3 text-2xl font-black">Keep the proposal whole.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The index records nine slots while the original receipt remains the source of context.</p></article>
          <article className="rounded-[1.6rem] border border-[#70D9FF]/35 bg-[#70D9FF]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">02 · SELECT</p><h2 className="mt-3 text-2xl font-black">Choose one exact source.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Use the Digitalship Accession Desk before adding a title, passage, artifact, or display treatment.</p></article>
          <article className="rounded-[1.6rem] border border-[#FFCF73]/35 bg-[#FFCF73]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE7B3]">03 · HOLD THE GATE</p><h2 className="mt-3 text-2xl font-black">Keep releases separate.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">This route does not publish books, connect wallets, invoke contracts, or play media.</p></article>
        </div>
      </section>

      <section className="container pb-16 pt-12">
        <div className="flex flex-wrap gap-3"><Link href="/omniversal-source-ledger" className="inline-flex rounded-xl border border-[#70D9FF]/35 bg-[#70D9FF]/[.06] px-5 py-3 text-sm font-black text-[#BCEEFF] transition hover:bg-[#70D9FF]/[.12]">Open Source Ledger →</Link><Link href="/digitalship-accession" className="inline-flex rounded-xl bg-[#D7A7FF] px-5 py-3 text-sm font-black text-[#070611] transition hover:brightness-110">Open Accession Desk →</Link></div>
      </section>
    </main>
  );
}
