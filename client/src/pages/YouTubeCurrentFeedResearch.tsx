import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Archive, Copy, ShieldCheck, Film } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const FEED_PICKS = [
  {
    id: "SV-YT-001",
    token: "Full Briefing",
    title: "US threatens Iran with 'toughest' sanctions ever",
    watchId: "VZJUmiCO25E",
    duration: "9:22",
    reason: "Most complete of the three visible current-feed results; leading visible video in the feed at time of review.",
  },
  {
    id: "SV-YT-002",
    token: "Concise Counterpart",
    title: "Iran dismisses US economic threats, and other developments in the Middle East",
    watchId: "A4wl8qdZ2h0",
    duration: "2:23",
    reason: "Concise second-source summary of the same developing story from a different newsroom.",
  },
  {
    id: "SV-YT-003",
    token: "Short Additional Angle",
    title: "Trump declares 'Economic D-Day' against Iran | FOX 13 Seattle",
    watchId: "h8VWhpH3pCw",
    duration: "1:44",
    reason: "Short related report providing a third editorial angle on the same news cycle.",
  },
];

export default function YouTubeCurrentFeedResearch() {
  useSovereignHeartbeat({ page: "youtube-current-feed-research" });
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <main className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="container py-12 max-w-4xl mx-auto px-4">
        <div className="mb-3 text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>
          SCROLLVERSE · CONNECTED SOURCE REGISTRY
        </div>
        <h1 className="text-3xl font-black text-white mb-2">YouTube Current-Feed Research</h1>
        <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
          Three directly visible videos selected from the current public feed context associated with channel{" "}
          <span className="font-mono" style={{ color: "#FFB800" }}>UCYfdidRxbB8Qhf0Nx7ioOYw</span>.
          Feed context is not channel ownership verification.
        </p>

        <PortalTrustLens
          lane="Research"
          source="YouTube public feed — direct browser observation, Aug 2026"
          readiness="Research record only"
          boundary="Feed context does not verify channel ownership, upload status, subscriber count, or monetization. No video was played, liked, shared, saved, posted, or scheduled during review."
        />

        <div className="mt-8 mb-3 text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>
          CURRENT-FEED SELECTION — 3 PICKS
        </div>

        <div className="space-y-4">
          {FEED_PICKS.map((pick) => (
            <div
              key={pick.id}
              className="rounded-xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: "#FFB800" }}>
                    {pick.id} · {pick.token} · {pick.duration}
                  </div>
                  <div className="font-semibold text-white text-sm">{pick.title}</div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={`https://www.youtube.com/watch?v=${pick.watchId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: "rgba(255,0,0,0.15)", border: "1px solid rgba(255,0,0,0.3)", color: "#FF6B6B" }}
                  >
                    <Film size={12} /> Watch
                  </a>
                  <button
                    onClick={() => copy(`https://www.youtube.com/watch?v=${pick.watchId}`, pick.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}
                  >
                    <Copy size={12} /> {copied === pick.id ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div className="text-xs mt-2" style={{ color: "#8899AA" }}>{pick.reason}</div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-xl p-5"
          style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} style={{ color: "#FFB800" }} />
            <span className="text-xs font-mono font-bold" style={{ color: "#FFB800" }}>SOURCE BOUNDARY</span>
          </div>
          <ul className="text-xs space-y-1" style={{ color: "#8899AA" }}>
            <li>· Feed context is not channel ownership — the channel URL rendered a generic YouTube News feed at time of review.</li>
            <li>· No video was played, liked, shared, saved, posted, scheduled, or monetized during this review.</li>
            <li>· Selection criteria: longest visible duration, concise second-source summary, short additional angle.</li>
            <li>· Feed content changes over time; these picks reflect the visible state at the time of the review session.</li>
          </ul>
        </div>

        <section className="mt-8 rounded-xl p-5" style={{ background: "rgba(185,140,255,0.06)", border: "1px solid rgba(185,140,255,0.26)" }}>
          <div className="flex items-center gap-2"><Archive size={16} style={{ color: "#D9C1FF" }} /><span className="text-xs font-mono font-bold" style={{ color: "#D9C1FF" }}>ARCHIVE HANDOFFS</span></div>
          <p className="mt-3 text-xs leading-6" style={{ color: "#AFC0CF" }}>This selection remains a time-bounded research record. Use the connected registry for source context, the Empire Power Index for active-route discovery, and the release desk only when an owner-controlled public-version packet is complete.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              { href: "/connected-source-registry", title: "Connected Source Registry", color: "#00D4FF" },
              { href: "/empire-power-index", title: "Empire Power Index", color: "#B98CFF" },
              { href: "/youtube-episode-release-desk", title: "YouTube Release Desk", color: "#FFB800" },
            ].map((item) => <Link key={item.href} href={item.href} className="rounded-lg border px-4 py-3 text-xs font-black transition hover:-translate-y-0.5" style={{ borderColor: `${item.color}55`, color: item.color, background: `${item.color}10` }}>{item.title} <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></Link>)}
          </div>
        </section>
        <div className="mt-8 flex gap-3 flex-wrap">
          <Link href="/connected-source-registry" className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>← Connected Source Registry</Link>
          <Link href="/" className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8899AA" }}>Home</Link>
        </div>
      </div>
    </main>
  );
}
