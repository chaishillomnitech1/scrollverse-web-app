import { useMemo, useState } from "react";
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

const OPERATING_PATH = [
  { step: "01", title: "Shape the original", body: "Build the concept, specifications, and original-work evidence before a product or release is represented publicly.", href: "/fashion-portfolio", action: "Open Fashion Portfolio", color: "#FFB800" },
  { step: "02", title: "Prepare the maker handoff", body: "Organize technical-pack, sample, partner-verification, and fulfillment readiness records before any manufacturing instruction.", href: "/manufacturing-readiness", action: "Open Manufacturing Readiness", color: "#00D4FF" },
  { step: "03", title: "Stage the media", body: "Prepare rights-aware release materials, metadata, provenance, and creator collaboration records in the protected studio workflow.", href: "/creator-media-studio", action: "Open Creator Media Studio", color: "#B98CFF" },
  { step: "04", title: "Choose the external route", body: "Use official publishing, channel, storefront, or creator-tool handoffs only after reviewing each provider’s own requirements.", href: "/digital-highways", action: "Open Digital Highways", color: "#00FF88" },
  { step: "05", title: "Review activation evidence", body: "Keep pricing, customer policy, rights, fulfillment, provider approval, and owner attestation separate from this public navigator.", href: "/revenue-ops", action: "Open Revenue Operations", color: "#FF8DB5" },
] as const;

const OFFER_HIGHWAY = [
  { label: "Original goods", title: "Design to maker readiness", body: "Explore the original fashion presentation, then move into technical-pack, sample, partner, and fulfillment readiness before any customer offer is activated.", href: "/fashion-partnership-proposal", action: "Explore Fashion Presentation", color: "#FFB800" },
  { label: "Music & media", title: "Catalog to audience route", body: "Stage rights-aware release materials, follow creator-provided channels, and choose an official distribution or publishing handoff that matches the work.", href: "/media-world", action: "Explore Media World", color: "#B98CFF" },
  { label: "Services & collaboration", title: "Ideas to accountable work", body: "Use the creator workspace, specialist routes, and collaboration records to prepare a service, partnership, or creative brief before you represent it outward.", href: "/creator-workspace", action: "Open Creator Workspace", color: "#00D4FF" },
] as const;

const LANE_FILTERS: Array<"All lanes" | Pathway["lane"]> = ["All lanes", "Film", "Music", "Live", "Creator tools"];

const LOCAL_READINESS_CHECKLIST = [
  "I preserved a source note and collaborator permissions.",
  "I checked current export, credit, and accessibility requirements.",
  "I selected an official route that matches the work.",
  "I understand that a handoff is not a submission or outcome guarantee.",
] as const;

export default function Signalworks() {
  useSovereignHeartbeat({ page: "signalworks" });
  const [selectedLane, setSelectedLane] = useState<(typeof LANE_FILTERS)[number]>("All lanes");
  const [completedReadiness, setCompletedReadiness] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem("scrollverse-signalworks-readiness");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) && parsed.every((item) => typeof item === "string") ? parsed : [];
    } catch {
      return [];
    }
  });
  const visiblePathways = useMemo(
    () => selectedLane === "All lanes" ? PATHWAYS : PATHWAYS.filter((pathway) => pathway.lane === selectedLane),
    [selectedLane],
  );

  const toggleReadiness = (item: string) => {
    setCompletedReadiness((current) => {
      const next = current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item];
      window.localStorage.setItem("scrollverse-signalworks-readiness", JSON.stringify(next));
      return next;
    });
  };

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
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter official handoffs by creator lane">
          {LANE_FILTERS.map((lane) => {
            const active = lane === selectedLane;
            return <button key={lane} type="button" onClick={() => setSelectedLane(lane)} className="rounded-full border px-3 py-2 text-xs font-black transition-colors" style={{ borderColor: active ? "rgba(0,212,255,0.75)" : "rgba(255,255,255,0.14)", background: active ? "rgba(0,212,255,0.14)" : "transparent", color: active ? "#00D4FF" : "#A9B9C9" }}>{lane}</button>;
          })}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visiblePathways.map(pathway => <article key={pathway.provider} className="flex min-h-72 flex-col rounded-3xl border p-5" style={{ borderColor: `${pathway.color}35`, background: "rgba(255,255,255,0.025)" }}>
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

      <section className="max-w-7xl mx-auto px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>AUDIENCE-TO-REVENUE READINESS</div><h2 className="mt-2 text-3xl font-black sm:text-4xl">Connect the dots before you ask the customer to act.</h2></div><p className="max-w-xl text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>This is a first-party operating path for original work, not a checkout, offer, price list, manufacturer order, wallet, mint, distribution submission, or revenue promise.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {OPERATING_PATH.map((item) => <article key={item.step} className="flex min-h-64 flex-col rounded-3xl border p-5" style={{ borderColor: `${item.color}35`, background: "rgba(255,255,255,0.025)" }}><div className="text-[10px] font-mono" style={{ color: item.color }}>{item.step}</div><h3 className="mt-4 text-lg font-black">{item.title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>{item.body}</p><Link href={item.href} className="mt-auto pt-6 text-sm font-black" style={{ color: item.color }}>{item.action} →</Link></article>)}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,184,0,0.16)", background: "rgba(255,184,0,0.025)" }}>
        <div className="max-w-7xl mx-auto px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>FIRST-PARTY OFFER HIGHWAY</div><h2 className="mt-2 text-3xl font-black sm:text-4xl">Make the work easy to find. Keep the next step clear.</h2></div><p className="max-w-xl text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>These routes organize original goods, media, and services for discovery. A route is not an external listing, quoted price, active inventory feed, checkout, payout, rights transfer, or provider approval.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{OFFER_HIGHWAY.map((item) => <article key={item.label} className="flex min-h-64 flex-col rounded-3xl border p-6" style={{ borderColor: `${item.color}3a`, background: "rgba(4,14,30,0.75)" }}><div className="text-[10px] font-mono tracking-widest" style={{ color: item.color }}>{item.label.toUpperCase()}</div><h3 className="mt-4 text-xl font-black">{item.title}</h3><p className="mt-4 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>{item.body}</p><Link href={item.href} className="mt-auto pt-6 text-sm font-black" style={{ color: item.color }}>{item.action} →</Link></article>)}</div>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}>
        <div className="max-w-7xl mx-auto px-5 py-14">
          <div className="max-w-3xl"><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>CREATOR READINESS</div><h2 className="mt-3 text-3xl font-black">A handoff is not the work. It is the next accountable step.</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{READINESS.map(([number, title, body]) => <article key={number} className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.19)", background: "rgba(0,255,136,0.035)" }}><div className="text-[10px] font-mono" style={{ color: "#00FF88" }}>{number}</div><h3 className="mt-3 font-black">{title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(0,212,255,0.16)", background: "rgba(0,212,255,0.025)" }}>
        <div className="max-w-7xl mx-auto px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>LOCAL READINESS INSPECTION</div><h2 className="mt-2 text-3xl font-black sm:text-4xl">Check the source. Keep the handoff honest.</h2></div><p className="max-w-2xl text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>This checklist stays in your browser. It does not send a submission, share a file, verify rights, or change any provider account. Use it to prepare before deciding whether an official route fits.</p></div>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {LOCAL_READINESS_CHECKLIST.map((item, index) => {
              const checked = completedReadiness.includes(item);
              return <label key={item} className="flex cursor-pointer items-start gap-4 rounded-2xl border p-5" style={{ borderColor: checked ? "rgba(0,212,255,0.52)" : "rgba(255,255,255,0.12)", background: checked ? "rgba(0,212,255,0.06)" : "rgba(4,14,30,0.68)" }}>
                <input type="checkbox" checked={checked} onChange={() => toggleReadiness(item)} className="mt-1 h-4 w-4 accent-[#00D4FF]" aria-label={`Mark readiness item ${index + 1} complete`} />
                <span><span className="text-[10px] font-mono" style={{ color: "#00D4FF" }}>CHECK {String(index + 1).padStart(2, "0")}</span><span className="mt-2 block text-sm font-bold leading-relaxed">{item}</span></span>
              </label>;
            })}
          </div>
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
