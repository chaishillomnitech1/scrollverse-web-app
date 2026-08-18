import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileLock2, Fingerprint, Landmark, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const RECORD_TYPES = [
  "Original creative work",
  "Name, title, mark, or identity",
  "Technical method or invention concept",
  "Research question or evidence packet",
  "Permission, contributor, or release decision",
] as const;

const CHECKPOINTS = [
  ["Source and version", "What exact file, link, working draft, or source record is being identified?"],
  ["People and permissions", "Who contributed, who is credited, and what permission or scope is recorded?"],
  ["Access and audience", "What transcript, description, language, youth-support, or access context belongs with it?"],
  ["Protection pathway", "Is the next investigation copyright, trademark, patent, trade-secret, license, or an internal record?"],
  ["Actual outcome", "What official filing, agreement, provider result, or correction record exists—if any?"],
] as const;

export default function PreRegistrationReadiness() {
  useSovereignHeartbeat({ page: "pre-registration-readiness" });
  const [recordType, setRecordType] = useState<(typeof RECORD_TYPES)[number]>(RECORD_TYPES[0]);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [context, setContext] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [releaseLane, setReleaseLane] = useState("Research / local preparation");
  const [confirmed, setConfirmed] = useState(false);
  const [record, setRecord] = useState("");

  const readyFields = useMemo(() => [title.trim(), source.trim(), context.trim(), accessibility.trim()].filter(Boolean).length, [title, source, context, accessibility]);

  const createRecord = () => {
    if (!title.trim() || !source.trim()) {
      toast.error("Add a working title and source/version reference before creating a local record.");
      return;
    }
    if (!confirmed) {
      toast.error("Confirm that the entry is a browser-local preparation record, not an external filing or outcome.");
      return;
    }
    setRecord([
      "SCROLLVERSE · PRE-REGISTRATION & EVIDENCE READINESS",
      `Record type: ${recordType}`,
      `Working title / identifier: ${title.trim()}`,
      `Source and version: ${source.trim()}`,
      `Context, people, permissions: ${context.trim() || "To be added"}`,
      `Accessibility and audience notes: ${accessibility.trim() || "To be added"}`,
      `Next lane: ${releaseLane}`,
      "Operating state: browser-local preparation record only.",
      "No filing, registration, charter, bank action, contract, wallet action, or external outcome is created by this record.",
      "Next evidence: identify the accountable owner, review source and rights context, then attach an actual external outcome only after it occurs.",
    ].join("\n"));
    toast.success("Browser-local pre-registration record prepared for review.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-20 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#FFCC4D]/25 bg-[radial-gradient(circle_at_80%_14%,rgba(255,204,77,.17),transparent_27%),radial-gradient(circle_at_12%_70%,rgba(0,212,255,.14),transparent_31%),#050B1A]">
      <div className="container py-16 md:py-24"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/ip-stewardship" className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">← IP STEWARDSHIP</Link><span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFCC4D]">LOCAL PRE-REGISTRATION · EVIDENCE READINESS</span></div><div className="mt-12 grid gap-8 lg:grid-cols-[1.12fr_.88fr]"><div><p className="text-xs font-mono tracking-[.22em] text-[#00D4FF]">SCROLLVERSE PRE-REGISTRATION DESK</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.93] md:text-7xl">Document the work <span className="text-[#FFCC4D]">before the next decision.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A first-party space for organizing a creation, method, name, research question, permission record, or release decision. Bring the source, people, access context, and next review path into one browser-local record that remains available for inspection and correction.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/quantum-research" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#04101F]">Open Quantum Research</Link><Link href="/quantum-frequency-research-lab" className="rounded-xl border border-[#00FF88]/50 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#00FF88]">Open QFS Study Lab</Link><Link href="/open-record-continuum" className="rounded-xl border border-[#D6C4FF]/50 bg-[#D6C4FF]/10 px-5 py-3 text-sm font-black text-[#D6C4FF]">Open Continuum Manifesto</Link></div></div><aside className="rounded-3xl border border-[#FFCC4D]/40 bg-[#071426]/80 p-6"><p className="text-xs font-mono tracking-[.16em] text-[#FFCC4D]">OPERATING STATE</p><div className="mt-5 space-y-4"><State label="Available now" color="#00FF88" text="A browser-local evidence template, working record, and cross-route preparation path." /><State label="Research" color="#00D4FF" text="Protection pathways, standards, and external processes to investigate with the exact work and facts." /><State label="Requires owner release" color="#FFCC4D" text="Any filing, registration, publication, agreement, provider action, funding, token action, or other external outcome." /></div></aside></div></div>
    </section>

    <section className="container py-10"><PortalTrustLens lane="Pre-registration and evidence readiness" source="First-party ScrollVerse evidence workflow, the owner’s stated preparation intent, and the connected IP, governance, and quantum learning routes." readiness="Available now as a browser-local preparation interface. It creates no persistent registry entry or external outcome." boundary="This route is not an official registry, filing office, court, bank, chartering authority, identity provider, or automated executor. A real external record is attached only after an authorized process creates it." /></section>

    <section className="container grid gap-6 pb-10 lg:grid-cols-[1.06fr_.94fr]"><article className="rounded-3xl border border-white/10 bg-white/[.025] p-6 sm:p-8"><div className="flex items-center gap-3"><ClipboardCheck className="h-6 w-6 text-[#00D4FF]" /><div><p className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">BROWSER-LOCAL RECORD BUILDER</p><h2 className="mt-1 text-2xl font-black">Prepare a clear evidence packet.</h2></div></div><div className="mt-7 grid gap-5"><label className="text-xs font-bold tracking-[.12em] text-[#AFC3D8]" htmlFor="pre-registration-type">RECORD TYPE<select id="pre-registration-type" value={recordType} onChange={event => setRecordType(event.target.value as (typeof RECORD_TYPES)[number])} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]">{RECORD_TYPES.map(type => <option key={type}>{type}</option>)}</select></label><label className="text-xs font-bold tracking-[.12em] text-[#AFC3D8]" htmlFor="pre-registration-title">WORKING TITLE OR IDENTIFIER<input id="pre-registration-title" value={title} onChange={event => setTitle(event.target.value)} placeholder="Name the exact work, method, or decision record" className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-4 py-3 text-sm text-white placeholder:text-[#758AA0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" /></label><label className="text-xs font-bold tracking-[.12em] text-[#AFC3D8]" htmlFor="pre-registration-source">SOURCE AND VERSION REFERENCE<input id="pre-registration-source" value={source} onChange={event => setSource(event.target.value)} placeholder="File name, source link, version label, or local record reference" className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-4 py-3 text-sm text-white placeholder:text-[#758AA0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" /></label><label className="text-xs font-bold tracking-[.12em] text-[#AFC3D8]" htmlFor="pre-registration-context">PEOPLE, PERMISSIONS, AND INTENDED USE<textarea id="pre-registration-context" value={context} onChange={event => setContext(event.target.value)} rows={4} placeholder="Record contributor context, permission status, intended use, or questions needing review." className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] p-4 text-sm leading-6 text-white placeholder:text-[#758AA0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" /></label><label className="text-xs font-bold tracking-[.12em] text-[#AFC3D8]" htmlFor="pre-registration-access">ACCESSIBILITY AND AUDIENCE CONTEXT<textarea id="pre-registration-access" value={accessibility} onChange={event => setAccessibility(event.target.value)} rows={3} placeholder="Describe transcript, alt text, caption, language, youth-support, or correction needs." className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] p-4 text-sm leading-6 text-white placeholder:text-[#758AA0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]" /></label><label className="text-xs font-bold tracking-[.12em] text-[#AFC3D8]" htmlFor="pre-registration-lane">NEXT REVIEW LANE<select id="pre-registration-lane" value={releaseLane} onChange={event => setReleaseLane(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]"><option>Research / local preparation</option><option>IP stewardship review</option><option>Assistive governance review</option><option>Creator release readiness</option><option>Requires owner release</option></select></label><label className="flex items-start gap-3 rounded-2xl border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.045] p-4 text-sm leading-6 text-[#E8D8A5]"><input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I understand that this prepares a browser-local record only. It does not submit, file, register, notarize, license, fund, sell, publish, or create any external result.</label><button type="button" onClick={createRecord} className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#07101F] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Create browser-local record <ArrowRight className="ml-1 inline h-4 w-4" /></button></div></article>

      <aside className="space-y-6"><article className="rounded-3xl border border-[#B98CFF]/35 bg-[#B98CFF]/[.055] p-6"><div className="flex items-center gap-3"><Fingerprint className="h-6 w-6 text-[#D6C4FF]" /><div><p className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">PACKET COMPLETENESS</p><h2 className="mt-1 text-2xl font-black">{readyFields} / 4 core fields present</h2></div></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-black/25"><div className="h-full rounded-full bg-[#B98CFF] transition-all" style={{ width: `${readyFields * 25}%` }} /></div><div className="mt-6 space-y-4">{CHECKPOINTS.map(([titleText, detail], index) => <div key={titleText} className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B98CFF]/50 text-[11px] font-black text-[#D6C4FF]">0{index + 1}</span><div><h3 className="font-black text-white">{titleText}</h3><p className="mt-1 text-sm leading-6 text-[#D6E2EE]">{detail}</p></div></div>)}</div></article>{record ? <article className="rounded-3xl border border-[#00FF88]/40 bg-[#00FF88]/[.05] p-6"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#00FF88]"><CheckCircle2 className="h-4 w-4" />LOCAL RECORD READY</div><pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-6 text-[#D9F6E3]" aria-live="polite">{record}</pre></article> : <article className="rounded-3xl border border-[#00FF88]/35 bg-[#00FF88]/[.045] p-6"><FileLock2 className="h-6 w-6 text-[#00FF88]" /><h2 className="mt-4 text-2xl font-black">The record appears here.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Add the exact work, its source/version, and its context. The output remains in this browser view for review and can be corrected before any owner-controlled next step.</p></article>}</aside>
    </section>

    <section className="container pb-10"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><RouteCard href="/quantum-research" icon={<ShieldCheck className="h-5 w-5" />} color="#00D4FF" label="Quantum Research" text="Connect post-quantum preparation and evidence layers to actual system inventory and standards study." /><RouteCard href="/quantum-frequency-research-lab" icon={<Fingerprint className="h-5 w-5" />} color="#00FF88" label="QFS Study Lab" text="Keep empirical research and first-party perspective in separate, inspectable tracks." /><RouteCard href="/ip-stewardship" icon={<FileLock2 className="h-5 w-5" />} color="#B98CFF" label="IP Stewardship" text="Move from an evidence packet toward the appropriate rights, licensing, or filing-readiness path." /><RouteCard href="/assistive-governance" icon={<Landmark className="h-5 w-5" />} color="#FFCC4D" label="Assistive Governance" text="Record accountable roles, decision scope, correction paths, and any actual outcome." /></div></section>
  </main>;
}

function State({ label, color, text }: { label: string; color: string; text: string }) { return <div className="rounded-2xl border border-white/10 bg-black/15 p-4"><p className="text-sm font-black" style={{ color }}>{label}</p><p className="mt-1 text-sm leading-6 text-[#D6E2EE]">{text}</p></div>; }

function RouteCard({ href, icon, color, label, text }: { href: string; icon: React.ReactNode; color: string; label: string; text: string }) { return <Link href={href} className="rounded-3xl border bg-white/[.025] p-5 transition hover:-translate-y-0.5" style={{ borderColor: `${color}55` }}><div style={{ color }}>{icon}</div><h2 className="mt-4 text-xl font-black text-white">{label}</h2><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{text}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-black" style={{ color }}>Open route <ArrowRight className="h-4 w-4" /></span></Link>; }
