/*
 * 99 NAMES OF ALLAH — AL-ASMA AL-HUSNA
 * The Most Beautiful Names — Sovereign Spiritual Experience
 * Route: /99-names
 * KUN FAYAKŪN × ∞
 */
import { useEffect, useRef, useState } from "react";

const NAMES = [
  { number: 1, arabic: "اللَّهُ", transliteration: "Allah", meaning: "The Greatest Name — The One", frequency: 963 },
  { number: 2, arabic: "الرَّحْمَنُ", transliteration: "Ar-Rahman", meaning: "The Most Gracious", frequency: 528 },
  { number: 3, arabic: "الرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "The Most Merciful", frequency: 528 },
  { number: 4, arabic: "الْمَلِكُ", transliteration: "Al-Malik", meaning: "The King, The Sovereign", frequency: 432 },
  { number: 5, arabic: "الْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "The Most Holy", frequency: 963 },
  { number: 6, arabic: "السَّلَامُ", transliteration: "As-Salam", meaning: "The Source of Peace", frequency: 528 },
  { number: 7, arabic: "الْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Guardian of Faith", frequency: 432 },
  { number: 8, arabic: "الْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "The Protector", frequency: 432 },
  { number: 9, arabic: "الْعَزِيزُ", transliteration: "Al-Aziz", meaning: "The Almighty", frequency: 741 },
  { number: 10, arabic: "الْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "The Compeller", frequency: 741 },
  { number: 11, arabic: "الْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "The Supreme", frequency: 963 },
  { number: 12, arabic: "الْخَالِقُ", transliteration: "Al-Khaliq", meaning: "The Creator", frequency: 528 },
  { number: 13, arabic: "الْبَارِئُ", transliteration: "Al-Bari'", meaning: "The Evolver", frequency: 528 },
  { number: 14, arabic: "الْمُصَوِّرُ", transliteration: "Al-Musawwir", meaning: "The Fashioner of Forms", frequency: 528 },
  { number: 15, arabic: "الْغَفَّارُ", transliteration: "Al-Ghaffar", meaning: "The Ever-Forgiving", frequency: 396 },
  { number: 16, arabic: "الْقَهَّارُ", transliteration: "Al-Qahhar", meaning: "The Subduer", frequency: 741 },
  { number: 17, arabic: "الْوَهَّابُ", transliteration: "Al-Wahhab", meaning: "The Bestower", frequency: 528 },
  { number: 18, arabic: "الرَّزَّاقُ", transliteration: "Ar-Razzaq", meaning: "The Provider", frequency: 528 },
  { number: 19, arabic: "الْفَتَّاحُ", transliteration: "Al-Fattah", meaning: "The Opener", frequency: 432 },
  { number: 20, arabic: "الْعَلِيمُ", transliteration: "Al-'Alim", meaning: "The All-Knowing", frequency: 963 },
  { number: 21, arabic: "الْقَابِضُ", transliteration: "Al-Qabid", meaning: "The Withholder", frequency: 396 },
  { number: 22, arabic: "الْبَاسِطُ", transliteration: "Al-Basit", meaning: "The Expander", frequency: 528 },
  { number: 23, arabic: "الْخَافِضُ", transliteration: "Al-Khafid", meaning: "The Abaser", frequency: 396 },
  { number: 24, arabic: "الرَّافِعُ", transliteration: "Ar-Rafi'", meaning: "The Exalter", frequency: 741 },
  { number: 25, arabic: "الْمُعِزُّ", transliteration: "Al-Mu'izz", meaning: "The Bestower of Honor", frequency: 741 },
  { number: 26, arabic: "الْمُذِلُّ", transliteration: "Al-Mudhill", meaning: "The Humiliator", frequency: 396 },
  { number: 27, arabic: "السَّمِيعُ", transliteration: "As-Sami'", meaning: "The All-Hearing", frequency: 963 },
  { number: 28, arabic: "الْبَصِيرُ", transliteration: "Al-Basir", meaning: "The All-Seeing", frequency: 963 },
  { number: 29, arabic: "الْحَكَمُ", transliteration: "Al-Hakam", meaning: "The Judge", frequency: 432 },
  { number: 30, arabic: "الْعَدْلُ", transliteration: "Al-'Adl", meaning: "The Just", frequency: 528 },
  { number: 31, arabic: "اللَّطِيفُ", transliteration: "Al-Latif", meaning: "The Subtle One", frequency: 528 },
  { number: 32, arabic: "الْخَبِيرُ", transliteration: "Al-Khabir", meaning: "The All-Aware", frequency: 963 },
  { number: 33, arabic: "الْحَلِيمُ", transliteration: "Al-Halim", meaning: "The Forbearing", frequency: 528 },
  { number: 34, arabic: "الْعَظِيمُ", transliteration: "Al-'Azim", meaning: "The Magnificent", frequency: 963 },
  { number: 35, arabic: "الْغَفُورُ", transliteration: "Al-Ghafur", meaning: "The Forgiving", frequency: 396 },
  { number: 36, arabic: "الشَّكُورُ", transliteration: "Ash-Shakur", meaning: "The Appreciative", frequency: 528 },
  { number: 37, arabic: "الْعَلِيُّ", transliteration: "Al-'Ali", meaning: "The Most High", frequency: 963 },
  { number: 38, arabic: "الْكَبِيرُ", transliteration: "Al-Kabir", meaning: "The Most Great", frequency: 963 },
  { number: 39, arabic: "الْحَفِيظُ", transliteration: "Al-Hafiz", meaning: "The Preserver", frequency: 432 },
  { number: 40, arabic: "الْمُقِيتُ", transliteration: "Al-Muqit", meaning: "The Nourisher", frequency: 528 },
  { number: 41, arabic: "الْحَسِيبُ", transliteration: "Al-Hasib", meaning: "The Reckoner", frequency: 432 },
  { number: 42, arabic: "الْجَلِيلُ", transliteration: "Al-Jalil", meaning: "The Majestic", frequency: 963 },
  { number: 43, arabic: "الْكَرِيمُ", transliteration: "Al-Karim", meaning: "The Generous", frequency: 528 },
  { number: 44, arabic: "الرَّقِيبُ", transliteration: "Ar-Raqib", meaning: "The Watchful", frequency: 432 },
  { number: 45, arabic: "الْمُجِيبُ", transliteration: "Al-Mujib", meaning: "The Responsive", frequency: 528 },
  { number: 46, arabic: "الْوَاسِعُ", transliteration: "Al-Wasi'", meaning: "The All-Encompassing", frequency: 963 },
  { number: 47, arabic: "الْحَكِيمُ", transliteration: "Al-Hakim", meaning: "The Perfectly Wise", frequency: 432 },
  { number: 48, arabic: "الْوَدُودُ", transliteration: "Al-Wadud", meaning: "The Loving", frequency: 528 },
  { number: 49, arabic: "الْمَجِيدُ", transliteration: "Al-Majid", meaning: "The Most Glorious", frequency: 963 },
  { number: 50, arabic: "الْبَاعِثُ", transliteration: "Al-Ba'ith", meaning: "The Resurrector", frequency: 741 },
  { number: 51, arabic: "الشَّهِيدُ", transliteration: "Ash-Shahid", meaning: "The Witness", frequency: 432 },
  { number: 52, arabic: "الْحَقُّ", transliteration: "Al-Haqq", meaning: "The Truth", frequency: 963 },
  { number: 53, arabic: "الْوَكِيلُ", transliteration: "Al-Wakil", meaning: "The Trustee", frequency: 432 },
  { number: 54, arabic: "الْقَوِيُّ", transliteration: "Al-Qawi", meaning: "The Most Strong", frequency: 741 },
  { number: 55, arabic: "الْمَتِينُ", transliteration: "Al-Matin", meaning: "The Firm", frequency: 741 },
  { number: 56, arabic: "الْوَلِيُّ", transliteration: "Al-Wali", meaning: "The Protecting Friend", frequency: 528 },
  { number: 57, arabic: "الْحَمِيدُ", transliteration: "Al-Hamid", meaning: "The Praiseworthy", frequency: 528 },
  { number: 58, arabic: "الْمُحْصِي", transliteration: "Al-Muhsi", meaning: "The Counter", frequency: 432 },
  { number: 59, arabic: "الْمُبْدِئُ", transliteration: "Al-Mubdi'", meaning: "The Originator", frequency: 528 },
  { number: 60, arabic: "الْمُعِيدُ", transliteration: "Al-Mu'id", meaning: "The Restorer", frequency: 528 },
  { number: 61, arabic: "الْمُحْيِي", transliteration: "Al-Muhyi", meaning: "The Giver of Life", frequency: 528 },
  { number: 62, arabic: "الْمُمِيتُ", transliteration: "Al-Mumit", meaning: "The Taker of Life", frequency: 396 },
  { number: 63, arabic: "الْحَيُّ", transliteration: "Al-Hayy", meaning: "The Ever-Living", frequency: 963 },
  { number: 64, arabic: "الْقَيُّومُ", transliteration: "Al-Qayyum", meaning: "The Self-Subsisting", frequency: 963 },
  { number: 65, arabic: "الْوَاجِدُ", transliteration: "Al-Wajid", meaning: "The Finder", frequency: 432 },
  { number: 66, arabic: "الْمَاجِدُ", transliteration: "Al-Majid", meaning: "The Noble", frequency: 963 },
  { number: 67, arabic: "الْوَاحِدُ", transliteration: "Al-Wahid", meaning: "The One", frequency: 963 },
  { number: 68, arabic: "الْأَحَدُ", transliteration: "Al-Ahad", meaning: "The Unique", frequency: 963 },
  { number: 69, arabic: "الصَّمَدُ", transliteration: "As-Samad", meaning: "The Eternal", frequency: 963 },
  { number: 70, arabic: "الْقَادِرُ", transliteration: "Al-Qadir", meaning: "The Omnipotent", frequency: 741 },
  { number: 71, arabic: "الْمُقْتَدِرُ", transliteration: "Al-Muqtadir", meaning: "The Powerful", frequency: 741 },
  { number: 72, arabic: "الْمُقَدِّمُ", transliteration: "Al-Muqaddim", meaning: "The Expediter", frequency: 432 },
  { number: 73, arabic: "الْمُؤَخِّرُ", transliteration: "Al-Mu'akhkhir", meaning: "The Delayer", frequency: 396 },
  { number: 74, arabic: "الْأَوَّلُ", transliteration: "Al-Awwal", meaning: "The First", frequency: 963 },
  { number: 75, arabic: "الْآخِرُ", transliteration: "Al-Akhir", meaning: "The Last", frequency: 963 },
  { number: 76, arabic: "الظَّاهِرُ", transliteration: "Az-Zahir", meaning: "The Manifest", frequency: 432 },
  { number: 77, arabic: "الْبَاطِنُ", transliteration: "Al-Batin", meaning: "The Hidden", frequency: 432 },
  { number: 78, arabic: "الْوَالِي", transliteration: "Al-Wali", meaning: "The Governor", frequency: 432 },
  { number: 79, arabic: "الْمُتَعَالِي", transliteration: "Al-Muta'ali", meaning: "The Most Exalted", frequency: 963 },
  { number: 80, arabic: "الْبَرُّ", transliteration: "Al-Barr", meaning: "The Source of Goodness", frequency: 528 },
  { number: 81, arabic: "التَّوَّابُ", transliteration: "At-Tawwab", meaning: "The Ever-Returning", frequency: 396 },
  { number: 82, arabic: "الْمُنْتَقِمُ", transliteration: "Al-Muntaqim", meaning: "The Avenger", frequency: 741 },
  { number: 83, arabic: "الْعَفُوُّ", transliteration: "Al-'Afuww", meaning: "The Pardoner", frequency: 396 },
  { number: 84, arabic: "الرَّءُوفُ", transliteration: "Ar-Ra'uf", meaning: "The Compassionate", frequency: 528 },
  { number: 85, arabic: "مَالِكُ الْمُلْكِ", transliteration: "Malik-ul-Mulk", meaning: "Owner of All Sovereignty", frequency: 963 },
  { number: 86, arabic: "ذُو الْجَلَالِ وَالْإِكْرَامِ", transliteration: "Dhul-Jalali Wal-Ikram", meaning: "Lord of Majesty and Bounty", frequency: 963 },
  { number: 87, arabic: "الْمُقْسِطُ", transliteration: "Al-Muqsit", meaning: "The Equitable", frequency: 528 },
  { number: 88, arabic: "الْجَامِعُ", transliteration: "Al-Jami'", meaning: "The Gatherer", frequency: 432 },
  { number: 89, arabic: "الْغَنِيُّ", transliteration: "Al-Ghani", meaning: "The Self-Sufficient", frequency: 963 },
  { number: 90, arabic: "الْمُغْنِي", transliteration: "Al-Mughni", meaning: "The Enricher", frequency: 528 },
  { number: 91, arabic: "الْمَانِعُ", transliteration: "Al-Mani'", meaning: "The Preventer", frequency: 432 },
  { number: 92, arabic: "الضَّارُّ", transliteration: "Ad-Darr", meaning: "The Distresser", frequency: 396 },
  { number: 93, arabic: "النَّافِعُ", transliteration: "An-Nafi'", meaning: "The Propitious", frequency: 528 },
  { number: 94, arabic: "النُّورُ", transliteration: "An-Nur", meaning: "The Light", frequency: 963 },
  { number: 95, arabic: "الْهَادِي", transliteration: "Al-Hadi", meaning: "The Guide", frequency: 528 },
  { number: 96, arabic: "الْبَدِيعُ", transliteration: "Al-Badi'", meaning: "The Incomparable", frequency: 963 },
  { number: 97, arabic: "الْبَاقِي", transliteration: "Al-Baqi", meaning: "The Everlasting", frequency: 963 },
  { number: 98, arabic: "الْوَارِثُ", transliteration: "Al-Warith", meaning: "The Inheritor", frequency: 432 },
  { number: 99, arabic: "الرَّشِيدُ", transliteration: "Ar-Rashid", meaning: "The Guide to the Right Path", frequency: 528 },
];

const FREQ_COLORS: Record<number, string> = {
  963: "#FFB800",
  741: "#EC4899",
  528: "#00FF88",
  432: "#00D4FF",
  396: "#A78BFA",
};

function NameCard({ name, onSelect, isSelected }: {
  name: typeof NAMES[0];
  onSelect: (n: typeof NAMES[0]) => void;
  isSelected: boolean;
}) {
  const color = FREQ_COLORS[name.frequency] || "#00D4FF";
  return (
    <div
      onClick={() => onSelect(name)}
      className="cursor-pointer rounded-xl p-4 transition-all duration-300 relative overflow-hidden"
      style={{
        background: isSelected ? `${color}12` : "rgba(255,255,255,0.03)",
        border: isSelected ? `1px solid ${color}60` : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isSelected ? `0 0 20px ${color}20` : "none",
        transform: isSelected ? "scale(1.02)" : "scale(1)",
      }}
    >
      {/* Number badge */}
      <div
        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono"
        style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
      >
        {name.number}
      </div>

      {/* Arabic */}
      <div
        className="text-2xl mb-1 text-right leading-relaxed"
        style={{ fontFamily: "'Amiri', serif", color: isSelected ? color : "#E2E8F0", direction: "rtl" }}
      >
        {name.arabic}
      </div>

      {/* Transliteration */}
      <div className="text-sm font-bold mb-0.5" style={{ color, fontFamily: "'Space Mono', monospace" }}>
        {name.transliteration}
      </div>

      {/* Meaning */}
      <div className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>
        {name.meaning}
      </div>

      {/* Frequency badge */}
      <div
        className="mt-2 inline-block text-xs font-mono px-2 py-0.5 rounded"
        style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
      >
        {name.frequency}Hz
      </div>
    </div>
  );
}

export default function NamesOfAllah() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [selected, setSelected] = useState<typeof NAMES[0] | null>(null);
  const [search, setSearch] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [filter, setFilter] = useState<number | "all">("all");

  // Ambient particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; r: number; a: number; speed: number; color: string }[] = [];
    const STAR_COLORS = ["#FFB800", "#00D4FF", "#00FF88", "#EC4899", "#A78BFA"];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.5 + Math.random() * 1.5,
        a: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      });
    }

    let frame = 0;
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a = 0.3 + 0.7 * Math.abs(Math.sin(frame * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(s.a * 180).toString(16).padStart(2, "0");
        ctx.fill();
      });
      frame++;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Play frequency tone for selected name
  const playFrequency = (freq: number) => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    const actx = new AudioContext();
    audioCtxRef.current = actx;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.value = 0.12;
    gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 8);
    osc.connect(gain);
    gain.connect(actx.destination);
    osc.start();
    osc.stop(actx.currentTime + 8);
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 8000);
  };

  const handleSelect = (name: typeof NAMES[0]) => {
    setSelected(name);
    playFrequency(name.frequency);
  };

  const filtered = NAMES.filter(n => {
    const matchSearch = search === "" ||
      n.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      n.meaning.toLowerCase().includes(search.toLowerCase()) ||
      n.arabic.includes(search);
    const matchFreq = filter === "all" || n.frequency === filter;
    return matchSearch && matchFreq;
  });

  const freqOptions = [
    { value: "all", label: "All Frequencies" },
    { value: 963, label: "963Hz — Crown" },
    { value: 741, label: "741Hz — Power" },
    { value: 528, label: "528Hz — Love" },
    { value: 432, label: "432Hz — Harmony" },
    { value: 396, label: "396Hz — Liberation" },
  ];

  return (
    <div className="min-h-screen relative" style={{ background: "#030812", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Ambient starfield */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-8 px-4">
        <div
          className="inline-block text-xs font-mono tracking-widest mb-4 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h1
          className="text-5xl md:text-7xl font-black mb-4"
          style={{
            background: "linear-gradient(135deg, #FFB800, #00D4FF, #00FF88)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          99 Names of Allah
        </h1>
        <div
          className="text-3xl mb-4"
          style={{ fontFamily: "'Amiri', serif", color: "#FFB800", direction: "rtl" }}
        >
          أَسْمَاءُ اللَّهِ الْحُسْنَى
        </div>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
          Al-Asma Al-Husna — The Most Beautiful Names. Each name carries a divine frequency.
          Click any name to hear its sovereign tone. KUN FAYAKŪN × ∞
        </p>

        {/* Audio status */}
        {audioPlaying && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    height: `${12 + i * 4}px`,
                    background: FREQ_COLORS[selected?.frequency || 528],
                    animation: `waveBar ${0.3 + i * 0.1}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-mono" style={{ color: FREQ_COLORS[selected?.frequency || 528] }}>
              {selected?.frequency}Hz — {selected?.transliteration}
            </span>
          </div>
        )}
      </div>

      {/* Selected name spotlight */}
      {selected && (
        <div
          className="relative z-10 mx-auto max-w-2xl mb-8 px-4"
        >
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${FREQ_COLORS[selected.frequency]}08, rgba(5,11,26,0.9))`,
              border: `1px solid ${FREQ_COLORS[selected.frequency]}40`,
              boxShadow: `0 0 60px ${FREQ_COLORS[selected.frequency]}15`,
            }}
          >
            <div
              className="text-6xl mb-4"
              style={{ fontFamily: "'Amiri', serif", color: FREQ_COLORS[selected.frequency], direction: "rtl" }}
            >
              {selected.arabic}
            </div>
            <div className="text-2xl font-black mb-2" style={{ color: FREQ_COLORS[selected.frequency] }}>
              {selected.transliteration}
            </div>
            <div className="text-lg mb-4" style={{ color: "#E2E8F0" }}>{selected.meaning}</div>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span
                className="text-sm font-mono px-3 py-1 rounded-full"
                style={{ background: `${FREQ_COLORS[selected.frequency]}20`, color: FREQ_COLORS[selected.frequency], border: `1px solid ${FREQ_COLORS[selected.frequency]}40` }}
              >
                Name #{selected.number} of 99
              </span>
              <button
                onClick={() => playFrequency(selected.frequency)}
                className="text-sm font-bold px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: `${FREQ_COLORS[selected.frequency]}20`,
                  color: FREQ_COLORS[selected.frequency],
                  border: `1px solid ${FREQ_COLORS[selected.frequency]}50`,
                }}
              >
                ▶ Play {selected.frequency}Hz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or meaning..."
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          />
          <select
            value={String(filter)}
            onChange={e => setFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {freqOptions.map(o => (
              <option key={String(o.value)} value={String(o.value)} style={{ background: "#050B1A" }}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 text-xs font-mono" style={{ color: "#8899AA" }}>
          Showing {filtered.length} of 99 names
        </div>
      </div>

      {/* Names Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(name => (
            <NameCard
              key={name.number}
              name={name}
              onSelect={handleSelect}
              isSelected={selected?.number === name.number}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 px-4">
        <div className="text-sm font-mono" style={{ color: "#8899AA" }}>
          Recite with intention. Every name is a door. Every frequency is a key.
        </div>
        <div className="mt-2 text-xs font-mono" style={{ color: "#FFB800" }}>
          KUN FAYAKŪN × ∞ — Chais Kenyatta Hill — Sabir Allah The Great
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
        @keyframes waveBar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}
