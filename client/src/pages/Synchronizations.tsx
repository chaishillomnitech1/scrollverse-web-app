import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

const COLLECTION_CHECKS = [
  ["Story and record", "Drafted", "First-party account, date markers, and source context are prepared for review."],
  ["Artwork", "Awaiting cleared source", "No release artwork has been approved for the collection record."],
  ["Metadata", "Readiness draft", "Title, story note, accessibility description, and provenance fields remain reviewable."],
  ["Rights and contributors", "Owner review required", "Any final image, audio, collaborator, or third-party reference needs its own permission record."],
  ["Release", "Fail-closed", "No mint, sale, price, wallet connection, transfer, or marketplace action is enabled."],
] as const;

const REFLECTIONS = [
  "What is the date, time, or source record you are studying?",
  "What is directly observable in the source, and what is your interpretation?",
  "What alternative explanation or missing record should stay visible?",
  "What would you want a future reader to verify independently?",
];

export default function Synchronizations() {
  useSovereignHeartbeat({ page: "synchronizations" });
  const [note, setNote] = useState("");
  const copyNote = async () => {
    try {
      await navigator.clipboard.writeText(note);
      toast.success("Reflection copied locally.");
    } catch {
      toast.error("Copy is unavailable in this browser.");
    }
  };

  return <main className="min-h-screen pb-20 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b" style={{ borderColor: "rgba(0,212,255,0.18)", background: "radial-gradient(circle at 82% 0%, rgba(185,140,255,0.18), transparent 34%), #050B1A" }}><div className="max-w-7xl mx-auto px-5 pt-28 pb-14"><div className="flex flex-wrap items-center justify-between gap-4"><div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#00D4FF" }}>SYNCHRONIZATIONS · FIRST-PARTY STORY LANE</div><Link href="/dc-visit" className="rounded-xl border px-4 py-2 text-xs font-black" style={{ borderColor: "rgba(255,184,0,0.38)", color: "#FFB800" }}>August 28 story →</Link></div><h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight md:text-6xl">Keep the record.<br /><span style={{ color: "#B98CFF" }}>Leave room for reflection.</span></h1><p className="mt-6 max-w-4xl text-base leading-relaxed md:text-lg" style={{ color: "#C8D8E7" }}>This is the first ScrollVerse story lane for the owner’s synchronization account: remembered dates, personal observations, creative work, digital records, and questions worth studying. The page presents the owner’s perspective and asks visitors to make their own careful assessment from the visible materials.</p></div></section>

    <section className="max-w-7xl mx-auto grid gap-7 px-5 py-12 xl:grid-cols-[1.05fr_0.95fr]"><div className="space-y-7"><PortalTrustLens lane="First-party personal account" source="Owner-provided dates, memories, selected ScrollVerse records, and visible source captures" readiness="Story lane and research index are available now; final release inputs remain pending" boundary="The page preserves source, date, visibility, and the owner’s stated perspective so readers can study the material and make their own assessment." /><section className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.28)", background: "rgba(185,140,255,0.035)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>THE FIRST THREAD</div><h2 className="mt-3 text-3xl font-black">August 28 · 1978 · 7 o’clock</h2><p className="mt-4 text-sm leading-7" style={{ color: "#C8D8E7" }}>The owner has identified August 28, 1978 and a 7 o’clock birth-time record as the opening reference point for this story. The August 28 birthday route connects that personal marker to the ongoing Washington DC birthday narrative and a study space for dates, creative transmissions, digital records, and changing interpretations.</p><div className="mt-5 rounded-2xl border p-4" style={{ borderColor: "rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.035)" }}><div className="text-[10px] font-mono" style={{ color: "#00D4FF" }}>READING STANDARD</div><p className="mt-2 text-sm" style={{ color: "#C8D8E7" }}>The record is presented with its visible source trail. Readers can study the item, follow the links, add a question, and make their own conclusion.</p></div></section><section className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.25)", background: "rgba(0,255,136,0.03)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>STUDY PATHWAYS</div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[["Synchronization Research Index", "/synchronization-research"], ["Open Research Navigator", "/open-research-navigator"], ["Mesopotamia Commons", "/mesopotamia-commons"], ["Public Reference Trail", "/public-reference-trail"], ["Standards Studio", "/standards-studio"]].map(([label, href]) => <Link key={href} href={href} className="rounded-2xl border p-4 text-sm font-black transition hover:-translate-y-0.5" style={{ borderColor: "rgba(0,255,136,0.2)", color: "#D8F8E7", background: "rgba(4,14,30,0.52)" }}>{label} →</Link>)}</div></section></div>

      <aside className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.28)", background: "rgba(255,184,0,0.025)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>SYNCHRONIZATION COLLECTION · READINESS RECORD</div><h2 className="mt-3 text-3xl font-black">Collection 001:<br />The first thread</h2><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>A collectible concept tied to this story lane. It is a provenance and release-planning record—not a live asset or market offering.</p><div className="mt-6 space-y-3">{COLLECTION_CHECKS.map(([label, state, description]) => <article key={label} className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,184,0,0.17)", background: "rgba(4,14,30,0.6)" }}><div className="flex items-center justify-between gap-3"><h3 className="font-black">{label}</h3><span className="rounded-full px-2 py-1 text-[9px] font-mono font-bold" style={{ color: state === "Fail-closed" ? "#FF7575" : "#FFB800", background: "rgba(255,184,0,0.10)" }}>{state}</span></div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#AFC0CF" }}>{description}</p></article>)}</div><p className="mt-5 text-xs leading-relaxed" style={{ color: "#9CB0C1" }}>This record does not create an NFT, blockchain asset, wallet relationship, purchase opportunity, ownership assertion, valuation, or investment claim.</p></aside></section>

    <section className="max-w-7xl mx-auto px-5"><div className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.24)", background: "rgba(0,212,255,0.025)" }}><div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>VISITOR REFLECTION · BROWSER LOCAL</div><h2 className="mt-3 text-2xl font-black">Explore without being told what to conclude.</h2><ol className="mt-5 space-y-3">{REFLECTIONS.map((prompt, index) => <li key={prompt} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}><span className="font-mono" style={{ color: "#00D4FF" }}>{String(index + 1).padStart(2, "0")}</span>{prompt}</li>)}</ol></div><div><textarea value={note} onChange={event => setNote(event.target.value)} maxLength={2400} placeholder="Write a private study note, question, source lead, or correction idea…" className="min-h-52 w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none" style={{ borderColor: "rgba(255,255,255,0.16)" }} /><div className="mt-3 flex flex-wrap gap-3"><button type="button" onClick={copyNote} className="rounded-xl px-4 py-2.5 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Copy local note</button><button type="button" onClick={() => { setNote(""); toast.success("Browser-local note cleared."); }} className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,255,255,0.16)", color: "#C8D8E7" }}>Clear note</button></div><p className="mt-3 text-xs" style={{ color: "#9CB0C1" }}>The note stays in this browser view. It is not submitted, stored, shared, used to train a model, or treated as a public claim.</p></div></div></div></section>
  </main>;
}
