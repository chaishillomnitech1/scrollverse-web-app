import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Landmark,
  LockKeyhole,
  Network,
  Scale,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type State = "available now" | "research" | "requires owner action";

type Milestone = {
  id: string;
  number: string;
  title: string;
  state: State;
  summary: string;
  evidence: string[];
  externalGate: string;
  icon: typeof Landmark;
};

const STATE_TONE: Record<State, { text: string; border: string; background: string }> = {
  "available now": { text: "#00FF88", border: "rgba(0,255,136,.35)", background: "rgba(0,255,136,.08)" },
  research: { text: "#00D4FF", border: "rgba(0,212,255,.35)", background: "rgba(0,212,255,.08)" },
  "requires owner action": { text: "#FFB800", border: "rgba(255,184,0,.35)", background: "rgba(255,184,0,.08)" },
};

const MILESTONES: Milestone[] = [
  {
    id: "charter",
    number: "01",
    title: "Charter and accountable governance",
    state: "requires owner action",
    summary: "Choose a viable chartering route, form an accountable organizer and board structure, and assemble the governance record expected for a regulated institution.",
    evidence: ["Charter-path decision", "Organizer and director dossier", "Governance, policies, and public-notice plan"],
    externalGate: "A charter application and any communications with a chartering authority occur only through the chosen regulated process and an owner-approved filing package.",
    icon: Landmark,
  },
  {
    id: "capital",
    number: "02",
    title: "Business plan and capital readiness",
    state: "requires owner action",
    summary: "Translate the creative vision into a credible business model, financial projections, liquidity and capital plan, risk appetite, and experienced management plan.",
    evidence: ["Sound business plan", "Appropriate capital support", "Management and operating model"],
    externalGate: "No fundraising, deposits, client funds, shares, accounts, or financial offer is created from this readiness page.",
    icon: WalletCards,
  },
  {
    id: "compliance",
    number: "03",
    title: "Risk, AML, consumer, and control program",
    state: "research",
    summary: "Define a risk-profile-based control architecture for BSA/AML, customer identification, suspicious-activity workflows, complaints, records, vendor oversight, and independent testing.",
    evidence: ["Enterprise risk assessment", "BSA/AML and OFAC controls", "Consumer and operations controls"],
    externalGate: "A real compliance program requires qualified leadership, policies, testing, regulatory review, approved providers, and operational evidence before launch.",
    icon: ShieldCheck,
  },
  {
    id: "technology",
    number: "04",
    title: "Secure technology and provider architecture",
    state: "research",
    summary: "Evaluate a documented, auditable technology architecture for identity, core processing, security, resilience, vendor management, privacy, accessibility, and incident response.",
    evidence: ["Security and privacy architecture", "Third-party risk program", "Operational resilience and incident evidence"],
    externalGate: "No wallet, custody, payment, account, ledger, transaction, or provider connection is enabled from this blueprint.",
    icon: Network,
  },
  {
    id: "approvals",
    number: "05",
    title: "Approvals, deposit insurance, and launch evidence",
    state: "requires owner action",
    summary: "Obtain the approvals applicable to the chosen structure, complete pre-opening requirements, and only then represent the institution and its products by their verified operating state.",
    evidence: ["Regulator or provider approval record", "Pre-opening and readiness evidence", "Public disclosures and product controls"],
    externalGate: "Deposit insurance may be represented only for deposits at an FDIC-insured bank. Crypto assets, investment products, or a browser-local ledger are not FDIC-insured deposits.",
    icon: BadgeCheck,
  },
];

const OFFICIAL_SOURCES = [
  { title: "FDIC — Applications for Deposit Insurance", href: "https://www.fdic.gov/bank-examinations/applications-deposit-insurance", note: "De novo application resources and organizer handbook." },
  { title: "OCC — Comptroller’s Licensing Manual", href: "https://www.occ.gov/publications-and-resources/publications/comptrollers-licensing-manual/index-comptrollers-licensing-manual.html", note: "Charter, capital, management, and licensing guidance." },
  { title: "Federal Reserve — Bank Holding Company Filings", href: "https://www.federalreserve.gov/supervisionreg/afi/bhcfilings.htm", note: "Formation and prior-approval pathways for bank holding companies." },
  { title: "FFIEC — BSA/AML Examination Manual", href: "https://bsaaml.ffiec.gov/manual/Introduction/01", note: "Risk management, compliance-program, and examination guidance." },
  { title: "FDIC — Understanding Deposit Insurance", href: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance", note: "Coverage boundary for deposits at FDIC-insured banks." },
];

export default function SovereignBank() {
  useSovereignHeartbeat({ page: "sovereign-bank-readiness" });
  const [filter, setFilter] = useState<"all" | State>("all");
  const visibleMilestones = useMemo(() => filter === "all" ? MILESTONES : MILESTONES.filter((item) => item.state === filter), [filter]);

  const copyReadinessPath = async () => {
    try {
      await navigator.clipboard.writeText("Sovereign Bank readiness: charter and governance → business plan and capital → risk/compliance controls → secure technology and provider architecture → verified approvals and launch evidence.");
      toast.success("Readiness path copied for local planning");
    } catch {
      toast.error("Copy was unavailable in this browser");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050B1A] text-white">
      <section className="relative overflow-hidden border-b border-amber-300/20 bg-[radial-gradient(circle_at_16%_4%,rgba(255,184,0,.18),transparent_31%),radial-gradient(circle_at_88%_16%,rgba(0,212,255,.16),transparent_28%),#050B1A]">
        <div className="container py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[.24em] text-amber-200">SCROLLVERSE · SOVEREIGN BANK · BANK-GRADE READINESS</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] md:text-6xl">Build a financial institution that earns trust through <span className="text-amber-300">verifiable milestones</span>.</h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">The Sovereign Bank concept is now organized around the same kind of evidence a serious financial institution must assemble: a charter path, accountable governance, capital and planning discipline, risk controls, secure operations, and independently verifiable approvals.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={copyReadinessPath} className="inline-flex items-center gap-2 rounded-xl border border-amber-200/35 bg-amber-300/10 px-5 py-3 text-sm font-bold text-amber-50 transition hover:bg-amber-300/20"><ClipboardCheck size={16} /> Copy readiness path</button>
                <Link href="/financial-activation-readiness" className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/35 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-50 transition hover:bg-cyan-300/20">Financial readiness record <ArrowRight size={16} /></Link>
              </div>
            </div>
            <aside className="rounded-[2rem] border border-amber-200/25 bg-slate-950/65 p-6 shadow-2xl shadow-amber-950/30">
              <p className="font-mono text-xs tracking-[.2em] text-amber-200">CURRENT OPERATING STATE</p>
              <div className="mt-5 rounded-2xl border border-cyan-300/30 bg-cyan-300/[.08] p-4"><p className="text-sm font-bold text-cyan-100">Browser-local readiness blueprint</p><p className="mt-2 text-sm leading-6 text-slate-300">Available for planning, source review, and milestone tracking.</p></div>
              <div className="mt-3 rounded-2xl border border-amber-300/30 bg-amber-300/[.07] p-4"><p className="text-sm font-bold text-amber-100">Not yet a chartered bank</p><p className="mt-2 text-sm leading-6 text-slate-300">No customer accounts, deposits, custody, payments, loans, yield products, FDIC insurance, or live financial services are represented by this page.</p></div>
            </aside>
          </div>
          <div className="mt-10"><PortalTrustLens lane="Bank-grade readiness" source="Official FDIC, OCC, Federal Reserve, FinCEN, and FFIEC guidance; owner-supplied protected liquidity-ledger planning context" readiness="Research and browser-local planning available now" boundary="No bank charter, deposit insurance, account opening, provider connection, customer-fund custody, yield product, lending, payment service, wallet, transaction, or financial offer is active from this route." /></div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="font-mono text-xs tracking-[.2em] text-cyan-300">FIVE STAGES OF PROOF</p><h2 className="mt-3 text-3xl font-black md:text-4xl">From concept to a verifiable institution</h2></div>
          <div className="flex flex-wrap gap-2">{(["all", "available now", "research", "requires owner action"] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className="rounded-full border px-4 py-2 text-xs font-bold capitalize transition" style={filter === item ? { color: item === "all" ? "#FFFFFF" : STATE_TONE[item].text, borderColor: item === "all" ? "rgba(255,255,255,.4)" : STATE_TONE[item].border, background: item === "all" ? "rgba(255,255,255,.1)" : STATE_TONE[item].background } : { color: "#AFC0CF", borderColor: "rgba(255,255,255,.14)" }}>{item}</button>)}</div>
        </div>
        <div className="mt-9 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {visibleMilestones.map((milestone) => {
            const Icon = milestone.icon;
            const tone = STATE_TONE[milestone.state];
            return <article key={milestone.id} className="rounded-3xl border border-white/10 bg-white/[.035] p-6 transition hover:-translate-y-1 hover:border-amber-200/35 hover:bg-white/[.055]">
              <div className="flex items-start justify-between gap-3"><span className="rounded-2xl border p-3" style={{ color: tone.text, borderColor: tone.border, background: tone.background }}><Icon size={22} /></span><span className="rounded-full border px-3 py-1 text-[11px] font-bold capitalize" style={{ color: tone.text, borderColor: tone.border, background: tone.background }}>{milestone.state}</span></div>
              <p className="mt-5 font-mono text-xs tracking-[.18em] text-slate-400">MILESTONE {milestone.number}</p><h3 className="mt-2 text-xl font-black">{milestone.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{milestone.summary}</p>
              <div className="mt-5 space-y-2">{milestone.evidence.map((item) => <div key={item} className="flex items-center gap-2 text-sm text-slate-200"><CheckCircle2 size={15} className="text-emerald-300" />{item}</div>)}</div>
              <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[.045] p-4"><div className="flex items-center gap-2 text-xs font-bold tracking-[.12em] text-amber-200"><LockKeyhole size={14} /> EXTERNAL GATE</div><p className="mt-2 text-sm leading-6 text-slate-300">{milestone.externalGate}</p></div>
            </article>;
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/50"><div className="container py-14 md:py-20"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono text-xs tracking-[.2em] text-amber-300">WHAT VALIDATION LOOKS LIKE</p><h2 className="mt-3 text-3xl font-black">Evidence, not self-approval.</h2><p className="mt-5 max-w-xl leading-7 text-slate-300">A ledger, token, web page, or community declaration can support an internal project record. It does not replace the licensing, insurance, supervision, consumer-protection, AML, capital, and operating evidence required for a regulated banking pathway.</p><p className="mt-4 leading-7 text-slate-300">The practical standard is clear: represent each capability only after the relevant regulator, provider, operating control, and public evidence record exists.</p></div><div className="grid gap-3 sm:grid-cols-2">{OFFICIAL_SOURCES.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[.035] p-5 transition hover:border-cyan-200/35 hover:bg-cyan-300/[.045]"><Scale size={18} className="text-cyan-300" /><h3 className="mt-4 text-sm font-black text-white group-hover:text-cyan-100">{source.title}</h3><p className="mt-2 text-xs leading-5 text-slate-300">{source.note}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-200">Open official source <ArrowRight size={13} /></span></a>)}</div></div></div></section>

      <section className="container py-14 md:py-20"><div className="rounded-[2rem] border border-purple-200/25 bg-[linear-gradient(115deg,rgba(185,140,255,.14),rgba(0,212,255,.08),rgba(5,11,26,.72))] p-7 md:p-10"><p className="font-mono text-xs tracking-[.2em] text-purple-200">CONNECTED SOVEREIGN PATHWAYS</p><div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><h2 className="text-3xl font-black">Connect the bank-grade blueprint to the wider readiness system.</h2><p className="mt-3 max-w-2xl text-slate-200">Continue through financial activation readiness, commerce readiness, protected-source evidence, and the active-pathways audit—without turning any planning route into a live financial product.</p></div><div className="flex flex-wrap gap-3"><Link href="/financial-activation-readiness" className="rounded-xl border border-cyan-200/35 bg-cyan-300/10 px-4 py-3 text-sm font-bold text-cyan-50 hover:bg-cyan-300/20">Financial Readiness</Link><Link href="/commerce-financial-readiness-board" className="rounded-xl border border-amber-200/35 bg-amber-300/10 px-4 py-3 text-sm font-bold text-amber-50 hover:bg-amber-300/20">Commerce Readiness</Link><Link href="/active-pathways-release-gates-audit" className="rounded-xl border border-purple-200/35 bg-purple-300/10 px-4 py-3 text-sm font-bold text-purple-50 hover:bg-purple-300/20">Pathways Audit</Link></div></div></div></section>
    </main>
  );
}
