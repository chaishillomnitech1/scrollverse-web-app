import { useMemo, useState } from "react";
import { ArrowRight, Copy, Download, FileAudio, FileLock2, Globe2, HardDriveUpload, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const LANES = [
  {
    id: "dns",
    order: "01",
    icon: Globe2,
    color: "#00D4FF",
    title: "ScrollVerse.co DNS binding",
    sourceState: "scrollverse.co and www.scrollverse.co are available project domains; registrar control is not present in this workspace.",
    outcome: "Point the authorized domain to the production edge endpoint using the owner’s registrar account.",
    fields: ["Authorized registrar account", "Exact production edge record supplied by hosting", "Record type and hostname", "Existing record conflict decision", "TTL preference", "Exact change confirmation"],
    consequence: "Changing a DNS record can redirect traffic, interrupt existing mail or web routing if the wrong record is changed, and take time to propagate.",
    state: "requires owner release",
  },
  {
    id: "contract",
    order: "02",
    icon: WalletCards,
    color: "#FFCC4D",
    title: "Star Dust Collective contract release",
    sourceState: "No deployed Star Dust contract address, verified source, ABI, target network, deployer configuration, funded gas wallet, or metadata URI was supplied in this task.",
    outcome: "Compile and test the approved contract on the named testnet; prepare the exact deployment transaction only after its source, destination, and costs are reviewable.",
    fields: ["Audited or owner-approved contract source and ABI", "Testnet and mainnet network names", "Deployer wallet/provider configuration", "Funded gas-wallet authorization", "Metadata base URI", "Royalty / edition terms", "Exact deployment action and expected gas consequence", "Same-conversation mainnet confirmation"],
    consequence: "A mainnet deployment is an irreversible blockchain transaction that may consume gas and create public contract state. Testnet validation must be completed first.",
    state: "requires owner release",
  },
  {
    id: "masters",
    order: "03",
    icon: FileAudio,
    color: "#B5F7CC",
    title: "Master audio + 4K reel intake",
    sourceState: "ScrollHub visibly presents a protected master-upload path, but no authorized WAV/FLAC, MP4/ProRes, caption, contributor, or storage-destination file was supplied here.",
    outcome: "Ingest approved master files into the designated secure storage path with a preserved source record, then prepare the exact public-media release record.",
    fields: ["Authorized WAV/FLAC and 4K MP4/ProRes paths or uploads", "Title, source date, and contributor record", "Music-use and visual-use authorization", "Caption / transcript file", "Intended storage destination", "Target channel or exhibition path", "Visibility and final release approval"],
    consequence: "Uploading or publishing a master can expose the asset to a destination audience. Preserve the approved file, contributor information, captions, storage location, and exact publication decision first.",
    state: "requires owner release",
  },
] as const;

function download(value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = "scrollverse-three-lane-release-record.json";
  a.click();
  URL.revokeObjectURL(href);
}

export default function ThreeLaneReleaseRegister() {
  useSovereignHeartbeat({ page: "three-lane-release-register" });
  const [selectedId, setSelectedId] = useState("dns");
  const [note, setNote] = useState("");
  const selected = useMemo(() => LANES.find((lane) => lane.id === selectedId) ?? LANES[0], [selectedId]);
  const Icon = selected.icon;
  const record = { lane: selected.id, title: selected.title, observedState: selected.sourceState, requiredInputs: selected.fields, consequence: selected.consequence, localNote: note, externalAction: "not authorized" };
  const copy = async () => { await navigator.clipboard.writeText(JSON.stringify(record, null, 2)); toast.success("Three-lane release record copied."); };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#00D4FF]/20 bg-[radial-gradient(circle_at_16%_4%,rgba(0,212,255,.14),transparent_29%),radial-gradient(circle_at_88%_22%,rgba(255,204,77,.11),transparent_27%),#050B1A]"><div className="container py-16 md:py-22"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/first-party-sites-register" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← FIRST-PARTY SITES REGISTER</Link><span className="rounded-full border border-[#00D4FF]/35 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">THREE-LANE RELEASE REGISTER</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.22em] text-[#9DEBFF]">DNS · CONTRACT · MASTER MEDIA</p><h1 className="mt-4 text-5xl font-black leading-[.9] md:text-7xl">Prepare the lane.<br/><span className="text-[#9DEBFF]">Name the action.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">A browser-local record for the three requested external releases. Each card presents what is actually observed, what is missing, the consequence of the real-world action, and the exact owner input needed before any provider-side step.</p></div><div className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.06] p-7"><FileLock2 className="h-9 w-9 text-[#FFE19A]"/><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#FFE19A]">RELEASE PRINCIPLE</p><p className="mt-3 text-2xl font-black">No silent external action.</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">A domain edit, mainnet transaction, or master upload is prepared here, never triggered here.</p></div></div></div></section>

    <section className="container py-8"><PortalTrustLens lane="Three-Lane Release Register" source="Owner-supplied release request; Phase 661 source observations; current project domains and browser-local source registers." readiness="Select a release lane, inspect its observed state and exact required inputs, add a browser-local note, and copy/export the release record for owner review." boundary="This route does not access a registrar, sign or send a blockchain transaction, use a wallet, upload a master file, change a domain, create a contract, publish media, or schedule a provider action." /></section>

    <section className="container py-6"><div className="grid gap-4 lg:grid-cols-3">{LANES.map((lane) => { const LaneIcon = lane.icon; return <button key={lane.id} type="button" onClick={() => { setSelectedId(lane.id); toast.success(`${lane.title} selected for local review.`); }} className="rounded-[1.8rem] border p-6 text-left transition hover:-translate-y-1" style={{ borderColor: selectedId === lane.id ? `${lane.color}CC` : `${lane.color}42`, background: selectedId === lane.id ? `${lane.color}12` : "rgba(255,255,255,.025)" }}><div className="flex items-start justify-between"><LaneIcon className="h-8 w-8" style={{ color: lane.color }}/><span className="text-[10px] font-mono" style={{ color: lane.color }}>LANE {lane.order}</span></div><h2 className="mt-7 text-2xl font-black">{lane.title}</h2><p className="mt-4 text-xs font-mono uppercase" style={{ color: "#FFA7C1" }}>{lane.state}</p><p className="mt-4 text-sm leading-7 text-[#C8D8E7]">{lane.outcome}</p></button>; })}</div></section>

    <section className="container py-6"><article className="rounded-[2rem] border border-white/10 bg-white/[.03] p-7 md:p-9"><div className="flex flex-wrap items-start justify-between gap-6"><div className="flex gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${selected.color}15`, color: selected.color }}><Icon className="h-6 w-6"/></div><div><p className="text-[10px] font-mono tracking-[.17em]" style={{ color: selected.color }}>LANE {selected.order} · {selected.state.toUpperCase()}</p><h2 className="mt-2 text-4xl font-black">{selected.title}</h2></div></div><span className="rounded-full border border-[#FF6B9A]/35 bg-[#FF6B9A]/10 px-3 py-1 text-[10px] font-mono text-[#FFA7C1]">EXTERNAL ACTION NOT AUTHORIZED</span></div><div className="mt-7 grid gap-4 lg:grid-cols-2"><div className="rounded-2xl border p-5" style={{ borderColor: `${selected.color}48`, background: `${selected.color}08` }}><p className="text-[10px] font-mono" style={{ color: selected.color }}>OBSERVED CURRENT STATE</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.sourceState}</p></div><div className="rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.05] p-5"><p className="text-[10px] font-mono text-[#FFE19A]">ACTION CONSEQUENCE</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.consequence}</p></div></div><div className="mt-5 rounded-2xl border border-[#00FF88]/30 bg-[#00FF88]/[.045] p-5"><p className="text-[10px] font-mono text-[#B5F7CC]">EXACT OWNER-RELEASE INPUTS</p><ol className="mt-4 grid gap-2 md:grid-cols-2">{selected.fields.map((field, index) => <li key={field} className="flex gap-3 text-sm leading-6 text-[#D6E2EE]"><span className="font-mono text-[#B5F7CC]">{String(index + 1).padStart(2, "0")}</span>{field}</li>)}</ol></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Browser-local owner note, approved destination, correction, or exact action detail" className="mt-5 min-h-28 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white outline-none"/><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#9DEBFF]/45 bg-[#00D4FF]/10 px-4 py-3 text-xs font-black text-[#9DEBFF]"><Copy className="h-4 w-4"/> COPY RECORD</button><button type="button" onClick={() => { download(record); toast.success("Local three-lane release record exported."); }} className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-black" style={{ color: selected.color, borderColor: `${selected.color}66`, background: `${selected.color}10` }}><Download className="h-4 w-4"/> JSON</button></div></article></section>

    <section className="container py-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[{ href: "/first-party-sites-register", icon: ShieldCheck, title: "First-Party Sites Register", text: "Return to the source links and observed provider-state labels." }, { href: "/special-repository", icon: HardDriveUpload, title: "Special Repository", text: "Preserve accession, source, display, and non-deployable collector-readiness data." }, { href: "/integration-observability-reference", icon: ArrowRight, title: "Integration Observability", text: "Review protected source concepts for observability while keeping providers disconnected." }, { href: "/show-the-work-knowledge-base", icon: FileLock2, title: "Reusable Release Method", text: "Use the browser-local show-the-work record for the repeatable three-lane evidence and exact-action workflow." }].map((item) => { const CardIcon = item.icon; return <Link key={item.href} href={item.href} className="rounded-[1.7rem] border border-[#9DEBFF]/25 bg-[#00D4FF]/[.04] p-6 transition hover:-translate-y-0.5"><CardIcon className="h-7 w-7 text-[#9DEBFF]"/><h2 className="mt-5 text-2xl font-black">{item.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#9DEBFF]">Open route <ArrowRight className="h-4 w-4"/></span></Link>; })}</div></section>
  </main>;
}
