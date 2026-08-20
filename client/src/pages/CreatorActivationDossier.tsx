import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ClipboardCheck, ExternalLink, FileText, Filter, LockKeyhole, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type State = "Needs access" | "Needs source" | "Needs brief" | "Needs exact confirmation";

type Lane = {
  id: string;
  lane: string;
  state: State;
  record: string;
  destination: string;
  destinationLabel: string;
  prepares: string;
};

const LANES: Lane[] = [
  { id: "app-icon", lane: "Private app-icon archive", state: "Needs access", record: "Authenticated owner session, cleared app-icon asset, provenance record, and administrator assignment.", destination: "/creator-operations", destinationLabel: "Creator Operations", prepares: "Private archive review" },
  { id: "londyn", lane: "Londyn Polygon evidence", state: "Needs source", record: "Public explorer URL plus network, contract address, transaction status, bytecode, and ownership or administration evidence.", destination: "/deploy", destinationLabel: "Deployment evidence", prepares: "Verified evidence review" },
  { id: "broadcast", lane: "On-chain broadcast decision", state: "Needs exact confirmation", record: "Verified contract set, exact target action, authorized signer, gas consequence, and current same-conversation confirmation.", destination: "/deploy", destinationLabel: "Deployment evidence", prepares: "Exact action review" },
  { id: "campaign", lane: "Campaign asset record", state: "Needs source", record: "Full public URL, provenance, intended-use scope, and asset-specific rights record.", destination: "/knicks-nft", destinationLabel: "Campaign record", prepares: "Asset record review" },
  { id: "song", lane: "Per-song production packet", state: "Needs brief", record: "Track purpose, narrative, duration, aspect ratio, visual style, references, language, recurring elements, narration direction, and music-use authorization.", destination: "/episode-experience", destinationLabel: "Episode experience", prepares: "Production packet" },
  { id: "story", lane: "Story Studio package", state: "Needs exact confirmation", record: "Exact repository or path plus separate public-upload confirmation.", destination: "/first-party-co-creation", destinationLabel: "Co-creation record", prepares: "Public-package preparation" },
  { id: "cadence", lane: "Story Studio cadence", state: "Needs exact confirmation", record: "Existing-cadence expansion or daily long-form selection, plus access to the task owning the schedule.", destination: "/source-channel-scheduling-readiness", destinationLabel: "Scheduling readiness", prepares: "Cadence decision record" },
  { id: "shopify", lane: "Shopify storefront project", state: "Needs access", record: "New owner-created Stripe-free project context and explicit confirmation of that project.", destination: "/first-sku-activation-packet", destinationLabel: "First-SKU packet", prepares: "Storefront project preparation" },
  { id: "provider", lane: "Provider-side activation", state: "Needs exact confirmation", record: "Named provider, target action, intended consequence, evidence packet, rollback owner, and current confirmation.", destination: "/activation-register", destinationLabel: "Activation register", prepares: "Provider action record" },
];

const STATES: Array<State | "All"> = ["All", "Needs access", "Needs source", "Needs brief", "Needs exact confirmation"];

export default function CreatorActivationDossier() {
  useSovereignHeartbeat({ page: "creator-activation-dossier" });
  const [filter, setFilter] = useState<State | "All">("All");
  const [draftLaneId, setDraftLaneId] = useState(LANES[0].id);
  const [sourceReference, setSourceReference] = useState("");
  const [ownerConfirmation, setOwnerConfirmation] = useState("");
  const [preparationNotes, setPreparationNotes] = useState("");
  const visible = useMemo(() => filter === "All" ? LANES : LANES.filter(lane => lane.state === filter), [filter]);
  const draftLane = useMemo(() => LANES.find(lane => lane.id === draftLaneId) ?? LANES[0], [draftLaneId]);
  const releaseDraft = useMemo(() => [
    "SCROLLVERSE — CREATOR-CONTROLLED RELEASE RECORD",
    `Lane: ${draftLane.lane}`,
    `Current state: ${draftLane.state}`,
    `Exact required record: ${draftLane.record}`,
    `Source or file reference: ${sourceReference || "Not yet supplied"}`,
    `Current owner confirmation: ${ownerConfirmation || "Not yet supplied"}`,
    `Preparation notes: ${preparationNotes || "None"}`,
    "Boundary: Browser-local draft only. No external action is authorized by this draft.",
  ].join("\n"), [draftLane, ownerConfirmation, preparationNotes, sourceReference]);

  const exportDossier = () => {
    const content = [
      "SCROLLVERSE — CREATOR-CONTROLLED ACTIVATION DOSSIER",
      "Browser-local preparation record. Each lane remains independent.",
      "",
      ...LANES.flatMap(lane => [
        lane.lane,
        `State: ${lane.state}`,
        `Exact record: ${lane.record}`,
        `Preparation: ${lane.prepares}`,
        `Destination: ${lane.destination}`,
        "",
      ]),
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "scrollverse-creator-controlled-activation-dossier.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Local activation dossier exported.");
  };

  const copyLane = (lane: Lane) => {
    const record = `${lane.lane}\nState: ${lane.state}\nExact record: ${lane.record}\nPreparation: ${lane.prepares}\nDestination: ${lane.destination}`;
    navigator.clipboard?.writeText(record).then(() => toast.success("Local lane record copied.")).catch(() => toast.message("Copy is available in a browser with clipboard permission."));
  };

  const copyReleaseDraft = () => {
    navigator.clipboard?.writeText(releaseDraft).then(() => toast.success("Local release record copied.")).catch(() => toast.message("Copy is available in a browser with clipboard permission."));
  };

  const exportReleaseDraft = () => {
    const blob = new Blob([releaseDraft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `scrollverse-release-record-${draftLane.id}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Local release record exported.");
  };

  return <main className="min-h-screen bg-[#050B1A] pb-20 text-white">
    <section className="border-b border-cyan-300/15 bg-[radial-gradient(circle_at_12%_5%,rgba(0,212,255,.16),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(255,184,0,.15),transparent_26%)]">
      <div className="container py-16 md:py-24">
        <p className="font-mono text-xs tracking-[.24em] text-[#00D4FF]">CREATOR-CONTROLLED ACTIVATION DOSSIER</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight md:text-6xl">One exact record. <span className="text-[#FFB800]">One clear next path.</span></h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">This dossier brings every held external lane into a single local view. It honors the work already documented, names the exact record that unlocks the matching preparation path, and keeps each decision under creator control.</p>
        <button onClick={exportDossier} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#050B1A] hover:bg-[#7EEBFF]"><FileText className="h-4 w-4" />Export local dossier</button>
      </div>
    </section>

    <section className="container py-10">
      <PortalTrustLens lane="Creator-controlled activation" source="Current portal readiness routes, owner-identified required records, and local release-preparation packets" readiness="Browser-local dossier available now" boundary="No filter, copy, export, or route link creates provider access, a wallet action, a contract call, a DNS change, a purchase, a publication, an upload, or a schedule." />

      <div className="mt-8 flex flex-wrap items-center gap-2" aria-label="Activation dossier filters">
        <Filter className="mr-1 h-4 w-4 text-[#00D4FF]" />
        {STATES.map(state => <button key={state} onClick={() => setFilter(state)} aria-pressed={filter === state} className={`rounded-full px-3 py-2 text-xs font-bold transition ${filter === state ? "bg-[#00D4FF] text-[#050B1A]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{state}</button>)}
      </div>

      <section className="mt-8 rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[.04] p-6" aria-labelledby="release-record-builder-title">
        <p className="font-mono text-[10px] tracking-widest text-[#FFCC5C]">LOCAL PREPARATION</p>
        <h2 id="release-record-builder-title" className="mt-1 text-2xl font-black">Build a local release record</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Select one held lane and prepare the matching source record. This draft remains in your browser until you copy or export it; it does not send, upload, publish, or activate anything.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-bold">Activation lane
            <select value={draftLaneId} onChange={event => setDraftLaneId(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-3 text-sm text-white">
              {LANES.map(lane => <option key={lane.id} value={lane.id}>{lane.lane} — {lane.state}</option>)}
            </select>
          </label>
          <div className="rounded-xl border border-white/10 bg-[#050B1A] p-4"><p className="text-[10px] font-bold tracking-widest text-[#B5F7CC]">EXACT REQUIRED RECORD</p><p className="mt-2 text-sm leading-6 text-slate-300">{draftLane.record}</p></div>
          <label className="text-sm font-bold">Source or file reference
            <input value={sourceReference} onChange={event => setSourceReference(event.target.value)} placeholder="Public URL, local path, or supplied record label" className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-3 text-sm text-white placeholder:text-slate-500" />
          </label>
          <label className="text-sm font-bold">Current owner confirmation
            <input value={ownerConfirmation} onChange={event => setOwnerConfirmation(event.target.value)} placeholder="Exact lane-specific confirmation" className="mt-2 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-3 text-sm text-white placeholder:text-slate-500" />
          </label>
        </div>
        <label className="mt-4 block text-sm font-bold">Preparation notes
          <textarea value={preparationNotes} onChange={event => setPreparationNotes(event.target.value)} placeholder="Optional context for the matching preparation route" className="mt-2 min-h-24 w-full rounded-xl border border-white/15 bg-[#050B1A] px-3 py-3 text-sm text-white placeholder:text-slate-500" />
        </label>
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={copyReleaseDraft} className="inline-flex items-center gap-2 rounded-xl bg-[#FFB800] px-4 py-2 text-xs font-black text-[#050B1A]"><ClipboardCheck className="h-4 w-4" />Copy local release record</button>
          <button onClick={exportReleaseDraft} className="inline-flex items-center gap-2 rounded-xl border border-[#FFB800]/40 px-4 py-2 text-xs font-black text-[#FFCC5C]"><FileText className="h-4 w-4" />Export local release record</button>
        </div>
      </section>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {visible.map(lane => <article key={lane.id} className="rounded-3xl border border-white/10 bg-white/[.025] p-6">
          <div className="flex items-start justify-between gap-4">
            <div><p className="font-mono text-[10px] tracking-widest text-[#00D4FF]">{lane.state.toUpperCase()}</p><h2 className="mt-2 text-xl font-black">{lane.lane}</h2></div>
            <LockKeyhole className="h-5 w-5 shrink-0 text-[#FFB800]" />
          </div>
          <div className="mt-5 rounded-2xl bg-[#050B1A] p-4"><p className="text-xs font-bold text-[#B5F7CC]">EXACT REQUIRED RECORD</p><p className="mt-2 text-sm leading-6 text-slate-300">{lane.record}</p></div>
          <p className="mt-4 text-xs leading-5 text-slate-400"><ShieldCheck className="mr-2 inline h-4 w-4 text-[#00FF88]" />Prepares: {lane.prepares}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={lane.destination} className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/35 px-4 py-2 text-xs font-black text-[#9DEBFF]"><ExternalLink className="h-4 w-4" />{lane.destinationLabel}</Link>
            <button onClick={() => copyLane(lane)} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-black hover:bg-white/15"><ClipboardCheck className="h-4 w-4" />Copy local record</button>
          </div>
        </article>)}
      </div>

      <aside className="mt-8 rounded-3xl border border-[#00FF88]/25 bg-[#00FF88]/[.04] p-6">
        <div className="flex gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#00FF88]" /><div><h2 className="font-black">Every lane stays independent</h2><p className="mt-2 text-sm leading-6 text-slate-300">A source record helps the matching lane move forward; it does not automatically authorize another lane. This preserves choice, keeps evidence legible, and gives every external release its own exact preparation path.</p></div></div>
      </aside>

      <aside className="mt-5 rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.055] p-6">
        <div className="flex gap-3"><FileText className="mt-1 h-5 w-5 shrink-0 text-[#D6C4FF]" /><div><p className="font-mono text-[10px] tracking-widest text-[#D6C4FF]">REUSABLE METHOD RECORD</p><h2 className="mt-1 font-black">Creator-controlled activation dossier workflow</h2><p className="mt-2 text-sm leading-6 text-slate-300">The exact-record, independent-lane, correction-path method behind this page is preserved as a validated reusable skill for future source-led readiness work. The reusable method documents preparation; it does not grant access or perform an external release.</p></div></div>
      </aside>
    </section>
  </main>;
}
