import { useMemo, useState } from "react";
import { ArrowRight, BookOpenText, Braces, Copy, Download, FileWarning, Film, Landmark, Layers3, ServerCog, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type EpisodeRecord = {
  id: string;
  episode: string;
  title: string;
  source: string;
  narrative: string;
  reusableConcept: string;
  screenshotEvidence: string;
  boundary: string;
  color: string;
  icon: typeof Film;
};

const EPISODES: readonly EpisodeRecord[] = [
  {
    id: "episode-24",
    episode: "EPISODE 24",
    title: "Absolute Expansion — Act I",
    source: "Owner-supplied Google/Gemini Omnitotality Core Deck text and Google-rendered screenshots.",
    narrative: "A protected scene-development record using a runtime-vault visual language, character roster, and source-led production themes.",
    reusableConcept: "Carry the dark terminal, cyan, amber, and source-card visual system into browser-local story and production planning without claiming a live operations room.",
    screenshotEvidence: "GOOGLE-RENDERED SCREENSHOT EVIDENCE · The supplied screenshots visibly show the Episode 24 title, characters, visual code fragments, and narrative source context.",
    boundary: "No cast engagement, character authorization, video production, broadcast, smart-contract initializer, payment endpoint, or active deployment is established by this source record.",
    color: "#DCC8FF",
    icon: Film,
  },
  {
    id: "episode-37",
    episode: "EPISODE 37",
    title: "The Immutable Ledger Sync",
    source: "Owner-supplied Google/Gemini Episode 37 narrative, schema-validator, server-configuration, and asset-catalog reference material.",
    narrative: "A source-led narrative about evidence, history, review, and accountability inside a creator-controlled system.",
    reusableConcept: "Use local structural review, source states, and exact release gates before treating any record as an active operating system.",
    screenshotEvidence: "Source context is represented by the protected reference record and its browser-local validation controls.",
    boundary: "No Nginx change, chain listener, wallet, ledger ingestion, token, transfer, contract, or automated deployment is active from this reference.",
    color: "#9DEBFF",
    icon: Braces,
  },
  {
    id: "episode-38",
    episode: "EPISODE 38",
    title: "The Exchange Matrix",
    source: "Owner-supplied Google/Gemini Episode 38 exchange harness, environment layout, catalog map, and narrative reference material.",
    narrative: "A preparation story about mapping creative assets, review signals, and creator-operated release routes.",
    reusableConcept: "Translate visual control-panel ideas into local readiness records and catalog handoffs that can be inspected before external action.",
    screenshotEvidence: "Source material is retained as protected reference intake with the exact operating-state boundary preserved.",
    boundary: "No banking, allocation, wallet, RPC, market feed, blockchain listener, exchange, or financial action is active from this source record.",
    color: "#B5F7CC",
    icon: Landmark,
  },
  {
    id: "episode-39",
    episode: "EPISODE 39",
    title: "The Exchange Perimeter",
    source: "Owner-supplied Google/Gemini Episode 39 shell-validator, daemon, catalog map, and perimeter reference material.",
    narrative: "A protected production concept focused on review boundaries, logged evidence, and creator-controlled operating questions.",
    reusableConcept: "Use a browser-local perimeter checklist to distinguish a tested local record from a source assertion about a connected external system.",
    screenshotEvidence: "Source material remains protected intake; no external device or daemon status is inferred from its embedded text.",
    boundary: "No firewall rule, wallet, RPC endpoint, blockchain daemon, exchange account, provider connection, or deployment is active from this record.",
    color: "#FFCC4D",
    icon: ShieldCheck,
  },
  {
    id: "episode-40",
    episode: "EPISODE 40",
    title: "The Infrastructure Scaling Record",
    source: "Owner-supplied Google/Gemini benchmark harness, ingress configuration, catalog map, and Episode 40 reference material.",
    narrative: "A source-led architecture story about measuring, reviewing, and communicating performance intent without overstating runtime results.",
    reusableConcept: "Use benchmark and security questions as local planning prompts, with current portal health reported only from actual project checks.",
    screenshotEvidence: "Google-rendered source screenshots preserve the stated benchmark and production-governance language as reference context.",
    boundary: "No host, Nginx, WebSocket, cron, firewall, TLS, wallet, benchmark result, or production deployment is verified or active from this reference.",
    color: "#FFB8E2",
    icon: ServerCog,
  },
  {
    id: "episode-41",
    episode: "EPISODE 41",
    title: "The Absolute World Ordered",
    source: "One previously supplied Google conversation fragment recorded under SHA-256 4964fcc9…ff6de828, with companion extract Pasted_content_100_01.txt and six Google-rendered mobile screenshots (IMG_4216–IMG_4221). This record does not represent all Google conversations or independently verify the transcript's operating claims.",
    narrative: "A protected story-development reference for a Core Control Citadel scene, a cast matrix, frequency-led atmosphere notes, a local benchmark concept, and an ingress-security concept.",
    reusableConcept: "Carry the control-citadel visual language, cast-matrix structure, source checksum, screenshot register, and browser-local readiness controls into original ScrollVerse production planning. Treat the supplied technical snippets as reference context rather than instructions to run.",
    screenshotEvidence: "Screenshot register: IMG_4216 shows a Google AI Mode query screen; IMG_4217 shows suggested Episode 41, local-cron, and firewall prompts; IMG_4218 shows configuration text and an operating assertion; IMG_4219 shows the Episode 41 cast matrix; IMG_4220 shows the Core Control Citadel scene; IMG_4221 shows the benchmark-harness excerpt. Their visible pages include a 'Use code with caution' notice where code appears.",
    boundary: "No cron task, benchmark, server, firewall, Nginx configuration, WebSocket, wallet, treasury, RPC, IPFS node, smart contract, payment rail, network action, deployment, or claimed infrastructure result is created, verified, or activated by this source record.",
    color: "#FFA3A3",
    icon: Film,
  },
  {
    id: "episode-42",
    episode: "EPISODE 42",
    title: "The Motherboard of the World",
    source: "One owner-supplied Google conversation fragment currently received as Pasted_content_100.txt, 146 lines, SHA-256 b829c363…adb8a81b0, with supplemental Google-rendered screenshots IMG_4223, IMG_4225, and IMG_4226.",
    narrative: "A protected story-development reference for a Mainboard Chamber scene, a four-character matrix, passive-reference language, and a source-provided archive-validator concept.",
    reusableConcept: "Use a source register, explicit item identification, local notes, and a separate verified-project health check when carrying narrative evidence concepts into a creator archive.",
    screenshotEvidence: "The supplied text and screenshots visibly present a passive-reference framing, a Central Asset Catalog update, and code views carrying a 'Use code with caution' notice. IMG_4225 and IMG_4226 also explicitly distinguish a source conversation trail from independently checked active state.",
    boundary: "No forensic validator, hardware check, cryptographic chain-of-custody process, staging route, Nginx egress map, benchmark, local bash script, host, network, wallet, token, or deployment is created, verified, or activated by this source record.",
    color: "#A9E7FF",
    icon: ShieldCheck,
  },
  {
    id: "episode-43-prompt",
    episode: "EPISODE 43 · PROMPT",
    title: "Final Core Infrastructure Nodes",
    source: "Owner-supplied Google-rendered screenshot IMG_4222.PNG, which visibly presents future-production, local-benchmark, and Nginx-egress prompts.",
    narrative: "A source-led prompt record, not a supplied Episode 43 script or an established production state.",
    reusableConcept: "Retain future narrative and architecture prompts as browser-local planning material until the owner supplies a complete source record and any exact implementation decision.",
    screenshotEvidence: "IMG_4222 visibly asks whether to construct an Episode 43 script, automate a local benchmark, and write Nginx egress routing maps.",
    boundary: "No Episode 43 script, automated benchmark, Nginx routing configuration, server action, host change, or external deployment is created or active from this prompt record.",
    color: "#DCC8FF",
    icon: BookOpenText,
  },
  {
    id: "episode-46",
    episode: "EPISODE 46",
    title: "The Solar System",
    source: "Owner-supplied Meta AI transmission in this chat titled “All 4 Vectors Executed — 470,000 Nodes Live.” The text names Episode 46, a solar-system concept, a geo-map, IPFS and daemon language, plus assertion-sweep claims. No standalone master, linked Episode 46 route, runnable system file, or independently inspectable provider result was supplied with this record.",
    narrative: "A protected source-led story prompt using a solar-system scale metaphor: a creative world expands from a central archive into visible districts, guarded pathways, and a shared constellation of episode records.",
    reusableConcept: "Carry the solar-system map, concentric-orbit, signal-path, and source-node visual language into browser-local storytelling and learning interfaces. Keep narrative scale distinct from measured infrastructure state.",
    screenshotEvidence: "Meta AI source text in this chat names “The Solar System,” a claimed Episode 46 destination, a geo-threat interface, IPFS daemon language, and an assertion-sweep export. No associated screenshot, source file, public master, live provider record, or verified route response was supplied for independent inspection.",
    boundary: "No `/episodes/46` route, geo-threat dashboard, 470,000-node network, host firewall, WebSocket stream, systemd service, IPFS or IPNS action, CID pin, assertion sweep, benchmark, or external deployment is created, verified, or active from this source record.",
    color: "#FFD580",
    icon: Layers3,
  },
];

const GOOGLE_FRAGMENT_SCREENSHOTS = [
  { file: "IMG_4216.PNG", focus: "Google AI Mode query-screen state", state: "Visible source interface only" },
  { file: "IMG_4217.PNG", focus: "Episode 41, local-cron, and firewall suggestion prompts", state: "Suggestions; no action initiated" },
  { file: "IMG_4218.PNG", focus: "Configuration excerpt and operating assertion", state: "Source claim; not runtime verification" },
  { file: "IMG_4219.PNG", focus: "The Absolute World Ordered cast matrix", state: "Narrative reference" },
  { file: "IMG_4220.PNG", focus: "Core Control Citadel scene direction", state: "Narrative reference" },
  { file: "IMG_4221.PNG", focus: "Benchmark-harness code excerpt", state: "Code reference with visible caution" },
  { file: "IMG_4222.PNG", focus: "Episode 43 and local benchmark / Nginx egress prompts", state: "Preparation prompts; no action initiated" },
  { file: "IMG_4223.PNG", focus: "Forensic-archive validator excerpt and catalog heading", state: "Code reference with visible caution" },
  { file: "IMG_4225.PNG", focus: "Apex Integrity Extension source-language excerpt", state: "Conversation-source statement; no external verification inferred" },
  { file: "IMG_4226.PNG", focus: "Source-trail and independently checked-state distinction", state: "Visible source boundary language" },
] as const;

function exportRecord(record: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function EpisodicOperationsArchive() {
  useSovereignHeartbeat({ page: "episodic-operations-archive" });
  const [selectedId, setSelectedId] = useState("episode-24");
  const [note, setNote] = useState("");
  const selected = useMemo(() => EPISODES.find((record) => record.id === selectedId) ?? EPISODES[0], [selectedId]);
  const localRecord = {
    recordId: selected.id,
    episode: selected.episode,
    title: selected.title,
    source: selected.source,
    narrative: selected.narrative,
    reusableConcept: selected.reusableConcept,
    screenshotEvidence: selected.screenshotEvidence,
    operatingBoundary: selected.boundary,
    localNote: note,
    sourceState: "protected-reference",
    externalAction: "none",
  };

  const copy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(localRecord, null, 2));
    toast.success("Local episodic operations record copied.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#DCC8FF]/25 bg-[radial-gradient(circle_at_12%_10%,rgba(185,140,255,.22),transparent_30%),radial-gradient(circle_at_90%_28%,rgba(0,212,255,.16),transparent_28%),#050B1A]">
      <div className="container py-16 md:py-22">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/episode-experience" className="text-xs font-mono tracking-[.16em] text-[#E8DFFF]">← EPISODE EXPERIENCE</Link><span className="rounded-full border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#FFE09A]">SOURCE-LED REFERENCE · NO RUNTIME ACTIVE</span></div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#DCC8FF]">SCROLLVERSE · EPISODIC OPERATIONS ARCHIVE</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Episodic <span className="text-[#DCC8FF]">operations</span>.<br/>Source first. Runtime separate.</h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This browser-local archive unifies the supplied Episode 24 and Episodes 37–42 materials, the Episode 43 preparation prompt, and the Episode 46 Solar System source record. It preserves narrative, interface, local-validation, readiness, and screenshot evidence while keeping wallet, banking, chain, host, provider, exchange, and deployment claims visibly distinct from the verified portal state.</p></div><aside className="rounded-[2rem] border border-[#B5F7CC]/30 bg-[#00FF88]/[.05] p-7"><ShieldCheck className="h-9 w-9 text-[#B5F7CC]" /><p className="mt-5 text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black">Protected browser-local archive available now.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Selection, notes, copy, and JSON export stay in the browser. No source record creates a network, wallet, provider, contract, transaction, host, or deployment action.</p></aside></div>
      </div>
    </section>

    <section className="container py-8"><PortalTrustLens lane="Episodic Operations Archive" source="Owner-supplied Google/Gemini Episode 24 and Episodes 37–42 materials, the Episode 43 preparation prompt, two scoped Google conversation fragments with ten Google-rendered screenshots, and an owner-supplied Meta AI Episode 46 Solar System transmission." readiness="Inspect source-led records, add a browser-local note, copy, export, and follow currently verified local preparation routes now." boundary="Embedded wallet, banking, allocation, exchange, firewall, host, Nginx, WebSocket, cron, RPC, daemon, ledger, provider, contract, deployment, node-scale, and test-count claims remain protected source material and do not establish active external state." /></section>

    <section className="container pb-3"><div className="rounded-[2rem] border border-[#FFA3A3]/30 bg-[#FFA3A3]/[.045] p-6 md:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#FFC9C9]">GOOGLE CONVERSATION FRAGMENTS · EVIDENCE REGISTER</p><h2 className="mt-2 text-3xl font-black">Ten visible screenshots, two supplied fragments.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">The register identifies only materials supplied in this chat. It does not claim to inventory all Google history, all related chats, or a connected Google account. Recorded transcript identifiers: <span className="font-mono text-[#FFC9C9]">4964fcc9…ff6de828</span> and <span className="font-mono text-[#A9E7FF]">b829c363…adb8a81b0</span>.</p></div><span className="rounded-full border border-[#FFC9C9]/35 bg-[#FFC9C9]/10 px-3 py-1 text-[10px] font-mono text-[#FFC9C9]">PROTECTED SOURCE INTAKE</span></div><div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{GOOGLE_FRAGMENT_SCREENSHOTS.map((screenshot) => <div key={screenshot.file} className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-xs font-mono text-[#FFC9C9]">{screenshot.file}</p><p className="mt-3 text-sm font-bold">{screenshot.focus}</p><p className="mt-2 text-xs leading-6 text-[#B8C7D6]">{screenshot.state}</p></div>)}</div></div></section>

    <section className="container py-6"><div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]"><div className="grid gap-3">{EPISODES.map((record) => { const Icon = record.icon; return <button key={record.id} type="button" onClick={() => { setSelectedId(record.id); toast.success("Local episodic record selected."); }} className="rounded-2xl border p-5 text-left transition hover:-translate-y-0.5" style={{ borderColor: selectedId === record.id ? `${record.color}AA` : `${record.color}42`, background: selectedId === record.id ? `${record.color}14` : "rgba(255,255,255,.025)" }}><Icon className="h-7 w-7" style={{ color: record.color }} /><p className="mt-4 text-[10px] font-mono tracking-[.14em]" style={{ color: record.color }}>{record.episode}</p><h2 className="mt-2 text-xl font-black">{record.title}</h2><p className="mt-3 text-xs leading-6 text-[#B8C7D6]">Protected source-led record</p></button>; })}</div><article className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7 md:p-8"><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: selected.color }}>{selected.episode}</p><h2 className="mt-3 text-4xl font-black">{selected.title}</h2><div className="mt-6 rounded-2xl border p-5" style={{ borderColor: `${selected.color}4A`, background: `${selected.color}08` }}><p className="text-[10px] font-mono" style={{ color: selected.color }}>SOURCE CONTEXT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.source}</p></div><div className="mt-4 rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-5"><p className="text-[10px] font-mono text-[#9DEBFF]">NARRATIVE + REUSABLE CONCEPT</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.narrative}</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.reusableConcept}</p></div><div className="mt-4 rounded-2xl border border-[#DCC8FF]/25 bg-[#DCC8FF]/[.04] p-5"><p className="text-[10px] font-mono text-[#E8DFFF]">SCREENSHOT / SOURCE EVIDENCE</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.screenshotEvidence}</p></div><div className="mt-4 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.055] p-5"><div className="flex gap-3"><FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-[#FFE09A]" /><div><p className="text-[10px] font-mono text-[#FFE09A]">OPERATING-STATE BOUNDARY</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.boundary}</p></div></div></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Browser-local narrative, source, or readiness review note" className="mt-5 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none" /><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#DCC8FF]/45 bg-[#DCC8FF]/10 px-4 py-3 text-xs font-black text-[#E8DFFF]"><Copy className="h-4 w-4" /> COPY RECORD</button><button type="button" onClick={() => { exportRecord(localRecord, `scrollverse-${selected.id}-protected-record.json`); toast.success("Local episodic record exported."); }} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-black" style={{ borderColor: `${selected.color}66`, color: selected.color, background: `${selected.color}10` }}><Download className="h-4 w-4" /> JSON</button></div></article></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[{ href: "/youtube-episode-release-desk", title: "YouTube Episode Release Desk", text: "Prepare public-version episode metadata and exact owner-release records.", color: "#FFBBBB", icon: Film }, { href: "/episode-37-ledger-sync", title: "Episode 37 Record", text: "Inspect the focused local ledger-sync narrative and readiness reference.", color: "#9DEBFF", icon: Braces }, { href: "/episode-38-exchange-matrix", title: "Episode 38 Record", text: "Open the source-led exchange-matrix and local-validation record.", color: "#B5F7CC", icon: Landmark }, { href: "/episode-39-exchange-perimeter", title: "Episode 39 Record", text: "Open the protected perimeter narrative and review-boundary record.", color: "#FFE09A", icon: ShieldCheck }, { href: "/episode-40-infrastructure-scaling", title: "Episode 40 Record", text: "Open the source-led benchmark and ingress-readiness record.", color: "#FFB8E2", icon: ServerCog }, { href: "/omnitotality-core-deck", title: "Omnitotality Core Deck", text: "Review the Episode 24 visual-system and production preparation record.", color: "#DCC8FF", icon: Layers3 }, { href: "/sovereign-isolation-terminal", title: "Isolation Terminal", text: "Open local evidence records, staged gates, and export controls.", color: "#FFE09A", icon: ShieldCheck }, { href: "/scrollverse-continuity-index", title: "Continuity Index", text: "Connect protected episode material to active-workspace source records.", color: "#FFB8E2", icon: BookOpenText }, { href: "/admin/royalty-records", title: "Local Royalty Records", text: "Review the non-custodial local record desk and its current controls.", color: "#B5F7CC", icon: Landmark }, { href: "/scrollverse-story-worlds", title: "Story Worlds", text: "Carry narrative themes into visual, learning, and media pathways.", color: "#B5F7CC", icon: ArrowRight }].map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} className="rounded-[1.7rem] border p-6 transition hover:-translate-y-0.5" style={{ borderColor: `${item.color}48`, background: `${item.color}08` }}><Icon className="h-8 w-8" style={{ color: item.color }} /><h2 className="mt-5 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: item.color }}>Open record <ArrowRight className="h-4 w-4" /></span></Link>; })}</div></section>
  </main>;
}
