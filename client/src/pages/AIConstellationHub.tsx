import { useMemo, useState } from "react";
import { Bot, BookOpenCheck, BrainCircuit, Copy, ExternalLink, Film, Link2, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type OperatingState = "available now" | "research" | "requires owner release";

type Role = {
  name: string;
  title: string;
  focus: string;
  tutorial: string;
  route: string;
  color: string;
  state: OperatingState;
};

const ROLES: Role[] = [
  { name: "Qubit", title: "Technical Research Guide", focus: "turn technical or quantum concepts into reproducible evidence requirements", tutorial: "Learn the difference between a research concept, a reproducible method, and a verified technical result.", route: "/quantum-research", color: "#00D4FF", state: "research" },
  { name: "Socratica", title: "Ethics & Inquiry Guide", focus: "frame questions, sources, limitations, and visitor-directed learning", tutorial: "Practice turning a broad claim into a clear question, source path, and correction route.", route: "/learning-pathways", color: "#FFCC4D", state: "available now" },
  { name: "Omnitech1", title: "Build & Delivery Guide", focus: "connect a feature idea to an implementation and validation record", tutorial: "Map an idea to route, test, source, deployment boundary, and next action.", route: "/vibe-canvas", color: "#FF6B35", state: "available now" },
  { name: "Tatras", title: "Research Pattern Guide", focus: "work with aggregate evidence without predicting individual outcomes", tutorial: "Use a source, date, limitation, and correction note before drawing a conclusion.", route: "/evidence-commons", color: "#00FF88", state: "research" },
  { name: "ZERO Flame", title: "Creative Momentum Guide", focus: "turn original concepts into a release-aware creative packet", tutorial: "Build an original project brief without creating a token, sale, or financial claim.", route: "/first-sku-activation-packet", color: "#FF6B35", state: "available now" },
  { name: "King Solomon AI", title: "Assistive Governance Guide", focus: "surface choices, trade-offs, and transparent operating boundaries", tutorial: "Learn to prepare a governance question without presenting an AI as a legal authority.", route: "/assistive-governance-desk", color: "#B98CFF", state: "available now" },
  { name: "Lyrian Lion", title: "Legacy Story Guide", focus: "organize original legacy material as source-labeled creative context", tutorial: "Create a public-display decision record with source, purpose, and correction path.", route: "/accomplishments-archive", color: "#F59E0B", state: "research" },
  { name: "PSYCHE16", title: "Reflective Identity Guide", focus: "support browser-local reflection without identity scoring or profiling", tutorial: "Prepare a private reflection prompt while keeping personal data under visitor control.", route: "/co-creation-navigator", color: "#FF6B9A", state: "available now" },
  { name: "QFS Oracle", title: "Financial Readiness Guide", focus: "separate education and release readiness from financial advice or transactions", tutorial: "Identify the evidence and owner release needed before a financial pathway can be represented.", route: "/financial-activation-readiness", color: "#00FF88", state: "requires owner release" },
  { name: "Azurath", title: "Exchange Readiness Guide", focus: "map original creator value without presenting a live exchange or investment outcome", tutorial: "Build a creator-exchange readiness brief with rights, terms, and provider gates.", route: "/creator-exchange-navigator", color: "#3498DB", state: "requires owner release" },
  { name: "NŪR Cities AI", title: "Systems Design Guide", focus: "study physical-digital systems as original planning work", tutorial: "Turn a systems idea into a public research card with practical boundaries.", route: "/systems-map", color: "#1ABC9C", state: "research" },
  { name: "Manus", title: "Creator Workflow Guide", focus: "translate direction into routes, records, tests, and reviewable outputs", tutorial: "Use the command center to identify one exact next record instead of assuming an external outcome.", route: "/august-28-launch", color: "#E5F0FF", state: "available now" },
  { name: "Londyn AI", title: "Care & Legacy Guide", focus: "keep purpose, care, and legacy visible in original creative work", tutorial: "Add a care, accessibility, and long-term stewardship section to a project packet.", route: "/londyn-legacy", color: "#EC4899", state: "available now" },
  { name: "Knick", title: "Perspective Guide", focus: "prepare reflection and research prompts without making factual claims beyond the record", tutorial: "Compare viewpoints while keeping sources and interpretation boundaries visible.", route: "/scrollverse-perspectives", color: "#FFB800", state: "available now" },
  { name: "Prometheus", title: "Open Knowledge Guide", focus: "route visitors toward free, source-labeled learning pathways", tutorial: "Share a learning resource with attribution, accessibility, and a visitor-choice boundary.", route: "/open-knowledge-verse", color: "#DCC8FF", state: "available now" },
];

const PROVIDERS = [
  { name: "ChatGPT", category: "General assistant", url: "https://chatgpt.com/", note: "Public discovery link. Provider account, data use, and terms remain separate." },
  { name: "Claude", category: "General assistant", url: "https://claude.ai/", note: "Public discovery link. No shared ScrollVerse account or data flow is created." },
  { name: "Gemini", category: "General assistant", url: "https://gemini.google.com/", note: "Public discovery link. Google controls its own account and service settings." },
  { name: "Grok", category: "General assistant", url: "https://grok.com/", note: "Public discovery link. No partnership, provider connection, or automation is implied." },
  { name: "Microsoft Copilot", category: "Work assistant", url: "https://copilot.microsoft.com/", note: "Public discovery link. Workspaces and permissions remain visitor-controlled." },
  { name: "Perplexity", category: "Research discovery", url: "https://www.perplexity.ai/", note: "Public discovery link. Check sources directly and retain your own research record." },
  { name: "Meta AI", category: "General assistant", url: "https://www.meta.ai/", note: "Public discovery link. No account, chat, or content sharing is initiated here." },
  { name: "Mistral", category: "Models & assistant", url: "https://chat.mistral.ai/", note: "Public discovery link. Provider access and terms remain separate visitor choices." },
  { name: "Runway", category: "Creative video", url: "https://runwayml.com/", note: "Public discovery link. Original media, rights, and release gates still apply." },
  { name: "ElevenLabs", category: "Voice & audio", url: "https://elevenlabs.io/", note: "Public discovery link. Narration requires an original script, accessibility plan, and release record." },
] as const;

const STATE_STYLE: Record<OperatingState, { color: string; label: string }> = {
  "available now": { color: "#00FF88", label: "AVAILABLE NOW" },
  research: { color: "#00D4FF", label: "RESEARCH" },
  "requires owner release": { color: "#FFCC4D", label: "REQUIRES OWNER RELEASE" },
};

export default function AIConstellationHub() {
  useSovereignHeartbeat({ page: "ai-constellation" });
  const [filter, setFilter] = useState<"all" | OperatingState>("all");
  const [selectedRole, setSelectedRole] = useState(ROLES[0].name);
  const [integrationFocus, setIntegrationFocus] = useState("a provider connection for an original ScrollVerse workflow");

  const roles = useMemo(() => (filter === "all" ? ROLES : ROLES.filter((role) => role.state === filter)), [filter]);
  const active = useMemo(() => ROLES.find((role) => role.name === selectedRole) ?? ROLES[0], [selectedRole]);
  const brief = `ScrollVerse AI Integration Record\nProvider or role: ${active.name}\nPurpose: ${integrationFocus || "[describe the intended use]"}\nOperating state: ${active.state}\nData shared: [none / describe minimum necessary data]\nAccount & permission owner: [name / role]\nPrivacy and terms review: [record link]\nTest evidence: [record link]\nExact external action: [name one action]\nOwner confirmation: [required]\nBoundary: This is a browser-local preparation record. It does not connect an account, share data, run an AI, or automate an action.`;

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      toast.success("Integration record copied.");
    } catch {
      toast.error("Copy is unavailable in this browser.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b border-[#00D4FF]/30 bg-[radial-gradient(circle_at_82%_8%,rgba(0,212,255,.2),transparent_25%),radial-gradient(circle_at_11%_84%,rgba(185,140,255,.2),transparent_31%),#050B1A]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true" />
        <div className="container relative py-14 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/ai-legion-apex" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← AI LEGION APEX</Link>
            <span className="rounded-full border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">ORIGINAL ROLES · PUBLIC DISCOVERY · VERIFIED GATES</span>
          </div>
          <div className="mt-12 grid gap-8 xl:grid-cols-[1.12fr_.88fr] xl:items-end">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#9DEBFF]">SCROLLVERSE AI CONSTELLATION HUB</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">One portal. <span className="text-[#DCC8FF]">Many intelligent paths.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Explore original ScrollVerse AI roles, open public AI discovery links, build a role-specific tutorial path, and turn a possible integration into an evidence-led record before any external connection is made.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#tutorial-studio" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Open Tutorial Studio</a>
                <a href="#provider-discovery" className="rounded-xl border border-[#DCC8FF]/50 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Explore AI discovery</a>
                <Link href="/ai-legion-apex" className="rounded-xl border border-[#00FF88]/50 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Open AI Legion Apex</Link>
              </div>
            </div>
            <aside className="rounded-[2rem] border border-[#00FF88]/35 bg-[linear-gradient(145deg,rgba(0,255,136,.12),rgba(7,20,38,.96)_58%)] p-7">
              <ShieldCheck className="h-9 w-9 text-[#B5F7CC]" />
              <p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">CONSTELLATION HONESTY STANDARD</p>
              <p className="mt-3 text-2xl font-black leading-tight">A discovery link is not an integration.</p>
              <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The hub makes AI options easy to find while keeping provider accounts, APIs, data sharing, costs, permissions, and automation as separate owner-controlled decisions.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <PortalTrustLens lane="AI Constellation Hub" source="Original ScrollVerse AI Legion registry, browser-local companion routes, source-labeled AI provider home pages, and the Phase 563 evidence-completion standard." readiness="Original roles, text-first tutorial pathways, related ScrollVerse routes, browser-local integration briefs, and public discovery links are available now." boundary="No external AI provider is connected through this page. Opening a public link does not create an account, data share, partnership, API integration, automated action, payment, wallet, token, or external system control." />
      </section>

      <section className="container py-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">ORIGINAL SCROLLVERSE ROLE TUTORIALS</p><h2 className="mt-3 text-4xl font-black">Learn what each guide is for.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Each card opens a text-first tutorial production packet. A public video still requires its own original script, visual treatment, captions, narration, destination, and owner release.</p></div>
          <div className="flex flex-wrap gap-2">{(["all", "available now", "research", "requires owner release"] as const).map((state) => <button key={state} type="button" onClick={() => setFilter(state)} className="rounded-full border px-3 py-2 text-[10px] font-mono tracking-[.1em] transition" style={{ borderColor: filter === state ? "#00D4FF" : "rgba(255,255,255,.16)", background: filter === state ? "rgba(0,212,255,.12)" : "rgba(255,255,255,.03)", color: filter === state ? "#9DEBFF" : "#AFC0CF" }}>{state.toUpperCase()}</button>)}</div>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roles.map((role) => { const state = STATE_STYLE[role.state]; return <article key={role.name} className="flex flex-col rounded-[1.7rem] border bg-white/[.025] p-6" style={{ borderColor: `${role.color}55` }}><Bot className="h-6 w-6" style={{ color: role.color }} /><div className="mt-5 flex items-start justify-between gap-3"><div><p className="text-xs font-mono tracking-[.14em]" style={{ color: role.color }}>ORIGINAL AI ROLE</p><h3 className="mt-2 text-2xl font-black">{role.name}</h3><p className="mt-1 text-sm text-[#B8C8D7]">{role.title}</p></div><span className="rounded-full border px-2 py-1 text-[9px] font-mono" style={{ color: state.color, borderColor: `${state.color}66`, background: `${state.color}12` }}>{state.label}</span></div><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{role.focus}</p><button type="button" onClick={() => { setSelectedRole(role.name); document.getElementById("tutorial-studio")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 text-left text-sm font-black" style={{ color: role.color }}>Open {role.name} tutorial →</button></article>; })}
        </div>
      </section>

      <section id="tutorial-studio" className="container py-8">
        <div className="rounded-[2rem] border border-[#B98CFF]/40 bg-[radial-gradient(circle_at_96%_6%,rgba(185,140,255,.22),transparent_30%),#071426] p-7 sm:p-9">
          <div className="grid gap-8 xl:grid-cols-[.82fr_1.18fr]">
            <div><Film className="h-9 w-9 text-[#DCC8FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">AI TUTORIAL STUDIO</p><h2 className="mt-3 text-4xl font-black">What it does. How to use it. What comes next.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">This is the production-ready text-first tutorial layer for every original role. It stays useful now and becomes a video packet only when the release fields are complete.</p><div className="mt-6 rounded-2xl border border-[#00FF88]/30 bg-[#00FF88]/[.06] p-5"><p className="text-xs font-mono tracking-[.14em] text-[#B5F7CC]">VIDEO RELEASE GATE</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Script and visual direction are available locally. Original voice/narration, captions, final media, destination, and owner release remain separate required records.</p></div></div>
            <div className="grid gap-4"><label className="text-xs font-mono tracking-[.14em] text-[#AFC0CF]">SELECT A ROLE<select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#071426] px-4 py-3 text-sm text-white outline-none focus:border-[#DCC8FF]/70">{ROLES.map((role) => <option key={role.name}>{role.name}</option>)}</select></label><article className="rounded-2xl border border-white/10 bg-black/25 p-5"><p className="text-xs font-mono tracking-[.14em]" style={{ color: active.color }}>{active.name.toUpperCase()} · TUTORIAL PACKET</p><h3 className="mt-2 text-2xl font-black">{active.title}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]}" >{active.tutorial}</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="text-[10px] font-mono text-[#9DEBFF]">WHAT I DO</p><p className="mt-2 text-sm text-[#D6E2EE]">{active.focus}</p></div><div className="rounded-xl border border-white/10 bg-white/[.03] p-4"><p className="text-[10px] font-mono text-[#DCC8FF]">HOW TO START</p><Link href={active.route} className="mt-2 block text-sm font-black text-[#DCC8FF]">Open the related ScrollVerse route →</Link></div></div><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono text-[#B5F7CC]">SCRIPT READY</span><span className="rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono text-[#9DEBFF]">CAPTIONS PLANNED</span><span className="rounded-full border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono text-[#FFDEA0]">VIDEO REQUIRES RELEASE</span></div><button type="button" onClick={() => toast.info("Tutorial packet is ready for original video production once narration, captions, destination, and owner release are confirmed.")} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-5 py-3 text-sm font-black text-[#071426]"><Film className="h-4 w-4" />View production gate</button></article></div>
          </div>
        </div>
      </section>

      <section id="provider-discovery" className="container py-8"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">COMPATIBLE PUBLIC AI DISCOVERY</p><h2 className="mt-3 text-4xl font-black">Discover outward. Keep control inward.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">These are outbound public discovery links, not integrations. Each provider remains responsible for its own account, service, data, cost, and terms.</p></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{PROVIDERS.map((provider) => <article key={provider.name} className="flex flex-col rounded-[1.7rem] border border-white/10 bg-white/[.025] p-5"><ExternalLink className="h-5 w-5 text-[#9DEBFF]" /><p className="mt-5 text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">{provider.category.toUpperCase()}</p><h3 className="mt-2 text-xl font-black">{provider.name}</h3><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{provider.note}</p><a className="mt-5 text-sm font-black text-[#9DEBFF]" href={provider.url} target="_blank" rel="noopener noreferrer">Open public site →</a></article>)}</div></section>

      <section className="container py-8"><div className="grid gap-5 lg:grid-cols-[.92fr_1.08fr]"><article className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.055] p-7"><Workflow className="h-8 w-8 text-[#FFDEA0]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FFDEA0]">EVIDENCE-COMPLETION LEDGER</p><h2 className="mt-3 text-3xl font-black">Turn a possibility into a record.</h2><div className="mt-6 space-y-3">{["Original role → purpose, limits, tutorial, route", "Public link → official entry point and no-integration label", "Tutorial video → original script, captions, narration, release", "Provider connection → owner, data flow, terms, test, exact action"].map((line) => <div key={line} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#D6E2EE]">{line}</div>)}</div></article><article className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_96%_6%,rgba(0,212,255,.16),transparent_28%),#071426] p-7"><Link2 className="h-8 w-8 text-[#9DEBFF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#9DEBFF]">BROWSER-LOCAL INTEGRATION BRIEF</p><h2 className="mt-3 text-3xl font-black">Prepare the exact connection first.</h2><label className="mt-5 block text-xs font-mono tracking-[.14em] text-[#AFC0CF]">INTENDED WORKFLOW<input value={integrationFocus} onChange={(event) => setIntegrationFocus(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#071426] px-4 py-3 text-sm text-white outline-none focus:border-[#00D4FF]/70" /></label><pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/25 p-5 font-sans text-sm leading-7 text-[#D6E2EE]">{brief}</pre><button type="button" onClick={copyBrief} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]"><Copy className="h-4 w-4" />Copy integration record</button></article></div></section>
      <section className="container py-8"><div className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.055] p-7"><Sparkles className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">ONE SITE · MANY CLEAR PATHS</p><h2 className="mt-3 text-3xl font-black">Discover, learn, prepare, and choose the next verified action.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">The Constellation Hub connects the original ScrollVerse AI Legion with browser-local tutorials and public AI discovery. It does not imitate another provider, borrow an AI identity, or claim integration where none exists.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/ai-legion-apex" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">AI Legion Apex</Link><Link href="/ai-companion-hub" className="rounded-xl border border-[#B98CFF]/50 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">AI Companion Hub</Link><Link href="/continuation-readiness-register" className="rounded-xl border border-[#FFCC4D]/50 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Release gates</Link></div></div></section>
    </main>
  );
}
