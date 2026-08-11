import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { ATLANTIS_CATALOG, type AtlantisCatalogItem } from "@/data/atlantisCatalog";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

const slotOrder = ["Outerwear", "Utility / Tailoring", "Pants", "Footwear"] as const;
type ConceptItemId = "atl-01" | "atl-02" | "atl-03" | "atl-04" | "atl-05" | "atl-06" | "atl-07";

function slotFor(item: AtlantisCatalogItem) {
  if (item.category === "Outerwear") return "Outerwear";
  if (item.category === "Utility" || item.category === "Tailoring") return "Utility / Tailoring";
  return item.category;
}

export default function FashionPortfolio() {
  useSovereignHeartbeat({ page: "fashion-portfolio" });
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const [selectedIds, setSelectedIds] = useState<ConceptItemId[]>(["atl-01", "atl-05", "atl-06"]);
  const [category, setCategory] = useState<"All" | AtlantisCatalogItem["category"]>("All");
  const [notice, setNotice] = useState<string | null>(null);
  const [lookTitle, setLookTitle] = useState("South Jersey / Atlantis Study");
  const [isPublic, setIsPublic] = useState(true);
  const { data: savedLookboards } = trpc.fashionLookboards.listMine.useQuery(undefined, { enabled: isAuthenticated });
  const { data: publicLookboards } = trpc.fashionLookboards.listPublic.useQuery({ limit: 6 });
  const saveLookboard = trpc.fashionLookboards.save.useMutation({
    onSuccess: async () => {
      await utils.fashionLookboards.listMine.invalidate();
      toast.success("Concept lookboard saved. No order, inventory, or checkout status changed.");
    },
    onError: error => toast.error(error.message),
  });
  const removeLookboard = trpc.fashionLookboards.remove.useMutation({
    onSuccess: async () => {
      await utils.fashionLookboards.listMine.invalidate();
      toast.success("Saved lookboard removed.");
    },
    onError: error => toast.error(error.message),
  });

  const filtered = useMemo(
    () => ATLANTIS_CATALOG.filter(item => category === "All" || item.category === category),
    [category],
  );
  const selectedItems = useMemo(
    () => ATLANTIS_CATALOG.filter(item => selectedIds.includes(item.id as ConceptItemId)),
    [selectedIds],
  );

  const togglePiece = (item: AtlantisCatalogItem) => {
    const slot = slotFor(item);
    const itemId = item.id as ConceptItemId;
    setSelectedIds(current => {
      const withoutSlot = current.filter(id => {
        const existing = ATLANTIS_CATALOG.find(piece => piece.id === id);
        return !existing || slotFor(existing) !== slot;
      });
      return current.includes(itemId) ? current.filter(id => id !== itemId) : [...withoutSlot, itemId];
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

  const saveCurrentLook = async () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (!selectedIds.length) {
      toast.error("Select at least one original concept piece before saving a lookboard.");
      return;
    }
    await saveLookboard.mutateAsync({ title: lookTitle.trim() || "Untitled Atlantis Concept", itemIds: selectedIds, isPublic });
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
              <div className="mt-4 rounded-xl p-3 border" style={{ background: "rgba(158,140,255,0.07)", borderColor: "rgba(158,140,255,0.22)" }}><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-mono tracking-widest" style={{ color: "#BBAFFF" }}>SUBMITTED MEDIA REVIEW</span><span className="text-[10px] font-bold" style={{ color: "#FFB800" }}>ADMIN-ONLY</span></div><p className="mt-2 text-[11px] leading-relaxed" style={{ color: "#A6B5C6" }}>Submitted visual and motion references are being reviewed for source, rights, and SKU fit. <strong>0 released product assets</strong> are shown here; candidates remain outside public pages, pricing, inventory, and checkout.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14 grid xl:grid-cols-[1fr_360px] gap-8">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>ORIGINAL LOOK BUILDER</div><h2 className="text-3xl font-black mt-2">Select one piece per layer.</h2></div><label className="text-xs font-bold" style={{ color: "#A6B5C6" }}>Filter catalogue<select value={category} onChange={event => setCategory(event.target.value as typeof category)} className="block mt-2 rounded-lg px-3 py-2 text-sm" style={{ background: "#091324", border: "1px solid rgba(0,212,255,0.25)", color: "white" }}><option value="All">All categories</option>{["Outerwear", "Tailoring", "Utility", "Footwear", "Pants"].map(option => <option key={option} value={option}>{option}</option>)}</select></label></div>
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(item => {
              const selected = selectedIds.includes(item.id as ConceptItemId);
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
          <div className="mt-3 rounded-2xl p-4 border" style={{ borderColor: "rgba(0,212,255,0.18)", background: "rgba(0,212,255,0.04)" }}>
            <div className="text-[10px] font-mono tracking-widest" style={{ color: "#00D4FF" }}>SAVE TO LOOKBOARD</div>
            <input value={lookTitle} onChange={event => setLookTitle(event.target.value)} maxLength={96} className="mt-3 w-full rounded-lg px-3 py-2 text-sm outline-none" style={{ background: "#050B1A", border: "1px solid rgba(255,255,255,0.12)", color: "white" }} aria-label="Lookboard title" />
            <label className="mt-3 flex items-center gap-2 text-xs" style={{ color: "#B8C7D6" }}><input type="checkbox" checked={isPublic} onChange={event => setIsPublic(event.target.checked)} /> Share this concept lookboard publicly</label>
            <button onClick={saveCurrentLook} disabled={saveLookboard.isPending || !selectedIds.length} className="w-full mt-3 rounded-lg px-3 py-2 text-xs font-black disabled:opacity-40" style={{ background: "#00D4FF", color: "#050B1A" }}>{isAuthenticated ? "Save Concept Lookboard" : "Sign In to Save"}</button>
            <p className="mt-2 text-[10px] leading-relaxed" style={{ color: "#8092A5" }}>Saved lookboards store only the selected original concept IDs and visibility setting.</p>
          </div>
          {isAuthenticated && savedLookboards?.length ? <div className="mt-4"><div className="text-[10px] font-mono" style={{ color: "#8FA0B1" }}>YOUR SAVED LOOKBOARDS</div><div className="mt-2 space-y-2">{savedLookboards.slice(0, 3).map((board: { id: number; title: string; itemIds: string[]; isPublic: boolean }) => <div key={board.id} className="rounded-xl px-3 py-2 flex items-center justify-between gap-2" style={{ background: "rgba(255,255,255,0.04)" }}><div className="min-w-0"><div className="truncate text-xs font-bold">{board.title}</div><div className="text-[10px]" style={{ color: "#8FA0B1" }}>{board.itemIds.length} pieces · {board.isPublic ? "public" : "private"}</div></div><button onClick={() => removeLookboard.mutate({ id: board.id })} disabled={removeLookboard.isPending} className="text-[10px] font-bold" style={{ color: "#FF7A7A" }}>Remove</button></div>)}</div></div> : null}
          {notice && <p className="mt-3 text-xs leading-relaxed" style={{ color: "#00FF88" }}>{notice}</p>}
          <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.18)" }}><div className="text-xs font-bold" style={{ color: "#FF6B35" }}>CONCEPT-ONLY BOUNDARY</div><p className="text-xs leading-relaxed mt-2" style={{ color: "#B8C7D6" }}>This builder supports creative exploration. It does not create an order, reserve inventory, quote a price, or represent a manufacturer, partner, or item as available.</p></div>
        </aside>
      </section>

      <section className="border-t border-b" style={{ borderColor: "rgba(0,212,255,0.12)", background: "rgba(0,212,255,0.018)" }}><div className="max-w-7xl mx-auto px-5 py-12"><div className="flex flex-wrap justify-between gap-4 items-end"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>PUBLIC CONCEPT LOOKBOARDS</div><h2 className="mt-2 text-3xl font-black">Guardian-built original studies.</h2></div><span className="text-xs" style={{ color: "#8FA0B1" }}>Concept records only · no prices or stock</span></div><div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{publicLookboards?.length ? publicLookboards.map((board: { id: number; title: string; creatorName: string; itemIds: string[] }) => <article key={board.id} className="rounded-2xl p-5 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.1)" }}><div className="text-[10px] font-mono" style={{ color: "#FFB800" }}>PUBLIC LOOKBOARD</div><h3 className="mt-2 font-black">{board.title}</h3><p className="mt-2 text-xs" style={{ color: "#A6B5C6" }}>By {board.creatorName} · {board.itemIds.length} selected original concepts</p><p className="mt-4 text-[10px]" style={{ color: "#77899A" }}>{board.itemIds.join(" · ").toUpperCase()}</p></article>) : <div className="sm:col-span-2 lg:col-span-3 rounded-2xl p-6 border text-sm" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#8FA0B1" }}>No public concept lookboards yet. Sign in, build a look, and choose public sharing to publish the first study.</div>}</div></div></section>

      <section className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,212,255,0.025)" }}><div className="max-w-7xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-5"><div><div className="text-xs font-mono" style={{ color: "#FFB800" }}>01 / ARCHIVE</div><h3 className="text-xl font-black mt-2">Every artifact, connected.</h3><p className="text-sm mt-3" style={{ color: "#A6B5C6" }}>Trace fashion, music, sacred knowledge, visual work, and platform artifacts through the Empire Index.</p><Link href="/empire-index" className="inline-block mt-4 text-sm font-bold" style={{ color: "#00D4FF" }}>Open Empire Index →</Link></div><div><div className="text-xs font-mono" style={{ color: "#FFB800" }}>02 / REVIEW</div><h3 className="text-xl font-black mt-2">Technical packs stay accountable.</h3><p className="text-sm mt-3" style={{ color: "#A6B5C6" }}>Each Atlantis record retains its source label, asset status, and production gate state.</p><Link href="/mein" className="inline-block mt-4 text-sm font-bold" style={{ color: "#00D4FF" }}>Review MEIN records →</Link></div><div><div className="text-xs font-mono" style={{ color: "#FFB800" }}>03 / LEGACY</div><h3 className="text-xl font-black mt-2">Iteration with respect.</h3><p className="text-sm mt-3" style={{ color: "#A6B5C6" }}>Explore the 3% rule as a study in original iteration, attribution, and lasting cultural design practice.</p><Link href="/virgil-abloh" className="inline-block mt-4 text-sm font-bold" style={{ color: "#00D4FF" }}>Visit Virgil Legacy →</Link></div></div></section>
    </main>
  );
}
