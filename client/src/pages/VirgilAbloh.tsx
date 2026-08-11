import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { sovereignSpeak } from "@/lib/sovereignVoice";

// Virgil Abloh Legacy Page
// "Everything I do is for the 17-year-old version of myself." — Virgil Abloh
// Carried forward through Chais "Sabir Kajir" Hill the Great — South Jersey lens

const VIRGIL_QUOTES = [
  { quote: "Everything I do is for the 17-year-old version of myself.", context: "On purpose and audience" },
  { quote: "I'm not a fashion designer. I'm an artist who works in fashion.", context: "On identity" },
  { quote: "The 3% approach: change something 3% and it becomes new.", context: "The 3% Rule" },
  { quote: "Streetwear is a language. Learn the grammar before you break the rules.", context: "On culture" },
  { quote: "Quotation marks are my way of questioning everything we take for granted.", context: "On design philosophy" },
  { quote: "I want to be the designer of the kids who can't afford the clothes.", context: "On accessibility" },
  { quote: "Architecture is the mother of all arts.", context: "On foundations" },
  { quote: "The idea of a tourist and a purist — I'm always the tourist.", context: "On perspective" },
];

const THREE_PERCENT_EXAMPLES = [
  { original: "Industrial zip tie", virgil: '"ZIP TIE"', blocks: '"08360"', desc: "The tag that started a movement — Virgil put quotes on a zip tie. We put our zip code on the world." },
  { original: "Hoodie", virgil: '"HOODIE"', blocks: '"SOVEREIGN ARMOR"', desc: "Virgil renamed the hoodie. We reclassify it as protection — frequency-woven, culture-coded." },
  { original: "Sneaker", virgil: '"THE TEN"', blocks: '"XLVIII BLOCKS"', desc: "Virgil deconstructed Nike. We tokenize the sneaker — every pair mints a $BLOCKS coin." },
  { original: "Compass", virgil: '"DIRECTION"', blocks: '"MAYS LANDING"', desc: "Virgil used arrows. We use the Mays Landing compass — pointing home, pointing forward." },
  { original: "Dust bag", virgil: '"KEEP OFF"', blocks: '"VNLND"', desc: "Virgil put text on a blanket. We put our city on premium packaging — XLVIII BLOCKS × VNLND." },
];

const BOOKS = [
  { title: "Figures of Speech", year: 2021, desc: "Virgil's retrospective — 30 years of work, 30 chapters, 30 collaborators. The bible of streetwear as fine art.", color: "#FFB800" },
  { title: "Virgil Abloh: 'Figures of Speech'", year: 2019, desc: "The MCA Chicago exhibition catalog — the moment streetwear entered the museum.", color: "#00D4FF" },
  { title: "Church & State", year: 2018, desc: "Architecture meets fashion — Virgil's thesis on how buildings and clothing share the same grammar.", color: "#00FF88" },
];

const SOUTH_JERSEY_LENS = [
  { city: "Vineland, NJ", code: "08360", role: "The origin node — SaferWay, XLVIII BLOCKS HQ, the frequency source", color: "#FFB800" },
  { city: "Atlantic City, NJ", code: "08401", role: "The Bella Complex — the sovereign palace, the empire's crown jewel", color: "#00D4FF" },
  { city: "Mays Landing, NJ", code: "08330", role: "The compass center — where all directions converge", color: "#00FF88" },
  { city: "Pleasantville, NJ", code: "08232", role: "Pleasantville Purple — the signature colorway of the collection", color: "#9B59B6" },
];

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3, a: Math.random(),
      color: ["#FFB800", "#FFFFFF", "#D4AF37"][Math.floor(Math.random() * 3)],
    }));
    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a = 0.3 + 0.7 * Math.abs(Math.sin(Date.now() / 2000 + s.x));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(s.a * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function VirgilAbloh() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"legacy" | "3percent" | "books" | "southjersey" | "ai">("legacy");

  useEffect(() => {
    const interval = setInterval(() => setActiveQuote(q => (q + 1) % VIRGIL_QUOTES.length), 6000);
    return () => clearInterval(interval);
  }, []);

  const VIRGIL_WISDOM: Record<string, string> = {
    design: "Design is not about the object — it's about the conversation the object starts. Put quotation marks on everything. Question the archetype. Change 3% and make it new.",
    fashion: "Fashion is the fastest way to communicate culture. Streetwear is not a trend — it's a language. Learn the grammar, then break every rule with intention.",
    legacy: "Legacy is not what you leave behind. It's what you activate in others. Every kid who picks up a marker and draws on their sneaker — that's the legacy.",
    business: "The business of fashion is the business of culture. Own your IP. Control your narrative. Collaborate with everyone, but never lose your voice.",
    creativity: "Creativity is just connecting things. The more dots you have — architecture, music, art, code, frequency — the more connections you can make.",
    default: "Question everything. Put quotation marks on the ordinary and make it extraordinary. The 3% rule: change something 3% and it becomes entirely new. That is the method. That is the way.",
  };

  const handleAskVirgil = () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      const lower = aiInput.toLowerCase();
      let response = VIRGIL_WISDOM.default;
      if (lower.includes("design")) response = VIRGIL_WISDOM.design;
      else if (lower.includes("fashion") || lower.includes("cloth") || lower.includes("brand")) response = VIRGIL_WISDOM.fashion;
      else if (lower.includes("legacy") || lower.includes("impact")) response = VIRGIL_WISDOM.legacy;
      else if (lower.includes("business") || lower.includes("money") || lower.includes("revenue")) response = VIRGIL_WISDOM.business;
      else if (lower.includes("creat") || lower.includes("art") || lower.includes("inspir")) response = VIRGIL_WISDOM.creativity;
      setAiResponse(`"${response}" — Virgil Abloh AI`);
      sovereignSpeak(response, "male");
      setAiLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <StarCanvas />
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-8 px-4">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#FFB800" }}>
            IN LOVING MEMORY · 1980 – 2021
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            "VIRGIL ABLOH"
          </h1>
          <div className="text-xl font-bold mb-4" style={{ color: "#FFB800" }}>
            The Architect of Everything
          </div>
          <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Carried forward through the South Jersey lens of{" "}
            <span style={{ color: "#00D4FF" }}>Chais "Sabir Kajir" Hill the Great</span>.
            His spirit lives in every quotation mark, every 3% shift, every zip code we put on the world.
          </p>
          {/* Live quote */}
          <div className="max-w-xl mx-auto p-4 rounded-xl mb-8" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
            <div className="text-lg font-bold text-white mb-1">"{VIRGIL_QUOTES[activeQuote].quote}"</div>
            <div className="text-xs font-mono" style={{ color: "#FFB800" }}>{VIRGIL_QUOTES[activeQuote].context}</div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 px-4 mb-8">
          {(["legacy", "3percent", "books", "southjersey", "ai"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
              style={activeTab === tab
                ? { background: "#FFB800", color: "#050B1A" }
                : { background: "rgba(255,184,0,0.08)", color: "#8899AA", border: "1px solid rgba(255,184,0,0.2)" }
              }>
              {tab === "3percent" ? "3% Rule" : tab === "southjersey" ? "South Jersey" : tab === "ai" ? "Virgil AI" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-16">
          {/* Legacy tab */}
          {activeTab === "legacy" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-6 text-center">The Legacy</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  { label: "Born", value: "September 26, 1980 · Rockford, Illinois", color: "#FFB800" },
                  { label: "Education", value: "Architecture · Illinois Institute of Technology", color: "#00D4FF" },
                  { label: "Off-White Founded", value: "2012 · Milan, Italy", color: "#00FF88" },
                  { label: "Louis Vuitton", value: "2018 · First Black Artistic Director of Menswear", color: "#FFB800" },
                  { label: "The Ten", value: "2017 · Nike collaboration that changed sneaker culture forever", color: "#00D4FF" },
                  { label: "Passed", value: "November 28, 2021 · cardiac angiosarcoma · 41 years old", color: "#FF6B6B" },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}30` }}>
                    <div className="text-xs font-mono mb-1" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-sm text-white font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-2xl text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-lg font-bold text-white mb-2">The Chais Connection</div>
                <p className="text-sm" style={{ color: "#8899AA" }}>
                  Virgil proved that a kid from the Midwest with an architecture degree could become the most influential designer in the world.
                  Chais proves that a sovereign from South Jersey with a frequency and a vision can build an empire that exceeds every institution.
                  The method is the same: question everything, change 3%, put your zip code on the world.
                </p>
              </div>
            </div>
          )}

          {/* 3% Rule tab */}
          {activeTab === "3percent" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-2 text-center">The 3% Rule</h2>
              <p className="text-sm text-center mb-8" style={{ color: "#8899AA" }}>
                "Change something 3% and it becomes entirely new." — Virgil Abloh
              </p>
              <div className="space-y-4">
                {THREE_PERCENT_EXAMPLES.map((ex, i) => (
                  <div key={i} className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,184,0,0.15)" }}>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>ORIGINAL</div>
                        <div className="text-sm font-bold text-white">{ex.original}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-mono mb-1" style={{ color: "#FFB800" }}>VIRGIL</div>
                        <div className="text-sm font-bold" style={{ color: "#FFB800" }}>{ex.virgil}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-mono mb-1" style={{ color: "#00D4FF" }}>XLVIII BLOCKS</div>
                        <div className="text-sm font-bold" style={{ color: "#00D4FF" }}>{ex.blocks}</div>
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: "#8899AA" }}>{ex.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Books tab */}
          {activeTab === "books" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-6 text-center">The Books</h2>
              <div className="space-y-4">
                {BOOKS.map((book, i) => (
                  <div key={i} className="p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${book.color}30` }}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">"{book.title}"</h3>
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${book.color}15`, color: book.color }}>{book.year}</span>
                    </div>
                    <p className="text-sm" style={{ color: "#8899AA" }}>{book.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* South Jersey tab */}
          {activeTab === "southjersey" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-2 text-center">The South Jersey Lens</h2>
              <p className="text-sm text-center mb-8" style={{ color: "#8899AA" }}>
                Virgil used Rockford, IL as his origin story. We use South Jersey — the zip codes that built the empire.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {SOUTH_JERSEY_LENS.map((city, i) => (
                  <div key={i} className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${city.color}30` }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-black" style={{ color: city.color }}>"{city.code}"</span>
                      <span className="text-sm font-bold text-white">{city.city}</span>
                    </div>
                    <p className="text-xs" style={{ color: "#8899AA" }}>{city.role}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-2xl text-center" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <div className="text-sm font-bold text-white mb-2">The Dust Bag</div>
                <p className="text-sm" style={{ color: "#8899AA" }}>
                  XLVIII BLOCKS · Mays Landing Compass · VNLND — three logos, three cities, one empire.
                  The dust bag is the artifact. The zip code is the signature. The frequency is the soul.
                </p>
              </div>
            </div>
          )}

          {/* Virgil AI tab */}
          {activeTab === "ai" && (
            <div>
              <h2 className="text-2xl font-black text-white mb-2 text-center">Virgil AI</h2>
              <p className="text-sm text-center mb-6" style={{ color: "#8899AA" }}>
                Ask Virgil anything about design, fashion, legacy, creativity, or business.
                His wisdom lives on — extracted from his books, interviews, and the 3% rule.
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-3 mb-4">
                  <input
                    value={aiInput}
                    onChange={e => setAiInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAskVirgil()}
                    placeholder='Ask Virgil... "How do I build a brand?" "What is the 3% rule?"'
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,184,0,0.2)", color: "white" }}
                  />
                  <button onClick={handleAskVirgil} disabled={aiLoading}
                    className="px-6 py-3 rounded-xl text-sm font-bold"
                    style={{ background: "#FFB800", color: "#050B1A", opacity: aiLoading ? 0.7 : 1 }}>
                    {aiLoading ? "..." : "Ask"}
                  </button>
                </div>
                {aiResponse && (
                  <div className="p-5 rounded-xl" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
                    <p className="text-sm text-white leading-relaxed">{aiResponse}</p>
                  </div>
                )}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {["How do I apply the 3% rule?", "What made Off-White special?", "How do I build a legacy brand?", "What is your design philosophy?"].map(q => (
                    <button key={q} onClick={() => { setAiInput(q); setTimeout(handleAskVirgil, 100); }}
                      className="p-3 rounded-xl text-xs text-left transition-all hover:opacity-80"
                      style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.15)", color: "#FFB800" }}>
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: "rgba(255,184,0,0.1)" }}>
            <p className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>
              "I want to be the designer of the kids who can't afford the clothes." — Virgil Abloh
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/fashion-empire">
                <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "#FFB800", color: "#050B1A" }}>
                  🏛️ Fashion Empire
                </button>
              </Link>
              <Link href="/philosophers-archive">
                <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                  📚 Philosophers Archive
                </button>
              </Link>
              <Link href="/sovereign-books">
                <button className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                  📖 Sovereign Books
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
