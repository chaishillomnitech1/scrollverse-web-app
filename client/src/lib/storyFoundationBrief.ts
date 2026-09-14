export type StoryFoundationId = "dynasty" | "rebirth" | "filmFoundation" | "sevenEpisode";

export type StoryFoundationBriefPreset = {
  id: StoryFoundationId;
  label: string;
  prefill: {
    title: string;
    purpose: string;
    narrativeArc: string;
    sources: string;
  };
  boundary: string;
};

export const STORY_FOUNDATION_PRESETS: Record<StoryFoundationId, StoryFoundationBriefPreset> = {
  dynasty: {
    id: "dynasty",
    label: "Dynasty Visual Archive",
    prefill: {
      title: "Dynasty Visual Archive — original episode working title",
      purpose: "Develop an original ScrollVerse visual episode from a selected creator-supplied Dynasty source direction.",
      narrativeArc: "Choose the selected source’s symbolic role, establish an original character or world response, and resolve with a clear creator-led next question.",
      sources: "Creator-supplied Dynasty Visual Archive source record. Confirm the exact selected still or motion reference, permitted use, and any additional assets before production.",
    },
    boundary: "This handoff does not approve visual, sound, rights, accessibility, destination, production, financial, account, or release decisions.",
  },
  rebirth: {
    id: "rebirth",
    label: "Rebirth & Living Codex",
    prefill: {
      title: "Rebirth & Living Codex — original episode working title",
      purpose: "Develop an original Tree, Water, or Knowledge story lane with visible source context and human-governed planning boundaries.",
      narrativeArc: "Introduce a care-centered creative question, move through a source-aware choice, and close by distinguishing the story-world outcome from any real-world field work.",
      sources: "Creator-supplied Rebirth and Living Codex planning record plus the selected external research reference. Confirm all use permissions and applied-science context before production.",
    },
    boundary: "This handoff does not approve visual, sound, rights, accessibility, destination, production, financial, account, or release decisions.",
  },
  filmFoundation: {
    id: "filmFoundation",
    label: "INFININILLIONAIRE Film Foundation",
    prefill: {
      title: "INFININILLIONAIRE Film Foundation — original chapter working title",
      purpose: "Develop an original cinematic chapter from the reviewed public high-level arc while retaining clear source and production boundaries.",
      narrativeArc: "Select a chapter from Queensbridge, Quantum Mansion, Beyond the Veil, Before the World Blows, or THOTHIBIS; establish its human stakes, source trail, and accountable closing image.",
      sources: "Reviewed public INFININILLIONAIRE Film Foundation repository. Confirm the exact chapter, creator-controlled assets, contributors, and permissions before production.",
    },
    boundary: "This handoff does not approve visual, sound, rights, accessibility, destination, production, financial, account, or release decisions.",
  },
  sevenEpisode: {
    id: "sevenEpisode",
    label: "Seven-Episode Series",
    prefill: {
      title: "Seven-Episode Series — selected episode working title",
      purpose: "Develop one original episode from the ScrollVerse seven-episode season board.",
      narrativeArc: "Select the episode’s world, dramatic purpose, source lane, opening, development, climax, and resolution before choosing any production details.",
      sources: "ScrollVerse Seven-Episode Series browser-local planning record. Confirm the selected episode and all creator-controlled or licensed references before production.",
    },
    boundary: "This handoff does not approve visual, sound, rights, accessibility, destination, production, financial, account, or release decisions.",
  },
};

export function getStoryFoundationFromSearch(search: string): StoryFoundationBriefPreset | null {
  const foundation = new URLSearchParams(search).get("foundation");
  if (!foundation || !(foundation in STORY_FOUNDATION_PRESETS)) return null;
  return STORY_FOUNDATION_PRESETS[foundation as StoryFoundationId];
}
