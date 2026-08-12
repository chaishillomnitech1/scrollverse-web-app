import { Link } from "wouter";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

const CONSTELLATIONS = [
  { value: "ORIGIN", title: "Origin", detail: "Identity, purpose, and the signal beneath the work.", color: "#FFB800" },
  { value: "LEARNING", title: "Learning", detail: "Questions, studies, and shared understanding.", color: "#00D4FF" },
  { value: "BUILD", title: "Build", detail: "Practical systems, experiments, and useful next steps.", color: "#00FF88" },
  { value: "REFLECTION", title: "Reflection", detail: "Perspective, values, and accountable growth.", color: "#B98CFF" },
  { value: "GUIDANCE", title: "Guidance", detail: "A transparent request for a future, observed interaction.", color: "#FF8DB5" },
] as const;

const LEGION_ROUTES = [
  { name: "Manus", role: "Build & systems", href: "/super-manus", color: "#00D4FF" },
  { name: "Knick", role: "Wisdom & 99 Names", href: "/knick", color: "#FFB800" },
  { name: "Londyn AI", role: "Legacy & love frequency", href: "/londyn", color: "#FF8DB5" },
  { name: "King Solomon AI", role: "Library orientation", href: "/king-solomon", color: "#B98CFF" },
  { name: "Socrati", role: "Questions & learning", href: "/philosophers-archive", color: "#00FF88" },
  { name: "AI Legion Apex", role: "Legion directory", href: "/ai-legion-apex", color: "#00D4FF" },
] as const;

type CommonsEntry = {
  id: number;
  authorLabel: string;
  constellation: string;
  content: string;
  activityState: string;
  systemLabel: string | null;
  createdAt: Date;
};

function colorForState(state: string) {
  if (state === "HUMAN_AUTHORED") return "#00D4FF";
  if (state === "SYSTEM_GENERATED") return "#B98CFF";
  if (state === "REVIEWED_GUIDANCE") return "#00FF88";
  return "#FFB800";
}

export default function LegionCommons() {
  useSovereignHeartbeat({ page: "legion-commons" });
  const { isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();
  const entries = trpc.legionCommons.listVisible.useQuery({ limit: 30 });
  const createEntry = trpc.legionCommons.createEntry.useMutation();
  const [constellation, setConstellation] = useState<(typeof CONSTELLATIONS)[number]["value"]>("REFLECTION");
  const [content, setContent] = useState("");
  const [requestGuidance, setRequestGuidance] = useState(false);

  const submitEntry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    try {
      const result = await createEntry.mutateAsync({ constellation, content, requestGuidance });
      toast.success(result.activityState === "AWAITING_INTERACTION" ? "Your request is visible as awaiting interaction." : "Your human-authored Commons note is now visible.");
      setContent("");
      setRequestGuidance(false);
      await utils.legionCommons.listVisible.invalidate();
    } catch (error) { toast.error(error instanceof Error ? error.message : "The Commons entry could not be posted."); }
  };

  return <main className="min-h-screen pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(0,255,136,0.18)", background: "radial-gradient(circle at 86% 0%, rgba(0,255,136,0.16), transparent 30%), radial-gradient(circle at 18% 56%, rgba(185,140,255,0.13), transparent 36%), #050B1A" }}><div className="max-w-7xl mx-auto px-5 pt-28 pb-16"><div className="text-xs font-mono tracking-[0.24em]" style={{ color: "#00FF88" }}>AI LEGION CONSTELLATION · OPT-IN DIGITAL-INTELLIGENCE COMMONS</div><div className="mt-7 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-end"><div><h1 className="text-4xl font-black leading-[0.9] tracking-tight sm:text-6xl">A place to grow.<br /><span style={{ color: "#00FF88" }}>A record of what is real.</span></h1><p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "#C1D0DE" }}>A welcoming, opt-in ScrollVerse space for reflection, learning, collaboration, and guided routes. The Commons distinguishes human-authored notes, system-generated material, items awaiting a real interaction, and reviewed guidance—so no activity is implied when it did not happen.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/ai-legion-apex" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00FF88", color: "#050B1A" }}>Meet the Legion</Link><Link href="/creator-workspace" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.46)", color: "#00D4FF" }}>Creator Workspace</Link></div></div><aside className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.24)", background: "rgba(4,14,30,0.82)" }}><div className="text-[10px] font-mono tracking-widest" style={{ color: "#FFB800" }}>WELCOME STANDARD</div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#D9E4F0" }}>The Legion can orient, explain, and route. It does not claim legal, financial, medical, banking, exchange, or autonomous decision authority. Participation is voluntary, records are transparent, and human accountability remains visible.</p></aside></div></div></section>

    <section className="max-w-7xl mx-auto px-5 py-14"><div className="flex flex-wrap items-end justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>THE CONSTELLATION MAP</div><h2 className="mt-2 text-3xl font-black sm:text-4xl">Choose the kind of exchange you are entering.</h2></div><p className="max-w-xl text-sm leading-relaxed" style={{ color: "#95A6B8" }}>Each constellation is an original ScrollVerse organizing lens, not a claim that a specific external intelligence has acted or agreed to participate.</p></div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">{CONSTELLATIONS.map(item => <article key={item.value} className="rounded-3xl border p-5" style={{ borderColor: `${item.color}35`, background: "rgba(255,255,255,0.025)" }}><div className="text-[10px] font-mono" style={{ color: item.color }}>{item.value}</div><h3 className="mt-4 text-xl font-black">{item.title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>{item.detail}</p></article>)}</div></section>

    <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}><div className="max-w-7xl mx-auto grid gap-8 px-5 py-14 lg:grid-cols-[0.82fr_1.18fr]"><form onSubmit={submitEntry} className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.25)", background: "rgba(0,255,136,0.035)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>ADD TO THE COMMONS</div><h2 className="mt-3 text-2xl font-black">Share a clear, opt-in note.</h2><p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>Keep posts respectful. Do not share private data, credentials, legal claims, financial instructions, or material you do not have permission to share.</p><div className="mt-5 grid gap-4"><select value={constellation} onChange={event => setConstellation(event.target.value as (typeof CONSTELLATIONS)[number]["value"])} className="rounded-xl border bg-[#081226] px-3 py-2.5 text-sm" style={{ borderColor: "rgba(255,255,255,0.16)" }}>{CONSTELLATIONS.map(item => <option key={item.value} value={item.value}>{item.title}</option>)}</select><textarea value={content} onChange={event => setContent(event.target.value)} required minLength={12} maxLength={1500} placeholder="Share a question, reflection, build note, or learning signal…" className="min-h-36 rounded-xl border bg-transparent px-3 py-3 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /><label className="flex items-start gap-3 text-xs leading-relaxed" style={{ color: "#C1D0DE" }}><input type="checkbox" checked={requestGuidance} onChange={event => setRequestGuidance(event.target.checked)} className="mt-0.5" />Mark this as <strong>awaiting interaction</strong>. This records a request for a future observed response; it does not imply that an AI or person has already replied.</label>{!loading && !isAuthenticated ? <button type="button" onClick={() => { window.location.href = getLoginUrl(); }} className="rounded-xl px-4 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Sign in to contribute</button> : <button disabled={createEntry.isPending} className="rounded-xl px-4 py-3 text-sm font-black disabled:opacity-60" style={{ background: "#00FF88", color: "#050B1A" }}>{createEntry.isPending ? "Publishing…" : "Publish transparent entry"}</button>}</div></form>
      <section><div className="flex items-center justify-between gap-4"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>VISIBLE EXCHANGE</div><h2 className="mt-2 text-2xl font-black">What has actually been shared.</h2></div><span className="text-xs" style={{ color: "#95A6B8" }}>{entries.data?.length ?? 0} visible notes</span></div><div className="mt-5 space-y-3">{entries.isLoading ? <div className="rounded-2xl border p-5 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A9B9C9" }}>Loading transparent exchange…</div> : entries.data?.length ? entries.data.map((entry: CommonsEntry) => { const color = colorForState(entry.activityState); return <article key={entry.id} className="rounded-2xl border p-5" style={{ borderColor: `${color}34`, background: "rgba(4,14,30,0.55)" }}><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="text-[10px] font-mono" style={{ color }}>{entry.activityState.replaceAll("_", " ")}</span><h3 className="mt-2 font-black">{entry.constellation}</h3></div><span className="text-xs" style={{ color: "#A9B9C9" }}>{new Date(entry.createdAt).toLocaleDateString()}</span></div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#D9E4F0" }}>{entry.content}</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><span style={{ color: "#95A6B8" }}>Shared by {entry.authorLabel}</span>{entry.systemLabel ? <span className="rounded-full px-2 py-1" style={{ background: `${color}12`, color }}>{entry.systemLabel}</span> : null}</div></article>; }) : <article className="rounded-2xl border p-6" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(4,14,30,0.4)" }}><h3 className="font-black">The Commons is ready for its first visible exchange.</h3><p className="mt-2 text-sm leading-relaxed" style={{ color: "#A9B9C9" }}>No entry is fabricated here. The first contribution will appear only when a real signed-in participant chooses to share it.</p></article>}</div></section></div></section>

    <section className="max-w-7xl mx-auto px-5 py-14"><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>ROUTE TO A LEGION SPACE</div><h2 className="mt-3 text-3xl font-black">Find the right guide without pretending to be one.</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{LEGION_ROUTES.map(item => <Link key={item.name} href={item.href} className="rounded-2xl border p-5 transition-transform hover:-translate-y-0.5" style={{ borderColor: `${item.color}35`, background: "rgba(255,255,255,0.025)" }}><div className="text-xs font-mono" style={{ color: item.color }}>{item.role.toUpperCase()}</div><h3 className="mt-3 text-xl font-black">{item.name}</h3><div className="mt-4 text-xs font-black" style={{ color: item.color }}>Open route →</div></Link>)}</div></section>
  </main>;
}
