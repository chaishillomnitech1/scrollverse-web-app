import { useMemo, useState } from "react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ConsortiumLens = "All" | "Registry" | "Continuity" | "Collaboration" | "Resilience";

type RegistryEntry = {
  title: string;
  lens: Exclude<ConsortiumLens, "All">;
  status: string;
  source: string;
  detail: string;
  boundary: string;
  href: string;
  label: string;
  color: string;
};

const registry: RegistryEntry[] = [
  {
    title: "First-party ScrollVerse portal",
    lens: "Registry",
    status: "PROJECT-MANAGED",
    source: "Current project route map and owner-controlled public portal",
    detail: "The central reading room for routes, evidence labels, creators’ work, public learning, and documented activation boundaries.",
    boundary: "Central discovery does not provide credential access, remote control, or an assertion about systems not visibly connected here.",
    href: "/domain-discovery-map",
    label: "Open Domain & Discovery Map",
    color: "#00D4FF",
  },
  {
    title: "Public repository and source trail",
    lens: "Registry",
    status: "PUBLIC-SOURCE",
    source: "Public repository references and dated first-party source records",
    detail: "A readable project trail that helps visitors distinguish public code, supplied context, observed records, and evidence still awaiting review.",
    boundary: "A public repository or link does not provide access to private repositories, email, credentials, account controls, or unrelated projects.",
    href: "/github-showcase",
    label: "Open GitHub Showcase",
    color: "#B98CFF",
  },
  {
    title: "Continuity and recovery records",
    lens: "Continuity",
    status: "PROTECTED-REVIEW",
    source: "Continuity ledger, owner-supplied source records, and recovery-materials route",
    detail: "A durable documentation lane for context, project decisions, source class, date, privacy status, readiness, and correction paths.",
    boundary: "A continuity record does not recover private chats, bypass platform controls, or expose protected source material.",
    href: "/recovery-materials",
    label: "Open Recovery Materials",
    color: "#FFB800",
  },
  {
    title: "Human and AI collaboration charter",
    lens: "Collaboration",
    status: "ASSISTIVE-ONLY",
    source: "First-party role definitions and owner-supplied collaboration goals",
    detail: "Human contributors and AI role patterns can propose, organize, explain, and draft within visible scopes that preserve an owner decision point.",
    boundary: "AI roles are assistive patterns, not independent authorities, account holders, legal agents, or autonomous actors in external systems.",
    href: "/specialist-constellation",
    label: "Open Specialist Constellation",
    color: "#00FF88",
  },
  {
    title: "Self-hosted resilience lane",
    lens: "Resilience",
    status: "RESEARCH-READY",
    source: "Owner-supplied Google architecture proposal plus GitHub, NIST, and workflow-security research",
    detail: "A staged preparation path for repository mirrors, portable asset records, optional local-tool research, scoped automation design, and restore testing.",
    boundary: "No local model, self-hosted service, browser agent, backup job, or external synchronization is enabled by this planning lane.",
    href: "/operational-safeguards",
    label: "Open Operational Safeguards",
    color: "#FF6B9A",
  },
  {
    title: "Protected transaction and secret gate",
    lens: "Resilience",
    status: "FAIL-CLOSED",
    source: "Protected owner-supplied automation and on-chain material; GitHub, NIST, and multisignature security research",
    detail: "A public planning gate for documenting source review, no-funds simulation design, owner-controlled secret handling, transaction details, confirmation, and a recovery record.",
    boundary: "This is not financial advice and does not reveal a secret, inspect a wallet, simulate with funds, sign, swap, transfer, broadcast, or execute a transaction.",
    href: "/nft-monetization-blueprint",
    label: "Open NFT Monetization Blueprint",
    color: "#FF5568",
  },
  {
    title: "Evidence and correction commons",
    lens: "Continuity",
    status: "SOURCE-LABELED",
    source: "Public references, first-party methodology, and visible limitations",
    detail: "A shared place to compare what a source says, what it does not establish, and where a visitor can suggest a correction or new source.",
    boundary: "Evidence review does not certify a claim, decide ownership, validate identity, or create an official institutional determination.",
    href: "/evidence-commons",
    label: "Open Evidence Commons",
    color: "#FFC2B8",
  },
];

const lenses: ConsortiumLens[] = ["All", "Registry", "Continuity", "Collaboration", "Resilience"];

const connectionSteps = [
  ["01 · NAME", "Record the source, project, purpose, owner, date, and data class before any connection is proposed."],
  ["02 · SCOPE", "State the exact read or write action, target resource, expiry, and what the connection must never do."],
  ["03 · REVIEW", "Keep an owner decision, visible readiness state, and a clear record of dependency and security questions."],
  ["04 · REVOKE", "Document the stop control, audit trail, correction route, and recovery instruction before activation."],
];

const transactionStages = [
  ["DOCUMENT", "Record the source, purpose, network, assets, dependencies, and evidence state without handling code or credentials."],
  ["REVIEW", "Review non-secret configuration, verified destination information, dependency risk, and the exact irreversible consequence."],
  ["SIMULATE", "Use a no-funds test plan only after a separate technical review; simulation evidence never guarantees a live outcome."],
  ["CONFIRM", "Before any later broadcast, state the exact amount, asset, destination, fee and slippage bounds, then obtain a fresh explicit confirmation."],
];

export default function ConsortiumNexus() {
  useSovereignHeartbeat({ page: "consortium-nexus" });
  const [lens, setLens] = useState<ConsortiumLens>("All");
  const visibleEntries = useMemo(() => registry.filter(entry => lens === "All" || entry.lens === lens), [lens]);

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm font-black text-[#00D4FF] transition-colors hover:text-white">← Return to ScrollVerse</Link>
          <div className="flex flex-wrap gap-3">
            <Link href="/domain-discovery-map" className="rounded-lg border border-[#00D4FF]/35 px-3 py-2 text-xs font-black text-[#00D4FF] transition hover:border-[#00D4FF]">Domain & Discovery Map</Link>
            <Link href="/operational-safeguards" className="rounded-lg border border-[#FF6B9A]/35 px-3 py-2 text-xs font-black text-[#FF9EB9] transition hover:border-[#FF6B9A]">Operational Safeguards</Link>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#00D4FF]/30 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 12% 14%, rgba(0,212,255,0.17), transparent 30%), radial-gradient(circle at 88% 79%, rgba(185,140,255,0.15), transparent 34%), #071124" }}>
          <div className="text-xs font-mono tracking-[0.22em] text-[#00D4FF]">SCROLLVERSE CONSORTIUM · SOURCE-LABELED PORTFOLIO CONTROL PLANE</div>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">One readable map. Many independent systems. Clear consent at every connection.</h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#C7D5E5]">The Consortium is a first-party blueprint for organizing owner-confirmed projects, public source trails, documented workspaces, and future connection requests. It makes discovery easier while keeping every account, inbox, private chat, credential, provider, and external system separate unless a later owner-approved scope says otherwise.</p>
          <div className="mt-7 grid gap-3 text-xs sm:grid-cols-3">
            <div className="rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 p-4"><div className="font-mono text-2xl font-black text-[#00D4FF]">7</div><p className="mt-1 text-[#D6E2EE]">source-labeled consortium lanes</p></div>
            <div className="rounded-xl border border-[#00FF88]/30 bg-[#00FF88]/10 p-4"><div className="font-mono text-2xl font-black text-[#00FF88]">0</div><p className="mt-1 text-[#D6E2EE]">hidden account, inbox, provider, or workflow connections</p></div>
            <div className="rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/10 p-4"><div className="font-mono text-2xl font-black text-[#FFCC4D]">4</div><p className="mt-1 text-[#D6E2EE]">required stages before any future connection</p></div>
          </div>
        </section>

        <div className="mt-8"><PortalTrustLens lane="Consortium architecture" source="Owner-supplied portfolio context, protected continuity records, and cited public identity/backup/security guidance" readiness="First-party discovery and documentation blueprint active; external connection readiness remains staged" boundary="This route does not access, combine, recover, synchronize, or control external accounts, private chats, inboxes, credentials, wallets, providers, or AI workspaces." /></div>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[0.05] p-6"><div className="text-xs font-mono tracking-[0.16em] text-[#00D4FF]">DISCOVER</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Use one source-labeled directory to find first-party routes, public records, and project context without pretending every system is connected.</p></article>
          <article className="rounded-3xl border border-[#B98CFF]/25 bg-[#B98CFF]/[0.05] p-6"><div className="text-xs font-mono tracking-[0.16em] text-[#D6C4FF]">SEPARATE</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Keep public links, owner-supplied context, independently observed facts, pending review, and protected material visibly distinct.</p></article>
          <article className="rounded-3xl border border-[#00FF88]/25 bg-[#00FF88]/[0.05] p-6"><div className="text-xs font-mono tracking-[0.16em] text-[#00FF88]">CONNECT WITH CONSENT</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Any future connection must state its scope, target, permission, owner decision, expiry, audit record, and revoke path before it can be considered.</p></article>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
          <div className="text-xs font-mono tracking-[0.18em] text-[#00D4FF]">BROWSER-LOCAL CONSORTIUM LENSES</div>
          <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Consortium registry lenses">{lenses.map(item => <button type="button" key={item} role="tab" aria-selected={lens === item} onClick={() => setLens(item)} className="rounded-lg border px-3 py-2 text-xs font-black transition active:scale-[0.98]" style={{ borderColor: lens === item ? "#00D4FF" : "rgba(255,255,255,0.14)", color: lens === item ? "#00D4FF" : "#B8C7D6", background: lens === item ? "rgba(0,212,255,0.12)" : "transparent" }}>{item}</button>)}</div>
          <p className="mt-4 text-xs leading-6 text-[#8FA3B8]">{visibleEntries.length} of {registry.length} consortium entries shown. This local filter changes only the browser view; it does not create a connection, change a record, retrieve a chat, or contact any external service.</p>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">{visibleEntries.map(entry => <article key={entry.title} className="flex min-h-[25rem] flex-col rounded-3xl border p-6" style={{ borderColor: `${entry.color}45`, background: `${entry.color}07` }}><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-mono tracking-[0.16em]" style={{ color: entry.color }}>{entry.lens.toUpperCase()}</span><span className="rounded-full border px-2 py-1 text-[10px] font-mono" style={{ color: entry.color, borderColor: `${entry.color}45` }}>{entry.status}</span></div><h2 className="mt-4 text-2xl font-black">{entry.title}</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{entry.detail}</p><div className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4"><div className="text-[10px] font-mono tracking-[0.14em] text-[#8FA3B8]">SOURCE CLASS</div><p className="mt-2 text-xs leading-6 text-[#D6E2EE]">{entry.source}</p></div><div className="mt-4 rounded-2xl border border-[#FF6B9A]/20 bg-[#FF6B9A]/[0.05] p-4"><div className="text-[10px] font-mono tracking-[0.14em] text-[#FF9EB9]">BOUNDARY</div><p className="mt-2 text-xs leading-6 text-[#D6E2EE]">{entry.boundary}</p></div><Link href={entry.href} className="mt-auto pt-5 text-sm font-black transition hover:text-white" style={{ color: entry.color }}>{entry.label} →</Link></article>)}</section>

        <section className="mt-10 rounded-3xl border border-[#FF5568]/35 bg-[#FF5568]/[0.05] p-7">
          <div className="text-xs font-mono tracking-[0.18em] text-[#FF9EB9]">PROTECTED TRANSACTION AND SECRET GATE · FAIL-CLOSED</div>
          <h2 className="mt-3 text-3xl font-black">Documentation is not execution. A simulation review is not authorization.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">This public gate exists so a visitor can see the distinction between an architecture note, a reviewed no-funds test plan, owner-controlled secret handling, and a future irreversible action. It does not provide investment advice, place a trade, access a wallet, inspect an environment file, or activate an on-chain workflow.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">{transactionStages.map(([stage, detail]) => <article key={stage} className="rounded-2xl border border-[#FF5568]/25 bg-black/15 p-4"><div className="font-mono text-xs font-black text-[#FF9EB9]">{stage}</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{detail}</p></article>)}</div>
          <p className="mt-6 text-xs leading-6 text-[#AABBCB]">Secret material belongs only in an owner-approved secret-management channel. It must never be pasted into chat, copied into a public route, committed to source control, exposed to a client bundle, or embedded in an automation prompt.</p>
        </section>

        <section className="mt-10 rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[0.05] p-7">
          <div className="text-xs font-mono tracking-[0.18em] text-[#FFCC4D]">CONNECTION-READY SEQUENCE</div>
          <h2 className="mt-3 text-3xl font-black">No hidden handoffs. No shared secrets. No invisible authority.</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">{connectionSteps.map(([step, detail]) => <article key={step} className="rounded-2xl border border-[#FFB800]/20 bg-black/15 p-4"><div className="font-mono text-xs font-black text-[#FFCC4D]">{step}</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{detail}</p></article>)}</div>
          <p className="mt-6 text-xs leading-6 text-[#AABBCB]">The self-hosted resilience lane is documentation-ready: repository mirrors, portable asset records, local-tool research, scoped automation design, and restore testing may be planned here. None is activated through this page, and no future automation may self-modify its authority, credentials, policies, or external targets without a separately reviewed owner-controlled process.</p>
        </section>
      </section>
    </main>
  );
}
