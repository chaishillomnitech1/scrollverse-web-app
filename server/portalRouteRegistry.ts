import { eq } from "drizzle-orm";
import { portalRouteRecords } from "../drizzle/schema";

export const PORTAL_ROUTE_REFRESH_KEY = "scrollverse-public-route-registry";

export const PORTAL_ROUTE_DEFINITIONS = [
  { routePath: "/", label: "ScrollVerse Home", category: "Portal", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/living-journey-experience", label: "Living Journey Experience", category: "Journey", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/book-of-the-journey", label: "Book of the Journey", category: "Books", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/books", label: "ScrollVerse Books", category: "Books", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/seerah", label: "Seerah", category: "Islamic Learning", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/99-names", label: "99 Names", category: "Islamic Learning", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/seerah/timeline", label: "Seerah Timeline", category: "Islamic Learning", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/seerah/al-hijra", label: "Al-Hijra", category: "Islamic Learning", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/seerah/al-farewell", label: "Farewell Path", category: "Islamic Learning", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/open-knowledge-verse", label: "Open Knowledge Verse", category: "Knowledge", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/knowledge-navigator", label: "Knowledge Navigator", category: "Knowledge", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/synchronization-research", label: "Synchronization Research", category: "Research", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/chais-sabir-equation", label: "Chais Sabir Equation", category: "Research", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/sovereign-methodology", label: "Sovereign Methodology", category: "Research", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/journey-co-creation-archive", label: "Journey & Co-Creation Archive", category: "Journey", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/harlem-vineland-legacy", label: "Harlem–Vineland Legacy", category: "Family Legacy", operatingState: "AVAILABLE_NOW", sourceLabel: "Owner-authored family legacy route", isFeatured: false },
  { routePath: "/direct-fan-catalog", label: "Direct-to-Fan Catalog", category: "Creator", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/sovereign-contribution-exchange", label: "Sovereign Contribution Exchange", category: "Community", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/chosen-ones-exchange", label: "Chosen Ones Experience Exchange", category: "Community", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/creator-workspace", label: "Creator Workspace", category: "Story Studio", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/junior-movies", label: "Junior Movies", category: "Story Studio", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: true },
  { routePath: "/media-hub", label: "Media Hub", category: "Story Studio", operatingState: "AVAILABLE_NOW", sourceLabel: "ScrollVerse internal route", isFeatured: false },
  { routePath: "/nft-monetization-blueprint", label: "NFT Monetization Blueprint", category: "Tokenization Readiness", operatingState: "RESEARCH", sourceLabel: "ScrollVerse internal route", isFeatured: false },
] as const;

type RegistryDb = {
  select: (...args: any[]) => any;
  insert: (...args: any[]) => any;
  update: (...args: any[]) => any;
};

export async function refreshPortalRouteRegistry(db: RegistryDb) {
  let insertedCount = 0;
  let updatedCount = 0;

  for (const route of PORTAL_ROUTE_DEFINITIONS) {
    const [existing] = await db.select().from(portalRouteRecords).where(eq(portalRouteRecords.routePath, route.routePath)).limit(1);
    if (!existing) {
      await db.insert(portalRouteRecords).values(route);
      insertedCount += 1;
      continue;
    }

    const changed = existing.label !== route.label || existing.category !== route.category || existing.operatingState !== route.operatingState || existing.sourceLabel !== route.sourceLabel || existing.isFeatured !== route.isFeatured;
    if (changed) {
      await db.update(portalRouteRecords).set(route).where(eq(portalRouteRecords.id, existing.id));
      updatedCount += 1;
    }
  }

  return {
    routeCount: PORTAL_ROUTE_DEFINITIONS.length,
    insertedCount,
    updatedCount,
    summary: `Refreshed ${PORTAL_ROUTE_DEFINITIONS.length} public portal route records. This deterministic inventory writes internal route metadata only; it does not publish content, contact external services, alter a release state, or perform a financial, token, wallet, or marketplace action.`,
  };
}
