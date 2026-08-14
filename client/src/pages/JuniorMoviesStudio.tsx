/*
 * JUNIOR MOVIES ENTERTAINMENT — CREATIVE STUDIO
 * Browser-local story drafting, comic planning, character ideation, and source-aware learning.
 * No wallet, token, NFT, coin, public upload, prize, or marketplace function is active.
 */
import { useMemo, useState } from "react";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type Tab = "guide" | "comic" | "character" | "history";

const sceneBeats = [
  ["Arrival", "🌅", "Where does the scene begin, and what does the audience notice first?"],
  ["Choice", "🧭", "What decision makes the character’s values visible?"],
  ["Discovery", "🔎", "What clue changes the story?"],
  ["Teamwork", "🤝", "How do characters solve a problem together?"],
  ["Turning point", "⚡", "What challenge asks the hero to grow?"],
  ["Reflection", "📜", "What does the character learn and carry forward?"],
] as const;

const archetypes = [
  ["Guardian", "🛡️", "Protects people and places"],
  ["Scholar", "📚", "Finds meaning in evidence and stories"],
  ["Builder", "⚙️", "Turns problems into useful ideas"],
  ["Explorer", "🗺️", "Connects communities and discoveries"],
  ["Healer", "💚", "Leads with care and listening"],
  ["Artist", "🎨", "Makes imagination visible"],
] as const;

const learningCards = [
  ["Sankore and learning communities", "Timbuktu was an important center of scholarship and manuscript culture across the medieval Sahel. Explore who created, preserved, and shared knowledge in a community.", "UNESCO context and educator review recommended"],
  ["Mansa Musa and Mali", "Mansa Musa was a fourteenth-century ruler of the Mali Empire. Compare museum, library, and educator sources before using historical claims in a script.", "Library, museum, or educator source check recommended"],
  ["Mae Jemison", "Mae Jemison became the first Black woman to travel in space in 1992. Her work connects science, medicine, performance, and curiosity.", "NASA biography and educator review recommended"],
  ["Garrett Morgan", "Garrett Morgan was an inventor and entrepreneur associated with safety-device innovations. Use archival or museum sources when developing historical scenes.", "Museum or archival source check recommended"],
] as const;

function Milestone({ title, detail }: { title: string; detail: string }) {
  return <div className="rounded-xl p-4" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
    <div className="text-xs font-mono" style={{ color: "#00FF88" }}>LOCAL CREATIVE MILESTONE</div>
    <div className="mt-1 text-sm font-bold text-white">{title}</div>
    <div className="mt-1 text-xs leading-relaxed" style={{ color: "#9AAABD" }}>{detail}</div>
  </div>;
}

export default function JuniorMoviesStudio() {
  const [tab, setTab] = useState<Tab>("guide");
  const [storySeed, setStorySeed] = useState("");
  const [panels, setPanels] = useState<string[]>([]);
  const [archetype, setArchetype] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [mission, setMission] = useState("");
  const [learned, setLearned] = useState<string[]>([]);
  const milestones = useMemo(() => Number(Boolean(storySeed.trim())) + panels.length + Number(Boolean(characterName.trim())) + learned.length, [storySeed, panels, characterName, learned]);
  const chosenArchetype = archetypes.find(([name]) => name === archetype);

  return <main className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b" style={{ borderColor: "rgba(255,184,0,0.18)", background: "linear-gradient(135deg, rgba(255,184,0,0.1), rgba(0,212,255,0.07), transparent)" }}>
      <div className="container py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="text-xs font-mono tracking-[0.18em]" style={{ color: "#FFB800" }}>JUNIOR MOVIES ENTERTAINMENT · CREATIVE STUDIO</div>
            <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">Build a story. Keep the creator in control.</h1>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#AAB8CC" }}>Draft original characters, comic beats, and learning-connected scenes in a browser-local workshop. Young creators should involve a parent, guardian, educator, or trusted adult before sharing work publicly.</p>
          </div>
          <div className="rounded-2xl px-5 py-4" style={{ background: "rgba(5,11,26,0.68)", border: "1px solid rgba(0,212,255,0.24)" }}>
            <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>THIS BROWSER SESSION</div>
            <div className="mt-1 text-3xl font-black text-white">{milestones}</div>
            <div className="text-xs" style={{ color: "#9AAABD" }}>creative milestones · no wallet or account</div>
          </div>
        </div>
      </div>
    </section>

    <div className="container py-8">
      <div className="mb-7 flex flex-wrap gap-2">
        {(["guide", "comic", "character", "history"] as const).map((id) => <button key={id} onClick={() => setTab(id)} className="rounded-xl px-4 py-2.5 text-sm font-bold capitalize" style={{ background: tab === id ? "linear-gradient(135deg, #FFB800, #FF6B35)" : "rgba(255,255,255,0.04)", border: tab === id ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)", color: tab === id ? "#050B1A" : "#C5D1DE" }}>{id === "guide" ? "✨ Creative guide" : id === "comic" ? "🎞️ Comic planner" : id === "character" ? "🧭 Character draft" : "📜 Learning cards"}</button>)}
      </div>

      {tab === "guide" && <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.16)" }}>
          <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>ORIGINAL STORY SEED</div>
          <h2 className="mt-2 text-2xl font-black text-white">Start with one meaningful question.</h2>
          <p className="mt-2 text-sm" style={{ color: "#9AAABD" }}>What does your character protect, learn, or help change?</p>
          <textarea value={storySeed} onChange={(event) => setStorySeed(event.target.value)} placeholder="Write a short story seed here…" rows={7} className="mt-5 w-full rounded-xl p-4 text-sm outline-none" style={{ background: "rgba(5,11,26,0.75)", border: "1px solid rgba(0,212,255,0.2)", color: "#fff" }} />
          {storySeed.trim() && <div className="mt-4"><Milestone title="Story seed saved locally" detail="This draft stays in the current browser session. Discuss rights, privacy, and public-sharing choices with an adult before release." /></div>}
        </section>
        <aside className="space-y-4"><Milestone title="Adult-supported participation" detail="A parent, guardian, educator, or trusted adult can help review real people, private details, and public-sharing choices." /><Milestone title="Release boundary" detail="No public upload, collectible, token, wallet, coin, sale, prize, or account action is active from this studio." /></aside>
      </div>}

      {tab === "comic" && <section>
        <div className="mb-5"><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>COMIC PLANNER</div><h2 className="mt-2 text-2xl font-black text-white">Plan one scene at a time.</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{sceneBeats.map(([label, icon, prompt]) => <button key={label} onClick={() => setPanels((previous) => [...previous, prompt])} className="rounded-xl p-4 text-left" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.1)" }}><div className="text-2xl">{icon}</div><div className="mt-2 font-bold text-white">{label}</div><div className="mt-1 text-xs" style={{ color: "#9AAABD" }}>{prompt}</div></button>)}</div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{panels.length === 0 ? <div className="rounded-2xl p-8 text-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.16)", color: "#9AAABD" }}>Choose a scene beat to begin a browser-local comic outline.</div> : panels.map((panel, index) => <div key={`${index}-${panel}`} className="rounded-2xl p-5" style={{ background: "rgba(0,212,255,0.045)", border: "1px solid rgba(0,212,255,0.16)" }}><div className="text-xs font-mono" style={{ color: "#00D4FF" }}>SCENE {index + 1}</div><textarea value={panel} onChange={(event) => setPanels((previous) => previous.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} rows={4} className="mt-3 w-full bg-transparent text-sm outline-none" style={{ color: "#fff" }} /></div>)}</div>
      </section>}

      {tab === "character" && <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,184,0,0.16)" }}><div className="text-xs font-mono" style={{ color: "#FFB800" }}>CHARACTER DRAFT</div><div className="mt-4 grid gap-3 sm:grid-cols-2">{archetypes.map(([name, icon, strength]) => <button key={name} onClick={() => setArchetype(name)} className="rounded-xl p-4 text-left" style={{ background: archetype === name ? "rgba(255,184,0,0.12)" : "rgba(255,255,255,0.035)", border: archetype === name ? "1px solid rgba(255,184,0,0.45)" : "1px solid rgba(255,255,255,0.1)" }}><div className="text-2xl">{icon}</div><div className="mt-2 font-bold text-white">{name}</div><div className="mt-1 text-xs" style={{ color: "#9AAABD" }}>{strength}</div></button>)}</div></section>
        <section className="rounded-2xl p-6" style={{ background: "rgba(0,212,255,0.035)", border: "1px solid rgba(0,212,255,0.18)" }}><label className="text-xs font-mono" style={{ color: "#00D4FF" }}>CHARACTER NAME</label><input value={characterName} onChange={(event) => setCharacterName(event.target.value)} placeholder="Original character name" className="mt-2 w-full rounded-xl p-3 text-sm outline-none" style={{ background: "rgba(5,11,26,0.72)", border: "1px solid rgba(0,212,255,0.2)", color: "#fff" }} /><label className="mt-4 block text-xs font-mono" style={{ color: "#00D4FF" }}>MISSION OR QUESTION</label><textarea value={mission} onChange={(event) => setMission(event.target.value)} placeholder="What does this character learn, protect, or create?" rows={4} className="mt-2 w-full rounded-xl p-3 text-sm outline-none" style={{ background: "rgba(5,11,26,0.72)", border: "1px solid rgba(0,212,255,0.2)", color: "#fff" }} />{chosenArchetype && characterName.trim() && <div className="mt-4"><Milestone title={`${characterName} draft ready`} detail={`${chosenArchetype[0]} archetype selected. This is a local concept record only; any public release needs adult-supported rights and privacy review.`} /></div>}</section>
      </div>}

      {tab === "history" && <section><div className="mb-5"><div className="text-xs font-mono" style={{ color: "#00FF88" }}>SOURCE-AWARE LEARNING CARDS</div><h2 className="mt-2 text-2xl font-black text-white">Bring learning into the story with care.</h2></div><div className="grid gap-4 md:grid-cols-2">{learningCards.map(([title, text, source]) => <button key={title} onClick={() => setLearned((previous) => previous.includes(title) ? previous : [...previous, title])} className="rounded-2xl p-5 text-left" style={{ background: learned.includes(title) ? "rgba(0,255,136,0.08)" : "rgba(255,255,255,0.03)", border: learned.includes(title) ? "1px solid rgba(0,255,136,0.32)" : "1px solid rgba(255,255,255,0.1)" }}><div className="font-bold text-white">{title}</div><div className="mt-2 text-sm leading-relaxed" style={{ color: "#AAB8CC" }}>{text}</div><div className="mt-3 text-xs font-mono" style={{ color: "#00FF88" }}>{learned.includes(title) ? "✓ LOCAL LEARNING MILESTONE" : source}</div></button>)}</div></section>}

      <div className="mt-10"><PortalTrustLens lane="Junior Movies Studio" source="Original story prompts, browser-local drafts, and source-aware learning cards" readiness="Drafting and local exploration are active; public release requires separate adult-supported review." boundary="No wallet, token, coin, NFT, public upload, sale, prize, personal-data collection, or marketplace action is active." /></div>
    </div>
  </main>;
}
