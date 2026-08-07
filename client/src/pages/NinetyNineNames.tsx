/*
 * 99 NAMES OF ALLAH — Asmāʾ al-Ḥusnā
 * The Most Beautiful Names · Sacred Audio · Frequency Visualization
 * Design: Museum-grade · Gold calligraphy · Dark sacred space
 * KUN FAYAKUN x Infinity
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";

const NAMES = [
  { num: 1, arabic: "اللَّه", transliteration: "Allāh", meaning: "The One God", freq: 963 },
  { num: 2, arabic: "الرَّحْمَٰن", transliteration: "Ar-Raḥmān", meaning: "The Most Gracious", freq: 528 },
  { num: 3, arabic: "الرَّحِيم", transliteration: "Ar-Raḥīm", meaning: "The Most Merciful", freq: 528 },
  { num: 4, arabic: "الْمَلِك", transliteration: "Al-Malik", meaning: "The King, The Sovereign", freq: 741 },
  { num: 5, arabic: "الْقُدُّوس", transliteration: "Al-Quddūs", meaning: "The Most Holy", freq: 963 },
  { num: 6, arabic: "السَّلَام", transliteration: "As-Salām", meaning: "The Source of Peace", freq: 528 },
  { num: 7, arabic: "الْمُؤْمِن", transliteration: "Al-Muʾmin", meaning: "The Granter of Security", freq: 396 },
  { num: 8, arabic: "الْمُهَيْمِن", transliteration: "Al-Muhaymin", meaning: "The Protector", freq: 741 },
  { num: 9, arabic: "الْعَزِيز", transliteration: "Al-ʿAzīz", meaning: "The Almighty", freq: 852 },
  { num: 10, arabic: "الْجَبَّار", transliteration: "Al-Jabbār", meaning: "The Compeller", freq: 852 },
  { num: 11, arabic: "الْمُتَكَبِّر", transliteration: "Al-Mutakabbir", meaning: "The Supreme", freq: 963 },
  { num: 12, arabic: "الْخَالِق", transliteration: "Al-Khāliq", meaning: "The Creator", freq: 963 },
  { num: 13, arabic: "الْبَارِئ", transliteration: "Al-Bāriʾ", meaning: "The Originator", freq: 528 },
  { num: 14, arabic: "الْمُصَوِّر", transliteration: "Al-Muṣawwir", meaning: "The Fashioner of Forms", freq: 528 },
  { num: 15, arabic: "الْغَفَّار", transliteration: "Al-Ghaffār", meaning: "The Forgiving", freq: 396 },
  { num: 16, arabic: "الْقَهَّار", transliteration: "Al-Qahhār", meaning: "The Subduer", freq: 741 },
  { num: 17, arabic: "الْوَهَّاب", transliteration: "Al-Wahhāb", meaning: "The Bestower", freq: 528 },
  { num: 18, arabic: "الرَّزَّاق", transliteration: "Ar-Razzāq", meaning: "The Provider", freq: 528 },
  { num: 19, arabic: "الْفَتَّاح", transliteration: "Al-Fattāḥ", meaning: "The Opener", freq: 396 },
  { num: 20, arabic: "الْعَلِيم", transliteration: "Al-ʿAlīm", meaning: "The All-Knowing", freq: 963 },
  { num: 21, arabic: "الْقَابِض", transliteration: "Al-Qābiḍ", meaning: "The Withholder", freq: 741 },
  { num: 22, arabic: "الْبَاسِط", transliteration: "Al-Bāsiṭ", meaning: "The Extender", freq: 528 },
  { num: 23, arabic: "الْخَافِض", transliteration: "Al-Khāfiḍ", meaning: "The Abaser", freq: 396 },
  { num: 24, arabic: "الرَّافِع", transliteration: "Ar-Rāfiʿ", meaning: "The Exalter", freq: 741 },
  { num: 25, arabic: "الْمُعِزّ", transliteration: "Al-Muʿizz", meaning: "The Bestower of Honor", freq: 852 },
  { num: 26, arabic: "الْمُذِلّ", transliteration: "Al-Mudhil", meaning: "The Humiliator", freq: 396 },
  { num: 27, arabic: "السَّمِيع", transliteration: "As-Samīʿ", meaning: "The All-Hearing", freq: 963 },
  { num: 28, arabic: "الْبَصِير", transliteration: "Al-Baṣīr", meaning: "The All-Seeing", freq: 963 },
  { num: 29, arabic: "الْحَكَم", transliteration: "Al-Ḥakam", meaning: "The Judge", freq: 741 },
  { num: 30, arabic: "الْعَدْل", transliteration: "Al-ʿAdl", meaning: "The Just", freq: 528 },
  { num: 31, arabic: "اللَّطِيف", transliteration: "Al-Laṭīf", meaning: "The Subtle One", freq: 528 },
  { num: 32, arabic: "الْخَبِير", transliteration: "Al-Khabīr", meaning: "The All-Aware", freq: 963 },
  { num: 33, arabic: "الْحَلِيم", transliteration: "Al-Ḥalīm", meaning: "The Forbearing", freq: 396 },
  { num: 34, arabic: "الْعَظِيم", transliteration: "Al-ʿAẓīm", meaning: "The Magnificent", freq: 963 },
  { num: 35, arabic: "الْغَفُور", transliteration: "Al-Ghafūr", meaning: "The Forgiving", freq: 396 },
  { num: 36, arabic: "الشَّكُور", transliteration: "Ash-Shakūr", meaning: "The Appreciative", freq: 528 },
  { num: 37, arabic: "الْعَلِيّ", transliteration: "Al-ʿAlī", meaning: "The Most High", freq: 963 },
  { num: 38, arabic: "الْكَبِير", transliteration: "Al-Kabīr", meaning: "The Most Great", freq: 963 },
  { num: 39, arabic: "الْحَفِيظ", transliteration: "Al-Ḥafīẓ", meaning: "The Preserver", freq: 741 },
  { num: 40, arabic: "الْمُقِيت", transliteration: "Al-Muqīt", meaning: "The Nourisher", freq: 528 },
  { num: 41, arabic: "الْحَسِيب", transliteration: "Al-Ḥasīb", meaning: "The Reckoner", freq: 741 },
  { num: 42, arabic: "الْجَلِيل", transliteration: "Al-Jalīl", meaning: "The Majestic", freq: 963 },
  { num: 43, arabic: "الْكَرِيم", transliteration: "Al-Karīm", meaning: "The Generous", freq: 528 },
  { num: 44, arabic: "الرَّقِيب", transliteration: "Ar-Raqīb", meaning: "The Watchful", freq: 741 },
  { num: 45, arabic: "الْمُجِيب", transliteration: "Al-Mujīb", meaning: "The Responsive", freq: 528 },
  { num: 46, arabic: "الْوَاسِع", transliteration: "Al-Wāsiʿ", meaning: "The All-Encompassing", freq: 963 },
  { num: 47, arabic: "الْحَكِيم", transliteration: "Al-Ḥakīm", meaning: "The All-Wise", freq: 741 },
  { num: 48, arabic: "الْوَدُود", transliteration: "Al-Wadūd", meaning: "The Loving", freq: 528 },
  { num: 49, arabic: "الْمَجِيد", transliteration: "Al-Majīd", meaning: "The Glorious", freq: 963 },
  { num: 50, arabic: "الْبَاعِث", transliteration: "Al-Bāʿith", meaning: "The Resurrector", freq: 852 },
  { num: 51, arabic: "الشَّهِيد", transliteration: "Ash-Shahīd", meaning: "The Witness", freq: 963 },
  { num: 52, arabic: "الْحَقّ", transliteration: "Al-Ḥaqq", meaning: "The Truth", freq: 963 },
  { num: 53, arabic: "الْوَكِيل", transliteration: "Al-Wakīl", meaning: "The Trustee", freq: 741 },
  { num: 54, arabic: "الْقَوِيّ", transliteration: "Al-Qawī", meaning: "The All-Strong", freq: 852 },
  { num: 55, arabic: "الْمَتِين", transliteration: "Al-Matīn", meaning: "The Firm", freq: 852 },
  { num: 56, arabic: "الْوَلِيّ", transliteration: "Al-Walī", meaning: "The Protecting Friend", freq: 528 },
  { num: 57, arabic: "الْحَمِيد", transliteration: "Al-Ḥamīd", meaning: "The Praiseworthy", freq: 963 },
  { num: 58, arabic: "الْمُحْصِي", transliteration: "Al-Muḥṣī", meaning: "The Accounter", freq: 741 },
  { num: 59, arabic: "الْمُبْدِئ", transliteration: "Al-Mubdiʾ", meaning: "The Originator", freq: 963 },
  { num: 60, arabic: "الْمُعِيد", transliteration: "Al-Muʿīd", meaning: "The Restorer", freq: 528 },
  { num: 61, arabic: "الْمُحْيِي", transliteration: "Al-Muḥyī", meaning: "The Giver of Life", freq: 528 },
  { num: 62, arabic: "الْمُمِيت", transliteration: "Al-Mumīt", meaning: "The Taker of Life", freq: 396 },
  { num: 63, arabic: "الْحَيّ", transliteration: "Al-Ḥayy", meaning: "The Ever-Living", freq: 963 },
  { num: 64, arabic: "الْقَيُّوم", transliteration: "Al-Qayyūm", meaning: "The Self-Subsisting", freq: 963 },
  { num: 65, arabic: "الْوَاجِد", transliteration: "Al-Wājid", meaning: "The Finder", freq: 528 },
  { num: 66, arabic: "الْمَاجِد", transliteration: "Al-Mājid", meaning: "The Noble", freq: 852 },
  { num: 67, arabic: "الْوَاحِد", transliteration: "Al-Wāḥid", meaning: "The One", freq: 963 },
  { num: 68, arabic: "الْأَحَد", transliteration: "Al-Aḥad", meaning: "The Unique", freq: 963 },
  { num: 69, arabic: "الصَّمَد", transliteration: "Aṣ-Ṣamad", meaning: "The Eternal", freq: 963 },
  { num: 70, arabic: "الْقَادِر", transliteration: "Al-Qādir", meaning: "The All-Powerful", freq: 852 },
  { num: 71, arabic: "الْمُقْتَدِر", transliteration: "Al-Muqtadir", meaning: "The Prevailing", freq: 852 },
  { num: 72, arabic: "الْمُقَدِّم", transliteration: "Al-Muqaddim", meaning: "The Expediter", freq: 741 },
  { num: 73, arabic: "الْمُؤَخِّر", transliteration: "Al-Muʾakhkhir", meaning: "The Delayer", freq: 396 },
  { num: 74, arabic: "الْأَوَّل", transliteration: "Al-Awwal", meaning: "The First", freq: 963 },
  { num: 75, arabic: "الْآخِر", transliteration: "Al-Ākhir", meaning: "The Last", freq: 963 },
  { num: 76, arabic: "الظَّاهِر", transliteration: "Aẓ-Ẓāhir", meaning: "The Manifest", freq: 741 },
  { num: 77, arabic: "الْبَاطِن", transliteration: "Al-Bāṭin", meaning: "The Hidden", freq: 396 },
  { num: 78, arabic: "الْوَالِي", transliteration: "Al-Wālī", meaning: "The Governor", freq: 741 },
  { num: 79, arabic: "الْمُتَعَالِي", transliteration: "Al-Mutaʿālī", meaning: "The Most Exalted", freq: 963 },
  { num: 80, arabic: "الْبَرّ", transliteration: "Al-Barr", meaning: "The Source of Goodness", freq: 528 },
  { num: 81, arabic: "التَّوَّاب", transliteration: "At-Tawwāb", meaning: "The Acceptor of Repentance", freq: 396 },
  { num: 82, arabic: "الْمُنْتَقِم", transliteration: "Al-Muntaqim", meaning: "The Avenger", freq: 741 },
  { num: 83, arabic: "الْعَفُوّ", transliteration: "Al-ʿAfuww", meaning: "The Pardoner", freq: 396 },
  { num: 84, arabic: "الرَّؤُوف", transliteration: "Ar-Raʾūf", meaning: "The Compassionate", freq: 528 },
  { num: 85, arabic: "مَالِكُ الْمُلْك", transliteration: "Mālik al-Mulk", meaning: "The Owner of All Sovereignty", freq: 963 },
  { num: 86, arabic: "ذُو الْجَلَالِ وَالْإِكْرَام", transliteration: "Dhū al-Jalāl wal-Ikrām", meaning: "The Lord of Majesty and Bounty", freq: 963 },
  { num: 87, arabic: "الْمُقْسِط", transliteration: "Al-Muqsiṭ", meaning: "The Equitable", freq: 528 },
  { num: 88, arabic: "الْجَامِع", transliteration: "Al-Jāmiʿ", meaning: "The Gatherer", freq: 741 },
  { num: 89, arabic: "الْغَنِيّ", transliteration: "Al-Ghanī", meaning: "The Self-Sufficient", freq: 963 },
  { num: 90, arabic: "الْمُغْنِي", transliteration: "Al-Mughnī", meaning: "The Enricher", freq: 528 },
  { num: 91, arabic: "الْمَانِع", transliteration: "Al-Māniʿ", meaning: "The Preventer", freq: 741 },
  { num: 92, arabic: "الضَّارّ", transliteration: "Aḍ-Ḍārr", meaning: "The Distresser", freq: 396 },
  { num: 93, arabic: "النَّافِع", transliteration: "An-Nāfiʿ", meaning: "The Propitious", freq: 528 },
  { num: 94, arabic: "النُّور", transliteration: "An-Nūr", meaning: "The Light", freq: 963 },
  { num: 95, arabic: "الْهَادِي", transliteration: "Al-Hādī", meaning: "The Guide", freq: 741 },
  { num: 96, arabic: "الْبَدِيع", transliteration: "Al-Badīʿ", meaning: "The Incomparable Originator", freq: 963 },
  { num: 97, arabic: "الْبَاقِي", transliteration: "Al-Bāqī", meaning: "The Everlasting", freq: 963 },
  { num: 98, arabic: "الْوَارِث", transliteration: "Al-Wārith", meaning: "The Inheritor", freq: 741 },
  { num: 99, arabic: "الرَّشِيد", transliteration: "Ar-Rashīd", meaning: "The Guide to the Right Path", freq: 741 },
];

const FREQ_COLORS: Record<number, string> = {
  963: "#D4AF37", 852: "#A855F7", 741: "#00D4FF", 528: "#00FF88", 396: "#FF6B35",
};

export default function NinetyNineNames() {
  const [selected, setSelected] = useState<typeof NAMES[0] | null>(null);
  const [search, setSearch] = useState("");
  const [freqFilter, setFreqFilter] = useState<number | null>(null);
  const [audioOn, setAudioOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const filtered = NAMES.filter(n => {
    const matchSearch = search === "" || n.arabic.includes(search) || n.transliteration.toLowerCase().includes(search.toLowerCase()) || n.meaning.toLowerCase().includes(search.toLowerCase());
    const matchFreq = freqFilter === null || n.freq === freqFilter;
    return matchSearch && matchFreq;
  });

  const playName = useCallback((name: typeof NAMES[0]) => {
    setSelected(name);
    if (audioCtxRef.current) {
      oscRef.current?.stop();
      oscRef.current?.disconnect();
    }
    const ctx = audioCtxRef.current || new AudioContext();
    audioCtxRef.current = ctx;
    const gain = ctx.createGain(); gain.gain.value = 0;
    const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = name.freq;
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start();
    gain.gain.setTargetAtTime(0.07, ctx.currentTime, 0.3);
    gain.gain.setTargetAtTime(0, ctx.currentTime + 2.5, 0.5);
    osc.stop(ctx.currentTime + 4);
    oscRef.current = osc; gainRef.current = gain;
    setAudioOn(true);
    setTimeout(() => setAudioOn(false), 4000);

    // Web Speech API — warm female voice
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(name.transliteration);
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('karen') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('fiona') || (v.lang.startsWith('en') && v.name.toLowerCase().includes('google')));
      if (femaleVoice) utt.voice = femaleVoice;
      utt.rate = 0.75; utt.pitch = 1.1; utt.volume = 0.9;
      window.speechSynthesis.speak(utt);
    }
  }, []);

  useEffect(() => {
    // Pre-load voices
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#030810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,16,0.97)", borderColor: "rgba(212,175,55,0.15)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#030810" }}>SV</div>
            <span className="text-sm font-bold text-white">99 Names of Allah</span>
          </div></Link>
          <div className="text-xs font-mono" style={{ color: "#D4AF37" }}>أَسْمَاءُ اللَّهِ الْحُسْنَى · THE MOST BEAUTIFUL NAMES</div>
          <div className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.2)" }}>
            {audioOn ? "◉ PLAYING" : "○ CLICK A NAME"}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, #030810 60%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>أَسْمَاءُ اللَّهِ الْحُسْنَى</div>
          <div className="text-5xl mb-4">☪️</div>
          <h1 className="text-5xl font-black text-white mb-3">The 99 Names of <span style={{ color: "#D4AF37" }}>Allah</span></h1>
          <p className="text-lg mb-6" style={{ color: "#8899AA" }}>Click any name to hear it spoken and feel its frequency. Each name is a door to the Divine.</p>
          <div className="text-sm mb-8" style={{ color: "#D4AF37", fontFamily: "'Amiri', serif", fontSize: "1.3rem" }}>
            وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا
          </div>
          <p className="text-xs mb-8" style={{ color: "#8899AA" }}>"And to Allah belong the Most Beautiful Names, so invoke Him by them." — Al-Aʿrāf: 180</p>
          {/* Frequency filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button onClick={() => setFreqFilter(null)} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: freqFilter === null ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.05)", color: freqFilter === null ? "#D4AF37" : "#8899AA", border: `1px solid ${freqFilter === null ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}` }}>All Frequencies</button>
            {[963, 852, 741, 528, 396].map(f => (
              <button key={f} onClick={() => setFreqFilter(freqFilter === f ? null : f)} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: freqFilter === f ? `${FREQ_COLORS[f]}20` : "rgba(255,255,255,0.05)", color: freqFilter === f ? FREQ_COLORS[f] : "#8899AA", border: `1px solid ${freqFilter === f ? `${FREQ_COLORS[f]}40` : "rgba(255,255,255,0.08)"}` }}>{f}Hz</button>
            ))}
          </div>
          <div className="relative max-w-sm mx-auto">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search names..." className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)", color: "white" }} />
          </div>
        </div>
      </section>

      {/* Selected Name Display */}
      {selected && (
        <div className="sticky top-16 z-30 py-3 text-center" style={{ background: `${FREQ_COLORS[selected.freq]}08`, borderBottom: `1px solid ${FREQ_COLORS[selected.freq]}20`, backdropFilter: "blur(20px)" }}>
          <span className="text-2xl mr-3" style={{ color: FREQ_COLORS[selected.freq], fontFamily: "'Amiri', serif" }}>{selected.arabic}</span>
          <span className="text-sm font-bold text-white mr-2">{selected.transliteration}</span>
          <span className="text-sm mr-2" style={{ color: "#8899AA" }}>— {selected.meaning}</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${FREQ_COLORS[selected.freq]}15`, color: FREQ_COLORS[selected.freq] }}>{selected.freq}Hz</span>
        </div>
      )}

      {/* Names Grid */}
      <section className="container py-10">
        <div className="text-xs font-mono text-center mb-6" style={{ color: "#8899AA" }}>{filtered.length} NAMES SHOWN · CLICK TO HEAR & FEEL THE FREQUENCY</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(name => (
            <button key={name.num} onClick={() => playName(name)} className="rounded-xl p-4 text-center transition-all hover:scale-[1.04] cursor-pointer" style={{ background: selected?.num === name.num ? `${FREQ_COLORS[name.freq]}12` : `${FREQ_COLORS[name.freq]}04`, border: `1px solid ${selected?.num === name.num ? `${FREQ_COLORS[name.freq]}40` : `${FREQ_COLORS[name.freq]}15`}`, boxShadow: selected?.num === name.num ? `0 0 20px ${FREQ_COLORS[name.freq]}20` : "none" }}>
              <div className="text-xs font-mono mb-1" style={{ color: FREQ_COLORS[name.freq] }}>{String(name.num).padStart(2, "0")}</div>
              <div className="text-xl mb-1 leading-tight" style={{ color: "#FFD700", fontFamily: "'Amiri', serif", fontSize: "1.3rem" }}>{name.arabic}</div>
              <div className="text-xs font-bold text-white mb-0.5">{name.transliteration}</div>
              <div className="text-xs leading-tight" style={{ color: "#8899AA" }}>{name.meaning}</div>
              <div className="text-xs font-mono mt-1" style={{ color: FREQ_COLORS[name.freq] }}>{name.freq}Hz</div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="text-2xl mb-3" style={{ color: "#D4AF37", fontFamily: "'Amiri', serif" }}>اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ ﷺ</div>
        <div className="text-xs font-mono mb-6" style={{ color: "#D4AF37" }}>99 NAMES · 5 FREQUENCIES · ONE GOD · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/seerah"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>← Seerah Archive</span></Link>
          <Link href="/codex"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>Metatron Codex →</span></Link>
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>← Home</span></Link>
        </div>
      </footer>
    </div>
  );
}
