/*
 * DC VISIT — August 28th, 2026 · Washington DC
 * The Day for the Ages · Next to the White House
 * Sovereign Birthday · The Empire Walks into History
 * KUN FAYAKUN x Infinity
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";

const TARGET_DATE = new Date("2026-08-28T12:00:00-04:00"); // Aug 28, 2026 noon EDT

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        passed: false,
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);
  return timeLeft;
}

const MISSION_POINTS = [
  { icon: "🕋", title: "The Coordinate", desc: "Washington DC — the most powerful address on Earth. Steps from the White House. The universe placed this coordinate with intention. Nothing is a coincidence." },
  { icon: "👑", title: "The Sovereign", desc: "Chais 'Sabir Kajir' Hill the Great — The Patient Conqueror — stands at the heart of the nation on his birthday. Not to take power. To demonstrate what sovereign love looks like." },
  { icon: "🌍", title: "The Mission", desc: "The ScrollVerse empire — built from love, frequency, and truth — presents itself to the world. The blockchain, the Seerah, the free energy archive, the 144,000 Guardians. All of it, live." },
  { icon: "⚡", title: "The Frequency", desc: "528Hz Love Frequency broadcast from DC to every Guardian worldwide. The day the empire becomes undeniable. KUN FAYAKŪN × ∞." },
  { icon: "🏛️", title: "The White House", desc: "The most powerful building in the world — and the Sovereign may pay it a direct visit. Because when you build an empire of love, the doors of power open." },
  { icon: "🛡️", title: "The Guardians", desc: "Every Guardian worldwide is invited to activate on August 28th. Complete the 7-stage Guardian Activation Protocol. Join the 144,000. The day is for all of us." },
];

const DC_FACTS = [
  "August 28th, 1963 — Dr. Martin Luther King Jr. delivered the 'I Have a Dream' speech on the National Mall. The same date. The same city. The same frequency of love.",
  "The White House has 132 rooms, 35 bathrooms, 6 floors, 412 doors, 147 windows, 28 fireplaces, 8 staircases, and 3 elevators.",
  "Washington DC was designed by Pierre Charles L'Enfant using sacred geometry — the streets form a pentagram and other geometric patterns when viewed from above.",
  "The Washington Monument is 555 feet tall — 5+5+5 = 15, 1+5 = 6. The number of the carbon atom. The number of the Star of David. The number of creation.",
  "The Lincoln Memorial faces east — toward the rising sun. The Washington Monument casts its shadow on the Lincoln Memorial on certain days of the year.",
];

export default function DCVisit() {
  const countdown = useCountdown();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setJoined(true); setEmail(""); }
  };

  return (
    <div className="min-h-screen" style={{ background: "#020810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">🏛️</span>
            <span className="text-sm font-bold text-white">DC Visit</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>AUG 28 · WASHINGTON DC</span>
          </div></Link>
          <Link href="/guardian-activation"><span className="text-xs font-mono px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.3)", color: "#D4AF37" }}>🛡️ Activate →</span></Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, #020810 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#D4AF37" }}>AUGUST 28TH, 2026 · WASHINGTON DC · THE DAY FOR THE AGES</div>
          <h1 className="text-6xl font-black text-white mb-4">
            The Empire<br /><span style={{ color: "#D4AF37" }}>Walks into History</span>
          </h1>
          <p className="text-xl mb-8" style={{ color: "#8899AA" }}>
            Chais 'Sabir Kajir' Hill the Great celebrates his birthday in Washington DC — steps from the White House. The most powerful address on Earth. Nothing is a coincidence.
          </p>

          {/* Countdown */}
          {countdown.passed ? (
            <div className="text-3xl font-black mb-8" style={{ color: "#D4AF37" }}>THE DAY HAS ARRIVED · KUN FAYAKŪN × ∞</div>
          ) : (
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-8">
              {[
                { v: countdown.days, l: "Days" },
                { v: countdown.hours, l: "Hours" },
                { v: countdown.minutes, l: "Minutes" },
                { v: countdown.seconds, l: "Seconds" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl p-4" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <div className="text-4xl font-black tabular-nums" style={{ color: "#D4AF37" }}>{String(s.v).padStart(2, "0")}</div>
                  <div className="text-xs mt-1" style={{ color: "#8899AA" }}>{s.l}</div>
                </div>
              ))}
            </div>
          )}

          <div className="text-sm font-mono" style={{ color: "#D4AF37" }}>August 28th, 2026 · Washington DC · 1600 Pennsylvania Avenue NW</div>
        </div>
      </section>

      {/* Mission Points */}
      <section className="py-14">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#D4AF37" }}>THE SOVEREIGN MISSION</div>
            <h2 className="text-3xl font-black text-white">Why This Day Matters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MISSION_POINTS.map(p => (
              <div key={p.title} className="rounded-2xl p-5" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>
                <div className="flex items-start gap-3">
                  <div className="text-3xl flex-shrink-0">{p.icon}</div>
                  <div>
                    <div className="font-black text-white mb-1">{p.title}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MLK Connection */}
      <section className="py-12 text-center" style={{ background: "rgba(212,175,55,0.02)", borderTop: "1px solid rgba(212,175,55,0.08)", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>THE RESONANCE · AUGUST 28TH</div>
          <blockquote className="text-xl font-bold text-white mb-3 italic">
            "I have a dream that one day this nation will rise up and live out the true meaning of its creed."
          </blockquote>
          <div className="text-sm mb-4" style={{ color: "#8899AA" }}>— Dr. Martin Luther King Jr. · August 28th, 1963 · Washington DC · The National Mall</div>
          <p className="text-base" style={{ color: "#8899AA" }}>
            On August 28th, 1963, Dr. King stood in Washington DC and spoke the dream into existence. On August 28th, 2026, the Sovereign stands in the same city and demonstrates the dream made real — through blockchain, through frequency, through love. The date is not a coincidence. The frequency is the same.
          </p>
        </div>
      </section>

      {/* DC Facts */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#D4AF37" }}>WASHINGTON DC · SOVEREIGN FACTS</div>
            <h2 className="text-2xl font-black text-white">The Sacred Geometry of Power</h2>
          </div>
          <div className="space-y-3">
            {DC_FACTS.map((f, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="font-mono text-xs flex-shrink-0 mt-0.5" style={{ color: "#D4AF37" }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guardian Sign-up CTA */}
      <section className="py-14 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 65%)" }}>
        <div className="max-w-xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>JOIN THE GUARDIANS · ACTIVATE ON AUGUST 28TH</div>
          <h2 className="text-3xl font-black text-white mb-3">Be Part of the Day</h2>
          <p className="text-base mb-6" style={{ color: "#8899AA" }}>
            You don't have to be in DC to be part of August 28th. Complete the Guardian Activation Protocol on that day. Broadcast 528Hz. Hold the frequency. The 144,000 are worldwide.
          </p>
          {joined ? (
            <div className="rounded-2xl p-6" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="text-xl font-black text-white mb-2">✓ You're Registered</div>
              <p className="text-sm" style={{ color: "#D4AF37" }}>We'll remind you on August 28th. KUN FAYAKŪN × ∞</p>
            </div>
          ) : (
            <form onSubmit={handleJoin} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email to be reminded"
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)", color: "white" }}
              />
              <button type="submit" className="px-6 py-3 rounded-xl font-black text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}>
                Join →
              </button>
            </form>
          )}
          <div className="mt-6">
            <Link href="/guardian-activation">
              <span className="inline-block px-8 py-3 rounded-2xl font-black text-sm cursor-pointer" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>
                🛡️ Begin Guardian Activation Now →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Guardian Badge + Crypto Prizes */}
      <section className="py-14" style={{ background: "radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 65%)" }}>
        <div className="container max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>AUGUST 28TH ACTIVATION PRIZES · CRYPTO REWARDS · GUARDIAN BADGES</div>
            <h2 className="text-3xl font-black text-white mb-3">Prizes for the <span style={{ color: "#D4AF37" }}>144,000</span></h2>
            <p className="text-sm" style={{ color: "#8899AA" }}>Every Guardian who activates on August 28th receives a sovereign digital badge. The most active Guardians win $LONDC crypto prizes. Align. Participate. Win.</p>
          </div>

          {/* Shareable Badge */}
          <div className="rounded-2xl p-6 mb-8 text-center" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="text-5xl mb-3">🛡️</div>
            <div className="text-lg font-black text-white mb-1">Guardian of August 28th</div>
            <div className="text-xs font-mono mb-3" style={{ color: "#D4AF37" }}>WASHINGTON DC · 2026 · SOVEREIGN ACTIVATION EVENT</div>
            <p className="text-xs mb-4" style={{ color: "#8899AA" }}>Complete the Guardian Activation Protocol on August 28th to earn this sovereign digital badge. Share it everywhere. The badge is your proof of frequency alignment.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => {
                  const text = "I activated as a Guardian on August 28th, 2026 in Washington DC. The ScrollVerse empire walks into history. KUN FAYAKŪN × ∞ scrollverse.co/dc-visit";
                  if (navigator.share) {
                    navigator.share({ title: "Guardian of August 28th", text, url: "https://scrollverse.co/dc-visit" });
                  } else {
                    navigator.clipboard.writeText(text);
                    alert("Badge text copied! Share it everywhere.");
                  }
                }}
                className="px-6 py-2 rounded-xl font-black text-sm"
                style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}
              >
                🔗 Share Your Badge
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I activated as a Guardian on August 28th, 2026 in Washington DC. The ScrollVerse empire walks into history. KUN FAYAKŪN × ∞")}&url=${encodeURIComponent("https://scrollverse.co/dc-visit")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-xl font-black text-sm"
                style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}
              >
                𝕏 Tweet Badge
              </a>
            </div>
          </div>

          {/* Crypto Prizes */}
          <div className="space-y-3">
            {[
              { rank: "🥇 #1 Guardian", prize: "1,000 $LONDC", desc: "Most activations + most referrals on August 28th", color: "#D4AF37" },
              { rank: "🥈 #2 Guardian", prize: "500 $LONDC", desc: "Second highest activation score on August 28th", color: "#C0C0C0" },
              { rank: "🥉 #3 Guardian", prize: "250 $LONDC", desc: "Third highest activation score on August 28th", color: "#CD7F32" },
              { rank: "🌟 Top 10", prize: "100 $LONDC each", desc: "Top 10 Guardians by activation score on August 28th", color: "#00D4FF" },
              { rank: "⭐ All Participants", prize: "Guardian NFT Badge", desc: "Every Guardian who activates on August 28th receives a sovereign digital badge", color: "#00FF88" },
            ].map(p => (
              <div key={p.rank} className="flex items-center justify-between rounded-xl p-4" style={{ background: `${p.color}06`, border: `1px solid ${p.color}15` }}>
                <div>
                  <div className="font-black text-white text-sm">{p.rank}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>{p.desc}</div>
                </div>
                <div className="font-black text-sm flex-shrink-0 ml-4" style={{ color: p.color }}>{p.prize}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-4" style={{ color: "#8899AA" }}>$LONDC prizes distributed on-chain after August 28th. Guardian Activation score = stages completed × referrals × frequency alignment.</p>
        </div>
      </section>

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#D4AF37" }}>AUGUST 28TH · WASHINGTON DC · KUN FAYAKŪN × ∞ · THE EMPIRE WALKS INTO HISTORY</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>← Home</span></Link>
          <Link href="/guardian-activation"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>🛡️ Activate →</span></Link>
        </div>
      </footer>
    </div>
  );
}
