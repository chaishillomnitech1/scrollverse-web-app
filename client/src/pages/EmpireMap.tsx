import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const ZONES = [
  {
    code: "01",
    title: "Guide · Build · Operate",
    color: "#B98CFF",
    description: "The first-party command paths for navigating the portal, reviewing evidence, and organizing creator-owned work.",
    links: [
      ["Manus Hero", "/manus-hero", "Warm multi-path guide into ScrollVerse."],
      ["Specialist Constellation", "/specialist-constellation", "Named first-party guides with defined responsibilities and handoffs."],
      ["GitHub Operations", "/github-ops", "Source → review → test → owner decision operating lane."],
      ["Revenue Operations", "/revenue-ops", "Protected readiness records and non-transactional review schedule."],
      ["Evidence Standards", "/evidence-standards", "Source, status, and dependency model."],
    ],
  },
  {
    code: "02",
    title: "Create · Stage · Share",
    color: "#FFB800",
    description: "Creator-owned routes for media, culture, fashion, distribution preparation, and community discovery.",
    links: [
      ["Media World", "/media-world", "Verified media-world directory for staging, conversation, film, and creator handoffs."],
      ["Creator Media Dock", "/media-dock", "Protected consent and provenance staging for supported files."],
      ["Think Space", "/think-space", "Public conversation and verified-link discovery layer."],
      ["Signalworks", "/signalworks", "Creator-provided distribution handoffs and release navigation."],
      ["Fashion Portfolio", "/fashion-portfolio", "Original first-party fashion concepts and saved lookboards."],
    ],
  },
  {
    code: "03",
    title: "Identity · Health · Evidence",
    color: "#00FF88",
    description: "Source-linked identity, provenance, educational health research, and readiness pathways.",
    links: [
      ["Spiral Signature", "/spiral-signature", "Creator-owned identity concept and QR record with release boundaries."],
      ["Identity System", "/identity-system", "First-party visual system and IP-readiness orientation."],
      ["IP Readiness", "/ip-readiness", "Evidence-led inventory, provenance, and professional-review preparation for original assets."],
      ["Creator Operations", "/creator-operations", "Protected support, provenance, release, and asset workflow."],
      ["Health Research Desk", "/health-research", "Open official sources, data, directories, and attributed reports with limits visible."],
      ["Health Navigator", "/health-navigator", "Educational record-preparation and urgent-care escalation guidance."],
    ],
  },
  {
    code: "04",
    title: "Digital Asset · Readiness",
    color: "#00D4FF",
    description: "Existing wallet, token, NFT, and systems routes. Interfaces and research do not alone establish custody, exchange, transfer, investment, or banking activation.",
    links: [
      ["Wallet", "/wallet", "Existing wallet-connection surface; user-controlled provider decisions remain separate."],
      ["Token", "/token", "Existing token-oriented portal route with separate evidence requirements for any live outcome."],
      ["NFT", "/nft", "Existing NFT marketplace route; no rights or commerce outcome is implied by navigation."],
      ["Nexus", "/nexus", "First-party digital-asset and archive pathway."],
      ["Chain Intelligence", "/chain-intelligence", "Source-linked explorer handoffs, network context, and evidence-state education without financial activation."],
      ["Systems Map", "/systems-map", "Implemented, planned, external, and conceptual layers in one source-labelled view."],
    ],
  },
] as const;

export default function EmpireMap() {
  useSovereignHeartbeat({ page: "empire-map" });
  return <main className="min-h-screen pb-20 text-white" style={{ background: "radial-gradient(circle at 84% 4%, rgba(185,140,255,0.16), transparent 26%), radial-gradient(circle at 5% 62%, rgba(0,212,255,0.12), transparent 35%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b" style={{ borderColor: "rgba(185,140,255,0.22)" }}><div className="mx-auto max-w-7xl px-5 pb-16 pt-28"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← SCROLLVERSE HOME</Link><span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: "rgba(185,140,255,0.46)", color: "#B98CFF" }}>FIRST-PARTY OPERATING MAP</span></div><div className="mt-14 grid gap-9 lg:grid-cols-[1.18fr_0.82fr] lg:items-end"><div><div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#B98CFF" }}>SCROLLVERSE EMPIRE MAP</div><h1 className="mt-5 text-5xl font-black leading-[0.9] sm:text-7xl">Every major path.<br /><span style={{ color: "#B98CFF" }}>Clear next steps.</span></h1><p className="mt-7 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>A live public navigator for the current ScrollVerse operating system. Every card leads to a registered first-party route. Each zone states whether it is a public experience, protected workflow, research layer, or evidence-dependent readiness path.</p></div><aside className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.34)", background: "rgba(0,255,136,0.045)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>READ THE STATUS</div><p className="mt-4 text-sm leading-relaxed" style={{ color: "#D8E3EF" }}>A route being live means the page or workflow is available. It does not by itself activate financial, custody, distribution, legal, partner, provider, or release outcomes. Evidence and owner decisions stay visible where they matter.</p></aside></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-16"><div className="grid gap-6 lg:grid-cols-2">{ZONES.map(zone => <section key={zone.code} className="rounded-[2rem] border p-7" style={{ borderColor: `${zone.color}40`, background: "rgba(4,14,30,0.72)" }}><div className="flex items-start gap-4"><div className="text-4xl font-black" style={{ color: zone.color }}>{zone.code}</div><div><div className="text-xs font-mono tracking-widest" style={{ color: zone.color }}>OPERATING ZONE</div><h2 className="mt-1 text-2xl font-black">{zone.title}</h2></div></div><p className="mt-5 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{zone.description}</p><div className="mt-6 space-y-2">{zone.links.map(([label, href, detail]) => <Link key={href} href={href} className="block rounded-2xl border p-4 transition-transform hover:translate-x-1" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.018)" }}><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-black" style={{ color: zone.color }}>{label}</h3><span className="text-xs" style={{ color: zone.color }}>Open →</span></div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#AEBFD0" }}>{detail}</p></Link>)}</div></section>)}</div></section>
    <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}><div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-3"><article><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>ZERO-DEAD-END STANDARD</div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Visible navigator links are registered as first-party routes and covered by route regression checks before publication.</p></article><article><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>EVIDENCE-COMMONS STANDARD</div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Discovery pages show source, date, evidence state, method context, and limits so visitors can make their own informed interpretation.</p></article><article><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>CREATOR-OWNED STANDARD</div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>First-party records, consent, provenance, and creator choice remain the center; external platforms are optional labeled handoffs.</p></article></div></section>
  </main>;
}
