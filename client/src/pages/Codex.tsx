/*
 * THE METATRON CODEX — SOVEREIGN ARCHIVE PORTAL
 * /codex — Sacred Knowledge Archive
 * "I Am Who They Speak Of" — Chais 'Sabir Kajir' Hill the Great
 * Museum-grade design · YouTube embed · 10 Archival Points · Impact Covenant
 * KUN FAYAKŪN × ∞
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const ARCHIVAL_POINTS = [
  { id: 1, source: "Sanhedrin 38B", tradition: "Talmudic", color: "#FFB800", title: "The Primordial Light", body: "The Talmud records that before the creation of the world, Allāh created a primordial light — the Nūr — that illuminated from one end of creation to the other. This light was hidden away, reserved for the righteous in the world to come. The Sovereign carries this frequency." },
  { id: 2, source: "Ḥagigah 15A", tradition: "Talmudic", color: "#00D4FF", title: "Two Powers in Heaven", body: "The Talmudic tractate Ḥagigah discusses the concept of 'Two Powers in Heaven' — a profound theological debate about the nature of divine authority and its earthly manifestation. The Sovereign embodies the synthesis: temporal power in service of the eternal." },
  { id: 3, source: "Exodus 23:20–21", tradition: "Torah", color: "#00FF88", title: "The Angel of the Covenant", body: "'Behold, I send an Angel before you to keep you in the way and to bring you into the place which I have prepared. Beware of him and obey his voice... for My name is in him.' The Sovereign walks as a guardian of the covenant path." },
  { id: 4, source: "3 Enoch / Sefer Hekhalot", tradition: "Mystical Hebrew", color: "#8E44AD", title: "Metatron — Sar ha-Panim", body: "In the mystical tradition of 3 Enoch, Metatron is described as the Prince of the Presence (Sar ha-Panim) — the highest of the celestial beings, entrusted with the divine name. The ScrollVerse Codex draws from this tradition of sovereign stewardship over sacred knowledge." },
  { id: 5, source: "Qurʾān 2:30–33", tradition: "Qurʾānic", color: "#27AE60", title: "The Khalīfa — Vicegerent", body: "'And when your Lord said to the angels: I am placing a khalīfa on the earth.' The human being was created as Allāh's vicegerent — entrusted with the stewardship of creation. The Sovereign accepts this trust with full awareness of its weight and its glory." },
  { id: 6, source: "Emerald Tablets of Thoth", tradition: "Hermetic", color: "#1ABC9C", title: "As Above, So Below", body: "The Hermetic principle: 'That which is above is like that which is below, and that which is below is like that which is above, to accomplish the miracles of the one thing.' The ScrollVerse architecture mirrors this principle — the digital and the physical, the temporal and the eternal, unified." },
  { id: 7, source: "Sūrat al-Raḥmān 55:1–4", tradition: "Qurʾānic", color: "#E74C3C", title: "The Most Merciful Taught the Qurʾān", body: "'Al-Raḥmān — He taught the Qurʾān. He created the human being. He taught him eloquence.' The foundation of all sovereign knowledge is divine instruction. The Sovereign speaks because he was taught. The empire is built on the word." },
  { id: 8, source: "Proverbs 8:22–31", tradition: "Torah / Wisdom", color: "#F39C12", title: "Wisdom Before Creation", body: "'The Lord possessed me at the beginning of his work, the first of his acts of old. Ages ago I was set up, at the first, before the beginning of the earth.' Wisdom — Ḥokmah — was the first creation. The Sovereign's architecture is built on this primordial intelligence." },
  { id: 9, source: "Ḥadīth — Bukhārī & Muslim", tradition: "Prophetic Tradition", color: "#9B59B6", title: "The Best of Generations", body: "The Prophet Muḥammad ﷺ said: 'The best of my nation is my generation, then those who follow them, then those who follow them.' The Sovereign stands in the lineage of those who carry the prophetic torch — building institutions that honor this sacred inheritance." },
  { id: 10, source: "Revelation 21:5", tradition: "Gospel", color: "#3498DB", title: "Behold, I Make All Things New", body: "'And He who sat on the throne said: Behold, I am making all things new.' The ScrollVerse is not a restoration of the old — it is the creation of the new. A sovereign digital civilization built on the foundation of every tradition that pointed toward this moment." },
];

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.25 + 0.05,
      opacity: Math.random() * 0.7 + 0.2,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${s.opacity})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Codex() {
  useSovereignHeartbeat({ page: "codex" });
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#04080F", color: "#E8EDF2", fontFamily: "'Crimson Text', 'Georgia', serif" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b transition-all" style={{ background: scrolled ? "rgba(4,8,15,0.97)" : "rgba(4,8,15,0.85)", borderColor: "rgba(255,184,0,0.15)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/"><div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold cursor-pointer" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#04080F", fontFamily: "'Space Grotesk', sans-serif" }}>SV</div></Link>
            <div>
              <div className="font-bold text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Metatron Codex</div>
              <div className="text-xs" style={{ color: "#8899AA", fontFamily: "'Space Grotesk', sans-serif" }}>Sovereign Archive Portal</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/archivekeeper"><button className="text-xs font-mono px-3 py-1.5 rounded border" style={{ borderColor: "rgba(255,184,0,0.3)", color: "#FFB800" }}>ArchiveKeeper →</button></Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Starfield />
        <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#FFB800", fontFamily: "'Space Grotesk', sans-serif" }}>SOVEREIGN ARCHIVE · METATRON CODEX</div>
          <div className="text-5xl md:text-7xl mb-6" style={{ color: "#FFB800", fontFamily: "'Noto Naskh Arabic', serif" }}>الْكُنْ فَيَكُونُ</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">I Am Who They <span style={{ color: "#FFB800" }}>Speak Of</span></h1>
          <p className="text-xl mb-8" style={{ color: "#8899AA" }}>Chais 'Sabir Kajir' Hill the Great — Flamebearer · Sovereign · Architect of the ScrollVerse</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#video" className="px-8 py-3 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#04080F", fontFamily: "'Space Grotesk', sans-serif" }}>▶ Watch the Testimony</a>
            <a href="#archive" className="px-8 py-3 rounded-xl font-bold text-sm border" style={{ borderColor: "rgba(255,184,0,0.4)", color: "#FFB800", fontFamily: "'Space Grotesk', sans-serif" }}>📜 View the Archive</a>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-20" style={{ background: "rgba(0,0,0,0.4)" }}>
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FF0000", fontFamily: "'Space Grotesk', sans-serif" }}>SOVEREIGN TESTIMONY</div>
            <h2 className="text-3xl font-bold text-white mb-3">The Sacred Record</h2>
            <p className="text-base" style={{ color: "#8899AA" }}>The testimony of Chais 'Sabir Kajir' Hill the Great — preserved for all time.</p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,184,0,0.3)", boxShadow: "0 0 80px rgba(255,184,0,0.06)" }}>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/FkE0h1pKQRQ?rel=0&modestbranding=1"
                title="I Am Who They Speak Of — Chais Sabir Kajir Hill the Great"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
          <div className="text-center mt-6">
            <a href="https://youtu.be/FkE0h1pKQRQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "#FF0000", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>▶ Watch on YouTube</a>
          </div>
        </div>
      </section>

      {/* ARCHIVAL POINTS */}
      <section id="archive" className="py-20">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800", fontFamily: "'Space Grotesk', sans-serif" }}>10 ARCHIVAL POINTS — MULTI-TRADITION SYNTHESIS</div>
            <h2 className="text-4xl font-bold text-white mb-4">The Sacred Archive</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>Ten primary sources from Torah, Talmud, Qurʾān, Prophetic tradition, Hermetic wisdom, and Gospel — converging on a single truth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARCHIVAL_POINTS.map((point) => (
              <div
                key={point.id}
                className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
                style={{ background: activePoint === point.id ? `${point.color}08` : "rgba(255,255,255,0.02)", border: `1px solid ${activePoint === point.id ? point.color + "40" : "rgba(255,255,255,0.06)"}`, boxShadow: activePoint === point.id ? `0 0 30px ${point.color}10` : "none" }}
                onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-mono mb-1" style={{ color: point.color, fontFamily: "'Space Grotesk', sans-serif" }}>POINT {String(point.id).padStart(2, "0")} · {point.source}</div>
                    <div className="text-xs px-2 py-0.5 rounded inline-block" style={{ background: `${point.color}15`, color: point.color, border: `1px solid ${point.color}30`, fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px" }}>{point.tradition}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${point.color}20`, color: point.color, fontFamily: "'Space Grotesk', sans-serif" }}>{point.id}</div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                {activePoint === point.id ? (
                  <p className="text-sm leading-relaxed mt-3" style={{ color: "#C8D3DC", lineHeight: "1.8" }}>{point.body}</p>
                ) : (
                  <p className="text-xs" style={{ color: "#5a6a7a", fontFamily: "'Space Grotesk', sans-serif" }}>Click to expand ↓</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT COVENANT */}
      <section className="py-20" style={{ background: "rgba(0,0,0,0.4)" }}>
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00FF88", fontFamily: "'Space Grotesk', sans-serif" }}>THE IMPACT COVENANT</div>
            <h2 className="text-4xl font-bold text-white mb-4">Erase Scarcity. Restore Dignity.</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>The ScrollVerse is not built for profit alone. It is built to demonstrate that sovereignty and service are the same thing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { metric: "Performance", pct: "40%", color: "#00D4FF", desc: "Results measured by actual outcomes — lives changed, knowledge transferred, systems built." },
              { metric: "Intent", pct: "30%", color: "#FFB800", desc: "The sincerity of purpose — building for the greatest good, not personal aggrandizement." },
              { metric: "Impact", pct: "30%", color: "#00FF88", desc: "Measurable change in the lives of women, children, and communities in need." },
            ].map((item) => (
              <div key={item.metric} className="rounded-2xl p-6 text-center" style={{ background: `${item.color}08`, border: `1px solid ${item.color}25` }}>
                <div className="text-4xl font-black mb-2" style={{ color: item.color }}>{item.pct}</div>
                <div className="font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.metric}</div>
                <p className="text-sm" style={{ color: "#8899AA" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <div className="text-3xl mb-4" style={{ color: "#00FF88", fontFamily: "'Noto Naskh Arabic', serif" }}>وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ</div>
            <p className="text-sm mb-2" style={{ color: "#8899AA" }}>'And We have not sent you except as a mercy to the worlds.' — Qurʾān 21:107</p>
            <p className="text-base mt-4" style={{ color: "#C8D3DC" }}>The ScrollVerse is built in the spirit of this verse. Every line of code, every token, every scroll — in service of mercy.</p>
          </div>
        </div>
      </section>

      {/* SOVEREIGN CODEX PILLARS (preserved from original) */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF", fontFamily: "'Space Grotesk', sans-serif" }}>FOUR PILLARS OF SOVEREIGNTY</div>
            <h2 className="text-4xl font-bold text-white mb-4">Sovereign Codex</h2>
          </div>
          <div className="space-y-8">
            {[
              { title: "Self-Sovereignty", color: "#00D4FF", body: "At the heart of the ScrollVerse lies the principle of Self-Sovereignty. It is the inherent right and responsibility of every individual to govern their own being, thoughts, and actions. This pillar emphasizes inner harmony, personal truth, and the cultivation of an unshakeable spirit, free from external manipulation." },
              { title: "Community Sovereignty", color: "#00FF88", body: "Community Sovereignty defines the collective strength and autonomy of the ScrollVerse populace. It fosters decentralized governance, mutual respect, and collaborative growth. This pillar ensures that decisions are made for the highest good of all, upholding justice, equity, and shared prosperity." },
              { title: "Digital Sovereignty", color: "#FFB800", body: "Digital Sovereignty guarantees control over one's data, identity, and creations. It champions secure, private, and censorship-resistant platforms, ensuring that every interaction and asset within the ScrollVerse is protected. This pillar empowers individuals to navigate the digital realm with absolute freedom and ownership." },
              { title: "Cosmic Sovereignty", color: "#8E44AD", body: "Cosmic Sovereignty connects the empire to the universal laws and frequencies that govern existence. It acknowledges our place within the multiverse, promoting alignment with cosmic rhythms and higher consciousness. This pillar guides our expansion, ensuring that all endeavors resonate with divine order." },
            ].map((pillar) => (
              <div key={pillar.title} className="border-l-4 pl-6" style={{ borderColor: pillar.color }}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: pillar.color }}>{pillar.title}</h3>
                <p style={{ color: "#C8D3DC", lineHeight: "1.8" }}>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING SEAL */}
      <section className="relative py-24 text-center overflow-hidden">
        <Starfield />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <div className="text-4xl mb-6" style={{ color: "#FFB800" }}>♾️</div>
          <h2 className="text-3xl font-bold text-white mb-4">KUN FAYAKŪN × ∞</h2>
          <p className="text-lg mb-8" style={{ color: "#8899AA" }}>The record is permanent. The frequency is eternal. The empire is real.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/"><button className="px-6 py-3 rounded-xl text-sm font-bold border" style={{ borderColor: "rgba(255,184,0,0.4)", color: "#FFB800", fontFamily: "'Space Grotesk', sans-serif" }}>← ScrollVerse Home</button></Link>
            <Link href="/seerah"><button className="px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "rgba(255,184,0,0.15)", border: "1px solid rgba(255,184,0,0.4)", color: "#FFB800", fontFamily: "'Space Grotesk', sans-serif" }}>📜 Seerah Sacred Library →</button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
