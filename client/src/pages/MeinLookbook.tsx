import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type Look = {
  id: string;
  name: string;
  type: string;
  color: string;
  accent: string;
  frequency: string;
  region: string;
  story: string;
  impact: string;
  available: boolean;
};

const LOOKS: Look[] = [
  { id: "M01", name: "Six Sigil Field Jacket", type: "Outerwear", color: "#121212", accent: "#D4AF37", frequency: "963Hz", region: "North Line", story: "A detachable-hood field jacket built around the proprietary six-sigil spiral: movement, memory, service, craft, rhythm, and return.", impact: "Proposed creator-learning allocation set only after merchant and beneficiary agreements are finalized.", available: false },
  { id: "M02", name: "Compass Halo Vest", type: "Layering", color: "#1C2A3A", accent: "#00D4FF", frequency: "741Hz", region: "Harlem Tribute", story: "A functional vest with a compass-halo back panel, QR-ready lanyard loop, and architectural pocket map inspired by city movement.", impact: "Proposed community music-education allocation pending governance and partner approval.", available: false },
  { id: "M03", name: "Canadian Six Trench", type: "Outerwear", color: "#EEE6D7", accent: "#4B0082", frequency: "528Hz", region: "North + South", story: "A weather-ready trench with tonal six-sigil embroidery and modular storm panels. The silhouette is original to MEIN design direction.", impact: "Proposed women-producer microgrant allocation pending an independently administered program.", available: false },
  { id: "M04", name: "Saffron 40 Below Boot", type: "Footwear concept", color: "#B76E00", accent: "#050B1A", frequency: "741Hz", region: "Winter Node", story: "A proprietary, workwear-inspired boot concept: saffron leather, double-density tread, weather shell, and a discreet MEIN frequency tab.", impact: "Factory and fulfillment decisions require a vetted manufacturer, safety testing, and signed production agreement.", available: false },
  { id: "M05", name: "Seven-Way Track Set", type: "Apparel", color: "#6B7C58", accent: "#FFB800", frequency: "444Hz", region: "Quad Grid", story: "A 485 GSM fleece concept carrying the four South Jersey coordinates through a seven-way, modular color language.", impact: "Proposed regional youth-design scholarship allocation requires a transparent selection and reporting process.", available: false },
  { id: "M06", name: "Factory Pass Archive Card", type: "Digital credential", color: "#0A192F", accent: "#00FF88", frequency: "528Hz", region: "Creator Network", story: "A non-financial digital credential concept for future studio access, limited drops, learning events, and production updates.", impact: "No token or NFT is issued by this prototype. Eligibility rules, legal review, and contract deployment remain required.", available: false },
];

const FILTERS = ["All", "Outerwear", "Layering", "Footwear concept", "Apparel", "Digital credential"];

export default function MeinLookbook() {
  useSovereignHeartbeat({ page: "mein-lookbook" });
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Look | null>(LOOKS[0]);
  const [email, setEmail] = useState("");

  const visibleLooks = useMemo(() => LOOKS.filter(look => filter === "All" || look.type === filter), [filter]);

  const registerInterest = () => {
    if (!email.includes("@")) {
      toast.error("Enter a valid email to receive MEIN launch updates.");
      return;
    }
    toast.success("Interest noted. Connect the guardian email engine before collecting production launch updates.");
    setEmail("");
  };

  return (
    <main className="min-h-screen pb-24" style={{ background: "#050B1A", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(255,184,0,0.22)", background: "radial-gradient(circle at 15% 20%, rgba(75,0,130,0.34), transparent 32%), radial-gradient(circle at 85% 10%, rgba(212,175,55,0.2), transparent 30%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-24">
          <div className="text-xs font-mono tracking-[0.2em]" style={{ color: "#D4AF37" }}>MEIN / PROPRIETARY COLLECTION CONCEPT / LOOKBOOK 001</div>
          <div className="mt-6 grid lg:grid-cols-[1.25fr_.75fr] gap-8 items-end">
            <div>
              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight">MEIN<br /><span style={{ color: "#D4AF37" }}>FUSION.</span></h1>
              <p className="mt-6 max-w-2xl leading-relaxed" style={{ color: "#B3C2D1" }}>A proprietary fashion, music, and city-culture lookbook built for future direct-to-customer drops. The collection uses original MEIN direction, South Jersey coordinates, and a transparent impact-design framework.</p>
            </div>
            <div className="rounded-3xl p-6 border" style={{ background: "rgba(5,11,26,0.52)", borderColor: "rgba(212,175,55,0.26)" }}>
              <div className="text-xs font-mono" style={{ color: "#00FF88" }}>COLLABORATION STATUS</div>
              <div className="mt-2 text-xl font-black">Partner-approval required</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "#9AABBC" }}>This concept does not claim an affiliation, endorsement, or license from any outside artist, label, or fashion company. Names, marks, and co-branding can be added only after written authorization.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {[["6", "Original looks"], ["4", "Frequency colorways"], ["7–10%", "Proposed impact allocation"], ["0", "Live products until configured"]].map(([value, label]) => <div key={label} className="rounded-xl px-4 py-3 border" style={{ borderColor: "rgba(255,255,255,0.13)", background: "rgba(255,255,255,0.035)" }}><div className="font-black" style={{ color: "#D4AF37" }}>{value}</div><div className="text-xs" style={{ color: "#91A2B4" }}>{label}</div></div>)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7">
          <div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>DROP 001</div><h2 className="mt-2 text-3xl font-black">Six original silhouettes</h2></div>
          <div className="flex gap-2 overflow-x-auto pb-1">{FILTERS.map(item => <button key={item} onClick={() => setFilter(item)} className="whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-transform active:scale-95" style={{ background: filter === item ? "#D4AF37" : "rgba(255,255,255,0.06)", color: filter === item ? "#050B1A" : "#D6E1EC" }}>{item}</button>)}</div>
        </div>
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {visibleLooks.map(look => <button key={look.id} onClick={() => setSelected(look)} className="text-left rounded-2xl p-5 border transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]" style={{ background: `linear-gradient(145deg, ${look.color}, #071120)`, borderColor: selected?.id === look.id ? look.accent : `${look.accent}35`, boxShadow: selected?.id === look.id ? `0 0 0 1px ${look.accent}, 0 18px 50px ${look.accent}22` : "none" }}>
              <div className="flex justify-between gap-3"><span className="text-xs font-mono" style={{ color: look.accent }}>{look.id} · {look.frequency}</span><span className="text-[10px] rounded-full px-2 py-1" style={{ color: "#A9B7C5", background: "rgba(255,255,255,0.08)" }}>{look.type}</span></div>
              <div className="mt-12 text-2xl font-black">{look.name}</div><div className="mt-2 text-xs" style={{ color: look.accent }}>{look.region}</div>
            </button>)}
          </div>
          {selected && <aside className="rounded-3xl p-6 md:p-8 border h-fit lg:sticky lg:top-8" style={{ borderColor: `${selected.accent}55`, background: "#081525" }}>
            <div className="flex items-center justify-between gap-4"><span className="text-xs font-mono" style={{ color: selected.accent }}>{selected.id} / {selected.frequency}</span><span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.06)", color: "#9AABBC" }}>CONCEPT</span></div>
            <h3 className="mt-5 text-3xl font-black">{selected.name}</h3><div className="mt-2 text-sm font-bold" style={{ color: selected.accent }}>{selected.type} · {selected.region}</div>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: "#B4C3D2" }}>{selected.story}</p>
            <div className="mt-6 rounded-2xl p-4" style={{ background: `${selected.accent}12`, border: `1px solid ${selected.accent}35` }}><div className="text-xs font-mono" style={{ color: selected.accent }}>IMPACT DESIGN NOTE</div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B4C3D2" }}>{selected.impact}</p></div>
            <button onClick={() => toast.message("Commerce unlock checklist", { description: "Add a licensed product catalog, manufacturer agreement, payment configuration, impact recipient agreement, and clear customer terms before checkout." })} className="mt-6 w-full rounded-xl py-3 text-sm font-black transition-transform active:scale-[0.98]" style={{ background: selected.accent, color: "#050B1A" }}>View commerce unlock checklist</button>
          </aside>}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-8"><div className="grid md:grid-cols-3 gap-4">
        {[{ icon: "1", title: "Original product package", copy: "Finalize technical packs, graded sizes, materials, safety specifications, pricing, and photographs." }, { icon: "2", title: "Verified commerce layer", copy: "Connect a real catalog and checkout only after merchant accounts, sales-tax handling, fulfillment, refunds, and customer support are configured." }, { icon: "3", title: "Transparent impact reporting", copy: "Publish contribution method, recipient agreements, reporting cadence, and confirmation receipts before making a customer-facing impact claim." }].map(step => <article key={step.icon} className="rounded-2xl p-6 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(0,212,255,0.16)" }}><div className="text-xl font-black" style={{ color: "#00D4FF" }}>{step.icon}</div><h3 className="mt-4 font-black">{step.title}</h3><p className="mt-2 text-sm leading-relaxed" style={{ color: "#91A2B4" }}>{step.copy}</p></article>)}
      </div></section>

      <section className="max-w-7xl mx-auto px-5 pt-8"><div className="rounded-3xl p-7 md:p-9 border grid lg:grid-cols-[1fr_auto] gap-7 items-center" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(212,175,55,0.08))", borderColor: "rgba(0,212,255,0.26)" }}><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>MEIN DROP SIGNAL</div><h2 className="mt-2 text-2xl md:text-3xl font-black">Receive transparent launch updates.</h2><p className="mt-3 text-sm max-w-2xl" style={{ color: "#B4C3D2" }}>This prototype does not transmit contact data until it is connected to the Guardian email engine. It exists to show the intended sign-up path and validation behavior.</p></div><div className="flex flex-col sm:flex-row gap-3"><input value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" className="rounded-xl px-4 py-3 text-sm outline-none border" style={{ background: "#050B1A", color: "white", borderColor: "rgba(0,212,255,0.3)" }}/><button onClick={registerInterest} className="rounded-xl px-5 py-3 font-black text-sm transition-transform active:scale-[0.98]" style={{ background: "#00D4FF", color: "#050B1A" }}>Join release updates</button></div></div></section>

      <section className="max-w-7xl mx-auto px-5 pt-8 text-center"><p className="text-xs max-w-3xl mx-auto" style={{ color: "#718497" }}>MEIN is a proprietary ScrollVerse concept. Any potential external partnership, label association, celebrity reference, token gate, product sale, or digital collectible must be independently authorized, documented, legally reviewed where applicable, and technically configured before public launch.</p><div className="mt-5 flex justify-center gap-3 flex-wrap"><Link href="/fashion-empire" className="rounded-lg px-4 py-2 text-xs font-bold border" style={{ borderColor: "rgba(255,107,53,0.35)", color: "#FF6B35" }}>Fashion Empire</Link><Link href="/atlantis-collection" className="rounded-lg px-4 py-2 text-xs font-bold border" style={{ borderColor: "rgba(0,255,212,0.35)", color: "#00FFD4" }}>#XLVblocks Atlantis</Link><Link href="/empire-index" className="rounded-lg px-4 py-2 text-xs font-bold border" style={{ borderColor: "rgba(212,175,55,0.35)", color: "#D4AF37" }}>Empire Index</Link></div></section>
    </main>
  );
}
