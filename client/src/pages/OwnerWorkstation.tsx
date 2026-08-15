import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ToolState = "PORTAL READY" | "OWNER WORKSPACE" | "BROWSER-LOCAL" | "CONNECTION REQUIRED" | "RESEARCH REFERENCE";
type WorkTool = { name: string; lane: string; state: ToolState; description: string; href?: string };

const TOOLS: WorkTool[] = [
  { name: "Legion command room", lane: "Guidance & roles", state: "PORTAL READY", description: "Use the registered Legion experience to choose a role, prepare a prompt, and retain a human-led workflow.", href: "/ai-legion-apex" },
  { name: "Creator workspace", lane: "Creator records", state: "OWNER WORKSPACE", description: "Manage consented profile, collaboration, and provenance work from one authenticated ScrollVerse surface.", href: "/creator-workspace" },
  { name: "Creator operations", lane: "Review workflow", state: "OWNER WORKSPACE", description: "Coordinate protected completeness review without representing legal, provider, or commercial clearance.", href: "/admin/creator-operations" },
  { name: "Digital Hollywood studio", lane: "Film & story", state: "BROWSER-LOCAL", description: "Plan story, visual, sound, editorial, accessibility, and release review lanes before external production activity.", href: "/digital-hollywood-studio" },
  { name: "Creator media packet", lane: "Media readiness", state: "BROWSER-LOCAL", description: "Organize contributor, source, accessibility, youth, and release planning in the browser.", href: "/creator-media-packet" },
  { name: "Open Research Navigator", lane: "Research", state: "PORTAL READY", description: "Study source-labeled astronomy, physics, archives, UAP records, and quantum-information pathways.", href: "/open-research-navigator" },
  { name: "Mesopotamia Commons", lane: "Knowledge archive", state: "PORTAL READY", description: "Connect free learning, historical archives, creative practice, books, and contribution pathways.", href: "/mesopotamia-commons" },
  { name: "ConsoleVerse", lane: "Operations", state: "BROWSER-LOCAL", description: "Use local workflow lenses for sources, stages, exceptions, and preparation before a human-approved handoff.", href: "/consoleverse" },
  { name: "Financial activation map", lane: "Commerce readiness", state: "PORTAL READY", description: "Review actual test, preparation, and owner/provider-gated states without activating money movement.", href: "/financial-activation-readiness" },
  { name: "External AI providers", lane: "AI ecosystem", state: "CONNECTION REQUIRED", description: "Provider models can be evaluated only after an owner-controlled account connection, scoped credentials, and a reviewed use case." },
  { name: "Public AI research shelf", lane: "AI ecosystem", state: "RESEARCH REFERENCE", description: "A source-labeled discovery lane for public documentation and model research; it does not provide account, model, or data access." },
];

const LANES = ["All", "Guidance & roles", "Creator records", "Review workflow", "Film & story", "Media readiness", "Research", "Knowledge archive", "Operations", "Commerce readiness", "AI ecosystem"] as const;

const stateStyle: Record<ToolState, { color: string; label: string }> = {
  "PORTAL READY": { color: "#00FF88", label: "Portal route available" },
  "OWNER WORKSPACE": { color: "#B98CFF", label: "Authenticated owner workflow" },
  "BROWSER-LOCAL": { color: "#00D4FF", label: "Current-browser planning only" },
  "CONNECTION REQUIRED": { color: "#FFB800", label: "Owner connection and review required" },
  "RESEARCH REFERENCE": { color: "#9CB0C1", label: "Public source reference only" },
};

export default function OwnerWorkstation() {
  useSovereignHeartbeat({ page: "owner-workstation" });
  const { user, loading, isAuthenticated } = useAuth();
  const [lane, setLane] = useState<(typeof LANES)[number]>("All");
  const [focus, setFocus] = useState("Build a first-party ScrollVerse workflow with sources, rights, access, and release checks visible.");
  const [localBrief, setLocalBrief] = useState("");

  const tools = useMemo(() => TOOLS.filter(tool => lane === "All" || tool.lane === lane), [lane]);
  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(localBrief || focus);
      toast.success("Workstation brief copied locally.");
    } catch {
      toast.error("Copy is unavailable in this browser.");
    }
  };

  if (loading) return <main className="grid min-h-screen place-items-center" style={{ background: "#050B1A", color: "#00D4FF" }}>Loading owner workstation…</main>;
  if (!isAuthenticated) return <main className="grid min-h-screen place-items-center px-5 text-center text-white" style={{ background: "#050B1A" }}><section className="max-w-xl rounded-3xl border p-8" style={{ borderColor: "rgba(0,212,255,0.28)", background: "rgba(255,255,255,0.025)" }}><div className="text-xs font-mono tracking-[0.2em]" style={{ color: "#00D4FF" }}>OWNER WORKSTATION</div><h1 className="mt-4 text-3xl font-black">Sign in to open the private creation surface.</h1><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>This route is reserved for authorized owner access. It does not expose credentials, provider accounts, wallet controls, payments, or transaction functions.</p><button onClick={() => { window.location.href = getLoginUrl(); }} className="mt-6 rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Sign in</button></section></main>;
  if (user?.role !== "admin") return <main className="grid min-h-screen place-items-center px-5 text-center text-white" style={{ background: "#050B1A" }}><section className="max-w-xl rounded-3xl border p-8" style={{ borderColor: "rgba(255,184,0,0.3)", background: "rgba(255,184,0,0.03)" }}><div className="text-xs font-mono tracking-[0.2em]" style={{ color: "#FFB800" }}>OWNER ACCESS REQUIRED</div><h1 className="mt-4 text-3xl font-black">This Workstation remains private.</h1><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>Use the public knowledge and creator routes to explore available learning and planning tools. The owner control room is restricted to authorized administrators.</p><Link href="/creator-workspace" className="mt-6 inline-block text-sm font-black" style={{ color: "#00D4FF" }}>Open Creator Workspace →</Link></section></main>;

  return <DashboardLayout><main className="min-h-full space-y-7 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="rounded-3xl border p-7" style={{ borderColor: "rgba(0,212,255,0.28)", background: "radial-gradient(circle at 88% 0%, rgba(185,140,255,0.16), transparent 38%), #071126" }}>
      <div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#00D4FF" }}>OWNER-EXCLUSIVE · SCROLLVERSE WORKSTATION</div>
      <div className="mt-5 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]"><div><h1 className="text-4xl font-black leading-tight">Create, direct, study, and build.<br /><span style={{ color: "#00D4FF" }}>Keep the operating state visible.</span></h1><p className="mt-5 max-w-3xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>A private command surface for your Legion and team workflows. It organizes real ScrollVerse routes, local planning rooms, and connection-gated integrations without claiming access to systems or accounts that have not been configured.</p></div><aside className="rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.26)", background: "rgba(0,255,136,0.04)" }}><div className="text-[10px] font-mono tracking-widest" style={{ color: "#00FF88" }}>CURRENT OPERATING STANDARD</div><p className="mt-3 text-sm font-bold">Source → owner → access state → review → action.</p><p className="mt-3 text-xs leading-relaxed" style={{ color: "#B8C7D6" }}>No credential display, provider takeover, wallet connection, payment, payout, contract deployment, or transaction is enabled by this directory.</p></aside></div>
    </section>

    <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.24)", background: "rgba(255,184,0,0.025)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>WORKING BRIEF · BROWSER LOCAL</div><h2 className="mt-3 text-2xl font-black">Set the next build intention.</h2><label className="mt-5 block text-xs font-bold" style={{ color: "#C8D8E7" }}>Focus statement<textarea value={focus} onChange={event => setFocus(event.target.value)} maxLength={800} className="mt-2 min-h-28 w-full rounded-xl border bg-transparent px-3 py-3 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.15)" }} /></label><label className="mt-4 block text-xs font-bold" style={{ color: "#C8D8E7" }}>Scratch brief<textarea value={localBrief} onChange={event => setLocalBrief(event.target.value)} maxLength={2400} placeholder="Outline sources, collaborators, rights, accessibility, decisions, and next human action…" className="mt-2 min-h-40 w-full rounded-xl border bg-transparent px-3 py-3 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.15)" }} /></label><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={copyBrief} className="rounded-xl px-4 py-2.5 text-sm font-black" style={{ background: "#FFB800", color: "#050B1A" }}>Copy brief</button><button type="button" onClick={() => { setLocalBrief(""); toast.success("Browser-local brief cleared."); }} className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#C8D8E7" }}>Clear local note</button></div><p className="mt-4 text-xs leading-relaxed" style={{ color: "#9CB0C1" }}>This brief stays in the current browser state. It does not save, transmit, assign tasks, prompt an external model, or create a project record.</p></div>
      <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.24)", background: "rgba(185,140,255,0.025)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>LEGION + TEAM FLIGHT PATH</div><h2 className="mt-3 text-2xl font-black">Choose a lane before choosing a tool.</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{[
        ["Frame the question", "Open Research Navigator", "/open-research-navigator"],
        ["Record the origin", "Creator Workspace", "/creator-workspace"],
        ["Develop the media", "Digital Hollywood Studio", "/digital-hollywood-studio"],
        ["Review the release", "Media & Portfolio Readiness", "/media-portfolio-readiness"],
        ["Coordinate the work", "ConsoleVerse", "/consoleverse"],
        ["Consult a role guide", "AI Legion Apex", "/ai-legion-apex"],
      ].map(([step, label, href]) => <Link key={label} href={href} className="rounded-2xl border p-4 transition hover:-translate-y-0.5" style={{ borderColor: "rgba(185,140,255,0.22)", background: "rgba(4,14,30,0.56)" }}><div className="text-[10px] font-mono" style={{ color: "#B98CFF" }}>{step}</div><div className="mt-2 text-sm font-black">{label} →</div></Link>)}</div><p className="mt-5 text-xs leading-relaxed" style={{ color: "#9CB0C1" }}>Role guides support planning and craftsmanship; they do not act as legal authorities, providers, banks, or autonomous decision-makers.</p></div></section>

    <section className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.22)", background: "rgba(0,212,255,0.02)" }}><div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>TOOL AND AI ECOSYSTEM DIRECTORY</div><h2 className="mt-3 text-2xl font-black">Connection status is part of the tool.</h2></div><div className="flex flex-wrap gap-2">{LANES.map(item => <button key={item} type="button" onClick={() => setLane(item)} className="rounded-full border px-3 py-1.5 text-xs font-bold" style={{ borderColor: lane === item ? "#00D4FF" : "rgba(255,255,255,0.14)", color: lane === item ? "#00D4FF" : "#C8D8E7", background: lane === item ? "rgba(0,212,255,0.12)" : "transparent" }}>{item}</button>)}</div></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{tools.map(tool => { const status = stateStyle[tool.state]; const body = <><div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-mono" style={{ color: "#9CB0C1" }}>{tool.lane.toUpperCase()}</div><h3 className="mt-1 text-lg font-black">{tool.name}</h3></div><span className="rounded-full px-2 py-1 text-[9px] font-mono font-bold" style={{ color: status.color, background: `${status.color}14`, border: `1px solid ${status.color}3d` }}>{tool.state}</span></div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{tool.description}</p><p className="mt-4 text-[11px] font-bold" style={{ color: status.color }}>{status.label}</p></>; return tool.href ? <Link key={tool.name} href={tool.href} className="rounded-2xl border p-5 transition hover:-translate-y-0.5" style={{ borderColor: "rgba(255,255,255,0.13)", background: "rgba(4,14,30,0.65)" }}>{body}</Link> : <article key={tool.name} className="rounded-2xl border p-5" style={{ borderColor: "rgba(255,255,255,0.13)", background: "rgba(4,14,30,0.65)" }}>{body}</article>; })}</div></section>

    <section className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,93,93,0.24)", background: "rgba(255,93,93,0.025)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#FF7575" }}>EXCLUSIVE ACCESS + HARD BOUNDARIES</div><p className="mt-3 max-w-5xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>This workstation is restricted to authorized administrators. Its directory does not share access, credentials, private prompts, provider accounts, or team records. It also does not issue cards, open accounts, custody assets, connect wallets, transmit money, mint, deploy contracts, submit content, or make an external provider decision. Those actions remain separate, evidenced, owner-controlled workflows.</p></section>
  </main></DashboardLayout>;
}
