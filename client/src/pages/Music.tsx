/*
 * CHAIS THE GREAT — MUSIC DISCOVERY & RELEASE READINESS
 * Public listening handoffs and source-labeled catalog planning only.
 * No investment, revenue share, token, purchase, payout, or wallet function is active.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";

const SPOTIFY_ARTIST_ID = "3P0GWluMPNZ2xSCVffVGAr";
const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr";

const catalogRecords = [
  { title: "CHAIS X", year: "2024", genre: "Hip-Hop", state: "Source-linked release record" },
  { title: "LETTER", year: "2024", genre: "R&B", state: "Source-linked release record" },
  { title: "Ghetto Gospel", year: "2024", genre: "Hip-Hop", state: "Source-linked release record" },
  { title: "Bama", year: "2024", genre: "Hip-Hop", state: "Catalog review record" },
  { title: "No Recipe", year: "2024", genre: "Hip-Hop", state: "Catalog review record" },
  { title: "Walk It Talk It", year: "2024", genre: "Hip-Hop", state: "Catalog review record" },
  { title: "Just a Friend (Premix)", year: "2023", genre: "R&B", state: "Catalog review record" },
  { title: "Chase Too Fast", year: "2023", genre: "Hip-Hop", state: "Catalog review record" },
  { title: "Never Giving Up", year: "2023", genre: "Hip-Hop", state: "Catalog review record" },
  { title: "The Goat You Just Met", year: "2023", genre: "Hip-Hop", state: "Catalog review record" },
  { title: "PNB Vibez", year: "2022", genre: "R&B", state: "Source-linked release record" },
  { title: "Road to the Riches", year: "2020", genre: "Hip-Hop", state: "Catalog review record" },
];

export default function Music() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<"ALL" | "Hip-Hop" | "R&B">("ALL");
  const visibleRecords = useMemo(() => catalogRecords.filter(record => (genre === "ALL" || record.genre === genre) && record.title.toLowerCase().includes(query.toLowerCase())), [genre, query]);

  return <main className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="relative overflow-hidden border-b py-20" style={{ borderColor: "rgba(0,212,255,0.16)", background: "linear-gradient(135deg, #050B1A, #0A1628 55%, #050B1A)" }}>
      <div className="container relative text-center">
        <div className="inline-flex rounded-full px-4 py-2 text-xs font-mono" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>MUSIC DISCOVERY · CREATOR RELEASE READINESS</div>
        <h1 className="mt-6 text-5xl font-black text-white md:text-7xl" style={{ fontFamily: "'Space Mono', monospace" }}>THE MUSIC</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg" style={{ color: "#AAB8CC" }}>Source-labeled listening, catalog exploration, and creator-controlled release planning for Chais The Great.</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "#77899C" }}>Public listening and source records are distinct from rights confirmation, distribution status, direct sales, collectible attachments, revenue reporting, and any future commercial activation.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl px-6 py-3 text-sm font-bold" style={{ background: "#1DB954", color: "#fff" }}>🎧 Listen on Spotify</a>
          <Link href="/music-creator-release-readiness" className="rounded-xl px-6 py-3 text-sm font-bold" style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.35)", color: "#00D4FF" }}>🧾 Release readiness</Link>
          <Link href="/creator-operations-intelligence" className="rounded-xl px-6 py-3 text-sm font-bold" style={{ background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", color: "#FFB800" }}>🎛️ Creator operations</Link>
        </div>
      </div>
    </section>

    <div className="container py-12">
      <section className="mb-12"><h2 className="mb-5 text-center text-2xl font-black text-white">Public listening handoff</h2><div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(0,212,255,0.2)" }}><iframe src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Chais The Great on Spotify" style={{ borderRadius: "12px" }} /></div></section>

      <section className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><div className="text-xs font-mono" style={{ color: "#FFB800" }}>CATALOG EXPLORATION</div><h2 className="mt-2 text-2xl font-black text-white">Release records, not commercial offers</h2><p className="mt-2 max-w-2xl text-sm" style={{ color: "#9AAABD" }}>These records provide names, years, genres, and readiness context. They do not confirm availability, ownership, licensing, royalty status, price, payout, or distribution on any particular service.</p></div><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search record titles" className="rounded-xl px-4 py-3 text-sm outline-none" style={{ background: "rgba(5,11,26,0.8)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff" }} /></div>
        <div className="mt-5 flex flex-wrap gap-2">{(["ALL", "Hip-Hop", "R&B"] as const).map(item => <button key={item} onClick={() => setGenre(item)} className="rounded-lg px-3 py-2 text-xs font-bold" style={{ background: genre === item ? "rgba(0,212,255,0.16)" : "rgba(255,255,255,0.04)", border: genre === item ? "1px solid rgba(0,212,255,0.42)" : "1px solid rgba(255,255,255,0.1)", color: genre === item ? "#00D4FF" : "#AAB8CC" }}>{item}</button>)}</div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{visibleRecords.map(record => <div key={record.title} className="rounded-xl p-4" style={{ background: "rgba(5,11,26,0.6)", border: "1px solid rgba(0,212,255,0.12)" }}><div className="font-bold text-white">{record.title}</div><div className="mt-1 text-xs" style={{ color: "#AAB8CC" }}>{record.year} · {record.genre}</div><div className="mt-3 text-xs font-mono" style={{ color: "#00D4FF" }}>{record.state}</div></div>)}</div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3"><div className="rounded-2xl p-5" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.18)" }}><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>1 · EVIDENCE</div><div className="mt-2 font-bold text-white">Source and rights packet</div><p className="mt-2 text-xs" style={{ color: "#AAB8CC" }}>Confirm original files, contributors, rights, artwork, metadata, and any licenses.</p></div><div className="rounded-2xl p-5" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.18)" }}><div className="text-xs font-mono" style={{ color: "#FFB800" }}>2 · RELEASE</div><div className="mt-2 font-bold text-white">Provider and audience plan</div><p className="mt-2 text-xs" style={{ color: "#AAB8CC" }}>Decide distribution, listening, accessibility, marketing, and communication paths separately.</p></div><div className="rounded-2xl p-5" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.18)" }}><div className="text-xs font-mono" style={{ color: "#00FF88" }}>3 · ACTIVATION</div><div className="mt-2 font-bold text-white">Fail-closed commercial boundary</div><p className="mt-2 text-xs" style={{ color: "#AAB8CC" }}>Any sales, payout, token, collectible, or contract decision requires a separately reviewed and owner-authorized release path.</p></div></section>
      <div className="mt-10"><PortalTrustLens lane="Music discovery" source="Public listening handoff and catalog readiness records" readiness="Listening handoff and release planning are live; commercial and chain functions are staged." boundary="No investment, revenue share, security offer, token, wallet, purchase, payout, or direct-sale function is active." /></div>
    </div>
  </main>;
}
