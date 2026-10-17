import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

const artifacts = {
  omniland: { id: "omniland", title: "Omniland Cinematic Gateway", category: "Worlds", label: "FIRST-PARTY WORLD", detail: "Original cinema, animation, comic, story, and game-world entry points gathered in one visual gate." },
  dynasty: { id: "dynasty", title: "Dynasty Visual Archive", category: "Artifacts", label: "SOURCE-LABELED ARCHIVE", detail: "A source-labeled room for supplied seals, coins, readers, and the next scene brief." },
  fashion: { id: "fashion", title: "Fashion Portfolio", category: "Artifacts", label: "ORIGINAL CONCEPTS", detail: "Original concept looks and expandable brand worlds with direct first-party continuation paths." },
  music: { id: "music", title: "Music and Visual Outlet", category: "Music", label: "PUBLIC OUTLET", detail: "A single place to reach the creator's music, video, visual, and public footprint routes." },
  dna: { id: "dna", title: "Creator Digital DNA", category: "Systems", label: "CREATOR RECORD", detail: "Navigate the creator-authored equation, seal motifs, character lineage, and development record." },
  plasma: { id: "plasma", title: "Plasma State Map", category: "Systems", label: "GEOMETRIC STUDY", detail: "Explore a deterministic geometric study with readable state labels and local interaction." },
  storyworlds: { id: "storyworlds", title: "Black Batman & FlameCourt", category: "Worlds", label: "CREATOR STORY STUDIO", detail: "Explore source-attributed story lanes and connect their next scene to the AI Legion guide hub." },
  sourcecollections: { id: "sourcecollections", title: "October Source Collections", category: "Artifacts", label: "TEXT-LED SOURCE GALLERY", detail: "Browse creator collections and a duplicate-aware artifact-title index with source citations and local export." },
  metaarchive: { id: "metaarchive", title: "Meta AI Legion Archive", category: "Artifacts", label: "CREATOR SOURCE ROOM", detail: "Browse the source-labeled Legion Archive, Theater artwork, and deliberate-play screening room." },
  priceoffreedom: { id: "priceoffreedom", title: "The Price of Freedom", category: "Systems", label: "CITED HISTORY", detail: "Read a source-labeled timeline of Haiti’s independence indemnity with corrected dates, figures, and citations." },
} as const;

export type ArtifactId = keyof typeof artifacts;
export type ArtifactSummarySource = (item: (typeof artifacts)[ArtifactId]) => Promise<string>;

export function createArtifactSummaryService(generate: ArtifactSummarySource) {
  const cache = new Map<ArtifactId, Promise<string>>();
  return (id: string) => {
    if (!Object.prototype.hasOwnProperty.call(artifacts, id)) {
      return Promise.reject(new Error("Unknown artifact"));
    }
    const key = id as ArtifactId;
    const existing = cache.get(key);
    if (existing) return existing;
    const request = Promise.resolve()
      .then(() => generate(artifacts[key]))
      .then(text => {
        const summary = text.replace(/\*\*|[`#]|\s+/g, " ").trim().slice(0, 240);
        if (!summary) throw new Error("Summary unavailable");
        return summary;
      })
      .catch(error => {
        cache.delete(key);
        throw error;
      });
    cache.set(key, request);
    return request;
  };
}

const getArtifactSummary = createArtifactSummaryService(async item => {
  const answer = await invokeLLM({
    model: "gemini-3-flash-preview",
    maxTokens: 1024,
    messages: [
      { role: "system", content: "Write one brief, inviting, accurate sentence (under 35 words) introducing the given creator portfolio entry. Use only the supplied title, category, status label and description. Do not infer ownership, rights, publication, external operational status, prices, or other facts. No markdown." },
      { role: "user", content: JSON.stringify(item) },
    ],
  });
  const content = answer.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("Summary unavailable");
  return content;
});

export const portfolioSummaryRouter = router({
  get: publicProcedure
    .input(z.object({ id: z.enum(["omniland", "dynasty", "fashion", "music", "dna", "plasma", "storyworlds", "sourcecollections", "metaarchive", "priceoffreedom"]) }))
    .query(async ({ input }) => ({ summary: await getArtifactSummary(input.id) })),
});
