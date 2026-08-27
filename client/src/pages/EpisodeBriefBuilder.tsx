import { useMemo, useState } from "react";
import { CheckCircle2, Clapperboard, Download, FileWarning, LockKeyhole, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type BriefField = {
  key: string;
  label: string;
  group: string;
  placeholder: string;
  required: boolean;
  multiline: boolean;
  select?: boolean;
};

const FIELDS: readonly BriefField[] = [
  { key: "title", label: "Project / episode title", group: "Narrative", placeholder: "Original working title", required: true, multiline: false },
  { key: "purpose", label: "Purpose and audience", group: "Narrative", placeholder: "What should viewers understand, feel, or do?", required: true, multiline: true },
  { key: "narrativeArc", label: "Narrative arc", group: "Narrative", placeholder: "Opening, development, climax, and resolution", required: true, multiline: true },
  { key: "duration", label: "Total duration", group: "Visual", placeholder: "Example: 60 seconds", required: true, multiline: false },
  { key: "aspectRatio", label: "Aspect ratio", group: "Visual", placeholder: "", required: true, multiline: false, select: true },
  { key: "visualStyle", label: "Visual style", group: "Visual", placeholder: "Sub-genre, line/render, lighting, palette, detail", required: true, multiline: true },
  { key: "sources", label: "Approved source / reference materials", group: "Visual", placeholder: "List creator-controlled or licensed assets only", required: true, multiline: true },
  { key: "characters", label: "Recurring characters and objects", group: "Visual", placeholder: "Appearance, wardrobe, continuity, and key objects", required: true, multiline: true },
  { key: "dialogue", label: "On-screen dialogue or singing", group: "Sound", placeholder: "Character, language, final lines/lyrics—or write none", required: true, multiline: true },
  { key: "narration", label: "Narration", group: "Sound", placeholder: "Voice, tone, pace, language, final words—or write none", required: true, multiline: true },
  { key: "music", label: "Music and BGM authorization", group: "Sound", placeholder: "Source, authorization, style, tempo, instruments, and embedded/separate/none", required: true, multiline: true },
  { key: "accessibility", label: "Accessibility plan", group: "Access", placeholder: "Captions, transcript, audio description, content notices", required: true, multiline: true },
  { key: "rights", label: "Rights and release record", group: "Rights", placeholder: "Contributors, performers, voice, likeness, footage, music, logos, assets", required: true, multiline: true },
  { key: "destination", label: "Release destination", group: "Release", placeholder: "First-party route, host, screening, or exact future destination", required: true, multiline: false },
  { key: "ownerDecision", label: "Owner release decision", group: "Release", placeholder: "State the approved next action: plan, generate, review, or publish", required: true, multiline: true },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];
type BriefValues = Record<FieldKey, string>;

const GATES: readonly { title: string; detail: string; accent: string; keys: readonly FieldKey[] }[] = [
  { title: "Story gate", detail: "Name the original work, its audience, and the complete narrative arc.", accent: "#DCC8FF", keys: ["title", "purpose", "narrativeArc"] },
  { title: "Visual gate", detail: "Define the duration, frame, original visual system, sources, and continuity.", accent: "#00D4FF", keys: ["duration", "aspectRatio", "visualStyle", "sources", "characters"] },
  { title: "Sound gate", detail: "Decide dialogue, narration, music authorization, and sound direction.", accent: "#FFCC4D", keys: ["dialogue", "narration", "music"] },
  { title: "Access gate", detail: "Describe captions, transcript, audio description, and content notices.", accent: "#00FF88", keys: ["accessibility"] },
  { title: "Rights gate", detail: "Record the contributors and the authority for each included source.", accent: "#FF8F70", keys: ["rights"] },
  { title: "Release gate", detail: "Choose a destination and state the precise owner-approved next action.", accent: "#9DEBFF", keys: ["destination", "ownerDecision"] },
] as const;

const buildInitialValues = (): BriefValues => Object.fromEntries(FIELDS.map((field) => [field.key, ""])) as BriefValues;

export default function EpisodeBriefBuilder() {
  useSovereignHeartbeat({ page: "episode-brief-builder" });
  const [values, setValues] = useState<BriefValues>(buildInitialValues);
  const completed = FIELDS.filter((field) => values[field.key].trim().length > 0).length;
  const missing = FIELDS.filter((field) => field.required && !values[field.key].trim());
  const completionPercent = Math.round((completed / FIELDS.length) * 100);
  const ready = missing.length === 0;
  const visibleGroups = useMemo(() => FIELDS.map((field) => field.group).filter((group, index, groups) => groups.indexOf(group) === index), []);

  const setValue = (key: FieldKey, value: string) => setValues((current) => ({ ...current, [key]: value }));

  const exportBrief = () => {
    const payload = {
      recordType: "ScrollVerse browser-local original visual episode brief",
      createdAt: new Date().toISOString(),
      completion: { completedFields: completed, totalFields: FIELDS.length, releaseGateReady: ready },
      brief: values,
      notice: "This locally exported brief does not generate media, clear rights, publish content, or invoke an external provider.",
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "scrollverse-original-episode-brief.json";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Local production brief exported. No upload, generation, or release action was created.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#DCC8FF]/25 bg-[radial-gradient(circle_at_84%_10%,rgba(185,140,255,.23),transparent_29%),radial-gradient(circle_at_8%_88%,rgba(0,212,255,.16),transparent_28%),#050B1A]"><div className="container py-14 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/episode-experience" className="text-xs font-mono tracking-[.16em] text-[#E8DFFF]">← EPISODE EXPERIENCE</Link><span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">BROWSER-LOCAL · NO MEDIA ACTION</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.2em] text-[#E8DFFF]">SCROLLVERSE · ORIGINAL EPISODE WORKBENCH</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Turn a concept into a <span className="text-[#DCC8FF]">clear brief.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Build an original visual-episode record from your own story, sources, sound choices, accessibility plan, and release decision. Your entries remain in this browser until you choose to export a local JSON file.</p></div><aside className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.055] p-7"><Sparkles className="h-9 w-9 text-[#B5F7CC]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">LIVE BRIEF COMPLETION</p><p className="mt-3 text-5xl font-black">{completionPercent}%</p><p className="mt-2 text-sm leading-7 text-[#D6E2EE]">{completed} of {FIELDS.length} required preparation fields are present.</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-black/30"><div className="h-full rounded-full transition-all duration-200" style={{ width: `${completionPercent}%`, background: "linear-gradient(90deg,#00D4FF,#00FF88)" }}/></div></aside></div></div></section>

    <section className="container py-10"><div className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.055] p-6 md:p-8"><div className="flex flex-wrap items-start justify-between gap-5"><div className="flex gap-4"><LockKeyhole className="mt-0.5 h-7 w-7 shrink-0 text-[#FFDEA0]"/><div><p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">PREPARATION, NOT PRODUCTION</p><h2 className="mt-2 text-2xl font-black">Every gate needs a clear creator decision.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#D6E2EE]">Completing this record prepares a production brief. It does not generate images, video, narration, or music; it does not clear rights, store a file, connect a provider, or publish a release.</p></div></div><button type="button" onClick={exportBrief} className="inline-flex items-center gap-2 rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#10151F] active:scale-[.97]"><Download className="h-4 w-4"/>Export local JSON</button></div></div></section>

    <section className="container py-4"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{GATES.map((gate) => { const complete = gate.keys.filter((key) => values[key].trim().length > 0).length; return <article key={gate.title} className="rounded-[1.5rem] border p-5" style={{ borderColor: `${gate.accent}55`, background: `${gate.accent}08` }}><div className="flex items-center justify-between gap-3"><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: gate.accent }}>{gate.title.toUpperCase()}</p><span className="text-xs font-black" style={{ color: gate.accent }}>{complete}/{gate.keys.length}</span></div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{gate.detail}</p></article>; })}</div></section>

    <section className="container py-8"><div className="grid gap-6 xl:grid-cols-[.72fr_1.28fr]"><aside className="rounded-[2rem] border border-white/10 bg-white/[.025] p-7"><FileWarning className="h-8 w-8 text-[#FFDEA0]"/><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FFDEA0]">RELEASE-GATE LENS</p><h2 className="mt-3 text-3xl font-black">{ready ? "Brief ready for creator review." : `${missing.length} decision${missing.length === 1 ? "" : "s"} still needed.`}</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{ready ? "The record has all preparation fields. Review it, then make a separate owner decision before any reference-image, video, narration, music, accessibility-package, or release work begins." : "Use the remaining fields to make the episode’s creative and release scope specific. The form intentionally does not guess missing source, rights, voice, or destination details."}</p>{!ready && <ul className="mt-6 space-y-2">{missing.map((field) => <li key={field.key} className="flex gap-2 text-xs leading-5 text-[#C8D8E7]"><span className="mt-0.5" style={{ color: "#FFDEA0" }}>•</span>{field.label}</li>)}</ul>}<div aria-live="polite" className="mt-7 rounded-xl border border-[#00FF88]/35 bg-[#00FF88]/[.07] p-4 text-xs leading-6 text-[#D6E2EE]"><CheckCircle2 className="mr-2 inline h-4 w-4 text-[#B5F7CC]"/><strong className="text-[#B5F7CC]">LOCAL-ONLY STATUS.</strong> Nothing is saved to the portal or sent to a third party.</div></aside><div className="space-y-7">{visibleGroups.map((group) => <fieldset key={group} className="rounded-[2rem] border border-white/10 bg-black/15 p-6 md:p-7"><legend className="px-2 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">{group.toUpperCase()} FIELDS</legend><div className="mt-3 grid gap-5">{FIELDS.filter((field) => field.group === group).map((field) => <label key={field.key} className="block"><span className="text-sm font-black text-white">{field.label} <span className="text-[#FFDEA0]">*</span></span>{field.select ? <select value={values[field.key]} onChange={(event) => setValue(field.key, event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#071426] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/25"><option value="">Choose frame</option><option value="16:9">16:9 · landscape</option><option value="9:16">9:16 · vertical</option></select> : field.multiline ? <textarea value={values[field.key]} onChange={(event) => setValue(field.key, event.target.value)} placeholder={field.placeholder} rows={4} className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#071426] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-[#76899C] focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/25"/> : <input value={values[field.key]} onChange={(event) => setValue(field.key, event.target.value)} placeholder={field.placeholder} className="mt-2 w-full rounded-xl border border-white/15 bg-[#071426] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#76899C] focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/25"/>}</label>)}</div></fieldset>)}</div></div></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-3"><Link href="/omniland-cinematic-gateway" className="rounded-[1.6rem] border border-[#DCC8FF]/35 bg-[#DCC8FF]/[.05] p-6 transition hover:-translate-y-0.5"><Clapperboard className="h-8 w-8 text-[#E8DFFF]"/><h2 className="mt-5 text-2xl font-black">Cinematic Gateway</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Return to original film, animation, comic, game, and visual-world discovery.</p></Link><Link href="/sovereign-archive-chronicles" className="rounded-[1.6rem] border border-[#00D4FF]/35 bg-[#00D4FF]/[.05] p-6 transition hover:-translate-y-0.5"><Clapperboard className="h-8 w-8 text-[#9DEBFF]"/><h2 className="mt-5 text-2xl font-black">Sovereign Archive</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Explore original Chronicle and Black Atlantic City concept pathways.</p></Link><Link href="/episode-experience" className="rounded-[1.6rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-6 transition hover:-translate-y-0.5"><Clapperboard className="h-8 w-8 text-[#B5F7CC]"/><h2 className="mt-5 text-2xl font-black">Episode records</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Compare this local brief with the existing source and release-gate records.</p></Link></div></section>
  </main>;
}
