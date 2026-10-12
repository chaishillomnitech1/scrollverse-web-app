export type PortfolioFilter = {
  category: string;
  query: string;
  sort: "newest" | "oldest";
  page: number;
  pageSize: number;
  favorites?: readonly string[];
};

type PortfolioSearchable = {
  id: string;
  title: string;
  detail: string;
  category: string;
  label: string;
  catalogDate: string;
};

export function paginatePortfolio<T extends PortfolioSearchable>(items: readonly T[], filter: PortfolioFilter) {
  const query = filter.query.trim().toLocaleLowerCase();
  const matching = items
    .filter(item => !filter.favorites || filter.favorites.includes(item.id))
    .filter(item => filter.category === "All" || item.category === filter.category)
    .filter(item => !query || [item.id, item.title, item.detail, item.category, item.label].some(value => value.toLocaleLowerCase().includes(query)))
    .sort((a, b) => filter.sort === "newest" ? b.catalogDate.localeCompare(a.catalogDate) : a.catalogDate.localeCompare(b.catalogDate));
  const pageSize = Math.max(1, Math.floor(filter.pageSize) || 1);
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  const page = Math.min(pageCount, Math.max(1, Math.floor(filter.page) || 1));
  return {
    items: matching.slice((page - 1) * pageSize, page * pageSize),
    total: matching.length,
    page,
    pageCount,
  };
}
