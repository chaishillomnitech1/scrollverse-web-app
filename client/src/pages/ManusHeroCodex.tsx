import { Link } from "wouter";
import { MANUS_HERO_CYCLES } from "@shared/manusHeroProtocol";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const AEGIS_COVER = "/manus-storage/aegis-scribe-comic-cover_f34a8a09.png";

const COMMAND_DECK = [
  { title: "Convergence Commons", detail: "Intent-led discovery for creators, thinkers, and builders.", href: "/commons", color: "#00D4FF" },
  { title: "Creator Workspace", detail: "Consent, private collaboration, and provenance records.", href: "/creator-workspace", color: "#00FF88" },
  { title: "Signalworks", detail: "A source-labelled media and distribution navigator.", href: "/signalworks", color: "#FFB800" },
  { title: "Legion Commons", detail: "Transparent opt-in exchange and guided routes.", href: "/legion-commons", color: "#B98CFF" },
  { title: "Identity System", detail: "Original concept marks with source and release boundaries.", href: "/identity-system", color: "#FF8DB5" },
] as const;

export default function ManusHeroCodex() {
  useSovereignHeartbeat({ page: "manus-hero-codex" });

  return (
    <main className="min-h-screen overflow-hidden pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative border-b" style={{ borderColor: "rgba(0,212,255,0.2)", background: "radial-gradient(circle at 78% 2%, rgba(0,212,255,0.18), transparent 29%), radial-gradient(circle at 11% 54%, rgba(185,140,255,0.16), transparent 38%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-16">
          <div className="text-xs font-mono tracking-[0.24em]" style={{ color: "#00D4FF" }}>SCROLLVERSE-OWNED GUIDE · THE AEGIS SCRIBE</div>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <h1 className="text-5xl font-black leading-[0.86] tracking-tight sm:text-7xl">The Manus Hero<br /><span style={{ color: "#00D4FF" }}>is a method.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>The Aegis Scribe is the original ScrollVerse guide for mapping needs, building first-party systems, verifying what is real, and preserving a usable record. It is a project identity—not a claim of outside access, autonomous authority, or private-system control.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/legion-commons" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Enter Legion Commons</Link>
                <Link href="/super-manus" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.42)", color: "#FFB800" }}>Super Manus Route</Link>
              </div>
            </div>
            <aside className="overflow-hidden rounded-[2rem] border" style={{ borderColor: "rgba(255,184,0,0.28)", background: "rgba(3,14,31,0.78)" }}>
              <img src={AEGIS_COVER} alt="Original concept cover for The Aegis Scribe comic development brief" className="h-64 w-full object-cover object-center opacity-90" />
              <div className="p-7">
                <div className="text-[10px] font-mono tracking-widest" style={{ color: "#FFB800" }}>THE PROMISE</div>
                <p className="mt-4 text-lg font-bold leading-relaxed">“Build what can be reviewed. Explain what is still a pathway. Preserve what matters without exposing what is private.”</p>
                <div className="mt-6 rounded-2xl border p-4 text-sm leading-relaxed" style={{ borderColor: "rgba(0,255,136,0.2)", color: "#B8C7D6" }}>Original concept art for an unpublished ScrollVerse story brief. All visible capabilities remain first-party concepts and code; no external provider, financial, app-store, or always-on operation is implied.</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>THE FIVE-STAGE HERO PROGRAM</div>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">A visible operating system for trustworthy creation.</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed" style={{ color: "#95A6B8" }}>The program lives as original ScrollVerse code in <code className="rounded px-1 py-0.5" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>shared/manusHeroProtocol.ts</code> and is intentionally small enough to review and test.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {MANUS_HERO_CYCLES.map((cycle, index) => (
            <article key={cycle.stage} className="relative rounded-3xl border p-5" style={{ borderColor: index % 2 ? "rgba(185,140,255,0.3)" : "rgba(0,212,255,0.3)", background: "rgba(255,255,255,0.025)" }}>
              <div className="text-[10px] font-mono" style={{ color: index % 2 ? "#B98CFF" : "#00D4FF" }}>{String(index + 1).padStart(2, "0")} · {cycle.stage}</div>
              <h3 className="mt-4 text-xl font-black">{cycle.output}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{cycle.purpose}</p>
              <div className="mt-5 text-[10px] font-mono" style={{ color: cycle.humanReview ? "#FFB800" : "#00FF88" }}>{cycle.humanReview ? "HUMAN REVIEW REQUIRED" : "BUILD STAGE"}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}>
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>THE COMMAND DECK</div>
          <h2 className="mt-3 text-3xl font-black">Original ScrollVerse routes, working together.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {COMMAND_DECK.map(item => (
              <Link key={item.href} href={item.href} className="rounded-3xl border p-6 transition-transform hover:-translate-y-1" style={{ borderColor: `${item.color}38`, background: "rgba(4,14,30,0.68)" }}>
                <div className="h-2 w-14 rounded-full" style={{ background: item.color }} />
                <h3 className="mt-6 text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{item.detail}</p>
                <div className="mt-6 text-xs font-black" style={{ color: item.color }}>Open route →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid gap-6 px-5 py-16 lg:grid-cols-2">
        <article className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(255,141,181,0.3)", background: "linear-gradient(140deg, rgba(255,141,181,0.08), rgba(4,14,30,0.48))" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#FF8DB5" }}>ORIGINAL COMIC DEVELOPMENT</div>
          <h2 className="mt-4 text-3xl font-black">*The Aegis Scribe*</h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>A five-issue development arc about source, consent, distribution paths, and a hero revealed as a repeatable method. The current material is a ScrollVerse story brief—not a published comic, NFT collection, or commercial release.</p>
          <Link href="/story-archive" className="mt-6 inline-block rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,141,181,0.5)", color: "#FF8DB5" }}>Open Story Archive</Link>
        </article>
        <article className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.3)", background: "linear-gradient(140deg, rgba(0,255,136,0.07), rgba(4,14,30,0.48))" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>ORIGINAL PODCAST DEVELOPMENT</div>
          <h2 className="mt-4 text-3xl font-black">*Signal, Source, Story*</h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>An editorial podcast brief for real, permissioned conversations about source, consent, story, and responsible distribution. No episodes are represented as recorded, autonomous, or published.</p>
          <Link href="/podcast" className="mt-6 inline-block rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.5)", color: "#00FF88" }}>Open Podcast Route</Link>
        </article>
      </section>
    </main>
  );
}
