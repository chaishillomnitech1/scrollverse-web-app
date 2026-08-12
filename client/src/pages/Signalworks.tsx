import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { CREATOR_CHANNEL_HANDOFFS } from "@/data/creatorChannelHandoffs";

type Pathway = {
  provider: string;
  lane: "Film" | "Music" | "Live" | "Creator tools";
  icon: string;
  url: string;
  action: string;
  boundary: string;
  color: string;
};

const PATHWAYS: Pathway[] = [
  { provider: "Netflix", lane: "Film", icon: "◇", url: "https://help.netflix.com/en/node/100386", action: "Study the official pitch pathway", boundary: "Netflix does not accept unsolicited material. Signalworks is not an agent, producer, representative, or partner.", color: "#FF5568" },
  { provider: "Tubi", lane: "Film", icon: "◫", url: "https://partner.tubitv.com", action: "Open the Content Partners portal", boundary: "Provider registration or submission never guarantees acquisition, distribution, or placement.", color: "#00D4FF" },
  { provider: "Prime Video Slate", lane: "Film", icon: "▣", url: "https://videocentral.amazon.com/support/welcome-to-prime-video-slate/getting-started/self-publishing-contract-partners", action: "Review the self-publishing workflow", boundary: "Amazon retains all policy, review, and publication decisions. No account or material is submitted here.", color: "#FFB800" },
  { provider: "Filmhub", lane: "Film", icon: "◉", url: "https://filmhub.com/", action: "Explore film delivery requirements", boundary: "Quality control, channel licensing, and release decisions remain with Filmhub and each destination channel.", color: "#B98CFF" },
  { provider: "Spotify for Artists", lane: "Music", icon: "♫", url: "https://artists.spotify.com/", action: "Claim or explore artist tools", boundary: "Artist access is not distribution, editorial placement, sponsorship, or platform partnership.", color: "#00FF88" },
  { provider: "Apple Music for Artists", lane: "Music", icon: "♪", url: "https://artists.apple.com/", action: "Access catalog management tools", boundary: "Existing releases and eligibility may be required. Signalworks does not place music or create provider accounts.", color: "#FF8DB5" },
  { provider: "Kick", lane: "Live", icon: "↗", url: "https://help.kick.com/en/articles/7066931-how-to-stream-on-kick-com", action: "Configure a creator broadcast path", boundary: "Streaming access is not partnership status, endorsement, or a revenue guarantee.", color: "#53FFB1" },
  { provider: "YouTube Studio", lane: "Live", icon: "▶", url: "https://studio.youtube.com", action: "Open your channel workspace", boundary: "Requires your own Google account. Signalworks never collects credentials or claims monetization eligibility.", color: "#FF5568" },
  { provider: "Meta Business Suite", lane: "Live", icon: "∞", url: "https://www.facebook.com/business/help/825637908842087", action: "Manage eligible publishing surfaces", boundary: "Use remains subject to Meta’s terms and eligibility; no affiliation or placement is represented.", color: "#79A8FF" },
  { provider: "CapCut", lane: "Creator tools", icon: "✂", url: "https://www.capcut.com/partners/template-creator-us", action: "Review the Template Creator path", boundary: "Creator-program acceptance depends on provider review, location, and current program criteria.", color: "#F6F8FF" },
];

const READINESS = [
  ["01", "Preserve the origin", "Keep a private provenance record of the work, source references, collaborators, and permissions before sharing materials."],
  ["02", "Prepare the delivery", "Check the provider’s own specifications for exports, captions, artwork, metadata, credits, age ratings, and accessibility."],
  ["03", "Choose the lane", "Use the official handoff that matches the work—film, music, livestream, social publishing, or creator tooling."],
  ["04", "Keep the record", "Document submissions and outcomes outside this navigator. Signalworks does not submit, license, price, or distribute work."],
] as const;

export default function Signalworks() {
  useSovereignHeartbeat({ page: "signalworks" });

  return (
    <main className="min-h-screen pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(0,212,255,0.18)", background: "radial-gradient(circle at 82% 3%, rgba(255,184,0,0.17), transparent 30%), radial-gradient(circle at 12% 62%, rgba(0,212,255,0.14), transparent 36%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-16">
          <div className="text-xs font-mono tracking-[0.24em]" style={{ color: "#00D4FF" }}>SCROLLVERSE SIGNALWORKS · CREATOR-FIRST DISTRIBUTION NAVIGATOR</div>
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-black leading-[0.9] tracking-tight sm:text-6xl">Move the work.<br /><span style={{ color: "#FFB800" }}>Keep the signal.</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "#C1D0DE" }}>A source-labelled public map for filmmakers, musicians, streamers, storytellers, and creators. Signalworks points to official starting places across distribution, publishing, and production tools—without claiming a partnership, submission authority, or outcome.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/commons" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#FFB800", color: "#050B1A" }}>Return to Commons</Link>
                <Link href="/journey" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.45)", color: "#00D4FF" }}>Find Your Route</Link>
                <Link href="/digital-highways" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.45)", color: "#00FF88" }}>Digital Highways</Link>
              </div>
            </div>
            <aside className="rounded-3xl border p-6" style={{ background: "rgba(4,14,30,0.82)", borderColor: "rgba(0,255,136,0.24)" }}>
              <div className="text-[10px] font-mono tracking-widest" style={{ color: "#00FF88" }}>SIGNALWORKS BOUNDARY</div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#D9E4F0" }}>This is a navigation layer, not a distributor, marketplace, talent agency, rights manager, payment processor, or platform partner. External destination rules, fees, eligibility, and decisions remain with each provider.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>OFFICIAL HANDOFFS</div><h2 className="mt-2 text-3xl font-black sm:text-4xl">Choose a lane. Use the source.</h2></div><p className="max-w-xl text-sm leading-relaxed" style={{ color: "#95A6B8" }}>Every card opens a provider-owned public route in a new tab. Review their requirements directly before deciding whether the path fits your work.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PATHWAYS.map(pathway => <article key={pathway.provider} className="flex min-h-72 flex-col rounded-3xl border p-5" style={{ borderColor: `${pathway.color}35`, background: "rgba(255,255,255,0.025)" }}>
            <div className="flex items-start justify-between gap-4"><div className="text-2xl" style={{ color: pathway.color }}>{pathway.icon}</div><span className="rounded-full px-2.5 py-1 text-[10px] font-mono" style={{ background: `${pathway.color}14`, color: pathway.color }}>{pathway.lane.toUpperCase()}</span></div>
            <h3 className="mt-6 text-xl font-black">{pathway.provider}</h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>{pathway.boundary}</p>
            <a href={pathway.url} target="_blank" rel="noreferrer" className="mt-auto pt-6 text-sm font-black" style={{ color: pathway.color }}>{pathway.action} <span aria-hidden>↗</span></a>
          </article>)}
        </div>
      </section>

      <section id="creator-channels" className="border-y" style={{ borderColor: "rgba(0,212,255,0.16)", background: "rgba(0,212,255,0.025)" }}>
        <div className="max-w-7xl mx-auto px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>CREATOR-PROVIDED DESTINATIONS</div><h2 className="mt-2 text-3xl font-black sm:text-4xl">Follow the signal at its source.</h2></div><p className="max-w-xl text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>These destinations were supplied by the ScrollVerse creator. They open in a new tab and remain subject to each platform’s access, policy, and visibility rules.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{CREATOR_CHANNEL_HANDOFFS.map(channel => <article key={channel.url} className="flex min-h-64 flex-col rounded-3xl border p-5" style={{ borderColor: `${channel.color}38`, background: "rgba(4,14,30,0.7)" }}><div className="flex items-start justify-between gap-4"><div className="text-2xl" style={{ color: channel.color }}>{channel.icon}</div><span className="rounded-full px-2.5 py-1 text-[10px] font-mono" style={{ background: `${channel.color}16`, color: channel.color }}>{channel.lane.toUpperCase()}</span></div><h3 className="mt-6 text-xl font-black">{channel.title}</h3><p className="mt-1 text-xs font-mono" style={{ color: channel.color }}>{channel.destination.toUpperCase()}</p><p className="mt-4 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>{channel.note}</p><a href={channel.url} target="_blank" rel="noreferrer" className="mt-auto pt-6 text-sm font-black" style={{ color: channel.color }}>Open creator-provided destination <span aria-hidden>↗</span></a></article>)}</div>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}>
        <div className="max-w-7xl mx-auto px-5 py-14">
          <div className="max-w-3xl"><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>CREATOR READINESS</div><h2 className="mt-3 text-3xl font-black">A handoff is not the work. It is the next accountable step.</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{READINESS.map(([number, title, body]) => <article key={number} className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.19)", background: "rgba(0,255,136,0.035)" }}><div className="text-[10px] font-mono" style={{ color: "#00FF88" }}>{number}</div><h3 className="mt-3 font-black">{title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14">
        <div className="rounded-3xl border p-7 sm:p-9" style={{ borderColor: "rgba(185,140,255,0.28)", background: "linear-gradient(130deg, rgba(185,140,255,0.10), rgba(0,212,255,0.04))" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>BUILD BEFORE YOU BROADCAST</div>
          <h2 className="mt-3 text-3xl font-black">Your original signature stays at the center.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed" style={{ color: "#D9E4F0" }}>Use Convergence Commons to shape an origin, a story, and an accountable record before moving outward. When you are ready, your private creator workspace can help keep collaboration requests and provenance notes organized without turning the work into a listing, payment obligation, or rights transfer.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/commons" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(185,140,255,0.44)", color: "#D2B4FF" }}>Open Convergence Commons</Link><Link href="/creator-workspace" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.44)", color: "#00FF88" }}>Open Creator Workspace</Link><Link href="/think-space" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.44)", color: "#00D4FF" }}>Share in Think Space</Link></div>
        </div>
      </section>
    </main>
  );
}
