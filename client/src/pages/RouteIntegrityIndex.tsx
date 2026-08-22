import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, CheckCircle2, Copy, Route, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type RouteRecord = {
  path: string;
  title: string;
  purpose: string;
  state: "available now" | "research" | "requires owner release";
  group: "Create" | "Release" | "Evidence" | "Discover";
};

const ROUTES: RouteRecord[] = [
  { path: "/creator-atlas", title: "Creator Atlas", purpose: "Unified discovery for ScrollVerse creator routes.", state: "available now", group: "Discover" },
  { path: "/central-hub-source-record", title: "Central Hub Source Record", purpose: "First-party catalog and fiction-preview source record.", state: "available now", group: "Evidence" },
  { path: "/original-episode-slate", title: "Original Episode Slate", purpose: "Public-version production briefs and non-posting cadence planning.", state: "available now", group: "Create" },
  { path: "/film-animation-studio", title: "Film + Animation Studio", purpose: "Creator-controlled production packs and specialist lanes.", state: "available now", group: "Create" },
  { path: "/game-worlds-studio", title: "Game Worlds Studio", purpose: "Original game concepts, learning lenses, and youth-safe readiness.", state: "available now", group: "Create" },
  { path: "/campaign-asset-registry", title: "Campaign Asset Registry", purpose: "Managed visual assets with source and placement records.", state: "available now", group: "Release" },
  { path: "/campaign-activation-center", title: "Campaign Activation Center", purpose: "First-party campaign briefs and browser-local Story or Event planning.", state: "available now", group: "Release" },
  { path: "/three-lane-release-register", title: "Three-Lane Release Register", purpose: "DNS, contract, and master-media exact-action preparation.", state: "requires owner release", group: "Release" },
  { path: "/londyn-ledger-evidence", title: "Londyn Ledger Evidence", purpose: "Public explorer evidence fields with no chain action.", state: "research", group: "Evidence" },
  { path: "/brand-identity-record", title: "Brand Identity Record", purpose: "Origin Ark Studios mark, mascot, and release boundary.", state: "available now", group: "Discover" },
  { path: "/special-repository", title: "Special Repository", purpose: "Artifact evidence, accession, and non-deployable metadata.", state: "available now", group: "Evidence" },
  { path: "/app-icon-candidate", title: "App Icon Candidate", purpose: "Manifest-ready icon candidates awaiting authenticated selection.", state: "requires owner release", group: "Release" },
  { path: "/episodic-operations-archive", title: "Episodic Operations Archive", purpose: "Protected episodic source records and local review controls.", state: "available now", group: "Evidence" },
  { path: "/empire-power-index", title: "Empire Power Index", purpose: "Searchable map of maintained ScrollVerse archive, evidence, creator, Game Worlds, continuity, and campaign routes.", state: "available now", group: "Discover" },
  { path: "/protected-visual-intake", title: "Protected Visual Intake", purpose: "Ten directly observed protected visual source records with stable fingerprints and no screenshot republication.", state: "research", group: "Evidence" },
  { path: "/supplied-public-references", title: "Supplied Public References", purpose: "Five visible-scope public replay and prior-portal records with source and credential boundaries.", state: "research", group: "Evidence" },
  { path: "/episode-52-final-structural-expansion", title: "Episode 52 Recovery Gate", purpose: "Browser-local source-absence record for Final Structural Expansion, with direct reattachment and archive handoffs.", state: "research", group: "Evidence" },
  { path: "/manus-origin-historical-recovery", title: "Manus-Origin Historical Recovery", purpose: "Browser-local source-absence gate for an owner-identified historical shared-source pointer.", state: "research", group: "Evidence" },
  { path: "/omega-267-prior-hub-recovery", title: "Ω.267 Prior-Hub Recovery", purpose: "Browser-local source-absence gate for the Master Shoppable Meta Hub checkpoint reference.", state: "research", group: "Evidence" },
];

const STATE_COLORS: Record<RouteRecord["state"], string> = {
  "available now": "#00FF88",
  research: "#00D4FF",
  "requires owner release": "#FFB800",
};

export default function RouteIntegrityIndex() {
  useSovereignHeartbeat({ page: "route-integrity-index" });
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<"All" | RouteRecord["group"]>("All");

  const visibleRoutes = useMemo(() => ROUTES.filter((route) => {
    const queryMatch = `${route.title} ${route.path} ${route.purpose}`.toLowerCase().includes(query.toLowerCase());
    return queryMatch && (group === "All" || route.group === group);
  }), [group, query]);

  const copyRoute = async (route: RouteRecord) => {
    await navigator.clipboard.writeText(`${window.location.origin}${route.path}`);
    toast.success(`${route.title} route copied locally.`);
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white">
      <section className="border-b border-cyan-300/10 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,.15),transparent_36%),radial-gradient(circle_at_78%_28%,rgba(185,140,255,.14),transparent_32%)]">
        <div className="container py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-[.18em] text-[#00D4FF]"><Route className="h-4 w-4" /> ROUTE INTEGRITY INDEX · BROWSER-LOCAL</div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Every key path has a <span className="text-[#00D4FF]">clear return route.</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#C8D8E7]">A focused index of registered ScrollVerse creator, release, asset, and evidence records. This record verifies in-project route registration and direct handoffs; it does not assert the status of an external service, provider, or destination.</p>
          <div className="mt-8"><PortalTrustLens lane="Route integrity" source="Registered ScrollVerse router and browser-local route records" readiness="Key route paths are registered in the active portal router and available for direct visitor handoff." boundary="External hosting, provider action, campaign placement, account state, and on-chain activity are evaluated only in their dedicated source records." /></div>
        </div>
      </section>

      <section className="container py-10">
        <div className="rounded-3xl border border-white/10 bg-white/[.025] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00D4FF]" /><input aria-label="Search verified ScrollVerse routes" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a route, record, or purpose" className="w-full rounded-xl border border-cyan-300/20 bg-[#071426] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-300/70" /></div>
            <div className="flex flex-wrap gap-2">{(["All", "Create", "Release", "Evidence", "Discover"] as const).map((item) => <button key={item} type="button" onClick={() => setGroup(item)} className="rounded-full border px-3 py-2 text-xs font-bold transition" style={{ borderColor: group === item ? "#00D4FF" : "rgba(255,255,255,.12)", background: group === item ? "rgba(0,212,255,.13)" : "transparent", color: group === item ? "#00D4FF" : "#C8D8E7" }}>{item}</button>)}</div>
          </div>
          <p className="mt-5 text-xs font-mono text-[#88A1B8]"><span className="text-[#00FF88]">{visibleRoutes.length}</span> REGISTERED KEY PATHS IN THIS INDEX</p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">{visibleRoutes.map((route) => <article key={route.path} className="rounded-3xl border border-white/10 bg-white/[.025] p-6 transition hover:-translate-y-0.5 hover:border-cyan-300/35">
          <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-mono tracking-[.16em] text-[#88A1B8]">{route.group.toUpperCase()} PATH</p><h2 className="mt-2 text-xl font-black">{route.title}</h2></div><span className="rounded-full border px-3 py-1 text-[10px] font-mono font-bold" style={{ borderColor: `${STATE_COLORS[route.state]}66`, color: STATE_COLORS[route.state], background: `${STATE_COLORS[route.state]}10` }}>{route.state.toUpperCase()}</span></div>
          <p className="mt-4 text-sm leading-6 text-[#C8D8E7]">{route.purpose}</p><p className="mt-4 rounded-lg border border-white/10 bg-[#020A15] px-3 py-2 text-xs font-mono text-[#00D4FF]">{route.path}</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href={route.path} className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-4 py-2 text-xs font-black text-[#04101C]">OPEN ROUTE <ArrowUpRight className="h-3.5 w-3.5" /></Link><button type="button" onClick={() => copyRoute(route)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-xs font-bold text-[#C8D8E7]"><Copy className="h-3.5 w-3.5" /> COPY</button></div>
        </article>)}</div>
        {visibleRoutes.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-10 text-center text-[#C8D8E7]">No indexed path matches this filter. Return to <Link href="/creator-atlas" className="text-[#00D4FF] underline">Creator Atlas</Link> for broader discovery.</div>}

        <div className="mt-10 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-[#00FF88]/25 bg-[#00FF88]/[.05] p-5"><CheckCircle2 className="h-5 w-5 text-[#00FF88]" /><h3 className="mt-3 font-black">Direct recovery</h3><p className="mt-2 text-sm leading-6 text-[#C8D8E7]">Every card provides its path plus a direct open control.</p></div><div className="rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.05] p-5"><ShieldCheck className="h-5 w-5 text-[#00D4FF]" /><h3 className="mt-3 font-black">Source before claim</h3><p className="mt-2 text-sm leading-6 text-[#C8D8E7]">The index distinguishes in-project paths from external states.</p></div><div className="rounded-2xl border border-[#FFB800]/25 bg-[#FFB800]/[.05] p-5"><Route className="h-5 w-5 text-[#FFB800]" /><h3 className="mt-3 font-black">Owner-release lanes</h3><p className="mt-2 text-sm leading-6 text-[#C8D8E7]">Routes that prepare external choices remain visibly gated.</p></div></div>
      </section>
    </main>
  );
}
