import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  Activity,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CircleAlert,
  CircleHelp,
  Cloud,
  Database,
  Layers3,
  LockKeyhole,
  Network,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  approvalBoundaries,
  engineRecords,
  evidenceSnapshotAt,
  integrationRecords,
  type EvidenceState,
} from "@/data/omniControlTowerRegistry";

type FilterState = "all" | EvidenceState;

const stateLabels: Record<EvidenceState, string> = {
  "verified-access": "Verified access",
  "implementation-found": "Implementation found",
  "configured-not-tested": "Configured / not tested",
  "documented-only": "Documented only",
  "not-checked": "Not checked",
  blocked: "Blocked",
};

const stateClasses: Record<EvidenceState, string> = {
  "verified-access": "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  "implementation-found": "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  "configured-not-tested": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  "documented-only": "border-slate-300/20 bg-slate-300/5 text-slate-300",
  "not-checked": "border-violet-300/25 bg-violet-300/10 text-violet-200",
  blocked: "border-rose-300/30 bg-rose-300/10 text-rose-200",
};

const engineStyles: Record<string, string> = {
  blocked: "border-rose-300/30 text-rose-200",
  partial: "border-amber-300/30 text-amber-200",
  review: "border-violet-300/30 text-violet-200",
};

const engineIcons = [Database, Network, Cloud, Workflow, Boxes, Layers3];

function StatePill({ state }: { state: EvidenceState }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${stateClasses[state]}`}>
      {stateLabels[state]}
    </span>
  );
}

export default function OmniControlTower() {
  const [filter, setFilter] = useState<FilterState>("all");
  const [query, setQuery] = useState("");
  const [showBoundaries, setShowBoundaries] = useState(false);

  const visibleIntegrations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return integrationRecords.filter((item) => {
      const matchesState = filter === "all" || item.state === filter;
      const matchesQuery =
        !normalized ||
        [item.name, item.category, item.evidence, item.note]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return matchesState && matchesQuery;
    });
  }, [filter, query]);

  const verified = integrationRecords.filter((item) => item.state === "verified-access").length;
  const blocked = integrationRecords.filter((item) => item.state === "blocked").length;
  const unverifiedProduction = integrationRecords.filter((item) => item.productionActive === "not-verified").length;

  return (
    <main className="min-h-screen bg-[#050B1A] pb-28 text-white">
      <section className="relative overflow-hidden border-b border-cyan-300/15 bg-[radial-gradient(circle_at_15%_0%,rgba(0,163,224,.18),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(0,255,193,.10),transparent_30%),#050B1A]">
        <div className="container py-14 md:py-20">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[.22em] text-cyan-200">
            <span>SCROLLVERSE TRINITY EMPIRE</span>
            <span className="text-white/30">/</span>
            <span>OMNIVERSE FUSION</span>
          </div>
          <div className="mt-8 flex max-w-5xl flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[.2em] text-emerald-200">COMMAND CENTER · V1 FOUNDATION</p>
              <h1 className="mt-4 text-5xl font-black leading-[.94] tracking-tight md:text-7xl">
                Omni Control
                <span className="block bg-gradient-to-r from-cyan-200 via-emerald-200 to-amber-100 bg-clip-text text-transparent">Tower</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                One evidence-backed view of the six Fusion engines, connected providers,
                capability boundaries and the next work required to unify the ecosystem.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5 lg:min-w-64">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-slate-300">
                <Activity size={15} className="text-emerald-200" /> Evidence snapshot
              </div>
              <p className="mt-3 text-2xl font-black">{evidenceSnapshotAt}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">Seeded from the first cross-system inspection. Refresh each provider before treating this as live telemetry.</p>
            </div>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
              <p className="text-xs text-slate-400">Tracked integrations</p>
              <p className="mt-2 text-3xl font-black">{integrationRecords.length}</p>
            </div>
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[.06] p-5">
              <p className="text-xs text-emerald-100/70">Verified connector access</p>
              <p className="mt-2 text-3xl font-black text-emerald-100">{verified}</p>
            </div>
            <div className="rounded-2xl border border-rose-300/20 bg-rose-300/[.05] p-5">
              <p className="text-xs text-rose-100/70">Known blockers</p>
              <p className="mt-2 text-3xl font-black text-rose-100">{blocked}</p>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[.05] p-5">
              <p className="text-xs text-amber-100/70">Production not verified</p>
              <p className="mt-2 text-3xl font-black text-amber-100">{unverifiedProduction}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[.2em] text-cyan-200">01 / SIX ENGINE ROLL CALL</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">The Fusion architecture</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Each engine points to its current evidence and its next dependency. These are readiness classifications, not fabricated uptime scores.</p>
          </div>
          <Link href="/atlas-core" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white">Open Atlas Core <ArrowUpRight size={16} /></Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {engineRecords.map((engine, index) => {
            const Icon = engineIcons[index];
            return (
              <article key={engine.id} className="rounded-3xl border border-white/10 bg-white/[.035] p-6 transition hover:border-cyan-200/30 hover:bg-white/[.055]">
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-xl border border-cyan-200/20 bg-cyan-200/[.07] p-3 text-cyan-100"><Icon size={21} /></div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${engineStyles[engine.state]}`}>{engine.state}</span>
                </div>
                <h3 className="mt-5 text-xl font-black">{engine.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{engine.focus}</p>
                <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-slate-300">{engine.evidence}</p>
                <div className="mt-4 rounded-xl bg-slate-950/60 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[.15em] text-emerald-200">Next action</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{engine.next}</p>
                </div>
                {engine.href && <a href={engine.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-cyan-200 hover:text-white">Open evidence <ArrowUpRight size={14} /></a>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071225]">
        <div className="container py-12 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[.2em] text-cyan-200">02 / INTEGRATION NEXUS</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">Provider evidence registry</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">A provider is not production-connected merely because its SDK, documentation or ChatGPT connector exists.</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><ShieldCheck size={16} className="text-emerald-200" /> Evidence-first classifications</div>
          </div>

          <div className="mt-7 flex flex-col gap-3 lg:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3">
              <Search size={17} className="text-slate-500" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search providers, categories or evidence…" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
            </label>
            <select value={filter} onChange={(event) => setFilter(event.target.value as FilterState)} className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none">
              <option value="all">All evidence states</option>
              {Object.entries(stateLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="hidden grid-cols-[1.05fr_.85fr_1.1fr_1.7fr] gap-4 border-b border-white/10 bg-white/[.04] px-5 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 lg:grid">
              <span>Provider</span><span>Category</span><span>Evidence state</span><span>Finding / boundary</span>
            </div>
            {visibleIntegrations.map((item) => (
              <div key={item.id} className="grid gap-3 border-b border-white/[.07] px-5 py-5 last:border-b-0 lg:grid-cols-[1.05fr_.85fr_1.1fr_1.7fr] lg:items-start lg:gap-4">
                <div>
                  <p className="font-bold">{item.name}</p>
                  {item.href && <a href={item.href} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-[11px] text-cyan-200 hover:text-white">Source <ArrowUpRight size={12} /></a>}
                </div>
                <p className="text-xs text-slate-400">{item.category}</p>
                <div><StatePill state={item.state} /></div>
                <div>
                  <p className="text-xs font-semibold leading-5 text-slate-200">{item.evidence}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.note}</p>
                  {item.productionActive === "not-verified" && <p className="mt-2 text-[10px] font-bold uppercase tracking-[.12em] text-amber-200">Production active: not verified</p>}
                </div>
              </div>
            ))}
            {visibleIntegrations.length === 0 && <div className="p-10 text-center text-sm text-slate-400">No providers match this filter.</div>}
          </div>
          <p className="mt-3 text-xs text-slate-500">The registry is a dated evidence baseline. Provider state must be refreshed by safe, scoped checks before any live authorization or production claim.</p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-3xl border border-emerald-300/20 bg-emerald-300/[.045] p-7">
            <p className="font-mono text-[10px] tracking-[.2em] text-emerald-200">03 / APPROVAL GATES</p>
            <h2 className="mt-3 text-2xl font-black">Preparation is not execution</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">The Control Tower separates evidence gathering and reversible preparation from consequential external actions.</p>
            <div className="mt-6 space-y-3">
              {approvalBoundaries.map((item) => (
                <div key={item.action} className="flex gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-4">
                  <LockKeyhole size={16} className="mt-0.5 shrink-0 text-amber-200" />
                  <div><p className="text-sm font-semibold">{item.action}</p><p className="mt-1 text-xs leading-5 text-slate-400">{item.gate}</p></div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/[.035] p-7">
            <p className="font-mono text-[10px] tracking-[.2em] text-cyan-200">04 / EVIDENCE STANDARD</p>
            <h2 className="mt-3 text-2xl font-black">No status without a source</h2>
            <div className="mt-6 space-y-4">
              <div className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-200" size={18}/><div><p className="text-sm font-bold">Verified access</p><p className="mt-1 text-xs leading-5 text-slate-400">A scoped read was successfully performed against the provider.</p></div></div>
              <div className="flex gap-3"><Activity className="mt-0.5 shrink-0 text-cyan-200" size={18}/><div><p className="text-sm font-bold">Implementation found</p><p className="mt-1 text-xs leading-5 text-slate-400">Code or dependencies were located; live provider operation is not implied.</p></div></div>
              <div className="flex gap-3"><CircleAlert className="mt-0.5 shrink-0 text-amber-200" size={18}/><div><p className="text-sm font-bold">Configured / not tested</p><p className="mt-1 text-xs leading-5 text-slate-400">Configuration evidence exists but a current safe provider test is missing.</p></div></div>
              <div className="flex gap-3"><CircleHelp className="mt-0.5 shrink-0 text-violet-200" size={18}/><div><p className="text-sm font-bold">Not checked / documented only</p><p className="mt-1 text-xs leading-5 text-slate-400">Unknown remains unknown. Documentation and connector availability do not prove authentication.</p></div></div>
            </div>
            <button onClick={() => setShowBoundaries((value) => !value)} className="mt-7 inline-flex items-center gap-2 rounded-xl border border-cyan-200/30 px-4 py-3 text-xs font-bold text-cyan-100 hover:bg-cyan-200/10">
              {showBoundaries ? "Hide operating principles" : "Show operating principles"} <ArrowUpRight size={14}/>
            </button>
            {showBoundaries && <div className="mt-4 rounded-xl bg-slate-950/60 p-4 text-xs leading-6 text-slate-300">Preserve original records. Append corrections rather than overwrite. Keep user-confirmed completed work intact. Record evidence timestamps and exact action scope. Never expose credentials or infer production state from CI alone.</div>}
          </article>
        </div>
      </section>

      <footer className="container pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500">
          <span>OMNIVERSE FUSION · OMNI CONTROL TOWER FOUNDATION</span>
          <span>Read-only baseline · No provider writes · No deployment or migration triggered</span>
        </div>
      </footer>
    </main>
  );
}
