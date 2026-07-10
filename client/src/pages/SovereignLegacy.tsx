/**
 * SOVEREIGN LEGACY COLLECTION
 * The Crown Jewel of the ScrollVerse
 * 
 * Sections:
 * 1. Hero — The Sacred Archive
 * 2. 99 Names of Allah — Asma ul-Husna NFT Collection
 * 3. Dubai Visionaries
 * 4. Kings & Conquerors
 * 5. Prophets & Companions
 * 6. Modern Sovereigns
 * 7. Mint CTA
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ── Sacred Color Palette ──────────────────────────────────────────────────────
const GOLD = "#FFB800";
const CYAN = "#00D4FF";
const GREEN = "#00FF88";
const PURPLE = "#9B59B6";
const CRIMSON = "#E74C3C";
const BG = "#030810";

// ── Rarity Config ─────────────────────────────────────────────────────────────
const RARITY_COLORS: Record<string, string> = {
  "SUPREME": "#FFD700",
  "Legendary": "#FFB800",
  "Epic": "#9B59B6",
  "Rare": "#00D4FF",
  "Uncommon": "#00FF88",
  "Common": "#8899AA",
};

// ── 99 Names of Allah ─────────────────────────────────────────────────────────
const NAMES_OF_ALLAH = [
  { n: 1, ar: "الرَّحْمَنُ", tr: "Ar-Rahman", en: "The Most Gracious", hz: 528, rarity: "Legendary" },
  { n: 2, ar: "الرَّحِيمُ", tr: "Ar-Rahim", en: "The Most Merciful", hz: 528, rarity: "Legendary" },
  { n: 3, ar: "الْمَلِكُ", tr: "Al-Malik", en: "The King/Sovereign", hz: 963, rarity: "Legendary" },
  { n: 4, ar: "الْقُدُّوسُ", tr: "Al-Quddus", en: "The Most Sacred", hz: 963, rarity: "Legendary" },
  { n: 5, ar: "السَّلَامُ", tr: "As-Salam", en: "The Source of Peace", hz: 528, rarity: "Legendary" },
  { n: 6, ar: "الْمُؤْمِنُ", tr: "Al-Mu'min", en: "The Guardian of Faith", hz: 432, rarity: "Legendary" },
  { n: 7, ar: "الْمُهَيْمِنُ", tr: "Al-Muhaymin", en: "The Protector", hz: 432, rarity: "Epic" },
  { n: 8, ar: "الْعَزِيزُ", tr: "Al-Aziz", en: "The Almighty", hz: 963, rarity: "Legendary" },
  { n: 9, ar: "الْجَبَّارُ", tr: "Al-Jabbar", en: "The Compeller", hz: 963, rarity: "Epic" },
  { n: 10, ar: "الْمُتَكَبِّرُ", tr: "Al-Mutakabbir", en: "The Supreme", hz: 963, rarity: "Epic" },
  { n: 11, ar: "الْخَالِقُ", tr: "Al-Khaliq", en: "The Creator", hz: 528, rarity: "Legendary" },
  { n: 12, ar: "الْبَارِئُ", tr: "Al-Bari", en: "The Originator", hz: 528, rarity: "Legendary" },
  { n: 13, ar: "الْمُصَوِّرُ", tr: "Al-Musawwir", en: "The Fashioner", hz: 528, rarity: "Epic" },
  { n: 14, ar: "الْغَفَّارُ", tr: "Al-Ghaffar", en: "The Forgiving", hz: 528, rarity: "Rare" },
  { n: 15, ar: "الْقَهَّارُ", tr: "Al-Qahhar", en: "The Subduer", hz: 963, rarity: "Epic" },
  { n: 16, ar: "الْوَهَّابُ", tr: "Al-Wahhab", en: "The Bestower", hz: 528, rarity: "Rare" },
  { n: 17, ar: "الرَّزَّاقُ", tr: "Ar-Razzaq", en: "The Provider", hz: 432, rarity: "Rare" },
  { n: 18, ar: "الْفَتَّاحُ", tr: "Al-Fattah", en: "The Opener", hz: 528, rarity: "Epic" },
  { n: 19, ar: "الْعَلِيمُ", tr: "Al-Alim", en: "The All-Knowing", hz: 963, rarity: "Legendary" },
  { n: 20, ar: "الْقَابِضُ", tr: "Al-Qabid", en: "The Restrainer", hz: 432, rarity: "Uncommon" },
  { n: 21, ar: "الْبَاسِطُ", tr: "Al-Basit", en: "The Expander", hz: 528, rarity: "Uncommon" },
  { n: 22, ar: "الْخَافِضُ", tr: "Al-Khafid", en: "The Reducer", hz: 432, rarity: "Uncommon" },
  { n: 23, ar: "الرَّافِعُ", tr: "Ar-Rafi", en: "The Exalter", hz: 528, rarity: "Uncommon" },
  { n: 24, ar: "الْمُعِزُّ", tr: "Al-Mu'izz", en: "The Honourer", hz: 963, rarity: "Rare" },
  { n: 25, ar: "الْمُذِلُّ", tr: "Al-Mudhill", en: "The Humiliator", hz: 432, rarity: "Uncommon" },
  { n: 26, ar: "السَّمِيعُ", tr: "As-Sami", en: "The All-Hearing", hz: 963, rarity: "Epic" },
  { n: 27, ar: "الْبَصِيرُ", tr: "Al-Basir", en: "The All-Seeing", hz: 963, rarity: "Epic" },
  { n: 28, ar: "الْحَكَمُ", tr: "Al-Hakam", en: "The Judge", hz: 963, rarity: "Rare" },
  { n: 29, ar: "الْعَدْلُ", tr: "Al-Adl", en: "The Just", hz: 528, rarity: "Rare" },
  { n: 30, ar: "اللَّطِيفُ", tr: "Al-Latif", en: "The Subtle One", hz: 528, rarity: "Rare" },
  { n: 31, ar: "الْخَبِيرُ", tr: "Al-Khabir", en: "The All-Aware", hz: 963, rarity: "Rare" },
  { n: 32, ar: "الْحَلِيمُ", tr: "Al-Halim", en: "The Forbearing", hz: 528, rarity: "Uncommon" },
  { n: 33, ar: "الْعَظِيمُ", tr: "Al-Azim", en: "The Magnificent", hz: 963, rarity: "Legendary" },
  { n: 34, ar: "الْغَفُورُ", tr: "Al-Ghafur", en: "The Forgiving", hz: 528, rarity: "Uncommon" },
  { n: 35, ar: "الشَّكُورُ", tr: "Ash-Shakur", en: "The Appreciative", hz: 528, rarity: "Uncommon" },
  { n: 36, ar: "الْعَلِيُّ", tr: "Al-Ali", en: "The Most High", hz: 963, rarity: "Legendary" },
  { n: 37, ar: "الْكَبِيرُ", tr: "Al-Kabir", en: "The Most Great", hz: 963, rarity: "Epic" },
  { n: 38, ar: "الْحَفِيظُ", tr: "Al-Hafiz", en: "The Preserver", hz: 432, rarity: "Rare" },
  { n: 39, ar: "الْمُقِيتُ", tr: "Al-Muqit", en: "The Nourisher", hz: 432, rarity: "Uncommon" },
  { n: 40, ar: "الْحَسِيبُ", tr: "Al-Hasib", en: "The Reckoner", hz: 963, rarity: "Rare" },
  { n: 41, ar: "الْجَلِيلُ", tr: "Al-Jalil", en: "The Majestic", hz: 963, rarity: "Epic" },
  { n: 42, ar: "الْكَرِيمُ", tr: "Al-Karim", en: "The Generous", hz: 528, rarity: "Epic" },
  { n: 43, ar: "الرَّقِيبُ", tr: "Ar-Raqib", en: "The Watchful", hz: 432, rarity: "Rare" },
  { n: 44, ar: "الْمُجِيبُ", tr: "Al-Mujib", en: "The Responsive", hz: 528, rarity: "Rare" },
  { n: 45, ar: "الْوَاسِعُ", tr: "Al-Wasi", en: "The All-Encompassing", hz: 963, rarity: "Epic" },
  { n: 46, ar: "الْحَكِيمُ", tr: "Al-Hakim", en: "The Wise", hz: 963, rarity: "Legendary" },
  { n: 47, ar: "الْوَدُودُ", tr: "Al-Wadud", en: "The Loving", hz: 528, rarity: "Legendary" },
  { n: 48, ar: "الْمَجِيدُ", tr: "Al-Majid", en: "The Glorious", hz: 963, rarity: "Epic" },
  { n: 49, ar: "الْبَاعِثُ", tr: "Al-Ba'ith", en: "The Resurrector", hz: 963, rarity: "Epic" },
  { n: 50, ar: "الشَّهِيدُ", tr: "Ash-Shahid", en: "The Witness", hz: 963, rarity: "Rare" },
  { n: 51, ar: "الْحَقُّ", tr: "Al-Haqq", en: "The Truth", hz: 963, rarity: "Legendary" },
  { n: 52, ar: "الْوَكِيلُ", tr: "Al-Wakil", en: "The Trustee", hz: 432, rarity: "Rare" },
  { n: 53, ar: "الْقَوِيُّ", tr: "Al-Qawi", en: "The Most Strong", hz: 963, rarity: "Epic" },
  { n: 54, ar: "الْمَتِينُ", tr: "Al-Matin", en: "The Firm", hz: 432, rarity: "Rare" },
  { n: 55, ar: "الْوَلِيُّ", tr: "Al-Wali", en: "The Protecting Friend", hz: 528, rarity: "Epic" },
  { n: 56, ar: "الْحَمِيدُ", tr: "Al-Hamid", en: "The Praiseworthy", hz: 528, rarity: "Epic" },
  { n: 57, ar: "الْمُحْصِي", tr: "Al-Muhsi", en: "The Reckoner", hz: 963, rarity: "Rare" },
  { n: 58, ar: "الْمُبْدِئُ", tr: "Al-Mubdi", en: "The Originator", hz: 528, rarity: "Rare" },
  { n: 59, ar: "الْمُعِيدُ", tr: "Al-Mu'id", en: "The Restorer", hz: 528, rarity: "Uncommon" },
  { n: 60, ar: "الْمُحْيِي", tr: "Al-Muhyi", en: "The Giver of Life", hz: 528, rarity: "Epic" },
  { n: 61, ar: "الْمُمِيتُ", tr: "Al-Mumit", en: "The Taker of Life", hz: 432, rarity: "Rare" },
  { n: 62, ar: "الْحَيُّ", tr: "Al-Hayy", en: "The Ever-Living", hz: 963, rarity: "Legendary" },
  { n: 63, ar: "الْقَيُّومُ", tr: "Al-Qayyum", en: "The Self-Subsisting", hz: 963, rarity: "Legendary" },
  { n: 64, ar: "الْوَاجِدُ", tr: "Al-Wajid", en: "The Finder", hz: 528, rarity: "Uncommon" },
  { n: 65, ar: "الْمَاجِدُ", tr: "Al-Majid", en: "The Noble", hz: 963, rarity: "Rare" },
  { n: 66, ar: "الْوَاحِدُ", tr: "Al-Wahid", en: "The One", hz: 963, rarity: "Legendary" },
  { n: 67, ar: "الأَحَدُ", tr: "Al-Ahad", en: "The Unique", hz: 963, rarity: "Legendary" },
  { n: 68, ar: "الصَّمَدُ", tr: "As-Samad", en: "The Eternal", hz: 963, rarity: "Legendary" },
  { n: 69, ar: "الْقَادِرُ", tr: "Al-Qadir", en: "The Capable", hz: 963, rarity: "Epic" },
  { n: 70, ar: "الْمُقْتَدِرُ", tr: "Al-Muqtadir", en: "The Powerful", hz: 963, rarity: "Epic" },
  { n: 71, ar: "الْمُقَدِّمُ", tr: "Al-Muqaddim", en: "The Expediter", hz: 528, rarity: "Rare" },
  { n: 72, ar: "الْمُؤَخِّرُ", tr: "Al-Mu'akhkhir", en: "The Delayer", hz: 432, rarity: "Uncommon" },
  { n: 73, ar: "الأَوَّلُ", tr: "Al-Awwal", en: "The First", hz: 963, rarity: "Legendary" },
  { n: 74, ar: "الآخِرُ", tr: "Al-Akhir", en: "The Last", hz: 963, rarity: "Legendary" },
  { n: 75, ar: "الظَّاهِرُ", tr: "Az-Zahir", en: "The Manifest", hz: 528, rarity: "Epic" },
  { n: 76, ar: "الْبَاطِنُ", tr: "Al-Batin", en: "The Hidden", hz: 432, rarity: "Epic" },
  { n: 77, ar: "الْوَالِي", tr: "Al-Wali", en: "The Governor", hz: 963, rarity: "Rare" },
  { n: 78, ar: "الْمُتَعَالِي", tr: "Al-Muta'ali", en: "The Most Exalted", hz: 963, rarity: "Legendary" },
  { n: 79, ar: "الْبَرُّ", tr: "Al-Barr", en: "The Source of Goodness", hz: 528, rarity: "Rare" },
  { n: 80, ar: "التَّوَّابُ", tr: "At-Tawwab", en: "The Acceptor of Repentance", hz: 528, rarity: "Rare" },
  { n: 81, ar: "الْمُنْتَقِمُ", tr: "Al-Muntaqim", en: "The Avenger", hz: 963, rarity: "Epic" },
  { n: 82, ar: "الْعَفُوُّ", tr: "Al-Afu", en: "The Pardoner", hz: 528, rarity: "Rare" },
  { n: 83, ar: "الرَّؤُوفُ", tr: "Ar-Ra'uf", en: "The Compassionate", hz: 528, rarity: "Epic" },
  { n: 84, ar: "مَالِكُ الْمُلْكِ", tr: "Malik-ul-Mulk", en: "Owner of All Sovereignty", hz: 963, rarity: "Legendary" },
  { n: 85, ar: "ذُوالْجَلاَلِ وَالإِكْرَامِ", tr: "Dhul-Jalali wal-Ikram", en: "Lord of Majesty and Bounty", hz: 963, rarity: "Legendary" },
  { n: 86, ar: "الْمُقْسِطُ", tr: "Al-Muqsit", en: "The Equitable", hz: 528, rarity: "Rare" },
  { n: 87, ar: "الْجَامِعُ", tr: "Al-Jami", en: "The Gatherer", hz: 528, rarity: "Rare" },
  { n: 88, ar: "الْغَنِيُّ", tr: "Al-Ghani", en: "The Self-Sufficient", hz: 963, rarity: "Epic" },
  { n: 89, ar: "الْمُغْنِي", tr: "Al-Mughni", en: "The Enricher", hz: 528, rarity: "Rare" },
  { n: 90, ar: "الْمَانِعُ", tr: "Al-Mani", en: "The Preventer", hz: 432, rarity: "Uncommon" },
  { n: 91, ar: "الضَّارُّ", tr: "Ad-Darr", en: "The Distresser", hz: 432, rarity: "Uncommon" },
  { n: 92, ar: "النَّافِعُ", tr: "An-Nafi", en: "The Propitious", hz: 528, rarity: "Rare" },
  { n: 93, ar: "النُّورُ", tr: "An-Nur", en: "The Light", hz: 528, rarity: "Legendary" },
  { n: 94, ar: "الْهَادِي", tr: "Al-Hadi", en: "The Guide", hz: 528, rarity: "Legendary" },
  { n: 95, ar: "الْبَدِيعُ", tr: "Al-Badi", en: "The Incomparable", hz: 963, rarity: "Epic" },
  { n: 96, ar: "الْبَاقِي", tr: "Al-Baqi", en: "The Everlasting", hz: 963, rarity: "Legendary" },
  { n: 97, ar: "الْوَارِثُ", tr: "Al-Warith", en: "The Inheritor", hz: 963, rarity: "Epic" },
  { n: 98, ar: "الرَّشِيدُ", tr: "Ar-Rashid", en: "The Guide to Right Path", hz: 528, rarity: "Epic" },
  { n: 99, ar: "الصَّبُورُ", tr: "As-Sabur", en: "The Patient", hz: 432, rarity: "Legendary" },
];

// ── Sovereign Figures ─────────────────────────────────────────────────────────
const SOVEREIGNS = [
  {
    category: "Prophets & Companions",
    color: GOLD,
    icon: "☪️",
    figures: [
      { name: "Muhammad ﷺ", subtitle: "Seal of the Prophets — Habibullah", hz: 528, rarity: "SUPREME", quote: "The best of you are those who are best to their families.", legacy: "Received the Quran. United Arabia. The most influential human being in history." },
      { name: "Ibrahim (AS)", subtitle: "Khalilullah — Friend of Allah", hz: 963, rarity: "Legendary", quote: "My Lord, make this city secure and provide its people with fruits.", legacy: "Built the Kaaba. Father of nations. Patriarch of monotheism." },
      { name: "Musa (AS)", subtitle: "Kalimullah — He Who Spoke to Allah", hz: 963, rarity: "Legendary", quote: "My Lord, expand for me my breast and ease for me my task.", legacy: "Led the Children of Israel out of slavery. Received the Torah on Mount Sinai." },
      { name: "Isa (AS)", subtitle: "Ruhullah — Spirit of Allah", hz: 528, rarity: "Legendary", quote: "Love one another as I have loved you.", legacy: "Healer, teacher, miracle-worker. Will return before the Day of Judgment." },
      { name: "Abu Bakr As-Siddiq (RA)", subtitle: "First Caliph — The Truthful", hz: 528, rarity: "Legendary", quote: "Do not follow vain desires, for he who prospers is preserved from lust.", legacy: "The closest companion of the Prophet ﷺ. First Caliph of Islam." },
      { name: "Umar ibn Al-Khattab (RA)", subtitle: "Al-Farooq — The Distinguisher", hz: 963, rarity: "Legendary", quote: "Whosoever shows you your faults is your friend.", legacy: "Second Caliph. Expanded the Islamic empire from Persia to Egypt." },
      { name: "Ali ibn Abi Talib (RA)", subtitle: "Asadullah — Lion of Allah", hz: 963, rarity: "Legendary", quote: "Do not use the sharpness of your speech on the mother who taught you how to speak.", legacy: "Fourth Caliph. Gate of the City of Knowledge. Unmatched warrior and scholar." },
    ]
  },
  {
    category: "Dubai Visionaries",
    color: CYAN,
    icon: "🏙️",
    figures: [
      { name: "Sheikh Mohammed bin Rashid", subtitle: "Ruler of Dubai — Visionary Architect of the Impossible", hz: 963, rarity: "Legendary", quote: "If you think big, you'll achieve big. If you think small, you'll achieve small.", legacy: "Transformed desert into the world's most futuristic city. Burj Khalifa, Palm Jumeirah, Dubai Expo 2020." },
      { name: "Sheikh Zayed bin Sultan", subtitle: "Founding Father of the UAE — Father of the Nation", hz: 528, rarity: "Legendary", quote: "Wealth is not in money; wealth is in the mind.", legacy: "United 7 tribes into one nation. Built a civilization from nothing." },
      { name: "Sheikh Hamdan (Fazza)", subtitle: "Crown Prince of Dubai — Poet-King", hz: 432, rarity: "Epic", quote: "The sky is not the limit — your mind is.", legacy: "Poet, athlete, visionary. The new generation of sovereign leadership." },
    ]
  },
  {
    category: "Kings & Conquerors",
    color: CRIMSON,
    icon: "⚔️",
    figures: [
      { name: "Saladin", subtitle: "Sultan of Egypt and Syria — Liberator of Jerusalem", hz: 963, rarity: "Legendary", quote: "A man should be feared for his justice, not for his cruelty.", legacy: "Reconquered Jerusalem in 1187 with mercy and honor. The greatest military commander of the medieval world." },
      { name: "Mansa Musa I", subtitle: "Emperor of Mali — Richest Person in All of History", hz: 528, rarity: "Legendary", quote: "Gold is not wealth. Wisdom is wealth.", legacy: "His 1324 pilgrimage distributed so much gold it caused inflation across North Africa. Built the University of Timbuktu." },
      { name: "Suleiman the Magnificent", subtitle: "Sultan of the Ottoman Empire — Lawgiver", hz: 963, rarity: "Legendary", quote: "The people who are truly free are those who are free from their desires.", legacy: "Ruled the largest empire of his era. Patron of arts, architecture, and law." },
      { name: "Shaka Zulu", subtitle: "King of the Zulu Kingdom — Military Revolutionary", hz: 432, rarity: "Epic", quote: "I need no bodyguard at all, for even my enemies concede my superiority.", legacy: "Transformed the Zulu from a small clan into the most powerful nation in southern Africa." },
      { name: "Alexander the Great", subtitle: "King of Macedon, Pharaoh of Egypt, Lord of Asia", hz: 963, rarity: "Legendary", quote: "There is nothing impossible to him who will try.", legacy: "Created one of the largest empires in ancient history by age 30." },
      { name: "Cyrus the Great", subtitle: "King of Kings — Founder of the Persian Empire", hz: 528, rarity: "Legendary", quote: "Diversity in counsel, unity in command.", legacy: "Author of the first human rights charter (Cyrus Cylinder). Freed enslaved peoples." },
    ]
  },
  {
    category: "Modern Sovereigns",
    color: GREEN,
    icon: "✊🏾",
    figures: [
      { name: "Nipsey Hussle", subtitle: "The Marathon Continues — Crenshaw King", hz: 528, rarity: "Legendary", quote: "The highest human act is to inspire.", legacy: "Self-made entrepreneur, community builder, music revolutionary. Bought back the block. The Marathon Continues ∞" },
      { name: "Malcolm X", subtitle: "El-Hajj Malik El-Shabazz — Voice of the Oppressed", hz: 963, rarity: "Legendary", quote: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", legacy: "Transformed from street to global revolutionary. Embraced true Islam at Mecca. Died for truth." },
      { name: "Nelson Mandela", subtitle: "Madiba — Father of Democratic South Africa", hz: 528, rarity: "Legendary", quote: "It always seems impossible until it's done.", legacy: "27 years in prison. Emerged without bitterness. Dismantled apartheid with love and strategy." },
      { name: "Marcus Garvey", subtitle: "Black Moses — Prophet of Pan-Africanism", hz: 432, rarity: "Epic", quote: "Up, you mighty race, accomplish what you will.", legacy: "Founded UNIA. First to envision a unified Africa. Inspired Malcolm X and the entire Black liberation movement." },
      { name: "Chais Sabir", subtitle: "OMNI-SOVEREIGN — Architect of the ScrollVerse", hz: 528, rarity: "SUPREME", quote: "KUN FAYAKŪN × ∞ — I am the currency. The empire is real.", legacy: "Built the ScrollVerse Trinity. Created the first sovereign digital empire powered by love, code, and divine intention. Father. Builder. King." },
    ]
  },
];

// ── Name Card Component ───────────────────────────────────────────────────────
function NameCard({ name, onSelect }: { name: typeof NAMES_OF_ALLAH[0]; onSelect: (n: typeof NAMES_OF_ALLAH[0]) => void }) {
  const color = RARITY_COLORS[name.rarity] || RARITY_COLORS["Common"];
  const hzColor = name.hz === 528 ? "#00FF88" : name.hz === 963 ? "#FFB800" : "#00D4FF";

  return (
    <div
      onClick={() => onSelect(name)}
      className="cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-105 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}08, ${color}03)`,
        border: `1px solid ${color}30`,
      }}
    >
      <div className="absolute top-2 right-2 text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: `${color}20`, color }}>
        #{name.n}
      </div>
      <div className="text-2xl font-bold mb-1 text-right" style={{ fontFamily: "serif", color, direction: "rtl" }}>
        {name.ar}
      </div>
      <div className="text-xs font-mono mb-0.5" style={{ color: hzColor }}>{name.hz} Hz</div>
      <div className="text-sm font-semibold text-white">{name.tr}</div>
      <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{name.en}</div>
      <div className="mt-2 text-xs font-mono px-2 py-0.5 rounded-full inline-block" style={{ background: `${color}15`, color }}>
        {name.rarity}
      </div>
    </div>
  );
}

// ── Sovereign Figure Card ─────────────────────────────────────────────────────
function FigureCard({ figure, color }: { figure: typeof SOVEREIGNS[0]["figures"][0]; color: string }) {
  const [expanded, setExpanded] = useState(false);
  const rarityColor = RARITY_COLORS[figure.rarity] || color;

  return (
    <div
      className="rounded-xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden"
      style={{
        background: expanded ? `${color}08` : `${color}04`,
        border: `1px solid ${expanded ? color + "40" : color + "20"}`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {figure.rarity === "SUPREME" && (
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(135deg, rgba(255,215,0,0.05), transparent, rgba(255,215,0,0.05))",
          animation: "pulse 3s infinite",
        }} />
      )}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-bold text-white text-lg">{figure.name}</div>
          <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>{figure.subtitle}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${rarityColor}20`, color: rarityColor }}>
            {figure.rarity}
          </div>
          <div className="text-xs font-mono" style={{ color: figure.hz === 528 ? GREEN : figure.hz === 963 ? GOLD : CYAN }}>
            {figure.hz} Hz
          </div>
        </div>
      </div>
      <blockquote className="text-sm italic mb-3" style={{ color: color, borderLeft: `2px solid ${color}40`, paddingLeft: "12px" }}>
        "{figure.quote}"
      </blockquote>
      {expanded && (
        <div className="text-sm mt-3 pt-3" style={{ color: "#AABBCC", borderTop: `1px solid ${color}20` }}>
          {figure.legacy}
        </div>
      )}
      <div className="text-xs mt-2" style={{ color: "#8899AA" }}>
        {expanded ? "▲ Click to collapse" : "▼ Click to expand legacy"}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SovereignLegacy() {
  const { isAuthenticated } = useAuth();
  const nftCheckout = trpc.stripe.createNFTCheckoutSession.useMutation({
    onSuccess: (data) => { window.location.href = data.url; },
    onError: (err) => { toast.error(err.message || "Checkout failed"); },
  });
  const [nameFilter, setNameFilter] = useState<string>("All");
  const [selectedName, setSelectedName] = useState<typeof NAMES_OF_ALLAH[0] | null>(null);
  const [activeSection, setActiveSection] = useState("99-names");
  const [mintedCount, setMintedCount] = useState(7777);
  const heroRef = useRef<HTMLDivElement>(null);

  // Simulate live mint counter
  useEffect(() => {
    const interval = setInterval(() => {
      setMintedCount(c => c + Math.floor(Math.random() * 2));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const filteredNames = nameFilter === "All"
    ? NAMES_OF_ALLAH
    : NAMES_OF_ALLAH.filter(n => n.rarity === nameFilter);

  const sections = [
    { id: "99-names", label: "99 Names", icon: "☪️" },
    { id: "prophets", label: "Prophets", icon: "🕊️" },
    { id: "dubai", label: "Dubai", icon: "🏙️" },
    { id: "kings", label: "Kings", icon: "⚔️" },
    { id: "modern", label: "Modern", icon: "✊🏾" },
  ];

  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden py-24 px-4"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(255,184,0,0.12) 0%, transparent 70%), ${BG}`,
        }}
      >
        {/* Floating Arabic calligraphy background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div
            className="text-9xl font-bold opacity-5 select-none"
            style={{ fontFamily: "serif", color: GOLD, direction: "rtl" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
        </div>

        <div className="container max-w-5xl mx-auto text-center relative z-10">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: GOLD }}>
            ◈ SOVEREIGN LEGACY COLLECTION ◈
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            The Sacred<br />
            <span style={{ color: GOLD }}>Archive</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-4" style={{ color: "#8899AA" }}>
            99 Names of Allah. Prophets. Kings. Conquerors. Visionaries. Modern Sovereigns.
            Every great soul who shaped existence — immortalized as sovereign NFTs on the ScrollVerse.
          </p>
          <div className="text-2xl font-bold mb-8" style={{ color: GOLD, fontFamily: "serif" }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
            <span className="text-sm font-mono" style={{ color: GREEN }}>
              {mintedCount.toLocaleString()} NFTs Minted
            </span>
            <span className="text-sm font-mono" style={{ color: "#8899AA" }}>
              / 144,000 Total Supply
            </span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              className="px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #FF8C00)`, color: "#050B1A" }}
            >
              Mint Your Legacy NFT
            </button>
            <Link href="/chxtoken">
              <button
                className="px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(0,212,255,0.1)", border: `1px solid ${CYAN}40`, color: CYAN }}
              >
                Reserve $CHX
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── SECTION NAV ── */}
      <div className="sticky top-0 z-40 py-3 px-4" style={{ background: "rgba(3,8,16,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid rgba(255,184,0,0.1)` }}>
        <div className="container max-w-5xl mx-auto flex gap-2 overflow-x-auto">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={activeSection === s.id
                ? { background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }
                : { color: "#8899AA", border: "1px solid transparent" }
              }
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-12">

        {/* ── 99 NAMES OF ALLAH ── */}
        {activeSection === "99-names" && (
          <div>
            <div className="text-center mb-10">
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: GOLD }}>ASMA UL-HUSNA</div>
              <h2 className="text-4xl font-black text-white mb-3">
                The 99 Names of Allah
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: "#8899AA" }}>
                Each name is a sovereign NFT carrying the divine attribute, sacred frequency, and eternal wisdom.
                Collect them all. Meditate on them. Let them transform you.
              </p>
              <div className="mt-4 text-xl font-bold" style={{ color: GOLD, fontFamily: "serif", direction: "rtl" }}>
                اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ
              </div>
              <div className="text-xs mt-1" style={{ color: "#8899AA" }}>
                "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence." (2:255)
              </div>
            </div>

            {/* Rarity Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {["All", "Legendary", "Epic", "Rare", "Uncommon"].map(r => (
                <button
                  key={r}
                  onClick={() => setNameFilter(r)}
                  className="px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200"
                  style={nameFilter === r
                    ? { background: `${RARITY_COLORS[r] || GOLD}30`, color: RARITY_COLORS[r] || GOLD, border: `1px solid ${RARITY_COLORS[r] || GOLD}50` }
                    : { color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }
                  }
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Names Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredNames.map(name => (
                <NameCard key={name.n} name={name} onSelect={setSelectedName} />
              ))}
            </div>

            {/* Selected Name Modal */}
            {selectedName && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
                onClick={() => setSelectedName(null)}
              >
                <div
                  className="rounded-2xl p-8 max-w-md w-full text-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${RARITY_COLORS[selectedName.rarity] || GOLD}10, rgba(3,8,16,0.98))`,
                    border: `2px solid ${RARITY_COLORS[selectedName.rarity] || GOLD}50`,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="text-xs font-mono mb-4" style={{ color: RARITY_COLORS[selectedName.rarity] || GOLD }}>
                    NAME #{selectedName.n} — {selectedName.rarity.toUpperCase()}
                  </div>
                  <div
                    className="text-6xl font-bold mb-4"
                    style={{ fontFamily: "serif", color: RARITY_COLORS[selectedName.rarity] || GOLD, direction: "rtl" }}
                  >
                    {selectedName.ar}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{selectedName.tr}</div>
                  <div className="text-base mb-4" style={{ color: "#AABBCC" }}>{selectedName.en}</div>
                  <div className="text-sm font-mono mb-6" style={{
                    color: selectedName.hz === 528 ? GREEN : selectedName.hz === 963 ? GOLD : CYAN
                  }}>
                    ◉ {selectedName.hz} Hz — Sacred Frequency
                  </div>
                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${RARITY_COLORS[selectedName.rarity] || GOLD}, ${RARITY_COLORS[selectedName.rarity] || GOLD}80)`, color: "#050B1A" }}
                    onClick={() => {
                      if (!isAuthenticated) {
                        window.location.href = getLoginUrl();
                        return;
                      }
                      nftCheckout.mutate({
                        nftId: `sovereign-legacy-name-${selectedName?.n ?? 0}-${Date.now()}`,
                        nftName: `${selectedName?.tr ?? "Sacred Name"} — ${selectedName?.en ?? ""}`,
                        nftDescription: `One of the 99 Names of Allah. ${selectedName?.rarity ?? ""} rarity. ${selectedName?.hz ?? 528}Hz sacred frequency. Sealed on Scroll zkEVM.`,
                        priceUsd: 144,
                        origin: window.location.origin,
                      });
                    }}
                  >
                    Mint This Name — 144 $CHX
                  </button>
                  <button
                    className="mt-3 text-xs"
                    style={{ color: "#8899AA" }}
                    onClick={() => setSelectedName(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SOVEREIGN FIGURE SECTIONS ── */}
        {["prophets", "dubai", "kings", "modern"].map(sectionId => {
          const categoryMap: Record<string, string> = {
            prophets: "Prophets & Companions",
            dubai: "Dubai Visionaries",
            kings: "Kings & Conquerors",
            modern: "Modern Sovereigns",
          };
          const category = SOVEREIGNS.find(s => s.category === categoryMap[sectionId]);
          if (!category || activeSection !== sectionId) return null;

          return (
            <div key={sectionId}>
              <div className="text-center mb-10">
                <div className="text-4xl mb-3">{category.icon}</div>
                <div className="text-xs font-mono tracking-widest mb-3" style={{ color: category.color }}>
                  SOVEREIGN LEGACY COLLECTION
                </div>
                <h2 className="text-4xl font-black text-white mb-3">{category.category}</h2>
                <p className="text-sm max-w-xl mx-auto" style={{ color: "#8899AA" }}>
                  {sectionId === "prophets" && "The chosen messengers of Allah — peace and blessings be upon them all. Each NFT carries their divine frequency and eternal wisdom."}
                  {sectionId === "dubai" && "The architects of the impossible. Men who turned vision into reality and built cities from desert sand."}
                  {sectionId === "kings" && "The greatest military commanders, empire builders, and sovereign rulers in human history."}
                  {sectionId === "modern" && "The freedom fighters, truth-tellers, and sovereign builders of the modern era. Their legacy lives in every Guardian."}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.figures.map((figure, i) => (
                  <FigureCard key={i} figure={figure} color={category.color} />
                ))}
              </div>
            </div>
          );
        })}

      </div>

      {/* ── MINT CTA ── */}
      <div className="py-20 px-4" style={{ background: `linear-gradient(135deg, rgba(255,184,0,0.05), rgba(0,212,255,0.05))` }}>
        <div className="container max-w-3xl mx-auto text-center">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: GOLD }}>
            KUN FAYAKŪN × ∞
          </div>
          <h2 className="text-4xl font-black text-white mb-4">
            Own a Piece of Sacred History
          </h2>
          <p className="text-base mb-8" style={{ color: "#8899AA" }}>
            Every NFT in the Sovereign Legacy Collection is minted on-chain with your Guardian wallet.
            Each carries its sacred frequency, wisdom, and rarity — forever yours on the ScrollVerse.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Supply", value: "144,000" },
              { label: "Collections", value: "6" },
              { label: "Mint Price", value: "144 $CHX" },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl p-4" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-2xl font-black" style={{ color: GOLD }}>{stat.value}</div>
                <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #FF8C00)`, color: "#050B1A" }}
              onClick={() => {
                if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
                alert("Full minting interface coming with smart contract deployment. Reserve your $CHX now to be first.");
              }}
            >
              Mint Your Legacy NFT
            </button>
            <Link href="/staking">
              <button
                className="px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(0,212,255,0.1)", border: `1px solid ${CYAN}40`, color: CYAN }}
              >
                Stake $CHX → Earn NFTs
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="py-8 px-4 text-center" style={{ borderTop: "1px solid rgba(255,184,0,0.1)" }}>
        <div className="text-sm font-bold" style={{ color: GOLD }}>
          ALLAHU AKBAR! BARAKALLAHU FEEK! KUN FAYAKŪN × ∞
        </div>
        <div className="text-xs mt-2" style={{ color: "#8899AA" }}>
          ScrollVerse Sovereign Legacy Collection — Built with love by Chais Sabir & Manus AI
        </div>
      </div>
    </div>
  );
}
