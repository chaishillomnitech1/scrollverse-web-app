import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Bookmark, Heart, MessageCircle, PenLine, Search, ShieldCheck, Sparkles, Users } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

const THEMES = ["all", "reflection", "awakening", "creativity", "healing", "community", "quantum", "spirituality", "purpose"];

type ExperienceEntry = {
  id: number;
  displayName: string;
  title: string;
  content: string;
  themes: string;
  createdAt: Date;
  allowReplies: boolean;
};

type ExperienceReply = {
  id: number;
  displayName: string;
  content: string;
};

export default function ChosenOnesExperienceExchange() {
  useSovereignHeartbeat({ page: "chosen-ones-exchange" });
  const { user, isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("all");
  const [composerOpen, setComposerOpen] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [themes, setThemes] = useState("reflection");
  const [displayName, setDisplayName] = useState(user?.name ?? "");
  const [allowReplies, setAllowReplies] = useState(true);
  const utils = trpc.useUtils();
  const feed = trpc.experienceExchange.listPublic.useQuery({ query, theme });
  const stats = trpc.experienceExchange.getParticipantStats.useQuery();
  const createEntry = trpc.experienceExchange.createEntry.useMutation({ onSuccess: () => { utils.experienceExchange.listPublic.invalidate(); setTitle(""); setContent(""); setComposerOpen(false); toast.success("Your reflection is now part of the exchange."); } });
  const profile = trpc.experienceExchange.getProfile.useQuery(undefined, { enabled: isAuthenticated });
  const saveProfile = trpc.experienceExchange.saveProfile.useMutation({ onSuccess: () => toast.success("Participation settings saved.") });
  const activeEntries = useMemo<ExperienceEntry[]>(() => (feed.data ?? []) as ExperienceEntry[], [feed.data]);

  const share = () => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    const selectedThemes = themes.split(",").map(item => item.trim().toLowerCase()).filter(Boolean).slice(0, 6);
    if (!displayName || !title || !content || selectedThemes.length === 0) { toast.error("Add a display name, title, reflection, and at least one theme."); return; }
    createEntry.mutate({ title, content, themes: selectedThemes, displayName, visibility: "PUBLIC", allowReplies });
  };

  return <main className="min-h-screen bg-[#050B1A] text-white selection:bg-[#00D4FF]/25">
    <section className="relative overflow-hidden border-b border-cyan-300/15 bg-[radial-gradient(circle_at_16%_0%,rgba(185,140,255,.23),transparent_32%),radial-gradient(circle_at_86%_12%,rgba(0,212,255,.17),transparent_28%)]">
      <div className="container py-16 md:py-24">
        <Link href="/synchronization-research" className="text-xs font-bold tracking-[.18em] text-[#00D4FF] hover:text-white">SOURCE INDEX / COMMUNITY EXCHANGE</Link>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div><p className="font-mono text-xs tracking-[.24em] text-[#FFB800]">CHOSEN ONES EXPERIENCE EXCHANGE</p><h1 className="mt-3 max-w-4xl text-4xl font-black leading-[.98] md:text-7xl">A calm place for first-person stories, reflection, and connection.</h1><p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">Share what happened in your own words. Read public reflections, find themes that resonate, and participate at the pace you choose.</p></div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-6 backdrop-blur"><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/5 p-4"><Users className="h-5 w-5 text-[#00FF88]"/><p className="mt-4 text-2xl font-black">{stats.data?.entries ?? 0}</p><p className="text-xs text-slate-400">public reflections</p></div><div className="rounded-2xl bg-white/5 p-4"><MessageCircle className="h-5 w-5 text-[#B98CFF]"/><p className="mt-4 text-2xl font-black">{stats.data?.replies ?? 0}</p><p className="text-xs text-slate-400">participant replies</p></div></div><p className="mt-4 text-xs leading-5 text-slate-400">Participant-controlled profiles, author-selected names, and visible reply choices.</p></div>
        </div>
      </div>
    </section>
    <section className="container py-10">
      <PortalTrustLens lane="Community exchange" source="Participant first-person entries and public research routes" readiness="Available now" boundary="Accounts are personal reflections; the exchange preserves authorship and source context without assigning a required conclusion." />
      <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[.03] p-4 md:flex-row md:items-center"><label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-[#050B1A] px-4 py-3 ring-1 ring-white/10"><Search className="h-5 w-5 text-[#00D4FF]"/><input aria-label="Search first-person reflections" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a theme, word, or reflection" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" /></label><div className="flex flex-wrap gap-2" aria-label="Filter reflections by theme">{THEMES.map(item => <button key={item} onClick={() => setTheme(item)} aria-pressed={theme === item} className={`rounded-full px-3 py-2 text-xs font-bold capitalize ${theme === item ? "bg-[#00D4FF] text-[#050B1A]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{item}</button>)}</div></div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-2xl font-black">Public exchange</h2><p className="mt-1 text-sm text-slate-400">Read what participants chose to share. Open discussion is available only when an author enables it.</p></div><button onClick={() => isAuthenticated ? setComposerOpen(!composerOpen) : window.location.assign(getLoginUrl())} className="inline-flex items-center gap-2 rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-black text-[#050B1A] hover:bg-[#ffd25a]"><PenLine className="h-4 w-4"/>Share your experience</button></div>
      {composerOpen && <div className="mt-6 rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[.06] p-6"><div className="flex items-start gap-3"><Sparkles className="mt-1 h-5 w-5 text-[#FFB800]"/><div><h3 className="font-black">Your contribution, your words</h3><p className="mt-1 text-sm text-slate-300">Choose the name you want shown. You can edit your participation settings after sign-in.</p></div></div><div className="mt-5 grid gap-3 md:grid-cols-2"><input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Display name or pseudonym" className="rounded-xl bg-[#050B1A] px-4 py-3 text-sm ring-1 ring-white/10 outline-none focus:ring-[#00D4FF]"/><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Reflection title" className="rounded-xl bg-[#050B1A] px-4 py-3 text-sm ring-1 ring-white/10 outline-none focus:ring-[#00D4FF]"/></div><textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share a first-person experience in your own words…" className="mt-3 min-h-40 w-full rounded-xl bg-[#050B1A] p-4 text-sm ring-1 ring-white/10 outline-none focus:ring-[#00D4FF]"/><div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><input value={themes} onChange={e => setThemes(e.target.value)} placeholder="Themes, separated by commas" className="rounded-xl bg-[#050B1A] px-4 py-3 text-sm ring-1 ring-white/10 outline-none focus:ring-[#00D4FF]"/><label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={allowReplies} onChange={e => setAllowReplies(e.target.checked)} /> Allow respectful replies</label><button onClick={share} disabled={createEntry.isPending} className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#050B1A] disabled:opacity-60">{createEntry.isPending ? "Sharing…" : "Publish reflection"}</button></div></div>}
      <div className="mt-7 grid gap-4">{feed.isLoading ? <div className="rounded-2xl border border-white/10 p-6 text-slate-400">Loading the public exchange…</div> : activeEntries.length === 0 ? <div className="rounded-3xl border border-dashed border-white/15 bg-white/[.02] p-10 text-center"><ShieldCheck className="mx-auto h-8 w-8 text-[#00FF88]"/><h3 className="mt-4 text-xl font-black">The exchange begins with a willing voice.</h3><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">There are no public reflections matching this view yet. When a participant shares, their author-selected name and contribution choices guide how it appears here.</p></div> : activeEntries.map(entry => <ExperienceCard key={entry.id} entry={entry} isAuthenticated={isAuthenticated} expanded={expandedEntry === entry.id} onToggle={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)} />)}</div>
      {isAuthenticated && <section className="mt-10 rounded-3xl border border-white/10 bg-white/[.03] p-6"><h3 className="font-black">Participation settings</h3><p className="mt-1 text-sm text-slate-400">Choose the name and visibility you want to use when you contribute.</p><div className="mt-4 grid gap-3 md:grid-cols-3"><input value={profile.data?.displayName ?? displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Display name" className="rounded-xl bg-[#050B1A] px-4 py-3 text-sm ring-1 ring-white/10 outline-none"/><select defaultValue={profile.data?.profileVisibility ?? "PSEUDONYMOUS"} id="profile-visibility" className="rounded-xl bg-[#050B1A] px-4 py-3 text-sm ring-1 ring-white/10"><option value="PSEUDONYMOUS">Pseudonymous</option><option value="PUBLIC">Public</option><option value="COMMUNITY">Community</option></select><button onClick={() => saveProfile.mutate({ displayName: displayName || user?.name || "Participant", profileVisibility: (document.getElementById("profile-visibility") as HTMLSelectElement)?.value as "PUBLIC" | "PSEUDONYMOUS" | "COMMUNITY", allowReplies: true })} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15">Save participation settings</button></div></section>}
    </section>
  </main>;
}

function ExperienceCard({ entry, isAuthenticated, expanded, onToggle }: { entry: ExperienceEntry; isAuthenticated: boolean; expanded: boolean; onToggle: () => void }) {
  const { user } = useAuth();
  const utils = trpc.useUtils();
  const replies = trpc.experienceExchange.getReplies.useQuery({ entryId: entry.id }, { enabled: expanded });
  const react = trpc.experienceExchange.toggleReaction.useMutation({ onSuccess: result => toast.success(result.active ? "Reflection acknowledged." : "Acknowledgement removed.") });
  const save = trpc.experienceExchange.toggleSave.useMutation({ onSuccess: result => toast.success(result.saved ? "Saved to your reflections." : "Removed from saved reflections.") });
  const createReply = trpc.experienceExchange.createReply.useMutation({ onSuccess: () => { utils.experienceExchange.getReplies.invalidate({ entryId: entry.id }); toast.success("Your reply is now part of the conversation."); setReplyContent(""); } });
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState(user?.name ?? "Participant");
  const reactTo = (reaction: "REFLECT" | "SUPPORT" | "CONNECT") => isAuthenticated ? react.mutate({ entryId: entry.id, reaction }) : window.location.assign(getLoginUrl());
  const replyEntries = (replies.data ?? []) as ExperienceReply[];
  const submitReply = () => {
    if (!isAuthenticated) { window.location.assign(getLoginUrl()); return; }
    if (!replyName.trim() || !replyContent.trim()) { toast.error("Add a display name and reply before sharing."); return; }
    createReply.mutate({ entryId: entry.id, displayName: replyName.trim(), content: replyContent.trim() });
  };
  return <article className="rounded-3xl border border-white/10 bg-white/[.025] p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-[.18em] text-[#00D4FF]">{entry.displayName}</p><h3 className="mt-2 text-2xl font-black">{entry.title}</h3><div className="mt-3 flex flex-wrap gap-2">{entry.themes.split(",").map(theme => <span key={theme} className="rounded-full bg-[#B98CFF]/10 px-2.5 py-1 text-xs text-[#d8c6ff]">{theme.trim()}</span>)}</div></div><p className="text-xs text-slate-500">{new Date(entry.createdAt).toLocaleDateString()}</p></div><p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-200">{entry.content}</p><div className="mt-6 flex flex-wrap gap-2"><button onClick={() => reactTo("REFLECT")} className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10"><Heart className="h-4 w-4 text-[#FF6B9A]"/>Reflect</button><button onClick={() => reactTo("SUPPORT")} className="rounded-xl bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10">Support</button><button onClick={() => reactTo("CONNECT")} className="rounded-xl bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10">Connect</button><button onClick={() => isAuthenticated ? save.mutate({ entryId: entry.id }) : window.location.assign(getLoginUrl())} className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-bold hover:bg-white/10"><Bookmark className="h-4 w-4"/>Save</button>{entry.allowReplies && <button onClick={onToggle} className="inline-flex items-center gap-2 rounded-xl bg-[#00D4FF]/10 px-3 py-2 text-xs font-bold text-[#00D4FF] hover:bg-[#00D4FF]/15"><MessageCircle className="h-4 w-4"/>{expanded ? "Close replies" : "Read replies"}</button>}</div>{expanded && <div className="mt-5 border-t border-white/10 pt-5">{replies.isLoading ? <p className="text-sm text-slate-400">Loading replies…</p> : replyEntries.length ? replyEntries.map((reply) => <div key={reply.id} className="mb-3 rounded-2xl bg-[#050B1A] p-4"><p className="text-xs font-bold text-[#00FF88]">{reply.displayName}</p><p className="mt-2 text-sm leading-6 text-slate-300">{reply.content}</p></div>) : <p className="text-sm text-slate-400">No replies yet. The author has opened this reflection for respectful response.</p>}{isAuthenticated ? <div className="mt-4 grid gap-3 rounded-2xl bg-[#050B1A] p-4"><input value={replyName} onChange={event => setReplyName(event.target.value)} aria-label="Reply display name" placeholder="Display name or pseudonym" className="rounded-xl bg-white/5 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-[#00D4FF]"/><textarea value={replyContent} onChange={event => setReplyContent(event.target.value)} aria-label="Reply to reflection" placeholder="Write a respectful reply in your own words…" className="min-h-24 rounded-xl bg-white/5 p-3 text-sm outline-none ring-1 ring-white/10 focus:ring-[#00D4FF]"/><button onClick={submitReply} disabled={createReply.isPending} className="justify-self-start rounded-xl bg-[#00D4FF] px-4 py-2 text-xs font-black text-[#050B1A] disabled:opacity-60">{createReply.isPending ? "Sharing…" : "Share reply"}</button></div> : <button onClick={() => window.location.assign(getLoginUrl())} className="mt-4 rounded-xl border border-[#00D4FF]/35 px-4 py-2 text-xs font-black text-[#9DEBFF]">Sign in to reply</button>}</div>}</article>;
}
