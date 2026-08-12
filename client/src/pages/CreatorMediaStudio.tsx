import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const LIVE_PROTOCOLS = [
  {
    code: "RTMPS",
    title: "Reliable broadcast lane",
    color: "#00D4FF",
    detail: "Use a provider-created ingest URL and rotated stream key with OBS for a familiar live-production workflow. Keep the key private and revoke it after any suspected exposure.",
    readiness: "PROVIDER SETUP REQUIRED",
  },
  {
    code: "SRT",
    title: "Resilient contribution lane",
    color: "#00FF88",
    detail: "Use a supported provider input when network resilience matters. Confirm the provider’s caller/listener configuration, encryption options, reconnect behavior, and recording policy before going live.",
    readiness: "PROVIDER SETUP REQUIRED",
  },
  {
    code: "WHIP",
    title: "Interactive WebRTC lane",
    color: "#B98CFF",
    detail: "Use a compatible WHIP endpoint and bearer token for interactive, low-latency broadcasts. Test audience devices, captions, moderation, and connection changes before announcing a session.",
    readiness: "COMPATIBLE PROVIDER REQUIRED",
  },
] as const;

const RELEASE_LANES = [
  {
    label: "VIDEO RELEASE",
    title: "Upload a master with a complete record.",
    color: "#00D4FF",
    points: [
      "Stage the source master, proxy, captions, thumbnail, title, description, tags, credits, and intended audience.",
      "Record who supplied the work, what permission supports it, whether third-party elements are cleared, and what still needs review.",
      "Use a resumable provider upload only after a provider is connected; keep the first-party staging record even when a delivery provider processes a derivative.",
    ],
    action: "Open protected Media Dock",
    href: "/media-dock",
  },
  {
    label: "MUSIC RELEASE",
    title: "Prepare the sound, credits, and release facts together.",
    color: "#FFB800",
    points: [
      "Stage lossless audio, cover art, lyrics or liner notes, ISRC/UPC fields when assigned, composer and performer credits, and an explicit territory plan.",
      "Capture ownership, samples, featured-artist permissions, publishing administration, contributor splits, and the exact public-facing metadata.",
      "Move to a chosen distributor only after the creator confirms the data and rights context; ScrollVerse records readiness and does not act as a distributor or rights administrator.",
    ],
    action: "Open release readiness",
    href: "/release-readiness",
  },
] as const;

const DISTRIBUTION_HANDOFFS = [
  { title: "Spotify for Artists", lane: "MUSIC PROFILE + DELIVERY", href: "https://artists.spotify.com/", color: "#1ED760" },
  { title: "Apple Music for Artists", lane: "MUSIC PROFILE + DELIVERY", href: "https://artists.apple.com/", color: "#FF8DB5" },
  { title: "YouTube Studio", lane: "VIDEO CHANNEL", href: "https://studio.youtube.com/", color: "#FF4E45" },
  { title: "VEVO", lane: "MUSIC VIDEO PARTNER PATH", href: "https://www.vevo.com/", color: "#FFFFFF" },
  { title: "Tubi", lane: "FILM DISCOVERY RESEARCH", href: "https://corporate.tubitv.com/", color: "#9B6BFF" },
  { title: "Netflix Partner Help", lane: "PROFESSIONAL DELIVERY RESEARCH", href: "https://partnerhelp.netflixstudios.com/", color: "#E50914" },
] as const;

const WORKFLOW_STEPS = [
  { number: "01", title: "Stage", detail: "Upload supported media privately with consent, visibility, and provenance context in Media Dock.", href: "/media-dock", color: "#00D4FF" },
  { number: "02", title: "Shape", detail: "Prepare an honest metadata, credits, rights, caption, and release record before a public or external decision.", href: "/creator-operations", color: "#00FF88" },
  { number: "03", title: "Review", detail: "Invite a co-creator or operations reviewer through the protected workflow; no record becomes a legal or platform approval by default.", href: "/creator-operations", color: "#B98CFF" },
  { number: "04", title: "Hand off", detail: "Choose an external destination through Signalworks, where each platform dependency and creator decision remains explicit.", href: "/signalworks", color: "#FFB800" },
] as const;

const OBS_CHECKLIST = `SCROLLVERSE OBS READINESS\n\n1. Create a dedicated provider live input.\n2. Keep the stream key or WHIP bearer token in a secret manager; never paste it into a post, chat, or source file.\n3. In OBS, choose the provider-required RTMPS, SRT, or WHIP values.\n4. Test audio, captions, scenes, reconnect behavior, recording, and moderation privately.\n5. Confirm who may co-host, who can publish recordings, and what happens if the stream key is exposed.\n6. Announce only after the live test, rights record, and audience plan are ready.`;

export default function CreatorMediaStudio() {
  useSovereignHeartbeat({ page: "creator-media-studio" });

  const copyObsChecklist = async () => {
    try {
      await navigator.clipboard.writeText(OBS_CHECKLIST);
      toast.success("OBS readiness checklist copied.");
    } catch {
      toast.error("Could not copy the checklist. Select the guide directly instead.");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden pb-20 text-white" style={{ background: "radial-gradient(circle at 84% 6%, rgba(0,212,255,0.17), transparent 26%), radial-gradient(circle at 8% 45%, rgba(185,140,255,0.14), transparent 32%), radial-gradient(circle at 68% 86%, rgba(255,184,0,0.09), transparent 28%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b" style={{ borderColor: "rgba(0,212,255,0.18)" }}>
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/media-world" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← MEDIA WORLD</Link>
            <span className="rounded-full border px-3 py-1 text-[10px] font-mono tracking-widest" style={{ borderColor: "rgba(0,255,136,0.42)", color: "#00FF88" }}>CREATOR-OWNED · PROVIDER-AWARE · RIGHTS-READY</span>
          </div>
          <div className="mt-14 grid gap-8 xl:grid-cols-[1.16fr_0.84fr] xl:items-end">
            <div>
              <div className="text-xs font-mono tracking-[0.24em]" style={{ color: "#00D4FF" }}>SCROLLVERSE CREATOR MEDIA STUDIO</div>
              <h1 className="mt-5 text-5xl font-black leading-[0.88] tracking-tight sm:text-7xl">Make the signal.<br /><span style={{ color: "#FFB800" }}>Keep the masters.</span></h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>A professional operating room for live-stream readiness, video and music release preparation, private media staging, co-creator review, and clear distribution handoffs. The studio preserves the record first, then helps the creator choose a delivery path with its dependencies visible.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/media-dock" className="rounded-xl px-5 py-3 text-sm font-black transition-transform hover:-translate-y-0.5" style={{ background: "#00D4FF", color: "#050B1A" }}>Stage media privately</Link>
                <button type="button" onClick={copyObsChecklist} className="rounded-xl border px-5 py-3 text-sm font-black transition-transform hover:-translate-y-0.5" style={{ borderColor: "rgba(255,184,0,0.5)", color: "#FFB800" }}>Copy OBS readiness guide</button>
              </div>
            </div>
            <aside className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(255,184,0,0.36)", background: "rgba(4,14,30,0.72)" }}>
              <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>LIVE DELIVERY BOUNDARY</div>
              <h2 className="mt-4 text-2xl font-black">Ready to configure, not pretending to be connected.</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Provider credentials and a provider-created ingest key are required before live delivery. This studio never generates a provider key in the browser, stores a stream key in a public record, or starts a broadcast without a separately connected Mux, Cloudflare Stream, or compatible provider account.</p>
              <div className="mt-5 rounded-2xl border p-4 text-xs leading-relaxed" style={{ borderColor: "rgba(0,255,136,0.23)", background: "rgba(0,255,136,0.035)", color: "#C8D8E7" }}>First-party staging, release notes, review requests, and handoff navigation are available now. Ingest, transcoding, playback, chat, moderation, and external distribution remain provider- and creator-decision dependent.</div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>LIVE-STREAM READINESS</div><h2 className="mt-3 text-3xl font-black sm:text-4xl">Choose the transmission lane after the provider is real.</h2></div>
          <a href="https://obsproject.com/kb/whip-streaming-guide" target="_blank" rel="noreferrer" className="text-sm font-black" style={{ color: "#00D4FF" }}>Read the OBS WHIP guide ↗</a>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {LIVE_PROTOCOLS.map(protocol => <article key={protocol.code} className="rounded-[1.7rem] border p-6" style={{ borderColor: `${protocol.color}42`, background: "rgba(4,14,30,0.7)" }}>
            <div className="flex items-center justify-between gap-4"><span className="text-2xl font-black" style={{ color: protocol.color }}>{protocol.code}</span><span className="text-[9px] font-mono tracking-wider" style={{ color: protocol.color }}>{protocol.readiness}</span></div>
            <h3 className="mt-6 text-xl font-black">{protocol.title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{protocol.detail}</p>
          </article>)}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.25)", background: "rgba(0,212,255,0.04)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>OBS PRE-FLIGHT</div><h3 className="mt-3 text-2xl font-black">Build a rehearsal, not a surprise.</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Before any public stream, rehearse camera and microphone routing, scene transitions, captions, rights-cleared music and visuals, mod permissions, fallback recording, audience notice, and reconnection behavior. Rotate keys after testing and keep a private decision record for each broadcast.</p></article>
          <article className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.25)", background: "rgba(0,255,136,0.035)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>PLAYBACK + RETENTION</div><h3 className="mt-3 text-2xl font-black">Decide what survives the live moment.</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Name the replay policy, access scope, captions, clips, takedown contact, and recording retention before going live. A live record is not automatically public, licensed, or distributed just because a camera is running.</p></article>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.015)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16"><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>VIDEO + MUSIC RELEASE PREPARATION</div><h2 className="mt-3 text-3xl font-black sm:text-4xl">Build the metadata record beside the master file.</h2><div className="mt-8 grid gap-6 lg:grid-cols-2">{RELEASE_LANES.map(lane => <article key={lane.label} className="rounded-[2rem] border p-7" style={{ borderColor: `${lane.color}38`, background: "rgba(4,14,30,0.72)" }}><div className="text-xs font-mono tracking-widest" style={{ color: lane.color }}>{lane.label}</div><h3 className="mt-4 text-2xl font-black">{lane.title}</h3><div className="mt-6 space-y-4">{lane.points.map(point => <div key={point} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}><span style={{ color: lane.color }}>✦</span><span>{point}</span></div>)}</div><Link href={lane.href} className="mt-7 inline-block rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: `${lane.color}72`, color: lane.color }}>{lane.action} →</Link></article>)}</div></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16"><div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:items-end"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>CO-CREATOR + REVIEW LOOP</div><h2 className="mt-4 text-4xl font-black leading-tight">Make collaboration<br /><span style={{ color: "#00FF88" }}>auditable and human.</span></h2><p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: "#C8D8E7" }}>Use the protected workspace to create a focused support or release-material record, link provenance where available, and request completeness feedback. Collaboration never converts a message, a file, or an internal status into legal clearance, platform acceptance, ownership transfer, or an automatic public release.</p><Link href="/creator-operations" className="mt-7 inline-block rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00FF88", color: "#050B1A" }}>Open Creator Operations</Link></div><div className="grid gap-4 sm:grid-cols-2">{WORKFLOW_STEPS.map(step => <Link key={step.number} href={step.href} className="rounded-3xl border p-6 transition-transform hover:-translate-y-1" style={{ borderColor: `${step.color}40`, background: "rgba(4,14,30,0.68)" }}><div className="text-xs font-mono" style={{ color: step.color }}>{step.number} · {step.title.toUpperCase()}</div><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{step.detail}</p><div className="mt-5 text-xs font-black" style={{ color: step.color }}>Open route →</div></Link>)}</div></div></section>

      <section className="border-y" style={{ borderColor: "rgba(255,184,0,0.16)", background: "radial-gradient(circle at 85% 35%, rgba(255,184,0,0.10), transparent 30%), #071124" }}><div className="mx-auto max-w-7xl px-5 py-16"><div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>DISTRIBUTION NAVIGATOR</div><h2 className="mt-3 text-3xl font-black sm:text-4xl">Choose a destination. Keep the decision yours.</h2></div><Link href="/signalworks" className="text-sm font-black" style={{ color: "#00D4FF" }}>Open full Signalworks map →</Link></div><p className="mt-5 max-w-4xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>These are external research and creator delivery routes with their own account, rights, metadata, technical, and policy requirements. ScrollVerse is not a distributor, marketplace, talent agency, rights manager, or platform partner; this studio does not publish, license, or distribute media automatically.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{DISTRIBUTION_HANDOFFS.map(handoff => <a key={handoff.title} href={handoff.href} target="_blank" rel="noreferrer" className="group rounded-3xl border p-5 transition-transform hover:-translate-y-1" style={{ borderColor: `${handoff.color}44`, background: "rgba(4,14,30,0.66)" }}><div className="text-[10px] font-mono tracking-widest" style={{ color: handoff.color }}>{handoff.lane}</div><h3 className="mt-4 text-lg font-black">{handoff.title}</h3><div className="mt-5 text-xs font-black" style={{ color: handoff.color }}>Open external route ↗</div></a>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-16"><div className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(185,140,255,0.34)", background: "rgba(185,140,255,0.045)" }}><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>BUILD THE RECORD BEFORE THE REACH</div><h2 className="mt-3 text-3xl font-black">One studio, multiple honest routes.</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Creator Media Studio links the existing ScrollVerse media foundation without replacing your master files, contracts, collaborators, distributor, provider, or final decisions. Start with private staging, then move at the speed of verified rights, technical readiness, and your own release plan.</p></div><div className="flex flex-wrap gap-3"><Link href="/media-world" className="rounded-xl border px-4 py-3 text-sm font-black" style={{ borderColor: "rgba(185,140,255,0.55)", color: "#B98CFF" }}>Media World</Link><Link href="/specialist-constellation" className="rounded-xl border px-4 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.48)", color: "#00D4FF" }}>Meet media guides</Link></div></div><div className="mt-7 grid gap-4 border-t pt-7 md:grid-cols-[1fr_auto] md:items-center" style={{ borderColor: "rgba(185,140,255,0.2)" }}><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>ARCHIVE-SAFE INTAKE</div><h3 className="mt-2 text-xl font-black">A saved HTML capture is a source record, not a release asset.</h3><p className="mt-2 max-w-3xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Record static captures privately with source, access date, purpose, and public/private classification. Do not run embedded scripts, copy configuration values, treat a shell as authenticated access, or publish a capture until a specific creator-owned item is reviewed and cleared.</p></div><div className="flex flex-wrap gap-3"><Link href="/media-dock" className="rounded-xl border px-4 py-3 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.48)", color: "#00FF88" }}>Stage a source record</Link><Link href="/creator-operations" className="rounded-xl border px-4 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.48)", color: "#00D4FF" }}>Open review workflow</Link></div></div></div></section>
    </main>
  );
}
