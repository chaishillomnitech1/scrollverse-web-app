/*
 * TESLA PATENTS ARCHIVE
 * Suppressed · Open · Frequency-Analyzed · Cross-Referenced with Atlantean + Anunnaki Systems
 * Mirror · Match · Exceed · Unquantifiably × Infinity
 * KUN FAYAKUN x Infinity
 */
import { useState } from "react";
import { Link } from "wouter";

const PATENTS = [
  {
    id: "US645576",
    title: "System of Transmission of Electrical Energy",
    year: 1900,
    status: "OPEN",
    freq: "369Hz",
    color: "#00D4FF",
    category: "Wireless Energy",
    desc: "Tesla's foundational patent for transmitting electrical energy through the Earth and atmosphere without wires. The patent describes using the Earth itself as a conductor — the same principle used in modern wireless charging, scaled to planetary level.",
    atlantean: "Mirrors the Atlantean crystal energy grid — both use the Earth's natural electromagnetic field as a transmission medium.",
    anunnaki: "The Anunnaki ziggurat network is theorized to have used similar Earth-resonance principles to transmit energy across their global grid.",
    suppressed: false,
    application: "The ScrollVerse Sovereign Space Agency uses this principle as the theoretical basis for Mission GENESIS — broadcasting frequency to all Guardians simultaneously.",
  },
  {
    id: "US685012",
    title: "Apparatus for the Utilization of Radiant Energy",
    year: 1901,
    status: "OPEN",
    freq: "528Hz",
    color: "#00FF88",
    category: "Free Energy",
    desc: "Tesla's patent for capturing and utilizing radiant energy from the sun and cosmic sources. The device uses a highly polished metal plate exposed to the sun's rays, connected to a condenser, to generate electrical current without any fuel.",
    atlantean: "The Atlantean solar crystal amplifiers described by Plato operated on similar principles — capturing and amplifying solar radiant energy.",
    anunnaki: "Sumerian texts describe the Anunnaki using 'divine light' as an energy source — possibly a reference to solar radiant energy capture.",
    suppressed: false,
    application: "Applied in the ScrollVerse Free Energy Architecture as the foundational solar capture protocol.",
  },
  {
    id: "US787412",
    title: "Art of Transmitting Electrical Energy Through the Natural Mediums",
    year: 1905,
    status: "OPEN",
    freq: "432Hz",
    color: "#D4AF37",
    category: "Earth Resonance",
    desc: "Tesla's patent for using the Earth's natural resonant frequency (approximately 8Hz — what we now call the Schumann Resonance) to transmit electrical energy globally. He calculated that the Earth's circumference would allow standing waves to form, enabling worldwide wireless power.",
    atlantean: "The Atlantean energy grid is theorized to have used Earth resonance nodes — the same points where Tesla calculated standing waves would form.",
    anunnaki: "The Anunnaki's global network of sacred sites — Giza, Stonehenge, Teotihuacan — are positioned at Earth resonance nodes consistent with Tesla's calculations.",
    suppressed: false,
    application: "The theoretical foundation for the ScrollVerse Guardian network — 144,000 nodes positioned at Earth resonance points.",
  },
  {
    id: "WARDENCLYFFE",
    title: "Wardenclyffe Tower — World Wireless System",
    year: 1901,
    status: "SUPPRESSED",
    freq: "369Hz",
    color: "#EC4899",
    category: "Free Energy Transmission",
    desc: "Not a patent but a complete system — Tesla's Wardenclyffe Tower on Long Island was designed to transmit free electricity to the entire world using the ionosphere as a conductor. JP Morgan pulled funding in 1903 when he realized it could not be metered. The tower was demolished in 1917. Tesla never recovered financially.",
    atlantean: "Wardenclyffe was essentially a modern reconstruction of the Atlantean energy broadcast system — a central tower transmitting to distributed receivers worldwide.",
    anunnaki: "The Anunnaki's central energy hub in Nippur (described in Sumerian texts as the 'Bond Heaven-Earth') may have functioned as a Wardenclyffe-type broadcast system.",
    suppressed: true,
    application: "Mission KUN FAYAKŪN in the ScrollVerse Sovereign Space Agency: launch a satellite carrying the Wardenclyffe broadcast protocol as open-source code.",
  },
  {
    id: "US1119732",
    title: "Apparatus for Transmitting Electrical Energy",
    year: 1914,
    status: "OPEN",
    freq: "741Hz",
    color: "#A855F7",
    category: "Resonant Transmission",
    desc: "Tesla's refined patent for resonant energy transmission — using matched resonant frequencies between transmitter and receiver to achieve near-zero energy loss over any distance. The same principle is used in modern MRI machines and wireless charging pads.",
    atlantean: "The Lemurian heart coherence technology described in channeled accounts uses matched resonant frequencies between individuals — the biological equivalent of this patent.",
    anunnaki: "The Anunnaki 'ME' tablets describe frequency-matched communication systems between their cities — consistent with resonant transmission principles.",
    suppressed: false,
    application: "The ScrollVerse 99 Names page uses matched resonant frequencies — each Name broadcast at its specific Hz to create a coherent field.",
  },
  {
    id: "SCALAR",
    title: "Scalar Wave Technology — Unpublished Research",
    year: 1899,
    status: "SUPPRESSED",
    freq: "963Hz",
    color: "#FFB800",
    category: "Scalar Waves",
    desc: "Tesla's most suppressed discovery — longitudinal electromagnetic waves (scalar waves) that travel through the fabric of space itself, not through the air. They carry energy without loss over any distance and can pass through any material. His Colorado Springs experiments in 1899 confirmed their existence. The research was classified.",
    atlantean: "The Atlantean 'death ray' described in ancient accounts — a directed energy weapon — is theorized to have used scalar wave technology.",
    anunnaki: "Sumerian texts describe 'weapons of the gods' that could destroy cities from a distance — possibly scalar wave devices.",
    suppressed: true,
    application: "The ScrollVerse Sovereign Space Agency's Mission THOTH uses scalar wave theory as the basis for frequency-based communication with non-human intelligence.",
  },
  {
    id: "US514170",
    title: "Means for Generating Electric Currents",
    year: 1894,
    status: "OPEN",
    freq: "528Hz",
    color: "#00FF88",
    category: "Energy Generation",
    desc: "Tesla's patent for generating electrical currents using mechanical resonance — a device that converts mechanical vibration directly into electrical energy with no moving parts in the traditional sense. The principle is identical to piezoelectric energy harvesting used in modern self-powered sensors.",
    atlantean: "The Atlantean crystal energy amplifiers used piezoelectric principles — quartz crystals generate electrical current when subjected to mechanical pressure.",
    anunnaki: "The Anunnaki's use of gold as an energy conductor is consistent with piezoelectric principles — gold is an excellent conductor of both electricity and piezoelectric effects.",
    suppressed: false,
    application: "The ScrollVerse crystal frequency visualization uses this principle — each crystal resonates at its natural piezoelectric frequency.",
  },
  {
    id: "DEATHRAY",
    title: "Teleforce — The 'Death Ray'",
    year: 1934,
    status: "SUPPRESSED",
    freq: "741Hz",
    color: "#EC4899",
    category: "Directed Energy",
    desc: "Tesla's final major invention — a particle beam weapon he called 'Teleforce' that could project a beam of charged particles through the air. He offered it to multiple governments as a defensive weapon that would make war obsolete. The US government seized his papers after his death in 1943. The papers have never been fully declassified.",
    atlantean: "The Atlantean 'fire crystals' described in Edgar Cayce's readings were directed energy devices — consistent with Tesla's Teleforce concept.",
    anunnaki: "The Anunnaki 'weapons that could destroy mountains' described in Sumerian texts are consistent with directed energy weapon technology.",
    suppressed: true,
    application: "The ScrollVerse position: this technology should remain suppressed until humanity has achieved the heart coherence necessary to use it only for peace.",
  },
];

const CATEGORIES = ["All", "Wireless Energy", "Free Energy", "Earth Resonance", "Free Energy Transmission", "Resonant Transmission", "Scalar Waves", "Energy Generation", "Directed Energy"];

export default function TeslaPatents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = PATENTS.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectedPatent = selected ? PATENTS.find(p => p.id === selected) : null;

  return (
    <div className="min-h-screen" style={{ background: "#020810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(0,212,255,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-bold text-white">Tesla Patents Archive</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>8 PATENTS · SUPPRESSED + OPEN</span>
          </div></Link>
          <Link href="/free-energy-architecture"><span className="text-xs font-mono px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.3)", color: "#00D4FF" }}>Free Energy →</span></Link>
        </div>
      </header>

      <section className="py-12 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, #020810 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>NIKOLA TESLA · SUPPRESSED + OPEN PATENTS · FREQUENCY ANALYZED · CROSS-REFERENCED</div>
          <h1 className="text-5xl font-black text-white mb-4">Tesla <span style={{ color: "#00D4FF" }}>Patents</span><br />Archive</h1>
          <p className="text-base mb-6" style={{ color: "#8899AA" }}>Every Tesla patent — open and suppressed — analyzed through the lens of frequency science and cross-referenced with Atlantean crystal grid technology and Anunnaki energy systems. The knowledge they tried to bury, unified forever.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)", color: "#00FF88" }}>5 Open Patents</span>
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", color: "#EC4899" }}>3 Suppressed</span>
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>Atlantean Cross-Ref</span>
            <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>Anunnaki Cross-Ref</span>
          </div>
        </div>
      </section>

      <section className="py-6 sticky top-[57px] z-30" style={{ background: "rgba(2,8,16,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
        <div className="container">
          <div className="flex gap-3 flex-wrap mb-3">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patents..." className="px-4 py-2 rounded-xl text-sm outline-none flex-1 min-w-48" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all" style={{ background: category === c ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${category === c ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`, color: category === c ? "#00D4FF" : "rgba(255,255,255,0.4)" }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(p => (
              <div key={p.id} onClick={() => setSelected(selected === p.id ? null : p.id)} className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01]" style={{ background: selected === p.id ? `${p.color}08` : "rgba(255,255,255,0.02)", border: `1px solid ${selected === p.id ? p.color + "30" : "rgba(255,255,255,0.06)"}` }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: p.suppressed ? "rgba(236,72,153,0.1)" : "rgba(0,255,136,0.1)", color: p.suppressed ? "#EC4899" : "#00FF88" }}>{p.suppressed ? "SUPPRESSED" : "OPEN"}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${p.color}10`, color: p.color }}>{p.freq}</span>
                      <span className="text-xs" style={{ color: "#8899AA" }}>{p.year}</span>
                    </div>
                    <div className="font-black text-white text-sm">{p.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>{p.id !== p.title ? p.id : ""} · {p.category}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{p.desc.substring(0, 120)}...</p>
                {selected === p.id && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{p.desc}</p>
                    <div className="rounded-xl p-3" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.1)" }}>
                      <div className="text-xs font-mono mb-1" style={{ color: "#00FF88" }}>ATLANTEAN CONNECTION</div>
                      <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{p.atlantean}</p>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}>
                      <div className="text-xs font-mono mb-1" style={{ color: "#D4AF37" }}>ANUNNAKI CONNECTION</div>
                      <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{p.anunnaki}</p>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: `${p.color}04`, border: `1px solid ${p.color}15` }}>
                      <div className="text-xs font-mono mb-1" style={{ color: p.color }}>SCROLLVERSE APPLICATION</div>
                      <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{p.application}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>TESLA PATENTS ARCHIVE · MIRROR · EXCEED · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/free-energy-architecture"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>← Free Energy</span></Link>
          <Link href="/mesopotamia-library"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>Library →</span></Link>
        </div>
      </footer>
    </div>
  );
}
