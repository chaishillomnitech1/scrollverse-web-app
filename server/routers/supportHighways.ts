import { publicProcedure, router } from "../_core/trpc";

const destinationLabels = {
  chime: "Chime",
  gocard: "GoCard",
  sofi: "SoFi",
  paypal: "PayPal",
  ouro: "Ouro",
} as const;

type DestinationKey = keyof typeof destinationLabels;

const isPublicHttpsUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
};

export const getPublicSupportDestinations = (raw = process.env.SUPPORT_HIGHWAYS_PUBLIC_DESTINATIONS) => {
  if (!raw) return [] as Array<{ id: DestinationKey; label: string; url: string }>;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return [];

    return (Object.keys(destinationLabels) as DestinationKey[]).flatMap((id) => {
      const candidate = (parsed as Record<string, unknown>)[id];
      if (typeof candidate !== "string") return [];
      const url = candidate.trim();
      return isPublicHttpsUrl(url) ? [{ id, label: destinationLabels[id], url }] : [];
    });
  } catch {
    return [];
  }
};

export const supportHighwaysRouter = router({
  getDestinations: publicProcedure.query(() => ({
    cashApp: {
      label: "Cash App",
      handle: "$chaisthegreat28",
      context: "#chaisthegreat",
      url: "https://cash.app/$chaisthegreat28",
      source: "Owner-stated public handle",
    },
    destinations: getPublicSupportDestinations(),
    privacyBoundary: "Public destinations only. Never enter passwords, one-time codes, account numbers, card data, wallet seed phrases, or private credentials in ScrollVerse.",
  })),
});
