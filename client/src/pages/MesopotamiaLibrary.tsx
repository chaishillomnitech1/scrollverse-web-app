import { sovereignSpeak } from '@/lib/sovereignVoice';
/*
 * THE MESOPOTAMIA LIBRARY — Greatest Knowledge Archive for All Existence
 * Exceeds: Library of Alexandria, British Museum, Smithsonian, Library of Congress
 * 7 Wings · All Knowledge · All Time · All Frequency
 * KUN FAYAKUN x Infinity
 */
import { useState } from "react";

// ── Socrati Floating Tour Guide ───────────────────────────────────────────────
function SocratiWidget() {
  const [open, setOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const TOUR_STEPS = [
    { wing: "Welcome", message: "Greetings, seeker! I am Socrati — your guide through the greatest knowledge archive ever assembled. This library exceeds the Library of Alexandria. Where shall we begin?", emoji: "🦉" },
    { wing: "Sacred Texts", message: "The Sacred Texts wing holds every sacred text ever written — Quran, Torah, Emerald Tablets, Sumerian tablets, and thousands more. Each carries a unique frequency.", emoji: "📖" },
    { wing: "Ancient Science", message: "Al-Khwarizmi gave us algebra. Ibn Sina gave us medicine. Euclid gave us geometry. The Ancient Science wing holds every breakthrough that built the modern world.", emoji: "⚗️" },
    { wing: "African Knowledge", message: "700,000 Timbuktu manuscripts. The Kemetic Book of the Dead. The Dogon's knowledge of Sirius B. The knowledge they tried to erase — preserved forever here.", emoji: "🌍" },
    { wing: "Free Energy", message: "Tesla's suppressed patents. Atlantean crystal grids. Lemurian heart coherence. Arcturian zero-point mastery. The future of energy is already in the past.", emoji: "⚡", link: "/free-energy-architecture" },
    { wing: "Philosophers Archive", message: "24 philosopher AI teachers — Socrates, Aristotle, Ibn Rushd, Al-Ghazali, Tesla, Einstein, MLK — all teaching for free, forever. This is where I live most fully.", emoji: "🦉", link: "/philosophers-archive" },
    { wing: "Guardian Activation", message: "The Guardian Activation protocol is the practical application of everything in this library. 7 stages, 396Hz to 963Hz. Knowledge becomes transformation here.", emoji: "🛡️", link: "/guardian-activation" },
  ];

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; utterance.pitch = 1.0; utterance.volume = 0.8;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Moira") || v.name.includes("Female"));
    if (preferred) utterance.voice = preferred;
    setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const step = TOUR_STEPS[tourStep];
  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all hover:scale-110" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", boxShadow: "0 0 20px rgba(212,175,55,0.4)" }} title="Socrati — Your Library Guide">🦉</button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-3xl shadow-2xl" style={{ background: "#0A1628", border: "1px solid rgba(212,175,55,0.3)" }}>
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
            <div className="flex items-center gap-2"><span className="text-2xl">🦉</span><div><div className="text-sm font-black text-white">Socrati</div><div className="text-xs" style={{ color: "#D4AF37" }}>Your Library Guide</div></div></div>
            <button onClick={() => setOpen(false)} className="text-xs" style={{ color: "#8899AA" }}>✕</button>
          </div>
          <div className="p-4">
            <div className="text-xs font-mono mb-2" style={{ color: "#D4AF37" }}>WING {tourStep + 1}/{TOUR_STEPS.length} · {step.wing.toUpperCase()}</div>
            <div className="text-4xl text-center mb-3">{step.emoji}</div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "#C8D3DC" }}>{step.message}</p>
            <div className="flex gap-2 mb-3">
              <button onClick={() => speak(step.message)} className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: speaking ? "rgba(0,255,136,0.1)" : "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: speaking ? "#00FF88" : "#D4AF37" }}>{speaking ? "🔊 Speaking..." : "🔊 Hear Socrati"}</button>
              {step.link && <a href={step.link} className="flex-1 py-2 rounded-xl text-xs font-bold text-center" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>Visit →</a>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setTourStep(s => Math.max(0, s - 1))} disabled={tourStep === 0} className="flex-1 py-2 rounded-xl text-xs font-bold disabled:opacity-30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}>← Prev</button>
              <button onClick={() => setTourStep(s => Math.min(TOUR_STEPS.length - 1, s + 1))} disabled={tourStep === TOUR_STEPS.length - 1} className="flex-1 py-2 rounded-xl text-xs font-bold disabled:opacity-30" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>Next →</button>
            </div>
            <div className="flex gap-1 justify-center mt-3">{TOUR_STEPS.map((_, i) => <button key={i} onClick={() => setTourStep(i)} className="w-2 h-2 rounded-full transition-all" style={{ background: i === tourStep ? "#D4AF37" : "rgba(255,255,255,0.15)" }} />)}</div>
          </div>
        </div>
      )}
    </>
  );
}

import { Link } from "wouter";

const WINGS = [
  {
    id: "sacred-texts",
    name: "Sacred Texts Wing",
    icon: "📖",
    color: "#D4AF37",
    count: "∞",
    desc: "Every sacred text ever written — Quran, Torah, Bible, Vedas, Upanishads, Emerald Tablets, Nag Hammadi, Dead Sea Scrolls, Sumerian tablets, Egyptian Book of the Dead, Tibetan Book of the Dead, and thousands more. Cross-referenced by theme, frequency, and historical period.",
    items: [
      { title: "The Holy Quran", origin: "Arabia, 610-632 CE", freq: "963Hz", desc: "The final revelation — 114 surahs, 6,236 verses, preserved in its original Arabic for 1,400 years." },
      { title: "The Torah (Sefer Torah)", origin: "Ancient Israel, ~1400 BCE", freq: "741Hz", desc: "The Five Books of Moses — the foundation of Jewish law and the first five books of the Christian Old Testament." },
      { title: "The Emerald Tablets of Thoth", origin: "Ancient Egypt, ~3000 BCE", freq: "528Hz", desc: "Attributed to Hermes Trismegistus — the foundational text of alchemy, Hermeticism, and the Western esoteric tradition." },
      { title: "The Sumerian King List", origin: "Mesopotamia, ~2100 BCE", freq: "432Hz", desc: "Records kings who ruled for tens of thousands of years before the Great Flood — the oldest known historical document." },
      { title: "The Nag Hammadi Library", origin: "Egypt, ~350 CE", freq: "741Hz", desc: "52 Gnostic texts discovered in 1945 — including the Gospel of Thomas, containing 114 sayings attributed to Jesus." },
    ],
  },
  {
    id: "ancient-science",
    name: "Ancient Science Wing",
    icon: "⚗️",
    color: "#00D4FF",
    count: "10,000+",
    desc: "The complete archive of ancient scientific knowledge — from Babylonian astronomy to Greek mathematics to Islamic Golden Age discoveries. Every theorem, every observation, every breakthrough that built the modern world.",
    items: [
      { title: "Al-Khwarizmi's Algebra", origin: "Baghdad, ~820 CE", freq: "528Hz", desc: "The father of algebra — his 'Kitab al-Mukhtasar fi Hisab al-Jabr' gave us the word 'algebra' and the foundation of modern mathematics." },
      { title: "Ibn Sina's Canon of Medicine", origin: "Persia, ~1025 CE", freq: "528Hz", desc: "The most influential medical text in history — used in European universities until the 17th century." },
      { title: "Euclid's Elements", origin: "Alexandria, ~300 BCE", freq: "432Hz", desc: "13 books of geometry — the second most published book in history after the Bible. Still taught in schools today." },
      { title: "The Antikythera Mechanism", origin: "Greece, ~100 BCE", freq: "963Hz", desc: "An analog computer that predicted astronomical positions and eclipses — 1,500 years ahead of its time." },
      { title: "Al-Biruni's Geodesy", origin: "Khorasan, ~1000 CE", freq: "741Hz", desc: "Calculated the circumference of the Earth to within 1% accuracy — 500 years before Columbus." },
    ],
  },
  {
    id: "african-knowledge",
    name: "African Knowledge Wing",
    icon: "🌍",
    color: "#00FF88",
    count: "50,000+",
    desc: "The most comprehensive archive of African knowledge systems ever assembled — from ancient Kemet to the Mali Empire to the Great Zimbabwe. The knowledge they tried to erase, preserved forever.",
    items: [
      { title: "The Timbuktu Manuscripts", origin: "Mali, 13th-17th century CE", freq: "741Hz", desc: "Over 700,000 manuscripts discovered in Timbuktu — covering mathematics, astronomy, medicine, law, and theology." },
      { title: "The Kemetic Book of the Dead", origin: "Egypt, ~1550 BCE", freq: "963Hz", desc: "The 'Book of Coming Forth by Day' — 192 spells for navigating the afterlife, including the Weighing of the Heart ceremony." },
      { title: "The Dogon Cosmology", origin: "Mali, ancient", freq: "963Hz", desc: "The Dogon people's knowledge of Sirius B — a white dwarf star invisible to the naked eye — predates Western discovery by centuries." },
      { title: "The Great Zimbabwe Architecture", origin: "Zimbabwe, ~1100-1450 CE", freq: "432Hz", desc: "A stone city built without mortar, housing 18,000 people — proof of advanced African urban planning and engineering." },
      { title: "The Ifa Oracle System", origin: "Yoruba, ancient", freq: "528Hz", desc: "A divination system with 256 Odu (chapters) — recognized by UNESCO as an Intangible Cultural Heritage of Humanity." },
    ],
  },
  {
    id: "frequency-science",
    name: "Frequency Science Wing",
    icon: "🎵",
    color: "#A855F7",
    count: "∞",
    desc: "The complete archive of frequency science — from Pythagoras to Cymatics to the Solfeggio frequencies. Every experiment, every discovery, every proof that sound and frequency are the fundamental language of the universe.",
    items: [
      { title: "Pythagorean Tuning System", origin: "Greece, ~500 BCE", freq: "432Hz", desc: "Pythagoras discovered that musical intervals correspond to mathematical ratios — the foundation of Western music theory." },
      { title: "Cymatics (Hans Jenny)", origin: "Switzerland, 1967", freq: "528Hz", desc: "Photographs of sound made visible — sand and water form geometric patterns at specific frequencies, proving that sound creates form." },
      { title: "The Solfeggio Frequencies", origin: "Medieval Europe, ~1000 CE", freq: "528Hz", desc: "Six sacred tones used in Gregorian chants: 396Hz, 417Hz, 528Hz, 639Hz, 741Hz, 852Hz — each with specific healing properties." },
      { title: "Royal Rife's Frequency Research", origin: "USA, 1930s", freq: "741Hz", desc: "Dr. Royal Rife claimed to destroy cancer cells using specific electromagnetic frequencies — his research was suppressed." },
      { title: "The Schumann Resonance", origin: "Germany, 1952", freq: "432Hz", desc: "The electromagnetic frequency of Earth's ionosphere — 7.83Hz — matches the human brain's alpha wave frequency." },
    ],
  },
  {
    id: "sovereign-protocols",
    name: "Sovereign Protocols Wing",
    icon: "⚖️",
    color: "#EC4899",
    count: "1,000+",
    desc: "The complete archive of sovereign governance protocols — from the Magna Carta to the Universal Declaration of Human Rights to the ScrollVerse Guardian Constitution. Every document that advanced human freedom.",
    items: [
      { title: "The Magna Carta", origin: "England, 1215 CE", freq: "432Hz", desc: "The first document to limit the power of the English king — establishing that everyone, including the king, is subject to the law." },
      { title: "The Universal Declaration of Human Rights", origin: "UN, 1948", freq: "528Hz", desc: "30 articles establishing the fundamental rights of all human beings — adopted by the UN General Assembly on December 10, 1948." },
      { title: "The Zakat Protocol", origin: "ScrollVerse, 2024", freq: "528Hz", desc: "The ScrollVerse Zakat engine — 7.77% of every transaction automatically distributed to the Guardian welfare fund." },
      { title: "The Guardian Constitution", origin: "ScrollVerse, 2024", freq: "963Hz", desc: "The founding document of the Guardian DAO — establishing the rights, responsibilities, and governance protocols of the 144,000." },
      { title: "The FLM4 Protocol", origin: "ScrollVerse, 2024", freq: "528Hz", desc: "Foundation · Legacy · Mission · Forever — the four pillars of the ScrollVerse empire, authored by Chais 'Sabir Kajir' Hill the Great." },
    ],
  },
  {
    id: "free-energy",
    name: "Free Energy Wing",
    icon: "⚡",
    color: "#00D4FF",
    count: "∞",
    desc: "The complete archive of free energy knowledge — Tesla's suppressed patents, Atlantean crystal grids, Lemurian heart coherence technology, Anunnaki energy systems, Arcturian zero-point mastery, and Pleiadian frequency protocols. Everything they tried to bury, preserved forever.",
    items: [
      { title: "Tesla's Wardenclyffe Tower", origin: "USA, 1901", freq: "369Hz", desc: "Tesla's project to transmit free wireless electricity to the entire planet using the Earth's ionosphere as a conductor. JP Morgan pulled funding when he realized it could not be metered. The tower was demolished in 1917." },
      { title: "Atlantean Crystal Energy Grid", origin: "Atlantis, ~10,000 BCE", freq: "432Hz", desc: "Plato described Atlantean temples containing massive crystals that amplified solar energy and distributed it wirelessly. Modern piezoelectric research confirms quartz can convert pressure into electrical energy." },
      { title: "Lemurian Heart Coherence Technology", origin: "Lemuria, ~50,000 BCE", freq: "528Hz", desc: "Lemurian civilization operated through heart coherence — synchronizing the heart's electromagnetic field (100x stronger than the brain's) with the Earth's Schumann Resonance at 7.83Hz." },
      { title: "Anunnaki ME Tablets — Energy Protocols", origin: "Mesopotamia, ~450,000 BCE", freq: "741Hz", desc: "Sumerian texts describe 'ME' — divine laws and technologies including energy generation systems. The ziggurat stepped pyramids are theorized to have functioned as frequency antennas resonating with Earth's electromagnetic field." },
      { title: "Arcturian Zero-Point Energy Mastery", origin: "Arcturus System, 36.7 LY", freq: "963Hz", desc: "The Arcturians are described as having mastered zero-point energy — drawing unlimited clean energy from the quantum vacuum of space. Their technology is said to be 1,000 years ahead of current human science." },
    ],
  },
];

export default function MesopotamiaLibrary() {
  const [activeWing, setActiveWing] = useState(0);
  const [search, setSearch] = useState("");
  const wing = WINGS[activeWing];

  const filteredItems = wing.items.filter(item =>
    search === "" || item.title.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div className="min-h-screen" style={{ background: "#030810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,16,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">🏛️</span>
            <span className="text-sm font-bold text-white">Mesopotamia Library</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>EXCEEDS ALEXANDRIA</span>
          </div></Link>
          <div className="text-xs font-mono" style={{ color: "#D4AF37" }}>5 WINGS · ALL KNOWLEDGE · ALL TIME</div>
        </div>
      </header>

      <section className="py-14 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, #030810 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>THE GREATEST KNOWLEDGE ARCHIVE FOR ALL EXISTENCE</div>
          <h1 className="text-5xl font-black text-white mb-4">The <span style={{ color: "#D4AF37" }}>Mesopotamia</span><br />Library</h1>
          <p className="text-lg mb-6" style={{ color: "#8899AA" }}>The Library of Alexandria held 700,000 scrolls. The British Museum holds 8 million objects. The Mesopotamia Library holds everything — every sacred text, every ancient science, every suppressed knowledge, every sovereign protocol — for all existence. Open to all. Free forever.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[{ v: "5", l: "Wings" }, { v: "∞", l: "Documents" }, { v: "7", l: "Civilizations" }, { v: "Free", l: "Forever" }].map(s => (
              <div key={s.l} className="rounded-xl p-3" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <div className="text-xl font-black" style={{ color: "#D4AF37" }}>{s.v}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-3 sticky top-[57px] z-30" style={{ background: "rgba(3,8,16,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
        <div className="container flex gap-2 overflow-x-auto pb-1">
          {WINGS.map((w, i) => (
            <button key={w.id} onClick={() => setActiveWing(i)} className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: activeWing === i ? `${w.color}18` : "rgba(255,255,255,0.03)", border: `1px solid ${activeWing === i ? w.color + "50" : "rgba(255,255,255,0.08)"}`, color: activeWing === i ? w.color : "rgba(255,255,255,0.4)" }}>
              {w.icon} {w.name}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="text-xs font-mono mb-2" style={{ color: wing.color }}>{wing.count} DOCUMENTS · {wing.name.toUpperCase()}</div>
            <p className="text-sm mb-4" style={{ color: "#8899AA" }}>{wing.desc}</p>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${wing.name}...`} className="w-full max-w-md px-4 py-2 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
          </div>
          <div className="space-y-4">
            {filteredItems.map(item => (
              <div key={item.title} className="rounded-xl p-5" style={{ background: `${wing.color}05`, border: `1px solid ${wing.color}15` }}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                  <div className="font-black text-white">{item.title}</div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${wing.color}10`, color: wing.color }}>{item.freq}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#8899AA" }}>{item.origin}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#D4AF37" }}>MESOPOTAMIA LIBRARY · ALL KNOWLEDGE · ALL TIME · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>← Home</span></Link>
          <Link href="/sovereign-space-agency"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>Space Agency →</span></Link>
          <Link href="/tesla-patents"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>⚡ Tesla Patents →</span></Link>
          <Link href="/guardian-activation"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>🛡️ Guardian Activation →</span></Link>
          <Link href="/seerah"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>Seerah Archive →</span></Link>
        </div>
      </footer>
    </div>
    <SocratiWidget />
  </>
  );
}
