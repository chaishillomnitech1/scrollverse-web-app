import { useMemo, useState } from "react";
import { Link } from "wouter";

type LedgerEntry = {
  id: string;
  category: string;
  title: string;
  sourceClass: string;
  planningTreatment: string;
  boundary: string;
};

const SOURCE_RECEIPT = {
  title: "Phase 917 — Omniversal Synthesis Source Receipt",
  sha256: "a0edc63a344f4af980a53cf8104e256a6601bcc51c55714074b07ba1616b1f6d",
  lineCount: 1530,
};

const PHASE923_RECEIPT = {
  title: "Phase 923 — New Creator Source Batch Receipt",
  files: [
    { filename: "pasted_content_2.txt", lineCount: 2174, bytes: 97191, sha256: "3c1d619df1e874d46907e35b6382580e009e6a3fd09b2b7b737fd2d589514d28" },
    { filename: "pasted_content_3.txt", lineCount: 4582, bytes: 181654, sha256: "e7646709af564b0dadb5f6bfea73193f088f9469728e3e9951cd36d201569f70" },
  ],
} as const;

const LEDGER_ENTRIES: LedgerEntry[] = [
  {
    id: "narrative",
    category: "Creator narrative",
    title: "Omniversal Synthesis and visual-direction language",
    sourceClass: "Creator-supplied text",
    planningTreatment: "Text-only narrative and visual-direction context for a future first-party planning selection.",
    boundary: "Does not establish historical, scientific, spiritual, or technical fact.",
  },
  {
    id: "references",
    category: "External references",
    title: "Meta AI, YouTube, GitHub, Manus, and other cited links",
    sourceClass: "External/source references named inside supplied text",
    planningTreatment: "Preserve names and context for a later exact source review.",
    boundary: "No external source is opened, fetched, embedded, or changed here.",
  },
  {
    id: "permissions",
    category: "Account notices",
    title: "Quoted GitHub App permission-request notices",
    sourceClass: "Creator-supplied quoted notification text",
    planningTreatment: "Retain as an owner-controlled access-review reference.",
    boundary: "No connector permission, account, payment, token, contract, or release action occurs here.",
  },
  {
    id: "claims",
    category: "Reported status",
    title: "Checkpoints, artifact paths, counts, dashboards, and reported infrastructure status",
    sourceClass: "Creator-supplied reports and observations",
    planningTreatment: "Use only as a source-recovery index that can be matched to a specified record later.",
    boundary: "Does not confirm a named count, artifact, deployment, or external system as current or reachable.",
  },
  {
    id: "financial",
    category: "Financial language",
    title: "Token, treasury, licensing, revenue, and contract proposals",
    sourceClass: "Creator-supplied planning language",
    planningTreatment: "Keep as inactive planning context until an exact future decision is made.",
    boundary: "Does not create a token, contract, wallet action, payment, marketplace listing, revenue flow, or deployment.",
  },
  {
    id: "media",
    category: "Media references",
    title: "Claimed artifacts, images, video directions, and visual concepts",
    sourceClass: "Unselected creator-supplied references",
    planningTreatment: "Keep outside the project bundle until one exact source and intended use are selected.",
    boundary: "Does not locate, copy, upload, display, play, transform, publish, or release media.",
  },
  {
    id: "handoffs",
    category: "First-party planning",
    title: "Digitalship, New Dominion, Nine-Frame, Fluidity, and Episode Brief handoffs",
    sourceClass: "Registered ScrollVerse planning routes",
    planningTreatment: "Use only after a creator identifies the exact source, first-party destination, and intended use.",
    boundary: "No content is transferred automatically into another route.",
  },
  {
    id: "phase923-marketplace",
    category: "Proposed marketplace and catalog",
    title: "Asset catalog, exchange, token, and story-book catalog proposals",
    sourceClass: "Phase 923 creator-supplied text batches",
    planningTreatment: "Keep as text-only planning context for a future non-transactional catalog review.",
    boundary: "Does not create a listing, token, wallet connection, contract, payment, exchange, or deployment.",
  },
  {
    id: "phase923-technical",
    category: "Supplied technical examples",
    title: "Marketplace React, firewall, wallet hook, deployment, and telemetry examples",
    sourceClass: "Phase 923 creator-supplied code examples",
    planningTreatment: "Preserve as unexecuted reference material pending exact local selection and technical review.",
    boundary: "No supplied code is copied, installed, run, granted permissions, connected to a wallet, or pointed at a live network.",
  },
  {
    id: "phase923-storybooks",
    category: "Story-book and archive planning",
    title: "Nine-volume story-book, character-lore, and master-archive proposals",
    sourceClass: "Phase 923 creator-supplied narrative and archive text",
    planningTreatment: "Use as source-labeled narrative context for a future first-party story index.",
    boundary: "Does not recover linked conversations, establish authorship or rights, tokenize a volume, or publish an archive.",
  },
  {
    id: "phase923-media",
    category: "Phase 923 media references",
    title: "Audio, video, social, autoplay, and visual-direction references",
    sourceClass: "Unselected creator-supplied media references",
    planningTreatment: "Keep metadata-only until one exact source and intended display treatment are selected.",
    boundary: "No media is opened, downloaded, played, embedded, transformed, uploaded, or released.",
  },
];

function downloadLocalLedger(entries: LedgerEntry[]) {
  const record = {
      recordType: "scrollverse_omniversal_source_ledger",
      status: "creator_led_browser_local_summary",
      sourceReceipt: SOURCE_RECEIPT,
      additionalReceipts: [PHASE923_RECEIPT],
      visibleEntries: entries,
    boundaries: {
      externalOperations: "No external source is opened, fetched, embedded, or changed here.",
      consequentialActions: "No connector permission, account, payment, token, contract, or release action occurs here.",
      media: "No media is accessed, uploaded, displayed, played, transformed, published, or released.",
    },
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "scrollverse-omniversal-source-ledger.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function OmniversalSourceLedger() {
  const [ledgerFilter, setLedgerFilter] = useState("");
  const [exported, setExported] = useState(false);
  const matchingEntries = useMemo(() => {
    const query = ledgerFilter.trim().toLowerCase();
    if (!query) return LEDGER_ENTRIES;
    return LEDGER_ENTRIES.filter((entry) =>
      [entry.category, entry.title, entry.sourceClass, entry.planningTreatment, entry.boundary]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [ledgerFilter]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] text-white">
      <section className="border-b border-[#70D9FF]/25 bg-[radial-gradient(circle_at_12%_16%,rgba(112,217,255,.17),transparent_31%),radial-gradient(circle_at_88%_14%,rgba(215,167,255,.15),transparent_29%),#070913]">
        <div className="container py-16 md:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-[#C9F3FF] transition hover:text-white">← Return to ScrollVerse</Link>
          <p className="mt-10 text-[10px] font-mono tracking-[.24em] text-[#BCEEFF]">OMNIVERSAL SOURCE LEDGER · BROWSER-LOCAL SUMMARY</p>
          <h1 aria-label="Omniversal Source Ledger" className="mt-4 max-w-5xl text-5xl font-black leading-[.9] tracking-tight md:text-7xl">Omniversal <span className="text-[#70D9FF]">Source Ledger</span></h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#D6E2EE]">A read-only planning index for the preserved Omniversal Synthesis source receipt. It makes the source categories, their available planning roles, and their retained boundaries visible without turning any external reference into an action.</p>
          <div className="mt-8 rounded-2xl border border-[#FFCF73]/30 bg-[#FFCF73]/[.06] p-4 text-sm leading-7 text-[#F0F5FA]">No external source is opened, fetched, embedded, or changed here. No connector permission, account, payment, token, contract, or release action occurs here.</div>
        </div>
      </section>

      <section className="container pt-10"><div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#8CEEDD]/30 bg-[#8CEEDD]/[.04] p-6"><div><h2 className="text-2xl font-black text-[#8CEEDD]">October Source Collections</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#D6E2EE]">Browse the newly supplied source families and exact artifact titles, with file receipts and passage citations.</p></div><Link href="/source-collections" className="inline-flex min-h-11 items-center rounded-xl bg-[#8CEEDD] px-5 text-sm font-black text-[#061016] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Open source collections →</Link></div></section>

      <section className="container py-12 md:py-16">
        <div className="rounded-[2rem] border border-[#70D9FF]/30 bg-[radial-gradient(circle_at_90%_8%,rgba(112,217,255,.13),transparent_30%),rgba(112,217,255,.035)] p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[.18em] text-[#BCEEFF]">SOURCE RECEIPT INDEX</p>
              <h2 className="mt-2 text-3xl font-black">Keep the context legible.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Receipt: {SOURCE_RECEIPT.title}. The ledger summarizes {SOURCE_RECEIPT.lineCount.toLocaleString()} source-text lines by category and adds the two-file Phase 923 receipt; it does not reproduce supplied text.</p>
            </div>
            <p aria-live="polite" className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-[10px] font-mono text-[#C9F3FF]">{matchingEntries.length} visible records</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="source-ledger-filter">Filter source ledger categories</label>
            <input id="source-ledger-filter" aria-label="Filter source ledger categories" value={ledgerFilter} onChange={(event) => { setLedgerFilter(event.target.value); setExported(false); }} placeholder="Try: account, media, financial, narrative, reference…" className="min-h-12 flex-1 rounded-xl border border-[#70D9FF]/35 bg-[#030713]/70 px-4 text-sm text-white outline-none transition placeholder:text-[#788FA4] focus:border-[#70D9FF] focus:ring-2 focus:ring-[#70D9FF]/25" />
            {ledgerFilter && <button type="button" onClick={() => { setLedgerFilter(""); setExported(false); }} className="min-h-12 rounded-xl border border-white/20 bg-white/[.04] px-4 text-sm font-black text-white transition hover:bg-white/[.1]">Clear filter</button>}
            <button type="button" onClick={() => { downloadLocalLedger(matchingEntries); setExported(true); }} className="min-h-12 rounded-xl bg-[#70D9FF] px-5 text-sm font-black text-[#071426] transition hover:brightness-110 active:scale-[.98]">Download local ledger JSON</button>
          </div>
          {exported && <p role="status" className="mt-4 text-sm font-black text-[#BCEEFF]">Local ledger exported. No external source or account action occurred.</p>}

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {matchingEntries.map((entry) => (
              <article key={entry.id} className="rounded-2xl border border-white/10 bg-[#030713]/55 p-5">
                <p className="text-[10px] font-mono tracking-[.16em] text-[#70D9FF]">{entry.category.toUpperCase()}</p>
                <h3 className="mt-3 text-xl font-black text-white">{entry.title}</h3>
                <p className="mt-3 text-xs leading-6 text-[#B7C8D9]"><span className="font-black text-[#D6E2EE]">SOURCE CLASS</span><br />{entry.sourceClass}</p>
                <p className="mt-4 text-sm leading-7 text-[#D6E2EE]"><span className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">PLANNING TREATMENT</span><br />{entry.planningTreatment}</p>
                <p className="mt-4 rounded-xl border border-[#FFCF73]/25 bg-[#FFCF73]/[.05] p-3 text-xs leading-6 text-[#FFE7B3]"><span className="font-mono tracking-[.14em]">BOUNDARY</span><br />{entry.boundary}</p>
              </article>
            ))}
            {matchingEntries.length === 0 && <div className="rounded-2xl border border-dashed border-white/20 p-5 text-sm leading-7 text-[#C2D0DD] md:col-span-2 xl:col-span-3">No source-ledger category matches that filter. Try “narrative,” “financial,” “media,” “account,” or “reference.”</div>}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#07101E]">
        <div className="container grid gap-5 py-12 md:grid-cols-3 md:py-16">
          <article className="rounded-[1.6rem] border border-[#D7A7FF]/35 bg-[#D7A7FF]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#EBDFFF]">1 · PRESERVE</p><h2 className="mt-3 text-2xl font-black">Keep the source whole.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The original text remains a separate receipt; this route exposes only a categorized planning summary.</p></article>
          <article className="rounded-[1.6rem] border border-[#70D9FF]/35 bg-[#70D9FF]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#BCEEFF]">2 · SELECT</p><h2 className="mt-3 text-2xl font-black">Choose one exact next use.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">A filename or passage, first-party route, intended use, and public scope still need to be selected in the Accession Desk.</p></article>
          <article className="rounded-[1.6rem] border border-[#FFCF73]/35 bg-[#FFCF73]/[.05] p-6"><p className="text-[10px] font-mono tracking-[.16em] text-[#FFE7B3]">3 · HOLD THE GATE</p><h2 className="mt-3 text-2xl font-black">Keep consequential actions separate.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Account permissions, payments, financial products, contracts, public publishing, and releases do not occur through this ledger.</p></article>
        </div>
      </section>

      <section className="container pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="grid gap-5 rounded-[2rem] border border-[#D7A7FF]/30 bg-[radial-gradient(circle_at_88%_12%,rgba(215,167,255,.14),transparent_30%),rgba(215,167,255,.035)] p-6 md:grid-cols-[1.2fr_.8fr] md:p-8">
          <div><p className="text-[10px] font-mono tracking-[.18em] text-[#EBDFFF]">NEXT FIRST-PARTY STEP</p><h2 className="mt-3 text-3xl font-black">Turn one source into a local decision record.</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-[#D6E2EE]">The Digitalship Accession Desk requires an exact source identifier, intended story route, and narrative use before it enables its browser-local record export.</p></div>
          <div className="flex items-center md:justify-end"><Link href="/digitalship-accession" className="inline-flex rounded-xl bg-[#D7A7FF] px-5 py-3 text-sm font-black text-[#070611] transition hover:brightness-110">Open Accession Desk →</Link></div>
        </div>
      </section>
    </main>
  );
}
