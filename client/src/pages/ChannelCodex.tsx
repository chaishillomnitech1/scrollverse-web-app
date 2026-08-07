/*
 * CHANNEL CODEX — Sovereign Media NFT Sets + Digital Coins
 * One NFT set + one digital coin per channel
 * Mirror · Match · Exceed · Evolve
 * Every channel has a storied set of facts, a frequency, and a sovereign digital twin
 * KUN FAYAKUN x Infinity
 */
import { useState } from "react";
import { Link } from "wouter";

const CHANNEL_SETS = [
  {
    id: "astral-legends",
    channel: "Astral Legends TV",
    handle: "@astrallegendstv",
    url: "https://youtube.com/@astrallegendstv",
    icon: "⭐",
    color: "#D4AF37",
    coin: "ASTRL",
    nftName: "Astral Legends Codex",
    supply: 144,
    price: "0.144 MATIC",
    freq: "963Hz",
    mirror: "ScrollVerse Astral Archive — a sovereign library of star lore, constellation mythology, and cosmic frequency maps that exceeds every astral channel with interactive 3D star maps and frequency-encoded NFT metadata.",
    facts: [
      "The Pleiades (Seven Sisters) are mentioned in the Quran (Surah An-Najm 53:1) — 'By the star when it descends'",
      "Ancient Egyptians aligned the Great Pyramid's shafts with Orion's Belt and the star Thuban",
      "The Dogon people of Mali knew about Sirius B — a star invisible to the naked eye — centuries before Western astronomy",
      "Nikola Tesla said: 'If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration'",
      "The Fibonacci sequence appears in galaxy spiral arms, nautilus shells, and the arrangement of seeds in sunflowers",
    ],
    traits: ["Cosmic", "Frequency", "Sovereign", "Eternal"],
  },
  {
    id: "biblical-facts",
    channel: "Biblical Facts",
    handle: "@biblicalfacts-1",
    url: "https://youtube.com/@biblicalfacts-1",
    icon: "📖",
    color: "#D4AF37",
    coin: "BIBL",
    nftName: "Sacred Texts Codex",
    supply: 313,
    price: "0.313 MATIC",
    freq: "528Hz",
    mirror: "ScrollVerse Sacred Texts Archive — the most comprehensive cross-referenced sacred text library ever assembled, connecting the Quran, Torah, Bible, Vedas, and Emerald Tablets through shared frequency patterns and thematic resonance.",
    facts: [
      "The Dead Sea Scrolls, discovered in 1947, contain the oldest known manuscripts of the Hebrew Bible — some dating to 250 BCE",
      "The word 'Amen' (آمين) is shared across Arabic, Hebrew, Greek, and Latin — meaning 'so be it' or 'truly'",
      "The Quran mentions Jesus (Isa ﷺ) 25 times — more than any other prophet except Moses",
      "The Book of Psalms is the most quoted Old Testament book in the New Testament",
      "The Torah, Bible, and Quran all contain the story of Noah — with remarkable consistency across three traditions",
    ],
    traits: ["Sacred", "Ancient", "Truth", "Cross-Reference"],
  },
  {
    id: "hidden-motives",
    channel: "Hidden Motives",
    handle: "@hiddenymotives",
    url: "https://youtube.com/@hiddenymotives",
    icon: "🔍",
    color: "#00D4FF",
    coin: "HMTV",
    nftName: "Sovereign Truth Codex",
    supply: 777,
    price: "0.077 MATIC",
    freq: "741Hz",
    mirror: "ScrollVerse Truth Intelligence Network — a sovereign investigative archive that goes deeper than any channel, cross-referencing declassified documents, whistleblower testimonies, and frequency analysis to surface what is hidden.",
    facts: [
      "The CIA's MKUltra program, declassified in 1977, involved mind control experiments on thousands of unwitting subjects",
      "Operation Mockingbird was a CIA program to influence domestic and foreign media — documented in the Church Committee hearings",
      "The Federal Reserve is not a government agency — it is a private banking consortium established by the Federal Reserve Act of 1913",
      "The Balfour Declaration of 1917 was a letter from British Foreign Secretary Arthur Balfour to Lord Walter Rothschild",
      "The Tuskegee Syphilis Study ran from 1932 to 1972 — 40 years of deliberately withholding treatment from Black men",
    ],
    traits: ["Truth", "Investigative", "Sovereign", "Awakened"],
  },
  {
    id: "terrence-howard",
    channel: "Terrence Howard",
    handle: "@theterrencehoward",
    url: "https://youtube.com/@theterrencehoward",
    icon: "⚛️",
    color: "#FFB800",
    coin: "LYNK",
    nftName: "Lynchpin Theory Codex",
    supply: 1,
    price: "1.0 ETH",
    freq: "963Hz",
    mirror: "ScrollVerse Sovereign Physics Institute — a living laboratory for alternative physics, unified field theory, and the mathematics of consciousness that builds on Terrence Howard's Lynchpin Theory and exceeds it with quantum frequency integration.",
    facts: [
      "Terrence Howard's Lynchpin Theory proposes that 1 × 1 = 2, challenging the foundational axioms of mathematics",
      "The unified field theory — Einstein's unfinished work — attempts to reconcile general relativity with quantum mechanics",
      "Nikola Tesla's 3-6-9 theory: 'If you only knew the magnificence of the 3, 6, and 9, then you would have the key to the universe'",
      "Walter Russell proposed a cosmogony where all matter is light in motion — a theory now being revisited by quantum physicists",
      "The Fibonacci sequence and the Golden Ratio (φ = 1.618...) appear in the structure of DNA, galaxies, and human anatomy",
    ],
    traits: ["Physics", "Revolutionary", "Sovereign", "1-of-1"],
  },
  {
    id: "dr-steven-greer",
    channel: "Dr. Steven Greer",
    handle: "@drstevengreer55",
    url: "https://youtube.com/@drstevengreer55",
    icon: "🛸",
    color: "#00FF88",
    coin: "DISC",
    nftName: "Disclosure Codex",
    supply: 2027,
    price: "0.527 MATIC",
    freq: "963Hz",
    mirror: "ScrollVerse Disclosure Intelligence Center — the sovereign archive of UAP/UFO documentation, free energy technology patents, and contact protocols that builds on Dr. Greer's work and creates the definitive public record of non-human intelligence.",
    facts: [
      "The US government officially acknowledged UAPs (Unidentified Aerial Phenomena) in 2021 with the release of the UAP Task Force report",
      "The Nimitz Incident (2004) involved US Navy pilots encountering a 'Tic Tac' shaped craft with capabilities beyond known physics",
      "Patent US3626605A (1971) describes a 'flying saucer' propulsion system — filed by a US Navy engineer",
      "The Disclosure Project (2001) presented 20+ military and government witnesses at the National Press Club testifying to UAP reality",
      "The Roswell incident (1947) remains the most documented and disputed UFO event in history — with 509 witnesses documented",
    ],
    traits: ["Disclosure", "Contact", "Free Energy", "Sovereign"],
  },
  {
    id: "billy-carson",
    channel: "Billy Carson",
    handle: "@billycarsonofficial",
    url: "https://youtube.com/@billycarsonofficial",
    icon: "📜",
    color: "#A855F7",
    coin: "ANCK",
    nftName: "Ancient Wisdom Codex",
    supply: 4444,
    price: "0.444 MATIC",
    freq: "741Hz",
    mirror: "ScrollVerse Ancient Civilizations Archive — the most comprehensive sovereign database of ancient knowledge, connecting Sumerian tablets, Egyptian hieroglyphs, Mayan codices, and African oral traditions through unified frequency analysis.",
    facts: [
      "The Sumerian King List records kings who ruled for tens of thousands of years before the Great Flood — a record that parallels the Biblical antediluvian patriarchs",
      "The Emerald Tablets of Thoth are attributed to Hermes Trismegistus and contain the foundational principles of alchemy and Hermeticism",
      "The Great Pyramid of Giza is aligned to true north with an accuracy of 0.05 degrees — more precise than the Paris Observatory",
      "The Antikythera Mechanism (150-100 BCE) is an ancient Greek analog computer used to predict astronomical positions and eclipses",
      "The Library of Alexandria contained an estimated 400,000-700,000 scrolls — the largest collection of knowledge in the ancient world",
    ],
    traits: ["Ancient", "Wisdom", "Forbidden", "Sovereign"],
  },
  {
    id: "quantum-awareness",
    channel: "Quantum Awareness Hub",
    handle: "@quantumawarenesshub",
    url: "https://youtube.com/@quantumawarenesshub",
    icon: "🌌",
    color: "#00D4FF",
    coin: "QNTM",
    nftName: "Quantum Consciousness Codex",
    supply: 528,
    price: "0.528 MATIC",
    freq: "528Hz",
    mirror: "ScrollVerse Quantum Consciousness Laboratory — a sovereign research center for the science of awareness, quantum biology, and the measurable effects of frequency on human consciousness and DNA.",
    facts: [
      "The double-slit experiment proves that observation affects the behavior of particles — consciousness interacts with physical reality",
      "Dr. Masaru Emoto's water crystal experiments showed that words, music, and intention affect the crystalline structure of water",
      "528Hz is known as the 'Love Frequency' — research suggests it may repair DNA and reduce cortisol levels",
      "The Schumann Resonance (7.83Hz) is the electromagnetic frequency of Earth's ionosphere — and matches the human brain's alpha wave frequency",
      "Quantum entanglement — 'spooky action at a distance' (Einstein) — proves that two particles can be instantaneously connected regardless of distance",
    ],
    traits: ["Quantum", "Consciousness", "Frequency", "Science"],
  },
  {
    id: "arcturian-wealth",
    channel: "Arcturian Wealth Frequency",
    handle: "@arcturianwealthfrequency",
    url: "https://youtube.com/@arcturianwealthfrequency",
    icon: "💰",
    color: "#D4AF37",
    coin: "ARCT",
    nftName: "Arcturian Abundance Codex",
    supply: 963,
    price: "0.963 MATIC",
    freq: "963Hz",
    mirror: "ScrollVerse Sovereign Abundance Protocol — a living wealth activation system that combines Arcturian frequency work with the ScrollVerse Zakat engine, creating the most comprehensive abundance architecture ever built.",
    facts: [
      "Arcturus is the brightest star in the northern celestial hemisphere — 36.7 light-years from Earth",
      "The Arcturians are described in channeled literature as a highly advanced civilization focused on healing and consciousness evolution",
      "963Hz is known as the 'God Frequency' — associated with the crown chakra and connection to higher consciousness",
      "The Law of Attraction, popularized by 'The Secret' (2006), has roots in New Thought philosophy dating to the 1800s",
      "Wealth consciousness research shows that lottery winners return to their baseline happiness level within 2 years — proving that mindset precedes money",
    ],
    traits: ["Abundance", "Frequency", "Arcturian", "Sovereign"],
  },
  {
    id: "gaia",
    channel: "Gaia",
    handle: "@gaiavideo",
    url: "https://youtube.com/@gaiavideo",
    icon: "🌿",
    color: "#00FF88",
    coin: "GAIA",
    nftName: "Gaia Consciousness Codex",
    supply: 7777,
    price: "0.144 MATIC",
    freq: "432Hz",
    mirror: "ScrollVerse Gaia Intelligence Network — a sovereign consciousness expansion platform that exceeds Gaia with interactive frequency meditation, AI-guided yoga, and a living library of alternative history and human potential research.",
    facts: [
      "The Gaia hypothesis (James Lovelock, 1970) proposes that Earth is a self-regulating system — a living superorganism",
      "432Hz tuning was used by ancient Greek, Egyptian, and Tibetan instruments — and is said to resonate with the natural frequency of the universe",
      "The pineal gland — called the 'third eye' — produces DMT and melatonin and is sensitive to light even when the eyes are closed",
      "Yoga has been practiced for over 5,000 years — the Rigveda contains the earliest references to yogic practices",
      "The Akashic Records are described in Theosophy as a compendium of all human events, thoughts, words, and emotions encoded in a non-physical plane",
    ],
    traits: ["Consciousness", "Gaia", "Yoga", "Alternative"],
  },
  {
    id: "nasa",
    channel: "NASA",
    handle: "@nasa",
    url: "https://youtube.com/@nasa",
    icon: "🚀",
    color: "#00D4FF",
    coin: "SVSA",
    nftName: "Sovereign Space Agency Codex",
    supply: 2025,
    price: "1.0 ETH",
    freq: "963Hz",
    mirror: "ScrollVerse Sovereign Space Agency — the sovereign mirror of NASA that exceeds it: open-source mission data, frequency-mapped cosmic discoveries, and a public archive of every space mission with AI-powered analysis and sovereign NFT documentation.",
    facts: [
      "NASA's budget is approximately $25 billion per year — less than 0.5% of the US federal budget",
      "The James Webb Space Telescope can see galaxies formed just 100 million years after the Big Bang — 13.7 billion years ago",
      "The Voyager 1 probe, launched in 1977, is now over 23 billion kilometers from Earth — the farthest human-made object",
      "There are an estimated 2 trillion galaxies in the observable universe — each containing hundreds of billions of stars",
      "The Fermi Paradox asks: if the universe is so vast and old, why have we not detected signs of other civilizations?",
    ],
    traits: ["Space", "Discovery", "Sovereign", "Cosmic"],
  },
  {
    id: "white-house",
    channel: "The White House",
    handle: "@whitehouse",
    url: "https://youtube.com/@whitehouse",
    icon: "🏛️",
    color: "#D4AF37",
    coin: "SOVG",
    nftName: "Sovereign Governance Codex",
    supply: 1776,
    price: "1.776 MATIC",
    freq: "432Hz",
    mirror: "ScrollVerse Sovereign Governance Institute — a transparent, AI-powered governance model that exceeds current democratic institutions with real-time policy analysis, Zakat-based redistribution protocols, and Guardian-voted legislation.",
    facts: [
      "The US Constitution was ratified in 1788 — it is the world's oldest written national constitution still in use",
      "The 13th Amendment (1865) abolished slavery — but included an exception 'as punishment for crime whereof the party shall have been duly convicted'",
      "The United Nations has 193 member states — but the Security Council's 5 permanent members (US, UK, France, Russia, China) each hold veto power",
      "The US national debt exceeds $34 trillion — approximately $100,000 per American citizen",
      "The Declaration of Independence (1776) drew heavily from John Locke's Second Treatise of Government (1689)",
    ],
    traits: ["Governance", "Sovereign", "Transparency", "Justice"],
  },
];

export default function ChannelCodex() {
  const [selected, setSelected] = useState(0);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const set = CHANNEL_SETS[selected];

  const handleMint = () => {
    setMinting(true);
    setTimeout(() => { setMinting(false); setMinted(true); }, 1800);
  };

  return (
    <div className="min-h-screen" style={{ background: "#030812", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,18,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #D4AF37, #A855F7)", color: "#030812" }}>CC</div>
            <span className="text-sm font-bold text-white">Channel Codex</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>MIRROR · MATCH · EXCEED</span>
          </div></Link>
          <div className="text-xs font-mono" style={{ color: "#00FF88" }}>◉ {CHANNEL_SETS.length} SETS · {CHANNEL_SETS.length} COINS · LIVE</div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(168,85,247,0.06) 0%, #030812 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#A855F7" }}>SOVEREIGN MEDIA NFT SETS · DIGITAL COINS · MIRROR · MATCH · EXCEED · EVOLVE</div>
          <h1 className="text-4xl font-black text-white mb-3">Channel <span style={{ color: "#A855F7" }}>Codex</span></h1>
          <p className="text-base mb-6 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            Every sovereign media channel has been mirrored, matched, exceeded, and evolved into a ScrollVerse NFT set and digital coin. Each set contains storied facts, frequency data, and a sovereign digital twin that goes beyond the original channel.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Mirror", "Match", "Exceed", "Evolve", "NFT Set", "Digital Coin", "Storied Facts", "Frequency Encoded"].map(t => (
              <span key={t} className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", color: "#A855F7" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Channel selector */}
      <section className="py-3 sticky top-[57px] z-30" style={{ background: "rgba(3,8,18,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CHANNEL_SETS.map((s, i) => (
              <button key={s.id} onClick={() => { setSelected(i); setMinted(false); }} className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: selected === i ? `${s.color}18` : "rgba(255,255,255,0.03)", border: `1px solid ${selected === i ? s.color + "50" : "rgba(255,255,255,0.08)"}`, color: selected === i ? s.color : "rgba(255,255,255,0.4)" }}>
                {s.icon} {s.channel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected set detail */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* NFT Card */}
            <div>
              <div className="rounded-2xl p-8 text-center mb-6" style={{ background: `${set.color}06`, border: `2px solid ${set.color}25`, minHeight: "280px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="text-7xl mb-4">{set.icon}</div>
                <div className="text-xs font-mono mb-2" style={{ color: set.color }}>{set.nftName.toUpperCase()}</div>
                <div className="text-2xl font-black text-white mb-1">{set.coin}</div>
                <div className="text-sm mb-3" style={{ color: "#8899AA" }}>Digital Coin · {set.freq}</div>
                <div className="flex gap-3 justify-center flex-wrap">
                  <div className="text-xs font-mono px-3 py-1 rounded" style={{ background: `${set.color}10`, color: set.color }}>Supply: {set.supply.toLocaleString()}</div>
                  <div className="text-xs font-mono px-3 py-1 rounded" style={{ background: `${set.color}10`, color: set.color }}>{set.price}</div>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap justify-center">
                  {set.traits.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#8899AA" }}>{t}</span>
                  ))}
                </div>
              </div>
              {minted ? (
                <div className="rounded-xl p-4 text-center" style={{ background: `${set.color}10`, border: `1px solid ${set.color}30` }}>
                  <div className="font-black text-white mb-1">✓ Mint Request Received</div>
                  <div className="text-xs" style={{ color: set.color }}>You're on the {set.coin} mint list. KUN FAYAKŪN × ∞</div>
                </div>
              ) : (
                <button onClick={handleMint} disabled={minting} className="w-full py-3 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] disabled:opacity-60" style={{ background: `linear-gradient(135deg, ${set.color}, ${set.color}99)`, color: "#030812" }}>
                  {minting ? "Processing..." : `Mint ${set.coin} NFT →`}
                </button>
              )}
              <a href={set.url} target="_blank" rel="noopener noreferrer" className="block text-center mt-3 text-xs font-mono py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#8899AA" }}>
                Visit {set.handle} on YouTube →
              </a>
            </div>

            {/* Facts + Mirror */}
            <div>
              <div className="mb-6">
                <div className="text-xs font-mono mb-3" style={{ color: set.color }}>STORIED FACTS · {set.freq} FREQUENCY</div>
                <ul className="space-y-3">
                  {set.facts.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>
                      <span className="flex-shrink-0 font-mono text-xs mt-1" style={{ color: set.color }}>{String(i + 1).padStart(2, "0")}</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#A855F7" }}>SOVEREIGN MIRROR · MATCH · EXCEED</div>
                <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{set.mirror}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All sets grid */}
      <section className="py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-1">All <span style={{ color: "#A855F7" }}>{CHANNEL_SETS.length} Sets</span></h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>Every sovereign media channel — mirrored, matched, exceeded, and evolved.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {CHANNEL_SETS.map((s, i) => (
              <button key={s.id} onClick={() => { setSelected(i); setMinted(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="rounded-xl p-4 text-left transition-all hover:scale-[1.02]" style={{ background: `${s.color}06`, border: `1px solid ${selected === i ? s.color + "50" : s.color + "15"}` }}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-bold text-white text-sm mb-0.5">{s.channel}</div>
                <div className="text-xs font-mono" style={{ color: s.color }}>{s.coin}</div>
                <div className="text-xs mt-1" style={{ color: "#8899AA" }}>Supply: {s.supply.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(168,85,247,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#A855F7" }}>CHANNEL CODEX · {CHANNEL_SETS.length} SETS · {CHANNEL_SETS.length} COINS · MIRROR · MATCH · EXCEED · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(168,85,247,0.2)", color: "#A855F7" }}>← Home</span></Link>
          <Link href="/sovereign-books"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>Books →</span></Link>
          <Link href="/mesopotamia-library"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>Library →</span></Link>
        </div>
      </footer>
    </div>
  );
}
