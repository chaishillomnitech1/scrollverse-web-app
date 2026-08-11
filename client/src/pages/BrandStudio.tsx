import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { INDEPENDENT_FASHION_BRANDS } from "@/data/independentFashion";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

export default function BrandStudio() {
  useSovereignHeartbeat({ page: "fashion-studio" });
  const [brandId, setBrandId] = useState(INDEPENDENT_FASHION_BRANDS[0].id);
  const [accent, setAccent] = useState("#00D4FF");
  const brand = INDEPENDENT_FASHION_BRANDS.find(candidate => candidate.id === brandId) ?? INDEPENDENT_FASHION_BRANDS[0];
  const generatedLabel = useMemo(() => `${brand.name} / ORIGINAL ACCENT`, [brand.name]);

  const copyPalette = async () => {
    const colors = [...brand.colorways.map(color => `${color.name}: ${color.hex}`), `Original accent: ${accent}`].join(" · ");
    try {
      await navigator.clipboard.writeText(`${generatedLabel} — ${colors}`);
      toast.success("Original colorway study copied. This does not create a product or partnership.");
    } catch {
      toast.error("Copy is unavailable in this browser. The palette remains visible here.");
    }
  };

  return (
    <main className="min-h-screen text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(255,184,0,0.22)", background: "radial-gradient(circle at 78% 18%, rgba(255,184,0,0.16), transparent 30%), radial-gradient(circle at 10% 30%, rgba(0,212,255,0.13), transparent 28%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-14">
          <div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#FFB800" }}>INDEPENDENT FASHION STUDIO · ORIGINAL FIRST</div>
          <div className="mt-5 grid lg:grid-cols-[1.2fr_0.8fr] gap-9 items-end">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black leading-[0.93] tracking-tight">Every house can<br /><span style={{ color: "#00D4FF" }}>stand on its own.</span></h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: "#A6B5C6" }}>Explore independent ScrollVerse fashion languages before any optional fusion. Build original color systems, compare visual DNA, and carry each concept through the protected review workflow when the time is right.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/fashion-portfolio" className="rounded-xl px-5 py-3 text-sm font-bold" style={{ background: "#FFB800", color: "#050B1A" }}>Build a Concept Look</Link>
                <Link href="/journey" className="rounded-xl px-5 py-3 text-sm font-bold border" style={{ borderColor: "rgba(0,212,255,0.42)", color: "#00D4FF" }}>Open ScrollVerse Journey</Link>
              </div>
            </div>
            <div className="rounded-3xl p-6 border" style={{ background: "rgba(0,0,0,0.28)", borderColor: "rgba(0,212,255,0.2)" }}>
              <div className="text-[10px] font-mono tracking-widest" style={{ color: "#00FF88" }}>BRAND-FIRST GUARANTEE</div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>Independent concepts stay visible, reviewable, and evolvable without relying on third-party marks, manufacturers, inventory, or checkout claims. Optional fusion work is a separate documented lane.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-14 grid xl:grid-cols-[0.82fr_1.18fr] gap-8">
        <aside className="rounded-3xl border p-5 h-fit" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.025)" }}>
          <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>INDEPENDENT HOUSES</div>
          <div className="mt-4 space-y-2">
            {INDEPENDENT_FASHION_BRANDS.map(candidate => {
              const active = candidate.id === brand.id;
              return <button key={candidate.id} onClick={() => setBrandId(candidate.id)} className="w-full text-left rounded-2xl p-4 border transition-all" style={{ borderColor: active ? "#00D4FF" : "rgba(255,255,255,0.09)", background: active ? "rgba(0,212,255,0.1)" : "rgba(0,0,0,0.16)" }}>
                <div className="font-black" style={{ color: active ? "#00D4FF" : "white" }}>{candidate.name}</div>
                <div className="mt-1 text-[11px]" style={{ color: "#8FA0B1" }}>{candidate.legalLabel}</div>
              </button>;
            })}
          </div>
          <div className="mt-6 rounded-xl p-4" style={{ background: "rgba(255,184,0,0.07)", border: "1px solid rgba(255,184,0,0.2)" }}><div className="text-[10px] font-mono" style={{ color: "#FFB800" }}>FUSION BOUNDARY</div><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B8C7D6" }}>A name, mark, material claim, supplier, or collaboration becomes public only after separate authorization and review. It is never required for original collection development.</p></div>
        </aside>

        <div>
          <div className="rounded-3xl border p-7" style={{ borderColor: "rgba(0,212,255,0.2)", background: "linear-gradient(150deg, rgba(14,33,53,0.9), rgba(5,11,26,0.98))" }}>
            <div className="flex flex-wrap items-start justify-between gap-5"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>{brand.legalLabel.toUpperCase()}</div><h2 className="mt-2 text-4xl font-black">{brand.name}</h2><p className="mt-4 max-w-2xl text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{brand.origin}</p></div><div className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: "rgba(0,255,136,0.12)", color: "#00FF88" }}>INDEPENDENT CONCEPT SYSTEM</div></div>
            <blockquote className="mt-6 rounded-2xl p-4 text-sm italic" style={{ background: "rgba(255,255,255,0.035)", color: "#D9E4F0" }}>“{brand.statement}”</blockquote>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">{brand.colorways.map(colorway => <article key={colorway.name} className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.09)", background: "rgba(0,0,0,0.18)" }}><div className="h-20" style={{ background: `linear-gradient(120deg, ${colorway.hex}, ${accent})` }} /><div className="p-4"><div className="font-black">{colorway.name}</div><div className="mt-1 text-xs" style={{ color: "#A6B5C6" }}>{colorway.note}</div><div className="mt-3 text-[10px] font-mono" style={{ color: colorway.hex }}>{colorway.hex}</div></div></article>)}</div>
          </div>

          <section className="mt-7 rounded-3xl border p-7" style={{ borderColor: "rgba(255,184,0,0.22)", background: "rgba(255,184,0,0.035)" }}>
            <div className="flex flex-wrap justify-between gap-4 items-end"><div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>COLORWAY LAB</div><h3 className="mt-2 text-2xl font-black">Compose an original accent study.</h3><p className="mt-2 text-sm" style={{ color: "#A6B5C6" }}>This tool creates a temporary visual study only. It does not mint, manufacture, reserve, or list a product.</p></div><button onClick={copyPalette} className="rounded-xl px-4 py-3 text-xs font-black" style={{ background: "#FFB800", color: "#050B1A" }}>Copy Study</button></div>
            <div className="mt-6 flex flex-wrap items-center gap-4"><label className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(0,0,0,0.24)", border: "1px solid rgba(255,255,255,0.1)" }}><input aria-label="Original accent color" type="color" value={accent} onChange={event => setAccent(event.target.value)} className="w-9 h-9 bg-transparent" /><span className="text-xs font-mono" style={{ color: "#B8C7D6" }}>{accent.toUpperCase()}</span></label><div className="flex-1 min-w-[180px] rounded-xl p-4" style={{ background: `linear-gradient(115deg, ${brand.colorways[0].hex}, ${accent})` }}><div className="text-[10px] font-mono" style={{ color: "#050B1A" }}>{generatedLabel}</div><div className="mt-1 font-black" style={{ color: "#050B1A" }}>Independent colorway exploration</div></div></div>
            <div className="mt-6 flex flex-wrap gap-3">{brand.routes.map(route => <Link key={route.href} href={route.href} className="rounded-lg px-4 py-2 text-xs font-bold border" style={{ borderColor: "rgba(0,212,255,0.28)", color: "#00D4FF" }}>{route.label} →</Link>)}</div>
          </section>
        </div>
      </section>
    </main>
  );
}
