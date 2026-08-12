import { Link } from "wouter";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

const DISCIPLINES = ["Music", "Film", "Design", "Writing", "Research", "Technology", "Community", "Education"] as const;
const REQUEST_TYPES = ["INTRODUCTION", "CO_CREATE", "FEEDBACK", "RESEARCH"] as const;
const PROVENANCE_TYPES = ["IDEA", "TEXT", "VISUAL", "AUDIO", "DESIGN", "RESEARCH"] as const;
const SOURCE_CATEGORIES = ["ORIGINAL", "LICENSED", "PUBLIC_DOMAIN", "COLLABORATIVE", "UNVERIFIED"] as const;

type DirectoryProfile = {
  publicProfileKey: string;
  displayName: string;
  bio: string | null;
  signatureStatement: string | null;
  disciplines: string[];
  collaborationEnabled: boolean;
};

function statusColor(value: string) {
  if (value === "ACKNOWLEDGED" || value === "ACCEPTED") return "#00FF88";
  if (value === "DECLINED" || value === "CLOSED") return "#FF5D5D";
  if (value === "NEEDS_INFO" || value === "AWAITING_INTERACTION") return "#FFB800";
  return "#00D4FF";
}

function Pill({ value }: { value: string }) {
  const color = statusColor(value);
  return <span className="rounded-full px-2 py-1 text-[10px] font-mono font-bold" style={{ color, background: `${color}14`, border: `1px solid ${color}38` }}>{value.replaceAll("_", " ")}</span>;
}

export default function CreatorWorkspace() {
  useSovereignHeartbeat({ page: "creator-workspace" });
  const { user, loading, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const profile = trpc.creatorGovernance.getMyProfile.useQuery(undefined, { enabled: isAuthenticated });
  const directory = trpc.creatorGovernance.listPublicProfiles.useQuery({ limit: 24 });
  const requests = trpc.creatorGovernance.getMyCollaborationRequests.useQuery(undefined, { enabled: isAuthenticated });
  const provenance = trpc.creatorGovernance.listMyProvenance.useQuery(undefined, { enabled: isAuthenticated });
  const saveProfile = trpc.creatorGovernance.saveMyProfile.useMutation();
  const sendRequest = trpc.creatorGovernance.sendCollaborationRequest.useMutation();
  const respondRequest = trpc.creatorGovernance.respondToCollaborationRequest.useMutation();
  const withdrawRequest = trpc.creatorGovernance.withdrawCollaborationRequest.useMutation();
  const createProvenance = trpc.creatorGovernance.createProvenanceRecord.useMutation();
  const submitProvenance = trpc.creatorGovernance.submitProvenanceRecord.useMutation();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [disciplines, setDisciplines] = useState<string[]>(["Music"]);
  const [signature, setSignature] = useState("");
  const [origin, setOrigin] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [collaborationEnabled, setCollaborationEnabled] = useState(false);
  const [publicConsent, setPublicConsent] = useState(false);
  const [collaborationConsent, setCollaborationConsent] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [requestType, setRequestType] = useState<(typeof REQUEST_TYPES)[number]>("INTRODUCTION");
  const [projectTitle, setProjectTitle] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [provenanceTitle, setProvenanceTitle] = useState("");
  const [provenanceType, setProvenanceType] = useState<(typeof PROVENANCE_TYPES)[number]>("IDEA");
  const [provenanceSummary, setProvenanceSummary] = useState("");
  const [sourceCategory, setSourceCategory] = useState<(typeof SOURCE_CATEGORIES)[number]>("ORIGINAL");
  const [sourceReference, setSourceReference] = useState("");
  const [attest, setAttest] = useState(false);

  useEffect(() => {
    if (!profile.data) return;
    setDisplayName(profile.data.displayName);
    setBio(profile.data.bio ?? "");
    setDisciplines(profile.data.disciplines);
    setSignature(profile.data.signatureStatement ?? "");
    setOrigin(profile.data.originStatement ?? "");
    setIsPublic(profile.data.isPublic);
    setCollaborationEnabled(profile.data.collaborationEnabled);
    setPublicConsent(Boolean(profile.data.publicProfileConsentAt));
    setCollaborationConsent(Boolean(profile.data.collaborationConsentAt));
  }, [profile.data]);

  const requireSignIn = () => { window.location.href = getLoginUrl(); };
  const refreshWorkspace = async () => {
    await Promise.all([
      utils.creatorGovernance.getMyProfile.invalidate(),
      utils.creatorGovernance.listPublicProfiles.invalidate(),
      utils.creatorGovernance.getMyCollaborationRequests.invalidate(),
      utils.creatorGovernance.listMyProvenance.invalidate(),
    ]);
  };
  const toggleDiscipline = (discipline: string) => setDisciplines(current => current.includes(discipline) ? current.filter(item => item !== discipline) : [...current, discipline].slice(0, 8));

  const saveCreatorProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) return requireSignIn();
    try {
      await saveProfile.mutateAsync({ displayName, bio: bio || null, disciplines, signatureStatement: signature || null, originStatement: origin || null, isPublic, collaborationEnabled, confirmPublicProfileConsent: publicConsent, confirmCollaborationConsent: collaborationConsent });
      toast.success("Creator profile saved with your selected visibility and collaboration settings.");
      await refreshWorkspace();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Profile could not be saved."); }
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedRecipient) return;
    try {
      await sendRequest.mutateAsync({ recipientPublicProfileKey: selectedRecipient, requestType, projectTitle, message: requestMessage });
      toast.success("Private collaboration request sent.");
      setProjectTitle(""); setRequestMessage(""); setSelectedRecipient(null);
      await refreshWorkspace();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Request could not be sent."); }
  };

  const createRecord = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createProvenance.mutateAsync({ title: provenanceTitle, recordType: provenanceType, summary: provenanceSummary, sourceCategory, sourceReference: sourceReference || null, ownerAttestation: attest });
      toast.success("Private provenance record created.");
      setProvenanceTitle(""); setProvenanceSummary(""); setSourceReference(""); setAttest(false);
      await refreshWorkspace();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Provenance record could not be created."); }
  };

  if (loading) return <main className="min-h-screen grid place-items-center text-white" style={{ background: "#050B1A" }}><div className="font-mono text-sm" style={{ color: "#00D4FF" }}>LOADING CREATOR WORKSPACE…</div></main>;
  if (!isAuthenticated) return <main className="min-h-screen grid place-items-center px-5 text-white" style={{ background: "#050B1A" }}><section className="max-w-xl rounded-3xl border p-8 text-center" style={{ borderColor: "rgba(0,212,255,0.24)", background: "rgba(255,255,255,0.025)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>PRIVATE CREATOR WORKSPACE</div><h1 className="mt-4 text-3xl font-black">Sign in to keep your origin, requests, and records together.</h1><p className="mt-4 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>Your profile stays private by default. Public discovery and collaboration are separate consent choices; provenance records remain protected.</p><button onClick={requireSignIn} className="mt-7 rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Sign in to continue</button></section></main>;

  const selectedProfile = directory.data?.find((item: DirectoryProfile) => item.publicProfileKey === selectedRecipient) ?? null;
  const busy = saveProfile.isPending || sendRequest.isPending || respondRequest.isPending || withdrawRequest.isPending || createProvenance.isPending || submitProvenance.isPending;

  return <main className="min-h-screen pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b" style={{ borderColor: "rgba(0,212,255,0.18)", background: "radial-gradient(circle at 82% 0%, rgba(185,140,255,0.18), transparent 34%), #050B1A" }}><div className="max-w-7xl mx-auto px-5 pt-28 pb-14"><div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#00D4FF" }}>CREATOR WORKSPACE · CONSENT, COLLABORATION, PROVENANCE</div><div className="mt-6 flex flex-wrap items-end justify-between gap-6"><div><h1 className="text-4xl font-black leading-none sm:text-5xl">Keep your signal<br /><span style={{ color: "#FFB800" }}>under your control.</span></h1><p className="mt-5 max-w-2xl text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>Your workspace is a first-party ScrollVerse home for public-profile consent, structured collaboration requests, and private provenance records. It is not a marketplace, rights registry, payment channel, or legal opinion.</p></div><div className="flex flex-wrap gap-3"><Link href="/signalworks" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.4)", color: "#FFB800" }}>Signalworks</Link><Link href="/legion-commons" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.4)", color: "#00FF88" }}>Legion Commons</Link></div></div></div></section>

    <section className="max-w-7xl mx-auto grid gap-8 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={saveCreatorProfile} className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.22)", background: "rgba(255,255,255,0.025)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>YOUR CONSENTED PROFILE</div><h2 className="mt-3 text-2xl font-black">Build a public signature only when you choose.</h2><div className="mt-6 grid gap-4"><label className="text-sm font-bold">Display name<input value={displayName} onChange={e => setDisplayName(e.target.value)} required minLength={2} maxLength={120} className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><label className="text-sm font-bold">Short bio<textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={600} className="mt-2 min-h-20 w-full rounded-xl border bg-transparent px-3 py-2 outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><div><div className="text-sm font-bold">Disciplines</div><div className="mt-2 flex flex-wrap gap-2">{DISCIPLINES.map(item => <button type="button" key={item} onClick={() => toggleDiscipline(item)} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: disciplines.includes(item) ? "rgba(0,212,255,0.18)" : "rgba(255,255,255,0.05)", color: disciplines.includes(item) ? "#00D4FF" : "#B8C7D6", border: `1px solid ${disciplines.includes(item) ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.10)"}` }}>{item}</button>)}</div></div><label className="text-sm font-bold">Signature statement<textarea value={signature} onChange={e => setSignature(e.target.value)} maxLength={600} className="mt-2 min-h-20 w-full rounded-xl border bg-transparent px-3 py-2 outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><label className="text-sm font-bold">Origin statement<textarea value={origin} onChange={e => setOrigin(e.target.value)} maxLength={600} className="mt-2 min-h-20 w-full rounded-xl border bg-transparent px-3 py-2 outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /></label><label className="flex items-start gap-3 text-sm" style={{ color: "#C1D0DE" }}><input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} className="mt-1" />Make this profile public in the creator directory.</label><label className="flex items-start gap-3 text-sm" style={{ color: "#C1D0DE" }}><input type="checkbox" checked={publicConsent} onChange={e => setPublicConsent(e.target.checked)} className="mt-1" />I consent to publish only these selected profile fields. My account identity and private records stay private.</label><label className="flex items-start gap-3 text-sm" style={{ color: "#C1D0DE" }}><input type="checkbox" checked={collaborationEnabled} onChange={e => setCollaborationEnabled(e.target.checked)} className="mt-1" />Accept structured collaboration requests through this workspace.</label><label className="flex items-start gap-3 text-sm" style={{ color: "#C1D0DE" }}><input type="checkbox" checked={collaborationConsent} onChange={e => setCollaborationConsent(e.target.checked)} className="mt-1" />I consent to receive private, non-financial collaboration requests. No contact data or agreement is exchanged here.</label><button disabled={busy} className="rounded-xl px-5 py-3 text-sm font-black disabled:opacity-60" style={{ background: "#00D4FF", color: "#050B1A" }}>{saveProfile.isPending ? "Saving…" : "Save my creator profile"}</button></div></form>

      <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.25)", background: "rgba(255,184,0,0.025)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>PUBLIC CREATOR DIRECTORY</div><h2 className="mt-3 text-2xl font-black">Discover signatures that opted in.</h2><p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>Only people who chose public discovery appear here. Requests stay private to their sender and recipient.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{directory.data?.length ? directory.data.map((item: DirectoryProfile) => <article key={item.publicProfileKey} className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,184,0,0.18)", background: "rgba(4,14,30,0.5)" }}><div className="flex items-start justify-between gap-3"><h3 className="font-black">{item.displayName}</h3>{item.collaborationEnabled ? <Pill value="OPEN" /> : <Pill value="VIEW ONLY" />}</div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#A9B9C9" }}>{item.signatureStatement || item.bio || "Original profile in formation."}</p><div className="mt-3 flex flex-wrap gap-1">{item.disciplines.map((discipline: string) => <span key={discipline} className="rounded-full px-2 py-1 text-[10px]" style={{ background: "rgba(0,212,255,0.10)", color: "#00D4FF" }}>{discipline}</span>)}</div>{item.collaborationEnabled && item.publicProfileKey !== profile.data?.publicProfileKey ? <button onClick={() => setSelectedRecipient(item.publicProfileKey)} className="mt-4 text-xs font-black" style={{ color: "#FFB800" }}>Propose collaboration →</button> : null}</article>) : <div className="rounded-2xl border p-5 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A9B9C9" }}>No public profiles yet. Your independent signature can be the first when you opt in.</div>}</div>
        {selectedProfile ? <form onSubmit={submitRequest} className="mt-6 rounded-2xl border p-5" style={{ borderColor: "rgba(0,255,136,0.28)", background: "rgba(0,255,136,0.035)" }}><div className="flex items-center justify-between gap-4"><div><div className="text-[10px] font-mono" style={{ color: "#00FF88" }}>PRIVATE COLLABORATION REQUEST</div><h3 className="mt-1 font-black">To {selectedProfile.displayName}</h3></div><button type="button" onClick={() => setSelectedRecipient(null)} className="text-xs" style={{ color: "#B8C7D6" }}>Cancel</button></div><div className="mt-4 grid gap-3"><select value={requestType} onChange={e => setRequestType(e.target.value as (typeof REQUEST_TYPES)[number])} className="rounded-xl border bg-[#081226] px-3 py-2 text-sm" style={{ borderColor: "rgba(255,255,255,0.16)" }}>{REQUEST_TYPES.map(type => <option key={type} value={type}>{type.replaceAll("_", " ")}</option>)}</select><input value={projectTitle} onChange={e => setProjectTitle(e.target.value)} required minLength={3} maxLength={160} placeholder="Project or invitation title" className="rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /><textarea value={requestMessage} onChange={e => setRequestMessage(e.target.value)} required minLength={12} maxLength={1500} placeholder="What would you like to explore together? Keep it non-financial and no-contact-data." className="min-h-28 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /><button disabled={busy} className="rounded-xl px-4 py-3 text-sm font-black disabled:opacity-60" style={{ background: "#00FF88", color: "#050B1A" }}>{sendRequest.isPending ? "Sending…" : "Send private request"}</button></div></form> : null}</div>
    </section>

    <section className="max-w-7xl mx-auto grid gap-8 px-5 py-3 lg:grid-cols-2"><section className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.24)", background: "rgba(185,140,255,0.035)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>COLLABORATION INBOX</div><h2 className="mt-3 text-2xl font-black">Requests stay private until you respond.</h2><div className="mt-5 space-y-3">{requests.data?.incoming?.length || requests.data?.outgoing?.length ? <>{requests.data?.incoming.map(item => <article key={`in-${item.id}`} className="rounded-2xl border p-4" style={{ borderColor: "rgba(185,140,255,0.18)" }}><div className="flex flex-wrap justify-between gap-3"><div><Pill value="INCOMING" /><h3 className="mt-2 font-black">{item.projectTitle}</h3><p className="mt-1 text-xs" style={{ color: "#A9B9C9" }}>From {item.requester?.displayName ?? "Creator"} · {item.requestType.replaceAll("_", " ")}</p></div><Pill value={item.status} /></div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>{item.message}</p>{item.status === "PENDING" ? <div className="mt-4 flex gap-2"><button onClick={async () => { try { await respondRequest.mutateAsync({ id: item.id, decision: "ACCEPTED" }); toast.success("Request accepted."); await refreshWorkspace(); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not respond."); } }} className="rounded-lg px-3 py-2 text-xs font-black" style={{ background: "#00FF88", color: "#050B1A" }}>Accept</button><button onClick={async () => { try { await respondRequest.mutateAsync({ id: item.id, decision: "DECLINED" }); toast.success("Request declined."); await refreshWorkspace(); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not respond."); } }} className="rounded-lg border px-3 py-2 text-xs font-black" style={{ borderColor: "rgba(255,93,93,0.4)", color: "#FF7575" }}>Decline</button></div> : null}</article>)}{requests.data?.outgoing.map(item => <article key={`out-${item.id}`} className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,212,255,0.18)" }}><div className="flex flex-wrap justify-between gap-3"><div><Pill value="OUTGOING" /><h3 className="mt-2 font-black">{item.projectTitle}</h3><p className="mt-1 text-xs" style={{ color: "#A9B9C9" }}>To {item.recipient?.displayName ?? "Creator"}</p></div><Pill value={item.status} /></div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>{item.message}</p>{item.status === "PENDING" ? <button onClick={async () => { try { await withdrawRequest.mutateAsync({ id: item.id }); toast.success("Request withdrawn."); await refreshWorkspace(); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not withdraw request."); } }} className="mt-4 text-xs font-black" style={{ color: "#FFB800" }}>Withdraw request</button> : null}</article>)}</> : <p className="rounded-2xl border p-5 text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#A9B9C9" }}>No collaboration requests yet. Publish a profile and send a structured invitation when the time is right.</p>}</div></section>

      <section className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.24)", background: "rgba(0,255,136,0.03)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>PRIVATE PROVENANCE LEDGER</div><h2 className="mt-3 text-2xl font-black">Record the work without making a legal claim.</h2><p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>A reviewer can acknowledge completeness or request information. That is not a legal ownership, license, valuation, or commercial-readiness decision.</p><form onSubmit={createRecord} className="mt-5 grid gap-3"><input value={provenanceTitle} onChange={e => setProvenanceTitle(e.target.value)} required minLength={3} maxLength={180} placeholder="Record title" className="rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /><div className="grid grid-cols-2 gap-3"><select value={provenanceType} onChange={e => setProvenanceType(e.target.value as (typeof PROVENANCE_TYPES)[number])} className="rounded-xl border bg-[#081226] px-3 py-2 text-sm" style={{ borderColor: "rgba(255,255,255,0.16)" }}>{PROVENANCE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}</select><select value={sourceCategory} onChange={e => setSourceCategory(e.target.value as (typeof SOURCE_CATEGORIES)[number])} className="rounded-xl border bg-[#081226] px-3 py-2 text-sm" style={{ borderColor: "rgba(255,255,255,0.16)" }}>{SOURCE_CATEGORIES.map(type => <option key={type} value={type}>{type.replaceAll("_", " ")}</option>)}</select></div><textarea value={provenanceSummary} onChange={e => setProvenanceSummary(e.target.value)} required minLength={10} maxLength={2000} placeholder="Private summary of the work and its source context" className="min-h-28 rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /><input value={sourceReference} onChange={e => setSourceReference(e.target.value)} maxLength={2048} placeholder="Optional source reference or local record pointer" className="rounded-xl border bg-transparent px-3 py-2 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /><label className="flex items-start gap-3 text-xs" style={{ color: "#C1D0DE" }}><input type="checkbox" checked={attest} onChange={e => setAttest(e.target.checked)} className="mt-0.5" />I attest that this entry is an honest provenance note to the best of my knowledge.</label><button disabled={busy} className="rounded-xl px-4 py-3 text-sm font-black disabled:opacity-60" style={{ background: "#00FF88", color: "#050B1A" }}>{createProvenance.isPending ? "Creating…" : "Create private record"}</button></form><div className="mt-6 space-y-3">{provenance.data?.map(record => <article key={record.id} className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,255,136,0.18)" }}><div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-black">{record.title}</h3><p className="mt-1 text-[10px] font-mono" style={{ color: "#A9B9C9" }}>{record.recordType} · {record.sourceCategory.replaceAll("_", " ")}</p></div><Pill value={record.reviewStatus} /></div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C1D0DE" }}>{record.summary}</p>{record.events.length ? <p className="mt-3 text-xs" style={{ color: "#A9B9C9" }}>Latest record event: {record.events[0]?.note}</p> : null}{(record.reviewStatus === "DRAFT" || record.reviewStatus === "NEEDS_INFO") ? <button onClick={async () => { try { await submitProvenance.mutateAsync({ id: record.id }); toast.success("Record submitted for protected completeness review."); await refreshWorkspace(); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not submit record."); } }} className="mt-4 text-xs font-black" style={{ color: "#00FF88" }}>Submit for completeness review →</button> : null}</article>)}{!provenance.data?.length ? <p className="text-sm" style={{ color: "#A9B9C9" }}>No private provenance records yet.</p> : null}</div></section></section>
  </main>;
}
