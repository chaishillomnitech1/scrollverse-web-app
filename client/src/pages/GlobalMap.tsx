/*
 * SCROLLVERSE TRINITY — GLOBAL MAP PAGE
 * Design: Liquid Sovereignty — Afrofuturism meets Quantum Digital
 * Sections: Nav, Hero, Region Selector, Revenue Metrics, Time-Zone Broadcast, Guardian Density
 */
import { useState } from "react";
import { Link } from "wouter";

const REGIONS = [
  { id: "na", name: "North America", countries: 23, guardians: "12,400", revenue: "$4.2M", color: "#00D4FF", tz: "UTC-5 to UTC-10", flag: "🌎" },
  { id: "eu", name: "Europe", countries: 44, guardians: "18,700", revenue: "$6.1M", color: "#FFB800", tz: "UTC+0 to UTC+3", flag: "🌍" },
  { id: "af", name: "Africa", countries: 54, guardians: "22,300", revenue: "$3.8M", color: "#00FF88", tz: "UTC-1 to UTC+4", flag: "🌍" },
  { id: "as", name: "Asia Pacific", countries: 48, guardians: "31,200", revenue: "$8.9M", color: "#FF6B35", tz: "UTC+5 to UTC+12", flag: "🌏" },
  { id: "me", name: "Middle East", countries: 18, guardians: "9,800", revenue: "$2.7M", color: "#C084FC", tz: "UTC+2 to UTC+5", flag: "🌍" },
  { id: "la", name: "Latin America", countries: 33, guardians: "14,600", revenue: "$3.1M", color: "#F472B6", tz: "UTC-3 to UTC-8", flag: "🌎" },
  { id: "oc", name: "Oceania", countries: 14, guardians: "4,100", revenue: "$1.4M", color: "#34D399", tz: "UTC+8 to UTC+13", flag: "🌏" },
];

const LANGUAGES = [
  "Arabic", "Bengali", "Chinese (Mandarin)", "Dutch", "English", "French",
  "German", "Hindi", "Indonesian", "Italian", "Japanese", "Korean",
  "Malay", "Persian", "Polish", "Portuguese", "Russian", "Spanish",
  "Swahili", "Tamil", "Thai", "Turkish", "Ukrainian", "Urdu",
  "Vietnamese", "Yoruba", "Zulu", "Amharic", "Hausa", "Igbo",
  "Tagalog", "Punjabi", "Javanese", "Marathi", "Telugu", "Kannada",
  "Gujarati", "Odia", "Burmese", "Khmer", "Lao", "Sinhala",
  "Nepali", "Tibetan", "Mongolian", "Kazakh", "Uzbek", "Georgian",
  "Armenian", "Hebrew", "Somali", "Wolof"
];

const BROADCAST_SCHEDULE = [
  { tz: "UTC-8 (LA)", time: "06:00", show: "Morning Frequency Activation", viewers: "2.1M" },
  { tz: "UTC-5 (NY)", time: "09:00", show: "Guardian Network Update", viewers: "3.4M" },
  { tz: "UTC+0 (London)", time: "14:00", show: "Sovereign Economics Report", viewers: "4.2M" },
  { tz: "UTC+3 (Dubai)", time: "17:00", show: "Sacred Frequency Broadcast", viewers: "5.8M" },
  { tz: "UTC+5:30 (Mumbai)", time: "19:30", show: "Creator Academy Live", viewers: "7.1M" },
  { tz: "UTC+8 (Singapore)", time: "22:00", show: "NFT Gallery Showcase", viewers: "6.3M" },
  { tz: "UTC+9 (Tokyo)", time: "23:00", show: "Eternal Scroll Ceremony", viewers: "4.9M" },
];

export default function GlobalMap() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [searchLang, setSearchLang] = useState("");

  const filteredLangs = LANGUAGES.filter(l => l.toLowerCase().includes(searchLang.toLowerCase()));

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-bold text-white text-lg tracking-wide">ScrollVerse</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>GLOBAL</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/revenue"><span className="text-sm cursor-pointer hover:text-[#00D4FF] transition-colors" style={{ color: "#8899AA" }}>Revenue</span></Link>
            <Link href="/guardians"><span className="text-sm cursor-pointer hover:text-[#00D4FF] transition-colors" style={{ color: "#8899AA" }}>Guardians</span></Link>
            <Link href="/"><span className="btn-sovereign px-4 py-2 rounded-lg text-sm cursor-pointer">← Home</span></Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12" style={{ background: "#00D4FF" }} />
            <span className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>SOVEREIGN PRESENCE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Global <span style={{ background: "linear-gradient(135deg, #00D4FF, #00FF88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Empire</span>
          </h1>
          <p className="text-lg max-w-2xl mb-8" style={{ color: "#8899AA" }}>
            The ScrollVerse Trinity spans <strong style={{ color: "#00D4FF" }}>200+ countries</strong>, <strong style={{ color: "#FFB800" }}>50+ languages</strong>, and <strong style={{ color: "#00FF88" }}>7 global regions</strong>. Select your region to view revenue metrics and broadcast schedules.
          </p>
          {/* Global stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Countries", value: "234", color: "#00D4FF" },
              { label: "Languages", value: "52", color: "#FFB800" },
              { label: "Total Guardians", value: "113K+", color: "#00FF88" },
              { label: "Monthly Revenue", value: "$30.2M", color: "#C084FC" },
            ].map(s => (
              <div key={s.label} className="sv-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black font-mono mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGION SELECTOR */}
      <section className="pb-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-white mb-6">Select Region</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
            {REGIONS.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r)}
                className="rounded-xl p-4 text-center transition-all duration-300"
                style={{
                  background: selectedRegion.id === r.id ? `${r.color}15` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selectedRegion.id === r.id ? r.color : "rgba(255,255,255,0.08)"}`,
                  boxShadow: selectedRegion.id === r.id ? `0 0 20px ${r.color}20` : "none",
                }}
              >
                <div className="text-2xl mb-2">{r.flag}</div>
                <div className="text-xs font-bold text-white">{r.name}</div>
                <div className="text-xs mt-1" style={{ color: r.color }}>{r.countries} countries</div>
              </button>
            ))}
          </div>

          {/* Selected region detail */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 sv-card rounded-2xl p-8" style={{ border: `1px solid ${selectedRegion.color}30` }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{selectedRegion.flag}</div>
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedRegion.name}</h3>
                  <div className="text-sm font-mono" style={{ color: selectedRegion.color }}>{selectedRegion.countries} countries · {selectedRegion.tz}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl p-4" style={{ background: `${selectedRegion.color}08`, border: `1px solid ${selectedRegion.color}20` }}>
                  <div className="text-xs mb-1" style={{ color: "#8899AA" }}>Active Guardians</div>
                  <div className="text-xl font-bold font-mono" style={{ color: selectedRegion.color }}>{selectedRegion.guardians}</div>
                </div>
                <div className="rounded-xl p-4" style={{ background: `${selectedRegion.color}08`, border: `1px solid ${selectedRegion.color}20` }}>
                  <div className="text-xs mb-1" style={{ color: "#8899AA" }}>Monthly Revenue</div>
                  <div className="text-xl font-bold font-mono" style={{ color: selectedRegion.color }}>{selectedRegion.revenue}</div>
                </div>
                <div className="rounded-xl p-4" style={{ background: `${selectedRegion.color}08`, border: `1px solid ${selectedRegion.color}20` }}>
                  <div className="text-xs mb-1" style={{ color: "#8899AA" }}>Countries</div>
                  <div className="text-xl font-bold font-mono" style={{ color: selectedRegion.color }}>{selectedRegion.countries}</div>
                </div>
              </div>
              {/* Revenue bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-2" style={{ color: "#8899AA" }}>
                  <span>Revenue Share</span>
                  <span style={{ color: selectedRegion.color }}>{selectedRegion.revenue}/mo</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{
                      background: `linear-gradient(90deg, ${selectedRegion.color}, ${selectedRegion.color}80)`,
                      width: `${(parseInt(selectedRegion.revenue.replace(/[^0-9.]/g, "")) / 9) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Language panel */}
            <div className="sv-card rounded-2xl p-6">
              <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>SUPPORTED LANGUAGES</div>
              <input
                type="text"
                placeholder="Search language..."
                value={searchLang}
                onChange={e => setSearchLang(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-sm mb-4 outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
              />
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {filteredLangs.slice(0, 20).map(lang => (
                  <div key={lang} className="flex items-center gap-2 py-1 px-2 rounded text-sm" style={{ color: "#8899AA" }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00D4FF", flexShrink: 0 }} />
                    {lang}
                  </div>
                ))}
                {filteredLangs.length > 20 && (
                  <div className="text-xs text-center py-2" style={{ color: "#8899AA" }}>+{filteredLangs.length - 20} more</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROADCAST SCHEDULE */}
      <section className="py-16" style={{ background: "rgba(0,212,255,0.02)", borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <div className="container">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "#FFB800" }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>24/7 GLOBAL BROADCAST</span>
            </div>
            <h2 className="text-3xl font-black text-white">Time-Zone Broadcast Schedule</h2>
          </div>
          <div className="space-y-3">
            {BROADCAST_SCHEDULE.map((slot, i) => (
              <div key={i} className="sv-card rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="font-mono text-sm font-bold" style={{ color: "#00D4FF", minWidth: "60px" }}>{slot.time}</div>
                  <div className="text-xs px-2 py-1 rounded font-mono" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.2)" }}>{slot.tz}</div>
                  <div className="text-sm text-white">{slot.show}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00FF88", boxShadow: "0 0 6px #00FF88" }} />
                  <span className="font-mono text-sm" style={{ color: "#00FF88" }}>{slot.viewers} viewers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,212,255,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "#8899AA" }}>
          <span>© 2026 Chais Kenyatta Hill — Sabir Allah The Great</span>
          <Link href="/"><span className="hover:text-[#00D4FF] transition-colors cursor-pointer">← Back to Portal</span></Link>
          <span className="font-mono" style={{ color: "#00D4FF" }}>🕋⚡ KUN FAYAKŪN × ∞</span>
        </div>
      </footer>
    </div>
  );
}
