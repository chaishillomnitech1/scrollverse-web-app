import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { ShieldCheck, FileSearch, Eye, Route, AlertTriangle } from "lucide-react";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const reviewLanes = [
  { id: "source", title: "Source & context", icon: FileSearch, color: "#00D4FF", text: "Record the public source URL, observed date, author or publisher where known, and the exact learning or reference purpose." },
  { id: "rights", title: "Rights & affiliation", icon: ShieldCheck, color: "#FFB800", text: "Confirm a purpose-specific authorization before using an athlete, team, league, franchise, brand, logo, broadcast, photograph, or other protected reference in a public asset." },
  { id: "visitor", title: "Visitor-facing state", icon: Eye, color: "#00FF88", text: "Label a source reference, research note, original concept, cleared asset, product, and release as separate states. This route is a research review only." },
] as const;

export default function KnicksNFT() {
  useSovereignHeartbeat({ page: "knicks-reference-review" });
  const [selected, setSelected] = useState<typeof reviewLanes[number]["id"]>("source");
  const [note, setNote] = useState("");
  const lane = reviewLanes.find((item) => item.id === selected) ?? reviewLanes[0];
  const packet = useMemo(() => `SCROLLVERSE SPORTS REFERENCE REVIEW\n\nLane: ${lane.title}\nCurrent state: source-labeled research only\nNote: ${note || "[add a factual source or original-concept note]"}\n\nRequired before public use: source, scope, rights or authorization, accessibility, intended destination, correction path, and exact owner release.\n\nNo-action boundary: no affiliation, product, mint, wager, wallet, checkout, payment, payout, provider configuration, media publication, or token action is created.`, [lane.title, note]);
  const copyPacket = async () => {
    try { await navigator.clipboard.writeText(packet); toast.success("Browser-local reference review copied."); }
    catch { toast.error("Copy was unavailable in this browser."); }
  };

  return <main className="min-h-screen bg-[#050B1A] px-4 py-10 text-white sm:px-6 lg:px-10">
    <section className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/" className="text-sm font-black text-[#00D4FF]">← ScrollVerse</Link><Link href="/ip-security-readiness" className="rounded-lg border border-[#FFB800]/40 px-3 py-2 text-xs font-black text-[#FFCC4D]">IP & Security Readiness →</Link></div>
      <header className="mt-8 rounded-[2rem] border border-[#00D4FF]/30 bg-[radial-gradient(circle_at_12%_20%,rgba(0,212,255,.13),transparent_30%),#071124] p-8 sm:p-12">
        <p className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">SPORTS REFERENCE · RIGHTS-AWARE REVIEW · NO COMMERCIAL ACTION</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Sports references belong in a <span className="text-[#00D4FF]">clear source record.</span></h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#D6E2EE]">This route preserves a space to study and organize sports-related references while distinguishing public research from original work, approved assets, affiliations, products, and releases. No prediction, score, contract, token, NFT, wager, price, mint, checkout, payout, or team relationship is represented as active.</p>
      </header>
      <PortalTrustLens lane="Sports reference review" source="Source-labeled public research and owner-directed local planning notes." readiness="Browser-local review and correction preparation are available now." boundary="No athlete, team, league, franchise, brand, likeness, media, logo, product, payment, wallet, token, wager, provider, or release action is active on this route." />
      <section className="mt-8 grid gap-4 md:grid-cols-3">{reviewLanes.map((item) => { const Icon = item.icon; const active = selected === item.id; return <button type="button" key={item.id} onClick={() => setSelected(item.id)} className="rounded-2xl border p-6 text-left transition" style={{ borderColor: active ? item.color : "rgba(255,255,255,.15)", background: active ? `${item.color}12` : "rgba(255,255,255,.025)" }}><Icon size={22} style={{ color: item.color }} /><h2 className="mt-4 text-lg font-black">{item.title}</h2><p className="mt-2 text-sm leading-6 text-[#C8D8E7]">{item.text}</p></button>; })}</section>
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr]"><div className="rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.04] p-7"><p className="text-xs font-mono tracking-[.17em] text-[#D7C6FF]">BROWSER-LOCAL REFERENCE NOTE</p><h2 className="mt-3 text-2xl font-black">Prepare a factual review packet.</h2><textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={1800} rows={8} placeholder="What is the source? What is the intended research or original-work purpose? What rights, access, accessibility, and correction questions remain?" className="mt-5 w-full resize-none rounded-2xl border border-white/15 bg-black/20 p-4 text-sm leading-6 outline-none"/><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={copyPacket} className="rounded-xl bg-[#B98CFF] px-4 py-3 text-xs font-black text-[#050B1A]">Copy local review</button><button type="button" onClick={() => { setNote(""); toast.success("Browser-local review reset."); }} className="rounded-xl border border-white/15 px-4 py-3 text-xs font-black">Reset</button></div></div><aside className="rounded-3xl border border-[#FF6B6B]/30 bg-[#FF6B6B]/[.04] p-7"><AlertTriangle className="text-[#FF9B9B]"/><h2 className="mt-4 text-2xl font-black">Release gate</h2><ol className="mt-4 space-y-3 text-sm leading-6 text-[#D6E2EE]"><li><b className="text-[#FF9B9B]">01</b> Establish a source and purpose.</li><li><b className="text-[#FF9B9B]">02</b> Record rights, affiliation, likeness, and asset-use status.</li><li><b className="text-[#FF9B9B]">03</b> Set accessibility, destination, and correction requirements.</li><li><b className="text-[#FF9B9B]">04</b> Obtain an exact owner release for one named action.</li></ol><Link href="/continuation-readiness-register" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#FFCC4D]"><Route size={16}/> Open continuation register →</Link></aside></section>
    </section>
  </main>;
}
