export const PORTFOLIO_FAVORITES_KEY = "scrollverse-portfolio-favorites-v1";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function readPortfolioFavorites(storage: StorageLike, allowedIds: readonly string[]): string[] {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(PORTFOLIO_FAVORITES_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object" || !('entries' in parsed) || !Array.isArray(parsed.entries)) return [];
    const allow = new Set(allowedIds);
    return Array.from(new Set(parsed.entries.filter((id): id is string => typeof id === "string" && allow.has(id))));
  } catch {
    return [];
  }
}

export function writePortfolioFavorites(storage: StorageLike, ids: readonly string[]): boolean {
  try {
    storage.setItem(PORTFOLIO_FAVORITES_KEY, JSON.stringify({ version: 1, entries: ids }));
    return true;
  } catch {
    return false;
  }
}

export function togglePortfolioFavorite(current: readonly string[], id: string, allowedIds: readonly string[]): string[] {
  if (!allowedIds.includes(id)) return [...current];
  return current.includes(id) ? current.filter(entry => entry !== id) : [...current, id];
}
