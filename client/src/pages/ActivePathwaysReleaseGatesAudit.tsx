import { Link } from "wouter";
import {
  Archive,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Film,
  Gamepad2,
  LockKeyhole,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type PathwayState = "available now" | "research" | "requires owner release";

type Pathway = {
  id: string;
  category: string;
  title: string;
  state: PathwayState;
  summary: string;
  routes: Array<{ label: string; href: string }>;
  nextGate: string;
  icon: typeof Gamepad2;
};

const STATE_STYLE: Record<PathwayState, { accent: string; background: string; border: string }> = {
  "available now": { accent: "#00FF88", background: "rgba(0,255,136,.08)", border: "rgba(0,255,136,.32)" },
  research: { accent: "#00D4FF", background: "rgba(0,212,255,.08)", border: "rgba(0,212,255,.32)" },
  "requires owner release": { accent: "#FFB800", background: "rgba(255,184,0,.09)", border: "rgba(255,184,0,.34)" },
};

const PATHWAYS: Pathway[] = [
  {
    id: "omniland",
    category: "Game Worlds",
    title: "Omniland delivery and input research",
    state: "research",
    summary: "Consoleless-first delivery, conventional controls, motion and hand-interaction research, accessible participation, and creator contribution records are available for study in the portal.",
    routes: [
      { label: "Game Worlds Studio", href: "/game-worlds-studio" },
      { label: "Game Systems Research", href: "/game-systems-research-blueprint" },
      { label: "Consoleless Delivery", href: "/omniland-consoleless-delivery" },
      { label: "Embodied Play", href: "/omniland-embodied-play" },
    ],
    nextGate: "Owner release is required before any platform access, hardware, wearable, controller, licensing, certification, privacy, security, partner, or commercial capability is represented as active.",
    icon: Gamepad2,
  },
  {
    id: "media",
    category: "Media and social",
    title: "Media, film, and channel preparation",
    state: "available now",
    summary: "Browser-local production concepts, catalog handoffs, YouTube research, release desks, and visual-story routes are present for planning and discovery.",
    routes: [
      { label: "Media Concept Board", href: "/media-release-concept-board" },
      { label: "Film & Animation Studio", href: "/film-animation-studio" },
      { label: "YouTube Release Desk", href: "/youtube-episode-release-desk" },
      { label: "Music Catalog", href: "/music" },
    ],
    nextGate: "Posting, account access, uploads, publishing, advertising, sharing, paid placement, and platform submissions each require the exact owner-controlled release action.",
    icon: Film,
  },
  {
    id: "wear",
    category: "Fashion and visual presentation",
    title: "Wear concept-to-production preparation",
    state: "research",
    summary: "Fashion references, technical-pack context, catalog presentation, and original visual-development routes support browser-local preparation without representing a vendor or storefront activation.",
    routes: [
      { label: "Fashion Empire", href: "/fashion-empire" },
      { label: "MEIN Lookbook", href: "/mein" },
      { label: "Creator Visual Atlas", href: "/creator-visual-intake-atlas" },
      { label: "Cartoon Gallery", href: "/sovereign-cartoon-gallery" },
    ],
    nextGate: "A verified production brief, vendor choice, product approval, asset authorization, inventory details, and owner release are required before manufacturing, listing, sale, or fulfillment.",
    icon: Palette,
  },
  {
    id: "campaign",
    category: "Campaign and catalog",
    title: "Campaign, archive, and catalog routing",
    state: "available now",
    summary: "Campaign planning, catalog discovery, first-party route mapping, and source-led archive records are ready to connect a release concept to its evidence and destination pathways.",
    routes: [
      { label: "Campaign Activation Center", href: "/campaign-activation-center" },
      { label: "Empire Index", href: "/empire-index" },
      { label: "Connected Source Registry", href: "/connected-source-registry" },
      { label: "Omniverse Master Index", href: "/omniverse-manifesto-master-index" },
    ],
    nextGate: "Any public campaign launch, creator outreach, paid placement, distribution submission, or account action requires a specific destination, approved asset, scope, and owner release.",
    icon: Sparkles,
  },
  {
    id: "commerce",
    category: "Commerce and financial readiness",
    title: "Commerce and financial highways planning",
    state: "requires owner release",
    summary: "The portal documents catalog, campaign, treasury-framework, and storefront preparation while preserving exact fail-closed boundaries for external financial operations.",
    routes: [
      { label: "Commerce Readiness", href: "/commerce-financial-readiness-board" },
      { label: "Three-Lane Release Register", href: "/three-lane-release-register" },
      { label: "Revenue Dashboard", href: "/revenue-dashboard" },
      { label: "Special Repository", href: "/special-repository" },
    ],
    nextGate: "A separate Shopify-configured project or fork, verified offer inputs, approved listing, checkout configuration, payout route, and owner release are required before any product or financial transaction is active.",
    icon: CircleDollarSign,
  },
  {
    id: "evidence",
    category: "Protected sources and continuity",
    title: "Protected evidence and creator continuity",
    state: "available now",
    summary: "Source records, visual-evidence hubs, recovery gates, archive pathways, and continuity documentation preserve owner-supplied context as source-labeled material.",
    routes: [
      { label: "Protected Visual Evidence", href: "/protected-visual-evidence-hub" },
      { label: "Protected Source Convergence", href: "/protected-source-convergence" },
      { label: "Route Integrity Index", href: "/route-integrity-index" },
      { label: "Special Repository", href: "/special-repository" },
    ],
    nextGate: "External repository creation, public source release, deployment, account connection, or configuration execution requires its own verified destination and owner-controlled action.",
    icon: Archive,
  },
];

const EXTERNAL_GATES = [
  { gate: "Social and account actions", detail: "Posting, uploading, account edits, channel actions, ads, sharing, and submissions require the exact destination and owner release." },
  { gate: "Shopify and products", detail: "A separate Shopify-configured project or fork, approved product inputs, listing approval, and a verified owner-controlled connection are required." },
  { gate: "Production and vendor activation", detail: "Vendor choice, production approval, authorized assets, product specification, inventory, and fulfillment release are required before activation." },
  { gate: "Checkout and payout", detail: "No checkout, payment, payout, exchange, wallet connection, transfer, or live financial action starts from this audit." },
  { gate: "Repository continuity", detail: "A separate external Game Systems repository requires owner-controlled creation through the connected repository workflow." },
];

export default function ActivePathwaysReleaseGatesAudit() {
  useSovereignHeartbeat({ page: "active-pathways-release-gates-audit" });

  const copyAuditScope = async () => {
    const text = "ScrollVerse Active Pathways and Release-Gates Audit — browser-local routes are available now or research; posting, commerce, financial, provider, account, platform, production, repository, and transaction actions require owner-controlled release.";
    await navigator.clipboard.writeText(text);
    toast.success("Audit scope copied for local use");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B1A] text-white">
      <section className="relative border-b border-cyan-300/20 bg-[radial-gradient(circle_at_12%_0%,rgba(0,212,255,.2),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(185,140,255,.16),transparent_28%),#050B1A]">
        <div className="container py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[.24em] text-cyan-300">SCROLLVERSE · ACTIVE PATHWAYS AUDIT · PHASE 751 / 752</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">One source-led map for what is <span className="text-cyan-300">available now</span>, in <span className="text-purple-300">research</span>, and awaiting an <span className="text-amber-300">owner release</span>.</h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">This browser-local audit connects current portal pathways across Game Worlds, media, fashion, campaign, catalog, commerce, and protected sources. It makes every external step exact without presenting a planning record as a platform action.</p>
            </div>
            <aside className="rounded-3xl border border-cyan-200/20 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/30">
              <p className="font-mono text-xs tracking-[.2em] text-cyan-300">AUDIT KEY</p>
              <div className="mt-5 space-y-3">
                {(Object.keys(STATE_STYLE) as PathwayState[]).map((state) => (
                  <div key={state} className="flex items-center gap-3 rounded-2xl border px-3 py-2" style={{ borderColor: STATE_STYLE[state].border, background: STATE_STYLE[state].background }}>
                    <CheckCircle2 size={16} style={{ color: STATE_STYLE[state].accent }} />
                    <span className="text-sm font-semibold capitalize" style={{ color: STATE_STYLE[state].accent }}>{state}</span>
                  </div>
                ))}
              </div>
              <button onClick={copyAuditScope} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-4 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20 active:scale-[.98]">
                <Search size={16} /> Copy audit scope
              </button>
            </aside>
          </div>
          <div className="mt-10">
            <PortalTrustLens lane="Active pathways and release-gates audit" source="Reconciled ScrollVerse route registry and browser-local game, media, fashion, campaign, commerce, archive, and source records" readiness="Browser-local audit available now" boundary="This audit does not post, connect an account, create a repository, activate a store, place a listing, enable checkout, initiate a payout, exchange, transfer, provider connection, production order, or chain action." />
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-mono text-xs tracking-[.2em] text-purple-300">SIX CONNECTED PATHWAYS</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Preparation routes with a clear next gate</h2>
          </div>
          <Link href="/empire-index" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white">Explore the Empire Index <ArrowRight size={16} /></Link>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {PATHWAYS.map((pathway) => {
            const Icon = pathway.icon;
            const state = STATE_STYLE[pathway.state];
            return (
              <article key={pathway.id} className="group rounded-3xl border border-white/10 bg-white/[.035] p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[.055]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl border p-3" style={{ color: state.accent, background: state.background, borderColor: state.border }}><Icon size={22} /></span>
                    <div>
                      <p className="font-mono text-[11px] tracking-[.18em] text-slate-400">{pathway.category.toUpperCase()}</p>
                      <h3 className="mt-1 text-xl font-black">{pathway.title}</h3>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold" style={{ color: state.accent, background: state.background, borderColor: state.border }}>{pathway.state}</span>
                </div>
                <p className="mt-5 leading-7 text-slate-300">{pathway.summary}</p>
                <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[.045] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-[.14em] text-amber-200"><LockKeyhole size={14} /> EXACT NEXT GATE</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{pathway.nextGate}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">
                  {pathway.routes.map((route) => <Link key={route.href} href={route.href} className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-200 hover:text-white">{route.label} <ArrowRight size={14} /></Link>)}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/50">
        <div className="container py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs tracking-[.2em] text-amber-300">OWNER-CONTROLLED EXTERNAL GATES</p>
              <h2 className="mt-3 text-3xl font-black">Release with a named destination and a deliberate action.</h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-300">The portal can prepare and connect source-labeled records. The following external steps stay deliberately outside the audit until the owner selects the exact destination and releases that action.</p>
            </div>
            <div className="space-y-3">
              {EXTERNAL_GATES.map((item) => <div key={item.gate} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><div className="flex items-center gap-2 font-bold text-white"><ShieldCheck size={17} className="text-cyan-300" />{item.gate}</div><p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="rounded-[2rem] border border-purple-300/20 bg-[linear-gradient(115deg,rgba(185,140,255,.13),rgba(0,212,255,.08),rgba(5,11,26,.65))] p-7 md:p-10">
          <p className="font-mono text-xs tracking-[.2em] text-purple-200">NEXT NAVIGATION POINT</p>
          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div><h2 className="text-3xl font-black">Move from audit to the focused record.</h2><p className="mt-3 max-w-2xl text-slate-200">Use the source hub to review supporting records, the release register for lane-specific preparation, or the Game Worlds Studio to continue Omniland research.</p></div>
            <div className="flex flex-wrap gap-3"><Link href="/connected-source-registry" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15">Source Registry</Link><Link href="/three-lane-release-register" className="rounded-xl border border-cyan-200/35 bg-cyan-300/10 px-4 py-3 text-sm font-bold text-cyan-50 hover:bg-cyan-300/20">Release Register</Link><Link href="/game-worlds-studio" className="rounded-xl border border-purple-200/35 bg-purple-300/10 px-4 py-3 text-sm font-bold text-purple-50 hover:bg-purple-300/20">Game Worlds</Link></div>
          </div>
        </div>
      </section>
    </main>
  );
}
