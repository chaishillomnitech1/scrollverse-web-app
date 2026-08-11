import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type JourneyRoute = {
  title: string;
  href: string;
  description: string;
  status: "LIVE" | "START HERE" | "COMMUNITY";
};

type JourneyZone = {
  id: string;
  icon: string;
  title: string;
  signal: string;
  color: string;
  description: string;
  routes: JourneyRoute[];
};

const JOURNEY_ZONES: JourneyZone[] = [
  {
    id: "welcome",
    icon: "☀️",
    title: "Begin the Journey",
    signal: "Invitation · Orientation · Personal Path",
    color: "#FFB800",
    description: "Start with the sovereign invitation, then choose a living path through knowledge, creation, community, or fashion.",
    routes: [
      { title: "ScrollVerse Home", href: "/", description: "The Sun XIX invitation and living portal front door.", status: "START HERE" },
      { title: "Empire Index", href: "/empire-index", description: "Searchable map of the wider ScrollVerse archive.", status: "LIVE" },
      { title: "Guardian Activation", href: "/guardian-activation", description: "Guided activation and a saved Guardian badge path.", status: "START HERE" },
    ],
  },
  {
    id: "knowledge",
    icon: "📜",
    title: "Learn Freely",
    signal: "Seerah · Philosophy · Library",
    color: "#00FF88",
    description: "Free learning experiences across sacred history, philosophy, research, and long-form archives.",
    routes: [
      { title: "Seerah Archive", href: "/seerah", description: "Nine-scroll sacred library, timeline, and knowledge quiz.", status: "LIVE" },
      { title: "Philosophers Archive", href: "/philosophers-archive", description: "Socrati-led learning archive and children’s lessons.", status: "LIVE" },
      { title: "Mesopotamia Library", href: "/mesopotamia-library", description: "Open knowledge wings and the Socrati guide.", status: "LIVE" },
    ],
  },
  {
    id: "create",
    icon: "🌌",
    title: "Create & Share",
    signal: "Community · Media · Collaboration",
    color: "#00D4FF",
    description: "Publish original work, discover community voices, and explore the media universe.",
    routes: [
      { title: "Think Space", href: "/think-space", description: "Community publishing for music, film, art, and scholarship.", status: "COMMUNITY" },
      { title: "Featured Think Space", href: "/think-space/featured", description: "Curated discoveries across the community feed.", status: "COMMUNITY" },
      { title: "Music Catalog", href: "/music", description: "Music, listening, and artist distribution pathways.", status: "LIVE" },
    ],
  },
  {
    id: "intelligence",
    icon: "🤖",
    title: "Meet the Intelligence",
    signal: "AI Legion · Guidance · Building",
    color: "#7C5CFC",
    description: "Choose an intelligence portal for guidance, learning, or collaboration across the world.",
    routes: [
      { title: "AI Legion Apex", href: "/ai-legion-apex", description: "The primary guide to the ScrollVerse intelligence network.", status: "START HERE" },
      { title: "AI Council", href: "/ai-council", description: "Profiles and collaboration surfaces for the AI Council.", status: "LIVE" },
      { title: "Knick Oracle", href: "/knick", description: "Wisdom interface connected to the 99 Names experience.", status: "LIVE" },
    ],
  },
  {
    id: "fashion",
    icon: "👟",
    title: "Fashion & Design",
    signal: "XLVIII BLOCKS · Original Concepts · Review-Safe",
    color: "#FF6B35",
    description: "Explore original fashion concepts, build a lookboard, and see the protected review path behind future releases.",
    routes: [
      { title: "Fashion Portfolio", href: "/fashion-portfolio", description: "Original concept portfolio and public saved lookboards.", status: "START HERE" },
      { title: "Atlantis Collection", href: "/atlantis-collection", description: "Seven-set #XLVblocks Atlantis collection experience.", status: "LIVE" },
      { title: "Fashion Empire", href: "/fashion-empire", description: "XLVIII BLOCKS × VNLND design and production vision.", status: "LIVE" },
    ],
  },
  {
    id: "guardians",
    icon: "🛡️",
    title: "Gather & Activate",
    signal: "Guardians · DC · Shared Participation",
    color: "#D4AF37",
    description: "Take part in the Guardian pathway and follow the August 28 Washington, DC activation journey.",
    routes: [
      { title: "DC Visit", href: "/dc-visit", description: "August 28 event countdown, context, and Guardian entry.", status: "START HERE" },
      { title: "Guardian Leaderboard", href: "/guardian-leaderboard", description: "Participation standings and event framework.", status: "COMMUNITY" },
      { title: "Guardian Dashboard", href: "/guardian-dashboard", description: "Profile, onboarding, and Guardian pathways.", status: "LIVE" },
    ],
  },
  {
    id: "archive",
    icon: "🏛️",
    title: "Preserve the Record",
    signal: "Books · Codex · Digital Archive",
    color: "#14B8A6",
    description: "Enter the book, codex, and archive layers that preserve the creative and educational record.",
    routes: [
      { title: "Digital Consciousness Archive", href: "/archive", description: "Searchable narrative and artifact archive.", status: "LIVE" },
      { title: "Sovereign Books", href: "/sovereign-books", description: "Books hub and verified access pathways.", status: "LIVE" },
      { title: "Codex", href: "/codex", description: "Research, visual archive, and impact covenant.", status: "LIVE" },
    ],
  },
];

export default function PortalNavigator() {
  useSovereignHeartbeat({ page: "portal-navigator" });
  const [query, setQuery] = useState("");
  const [activeZone, setActiveZone] = useState("all");
  const { data: user } = trpc.auth.me.useQuery();
  const isAuthenticated = Boolean(user);
  const overview = trpc.journey.overview.useQuery(undefined, { enabled: isAuthenticated });
  const markProgress = trpc.journey.markProgress.useMutation({ onSuccess: () => overview.refetch() });
  const setAnalyticsPreference = trpc.journey.setAnalyticsPreference.useMutation({ onSuccess: () => overview.refetch() });
  const trackInteraction = trpc.journey.trackInteraction.useMutation();

  useEffect(() => {
    if (isAuthenticated) void overview.refetch();
  }, [isAuthenticated]);

  const trackRoute = (zoneId: string, href: string, eventType: "ROUTE_SELECTED" | "RECOMMENDATION_SELECTED" = "ROUTE_SELECTED") => {
    if (isAuthenticated) trackInteraction.mutate({ eventType, zoneId, targetHref: href });
  };

  const zones = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return JOURNEY_ZONES
      .filter(zone => activeZone === "all" || zone.id === activeZone)
      .map(zone => ({
        ...zone,
        routes: zone.routes.filter(route => !normalized || [zone.title, zone.signal, route.title, route.description].join(" ").toLowerCase().includes(normalized)),
      }))
      .filter(zone => zone.routes.length > 0);
  }, [activeZone, query]);

  return (
    <main className="min-h-screen pb-24" style={{ background: "#050B1A", color: "#F8FAFC", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b overflow-hidden" style={{ borderColor: "rgba(0,212,255,0.18)", background: "radial-gradient(circle at 10% 5%, rgba(0,212,255,0.15), transparent 36%), radial-gradient(circle at 88% 20%, rgba(255,184,0,0.12), transparent 32%)" }}>
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-24">
          <p className="text-xs font-mono tracking-[0.2em]" style={{ color: "#00D4FF" }}>SCROLLVERSE / START HERE / INTEGRATED JOURNEY MAP</p>
          <div className="mt-6 grid lg:grid-cols-[1.25fr_.75fr] gap-10 items-end">
            <div>
              <h1 className="text-4xl md:text-6xl font-black leading-[0.96] tracking-tight">Choose your <span style={{ color: "#00D4FF" }}>next portal.</span></h1>
              <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "#9FB0C4" }}>A concise guide through the public ScrollVerse experiences: learn, create, meet the AI Legion, explore original fashion concepts, gather with Guardians, and preserve the record.</p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(5,11,26,0.68)", border: "1px solid rgba(0,212,255,0.22)" }}>
              <div className="text-xs font-mono" style={{ color: "#00FF88" }}>DISCOVERY PROTOCOL</div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#C7D3E0" }}>Every destination below is a public route. Protected administration, review records, payments, and approval controls remain separate from this discovery layer.</p>
              <Link href="/empire-index" className="inline-flex mt-5 rounded-lg px-4 py-2 text-sm font-bold" style={{ background: "rgba(255,184,0,0.12)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.28)" }}>Open the full Empire Index →</Link>
            </div>
          </div>
          {isAuthenticated && overview.data && <div className="mt-8 rounded-2xl p-5 md:p-6" style={{ background: "rgba(0,212,255,0.055)", border: "1px solid rgba(0,212,255,0.22)" }}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="max-w-xl"><p className="text-xs font-mono tracking-[0.16em]" style={{ color: "#00D4FF" }}>YOUR GUARDIAN PATH</p><h2 className="mt-2 text-2xl font-black">{overview.data.progress.completeSteps} of {overview.data.progress.totalSteps} orientation steps complete</h2><div className="mt-4 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}><div className="h-full rounded-full" style={{ width: `${(overview.data.progress.completeSteps / overview.data.progress.totalSteps) * 100}%`, background: "linear-gradient(90deg, #00D4FF, #00FF88)" }} /></div><p className="mt-3 text-sm" style={{ color: "#9FB0C4" }}>This private marker only records your selected orientation steps; it has no score, payment, or eligibility effect.</p></div>
              <div className="flex flex-wrap gap-2"><button onClick={() => markProgress.mutate({ step: "ACTIVATION_STARTED" })} className="rounded-lg px-4 py-2 text-sm font-bold" style={{ background: "rgba(255,184,0,0.12)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.28)" }}>Mark activation started</button><button onClick={() => setAnalyticsPreference.mutate({ enabled: !overview.data.analyticsEnabled })} className="rounded-lg px-4 py-2 text-sm font-bold" style={{ background: "rgba(255,255,255,0.04)", color: "#B8C6D8", border: "1px solid rgba(255,255,255,0.12)" }}>{overview.data.analyticsEnabled ? "Turn off private analytics" : "Enable 90-day journey analytics"}</button></div>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-3">{overview.data.recommendations.map(recommendation => <Link key={recommendation.href} href={recommendation.href} onClick={() => { markProgress.mutate({ step: "RECOMMENDATION_VISITED" }); trackRoute("personalized", recommendation.href, "RECOMMENDATION_SELECTED"); }} className="rounded-xl p-4" style={{ background: "rgba(5,11,26,0.55)", border: `1px solid ${recommendation.tone === "gold" ? "rgba(255,184,0,0.28)" : recommendation.tone === "green" ? "rgba(0,255,136,0.26)" : "rgba(0,212,255,0.28)"}` }}><p className="font-bold">{recommendation.title}</p><p className="mt-1 text-xs leading-relaxed" style={{ color: "#9FB0C4" }}>{recommendation.description}</p></Link>)}</div>
          </div>}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <label className="relative block max-w-xl w-full">
            <span className="sr-only">Search ScrollVerse journeys</span>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search journeys, topics, or destinations…" className="w-full rounded-xl px-5 py-3.5 bg-transparent outline-none text-sm" style={{ border: "1px solid rgba(0,212,255,0.25)", color: "#F8FAFC" }} />
          </label>
          <div className="text-sm font-mono" style={{ color: "#718096" }}>{zones.reduce((sum, zone) => sum + zone.routes.length, 0)} curated routes</div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          <button onClick={() => setActiveZone("all")} className="shrink-0 rounded-full px-4 py-2 text-xs font-bold" style={{ background: activeZone === "all" ? "#00D4FF" : "rgba(255,255,255,0.04)", color: activeZone === "all" ? "#050B1A" : "#B8C6D8" }}>All paths</button>
          {JOURNEY_ZONES.map(zone => <button key={zone.id} onClick={() => { setActiveZone(zone.id); if (isAuthenticated) trackInteraction.mutate({ eventType: "ZONE_OPENED", zoneId: zone.id }); }} className="shrink-0 rounded-full px-4 py-2 text-xs font-bold" style={{ background: activeZone === zone.id ? `${zone.color}22` : "rgba(255,255,255,0.04)", border: `1px solid ${activeZone === zone.id ? `${zone.color}75` : "rgba(255,255,255,0.08)"}`, color: activeZone === zone.id ? zone.color : "#B8C6D8" }}>{zone.icon} {zone.title}</button>)}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {zones.map(zone => (
            <section key={zone.id} className="rounded-3xl p-6 md:p-7" style={{ background: "linear-gradient(145deg, rgba(15,26,45,0.92), rgba(5,11,26,0.9))", border: `1px solid ${zone.color}33` }}>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${zone.color}16`, border: `1px solid ${zone.color}35` }}>{zone.icon}</div>
                <div>
                  <p className="text-[11px] font-mono tracking-[0.14em]" style={{ color: zone.color }}>{zone.signal.toUpperCase()}</p>
                  <h2 className="mt-1 text-2xl font-black">{zone.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A8B6C7" }}>{zone.description}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {zone.routes.map(route => (
                  <Link key={route.href} href={route.href} onClick={() => trackRoute(zone.id, route.href)} className="group rounded-xl p-4 transition-transform hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-start justify-between gap-4">
                      <div><h3 className="font-bold group-hover:text-[#00D4FF] transition-colors">{route.title}</h3><p className="mt-1 text-xs leading-relaxed" style={{ color: "#8EA0B5" }}>{route.description}</p></div>
                      <span className="shrink-0 rounded-full px-2 py-1 text-[9px] font-mono" style={{ color: route.status === "START HERE" ? "#FFB800" : route.status === "COMMUNITY" ? "#00FF88" : "#00D4FF", background: "rgba(255,255,255,0.045)" }}>{route.status}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {zones.length === 0 && <div className="mt-10 rounded-2xl p-10 text-center" style={{ border: "1px solid rgba(0,212,255,0.18)", color: "#9FB0C4" }}>No journey matches that search. Try a broader word or open the complete Empire Index.</div>}
      </section>
    </main>
  );
}
