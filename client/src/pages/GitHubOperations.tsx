import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { GITHUB_OPERATION_FLOW, GITHUB_OPERATION_LANES, GITHUB_OPERATION_STATES, type GitHubOperationState } from "@shared/githubOperations";

const FILTERS: Array<{ id: "all" | GitHubOperationState; label: string }> = [
  { id: "all", label: "All paths" },
  { id: "ready_now", label: "Ready to adapt" },
  { id: "next", label: "Next review" },
  { id: "review_required", label: "Review required" },
  { id: "later", label: "Research track" },
];

export default function GitHubOperations() {
  useSovereignHeartbeat({ page: "github-operations" });
  const [filter, setFilter] = useState<"all" | GitHubOperationState>("all");
  const lanes = useMemo(() => filter === "all" ? GITHUB_OPERATION_LANES : GITHUB_OPERATION_LANES.filter((lane) => lane.state === filter), [filter]);

  return (
    <main className="min-h-screen pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(0,212,255,0.2)", background: "radial-gradient(circle at 84% 12%, rgba(0,212,255,0.18), transparent 30%), radial-gradient(circle at 14% 90%, rgba(185,140,255,0.16), transparent 38%), #050B1A" }}>
        <div className="pointer-events-none absolute -right-16 top-10 h-96 w-96 rounded-full border" style={{ borderColor: "rgba(255,184,0,0.12)" }} />
        <div className="max-w-7xl mx-auto px-5 pb-16 pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← SCROLLVERSE HOME</Link>
            <a href="https://github.com/chaishillomnitech1" target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-2 text-xs font-black" style={{ borderColor: "rgba(0,212,255,0.35)", color: "#00D4FF" }}>VIEW FIRST-PARTY GITHUB →</a>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="text-xs font-mono tracking-[0.24em]" style={{ color: "#00FF88" }}>GITHUB-TO-OPERATIONS · FIRST-PARTY SOURCE MAP</div>
              <h1 className="mt-5 text-5xl font-black leading-[0.88] tracking-tight sm:text-7xl">Turn source into<br /><span style={{ color: "#00D4FF" }}>visible operations.</span></h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>The Sovereign Integration Engine is a practical map from first-party repositories to reviewable portal work. It preserves the source, names the evidence required, and keeps deployment decisions human-controlled.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/manus-hero" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Ask the Manus Hero</Link>
                <Link href="/github-constellation" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.45)", color: "#FFB800" }}>Browse the constellation</Link>
              </div>
            </div>
            <aside className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.28)", background: "rgba(3,14,31,0.74)" }}>
              <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ background: "rgba(0,255,136,0.12)" }}>⛓️</div><div><div className="text-xs font-mono" style={{ color: "#00FF88" }}>OPERATING RULE</div><div className="mt-1 text-lg font-black">Extract · verify · adapt · test · document</div></div></div>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>A repository link is a source record—not proof that code is secure, an external provider is connected, a contract is deployed, or a commercial path is active. Those states each require separate evidence.</p>
              <div className="mt-6 rounded-2xl border p-4 text-sm leading-relaxed" style={{ borderColor: "rgba(255,184,0,0.25)", background: "rgba(255,184,0,0.05)", color: "#EBD8A6" }}>No external code is executed, elevated, or deployed merely because it appears in a first-party repository or submitted blueprint.</div>
            </aside>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>THE DETERMINISTIC WORKFLOW</div>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">A path that stays legible under pressure.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {GITHUB_OPERATION_FLOW.map((step, index) => (
            <article key={step.step} className="rounded-3xl border p-6" style={{ borderColor: index % 2 ? "rgba(185,140,255,0.3)" : "rgba(0,212,255,0.3)", background: "rgba(255,255,255,0.025)" }}>
              <div className="text-xs font-mono" style={{ color: index % 2 ? "#B98CFF" : "#00D4FF" }}>{step.step}</div>
              <h3 className="mt-5 text-xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}>
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>OPERATIONAL PATHS</div><h2 className="mt-3 text-3xl font-black">Choose the lane that matches the work.</h2></div>
            <p className="max-w-xl text-sm leading-relaxed" style={{ color: "#95A6B8" }}>The public audit observed 51 repositories at the time of review. Each lane below is a source-labelled operating pathway, not a claim of provider access, payment activity, or production deployment.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((item) => {
              const current = item.id === filter;
              const color = item.id === "all" ? "#00D4FF" : GITHUB_OPERATION_STATES[item.id].color;
              return <button key={item.id} type="button" onClick={() => setFilter(item.id)} className="rounded-full border px-4 py-2 text-xs font-black transition-transform hover:-translate-y-0.5" style={{ borderColor: current ? color : "rgba(255,255,255,0.12)", background: current ? `${color}18` : "transparent", color: current ? color : "#AEBFD0" }}>{item.label}</button>;
            })}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {lanes.map((lane) => {
              const status = GITHUB_OPERATION_STATES[lane.state];
              return (
                <article key={lane.id} className="rounded-[2rem] border p-6" style={{ borderColor: `${lane.color}45`, background: "rgba(4,14,30,0.74)" }}>
                  <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl" style={{ background: `${lane.color}15`, border: `1px solid ${lane.color}42` }}>{lane.icon}</div><div><h3 className="text-xl font-black">{lane.title}</h3><div className="mt-1 text-[10px] font-mono" style={{ color: lane.color }}>{lane.repository}</div></div></div><span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: `${status.color}55`, color: status.color }}>{status.label}</span></div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2"><div><div className="text-[10px] font-mono tracking-widest" style={{ color: "#95A6B8" }}>OBSERVED PATTERN</div><p className="mt-2 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{lane.observedPattern}</p></div><div><div className="text-[10px] font-mono tracking-widest" style={{ color: "#95A6B8" }}>PORTAL USE</div><p className="mt-2 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{lane.operationalUse}</p></div></div>
                  <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}><div className="text-[10px] font-mono tracking-widest" style={{ color: "#FFB800" }}>EVIDENCE BEFORE ACTIVATION</div><div className="mt-3 flex flex-wrap gap-2">{lane.evidence.map((item) => <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ background: `${lane.color}12`, color: lane.color }}>{item}</span>)}</div></div>
                  <div className="mt-6 flex flex-wrap gap-3"><a href={lane.repositoryUrl} target="_blank" rel="noreferrer" className="rounded-xl border px-4 py-2.5 text-xs font-black" style={{ borderColor: `${lane.color}55`, color: lane.color }}>View source ↗</a><Link href={lane.portalRoute} className="rounded-xl border px-4 py-2.5 text-xs font-black" style={{ borderColor: "rgba(255,255,255,0.18)", color: "#E8EDF2" }}>{lane.portalLabel} →</Link></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid gap-6 px-5 py-16 lg:grid-cols-2">
        <article className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.28)", background: "linear-gradient(140deg, rgba(0,255,136,0.08), rgba(4,14,30,0.54))" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>CREATOR-OWNED OPERATIONS</div><h2 className="mt-4 text-3xl font-black">Build first-party, then connect outward.</h2><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Creator support, release materials, source records, and distribution handoffs can begin inside ScrollVerse. External platforms remain optional pathways with their own policies and approvals.</p><Link href="/creator-operations" className="mt-6 inline-block rounded-xl px-4 py-2.5 text-sm font-black" style={{ background: "#00FF88", color: "#050B1A" }}>Open Creator Operations</Link></article>
        <article className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(255,184,0,0.3)", background: "linear-gradient(140deg, rgba(255,184,0,0.08), rgba(4,14,30,0.54))" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>SECURITY IS A PRACTICE</div><h2 className="mt-4 text-3xl font-black">Make evidence, not mystique.</h2><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Fuzzing, gas measurements, post-quantum research, and Layer-2 design can all belong in a reviewed engineering track. A complete audit, reproducible tests, and an owner-controlled release decision remain separate requirements.</p><Link href="/evidence-standards" className="mt-6 inline-block rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.5)", color: "#FFB800" }}>Open evidence standards</Link></article>
      </section>
    </main>
  );
}
