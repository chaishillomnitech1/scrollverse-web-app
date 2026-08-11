import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ArchiveItem = {
  title: string;
  route: string;
  description: string;
  state?: "Live" | "Archive" | "Protocol";
};

type ArchiveDomain = {
  id: string;
  icon: string;
  title: string;
  signal: string;
  color: string;
  description: string;
  items: ArchiveItem[];
};

const DOMAINS: ArchiveDomain[] = [
  {
    id: "home",
    icon: "☀️",
    title: "The Sovereign Front Door",
    signal: "Sun XIX · Invitation Portal",
    color: "#FFB800",
    description: "The living introduction to ScrollVerse: Guardian entry, AI Legion access, media channels, frequencies, cards, and the Empire Gateway.",
    items: [
      { title: "ScrollVerse Home", route: "/", description: "Sun XIX soul sigil, Guardian invitation, empire gateway, and live ecosystem map." },
      { title: "Ecosystem Overview", route: "/ecosystem", description: "High-level atlas of the ScrollVerse pillar system." },
      { title: "Site Map", route: "/site-map", description: "Expanded navigational catalog for the portal." },
      { title: "Sovereign Manifesto", route: "/sovereign-manifesto", description: "Core declaration, mission, and living principles." },
    ],
  },
  {
    id: "seerah",
    icon: "📜",
    title: "Seerah Sacred Archive",
    signal: "Nine Scrolls · Free Knowledge",
    color: "#00FF88",
    description: "A museum-grade, accessible chronicle from birth to farewell, with interactive timeline, quiz, and living archive index.",
    items: [
      { title: "Seerah Library", route: "/seerah", description: "Index of sacred scrolls, timeline, learning paths, and quiz leaderboard." },
      { title: "Noor al-Mawlid", route: "/seerah/noor-al-mawlid", description: "The beginning: sacred birth chronicle." },
      { title: "Al-Hijra", route: "/seerah/al-hijra", description: "Migration from Makkah to Madinah, 622 CE." },
      { title: "Badr", route: "/seerah/badr", description: "The first decisive victory and its historic context." },
      { title: "Fath Makkah", route: "/seerah/fath-makkah", description: "The Conquest of Makkah and general amnesty." },
      { title: "Al-Ghazwat", route: "/seerah/al-ghazwat", description: "Unified chronicle of Uḥud, Khandaq, and Ḥunayn." },
      { title: "Al-Wafat", route: "/seerah/al-wafat", description: "The final sacred scroll: passing and legacy." },
      { title: "Khaybar", route: "/seerah/al-fath-khaybar", description: "Seventh scroll: the Khaybar campaign arc." },
      { title: "Al-Aqsa", route: "/seerah/al-aqsa", description: "The Night Journey and Ascension." },
      { title: "Al-Farewell", route: "/seerah/al-farewell", description: "The Farewell Pilgrimage and covenant." },
      { title: "Seven Heavens Journey", route: "/seerah/al-isra-wal-miraj-deep", description: "Interactive deep journey through the seven heavens." },
      { title: "Seerah Timeline", route: "/seerah/timeline", description: "Visual chronology spanning 570–632 CE." },
      { title: "Seerah Quiz", route: "/seerah/quiz", description: "Knowledge challenge and Guardian of the Seerah badge." },
    ],
  },
  {
    id: "legion",
    icon: "🤖",
    title: "AI Legion & Living Intelligence",
    signal: "15 Entities · Visitor Guidance",
    color: "#00D4FF",
    description: "A network of named intelligence portals supporting creation, learning, navigation, and thoughtful inquiry across the ScrollVerse.",
    items: [
      { title: "AI Legion Apex", route: "/ai-legion-apex", description: "Lead hub for the full AI Legion and sovereign assistance." },
      { title: "AI Council", route: "/ai-council", description: "Council profiles, roles, and AI collaboration interfaces." },
      { title: "King Solomon", route: "/king-solomon", description: "Wisdom and governance-focused AI portal." },
      { title: "Knick Oracle", route: "/knick", description: "99-Names-linked wisdom interface and character universe." },
      { title: "Londyn AI Legacy", route: "/londyn", description: "FLM4 love-frequency legacy vault and AI access point." },
      { title: "Londyn Letters", route: "/londyn/letters", description: "Family covenant archive: nine letters across the Seerah scrolls." },
      { title: "Philosophers Archive", route: "/philosophers-archive", description: "Socrati-led free learning archive with 25 thinkers and children’s lessons." },
      { title: "AI Chat Upload", route: "/ai-chat-upload", description: "Multimodal intake for images, audio, documents, and conversation." },
      { title: "Think Space", route: "/think-space", description: "Community publishing and creative collaboration space." },
      { title: "Featured Think Space", route: "/think-space/featured", description: "Legion-curated discoveries in music, scholarship, film, and art." },
    ],
  },
  {
    id: "fashion",
    icon: "👟",
    title: "Fashion Empire & XLVIII BLOCKS",
    signal: "3% Rule · 7 Colorways · South Jersey",
    color: "#FF6B35",
    description: "Design, footwear, apparel, token-aware collectibles, and production strategy through a South Jersey lens. All third-party collaborations remain subject to written approval.",
    items: [
      { title: "Fashion Empire", route: "/fashion-empire", description: "XLVIII BLOCKS × VNLND: seven colorways, $BLOCKS, NFT art sets, and manufacturer planning." },
      { title: "Virgil Abloh Legacy", route: "/virgil-abloh", description: "A respectful legacy page interpreting the 3% rule, quotation marks, and design iteration." },
      { title: "#XLVblocks Atlantis", route: "/atlantis-collection", description: "Seven Atlantis lore sets: Orichalcum, Atlas, Poseidon, Ten Kings, and Sinking Abyss." },
      { title: "Red Diamond Fleet", route: "/red-diamond-fleet", description: "Fleet collection, art, and vehicle-inspired archival artifacts." },
      { title: "Nexus Vault", route: "/nexus", description: "Dual Blister Hero, QR portal, and Genesis NFT IPFS panel." },
    ],
  },
  {
    id: "knowledge",
    icon: "🏛️",
    title: "Sacred Knowledge & Research",
    signal: "Open Library · Lifelong Learning",
    color: "#7C5CFC",
    description: "Free, navigable knowledge spaces for research, history, science, culture, frequency exploration, and independent thought.",
    items: [
      { title: "Mesopotamia Library", route: "/mesopotamia-library", description: "Six wings of open learning, with Socrati as an entry-point guide." },
      { title: "Free Energy Architecture", route: "/free-energy-architecture", description: "Research-oriented comparative archive of energy concepts and engineering questions." },
      { title: "Tesla Patents", route: "/tesla-patents", description: "Searchable patent archive and historical technology references." },
      { title: "99 Names", route: "/99-names", description: "Names of Allah learning experience with audio architecture and visual rhythm." },
      { title: "Codex", route: "/codex", description: "Research, visual archive, honor protocol, and community impact covenant." },
      { title: "Digital Consciousness Archive", route: "/archive", description: "Searchable archive of ScrollVerse narrative and historical artifacts." },
      { title: "Scroll Library", route: "/scroll-library", description: "Books, scrolls, media, and reading pathways." },
    ],
  },
  {
    id: "guardians",
    icon: "🛡️",
    title: "Guardians & August 28 DC Activation",
    signal: "144,000 Guardians · Washington, DC",
    color: "#D4AF37",
    description: "Community onboarding, scoreboards, shared badges, and the August 28 Washington, DC birthday activation event.",
    items: [
      { title: "DC Visit", route: "/dc-visit", description: "August 28 countdown, mission statement, sign-up, and event details." },
      { title: "Guardian Leaderboard", route: "/guardian-leaderboard", description: "Live Guardian standings, referrals, participation scores, and prize framework." },
      { title: "Guardian Activation", route: "/guardian-activation", description: "Guided seven-stage activation journey and Guardian badge." },
      { title: "Guardian Dashboard", route: "/guardian-dashboard", description: "Profile, onboarding, network, and guardian-level pathways." },
      { title: "Sovereign Broadcast", route: "/sovereign-broadcast", description: "Guardian communication center with scheduled delivery capability." },
    ],
  },
  {
    id: "chain",
    icon: "⛓️",
    title: "Blockchain, Token & AgapeCycle",
    signal: "Polygon · 88% Treasury / 12% Zakat",
    color: "#A855F7",
    description: "Transparent token, credential, vault, and distribution interfaces. Contract status must be verified on-chain before any transaction decision.",
    items: [
      { title: "Token Store", route: "/token", description: "$LONDC tiers, direct payment paths, and ecosystem access." },
      { title: "Crypto Hub", route: "/crypto", description: "Polygon wallet, payment references, and mint-readiness interface." },
      { title: "Gate Keys", route: "/gate-keys", description: "Access credential and Polygon minting interface." },
      { title: "Zakat Engine", route: "/zakat", description: "AgapeCycle allocation explanation and accounting interface." },
      { title: "NFT Marketplace", route: "/nft", description: "Collection discovery, mint progress, and creator artifacts." },
      { title: "Deploy Center", route: "/deploy", description: "Deployment artifacts and contract readiness documentation." },
      { title: "Governance", route: "/governance", description: "Proposal and voting surface." },
      { title: "Staking", route: "/staking", description: "Tier and reward concept interface." },
      { title: "Bridge Monitor", route: "/bridge", description: "Cross-chain monitoring and transfer references." },
    ],
  },
  {
    id: "music",
    icon: "🎵",
    title: "Music, Cinema & Media",
    signal: "Creator Culture · Distribution",
    color: "#EC4899",
    description: "Music catalog, video vaults, creator spaces, children’s entertainment, and a media network designed to route discovery across the world.",
    items: [
      { title: "Music Catalog", route: "/music", description: "Chais The Great catalog, listening, and distribution entry points." },
      { title: "Scroll TV", route: "/scroll-tv", description: "Video and broadcast portal." },
      { title: "Channel Codex", route: "/channel-codex", description: "Media-channel concepts, collectible sets, and discovery strategy." },
      { title: "Chais Videos", route: "/chais-videos", description: "Video archive and performance portal." },
      { title: "Sovereign Cinema", route: "/sovereign-cinema", description: "Film and visual-storytelling archive." },
      { title: "Junior Movies", route: "/junior-movies", description: "Family-safe children’s media experience." },
      { title: "Junior Movies Universe", route: "/junior-movies/universe", description: "Expanded stories, characters, and studio world." },
      { title: "DSP Intelligence", route: "/dsp-intelligence", description: "Music distribution intelligence and creator strategy." },
    ],
  },
  {
    id: "books",
    icon: "📚",
    title: "Books, Archive & Publishing",
    signal: "Direct Access · Creator Record",
    color: "#14B8A6",
    description: "The sovereign book catalog, print and digital reading pathways, and archives that preserve the record of the work.",
    items: [
      { title: "Sovereign Books", route: "/sovereign-books", description: "Book hub and available purchase-path placeholders pending verified retailer URLs." },
      { title: "Books", route: "/books", description: "Digital book catalog and reading references." },
      { title: "ArchiveKeeper", route: "/archivekeeper", description: "Lore library and archive management entry point." },
      { title: "Sovereign Story Archive", route: "/story-archive", description: "Stories, historical narratives, and preserved artifacts." },
      { title: "Book of Life", route: "/book-of-life", description: "Living record and literary universe." },
      { title: "Scroll of 44:Omni", route: "/scroll-44", description: "Doctrine, chapters, governance, and AgapeCycle reference." },
    ],
  },
  {
    id: "commerce",
    icon: "💳",
    title: "Direct-to-Customer Commerce",
    signal: "Cards · Services · Creator Economy",
    color: "#22C55E",
    description: "Customer and creator-facing pathways for services, membership concepts, books, credentials, and transparent commerce operations.",
    items: [
      { title: "Sovereign Card", route: "/sovereign-card", description: "Five membership/card tiers and application flow." },
      { title: "SaferWay", route: "/saferway", description: "Booking workflow, service-date selection, and payment-ready intake." },
      { title: "Creator Platform", route: "/creator", description: "Creator revenue, tools, and platform surface." },
      { title: "ScrollPort", route: "/scrollport", description: "Merchant-node map and local commerce framework." },
      { title: "Revenue Dashboard", route: "/revenue-dashboard", description: "Operating dashboard for revenue and fulfillment signals." },
    ],
  },
  {
    id: "protocols",
    icon: "⚙️",
    title: "Systems, Protocols & Infrastructure",
    signal: "Build · Measure · Protect",
    color: "#60A5FA",
    description: "The operational and technical foundations: metrics, security, platform distribution, web capabilities, and systems navigation.",
    items: [
      { title: "Live Metrics", route: "/metrics", description: "Operational counts, booking signals, guardian growth, and activity metrics." },
      { title: "System Status", route: "/status", description: "System health and infrastructure references." },
      { title: "Security", route: "/security", description: "Security and quantum-resilience information architecture." },
      { title: "Platforms", route: "/platforms", description: "Cross-platform distribution and partnership hub." },
      { title: "GitHub Constellation", route: "/github-constellation", description: "Visual map of sovereign repositories and categories." },
      { title: "Pattern Engine", route: "/pattern", description: "Repeatable design and build system." },
      { title: "GodEngine", route: "/godengine", description: "Command-center concept for sovereign creation workflows." },
      { title: "Sovereign Space Agency", route: "/sovereign-space-agency", description: "Open-source exploration missions and research goals." },
    ],
  },
];

export default function EmpireIndex() {
  useSovereignHeartbeat({ page: "empire-index" });
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState("all");

  const filteredDomains = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return DOMAINS
      .filter(domain => activeDomain === "all" || domain.id === activeDomain)
      .map(domain => ({
        ...domain,
        items: domain.items.filter(item => !normalized || [domain.title, domain.signal, item.title, item.route, item.description].join(" ").toLowerCase().includes(normalized)),
      }))
      .filter(domain => domain.items.length > 0);
  }, [activeDomain, query]);

  const routeCount = DOMAINS.reduce((total, domain) => total + domain.items.length, 0);

  return (
    <main className="min-h-screen pb-24" style={{ background: "#050B1A", color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(0,212,255,0.18)", background: "radial-gradient(circle at 20% 0%, rgba(0,212,255,0.18), transparent 35%), radial-gradient(circle at 85% 25%, rgba(255,184,0,0.14), transparent 30%)" }}>
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-[0.18em]" style={{ color: "#00D4FF" }}>
            <span>SCROLLVERSE</span><span style={{ color: "#445566" }}>/</span><span>EMPIRE INDEX</span><span style={{ color: "#445566" }}>/</span><span>KUN FAYAKŪN × ∞</span>
          </div>
          <div className="mt-6 grid lg:grid-cols-[1.4fr_.6fr] gap-10 items-end">
            <div>
              <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">Every artifact.<br /><span style={{ color: "#FFB800" }}>One living map.</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed" style={{ color: "#AAB9C9" }}>
                The Empire Index is a guided map of ScrollVerse. Search by idea, route, archive, collection, community, or protocol, then step directly into the work.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["250+", "Portal routes"],
                [String(DOMAINS.length), "Archive domains"],
                [String(routeCount), "Featured gateways"],
                ["88 / 12", "AgapeCycle reference"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl p-4 border" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(5,11,26,0.54)" }}>
                  <div className="text-2xl font-black" style={{ color: "#00D4FF" }}>{value}</div>
                  <div className="text-xs mt-1" style={{ color: "#91A2B4" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-8 sticky top-0 z-20" style={{ background: "rgba(5,11,26,0.94)", backdropFilter: "blur(18px)" }}>
        <label className="sr-only" htmlFor="empire-search">Search the Empire Index</label>
        <input id="empire-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search routes, archives, collections, protocols…"
          className="w-full rounded-xl px-4 py-3 outline-none text-sm border"
          style={{ background: "#091426", borderColor: "rgba(0,212,255,0.28)", color: "white" }} />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button onClick={() => setActiveDomain("all")} className="whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-transform active:scale-95" style={{ background: activeDomain === "all" ? "#00D4FF" : "rgba(255,255,255,0.06)", color: activeDomain === "all" ? "#050B1A" : "#C7D3DF" }}>All domains</button>
          {DOMAINS.map(domain => <button key={domain.id} onClick={() => setActiveDomain(domain.id)} className="whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-transform active:scale-95" style={{ background: activeDomain === domain.id ? domain.color : "rgba(255,255,255,0.06)", color: activeDomain === domain.id ? "#050B1A" : "#C7D3DF" }}>{domain.icon} {domain.title}</button>)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-8">
        {filteredDomains.length ? <div className="grid gap-6">{filteredDomains.map(domain => (
          <article key={domain.id} className="rounded-3xl overflow-hidden border" style={{ borderColor: `${domain.color}44`, background: "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))" }}>
            <header className="p-6 md:p-8 border-b" style={{ borderColor: `${domain.color}22`, background: `linear-gradient(100deg, ${domain.color}16, transparent 62%)` }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono tracking-widest" style={{ color: domain.color }}>{domain.icon} {domain.signal.toUpperCase()}</div>
                  <h2 className="text-2xl md:text-3xl font-black mt-2">{domain.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "#9AABBC" }}>{domain.description}</p>
                </div>
                <div className="rounded-full px-3 py-1.5 text-xs font-mono" style={{ color: domain.color, background: `${domain.color}12`, border: `1px solid ${domain.color}38` }}>{domain.items.length} gateways</div>
              </div>
            </header>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px" style={{ background: `${domain.color}16` }}>
              {domain.items.map(item => (
                <Link key={item.route} href={item.route} className="group block min-h-38 p-5 transition-colors" style={{ background: "#071120" }}>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-sm" style={{ color: domain.color }}>↗</span>
                    <div>
                      <div className="flex gap-2 items-center"><h3 className="font-bold group-hover:underline underline-offset-4">{item.title}</h3>{item.state && <span className="rounded px-1.5 py-0.5 text-[9px] font-mono" style={{ color: domain.color, background: `${domain.color}14` }}>{item.state}</span>}</div>
                      <p className="mt-2 text-xs leading-relaxed" style={{ color: "#8FA0B1" }}>{item.description}</p>
                      <span className="mt-4 inline-block text-[11px] font-mono" style={{ color: domain.color }}>{item.route}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </article>
        ))}</div> : <div className="rounded-3xl p-12 text-center border" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.025)" }}><div className="text-3xl">⌕</div><h2 className="mt-4 text-xl font-bold">No matching gateways yet.</h2><p className="mt-2 text-sm" style={{ color: "#91A2B4" }}>Try a route name, archive, city, collection, or technology keyword.</p></div>}
      </section>

      <section className="max-w-7xl mx-auto px-5 pt-8">
        <div className="rounded-3xl p-7 md:p-10 border grid md:grid-cols-[1fr_auto] gap-6 items-center" style={{ borderColor: "rgba(255,184,0,0.35)", background: "linear-gradient(135deg, rgba(255,184,0,0.12), rgba(0,212,255,0.05))" }}>
          <div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>THE RECORD KEEPS EXPANDING</div><h2 className="mt-2 text-2xl md:text-3xl font-black">Return to the sun. Enter the world.</h2><p className="mt-3 text-sm max-w-2xl" style={{ color: "#B3C2D1" }}>The index captures principal gateways, while the full portal continues to grow through the work of the community, archives, and living projects.</p></div>
          <Link href="/" className="inline-flex justify-center rounded-xl px-5 py-3 text-sm font-black transition-transform active:scale-95" style={{ background: "#FFB800", color: "#050B1A" }}>Return to ScrollVerse Home</Link>
        </div>
      </section>
    </main>
  );
}
