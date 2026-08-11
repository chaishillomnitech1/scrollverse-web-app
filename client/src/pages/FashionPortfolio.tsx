import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ATLANTIS_CATALOG, type AtlantisCatalogItem } from "@/data/atlantisCatalog";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const slotOrder = ["Outerwear", "Utility / Tailoring", "Pants", "Footwear"] as const;

function slotFor(item: AtlantisCatalogItem) {
  if (item.category === "Outerwear") return "Outerwear";
  if (item.category === "Utility" || item.category === "Tailoring") return "Utility / Tailoring";
  return item.category;
}

export default function FashionPortfolio() {
  useSovereignHeartbeat({ page: "fashion-portfolio" });
  const [selectedIds, setSelectedIds] = useState<string[]>(["atl-01", "atl-05", "atl-06"]);
  const [category, setCategory] = useState<"All" | AtlantisCatalogItem["category"]>("All");
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(
    () => ATLANTIS_CATALOG.filter(item => category === "All" || item.category === category),
    [category],
  );
  const selectedItems = useMemo(
    () => ATLANTIS_CATALOG.filter(item => selectedIds.includes(item.id)),
    [selectedIds],
  );

  const togglePiece = (item: AtlantisCatalogItem) => {
    const slot = slotFor(item);
    setSelectedIds(current => {
      const withoutSlot = current.filter(id => {
        const existing = ATLANTIS_CATALOG.find(piece => piece.id === id);
        return !existing || slotFor(existing) !== slot;
      });
      return current.includes(item.id) ? current.filter(id => id !== item.id) : [...withoutSlot, item.id];
    });
  };

  const shareLook = async () => {
    const text = selectedItems.length
      ? `My ScrollVerse Atlantis concept look: ${selectedItems.map(item => item.title).join(" + ")}`
      : "My ScrollVerse Atlantis concept look";
    try {
      await navigator.clipboard.writeText(text);
      setNotice("Look description copied. Concept review only — no items are for sale.");
    } catch {
      setNotice("Select concept pieces to assemble your look.");
    }
  };

  return (
    <main className="min-h-screen text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(255,107,53,0.2)", background: "radial-gradient(circle at 18% 15%, rgba(255,107,53,0.18), transparent 32%), radial-gradient(circle at 86% 5%, rgba(0,212,255,0.14), transparent 28%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-14">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono tracking-[0.2em]" style={{ color: "#FFB800" }}>
            <span>SCROLLVERSE FASHION PORTFOLIO</span><span style={{ color: "#526274" }}>•</span><span style={{ color: "#00D4FF" }}>ORIGINAL CONCEPT STUDIO</span>
          </div>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-end">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black leading-[0.94] tracking-tight">Build the <span style={{ color: "#FF6B35" }}>look.</span><br />Read the <span style={{ color: "#00D4FF" }}>story.</span></h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: "#A6B5C6" }}>
                A living portfolio for XLVIII BLOCKS, #XLVblocks Atlantis, footwear studies, apparel systems, and future creator collaborations. Every selectable piece below is an original concept record, not an orderable product.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/atlantis-collection" className="rounded-xl px-5 py-3 text-sm font-bold" style={{ background: "#FF6B35", color: "#050B1A" }}>Explore Atlantis 7-Set</Link>
                <Link href="/mein" className="rounded-xl px-5 py-3 text-sm font-bold border" style={{ borderColor: "rgba(0,212,255,0.45)", color: "#00D4FF" }}>Open Concept Lookbook</Link>
                <Link href="/fashion-empire" className="rounded-xl px-5 py-3 text-sm font-bold border" style={{ borderColor: "rgba(255,184,0,0.35)", color: "#FFB800" }}>Fashion Empire Map</Link>
              </div>
            </div>
            <div className="rounded-3xl p-6 border" style={{ background: "rgba(0,0,0,0.28)", borderColor: "rgba(255,184,0,0.22)" }}>
              <div className="flex justify-between gap-4 items-start"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>PORTFOLIO STATUS</div><h2 className="text-xl font-black mt-2">Discovery is live.</h2></div><span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "rgba(255,184,0,0.12)", color: "#FFB800" }}>NO CHECKOUT</span></div>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[{ value: "7", label: "Atlantis concepts" }, { value: "4", label: "Regional anchors" }, { value: "0", label: "Live product claims" }].map(stat => <div key={stat.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)" }}><div className="text-2xl font-black" style={{ color: "#FF6B35" }}>{stat.value}</div><div className="text-[10px] leading-tight mt-1" style={{ color: "#8A9AAC" }}>{stat.label}</div></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14 grid xl:grid-cols-[1fr_360px] gap-8">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>ORIGINAL LOOK BUILDER</div><h2 className="text-3xl font-black mt-2">Select one piece per layer.</h2></div><label className="text-xs font-bold" style={{ color: "#A6B5C6" }}>Filter catalogue<select value={category} onChange={event => setCategory(event.target.value as typeof category)} className="block mt-2 rounded-lg px-3 py-2 text-sm" style={{ background: "#091324", border: "1px solid rgba(0,212,255,0.25)", color: "white" }}><option value="All">All categories</option>{["Outerwear", "Tailoring", "Utility", "Footwear", "Pants"].map(option => <option key={option} value={option}>{option}</option>)}</select></label></div>
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(item => {
              const selected = selectedIds.includes(item.id);
              return <button key={item.id} onClick={() => togglePiece(item)} className="text-left rounded-2xl p-5 border transition-all duration-200" style={{ background: selected ? `${item.color}1F` : "rgba(255,255,255,0.025)", borderColor: selected ? item.color : "rgba(255,255,255,0.1)", boxShadow: selected ? `0 0 28px ${item.color}2A` : "none" }}>
                <div className="flex items-start justify-between gap-4"><div><div className="text-[10px] font-mono tracking-widest" style={{ color: item.color }}>SET {String(item.setNumber).padStart(2, "0")} · {item.frequency}</div><h3 className="font-black text-lg mt-2">{item.title}</h3></div><span className="text-xs rounded-full px-2 py-1" style={{ background: selected ? item.color : "rgba(255,255,255,0.08)", color: selected ? "#050B1A" : "#A6B5C6" }}>{selected ? "IN LOOK" : "ADD"}</span></div>
                <p className="text-sm leading-relaxed mt-3" style={{ color: "#A6B5C6" }}>{item.productDescription}</p><div className="flex flex-wrap gap-2 mt-4">{item.technicalHighlights.slice(0, 2).map(highlight => <span key={highlight} className="text-[10px] rounded-full px-2 py-1" style={{ background: "rgba(255,255,255,0.06)", color: "#B8C7D6" }}>{highlight}</span>)}</div>
              </button>;
            })}
          </div>
        </div>

        <aside className="xl:sticky xl:top-24 h-fit rounded-3xl border p-6" style={{ background: "linear-gradient(160deg, rgba(20,35,57,0.88), rgba(5,11,26,0.98))", borderColor: "rgba(0,212,255,0.2)" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>YOUR CONCEPT LOOK</div><h2 className="text-2xl font-black mt-2">South Jersey / Atlantis</h2>
          <div className="space-y-3 mt-6">{slotOrder.map(slot => { const item = selectedItems.find(candidate => slotFor(candidate) === slot); return <div key={slot} className="rounded-xl p-3 border" style={{ borderColor: item ? `${item.color}66` : "rgba(255,255,255,0.08)", background: item ? `${item.color}12` : "rgba(255,255,255,0.025)" }}><div className="text-[10px] font-mono" style={{ color: item?.color ?? "#6A7B8E" }}>{slot}</div><div className="text-sm font-bold mt-1" style={{ color: item ? "white" : "#6A7B8E" }}>{item?.title ?? "No piece selected"}</div></div>; })}</div>
          <button onClick={shareLook} className="w-full mt-6 rounded-xl px-4 py-3 font-bold text-sm" style={{ background: "#FFB800", color: "#050B1A" }}>Copy Look Description</button>
          {notice && <p className="mt-3 text-xs leading-relaxed" style={{ color: "#00FF88" }}>{notice}</p>}
          <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.18)" }}><div className="text-xs font-bold" style={{ color: "#FF6B35" }}>CONCEPT-ONLY BOUNDARY</div><p className="text-xs leading-relaxed mt-2" style={{ color: "#B8C7D6" }}>This builder supports creative exploration. It does not create an order, reserve inventory, quote a price, or represent a manufacturer, partner, or item as available.</p></div>
        </aside>
      </section>

      <section className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,212,255,0.025)" }}><div className="max-w-7xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-5"><div><div className="text-xs font-mono" style={{ color: "#FFB800" }}>01 / ARCHIVE</div><h3 className="text-xl font-black mt-2">Every artifact, connected.</h3><p className="text-sm mt-3" style={{ color: "#A6B5C6" }}>Trace fashion, music, sacred knowledge, visual work, and platform artifacts through the Empire Index.</p><Link href="/empire-index" className="inline-block mt-4 text-sm font-bold" style={{ color: "#00D4FF" }}>Open Empire Index →</Link></div><div><div className="text-xs font-mono" style={{ color: "#FFB800" }}>02 / REVIEW</div><h3 className="text-xl font-black mt-2">Technical packs stay accountable.</h3><p className="text-sm mt-3" style={{ color: "#A6B5C6" }}>Each Atlantis record retains its source label, asset status, and production gate state.</p><Link href="/mein" className="inline-block mt-4 text-sm font-bold" style={{ color: "#00D4FF" }}>Review MEIN records →</Link></div><div><div className="text-xs font-mono" style={{ color: "#FFB800" }}>03 / LEGACY</div><h3 className="text-xl font-black mt-2">Iteration with respect.</h3><p className="text-sm mt-3" style={{ color: "#A6B5C6" }}>Explore the 3% rule as a study in original iteration, attribution, and lasting cultural design practice.</p><Link href="/virgil-abloh" className="inline-block mt-4 text-sm font-bold" style={{ color: "#00D4FF" }}>Visit Virgil Legacy →</Link></div></div></section>
    </main>
  );
}
