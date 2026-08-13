import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const arcs = [
  { volume: "01", title: "The First Map", format: "Pilot episode + comic one-shot", color: "#00D4FF", text: "A neighborhood archive loses its route labels. Aegis Scribe helps a young maker rebuild the map by asking what each story can show, source, and share." },
  { volume: "02", title: "Signal in the Margins", format: "Three-part audio-visual chapter", color: "#FFB800", text: "A creator finds that a brilliant idea needs a clear record before it can travel. The team turns source notes, consent, and care into the story’s real superpower." },
  { volume: "03", title: "The Open Field", format: "Interactive comic blueprint", color: "#B98CFF", text: "A community builds a field guide of routes instead of a gate. Each reader chooses a next question, while the guide points to the real workspace rather than pretending to decide for anyone." },
];

const visibleBehaviors = [
  ["Route guide", "Links visitors to visible ScrollVerse pages and explains their purpose."],
  ["Source labeler", "Marks whether a route is first-party, public-reference, protected, or provider-dependent."],
  ["Creator companion", "Offers a documented sequence for ideas, records, review, and publishing readiness."],
  ["Story character", "Appears as an original narrative guide in this project’s comic and episode development."],
];

export default function AegisChronicles() {
  useSovereignHeartbeat({ page: "aegis-chronicles" });

  return (
    <main className="min-h-screen bg-[#050B1A] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-4 py-20 sm:px-8">
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 12% 20%, rgba(0,212,255,0.18), transparent 32%), radial-gradient(circle at 86% 14%, rgba(185,140,255,0.16), transparent 30%), linear-gradient(145deg, #071124, #050B1A)" }} />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-5 font-mono text-xs tracking-[0.28em] text-[#00D4FF]">ORIGINAL SCROLLVERSE STORY HUB · VERSION 1.0</div>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Aegis Chronicles</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#C7D5E5] sm:text-lg">An original show-and-comic development space about a warm digital guide, young makers, neighborhood stories, and the craft of turning imagination into clear, shareable work.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/manus-hero" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#04101F]">Meet the guide route →</Link>
                <Link href="/junior-movies" className="rounded-xl border border-[#FFB800]/60 px-5 py-3 text-sm font-black text-[#FFB800]">Open Junior Movies →</Link>
              </div>
            </div>
            <div className="rounded-3xl border border-[#00D4FF]/30 bg-[#071124]/85 p-6 shadow-[0_0_60px_rgba(0,212,255,0.12)]">
              <div className="font-mono text-[10px] tracking-[0.2em] text-[#00D4FF]">GUIDE SIGNATURE</div>
              <div className="mt-3 text-2xl font-black">Aegis Scribe</div>
              <p className="mt-3 text-sm leading-6 text-[#B8C7D6]">A public, first-party navigation character. The character’s role is limited to visible routes, documented guidance, and this original story world.</p>
              <div className="mt-5 border-t border-white/10 pt-4 font-mono text-xs text-[#00FF88]">VISIBLE · VERSIONED · ROUTE-LINKED</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="mb-7"><div className="font-mono text-xs tracking-[0.2em] text-[#FFB800]">SEASON AND COMIC BLUEPRINT</div><h2 className="mt-2 text-3xl font-black">Three original doors into the universe</h2></div>
        <div className="grid gap-5 md:grid-cols-3">
          {arcs.map((arc) => <article key={arc.volume} className="rounded-2xl border p-6" style={{ borderColor: `${arc.color}55`, background: `${arc.color}0D` }}>
            <div className="font-mono text-xs" style={{ color: arc.color }}>VOLUME {arc.volume}</div><h3 className="mt-3 text-xl font-black">{arc.title}</h3><div className="mt-2 text-sm text-[#D6E2EE]">{arc.format}</div><p className="mt-4 text-sm leading-7 text-[#B8C7D6]">{arc.text}</p>
          </article>)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071124] px-4 py-16 sm:px-8"><div className="mx-auto max-w-6xl"><div className="font-mono text-xs tracking-[0.2em] text-[#B98CFF]">WHAT THE GUIDE CAN ACTUALLY DO HERE</div><div className="mt-6 grid gap-4 md:grid-cols-2">{visibleBehaviors.map(([title, text]) => <div key={title} className="rounded-xl border border-white/10 bg-[#050B1A] p-5"><h3 className="font-black text-[#00D4FF]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#B8C7D6]">{text}</p></div>)}</div><p className="mt-6 text-sm leading-7 text-[#8FA3B8]">This page does not claim background autonomy, private access, wallet control, or authority over a visitor. Its public function is story, navigation, and documented route guidance.</p></div></section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8"><div className="rounded-2xl border border-[#00FF88]/30 bg-[#00FF88]/5 p-7"><div className="font-mono text-xs tracking-[0.2em] text-[#00FF88]">MAKE THE NEXT CHAPTER</div><h2 className="mt-3 text-3xl font-black">Build a story record before you build a release.</h2><p className="mt-3 max-w-3xl leading-7 text-[#C7D5E5]">Use the existing creator pathways to protect original ideas, develop a media concept, and route an adult-supported story seed. The story hub is an invitation to create, not a publication or rights approval.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/creator-workspace" className="rounded-lg border border-[#00FF88]/50 px-4 py-2 text-sm font-bold text-[#00FF88]">Creator Workspace →</Link><Link href="/creator-operations" className="rounded-lg border border-[#00D4FF]/50 px-4 py-2 text-sm font-bold text-[#00D4FF]">Creator Operations →</Link><Link href="/ip-readiness" className="rounded-lg border border-[#B98CFF]/50 px-4 py-2 text-sm font-bold text-[#B98CFF]">IP Readiness →</Link></div></div></section>
    </main>
  );
}
