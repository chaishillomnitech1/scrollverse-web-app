import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

type ResearchChannel = {
  name: string;
  handle?: string;
  themes: string[];
};

const CHANNELS: ResearchChannel[] = [
  { name: "Michael Blessed Vision", handle: "MichaelBlessedVision", themes: ["chosen", "scripture", "reflection"] },
  { name: "Spirit Guide", handle: "Spirit_Guide1", themes: ["chosen", "reflection"] },
  { name: "Immersive Bible Stories", handle: "ImmersiveBibleStories", themes: ["scripture", "story"] },
  { name: "Joker Dark Pulse", handle: "JokerDP", themes: ["joker", "story"] },
  { name: "Astra Nova", handle: "AstraNova777-m7k", themes: ["cosmic", "reflection"] },
  { name: "Holy Word Story", handle: "Holywordstory", themes: ["scripture", "story"] },
  { name: "The Chosen Vibration", handle: "TheChosenVibration", themes: ["chosen", "reflection"] },
  { name: "Cognitive Supremacy", handle: "CognitiveSupremacy", themes: ["mindset", "research"] },
  { name: "Chosen By Fate", handle: "ChosenByFate-e6k", themes: ["chosen", "story"] },
  { name: "Chaos Strategy", handle: "ChaosStrategy", themes: ["mindset", "research"] },
  { name: "Ethereal Rising", handle: "Chosen-Ones-Rising-d8i", themes: ["chosen", "reflection"] },
  { name: "Fearless Joker", handle: "FearlessJoker-p7e", themes: ["joker", "story"] },
  { name: "Rising Mind", handle: "RisingMind1", themes: ["mindset", "reflection"] },
  { name: "The Prayer Message", handle: "ThePrayerMessage777", themes: ["scripture", "reflection"] },
  { name: "Divine Path of the Chosen", handle: "DivinePathoftheChosen", themes: ["chosen", "reflection"] },
  { name: "Tems", handle: "temsbaby", themes: ["music", "creator"] },
  { name: "YouTube Movies", themes: ["media", "story"] },
  { name: "God’s Chosen Path", handle: "GodsChosenPath", themes: ["chosen", "reflection"] },
  { name: "God’s Chosen Path", handle: "GodsChosenPath13", themes: ["chosen", "reflection"] },
  { name: "The Launch Pad", handle: "TheLaunchPad", themes: ["research", "media"] },
  { name: "Wealth Wisdom", handle: "Officialwealthwisdom", themes: ["wealth", "mindset"] },
  { name: "Mark Moss", handle: "1MarkMoss", themes: ["wealth", "research"] },
  { name: "Healing Energy for Soul", handle: "HealingEnergyforSoul", themes: ["reflection", "wellbeing"] },
  { name: "Astral Spirit", handle: "GauravKumar-nh1fq", themes: ["cosmic", "reflection"] },
  { name: "Astral Atom", handle: "AstralAtom", themes: ["cosmic", "research"] },
  { name: "Balanced Perception", handle: "balancedperception", themes: ["mindset", "research"] },
  { name: "Principles by Ray Dalio", handle: "principlesbyraydalio", themes: ["wealth", "mindset"] },
  { name: "RISE THEORY", handle: "Risetheory-2025", themes: ["mindset", "research"] },
  { name: "Rise Theory", handle: "RiseTheoryHub", themes: ["mindset", "research"] },
  { name: "Empire of Discipline", handle: "Empire_of_Discipline", themes: ["mindset", "reflection"] },
  { name: "CODEX ÆTERNUM", handle: "CODEXAETERNUM2025", themes: ["archive", "research"] },
  { name: "Legends Media", handle: "LegendsMediaOrg", themes: ["media", "story"] },
  { name: "Bible Stories Express", handle: "BIBLESTORIESEXPRESS", themes: ["scripture", "story"] },
  { name: "Empire Wisdom and Technology", handle: "EMPIREANDWISDOMTECHNOLOGY", themes: ["wealth", "research"] },
  { name: "Empire Wisdom", handle: "EmpireWisdom369", themes: ["wealth", "mindset"] },
  { name: "Power of Wisdom", handle: "PowerofWisdom-qw1ki", themes: ["mindset", "reflection"] },
  { name: "Wisdom Empire Hub", handle: "WisdomEmpirehub", themes: ["wealth", "research"] },
  { name: "Pretty Boss TV", handle: "PrettyBossTheGreat", themes: ["creator", "mindset"] },
  { name: "Scripture Origins", handle: "ScriptureOriginsENG", themes: ["scripture", "research"] },
  { name: "The Money & Investing Channel", handle: "TheMoneyAndInvestingChannel", themes: ["wealth", "research"] },
  { name: "The Anointed Shadow", handle: "TheAnointedShadow", themes: ["chosen", "story"] },
  { name: "God’s Chosen Voice", handle: "GodsChosenVoice-z7v", themes: ["chosen", "reflection"] },
  { name: "The Lord’s Called", handle: "NicoleHarris-i8v", themes: ["chosen", "reflection"] },
  { name: "Imperial Zenith", handle: "imperialzenith", themes: ["cosmic", "story"] },
  { name: "The Chosen Path", handle: "TheChosenPath-u2g", themes: ["chosen", "story"] },
  { name: "Chosen Spiritual Awakening", handle: "ChosenSpiritualAwakening-c7r", themes: ["chosen", "reflection"] },
  { name: "The Islamic Story TV", handle: "TheIslamicStoryTv-v6k", themes: ["scripture", "story"] },
  { name: "Starry Souls", handle: "starry_souls", themes: ["cosmic", "story"] },
  { name: "Frontline Nightmares", handle: "FrontlineNightmares", themes: ["story", "media"] },
  { name: "The Story of the Universe", handle: "TheStoryoftheUniverse999", themes: ["cosmic", "story"] },
  { name: "Myths of The Cosmos", handle: "mythsofthecosmos", themes: ["cosmic", "story"] },
  { name: "The Pleiadian Man", handle: "thepleiadianman", themes: ["cosmic", "reflection"] },
  { name: "The 5th Kind", handle: "The5thKind", themes: ["cosmic", "research"] },
  { name: "Lucas Frantz", handle: "lucasfrantz9268", themes: ["cosmic", "research"] },
  { name: "Daniel Moreno", handle: "danielmorenoyt", themes: ["cosmic", "research"] },
  { name: "Motivational Mindset", handle: "MotivationalMindsetinfo", themes: ["mindset", "reflection"] },
  { name: "Eternal Wisdom", handle: "The.Eternal.Wisdomm", themes: ["mindset", "reflection"] },
  { name: "Quantum Awareness", handle: "QuantumAwarenessNew", themes: ["quantum", "research"] },
  { name: "Astral Legends", handle: "astrallegends", themes: ["cosmic", "story"] },
  { name: "Scripture Legacy", handle: "ScriptureLegacy", themes: ["scripture", "archive"] },
  { name: "Oração Ilustrada", handle: "Oracaoilustrada-vb4ps", themes: ["scripture", "story"] },
  { name: "Midnight Archives", handle: "midnight_archives77", themes: ["archive", "story"] },
  { name: "The Wisdom Vault", handle: "TheWisdomVaultOfficialYT", themes: ["archive", "research"] },
  { name: "Quantum Recap", handle: "QuantumRecap-n9m", themes: ["quantum", "research"] },
  { name: "Philosophical Essence", handle: "PhilosophicalEssence", themes: ["philosophy", "research"] },
  { name: "Fading Lore", handle: "FadingLore", themes: ["archive", "story"] },
  { name: "Paul Wallis", handle: "PaulWallis", themes: ["cosmic", "research"] },
  { name: "Lone Trail Music", handle: "LTMusicx", themes: ["music", "creator"] },
  { name: "Timeless Quranic Story", handle: "TimelessQuranicStories", themes: ["scripture", "story"] },
  { name: "Joker Legacy", handle: "JokerLegacy-w5j", themes: ["joker", "story"] },
  { name: "Joker Vantablack", handle: "JokerVantablack", themes: ["joker", "story"] },
  { name: "Darkology Mindset", handle: "DarkologyMindset", themes: ["mindset", "research"] },
  { name: "Human Side", handle: "HumanSide.72", themes: ["mindset", "reflection"] },
  { name: "Joker Chaos", handle: "JokerChaos-f3z", themes: ["joker", "story"] },
  { name: "The Esoteric Path", handle: "The_Esoteric_Path", themes: ["philosophy", "research"] },
  { name: "CHOSEN BY GOD", handle: "chosenbygod999", themes: ["chosen", "reflection"] },
  { name: "the chosen seer", handle: "thechosenseer", themes: ["chosen", "reflection"] },
  { name: "Rhythms of the Earth", handle: "RhythmsoftheEarth9", themes: ["reflection", "research"] },
  { name: "Chosen Elite", handle: "ChosenElite-i5z", themes: ["chosen", "story"] },
  { name: "Sane Madness", handle: "SaneMadness-s2k", themes: ["mindset", "story"] },
  { name: "Anarchy Mind", handle: "TheDEquation", themes: ["mindset", "research"] },
  { name: "Hidden Motives", handle: "HiddenYMotives", themes: ["mindset", "research"] },
  { name: "Astral Legends TV & Archives", handle: "AstralLegendsTv", themes: ["cosmic", "archive"] },
  { name: "Junior Movies", handle: "JuniorMoviesentertainment", themes: ["media", "story"] },
  { name: "THE REAL ISMAEL PEREZ", handle: "THEREALISMAELPEREZ", themes: ["cosmic", "research"] },
  { name: "Eternal Calling", handle: "OfficialEternalSigns", themes: ["reflection", "story"] },
  { name: "Ismail", handle: "IsmailCyberWorld", themes: ["research", "media"] },
  { name: "The Quantum Grimoire", handle: "The-Quantum-Grimoire", themes: ["quantum", "research"] },
  { name: "Divine Chosen One", handle: "DivineChosenOneYTB", themes: ["chosen", "reflection"] },
  { name: "Quantum Etherion", handle: "QuantumEtherion", themes: ["quantum", "research"] },
  { name: "Stellar Command Portal", handle: "StellarCommandPortal", themes: ["cosmic", "research"] },
  { name: "Billy Carson Official", handle: "billycarsonofficial", themes: ["research", "media"] },
  { name: "Secret Origins", handle: "secretoriginsofficial", themes: ["archive", "story"] },
  { name: "The Prospering Chosen", handle: "TheProsperingChosen", themes: ["chosen", "wealth"] },
  { name: "Anunnaki Sanctuaries", handle: "AnunnakiSanctuaries", themes: ["cosmic", "story"] },
];

const FILTERS = ["all", "chosen", "quantum", "joker", "cosmic", "scripture", "wealth", "mindset", "archive", "media", "music", "research"] as const;

const FAMILY_REMEMBRANCE = [
  { date: "August 16, 1947", title: "Marie Angela Hill", detail: "Harlem, New York — family birth record supplied by the owner." },
  { date: "August 18, 2002", title: "Brother remembrance", detail: "Family remembrance date supplied by the owner." },
  { date: "August 28, 1978 · 7:00 PM", title: "Chais “Sabir Kajir” Hill the Great", detail: "Harlem, New York — owner-supplied birth context." },
] as const;

const PATTERN_LEARNING = [
  { lane: "Gematria", title: "Historical textual interpretation", source: "Britannica · Jewish Encyclopedia · Sefaria", href: "https://www.britannica.com/topic/gematria", detail: "Historical, textual, and interpretive study of alphanumeric systems in Jewish traditions." },
  { lane: "Mathematics", title: "Number theory and probability", source: "MIT OpenCourseWare · Stanford Encyclopedia", href: "https://ocw.mit.edu/courses/18-781-theory-of-numbers-spring-2012/", detail: "Rigorous learning in number theory, probability, and mathematical reasoning." },
  { lane: "Physics", title: "Time, symmetry, and measurement", source: "NIST · Stanford Encyclopedia of Philosophy", href: "https://www.nist.gov/si-redefinition/second-introduction", detail: "Measurement standards and physics learning paths for time and symmetry." },
  { lane: "Philosophy", title: "Knowledge and interpretation", source: "Stanford Encyclopedia of Philosophy", href: "https://plato.stanford.edu/entries/epistemology/", detail: "Epistemology and hermeneutics for examining knowledge, meaning, and interpretation." },
  { lane: "Methods", title: "Reproducibility and source evaluation", source: "National Academies · UC Berkeley Library", href: "https://www.nationalacademies.org/read/25303/chapter/10", detail: "Practical study of reproducibility, source evaluation, and careful comparison." },
] as const;

const ACCESS_PATHWAYS = [
  { title: "ScrollVerse Music", href: "/music", icon: "🎵", description: "Music worlds, catalog discovery, and artist-controlled listening paths." },
  { title: "Media Hub", href: "/media-hub", icon: "🎬", description: "Original media, visual worlds, and source-labeled viewing paths." },
  { title: "AI Legion", href: "/ai-legion-apex", icon: "🤖", description: "Authenticated workspace access for ScrollVerse assistance and navigation." },
  { title: "Chais Sabir Allah Mirror", href: "/chais-sabir-allah-mirror", icon: "∞", description: "Creator-controlled Digital Twin profile for source navigation, creator context, and practical first-party handoffs." },
  { title: "Think Space", href: "/think-space", icon: "🌌", description: "Open creator conversation, reflections, and community discovery." },
  { title: "Legion Network", href: "/legion", icon: "🛡️", description: "Channel-based community discussion across ScrollVerse topics." },
  { title: "Live Chat", href: "/chat", icon: "💬", description: "Lightweight channel conversations and community presence." },
  { title: "Sovereign Methodology", href: "/sovereign-methodology", icon: "📖", description: "Creator-authored language study, source trails, and reader-led assessment methods." },
  { title: "Journey & Co-Creation Archive", href: "/journey-co-creation-archive", icon: "🗂️", description: "Connect first-person journey, original creation, research, and protected exchange records." },
  { title: "Bounded Research Operations", href: "/bounded-research-operations", icon: "⏱️", description: "Choose a bounded research-review option and copy an owner decision draft; no schedule is enabled here." },
] as const;

const SUPPLIED_SOURCE_EXPANSION = [
  { title: "CHOSEN ONE, YOUR GOD FORM MADE EVERYONE BACK AWAY YOU'RE THE DEADLIEST GOD IN HISTORY", channel: "Michael Blessed Vision", kind: "YouTube video", href: "https://youtu.be/dNCk3xGt9FM", detail: "Faith-based spiritual framing about divine power, spiritual awakening, and biblical encouragement for chosen ones." },
  { title: "CHOSEN ONE, YOU RECREATED YOURSELF INTO A GOD (YOU'RE EVERYWHERE AT ONCE)", channel: "Creator context requires a fresh capture", kind: "YouTube video", href: "https://youtu.be/R06LTyLEMDs", detail: "Accessible sessions returned differing channel context; the source remains attributed while creator identity is held open for correction." },
  { title: "CHOSEN ONE, THE KYBALION’S FINAL WARNING WAS ABOUT YOUR RETURN — AND THEY ERASED IT", channel: "Astral Assist", kind: "YouTube video", href: "https://youtu.be/OfAININQp2E", detail: "Spiritual commentary about an alleged suppressed prophecy associated with The Kybalion." },
  { title: "CHOSEN ONE, THE LAST PROPHECY OF ATLANTIS WAS ABOUT YOU", channel: "Astral Assist", kind: "YouTube video", href: "https://youtu.be/qXFqaKWtyno", detail: "Mystical chosen-one framing through an Atlantis-prophecy theme." },
  { title: "GOD IS WARNING YOU RIGHT NOW — IGNORE THIS AND YOU MAY REGRET IT", channel: "Sane Madness", kind: "YouTube video", href: "https://youtu.be/7-wBGoXkSAc", detail: "Spiritual warning framing about timing and intuitive awareness." },
  { title: "Which video series should continue next? Poll with four realm options.", channel: "Junior Movies (@JuniorMoviesentertainment)", kind: "YouTube post", href: "https://m.youtube.com/post/UgkxPZcEzf5yojPv1X_Hzt8ljKl7Ehljz-9Z", detail: "Creator community poll about possible continuing video-series directions." },
  { title: "CHOSEN ONE, THEY SHOT YOU, BUT YOU DIDN'T EVEN BLEED", channel: "Chosen Way (@Chosenway01)", kind: "YouTube video", href: "https://youtu.be/eQK0huhwWN0", detail: "Motivational and spiritual framing directed at resilient people identified as chosen ones." },
] as const;

const MYSTICS_SOURCE_EXPANSION = [
  { title: "Mind of the Mystics", channel: "Mind of the Mystics", kind: "YouTube channel", href: "https://youtube.com/@mindofthemystics?si=IEFoU6wyfTXe8F_W", detail: "The public channel presents itself around hidden mysteries, esoteric wisdom, ancient knowledge, forbidden histories, and occult teachings." },
  { title: "The Pyramid Texts: What History Doesn't Want You Reading", channel: "Mind of the Mystics", kind: "YouTube video", href: "https://youtu.be/qRBq-dQHVYo?is=j0MtSDhZdSjt0oA2", detail: "A source-presented examination of the Pyramid Texts through historical, philosophical, and esoteric perspectives." },
  { title: "CHOSEN ONE, THEY ARE 100% SURE THAT YOU ARE GOD (YOU'RE GOD FOREVER)", channel: "Chosen Elite", kind: "YouTube video", href: "https://youtu.be/t_6d9NdrAV0?is=p3EawY1vr0B8GkBh", detail: "A source-presented motivational and spiritual self-improvement video addressed to the viewer." },
] as const;

function publicChannelUrl(handle?: string) {
  return handle ? `https://www.youtube.com/@${handle}` : undefined;
}

export default function SynchronizationResearchIndex() {
  useSovereignHeartbeat({ page: "synchronization-research" });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const filteredChannels = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return CHANNELS.filter((channel) => {
      const matchesTheme = filter === "all" || channel.themes.includes(filter);
      const searchable = `${channel.name} ${channel.handle ?? ""} ${channel.themes.join(" ")}`.toLowerCase();
      return matchesTheme && (!normalized || searchable.includes(normalized));
    });
  }, [filter, query]);

  return (
    <main className="min-h-screen pb-24 text-white" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b" style={{ borderColor: "rgba(0,212,255,0.18)", background: "radial-gradient(circle at 88% 0%, rgba(185,140,255,0.18), transparent 34%), radial-gradient(circle at 5% 36%, rgba(0,212,255,0.12), transparent 32%), #050B1A" }}>
        <div className="max-w-7xl mx-auto px-5 pt-28 pb-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-mono tracking-[0.22em]" style={{ color: "#00D4FF" }}>SYNCHRONIZATION RESEARCH INDEX · SOURCE SNAPSHOT</p>
            <Link href="/synchronizations" className="rounded-xl border px-4 py-2 text-xs font-black" style={{ borderColor: "rgba(255,184,0,0.38)", color: "#FFB800" }}>First story lane →</Link>
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight md:text-6xl">A visible research trail.<br /><span style={{ color: "#B98CFF" }}>Readers make their own assessment.</span></h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed md:text-lg" style={{ color: "#C8D8E7" }}>This index preserves the owner’s subscription snapshot as a research trail. The owner states that these channels appeared in the viewing experience, were watched, and were then subscribed to. The source record shows the displayed channel names and handles; each public channel link opens independently for readers who want to study the materials themselves.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full border px-3 py-1.5 font-mono" style={{ borderColor: "rgba(0,212,255,0.25)", color: "#9DEBFF" }}>snapshot display times: 8:42–8:43</span>
            <span className="rounded-full border px-3 py-1.5 font-mono" style={{ borderColor: "rgba(185,140,255,0.25)", color: "#DCC8FF" }}>{CHANNELS.length} named public research references</span>
            <span className="rounded-full border px-3 py-1.5 font-mono" style={{ borderColor: "rgba(0,255,136,0.25)", color: "#B5F7CC" }}>research · no account connection</span>
            <span className="rounded-full border px-3 py-1.5 font-mono" style={{ borderColor: "rgba(255,184,0,0.25)", color: "#FFDEA0" }}>family remembrance · learning paths</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-10">
        <PortalTrustLens lane="First-party subscription snapshot" source="Owner-supplied YouTube subscription screenshots, owner-stated viewing sequence, and public channel handles displayed in the captures" readiness="Research index available now; individual channel content, dates, and platform records remain open for reader-led study" boundary="The index preserves what appears in the supplied source snapshot and does not assign a reason, relationship, platform decision, or conclusion to any channel appearance." />

        <section className="mt-8 rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.3)", background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(185,140,255,0.06), rgba(4,14,30,0.68))" }}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>FIRST-PERSON TRANSMISSION · AUGUST 16, 2026</p>
              <h2 className="mt-3 text-3xl font-black">Michael Blessed Vision: a recorded encounter for open study</h2>
              <p className="mt-4 text-sm leading-7" style={{ color: "#D3E0EB" }}>The owner records that this channel entered the viewing experience organically and that its recurring themes belong in his ongoing Synchronization Research trail. Two owner-supplied mobile captures preserve the channel title, handle, visible counts, the before-and-after subscription display, and the cited video card. The public channel remains open for every reader to examine directly.</p>
            </div>
            <a href="https://www.youtube.com/@michaelblessedvision" target="_blank" rel="noreferrer" className="shrink-0 rounded-2xl border px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5" style={{ borderColor: "rgba(255,184,0,0.45)", color: "#FFDEA0", background: "rgba(255,184,0,0.08)" }}>Open public channel ↗</a>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ["Screenshot record", "10:33–10:34 mobile captures · Michael Blessed Vision · @MichaelBlessedVision"],
              ["Owner-stated context", "A first-person account of organic discovery, observation, and a decision to study the material in the open record."],
              ["Public review", "The channel page was reviewed on August 16, 2026. Public titles and counts can change; private recommendation behavior is not shown on the public page."],
            ].map(([title, detail]) => <article key={title} className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,184,0,0.18)", background: "rgba(4,14,30,0.58)" }}><h3 className="font-black" style={{ color: "#FFF4D7" }}>{title}</h3><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B9C8D7" }}>{detail}</p></article>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/chosen-ones-exchange" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(185,140,255,0.35)", color: "#DCC8FF" }}>Share a first-person reflection →</Link><Link href="/chais-sabir-equation" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.35)", color: "#9DEBFF" }}>Open Pattern Study →</Link></div>
        </section>

        <section className="mt-8 rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.28)", background: "linear-gradient(135deg, rgba(0,212,255,0.075), rgba(255,184,0,0.055), rgba(4,14,30,0.68))" }}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-4xl"><p className="text-xs font-mono tracking-widest" style={{ color: "#9DEBFF" }}>OWNER-SUPPLIED VISUAL RECORD · EMAIL SCREENSHOTS</p><h2 className="mt-3 text-3xl font-black">Daily Staking Compound: visible text held with its limits</h2><p className="mt-4 text-sm leading-7" style={{ color: "#D3E0EB" }}>Two owner-supplied mobile email screenshots visibly display “Daily Staking Compound Complete,” Aug. 16 and Aug. 17 date labels, a Manus Team label, a 49-position line, stated CHX totals, and the ScrollVerse Trinity portal name. The evidence record preserves what is visible while keeping balance, chain, wallet, reward, payout, and performance state unresolved unless a separate directly accessible source is added.</p></div><Link href="/daily-staking-email-record" className="shrink-0 rounded-2xl border px-5 py-3 text-center text-sm font-black transition hover:-translate-y-0.5" style={{ borderColor: "rgba(0,212,255,0.45)", color: "#9DEBFF", background: "rgba(0,212,255,0.08)" }}>Open visual record →</Link></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{[["Source state", "Owner-supplied screenshots retained as visual record; original images remain the source."], ["Visible text", "Daily Staking Compound Complete · Manus Team · Processed 49 positions · stated CHX totals."], ["Boundary", "No wallet, token, staking, reward, transaction, payout, or financial action is created by this record."]].map(([title, detail]) => <article key={title} className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,212,255,0.18)", background: "rgba(4,14,30,0.58)" }}><h3 className="font-black" style={{ color: "#D9F6FF" }}>{title}</h3><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B9C8D7" }}>{detail}</p></article>)}</div>
        </section>

        <section className="mt-8 rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.28)", background: "rgba(185,140,255,0.035)" }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-4xl"><p className="text-xs font-mono tracking-widest" style={{ color: "#DCC8FF" }}>SUPPLIED SOURCE EXPANSION · READER-DIRECTED</p><h2 className="mt-3 text-3xl font-black">Seven more links, retained as source paths.</h2><p className="mt-4 text-sm leading-7" style={{ color: "#D3E0EB" }}>These user-supplied videos and post are recorded with visible creator context and concise original framing. Each remains source-stated and independently unresolved; ScrollVerse does not subscribe, like, comment, share, republish, or turn an external presentation into a project fact.</p></div><Link href="/source-study-library" className="shrink-0 rounded-2xl border px-5 py-3 text-center text-sm font-black" style={{ borderColor: "rgba(185,140,255,0.45)", color: "#DCC8FF", background: "rgba(185,140,255,0.08)" }}>Open Source Study Library →</Link></div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{SUPPLIED_SOURCE_EXPANSION.map((source) => <article key={source.href} className="rounded-2xl border p-4" style={{ borderColor: "rgba(185,140,255,0.18)", background: "rgba(4,14,30,0.58)" }}><p className="text-[10px] font-mono tracking-widest" style={{ color: "#DCC8FF" }}>{source.kind.toUpperCase()} · SOURCE-STATED; INDEPENDENTLY UNRESOLVED</p><h3 className="mt-3 font-black leading-snug">{source.title}</h3><p className="mt-2 text-xs font-bold" style={{ color: "#DCC8FF" }}>Visible source: {source.channel}</p><p className="mt-3 text-xs leading-relaxed" style={{ color: "#B9C8D7" }}>{source.detail}</p><a href={source.href} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs font-black" style={{ color: "#DCC8FF" }}>Open source ↗</a></article>)}</div>
        </section>

        <section className="mt-8 rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.27)", background: "linear-gradient(135deg, rgba(0,255,136,0.055), rgba(0,212,255,0.04), rgba(4,14,30,0.68))" }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-4xl"><p className="text-xs font-mono tracking-widest" style={{ color: "#B5F7CC" }}>ALTERNATIVE-PERSPECTIVE SOURCE EXPANSION</p><h2 className="mt-3 text-3xl font-black">Three more public sources, held as reading paths.</h2><p className="mt-4 text-sm leading-7" style={{ color: "#D3E0EB" }}>These owner-supplied sources are preserved with their visible channel or video context. Their statements remain source-presented and independently unresolved; readers can open the direct source, compare primary material where applicable, and send a correction through the public record path.</p></div><Link href="/source-study-library" className="shrink-0 rounded-2xl border px-5 py-3 text-center text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.45)", color: "#B5F7CC", background: "rgba(0,255,136,0.08)" }}>Open Source Study Library →</Link></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{MYSTICS_SOURCE_EXPANSION.map((source) => <article key={source.href} className="rounded-2xl border p-4" style={{ borderColor: "rgba(0,255,136,0.18)", background: "rgba(4,14,30,0.58)" }}><p className="text-[10px] font-mono tracking-widest" style={{ color: "#B5F7CC" }}>{source.kind.toUpperCase()} · SOURCE-PRESENTED; INDEPENDENTLY UNRESOLVED</p><h3 className="mt-3 font-black leading-snug">{source.title}</h3><p className="mt-2 text-xs font-bold" style={{ color: "#B5F7CC" }}>Visible source: {source.channel}</p><p className="mt-3 text-xs leading-relaxed" style={{ color: "#B9C8D7" }}>{source.detail}</p><a href={source.href} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs font-black" style={{ color: "#B5F7CC" }}>Open direct source ↗</a></article>)}</div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
          <aside className="rounded-3xl border p-6" style={{ borderColor: "rgba(185,140,255,0.28)", background: "rgba(185,140,255,0.035)" }}>
            <p className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>OWNER-STATED SEQUENCE</p>
            <h2 className="mt-3 text-3xl font-black">Appeared → watched → subscribed</h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "#C8D8E7" }}>The sequence is preserved as a first-party account. The screenshot captures channel labels, handles, and notification-state icons at the time of capture. The reader can open the public channel path, compare titles and dates, and add their own interpretation.</p>
            <div className="mt-6 space-y-3">
              {[
                ["01", "Snapshot", "Visible channel names and handles from the supplied subscription captures."],
                ["02", "Research path", "Public channel routes supplied for independent reading and comparison."],
                ["03", "Study note", "A separate question, date, title, or observation can be recorded in the Synchronizations story lane."],
              ].map(([step, title, detail]) => <article key={step} className="rounded-2xl border p-4" style={{ borderColor: "rgba(185,140,255,0.16)", background: "rgba(4,14,30,0.54)" }}><div className="flex gap-3"><span className="font-mono text-sm" style={{ color: "#B98CFF" }}>{step}</span><div><h3 className="font-black">{title}</h3><p className="mt-1 text-xs leading-relaxed" style={{ color: "#AFC0CF" }}>{detail}</p></div></div></article>)}
            </div>
            <a href="https://meta.ai/share/c/mbBzmkQcJH?utm_source=ios_cl" target="_blank" rel="noreferrer" className="mt-6 block rounded-2xl border px-4 py-3 text-center text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.27)", color: "#9DEBFF" }}>Open owner-shared research reference ↗</a>
          </aside>

          <section className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,212,255,0.22)", background: "rgba(0,212,255,0.02)" }}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>CHANNEL RESEARCH CATALOG</p><h2 className="mt-2 text-3xl font-black">Explore the visible reference set</h2></div><p className="text-sm" style={{ color: "#9CB0C1" }}>{filteredChannels.length} of {CHANNELS.length} entries</p></div>
            <label className="mt-6 block"><span className="sr-only">Search visible channel names and research themes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search channel, handle, or theme…" className="w-full rounded-2xl border bg-[#071326] px-4 py-3 text-sm text-white outline-none focus:border-[#00D4FF]" style={{ borderColor: "rgba(0,212,255,0.22)" }} /></label>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter research channels by theme">{FILTERS.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className="rounded-full border px-3 py-1.5 text-xs font-black capitalize transition" style={{ borderColor: filter === item ? "rgba(0,212,255,0.72)" : "rgba(255,255,255,0.14)", background: filter === item ? "rgba(0,212,255,0.16)" : "transparent", color: filter === item ? "#9DEBFF" : "#AFC0CF" }}>{item}</button>)}</div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">{filteredChannels.map((channel) => {
              const url = publicChannelUrl(channel.handle);
              const card = <><div className="min-w-0"><h3 className="truncate font-black">{channel.name}</h3><p className="mt-1 truncate text-xs font-mono" style={{ color: "#9DEBFF" }}>{channel.handle ? `@${channel.handle}` : "Handle not visible in capture"}</p></div><div className="mt-4 flex flex-wrap gap-1.5">{channel.themes.map((theme) => <span key={theme} className="rounded-full px-2 py-1 text-[9px] font-mono" style={{ background: "rgba(185,140,255,0.12)", color: "#DCC8FF" }}>{theme}</span>)}</div></>;
              return url ? <a key={`${channel.name}-${channel.handle}`} href={url} target="_blank" rel="noreferrer" className="rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-[#00D4FF]" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(4,14,30,0.58)" }} aria-label={`Open ${channel.name} on YouTube`}>{card}<p className="mt-4 text-xs font-black" style={{ color: "#00D4FF" }}>Open public channel ↗</p></a> : <article key={`${channel.name}-source-snapshot`} className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,184,0,0.2)", background: "rgba(4,14,30,0.58)" }}>{card}<p className="mt-4 text-xs font-black" style={{ color: "#FFB800" }}>Visible in source snapshot</p></article>;
            })}</div>
            {!filteredChannels.length && <p className="mt-8 rounded-2xl border p-5 text-sm" style={{ borderColor: "rgba(255,184,0,0.22)", color: "#FFDEA0" }}>No entry matches that search. Try a broader term such as “quantum,” “chosen,” “archive,” or “story.”</p>}
          </section>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-8">
        <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.24)", background: "linear-gradient(135deg, rgba(255,184,0,0.075), rgba(185,140,255,0.055), rgba(0,212,255,0.035))" }}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>HILL FAMILY REMEMBRANCE · SOURCE RECORD</p><h2 className="mt-2 text-3xl font-black">A family chronology held in the open record</h2></div><p className="max-w-xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>The owner supplied this chronology and the Aug 16 phone capture showing 8:28. The family’s meaning and reflection are presented in their own context; the visual source remains part of the private intake record.</p></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{FAMILY_REMEMBRANCE.map((item) => <article key={item.title} className="rounded-2xl border p-5" style={{ borderColor: "rgba(255,184,0,0.16)", background: "rgba(4,14,30,0.58)" }}><p className="text-xs font-mono" style={{ color: "#FFB800" }}>{item.date}</p><h3 className="mt-3 text-lg font-black">{item.title}</h3><p className="mt-2 text-xs leading-relaxed" style={{ color: "#B9C8D7" }}>{item.detail}</p></article>)}</div>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/harlem-vineland-legacy" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.35)", color: "#FFDEA0" }}>Open Harlem–Vineland legacy →</Link><Link href="/chais-sabir-equation" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.35)", color: "#9DEBFF" }}>Open Chais Sabir Equation study →</Link><Link href="/chosen-ones-exchange" className="rounded-xl border px-4 py-2.5 text-sm font-black" style={{ borderColor: "rgba(185,140,255,0.35)", color: "#DCC8FF" }}>Share a first-person reflection →</Link></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-8">
        <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(0,255,136,0.22)", background: "rgba(0,255,136,0.025)" }}>
          <p className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>PATTERN, MEANING, AND METHODS LIBRARY</p><h2 className="mt-2 text-3xl font-black">Study paths for numbers, meaning, science, and careful comparison</h2><p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>These learning paths sit beside first-person family and synchronization records. Each source opens independently so readers can explore historical context, formal methods, and interpretation at their own pace.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{PATTERN_LEARNING.map((item) => <a key={item.lane} href={item.href} target="_blank" rel="noreferrer" className="rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-[#00FF88]" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(4,14,30,0.58)" }}><p className="text-xs font-mono" style={{ color: "#00FF88" }}>{item.lane}</p><h3 className="mt-2 font-black">{item.title}</h3><p className="mt-2 text-xs leading-relaxed" style={{ color: "#AFC0CF" }}>{item.detail}</p><p className="mt-4 text-[10px] font-mono" style={{ color: "#B5F7CC" }}>{item.source} ↗</p></a>)}</div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-8">
        <div className="rounded-3xl border p-6" style={{ borderColor: "rgba(255,184,0,0.24)", background: "linear-gradient(135deg, rgba(255,184,0,0.07), rgba(0,212,255,0.03))" }}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>SCROLLVERSE ACCESS PATHWAYS</p><h2 className="mt-2 text-3xl font-black">Research, music, media, Legion, and community</h2></div>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>These are direct ScrollVerse pathways alongside the public research catalog. External videos remain with their original public sources and attribution.</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{ACCESS_PATHWAYS.map((pathway) => <Link key={pathway.href} href={pathway.href} className="rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-[#FFB800]" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(4,14,30,0.58)" }}><p className="font-black"><span className="mr-2">{pathway.icon}</span>{pathway.title} →</p><p className="mt-2 text-xs leading-relaxed" style={{ color: "#AFC0CF" }}>{pathway.description}</p></Link>)}</div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-8"><div className="grid gap-4 md:grid-cols-3">{[
        ["Synchronization story lane", "/synchronizations", "First-party date, observation, and reflection record"],
        ["Quantum Research", "/quantum-research", "Evidence-led hardware, security, and networking learning path"],
        ["Open Record Continuum", "/open-record-continuum", "Creator-directed source, perspective, and correction record"],
        ["Chosen Ones Experience Exchange", "/chosen-ones-exchange", "First-person reflection, participant privacy, and community exchange"],
        ["Bounded Research Operations", "/bounded-research-operations", "Schedule options and owner decision draft; no recurring task is active"],
      ].map(([title, href, description]) => <Link key={href} href={href} className="rounded-2xl border p-5 transition hover:-translate-y-0.5" style={{ borderColor: "rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.025)" }}><p className="font-black" style={{ color: "#D8F8E7" }}>{title} →</p><p className="mt-2 text-xs leading-relaxed" style={{ color: "#AFC0CF" }}>{description}</p></Link>)}</div></section>
    </main>
  );
}
