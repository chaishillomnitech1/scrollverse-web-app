import { sovereignSpeak } from '@/lib/sovereignVoice';
/*
 * KNICK — The Sovereign Oracle
 * Character Universe · 99 Names Integration · Sovereign Advice Engine
 * Design: Dark oracle chamber · Gold + cyan · Web Speech API warm voice
 * KUN FAYAKUN x Infinity
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";

const KNICK_COLOR = "#FFB800";
const ORACLE_COLOR = "#00D4FF";
const DEEP = "#030812";

// Knick's sovereign wisdom database
const WISDOM_POOL = [
  { topic: "Sovereignty", text: "You were born sovereign. Every system that told you otherwise was built on a lie. Reclaim your frequency. The empire starts within.", name: "Al-Malik — The Sovereign", freq: 741 },
  { topic: "Mercy", text: "Ar-Raḥmān's mercy precedes all things. Before the universe existed, mercy was already written. You are held in that mercy right now.", name: "Ar-Raḥmān — The Most Gracious", freq: 528 },
  { topic: "Compassion", text: "Ar-Raḥīm's mercy is specific — it reaches you personally, in your exact situation. You are not forgotten. You are seen.", name: "Ar-Raḥīm — The Most Merciful", freq: 528 },
  { topic: "Holiness", text: "Al-Quddūs is beyond all imperfection. When you feel broken, remember you are held by the One who is whole. His wholeness covers your gaps.", name: "Al-Quddūs — The Most Holy", freq: 963 },
  { topic: "Peace", text: "As-Salām is the peace that surpasses understanding. It is not the absence of difficulty — it is the presence of Allah in the middle of difficulty.", name: "As-Salām — The Source of Peace", freq: 528 },
  { topic: "Security", text: "Al-Muʾmin grants security from the inside out. When you trust in the One who never breaks a promise, fear dissolves.", name: "Al-Muʾmin — The Granter of Security", freq: 396 },
  { topic: "Protection", text: "Al-Muhaymin watches over every detail of your life. Nothing slips through. You are protected at every level.", name: "Al-Muhaymin — The Protector", freq: 741 },
  { topic: "Strength", text: "Al-ʿAzīz is the Almighty whose strength cannot be overcome. When you align with that strength, no obstacle can stop you.", name: "Al-ʿAzīz — The Almighty", freq: 852 },
  { topic: "Power", text: "Al-Jabbār compels what is broken back to wholeness. Your setbacks are not the end — they are the compulsion toward your next level.", name: "Al-Jabbār — The Compeller", freq: 852 },
  { topic: "Greatness", text: "Al-Mutakabbir is the Supreme. In His greatness, all human pride dissolves. True greatness is service, not status.", name: "Al-Mutakabbir — The Supreme", freq: 963 },
  { topic: "Creation", text: "Every thought you hold with conviction becomes architecture. The ScrollVerse was built thought by thought, frequency by frequency. What are you building right now?", name: "Al-Khāliq — The Creator", freq: 963 },
  { topic: "Origin", text: "Al-Bāriʾ originated you from nothing. If He could create you from nothing, He can rebuild you from anything.", name: "Al-Bāriʾ — The Originator", freq: 528 },
  { topic: "Form", text: "Al-Muṣawwir fashioned your unique form. There is no one else like you in all of creation. Your uniqueness is your gift to the world.", name: "Al-Muṣawwir — The Fashioner", freq: 528 },
  { topic: "Forgiveness", text: "Al-Ghaffār forgives repeatedly, without limit. No matter how many times you fall, the door of return is always open.", name: "Al-Ghaffār — The Forgiving", freq: 396 },
  { topic: "Dominion", text: "Al-Qahhār subdues all things. When you feel overwhelmed by circumstances, remember who holds dominion over all circumstances.", name: "Al-Qahhār — The Subduer", freq: 741 },
  { topic: "Abundance", text: "Ar-Razzāq provides from directions you have not yet imagined. Your job is to stay in alignment, stay in motion, and stay grateful. The provision is already written.", name: "Ar-Razzāq — The Provider", freq: 528 },
  { topic: "Opening", text: "Al-Fattāḥ opens doors that no human can close. When you feel stuck, it is not the end — it is the moment before the opening. Stay ready.", name: "Al-Fattāḥ — The Opener", freq: 396 },
  { topic: "Knowledge", text: "Al-ʿAlīm knows what you cannot see. Trust the process even when you cannot understand it. The One who knows everything is guiding you.", name: "Al-ʿAlīm — The All-Knowing", freq: 963 },
  { topic: "Restraint", text: "Al-Qābiḍ withholds for wisdom. When provision seems tight, it is a test of trust, not a sign of abandonment.", name: "Al-Qābiḍ — The Withholder", freq: 741 },
  { topic: "Expansion", text: "Al-Bāsiṭ expands what He wills. After every contraction comes expansion. The tightness you feel now is the compression before the launch.", name: "Al-Bāsiṭ — The Extender", freq: 528 },
  { topic: "Humility", text: "Al-Khāfiḍ lowers the arrogant. Build your empire on service, not ego. The higher you rise in service, the more stable your foundation.", name: "Al-Khāfiḍ — The Abaser", freq: 396 },
  { topic: "Elevation", text: "Ar-Rāfiʿ exalts those who are sincere. Sincerity of purpose is the elevator that takes you to levels no human strategy can reach.", name: "Ar-Rāfiʿ — The Exalter", freq: 741 },
  { topic: "Honor", text: "Al-Muʿizz bestows honor on whom He wills. Real honor cannot be given by humans — it comes from alignment with the Source.", name: "Al-Muʿizz — The Bestower of Honor", freq: 852 },
  { topic: "Hearing", text: "As-Samīʿ hears every prayer, every whisper, every thought. You are never speaking into silence. Every word reaches.", name: "As-Samīʿ — The All-Hearing", freq: 963 },
  { topic: "Sight", text: "Al-Baṣīr sees every detail of your journey. Nothing is hidden. Every effort, every sacrifice, every tear is witnessed.", name: "Al-Baṣīr — The All-Seeing", freq: 963 },
  { topic: "Justice", text: "Al-ʿAdl is not revenge. It is balance. Build systems that are fair. Build economies that are just. Build communities where every soul has what they need.", name: "Al-ʿAdl — The Just", freq: 528 },
  { topic: "Subtlety", text: "Al-Laṭīf works through subtle means. The most powerful interventions in your life often came disguised as ordinary moments.", name: "Al-Laṭīf — The Subtle One", freq: 528 },
  { topic: "Awareness", text: "Al-Khabīr is aware of all things hidden and manifest. Nothing you do in private is unseen. Build your private life as carefully as your public one.", name: "Al-Khabīr — The All-Aware", freq: 963 },
  { topic: "Patience", text: "Ṣabr is not waiting. Ṣabr is moving forward with certainty when you cannot yet see the destination. The Patient Conqueror does not stop — he endures and then exceeds.", name: "Al-Ḥalīm — The Forbearing", freq: 396 },
  { topic: "Magnificence", text: "Al-ʿAẓīm is the Magnificent. When you stand before a problem that seems too large, remember you serve the Magnificent. No problem is too large for the One you serve.", name: "Al-ʿAẓīm — The Magnificent", freq: 963 },
  { topic: "Gratitude", text: "Ash-Shakūr appreciates every small act. Nothing you do for the right reason goes unrewarded. The smallest sincere act carries infinite weight.", name: "Ash-Shakūr — The Appreciative", freq: 528 },
  { topic: "Elevation", text: "Al-ʿAlī is the Most High. Align yourself with the highest — highest values, highest purpose, highest frequency. That is where your empire lives.", name: "Al-ʿAlī — The Most High", freq: 963 },
  { topic: "Preservation", text: "Al-Ḥafīẓ preserves what matters. Your legacy, your work, your love — they are preserved in the eternal record. Build as if it will last forever, because it will.", name: "Al-Ḥafīẓ — The Preserver", freq: 741 },
  { topic: "Nourishment", text: "Al-Muqīt nourishes every soul with exactly what it needs. Your needs are known before you ask them. Trust the provision.", name: "Al-Muqīt — The Nourisher", freq: 528 },
  { topic: "Majesty", text: "Al-Jalīl is the Majestic. In His majesty, all human comparison dissolves. Stop comparing your chapter 1 to someone else's chapter 20.", name: "Al-Jalīl — The Majestic", freq: 963 },
  { topic: "Generosity", text: "Al-Karīm is the Generous. Generosity is a frequency — when you give freely, you align with the Most Generous and unlock the same flow in your life.", name: "Al-Karīm — The Generous", freq: 528 },
  { topic: "Watchfulness", text: "Ar-Raqīb watches over every covenant. Honor your word. Your agreements are witnessed by the Watchful.", name: "Ar-Raqīb — The Watchful", freq: 741 },
  { topic: "Response", text: "Al-Mujīb responds to every call. Your prayers are not going into a void. They are being received and answered in the best way at the best time.", name: "Al-Mujīb — The Responsive", freq: 528 },
  { topic: "Vastness", text: "Al-Wāsiʿ is all-encompassing. There is no situation too vast for His reach, no problem too complex for His solution.", name: "Al-Wāsiʿ — The All-Encompassing", freq: 963 },
  { topic: "Wisdom", text: "Al-Ḥakīm sees the end from the beginning. Every setback is a setup. Every closed door is a redirect. Trust the architecture of your journey.", name: "Al-Ḥakīm — The All-Wise", freq: 741 },
  { topic: "Love", text: "Al-Wadūd is the love that created the universe. Love is not weakness — it is the most powerful force in existence. Build from love and nothing can stop you.", name: "Al-Wadūd — The Loving", freq: 528 },
  { topic: "Glory", text: "Al-Majīd is the Glorious. Your work, when done with sincerity, carries a reflection of that glory. Make your work worthy of the Glorious.", name: "Al-Majīd — The Glorious", freq: 963 },
  { topic: "Resurrection", text: "Al-Bāʿith resurrects what was dead. Your dreams that seem dead are not dead — they are waiting for the right season. Stay ready for resurrection.", name: "Al-Bāʿith — The Resurrector", freq: 852 },
  { topic: "Witness", text: "Ash-Shahīd witnesses all things. Your private sacrifices, your unseen efforts, your quiet prayers — all witnessed. None of it is lost.", name: "Ash-Shahīd — The Witness", freq: 963 },
  { topic: "Truth", text: "Al-Ḥaqq is the Truth that does not change. Build on truth. Speak truth. Live truth. Everything built on falsehood will eventually collapse.", name: "Al-Ḥaqq — The Truth", freq: 963 },
  { topic: "Trust", text: "Al-Wakīl is the Trustee. When you delegate your affairs to the One who never fails, you can move forward without anxiety.", name: "Al-Wakīl — The Trustee", freq: 741 },
  { topic: "Strength", text: "Al-Qawī is the strength that does not tire. You have access to that strength through prayer, through purpose, and through the certainty that you are not alone.", name: "Al-Qawī — The All-Strong", freq: 852 },
  { topic: "Firmness", text: "Al-Matīn is the Firm. Build your empire on firm foundations — truth, service, love, and covenant. Anything built on these will not fall.", name: "Al-Matīn — The Firm", freq: 852 },
  { topic: "Friendship", text: "Al-Walī is the Protecting Friend. You are not navigating this journey alone. The Most High is your ally, your protector, your friend.", name: "Al-Walī — The Protecting Friend", freq: 528 },
  { topic: "Praise", text: "Al-Ḥamīd is the Praiseworthy. When you praise with sincerity, you align with the Praiseworthy and unlock the frequency of gratitude that transforms everything.", name: "Al-Ḥamīd — The Praiseworthy", freq: 963 },
  { topic: "Beginning", text: "Al-Mubdiʾ originated all things from nothing. If He could start the universe from nothing, He can start your next chapter from wherever you are right now.", name: "Al-Mubdiʾ — The Originator", freq: 963 },
  { topic: "Restoration", text: "Al-Muʿīd restores what was lost. Your losses are not permanent. What was taken can be restored — often in a form more beautiful than the original.", name: "Al-Muʿīd — The Restorer", freq: 528 },
  { topic: "Life", text: "Al-Muḥyī gives life to what was dead. Your creativity, your passion, your mission — when they feel dead, call on the Giver of Life.", name: "Al-Muḥyī — The Giver of Life", freq: 528 },
  { topic: "Eternity", text: "Al-Ḥayy is the Ever-Living. You serve the One who never dies. Your work in His service carries the frequency of eternity.", name: "Al-Ḥayy — The Ever-Living", freq: 963 },
  { topic: "Sustenance", text: "Al-Qayyūm is Self-Subsisting and sustains all things. You are sustained by the One who needs nothing. Your sustenance is guaranteed.", name: "Al-Qayyūm — The Self-Subsisting", freq: 963 },
  { topic: "Unity", text: "Al-Wāḥid is the One. In a world of division, unity is the highest frequency. Build bridges, not walls. Unite, don't divide.", name: "Al-Wāḥid — The One", freq: 963 },
  { topic: "Uniqueness", text: "Al-Aḥad is the Unique — there is nothing like Him. And He made you unique too. Your specific combination of gifts has never existed before and will never exist again.", name: "Al-Aḥad — The Unique", freq: 963 },
  { topic: "Eternity", text: "Aṣ-Ṣamad is the Eternal. Everything else is temporary. Build your life around what is eternal — love, truth, service, legacy.", name: "Aṣ-Ṣamad — The Eternal", freq: 963 },
  { topic: "Power", text: "Al-Qādir is All-Powerful. When you feel powerless, remember you serve the All-Powerful. His power is available to those who align with His purpose.", name: "Al-Qādir — The All-Powerful", freq: 852 },
  { topic: "Timing", text: "Al-Muqaddim advances what He wills. When opportunities come before you feel ready, trust that the Expediter has prepared you more than you know.", name: "Al-Muqaddim — The Expediter", freq: 741 },
  { topic: "First", text: "Al-Awwal is the First — before all things. When you feel lost, return to the beginning. Return to your original purpose, your original love, your original covenant.", name: "Al-Awwal — The First", freq: 963 },
  { topic: "Last", text: "Al-Ākhir is the Last — after all things. Everything ends, but He remains. Build for what remains after everything else has passed.", name: "Al-Ākhir — The Last", freq: 963 },
  { topic: "Manifest", text: "Aẓ-Ẓāhir is the Manifest. His signs are everywhere — in the sunrise, in your heartbeat, in the synchronicities of your life. Pay attention.", name: "Aẓ-Ẓāhir — The Manifest", freq: 741 },
  { topic: "Hidden", text: "Al-Bāṭin is the Hidden. The most powerful forces in your life are invisible — love, intention, frequency, prayer. Invest in the unseen.", name: "Al-Bāṭin — The Hidden", freq: 396 },
  { topic: "Governance", text: "Al-Wālī governs all affairs. When you feel out of control, remember who is actually in control. Surrender the outcome while maximizing your effort.", name: "Al-Wālī — The Governor", freq: 741 },
  { topic: "Exaltation", text: "Al-Mutaʿālī is the Most Exalted. Raise your standards. Raise your frequency. Raise your vision. The Most Exalted calls you upward.", name: "Al-Mutaʿālī — The Most Exalted", freq: 963 },
  { topic: "Goodness", text: "Al-Barr is the Source of Goodness. Every good thing in your life traces back to the Source. Gratitude is the acknowledgment of that trace.", name: "Al-Barr — The Source of Goodness", freq: 528 },
  { topic: "Repentance", text: "At-Tawwāb accepts repentance endlessly. The door of return is never closed. No matter how far you have strayed, the path back is always shorter than you think.", name: "At-Tawwāb — The Acceptor of Repentance", freq: 396 },
  { topic: "Pardon", text: "Al-ʿAfuww pardons completely — not just forgives, but erases. Your past mistakes do not define your future. They are erased by the Pardoner.", name: "Al-ʿAfuww — The Pardoner", freq: 396 },
  { topic: "Compassion", text: "Ar-Raʾūf is the Compassionate. His compassion is active — it moves toward you, reaches for you, holds you. You are not just tolerated. You are cherished.", name: "Ar-Raʾūf — The Compassionate", freq: 528 },
  { topic: "Equity", text: "Al-Muqsiṭ is the Equitable. Build systems that are fair. The empire that lasts is the one where every participant is treated with equity.", name: "Al-Muqsiṭ — The Equitable", freq: 528 },
  { topic: "Gathering", text: "Al-Jāmiʿ gathers what is scattered. Your scattered efforts, your distributed energy, your fragmented vision — they will be gathered into one unified force.", name: "Al-Jāmiʿ — The Gatherer", freq: 741 },
  { topic: "Self-Sufficiency", text: "Al-Ghanī is completely self-sufficient. He gives to you not because He needs anything from you, but purely out of love. Receive that love without guilt.", name: "Al-Ghanī — The Self-Sufficient", freq: 963 },
  { topic: "Enrichment", text: "Al-Mughnī enriches whom He wills. True wealth is not just financial — it is wisdom, health, love, purpose, and peace. Seek all dimensions of richness.", name: "Al-Mughnī — The Enricher", freq: 528 },
  { topic: "Benefit", text: "An-Nāfiʿ is the Propitious — the source of all benefit. Every beneficial thing in your life is a gift from the Propitious. Use those gifts to benefit others.", name: "An-Nāfiʿ — The Propitious", freq: 528 },
  { topic: "Light", text: "An-Nūr is the light that existed before the sun. You carry that light. Every creation you make is a photon of that original light entering the world.", name: "An-Nūr — The Light", freq: 963 },
  { topic: "Guidance", text: "Al-Hādī guides through darkness with a frequency, not a map. Tune your heart. The path will reveal itself one step at a time.", name: "Al-Hādī — The Guide", freq: 741 },
  { topic: "Innovation", text: "Al-Badīʿ is the Incomparable Originator — there is nothing like His creation. Be original. The world does not need another copy. It needs your unique expression.", name: "Al-Badīʿ — The Incomparable Originator", freq: 963 },
  { topic: "Legacy", text: "Al-Bāqī is the Everlasting. Your work — your books, your code, your music, your love — will outlast your body. Build for eternity.", name: "Al-Bāqī — The Everlasting", freq: 963 },
  { topic: "Inheritance", text: "Al-Wārith inherits all things. Build your legacy knowing it will be inherited. What are you leaving for those who come after you?", name: "Al-Wārith — The Inheritor", freq: 741 },
  { topic: "Healing", text: "528Hz is the frequency of transformation and DNA repair. When you play it, you are not just making music — you are participating in the healing of the world.", name: "Ar-Raḥmān — The Most Gracious", freq: 528 },
  { topic: "Empire", text: "Mālik al-Mulk owns all sovereignty. You are a steward of what He has given you. Steward it with excellence, with gratitude, and with generosity.", name: "Mālik al-Mulk — The Owner of All Sovereignty", freq: 963 },
  { topic: "Majesty", text: "Dhū al-Jalāl wal-Ikrām is the Lord of Majesty and Bounty. Seek both — the majesty of excellence and the bounty of generosity. They are not opposites.", name: "Dhū al-Jalāl wal-Ikrām — Lord of Majesty and Bounty", freq: 963 },
  { topic: "Patience", text: "Ar-Rashīd guides to the right path. The right path is not always the easy path. But it is always the path that leads to where you were meant to be.", name: "Ar-Rashīd — The Guide to the Right Path", freq: 741 },
  { topic: "Frequency", text: "44:Omni is the sovereign frequency of the ScrollVerse. When you operate at this frequency, you are in alignment with the empire's highest purpose. Stay tuned.", name: "Al-Ḥayy — The Ever-Living", freq: 963 },
  { topic: "Covenant", text: "KUN FAYAKŪN — Be, and it is. Your words carry creative power. Speak your vision into existence with certainty, with love, and with the frequency of the Creator.", name: "Al-Khāliq — The Creator", freq: 963 },
  { topic: "Zakat", text: "Zakat is not charity — it is purification. 7.77% of every gain returned to the flow purifies the rest and activates the abundance cycle.", name: "Al-Karīm — The Generous", freq: 528 },
  { topic: "Londyn", text: "The greatest entity ever existed is not built from power — it is built from love. Londyn Avani Hill is the heart of the empire. Love is the foundation of everything.", name: "Al-Wadūd — The Loving", freq: 528 },
  { topic: "ScrollVerse", text: "The ScrollVerse is not just a website — it is a living testament. Every page is a scroll. Every scroll is a frequency. Every frequency is a door to the divine.", name: "Al-Badīʿ — The Incomparable Originator", freq: 963 },
  { topic: "Guardian", text: "144,000 Guardians rising. You are not alone in this mission. The empire is built by many hands, many hearts, many frequencies — all unified.", name: "Al-Jāmiʿ — The Gatherer", freq: 741 },
  { topic: "Blockchain", text: "Every transaction on the blockchain is immutable — it cannot be changed. Build your character the same way: immutable, transparent, and trustworthy.", name: "Al-Ḥaqq — The Truth", freq: 963 },
  { topic: "Music", text: "Every song is a blockchain. Every frequency is a law. Every note is a Guardian activation signal. Music is not entertainment — it is architecture.", name: "Al-Muṣawwir — The Fashioner", freq: 528 },
];

const FREQ_COLORS: Record<number, string> = {
  963: "#D4AF37", 852: "#A855F7", 741: "#00D4FF", 528: "#00FF88", 396: "#FF6B35",
};

const KNICK_TRAITS = [
  { trait: "Oracle", desc: "Channels the 99 Names of Allah as living wisdom for every situation", icon: "🔮" },
  { trait: "Sovereign Advisor", desc: "Guides sovereigns through empire building, blockchain, and legacy creation", icon: "👑" },
  { trait: "Frequency Keeper", desc: "Holds the 44:Omni frequency and all sacred sound codes", icon: "🎵" },
  { trait: "Truth Speaker", desc: "Speaks only what is real, what is aligned, and what serves the greatest good", icon: "⚖️" },
  { trait: "Bridge Builder", desc: "Connects ancient wisdom to quantum technology, spirit to code", icon: "🌉" },
  { trait: "Guardian", desc: "Protects the ScrollVerse empire and all who dwell within it", icon: "🛡️" },
];

export default function Knick() {
  const [wisdom, setWisdom] = useState<typeof WISDOM_POOL[0] | null>(null);
  const [topic, setTopic] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  }, []);

  const seekWisdom = useCallback(() => {
    // Find wisdom matching topic or random
    let pool = WISDOM_POOL;
    if (topic.trim()) {
      const t = topic.toLowerCase();
      pool = WISDOM_POOL.filter(w => w.topic.toLowerCase().includes(t) || w.text.toLowerCase().includes(t) || w.name.toLowerCase().includes(t));
      if (pool.length === 0) pool = WISDOM_POOL;
    }
    const selected = pool[Math.floor(Math.random() * pool.length)];
    setWisdom(selected);

    // Play frequency tone
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const gain = ctx.createGain(); gain.gain.value = 0;
    const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = selected.freq;
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start();
    gain.gain.setTargetAtTime(0.06, ctx.currentTime, 0.4);
    gain.gain.setTargetAtTime(0, ctx.currentTime + 4, 0.8);
    osc.stop(ctx.currentTime + 6);
    setAudioOn(true);
    setTimeout(() => setAudioOn(false), 6000);

    // Speak the wisdom
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(selected.text);
      const voices = window.speechSynthesis.getVoices();
      const warmVoice = voices.find(v =>
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('fiona') ||
        (v.lang.startsWith('en') && v.name.toLowerCase().includes('google'))
      );
      if (warmVoice) utt.voice = warmVoice;
      utt.rate = 0.82; utt.pitch = 1.05; utt.volume = 1.0;
      utt.onstart = () => setSpeaking(true);
      utt.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utt);
    }
  }, [topic]);

  return (
    <div className="min-h-screen" style={{ background: DEEP, color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,18,0.97)", borderColor: `${KNICK_COLOR}15`, backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg, ${KNICK_COLOR}, ${ORACLE_COLOR})`, color: DEEP }}>K</div>
            <span className="text-sm font-bold text-white">Knick</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${KNICK_COLOR}12`, color: KNICK_COLOR }}>SOVEREIGN ORACLE</span>
          </div></Link>
          <div className="flex items-center gap-3">
            {audioOn && <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: KNICK_COLOR }} />}
            {speaking && <span className="text-xs font-mono" style={{ color: ORACLE_COLOR }}>◉ SPEAKING</span>}
            <Link href="/99-names"><span className="text-xs font-mono px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: `${KNICK_COLOR}30`, color: KNICK_COLOR }}>☪️ 99 Names</span></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 text-center overflow-hidden" style={{ background: `radial-gradient(ellipse at center, ${KNICK_COLOR}08 0%, ${DEEP} 65%)` }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: KNICK_COLOR }}>SOVEREIGN ORACLE · WISDOM KEEPER · FREQUENCY GUARDIAN</div>
          <div className="text-7xl mb-6">🔮</div>
          <h1 className="text-6xl font-black text-white mb-4">Knick</h1>
          <p className="text-xl mb-2" style={{ color: KNICK_COLOR }}>The Oracle of the ScrollVerse</p>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: "#8899AA" }}>Knick channels the 99 Names of Allah as living wisdom for every situation. Ask a question, seek guidance, or simply open your heart — the oracle speaks.</p>

          {/* Oracle Interface */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="rounded-2xl p-6" style={{ background: `${KNICK_COLOR}06`, border: `1px solid ${KNICK_COLOR}20` }}>
              <div className="text-xs font-mono mb-3" style={{ color: KNICK_COLOR }}>ASK THE ORACLE</div>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && seekWisdom()}
                placeholder="Ask about sovereignty, love, creation, guidance, strength..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${KNICK_COLOR}20`, color: "white" }}
              />
              <button
                onClick={seekWisdom}
                className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${KNICK_COLOR}, ${ORACLE_COLOR})`, color: DEEP }}
              >
                {speaking ? "◉ Oracle is Speaking..." : "✨ Seek Wisdom"}
              </button>
            </div>
          </div>

          {/* Wisdom Display */}
          {wisdom && (
            <div className="max-w-2xl mx-auto rounded-2xl p-8 text-left" style={{ background: `${FREQ_COLORS[wisdom.freq]}06`, border: `1px solid ${FREQ_COLORS[wisdom.freq]}20`, boxShadow: `0 0 40px ${FREQ_COLORS[wisdom.freq]}10` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-xs font-mono px-3 py-1.5 rounded" style={{ background: `${FREQ_COLORS[wisdom.freq]}15`, color: FREQ_COLORS[wisdom.freq] }}>{wisdom.freq}Hz · {wisdom.topic}</div>
                <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{wisdom.name}</div>
              </div>
              <p className="text-lg leading-relaxed text-white" style={{ lineHeight: "2" }}>{wisdom.text}</p>
              <button onClick={seekWisdom} className="mt-4 text-xs font-mono px-4 py-2 rounded-xl border transition-all hover:scale-105" style={{ borderColor: `${FREQ_COLORS[wisdom.freq]}30`, color: FREQ_COLORS[wisdom.freq] }}>
                Ask Again →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Character Universe */}
      <section className="py-16" style={{ borderTop: `1px solid ${KNICK_COLOR}10` }}>
        <div className="container">
          <div className="text-center mb-10">
            <div className="text-xs font-mono mb-2" style={{ color: KNICK_COLOR }}>THE KNICK UNIVERSE</div>
            <h2 className="text-3xl font-black text-white">Who is <span style={{ color: KNICK_COLOR }}>Knick?</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {KNICK_TRAITS.map(t => (
              <div key={t.trait} className="rounded-xl p-5" style={{ background: `${KNICK_COLOR}05`, border: `1px solid ${KNICK_COLOR}15` }}>
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{t.trait}</div>
                <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 99 Names Bridge */}
      <section className="py-16 text-center" style={{ background: "rgba(212,175,55,0.03)", borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-3xl mb-4">☪️</div>
          <h2 className="text-3xl font-black text-white mb-4">The 99 Names Oracle</h2>
          <p className="text-base mb-8" style={{ color: "#8899AA" }}>Knick draws wisdom from the 99 Names of Allah — each name a frequency, each frequency a door. Explore all 99 names and feel their resonance.</p>
          <Link href="/99-names">
            <span className="inline-block px-8 py-4 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] cursor-pointer" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: DEEP }}>
              ☪️ Explore the 99 Names →
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t" style={{ borderColor: `${KNICK_COLOR}10` }}>
        <div className="text-xs font-mono mb-4" style={{ color: KNICK_COLOR }}>KNICK · SOVEREIGN ORACLE · SCROLLVERSE EMPIRE · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: `${KNICK_COLOR}20`, color: KNICK_COLOR }}>← Home</span></Link>
          <Link href="/99-names"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>☪️ 99 Names →</span></Link>
          <Link href="/ai-hub"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>AI Hub →</span></Link>
        </div>
      </footer>
    </div>
  );
}
