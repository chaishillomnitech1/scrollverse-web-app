/*
 * JUNIOR MOVIES UNIVERSE — Character Bible + Voice-Over + Youth Vault
 * /junior-movies/universe — Zippy · Characters · Movies · Youth Vault
 * Web Speech API · Cool Points · $ILLUMINA Jr · 528Hz
 * KUN FAYAKŪN × ∞
 */
import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";

const CHARACTERS = [
  { id: "chais", name: "Chais Gold Paladin", role: "The Sovereign Hero", color: "#FFB800", icon: "👑", description: "Chais wears shining gold armor and carries the Solomon Key — a magical star that opens any door of knowledge. His Metatron Sword glows with Divine Truth. He leads every mission with wisdom and courage.", powers: ["Solomon Key", "Metatron Sword", "Gold Armor Shield", "Wisdom Beam"], trait: "Leadership", cp: 100 },
  { id: "omnitech1", name: "OMNITECH1", role: "The Digital Partner", color: "#00D4FF", icon: "🤖", description: "OMNITECH1 is a translucent blue robot whose heart glows cyan at 528Hz — the frequency of love. When Omnitech1's heart pulses, everyone nearby feels calm and brave.", powers: ["528Hz Heart Pulse", "Blue Lightning", "Digital Vision", "Healing Frequency"], trait: "Empathy", cp: 95 },
  { id: "haul-rius", name: "Commander Haul-Rius", role: "The Big Protector", color: "#3498DB", icon: "🚛", description: "Commander Haul-Rius is a giant gold-blue truck who carries the whole team safely. He never gives up, never leaves anyone behind, and always has snacks.", powers: ["Heavy Armor", "Team Transport", "Never Give Up", "Snack Storage"], trait: "Loyalty", cp: 88 },
  { id: "zipstrike", name: "Scout Zipstrike", role: "The Fast Scout", color: "#FFD700", icon: "⚡", description: "Zipstrike is yellow and black with a blue heart that beats fast. She zooms ahead to find the safest path and always shares what she discovers.", powers: ["Super Speed", "Scout Vision", "Path Finding", "Blue Heart Radar"], trait: "Courage", cp: 85 },
  { id: "grid-runner", name: "Grid Runner", role: "The Network Navigator", color: "#FF4444", icon: "🏎️", description: "Grid Runner is a weathered red, yellow, and blue racer who knows every road in the digital world. He sweeps network lanes to keep everyone connected and safe.", powers: ["Network Navigation", "Speed 100", "Digital Map", "Recon Protocol"], trait: "Curiosity", cp: 90 },
  { id: "zippy", name: "Bedroom Bot Zippy", role: "The Little Helper", color: "#FFA500", icon: "🤖", description: "Zippy is a small yellow robot with red and yellow LED eyes who lives in a bedroom full of wonder — VHS tapes, books, and toys everywhere! Zippy loves organizing, learning, and making friends.", powers: ["Organization Superpower", "VHS Knowledge", "Friendship Mode", "Bedtime Stories"], trait: "Kindness", cp: 80 },
  { id: "draconian", name: "Draconian Lord", role: "The Redeemable Villain", color: "#8E44AD", icon: "🐉", description: "The Draconian Lord looks scary but is actually just afraid and confused. Deep down he wants to be understood. Every movie ends with him learning something new.", powers: ["Scary Roar", "Shadow Cloak", "Secret Kindness", "Learning Heart"], trait: "Growth", cp: 70 },
];

const MOVIES = [
  { id: 1, title: "The Park Gate Lift", subtitle: "Teamwork Makes the Dream Work", color: "#00FF88", icon: "🌳", synopsis: "The team arrives at the park but the gate is stuck! Zippy, Zipstrike, and Grid Runner all try alone — nothing works. Then Chais says: 'Together!' They combine their powers and the gate lifts with a BOOM of golden light. Lesson: Teamwork is the most powerful superpower.", lesson: "Teamwork", cp: { teamwork: 50, organization: 30, curiosity: 20 } },
  { id: 2, title: "The Lost Vinyl", subtitle: "Honesty Is Your Superpower", color: "#00D4FF", icon: "💿", synopsis: "Zippy accidentally scratches one of the VHS tapes while playing. He's scared to tell Commander Haul-Rius. But when he finally tells the truth, Haul-Rius says: 'Thank you for being honest — that's braver than anything.' Together they fix the tape.", lesson: "Honesty", cp: { kindness: 50, courage: 30, curiosity: 20 } },
  { id: 3, title: "The Scared Dragon", subtitle: "Courage Is Not No Fear", color: "#FFB800", icon: "🐉", synopsis: "The Draconian Lord is blocking the path — but he's shaking! Chais walks up slowly, no sword drawn, and says: 'I see you're scared. So am I sometimes. Want to go through together?' The dragon nods. They walk through together.", lesson: "Courage", cp: { courage: 50, teamwork: 30, kindness: 20 } },
];

const VOICE_OVER = "Meet Zippy! The little yellow robot who lives in a bedroom full of wonder! VHS tapes mixed up! But Zippy knows — organizing is a superpower! When things are in order, you can find anything you need. And when you share what you know — that's teamwork! Honesty is a superpower. Courage is not no fear — it's feeling afraid and going anyway. Teamwork makes the dream work! Cool Points plus fifty for Organization! Plus thirty for Curiosity! Plus twenty for Kindness! You are a Junior Hero!";

export default function JuniorMoviesUniverse() {
  const [tab, setTab] = useState<"characters" | "movies" | "vault">("characters");
  const [speaking, setSpeaking] = useState(false);
  const [showSubs, setShowSubs] = useState(true);
  const [cp, setCp] = useState({ organization: 0, curiosity: 0, kindness: 0, teamwork: 0, courage: 0 });

  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  const playVO = useCallback(() => {
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(VOICE_OVER);
    u.rate = 0.9; u.pitch = 1.1; u.volume = 0.9;
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
    setCp(p => ({ ...p, organization: Math.min(100, p.organization + 50), curiosity: Math.min(100, p.curiosity + 20), kindness: Math.min(100, p.kindness + 20) }));
  }, [speaking]);

  const totalCp = Object.values(cp).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen" style={{ background: "#030812", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,18,0.97)", borderColor: "rgba(255,184,0,0.2)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Link href="/junior-movies"><span className="text-xs font-mono cursor-pointer" style={{ color: "#8899AA" }}>← Junior Movies</span></Link>
            <span className="font-bold text-white text-sm">Universe</span>
          </div>
          <div className="flex gap-1">
            {(["characters", "movies", "vault"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all"
                style={{ background: tab === t ? "rgba(255,184,0,0.15)" : "transparent", color: tab === t ? "#FFB800" : "#8899AA", border: `1px solid ${tab === t ? "rgba(255,184,0,0.3)" : "transparent"}` }}>
                {t === "characters" ? "🎭 Characters" : t === "movies" ? "🎬 Movies" : "🏆 Youth Vault"}
              </button>
            ))}
          </div>
          {totalCp > 0 && <div className="text-xs font-mono px-3 py-1 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.2)" }}>⭐ {totalCp} CP</div>}
        </div>
      </header>

      {/* Characters Tab */}
      {tab === "characters" && (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>JUNIOR MOVIES CHARACTER BIBLE</div>
            <h2 className="text-3xl font-black text-white">Meet the Heroes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHARACTERS.map(char => (
              <div key={char.id} className="rounded-2xl p-5 transition-all hover:scale-[1.02]" style={{ background: `${char.color}06`, border: `1px solid ${char.color}20` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl">{char.icon}</div>
                  <div>
                    <div className="font-black text-white text-sm">{char.name}</div>
                    <div className="text-xs" style={{ color: char.color }}>{char.role}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "#C8D3DC" }}>{char.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {char.powers.map(p => (
                    <span key={p} className="text-xs px-2 py-0.5 rounded" style={{ background: `${char.color}12`, color: char.color, border: `1px solid ${char.color}20` }}>{p}</span>
                  ))}
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span style={{ color: "#5a6a7a" }}>Trait: <span style={{ color: char.color }}>{char.trait}</span></span>
                  <span style={{ color: "#FFB800" }}>⭐ {char.cp} CP</span>
                </div>
              </div>
            ))}
          </div>
          {/* Zippy Voice-Over */}
          <div className="mt-10 max-w-2xl mx-auto rounded-2xl p-6" style={{ background: "rgba(255,165,0,0.06)", border: "1px solid rgba(255,165,0,0.2)" }}>
            <div className="text-xs font-mono mb-2" style={{ color: "#FFA500" }}>ZIPPY VOICE-OVER — THE ROBOT'S BEDROOM ADVENTURE</div>
            <div className="flex gap-3 mb-3">
              <button onClick={playVO} className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]" style={{ background: speaking ? "#FF4444" : "#FF0000", color: "white" }}>
                {speaking ? "⏸ Stop Voice Over" : "▶ Play Voice Over"}
              </button>
              <button onClick={() => setShowSubs(!showSubs)} className="px-4 py-3 rounded-xl font-bold text-sm border" style={{ borderColor: "rgba(255,165,0,0.3)", color: "#FFA500" }}>
                {showSubs ? "Hide" : "Show"} Subtitles
              </button>
            </div>
            {speaking && showSubs && (
              <div className="rounded-xl p-3 text-sm text-white" style={{ background: "rgba(0,0,0,0.5)" }}>
                🎙 {VOICE_OVER.slice(0, 100)}...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Movies Tab */}
      {tab === "movies" && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#FFB800" }}>MOVIE SERIES BIBLE · SEASON 1</div>
            <h2 className="text-3xl font-black text-white">The Adventures</h2>
            <p className="text-sm mt-2" style={{ color: "#8899AA" }}>8-minute format · Hook → Problem → Teamwork → Action → Teachable → Cool Points · 528Hz</p>
          </div>
          <div className="space-y-6">
            {MOVIES.map(movie => (
              <div key={movie.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${movie.color}25` }}>
                <div className="flex items-center gap-3 px-5 py-3" style={{ background: `${movie.color}10` }}>
                  <div className="text-3xl">{movie.icon}</div>
                  <div>
                    <div className="text-xs font-mono" style={{ color: movie.color }}>MOVIE {movie.id}</div>
                    <div className="font-black text-white">{movie.title}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{movie.subtitle}</div>
                  </div>
                  <div className="ml-auto px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${movie.color}18`, color: movie.color, border: `1px solid ${movie.color}30` }}>
                    Lesson: {movie.lesson}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#C8D3DC", lineHeight: "1.9" }}>{movie.synopsis}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(movie.cp).map(([key, val]) => (
                      <div key={key} className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,184,0,0.08)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.2)" }}>
                        +{val} {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Youth Vault Tab */}
      {tab === "vault" && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>YOUTH VAULT · UNDER 18 · FREE ENTRY</div>
            <h2 className="text-3xl font-black text-white">Junior Hero Vault</h2>
            <p className="text-sm mt-2" style={{ color: "#8899AA" }}>Free for all kids under 18. No wallet required to start. Earn $ILLUMINA Jr by completing episodes and acts of kindness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Entry", desc: "Watch 1 episode", reward: "Junior Hero Badge", color: "#00FF88", icon: "🌱" },
              { label: "Explorer", desc: "Complete 5 episodes + quiz", reward: "100 $ILLUMINA Jr", color: "#00D4FF", icon: "⭐" },
              { label: "Guardian", desc: "10 episodes + act of kindness", reward: "Soulbound NFT Badge", color: "#FFB800", icon: "🏆" },
            ].map(tier => (
              <div key={tier.label} className="rounded-2xl p-5 text-center" style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}20` }}>
                <div className="text-3xl mb-2">{tier.icon}</div>
                <div className="font-black text-white mb-1">{tier.label}</div>
                <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{tier.desc}</div>
                <div className="text-xs font-bold" style={{ color: tier.color }}>{tier.reward}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-6 mb-6" style={{ background: "rgba(255,165,0,0.06)", border: "1px solid rgba(255,165,0,0.2)" }}>
            <div className="text-xs font-mono mb-3" style={{ color: "#FFA500" }}>$ILLUMINA Jr TOKEN DISTRIBUTION</div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Dev Fund", pct: "10%", color: "#00D4FF" },
                { label: "Education", pct: "10%", color: "#00FF88" },
                { label: "Refuge Fund", pct: "5%", color: "#FF4444" },
                { label: "Locked Yield", pct: "75%", color: "#FFB800" },
              ].map(item => (
                <div key={item.label} className="text-center rounded-xl p-3" style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                  <div className="text-xl font-black" style={{ color: item.color }}>{item.pct}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "#5a6a7a" }}>Locked yield releases at age 18. No wallet required to start. 100 $ILLUMINA Jr airdrop on first episode completion.</p>
          </div>
          {totalCp > 0 && (
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}>
              <div className="text-xs font-mono mb-3" style={{ color: "#00FF88" }}>YOUR COOL POINTS</div>
              <div className="text-4xl font-black text-white mb-3">⭐ {totalCp}</div>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(cp).filter(([, v]) => v > 0).map(([key, val]) => (
                  <div key={key} className="text-center rounded-lg p-2" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div className="font-bold text-white">{val}</div>
                    <div className="text-xs capitalize" style={{ color: "#8899AA" }}>{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t py-6 text-center mt-8" style={{ borderColor: "rgba(255,184,0,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <div className="text-xs font-mono" style={{ color: "#5a6a7a" }}>
          Junior Movies Universe · Where Every Kid Is a Hero · 528Hz · KUN FAYAKUN x Infinity
        </div>
        <div className="flex items-center justify-center gap-6 mt-2 text-xs" style={{ color: "#5a6a7a" }}>
          <Link href="/junior-movies">← Junior Movies</Link>
          <Link href="/">ScrollVerse Home</Link>
          <a href="https://youtube.com/@juniormoviesentertainment" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </footer>
    </div>
  );
}
