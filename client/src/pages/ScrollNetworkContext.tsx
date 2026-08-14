import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type SourceClass = "Independent analytics" | "Independent risk research" | "Exchange research" | "Personal social context" | "Shared project replay" | "Third-party presentation";

type SourceRecord = {
  title: string;
  sourceClass: SourceClass;
  source: string;
  href: string;
  date: string;
  statement: string;
  limit: string;
  color: string;
};

const sourceRecords: SourceRecord[] = [
  {
    title: "growthepie — Scroll analytics",
    sourceClass: "Independent analytics",
    source: "growthepie public dashboard",
    href: "https://www.growthepie.com/chains/scroll",
    date: "Snapshot reviewed Aug 14, 2026",
    statement: "Reports Scroll as a general-purpose zkEVM rollup with chain identifier 534352 and publishes daily indexed activity, fee, stablecoin, and application-label metrics.",
    limit: "Dashboard values are time-bound, indexer-derived, and may change with labels, source data, and chain coverage. They describe Scroll network activity, not ScrollVerse activity, ownership, revenue, or token value.",
    color: "#00D4FF",
  },
  {
    title: "L2BEAT — Scroll project record",
    sourceClass: "Independent risk research",
    source: "L2BEAT public project analysis",
    href: "https://l2beat.com/scaling/projects/scroll",
    date: "Snapshot reviewed Aug 14, 2026",
    statement: "Classifies Scroll as a ZK Rollup, lists chain identifier 534352, and presents its own maturity, governance, liveness, data-availability, and risk assessments.",
    limit: "L2BEAT explicitly frames stages as an opinionated maturity assessment, not a measure of security. Its research does not verify ScrollVerse contracts, assets, addresses, or any financial outcome.",
    color: "#FFB800",
  },
  {
    title: "Binance Research — Scroll (SCR)",
    sourceClass: "Exchange research",
    source: "Binance Research report dated Oct 8, 2024",
    href: "https://www.binance.com/en/research/projects/scroll",
    date: "Published Oct 8, 2024",
    statement: "Describes Scroll’s architecture and states a 1,000,000,000 SCR total and maximum supply as of its 2024 report date, with a historical allocation table.",
    limit: "The publisher says the report is informational, may be incomplete, is not investment advice, and should not be used as a recommendation to buy, sell, or hold an asset. It does not establish a ScrollVerse token claim.",
    color: "#B98CFF",
  },
  {
    title: "@_emjlin",
    sourceClass: "Personal social context",
    source: "Public X profile",
    href: "https://x.com/_emjlin",
    date: "Public profile reviewed Aug 14, 2026",
    statement: "A public personal social profile containing commentary and references to third-party ecosystem topics, including Scroll-related posts.",
    limit: "Personal posts are not a protocol announcement, audit, partnership record, financial disclosure, or evidence of a ScrollVerse relationship.",
    color: "#FF6B9A",
  },
  {
    title: "Shared Manus workflow replay",
    sourceClass: "Shared project replay",
    source: "User-supplied Manus shared task",
    href: "https://manus.im/share/elOuAaTa1uwmN2NNjRZDpZ",
    date: "Replay reviewed Aug 14, 2026",
    statement: "Documents project planning, workflow design, and task-output artifacts related to blockchain and revenue concepts.",
    limit: "A task replay documents planning and generated materials; it does not independently establish deployment, smart-contract execution, payments, audits, custody, revenue, or valuation.",
    color: "#00FF88",
  },
  {
    title: "Scribd presentation with a similar name",
    sourceClass: "Third-party presentation",
    source: "Public Scribd upload credited to Sheikh Farid",
    href: "https://www.scribd.com/document/941304285/ScrollVerse-Valuation-Visa-Presentation",
    date: "Document dated Oct 2025",
    statement: "A two-page upload describes a separately attributed Bangladesh-based project using the name “ScrollVerse” and states the uploader’s own 56-app and $14.6M strategic-valuation narrative.",
    limit: "It is not a ScrollVerse.co record and is not presented here as related to, owned by, endorsed by, or evidence for Chais “Sabir Kajir” Hill the Great, SCROLL VERSE LLC, XLVIII BLOCKS LLC, or this portal. Its valuation statements are unverified third-party claims.",
    color: "#8FA3B8",
  },
];

const sourceClasses: Array<SourceClass | "All"> = ["All", "Independent analytics", "Independent risk research", "Exchange research", "Personal social context", "Shared project replay", "Third-party presentation"];

const chainFacts = [
  { label: "NETWORK", value: "Scroll zkEVM", detail: "A chain-level context label; not a statement about any ScrollVerse application." },
  { label: "CHAIN IDENTIFIER", value: "534352", detail: "Reported by growthepie and L2BEAT for Scroll; use only with an independently verified network and address." },
  { label: "DATA AVAILABILITY", value: "Ethereum", detail: "Described by the independent project records as on-chain Ethereum data availability; readers should inspect the cited source for methodology." },
  { label: "RESEARCH STATUS", value: "Stage 0", detail: "L2BEAT’s stated maturity classification at review time, not an investment rating, security certificate, or ScrollVerse assessment." },
];

export default function ScrollNetworkContext() {
  useSovereignHeartbeat({ page: "scroll-network-context" });
  const [sourceClass, setSourceClass] = useState<SourceClass | "All">("All");
  const records = useMemo(() => sourceRecords.filter(record => sourceClass === "All" || record.sourceClass === sourceClass), [sourceClass]);

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-sm font-black text-[#00D4FF] transition-colors hover:text-white">← Return to ScrollVerse</Link><div className="flex flex-wrap gap-3"><Link href="/evidence-commons" className="rounded-lg border border-[#B98CFF]/35 px-3 py-2 text-xs font-black text-[#D6C4FF] transition hover:border-[#B98CFF]">Evidence Commons</Link><Link href="/deploy" className="rounded-lg border border-[#FFB800]/35 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Deployment Evidence</Link></div></div>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#00D4FF]/30 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 10% 10%, rgba(0,212,255,0.18), transparent 29%), radial-gradient(circle at 92% 78%, rgba(185,140,255,0.16), transparent 34%), #071124" }}>
          <div className="text-xs font-mono tracking-[0.22em] text-[#00D4FF]">SCROLL NETWORK CONTEXT · SOURCE-LABELED · REVIEWED AUG 14 2026</div>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">Network facts need a chain of evidence.</h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#C7D5E5]">This page organizes the supplied public sources around Scroll network context. It deliberately separates independent dashboard data, risk research, exchange-authored historical research, social context, task replays, and an unrelated third-party presentation. A source is not a partnership, audit, deployment, ownership record, valuation, or instruction to transact.</p>
          <div className="mt-7 grid gap-3 text-xs sm:grid-cols-3"><div className="rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 p-4"><div className="font-mono text-2xl font-black text-[#00D4FF]">6</div><p className="mt-1 text-[#D6E2EE]">supplied sources classified</p></div><div className="rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/10 p-4"><div className="font-mono text-2xl font-black text-[#FFCC4D]">4</div><p className="mt-1 text-[#D6E2EE]">chain-context facts, each source-bound</p></div><div className="rounded-xl border border-[#FF6B9A]/30 bg-[#FF6B9A]/10 p-4"><div className="font-mono text-2xl font-black text-[#FF9EB9]">0</div><p className="mt-1 text-[#D6E2EE]">wallet, provider, payment, or token actions</p></div></div>
        </section>

        <section className="mt-8"><div className="text-xs font-mono tracking-[0.18em] text-[#00FF88]">CHAIN CONTEXT · NOT SCROLLVERSE CLAIMS</div><h2 className="mt-2 text-3xl font-black">What the reviewed independent records describe.</h2><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{chainFacts.map(fact => <article key={fact.label} className="rounded-3xl border border-[#00FF88]/25 bg-[#00FF88]/[0.05] p-5"><div className="text-[10px] font-mono tracking-[0.16em] text-[#00FF88]">{fact.label}</div><div className="mt-3 text-2xl font-black">{fact.value}</div><p className="mt-3 text-xs leading-6 text-[#C7D5E5]">{fact.detail}</p></article>)}</div></section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"><div className="text-xs font-mono tracking-[0.18em] text-[#B98CFF]">SOURCE CLASS FILTER</div><div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Scroll context source classes">{sourceClasses.map(item => <button type="button" key={item} role="tab" aria-selected={sourceClass === item} onClick={() => setSourceClass(item)} className="rounded-lg border px-3 py-2 text-xs font-black transition active:scale-[0.98]" style={{ borderColor: sourceClass === item ? "#00D4FF" : "rgba(255,255,255,0.14)", color: sourceClass === item ? "#00D4FF" : "#B8C7D6", background: sourceClass === item ? "rgba(0,212,255,0.12)" : "transparent" }}>{item}</button>)}</div><p className="mt-4 text-xs leading-6 text-[#8FA3B8]">{records.length} of {sourceRecords.length} sources shown. Filtering is browser-local; this route does not retrieve live metrics, connect a wallet, or authenticate to a provider.</p></section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">{records.map(record => <article key={record.title} className="flex min-h-80 flex-col rounded-3xl border p-6" style={{ borderColor: `${record.color}45`, background: `${record.color}07` }}><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] font-mono tracking-[0.16em]" style={{ color: record.color }}>{record.sourceClass.toUpperCase()}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-mono text-[#AABBCB]">SOURCE-LED</span></div><h3 className="mt-4 text-2xl font-black leading-tight">{record.title}</h3><div className="mt-3 text-xs font-mono text-[#8FA3B8]">{record.source} · {record.date}</div><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">{record.statement}</p><div className="mt-5 border-t border-white/10 pt-4"><div className="text-[10px] font-mono tracking-[0.14em]" style={{ color: record.color }}>LIMITATION</div><p className="mt-2 text-xs leading-6 text-[#B8C7D6]">{record.limit}</p></div><a href={record.href} target="_blank" rel="noreferrer" className="mt-auto pt-5 text-sm font-black transition hover:text-white" style={{ color: record.color }}>Inspect public source ↗</a></article>)}</section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2"><article className="rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[0.05] p-7"><div className="text-xs font-mono tracking-[0.18em] text-[#FFCC4D]">VALUATION AND TOKEN LIMIT</div><h2 className="mt-3 text-2xl font-black">A listed figure is not a verified value.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The Scribd upload is retained as a third-party presentation with a similar name and distinct attribution. Its stated valuation is not used for this portal. Historical SCR mechanics from exchange research are separately dated and are likewise not used to price, value, promote, or connect any ScrollVerse token, asset, product, or service.</p><Link href="/evidence-standards" className="mt-5 inline-flex rounded-lg border border-[#FFB800]/45 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Open Evidence Standards →</Link></article><article className="rounded-3xl border border-[#FF6B9A]/30 bg-[#FF6B9A]/[0.05] p-7"><div className="text-xs font-mono tracking-[0.18em] text-[#FF9EB9]">ON-CHAIN EVIDENCE LIMIT</div><h2 className="mt-3 text-2xl font-black">Explorer context is not a deployment record.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">A network identifier, explorer page, chain statistic, or platform research page cannot verify a ScrollVerse contract. A contract-specific record requires the complete address or creation transaction, selected artifact, constructor context, network confirmation, and independently inspectable explorer evidence.</p><Link href="/public-reference-trail" className="mt-5 inline-flex rounded-lg border border-[#FF6B9A]/45 px-3 py-2 text-xs font-black text-[#FF9EB9] transition hover:border-[#FF6B9A]">Open Public Reference Trail →</Link></article></section>

        <section className="mt-8 rounded-3xl border border-[#00D4FF]/30 bg-[#00D4FF]/[0.05] p-7"><div className="text-xs font-mono tracking-[0.18em] text-[#00D4FF]">OPERATING BOUNDARY</div><p className="mt-3 max-w-5xl text-sm leading-7 text-[#D6E2EE]">This is a source directory and learning page. It does not provide investment, legal, tax, or financial advice; request a wallet connection; collect credentials; publish a valuation; verify a partnership; activate a token; execute a contract; or make a payment, transfer, or provider call. Visitors should inspect the original sources, their dates, methodology, terms, risk disclosures, and current status before relying on them.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/evidence-commons" className="rounded-lg border border-[#00D4FF]/45 px-3 py-2 text-xs font-black text-[#00D4FF] transition hover:border-[#00D4FF]">Evidence Commons →</Link><Link href="/digital-footprint-report" className="rounded-lg border border-[#B98CFF]/45 px-3 py-2 text-xs font-black text-[#D6C4FF] transition hover:border-[#B98CFF]">Digital Footprint Report →</Link><Link href="/deploy" className="rounded-lg border border-[#00FF88]/45 px-3 py-2 text-xs font-black text-[#00FF88] transition hover:border-[#00FF88]">Deployment Evidence →</Link></div></section>
      </section>
    </main>
  );
}
