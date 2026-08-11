export type IndependentFashionBrand = {
  id: "xlviii-blocks" | "mein-core" | "atlantis";
  name: string;
  legalLabel: string;
  origin: string;
  statement: string;
  colorways: Array<{ name: string; hex: string; note: string }>;
  routes: Array<{ label: string; href: string }>;
};

export const INDEPENDENT_FASHION_BRANDS: IndependentFashionBrand[] = [
  {
    id: "xlviii-blocks",
    name: "XLVIII BLOCKS",
    legalLabel: "Independent House · South Jersey Grid",
    origin: "A modular apparel, footwear, and artifact system grounded in the 3% rule: original detail, deliberate iteration, independent authorship.",
    statement: "Build from the block outward. Every garment is a study before it is a product.",
    colorways: [
      { name: "Sovereign Black", hex: "#111318", note: "Stealth base · hardwear study" },
      { name: "Architect White", hex: "#F5F4EF", note: "Drafting surface · gold restraint" },
      { name: "South Jersey Sage", hex: "#7E8F7C", note: "Workwear field tone" },
      { name: "Tri-State Gold", hex: "#D9A824", note: "Archive accent · signal color" },
    ],
    routes: [
      { label: "Fashion Empire", href: "/fashion-empire" },
      { label: "Concept Portfolio", href: "/fashion-portfolio" },
    ],
  },
  {
    id: "mein-core",
    name: "MEIN CORE",
    legalLabel: "Independent House · Compass System",
    origin: "A self-directed design language for compass geometry, utility silhouettes, language, and modular visual identity.",
    statement: "Keep the core original. A fusion is optional; the independent design language comes first.",
    colorways: [
      { name: "Core Black", hex: "#161616", note: "Textile field · gold linework" },
      { name: "Compass White", hex: "#F6F3EA", note: "High-contrast blueprint base" },
      { name: "Indigo Grid", hex: "#1B315E", note: "Navigation tone · utility canvas" },
      { name: "Ember Signal", hex: "#E45A22", note: "Emergency contrast accent" },
    ],
    routes: [
      { label: "MEIN Lookbook", href: "/mein" },
      { label: "Asset Review", href: "/admin/fashion-review" },
    ],
  },
  {
    id: "atlantis",
    name: "#XLVblocks ATLANTIS",
    legalLabel: "Original Seven-Set Mythic Study",
    origin: "A seven-set original color and material system that connects South Jersey anchors with Atlantis lore, underwater light, and orichalcum texture studies.",
    statement: "Seven independent sets. Each palette is a concept record, not an availability claim.",
    colorways: [
      { name: "Orichalcum", hex: "#B4492E", note: "Molten copper-red study" },
      { name: "Atlas Crown", hex: "#5B2B82", note: "Tyrian purple · imperial gold" },
      { name: "Poseidon Deep", hex: "#112D4E", note: "Abyss navy · bioluminescent trim" },
      { name: "Sinking Abyss", hex: "#40D6D0", note: "Aqua pearl · iridescent study" },
    ],
    routes: [
      { label: "Atlantis Seven-Set", href: "/atlantis-collection" },
      { label: "Build a Concept Look", href: "/fashion-portfolio" },
    ],
  },
];
