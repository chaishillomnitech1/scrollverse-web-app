import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { CREATOR_CHANNEL_HANDOFFS } from "@/data/creatorChannelHandoffs";

const FIRST_PARTY_LANES = [
  { number: "01", title: "Create & stage", detail: "Prepare original media, source notes, consent, and release materials before any external decision.", href: "/creator-media-studio", action: "Open Creator Media Studio", color: "#00D4FF" },
  { number: "02", title: "Discover & converse", detail: "Find public creator discovery, featured work, and media worlds while keeping public posts distinct from rights decisions.", href: "/media-world", action: "Explore Media World", color: "#FFB800" },
  { number: "03", title: "Prepare the handoff", detail: "Use the first-party release and distribution guides before visiting an outside provider or creator channel.", href: "/signalworks", action: "Open Signalworks", color: "#00FF88" },
  { number: "04", title: "Trace the source", detail: "Follow source-to-review operations and public project evidence without mistaking a link for a deployment or approval.", href: "/github-ops", action: "Open GitHub Operations", color: "#B98CFF" },
] as const;

const OFFICIAL_PREPARATION_PATHS = [
  { title: "YouTube Studio", category: "VIDEO + LIVE", url: "https://studio.youtube.com", note: "Provider-owned channel workspace. Your Google account, eligibility, and platform policy control access.", color: "#FF5568" },
  { title: "Spotify for Artists", category: "MUSIC", url: "https://artists.spotify.com/", note: "Official artist-tool destination. Artist access is distinct from distribution, editorial placement, or partnership.", color: "#00FF88" },
  { title: "OBS Project Knowledge Base", category: "LIVE PRODUCTION", url: "https://obsproject.com/kb/whip-streaming-guide", note: "Technical reference for creator-controlled preparation. It does not create a live provider connection in ScrollVerse.", color: "#00D4FF" },
] as const;

export default function DigitalHighways() {
  useSovereignHeartbeat({ page: "digital-highways" });

  return (
    <main className="min-h-screen pb-20 text-white" style={{ background: "radial-gradient(circle at 83% 7%, rgba(0,212,255,0.14), transparent 31%), radial-gradient(circle at 10% 58%, rgba(255,184,0,0.12), transparent 35%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b" style={{ borderColor: "rgba(0,212,255,0.18)" }}>
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← SCROLLVERSE HOME</Link>
            <span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: "rgba(0,255,136,0.42)", color: "#00FF88" }}>FIRST-PARTY MAP · TRANSPARENT HANDOFFS</span>
          </div>
          <div className="mt-14 grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#00D4FF" }}>SCROLLVERSE DIGITAL HIGHWAYS</div>
              <h1 className="mt-5 text-5xl font-black leading-[0.9] sm:text-7xl">Keep the route.<br /><span style={{ color: "#00FF88" }}>Choose the horizon.</span></h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>A single, source-labeled navigator that keeps ScrollVerse routes, creator-provided destinations, and official preparation resources visibly distinct. It helps people find the next meaningful route without claiming shared traffic, provider access, affiliation, or a guaranteed outcome.</p>
            </div>
            <aside className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(255,184,0,0.34)", background: "rgba(255,184,0,0.045)" }}>
              <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>HIGHWAY RULE</div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#D8E3EF" }}>An outbound link is a transparent referral. It is not transferred traffic, shared audience data, account control, endorsement, platform partnership, or a promise that a provider will review or publish work.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>STAY IN SCROLLVERSE</div>
        <h2 className="mt-3 text-3xl font-black">Build the first-party record first.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {FIRST_PARTY_LANES.map(lane => <Link key={lane.href} href={lane.href} className="group rounded-[1.7rem] border p-6 transition-transform hover:-translate-y-1" style={{ borderColor: `${lane.color}40`, background: "rgba(4,14,30,0.72)" }}>
            <div className="flex items-start justify-between gap-4"><span className="text-sm font-mono" style={{ color: lane.color }}>{lane.number}</span><span className="text-xl" style={{ color: lane.color }}>→</span></div>
            <h3 className="mt-8 text-xl font-black">{lane.title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{lane.detail}</p><div className="mt-6 text-xs font-black" style={{ color: lane.color }}>{lane.action} →</div>
          </Link>)}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>CREATOR-PROVIDED DESTINATIONS</div><h2 className="mt-3 text-3xl font-black">Continue at a creator-supplied source.</h2></div><p className="max-w-xl text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>These destinations were supplied by the ScrollVerse creator. Their source and platform-control note stays visible; each opens away from the portal in a new tab.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{CREATOR_CHANNEL_HANDOFFS.map(channel => <article key={channel.url} className="flex min-h-64 flex-col rounded-3xl border p-5" style={{ borderColor: `${channel.color}38`, background: "rgba(4,14,30,0.7)" }}><div className="flex items-start justify-between gap-4"><div className="text-2xl" style={{ color: channel.color }}>{channel.icon}</div><span className="rounded-full px-2.5 py-1 text-[10px] font-mono" style={{ background: `${channel.color}16`, color: channel.color }}>{channel.lane.toUpperCase()}</span></div><h3 className="mt-6 text-xl font-black">{channel.title}</h3><p className="mt-1 text-xs font-mono" style={{ color: channel.color }}>CREATOR-PROVIDED · {channel.destination.toUpperCase()}</p><p className="mt-4 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>{channel.note}</p><a href={channel.url} target="_blank" rel="noreferrer" className="mt-auto pt-6 text-sm font-black" style={{ color: channel.color }}>Open source destination <span aria-hidden>↗</span></a></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>OFFICIAL PREPARATION RESOURCES</div><h2 className="mt-3 text-3xl font-black">Study the provider’s own path before you hand work off.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{OFFICIAL_PREPARATION_PATHS.map(path => <article key={path.url} className="flex min-h-60 flex-col rounded-[1.7rem] border p-6" style={{ borderColor: `${path.color}38`, background: "rgba(255,255,255,0.018)" }}><div className="text-[10px] font-mono tracking-widest" style={{ color: path.color }}>{path.category}</div><h3 className="mt-6 text-xl font-black">{path.title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{path.note}</p><a href={path.url} target="_blank" rel="noreferrer" className="mt-auto pt-6 text-sm font-black" style={{ color: path.color }}>Open official resource <span aria-hidden>↗</span></a></article>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16"><div className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.04)" }}><div className="flex flex-wrap items-center justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>KEEP THE HIGHWAY HONEST</div><h2 className="mt-3 text-2xl font-black">Need a release record before choosing an external path?</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Creator Operations and the Media Dock keep source, consent, review, and release-preparation work in the first-party portal. They never submit, license, or distribute work automatically.</p></div><div className="flex flex-wrap gap-3"><Link href="/creator-operations" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00FF88", color: "#050B1A" }}>Creator Operations</Link><Link href="/media-dock" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.46)", color: "#00D4FF" }}>Media Dock</Link></div></div></div></section>
    </main>
  );
}
