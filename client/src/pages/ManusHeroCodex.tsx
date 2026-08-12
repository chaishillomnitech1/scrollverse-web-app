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
  { title: "Specialist Constellation", detail: "Named first-party ScrollVerse guides for every kind of work.", href: "/specialist-constellation", color: "#00FF88" },
  { title: "Chain Intelligence", detail: "Source-linked network context, explorer handoffs, and evidence boundaries.", href: "/chain-intelligence", color: "#B98CFF" },
] as const;

const CO_CREATOR_LANES = [
  { number: "01", title: "Name your build", detail: "Start with an idea, a draft, a release question, or a business need. The Hero helps turn it into a visible next step—not a vague promise.", href: "/creator-operations", action: "Open Creator Operations", color: "#00D4FF" },
  { number: "02", title: "Prepare original work", detail: "Shape an original look, media item, source note, or project record before you seek a partner, platform, or public audience.", href: "/fashion-portfolio", action: "Build an original look", color: "#FFB800" },
  { number: "03", title: "Stage the proof", detail: "Keep files, provenance, consent, and release material in a private staging path before you choose any public or external handoff.", href: "/media-dock", action: "Open Media Dock", color: "#00FF88" },
  { number: "04", title: "Build the release", detail: "Prepare a provider-aware live-stream plan, video or music metadata, review loop, and distribution handoff before any public launch.", href: "/creator-media-studio", action: "Open Creator Media Studio", color: "#B98CFF" },
  { number: "05", title: "Choose a growth route", detail: "Explore audience, media, distribution, collaboration, manufacturing, or operations routes with the status of each path stated plainly.", href: "/empire-map", action: "Explore Empire Map", color: "#FF8DB5" },
] as const;

const ORIGINAL_WORK_BOARD = "/manus-storage/xlviii-atlantis-concept-board-owner-upload_ceedf426.webp";

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
                <Link href="/specialist-constellation" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.42)", color: "#00FF88" }}>Meet the Specialist Team</Link>
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

      <section id="co-creator" className="border-y" style={{ borderColor: "rgba(0,212,255,0.14)", background: "radial-gradient(circle at 8% 8%, rgba(0,212,255,0.11), transparent 34%), radial-gradient(circle at 92% 90%, rgba(255,184,0,0.10), transparent 30%), #071124" }}>
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-end">
            <div>
              <div className="text-xs font-mono tracking-[0.2em]" style={{ color: "#00FF88" }}>HERO CO-CREATOR DESK</div>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Learn the move.<br /><span style={{ color: "#00D4FF" }}>Make the work yours.</span></h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: "#C8D8E7" }}>The Aegis Scribe helps visitors build a visible path from first idea to organized original work, private proof, and a chosen next route. It teaches options; it does not promise income, create an order, activate a transfer, or make a commercial decision for anyone.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/specialist-constellation" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Meet your co-creator team</Link>
                <Link href="/media-world" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.5)", color: "#FFB800" }}>Build through Media World</Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {CO_CREATOR_LANES.map(lane => (
                <Link key={lane.number} href={lane.href} className="group rounded-3xl border p-6 transition-transform hover:-translate-y-1" style={{ borderColor: `${lane.color}40`, background: "rgba(4,14,30,0.72)" }}>
                  <div className="flex items-center justify-between"><span className="text-xs font-mono" style={{ color: lane.color }}>{lane.number} · CO-CREATE</span><span className="text-xs opacity-0 transition-opacity group-hover:opacity-100" style={{ color: lane.color }}>OPEN →</span></div>
                  <h3 className="mt-5 text-xl font-black">{lane.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{lane.detail}</p>
                  <div className="mt-6 text-xs font-black" style={{ color: lane.color }}>{lane.action} →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid gap-7 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="overflow-hidden rounded-[2rem] border" style={{ borderColor: "rgba(255,184,0,0.3)", background: "rgba(4,14,30,0.72)" }}>
          <img src={ORIGINAL_WORK_BOARD} alt="Owner-provided XLVIII BLOCKS Atlantis fashion concept board" className="h-56 w-full object-cover object-center opacity-90 sm:h-72" />
          <div className="p-7">
            <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>OWNER-PROVIDED ORIGINAL-WORK REFERENCE</div>
            <h2 className="mt-3 text-3xl font-black">Concept first. Evidence before release.</h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>This XLVIII BLOCKS Atlantis concept board is a source-labelled creator reference. It is not presented as an approved SKU, inventory, partnership, manufacturing order, or sale. The lesson is reusable: develop your original work, preserve provenance, then choose a verified next route.</p>
            <Link href="/fashion-portfolio" className="mt-6 inline-block rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.48)", color: "#FFB800" }}>Open original look builder</Link>
          </div>
        </article>

        <article className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.28)", background: "linear-gradient(145deg, rgba(0,255,136,0.06), rgba(4,14,30,0.7))" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>BUSINESS + DIGITAL-ASSET DISCOVERY</div>
          <h2 className="mt-4 text-3xl font-black">See the system. Learn the status.</h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>A clear business guide should show visitors where product, media, creator, and digital-asset pathways live—and what has not been activated. ScrollVerse keeps education and readiness visible without presenting custody, exchange, transfer, investment, verified inventory, or a live checkout as active.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="/chain-intelligence" className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.04)" }}><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>EXPLORE</div><div className="mt-2 font-black">Chain intelligence</div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B8C7D6" }}>Source-linked wallet, token, NFT, Nexus, and explorer routes with clear evidence boundaries.</p></Link>
            <Link href="/revenue-ops" className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.04)" }}><div className="text-xs font-mono" style={{ color: "#00FF88" }}>OWNER VIEW</div><div className="mt-2 font-black">Revenue readiness</div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B8C7D6" }}>Evidence, dependencies, and next actions without invented results.</p></Link>
            <Link href="/manufacturing-readiness" className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,184,0,0.3)", background: "rgba(255,184,0,0.04)" }}><div className="text-xs font-mono" style={{ color: "#FFB800" }}>PREPARE</div><div className="mt-2 font-black">Product handoff</div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B8C7D6" }}>Design, technical-pack, sample, policy, and partner verification stages.</p></Link>
            <Link href="/creator-operations" className="rounded-2xl border p-4" style={{ borderColor: "rgba(185,140,255,0.3)", background: "rgba(185,140,255,0.04)" }}><div className="text-xs font-mono" style={{ color: "#B98CFF" }}>BUILD</div><div className="mt-2 font-black">Creator support</div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B8C7D6" }}>Private support intake, release material preparation, and provenance links.</p></Link>
          </div>
        </article>
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
