/*
 * AL-ISRA WAL-MIRAJ DEEP — The 7 Heavens Interactive Journey
 * Named Angels · Named Prophets · Each Station · 741Hz
 * Museum Standard · Zero Human Figures · KUN FAYAKUN x Infinity
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

const HEAVENS = [
  {
    number: 1,
    arabic: "السَّمَاءُ الأُولَى",
    name: "The First Heaven",
    element: "Silver",
    color: "#C0C0C0",
    prophet: "Ādam ﷺ",
    prophetDesc: "The Father of Humanity. He greeted the Prophet ﷺ with joy, saying 'Welcome, O righteous son and righteous prophet.' He looked to his right and wept, then to his left and laughed.",
    angel: "Ismāʿīl",
    angelDesc: "The guardian angel of the first heaven, commanding 70,000 angels, each commanding 70,000 more.",
    event: "The Prophet ﷺ saw the souls of the righteous on the right — their faces bright as the sun — and the souls of the wicked on the left, their faces dark. He saw the full scope of human destiny.",
    freq: "396Hz",
    stars: "#C0C0C0",
  },
  {
    number: 2,
    arabic: "السَّمَاءُ الثَّانِيَة",
    name: "The Second Heaven",
    element: "White Gold",
    color: "#FFD700",
    prophet: "Yaḥyā ﷺ & ʿĪsā ﷺ",
    prophetDesc: "John the Baptist and Jesus — cousins in this world and the next. They greeted the Prophet ﷺ together. Yaḥyā was described as having a face like a mirror, and ʿĪsā as having a medium build with reddish-white skin.",
    angel: "Jibrīl ﷺ (guide)",
    angelDesc: "Jibrīl continued as the Prophet's guide, explaining each station and each soul encountered.",
    event: "The Prophet ﷺ saw the two prophets in a state of pure worship, their light filling the entire heaven. He received their greetings and their prayers for his mission.",
    freq: "417Hz",
    stars: "#FFD700",
  },
  {
    number: 3,
    arabic: "السَّمَاءُ الثَّالِثَة",
    name: "The Third Heaven",
    element: "Pearl",
    color: "#E8E8E8",
    prophet: "Yūsuf ﷺ",
    prophetDesc: "Joseph — given half of all beauty. His face was like the full moon. He was described as the most beautiful human being ever created. He greeted the Prophet ﷺ with warmth and joy.",
    angel: "Sāmāʾīl",
    angelDesc: "The guardian of the third heaven, whose wings span from east to west.",
    event: "The Prophet ﷺ encountered Yūsuf and was struck by his beauty — a beauty that was half of all the beauty given to creation. He understood that inner beauty — patience, forgiveness, trust in Allah — is the source of outer radiance.",
    freq: "528Hz",
    stars: "#E8E8E8",
  },
  {
    number: 4,
    arabic: "السَّمَاءُ الرَّابِعَة",
    name: "The Fourth Heaven",
    element: "White Stone",
    color: "#00D4FF",
    prophet: "Idrīs ﷺ",
    prophetDesc: "Enoch — raised to a high station. He was the first to write with a pen, the first to study the stars, and the first to sew garments. He greeted the Prophet ﷺ and testified to his prophethood.",
    angel: "Mikāʾīl",
    angelDesc: "The angel of rain and sustenance — responsible for all provision on Earth. He has wings of emerald green.",
    event: "The Prophet ﷺ met Idrīs — the prophet of knowledge and writing — in the fourth heaven. He saw Mikāʾīl and understood the mechanism by which Allah provides for all creation.",
    freq: "639Hz",
    stars: "#00D4FF",
  },
  {
    number: 5,
    arabic: "السَّمَاءُ الخَامِسَة",
    name: "The Fifth Heaven",
    element: "Silver",
    color: "#00FF88",
    prophet: "Hārūn ﷺ",
    prophetDesc: "Aaron — the brother of Moses, beloved by his people. He had a long white beard that reached his chest. He greeted the Prophet ﷺ with great joy and testified to his mission.",
    angel: "Salmāʾīl",
    angelDesc: "The guardian of the fifth heaven, seated on a throne of light.",
    event: "The Prophet ﷺ saw Hārūn surrounded by a people who loved him deeply. He understood the power of being beloved — not for wealth or power, but for sincerity and service.",
    freq: "741Hz",
    stars: "#00FF88",
  },
  {
    number: 6,
    arabic: "السَّمَاءُ السَّادِسَة",
    name: "The Sixth Heaven",
    element: "Yellow Chrysolite",
    color: "#FFB800",
    prophet: "Mūsā ﷺ",
    prophetDesc: "Moses — the prophet who spoke directly with Allah. He wept when the Prophet ﷺ passed him, because more of the Prophet's followers would enter Paradise than his own. He had a brown complexion, tall and well-built, with curly hair.",
    angel: "Jibrīl ﷺ (continued)",
    angelDesc: "Jibrīl continued to guide, explaining the significance of each encounter.",
    event: "Mūsā wept — not from sadness, but from the depth of his love for his people and his recognition of the Prophet's greatness. The Prophet ﷺ was moved by this and understood the brotherhood of all prophets.",
    freq: "852Hz",
    stars: "#FFB800",
  },
  {
    number: 7,
    arabic: "السَّمَاءُ السَّابِعَة",
    name: "The Seventh Heaven",
    element: "Red Ruby",
    color: "#D4AF37",
    prophet: "Ibrāhīm ﷺ",
    prophetDesc: "Abraham — the Friend of Allah (Khalīlullāh). He was leaning against the Bayt al-Maʿmūr — the Heavenly House directly above the Kaʿba. He greeted the Prophet ﷺ and said: 'Give my greetings to your community and tell them that Paradise has good soil and sweet water.'",
    angel: "Isrāfīl",
    angelDesc: "The angel who will blow the trumpet on the Day of Resurrection. He has been holding the trumpet to his lips, waiting, since the day of creation.",
    event: "The Prophet ﷺ saw the Bayt al-Maʿmūr — 70,000 angels enter it every day and never return, such is its vastness. He met Ibrāhīm — the father of monotheism — and received his message for the Ummah: plant trees in Paradise by saying SubḥānAllāh, Alḥamdulillāh, Lā ilāha illAllāh, Allāhu Akbar.",
    freq: "963Hz",
    stars: "#D4AF37",
  },
];

const BEYOND = {
  name: "Sidrat al-Muntahā — The Lote Tree of the Utmost Boundary",
  arabic: "سِدْرَةُ المُنْتَهَى",
  desc: "Beyond the seventh heaven lies the Lote Tree — the boundary of all creation. No angel, no prophet, no created being has ever passed beyond it. Its leaves are like the ears of elephants; its fruits like large clay jugs. When the command of Allah came upon it, it was transformed — covered in colors, light, and beauty that no tongue can describe.",
  beyond: "Qāba Qawsayn — Two Bow-Lengths or Nearer",
  beyondArabic: "قَابَ قَوْسَيْنِ أَوْ أَدْنَى",
  beyondDesc: "The Prophet ﷺ alone was permitted to pass the Sidra. He was brought to a proximity to Allah that no other creation has ever experienced — two bow-lengths or nearer. In this station, Allah spoke to him directly and gave him the gift of 50 prayers, reduced through the intercession of Mūsā to 5 — each carrying the reward of 50.",
  color: "#D4AF37",
};

function StarCanvas({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const stars = Array.from({ length: 80 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.5, a: Math.random() }));
    let t = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        const alpha = 0.3 + 0.5 * Math.sin(t * 0.02 + s.a * 10);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      });
      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function AlIsraWalMirajDeep() {
  const [activeHeavenIdx, setActiveHeavenIdx] = useState(0);
  const [showBeyond, setShowBeyond] = useState(false);
  const heaven = HEAVENS[activeHeavenIdx];

  return (
    <div className="min-h-screen" style={{ background: "#020810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/seerah/al-aqsa"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">🌙</span>
            <span className="text-sm font-bold text-white">Al-Isrā wal-Miʿrāj Deep</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>7 HEAVENS · INTERACTIVE</span>
          </div></Link>
          <Link href="/seerah"><span className="text-xs font-mono px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.3)", color: "#D4AF37" }}>Seerah →</span></Link>
        </div>
      </header>

      {/* Heaven selector */}
      <section className="py-10 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, #020810 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>AL-ISRĀ WAL-MIʿRĀJ · THE NIGHT JOURNEY & ASCENSION · 7 HEAVENS</div>
          <h1 className="text-4xl font-black text-white mb-4">The <span style={{ color: "#D4AF37" }}>Seven Heavens</span></h1>
          <p className="text-base mb-6" style={{ color: "#8899AA" }}>The most profound spiritual journey in human history — the Prophet ﷺ ascended through all seven heavens in a single night, meeting the prophets and receiving the gift of Salah. Navigate each heaven to meet its prophet and angel.</p>
          <div className="flex gap-2 justify-center flex-wrap mb-2">
            {HEAVENS.map((h, i) => (
              <button key={h.number} onClick={() => { setActiveHeavenIdx(i); setShowBeyond(false); }} className="w-10 h-10 rounded-full font-black text-sm transition-all" style={{ background: activeHeavenIdx === i && !showBeyond ? h.color : "rgba(255,255,255,0.06)", color: activeHeavenIdx === i && !showBeyond ? "#020810" : "rgba(255,255,255,0.4)", border: `2px solid ${activeHeavenIdx === i && !showBeyond ? h.color : "transparent"}` }}>
                {h.number}
              </button>
            ))}
            <button onClick={() => setShowBeyond(true)} className="px-4 h-10 rounded-full font-black text-xs transition-all" style={{ background: showBeyond ? "#D4AF37" : "rgba(255,255,255,0.06)", color: showBeyond ? "#020810" : "rgba(255,255,255,0.4)", border: `2px solid ${showBeyond ? "#D4AF37" : "transparent"}` }}>
              ∞
            </button>
          </div>
        </div>
      </section>

      {/* Heaven Detail */}
      {!showBeyond && (
        <section className="py-8">
          <div className="container max-w-3xl mx-auto">
            <div className="rounded-3xl overflow-hidden relative" style={{ background: `${heaven.color}06`, border: `1px solid ${heaven.color}20`, minHeight: "200px" }}>
              <StarCanvas color={heaven.stars} />
              <div className="relative z-10 p-8">
                <div className="text-center mb-6">
                  <div className="text-xs font-mono mb-1" style={{ color: heaven.color }}>HEAVEN {heaven.number} · {heaven.element} · {heaven.freq}</div>
                  <div className="text-2xl font-black text-white mb-1">{heaven.name}</div>
                  <div className="text-lg" style={{ color: heaven.color, fontFamily: "serif" }}>{heaven.arabic}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="rounded-2xl p-5" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${heaven.color}15` }}>
                    <div className="text-xs font-mono mb-2" style={{ color: heaven.color }}>THE PROPHET ﷺ ENCOUNTERED</div>
                    <div className="font-black text-white mb-2">{heaven.prophet}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{heaven.prophetDesc}</p>
                  </div>
                  <div className="rounded-2xl p-5" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${heaven.color}15` }}>
                    <div className="text-xs font-mono mb-2" style={{ color: heaven.color }}>THE GUARDIAN ANGEL</div>
                    <div className="font-black text-white mb-2">{heaven.angel}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{heaven.angelDesc}</p>
                  </div>
                </div>
                <div className="rounded-2xl p-5" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${heaven.color}15` }}>
                  <div className="text-xs font-mono mb-2" style={{ color: heaven.color }}>WHAT OCCURRED</div>
                  <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{heaven.event}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setActiveHeavenIdx(i => Math.max(0, i - 1))} disabled={activeHeavenIdx === 0} className="px-5 py-2 rounded-xl text-sm font-bold disabled:opacity-30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>← Previous Heaven</button>
              {activeHeavenIdx < HEAVENS.length - 1 ? (
                <button onClick={() => setActiveHeavenIdx(i => i + 1)} className="px-5 py-2 rounded-xl text-sm font-bold" style={{ background: `${heaven.color}10`, border: `1px solid ${heaven.color}30`, color: heaven.color }}>Next Heaven →</button>
              ) : (
                <button onClick={() => setShowBeyond(true)} className="px-5 py-2 rounded-xl text-sm font-bold" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37" }}>Beyond the Seventh →</button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Beyond */}
      {showBeyond && (
        <section className="py-8">
          <div className="container max-w-3xl mx-auto">
            <div className="rounded-3xl p-8 text-center" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>BEYOND ALL CREATION</div>
              <div className="text-2xl font-black text-white mb-1">{BEYOND.name}</div>
              <div className="text-lg mb-4" style={{ color: "#D4AF37", fontFamily: "serif" }}>{BEYOND.arabic}</div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#C8D3DC" }}>{BEYOND.desc}</p>
              <div className="rounded-2xl p-5 mb-4" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#D4AF37" }}>THE STATION OF NEARNESS</div>
                <div className="text-xl font-black text-white mb-2">{BEYOND.beyondArabic}</div>
                <div className="text-base font-bold mb-3" style={{ color: "#D4AF37" }}>{BEYOND.beyond}</div>
                <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{BEYOND.beyondDesc}</p>
              </div>
              <div className="text-sm font-mono" style={{ color: "#D4AF37" }}>Allāhumma ṣalli wa sallim ʿalā Sayyidinā Muḥammad ﷺ</div>
            </div>
            <div className="flex justify-center mt-6 gap-4">
              <button onClick={() => setShowBeyond(false)} className="px-5 py-2 rounded-xl text-sm font-bold" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>← Return to Heavens</button>
              <Link href="/seerah"><span className="px-5 py-2 rounded-xl text-sm font-bold cursor-pointer" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37" }}>Seerah Archive →</span></Link>
            </div>
          </div>
        </section>
      )}

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="text-xs font-mono mb-3" style={{ color: "#D4AF37" }}>AL-ISRĀ WAL-MIʿRĀJ · 7 HEAVENS · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/seerah/al-aqsa"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>← Al-Aqsa Scroll</span></Link>
          <Link href="/seerah"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>Seerah Archive →</span></Link>
        </div>
      </footer>
    </div>
  );
}
