export type CreatorChannelHandoff = {
  title: string;
  destination: string;
  lane: "Music" | "Social" | "Video" | "Youth & Family";
  icon: string;
  url: string;
  note: string;
  color: string;
};

// These destinations were supplied directly by the ScrollVerse owner. They are
// creator-provided handoffs, not platform affiliation or independently verified
// ownership claims. Keep URLs and display labels reviewable in one shared place.
export const CREATOR_CHANNEL_HANDOFFS: CreatorChannelHandoff[] = [
  {
    title: "Chais the Great",
    destination: "Spotify artist destination",
    lane: "Music",
    icon: "♫",
    url: "https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr",
    note: "Creator-provided artist destination. Spotify controls profile access, playback, catalog metadata, and all platform decisions.",
    color: "#00FF88",
  },
  {
    title: "@chaishill",
    destination: "Instagram profile destination",
    lane: "Social",
    icon: "◎",
    url: "https://www.instagram.com/chaishill",
    note: "Creator-provided social destination. Instagram may require sign-in and retains all account, visibility, and policy decisions.",
    color: "#FF8DB5",
  },
  {
    title: "Chais the Great VEVO",
    destination: "YouTube channel destination",
    lane: "Video",
    icon: "▶",
    url: "https://youtube.com/@chaisthegreatvevo",
    note: "Creator-provided channel destination. YouTube retains channel access, monetization, visibility, and rights-review decisions.",
    color: "#FF5568",
  },
  {
    title: "Junior Movies Entertainment",
    destination: "YouTube channel destination",
    lane: "Youth & Family",
    icon: "✦",
    url: "https://youtube.com/@juniormoviesentertainment",
    note: "Creator-provided channel destination for youth and family media discovery. YouTube controls all account and publishing decisions.",
    color: "#FFB800",
  },
  {
    title: "Creator-provided YouTube video",
    destination: "Direct video handoff",
    lane: "Video",
    icon: "↗",
    url: "https://youtu.be/wwXqO99diH0",
    note: "A direct video destination supplied by the creator. Title and channel attribution remain intentionally unlisted until they can be confirmed from a public source.",
    color: "#00D4FF",
  },
];
