import { metaLegionArtworks, theaterScreenings } from "./metaLegionArchive";

export type GamePreviewGenre =
  | "ACTION"
  | "SPORTS"
  | "WAR"
  | "URBAN STREET"
  | "COMIC / CARTOON"
  | "RACING"
  | "STRATEGY / SIMULATION";

export type GamePreviewRecord = {
  id: string;
  title: string;
  description: string;
  genre: GamePreviewGenre;
  thumbnail: string;
  recordHref: string;
  sourceUrl?: string;
  poster?: string;
  sourceLabel: "CONFIRMED THEATER MEDIA" | "LOCAL CATALOG RECORD";
};

const artwork = (id: string) => metaLegionArtworks.find((item) => item.id === id)?.thumbnail ?? "/manus-storage/omniland-play-district-v2_f9e35760.png";
const theater = (id: string) => theaterScreenings.find((item) => item.id === id);

export const gamePreviewRecords: GamePreviewRecord[] = [
  {
    id: "GAME-ACTION-001",
    title: "Quantum Leap: Action Gate",
    description: "A high-energy portal cut for a browser-first action lane with Thoth-Hawk and the Omniland gateway in the visual vocabulary.",
    genre: "ACTION",
    thumbnail: artwork("ML-001"),
    recordHref: "/source-collections?record=GAME-ACTION-001",
    sourceUrl: theater("THEATER-PROMO-16")?.video,
    poster: theater("THEATER-PROMO-16")?.poster,
    sourceLabel: "CONFIRMED THEATER MEDIA",
  },
  {
    id: "GAME-BASKETBALL-001",
    title: "Guardian Court: Basketball World",
    description: "A basketball concept record for responsive play, spectator moments, and shared citizen challenges.",
    genre: "SPORTS",
    thumbnail: artwork("ML-003"),
    recordHref: "/source-collections?record=GAME-BASKETBALL-001",
    sourceLabel: "LOCAL CATALOG RECORD",
  },
  {
    id: "GAME-FOOTBALL-001",
    title: "Legion Field: Football World",
    description: "A football concept record for routes, formations, team identity, and high-energy crowd moments.",
    genre: "SPORTS",
    thumbnail: artwork("ML-017"),
    recordHref: "/source-collections?record=GAME-FOOTBALL-001",
    sourceLabel: "LOCAL CATALOG RECORD",
  },
  {
    id: "GAME-SPORTS-ALL-001",
    title: "OmniArena: All Sports Types",
    description: "A broad sports lane for basketball, football, and future owner-catalog sports formats in one shared arena.",
    genre: "SPORTS",
    thumbnail: artwork("ML-012"),
    recordHref: "/source-collections?record=GAME-SPORTS-ALL-001",
    sourceLabel: "LOCAL CATALOG RECORD",
  },
  {
    id: "GAME-WAR-001",
    title: "Pyramid Front: War Chronicle",
    description: "A strategic war-story lane grounded in the owner catalog’s pyramid, legion, and guardian visual records.",
    genre: "WAR",
    thumbnail: artwork("ML-008"),
    recordHref: "/source-collections?record=GAME-WAR-001",
    sourceLabel: "LOCAL CATALOG RECORD",
  },
  {
    id: "GAME-URBAN-001",
    title: "Black Atlantic City: Street Signal",
    description: "An urban street game-preview record connecting city movement, music, style, and the owner character’s story-world lane.",
    genre: "URBAN STREET",
    thumbnail: artwork("ML-004"),
    recordHref: "/source-collections?record=GAME-URBAN-001",
    sourceLabel: "LOCAL CATALOG RECORD",
  },
  {
    id: "GAME-COMIC-001",
    title: "Thoth-Hawk: Comic Skyway",
    description: "A comic/cartoon short lane for the Thoth-Hawk mythos, visual panels, and a living storyboard-world.",
    genre: "COMIC / CARTOON",
    thumbnail: artwork("ML-011"),
    recordHref: "/source-collections?record=GAME-COMIC-001",
    sourceUrl: theater("THEATER-FILM-001")?.video,
    poster: theater("THEATER-FILM-001")?.poster,
    sourceLabel: "CONFIRMED THEATER MEDIA",
  },
  {
    id: "GAME-RACING-001",
    title: "88 MPH: Emerald Circuit",
    description: "A racing concept record for the Café 88 time circuit, emerald torus routes, and cinematic vehicle motion.",
    genre: "RACING",
    thumbnail: artwork("ML-009"),
    recordHref: "/source-collections?record=GAME-RACING-001",
    sourceLabel: "LOCAL CATALOG RECORD",
  },
  {
    id: "GAME-STRATEGY-001",
    title: "Omni-Merge: Strategy Table",
    description: "A strategy/simulation record for shared state, world districts, agent cooperation, and player-shaped outcomes.",
    genre: "STRATEGY / SIMULATION",
    thumbnail: artwork("ML-010"),
    recordHref: "/source-collections?record=GAME-STRATEGY-001",
    sourceUrl: theater("THEATER-PROMO-9")?.video,
    poster: theater("THEATER-PROMO-9")?.poster,
    sourceLabel: "CONFIRMED THEATER MEDIA",
  },
  {
    id: "GAME-OTHER-001",
    title: "Soul Evolution: Other Worlds",
    description: "An additional visual-world record for discovery beyond the first seven lanes, held for future interaction and import.",
    genre: "COMIC / CARTOON",
    thumbnail: artwork("ML-005"),
    recordHref: "/source-collections?record=GAME-OTHER-001",
    sourceLabel: "LOCAL CATALOG RECORD",
  },
];

export const gamePreviewGenres: Array<"ALL" | GamePreviewGenre> = [
  "ALL",
  "ACTION",
  "SPORTS",
  "WAR",
  "URBAN STREET",
  "COMIC / CARTOON",
  "RACING",
  "STRATEGY / SIMULATION",
];

export const gamePreviewBuildRoutes: Record<GamePreviewGenre, string> = {
  ACTION: "/game-worlds-studio",
  SPORTS: "/gaming-hub",
  WAR: "/game-worlds-studio",
  "URBAN STREET": "/gaming-hub",
  "COMIC / CARTOON": "/omniland-game-systems-contribution",
  RACING: "/gaming-hub",
  "STRATEGY / SIMULATION": "/omniland-consoleless-delivery",
};
