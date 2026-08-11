export type AtlantisCategory = "Outerwear" | "Tailoring" | "Utility" | "Footwear" | "Pants";
export type CatalogStatus = "SOURCE_RECORDED" | "SUPPLIER_VERIFICATION_PENDING" | "ASSET_APPROVAL_PENDING" | "CHECKOUT_DISABLED";

export type AtlantisCatalogItem = {
  id: string;
  setNumber: number;
  title: string;
  category: AtlantisCategory;
  frequency: "444Hz" | "528Hz" | "741Hz" | "963Hz";
  regionalAnchor: string;
  color: string;
  manufacturerReference: string;
  productDescription: string;
  fabricSpecification: string;
  hardwareSpecification: string;
  decorationSpecification: string;
  technicalHighlights: string[];
  catalogStatus: CatalogStatus[];
  approvedImageUrl?: string;
  imageAlt?: string;
  assetStatus: "AWAITING_APPROVED_IMAGE" | "APPROVED_IMAGE_ATTACHED";
  commerceStatus: "CHECKOUT_DISABLED" | "READY_FOR_CONFIGURATION";
  sourceLabel: "USER-SUPPLIED TECHNICAL PACK";
};

/**
 * Source: user-supplied Phase 95 technical-pack brief. Manufacturer names are
 * references only, not verified supplier records. An approved image URL and a
 * verified vendor ID are deliberately absent until supplied by the account owner.
 */
export const ATLANTIS_CATALOG: AtlantisCatalogItem[] = [
  {
    id: "atl-01",
    setNumber: 1,
    title: "Poseidon Heavy Tech Trench Layer",
    category: "Outerwear",
    frequency: "528Hz",
    regionalAnchor: "08232 · Pleasantville",
    color: "#C75C35",
    manufacturerReference: "Vanguard Textile Matrix Group",
    productDescription: "485 GSM heavy trench layer concept with regional coordinate anchoring.",
    fabricSpecification: "485 GSM ultra-heavy custom double-faced cotton loopback.",
    hardwareSpecification: "Matte gunmetal custom Riri-style zippers and laser-etched internal coordinate anchors (08232 | 08330 | 08360 | 08401).",
    decorationSpecification: "High-rise 3D puff-ink typography border layered over continuous embroidery paths.",
    technicalHighlights: ["485 GSM loopback", "Coordinate tape", "Gunmetal zipper array"],
    catalogStatus: ["SOURCE_RECORDED", "SUPPLIER_VERIFICATION_PENDING", "ASSET_APPROVAL_PENDING", "CHECKOUT_DISABLED"],
    assetStatus: "AWAITING_APPROVED_IMAGE",
    commerceStatus: "CHECKOUT_DISABLED",
    sourceLabel: "USER-SUPPLIED TECHNICAL PACK",
  },
  {
    id: "atl-02",
    setNumber: 2,
    title: "Neptune Modular Combat Shell",
    category: "Outerwear",
    frequency: "741Hz",
    regionalAnchor: "08330 · Mays Landing",
    color: "#E0F3FF",
    manufacturerReference: "Apex Sailing Defense Core",
    productDescription: "Modular hooded weather shell concept with reflective ventilation geometry.",
    fabricSpecification: "3-layer bonded technical waterproof denim membrane; claimed target 28K/28K waterproof/breathability rating pending supplier test documentation.",
    hardwareSpecification: "Detachable weather-shield hood with gold-tone fastener-rivet concept.",
    decorationSpecification: "Laser-fused contrast alignments with micro-perforated 3M-style reflective ventilation grids.",
    technicalHighlights: ["3-layer membrane", "Modular hood", "Reflective vent grid"],
    catalogStatus: ["SOURCE_RECORDED", "SUPPLIER_VERIFICATION_PENDING", "ASSET_APPROVAL_PENDING", "CHECKOUT_DISABLED"],
    assetStatus: "AWAITING_APPROVED_IMAGE",
    commerceStatus: "CHECKOUT_DISABLED",
    sourceLabel: "USER-SUPPLIED TECHNICAL PACK",
  },
  {
    id: "atl-03",
    setNumber: 3,
    title: "Trident Utility Sherpa Core Vest",
    category: "Utility",
    frequency: "963Hz",
    regionalAnchor: "08360 · Vineland",
    color: "#A77F2B",
    manufacturerReference: "Sovereign Assembly Lab",
    productDescription: "Utility vest concept with temperature-regulation lining and modular attachment points.",
    fabricSpecification: "High-tenacity ballistic-weave concept with deep-white interior sherpa temperature-regulation panels.",
    hardwareSpecification: "Dual quick-release chest buckles and modular lanyard D-rings.",
    decorationSpecification: "Technical webbing channels and restrained coordinate labels.",
    technicalHighlights: ["Ballistic weave concept", "Quick-release buckles", "Sherpa lining"],
    catalogStatus: ["SOURCE_RECORDED", "SUPPLIER_VERIFICATION_PENDING", "ASSET_APPROVAL_PENDING", "CHECKOUT_DISABLED"],
    assetStatus: "AWAITING_APPROVED_IMAGE",
    commerceStatus: "CHECKOUT_DISABLED",
    sourceLabel: "USER-SUPPLIED TECHNICAL PACK",
  },
  {
    id: "atl-04",
    setNumber: 4,
    title: "Mariana Deep Indigo Tailored Blazer",
    category: "Tailoring",
    frequency: "444Hz",
    regionalAnchor: "08401 · Atlantic City",
    color: "#1B315F",
    manufacturerReference: "Heritage Tailoring Division",
    productDescription: "Double-breasted tailored denim blazer concept with a South Jersey blueprint lining.",
    fabricSpecification: "Raw indigo denim shell structured with interior silk lining carrying historical South Jersey blueprint patterns.",
    hardwareSpecification: "Deep-etched, marble-brownstone structural button concept.",
    decorationSpecification: "Low-contrast liner print and tonal exterior construction.",
    technicalHighlights: ["Raw indigo shell", "Blueprint lining", "Structural buttons"],
    catalogStatus: ["SOURCE_RECORDED", "SUPPLIER_VERIFICATION_PENDING", "ASSET_APPROVAL_PENDING", "CHECKOUT_DISABLED"],
    assetStatus: "AWAITING_APPROVED_IMAGE",
    commerceStatus: "CHECKOUT_DISABLED",
    sourceLabel: "USER-SUPPLIED TECHNICAL PACK",
  },
  {
    id: "atl-05",
    setNumber: 5,
    title: "Oceanic Axis Quad-Zip Cargo",
    category: "Pants",
    frequency: "528Hz",
    regionalAnchor: "08232 · Pleasantville",
    color: "#3E6B60",
    manufacturerReference: "Vanguard Textile Matrix Group",
    productDescription: "Articulated cargo concept with lateral ventilation and adjustable ankle compression.",
    fabricSpecification: "Tear-resistant canvas face panels double-reinforced across high-friction joints.",
    hardwareSpecification: "Quad lateral ventilation zipper channels with dual adjustable ankle compression straps.",
    decorationSpecification: "Reinforced panel mapping and minimal tonal marks.",
    technicalHighlights: ["Reinforced canvas", "Quad ventilation", "Compression straps"],
    catalogStatus: ["SOURCE_RECORDED", "SUPPLIER_VERIFICATION_PENDING", "ASSET_APPROVAL_PENDING", "CHECKOUT_DISABLED"],
    assetStatus: "AWAITING_APPROVED_IMAGE",
    commerceStatus: "CHECKOUT_DISABLED",
    sourceLabel: "USER-SUPPLIED TECHNICAL PACK",
  },
  {
    id: "atl-06",
    setNumber: 6,
    title: "Abyssal Trilogy Waterproof Boot",
    category: "Footwear",
    frequency: "963Hz",
    regionalAnchor: "08360 · Vineland",
    color: "#1A1A1A",
    manufacturerReference: "Industrial Footwear Chassis Corp",
    productDescription: "Waterproof boot concept with a dual-chassis lug platform and QR-ready heel emblem.",
    fabricSpecification: "Premium oil-slick waterproof nubuck leather chassis concept bonded to a vulcanized rubber lug platform.",
    hardwareSpecification: "Woven heel-pull cords with holographic QR-tracking emblem placeholder.",
    decorationSpecification: "Low-gloss tonal marks and functional heel pull.",
    technicalHighlights: ["Waterproof nubuck concept", "Vulcanized lug platform", "QR asset placeholder"],
    catalogStatus: ["SOURCE_RECORDED", "SUPPLIER_VERIFICATION_PENDING", "ASSET_APPROVAL_PENDING", "CHECKOUT_DISABLED"],
    assetStatus: "AWAITING_APPROVED_IMAGE",
    commerceStatus: "CHECKOUT_DISABLED",
    sourceLabel: "USER-SUPPLIED TECHNICAL PACK",
  },
  {
    id: "atl-07",
    setNumber: 7,
    title: "Metatron Fibonacci Low-Chassis",
    category: "Footwear",
    frequency: "444Hz",
    regionalAnchor: "08401 · Atlantic City",
    color: "#D4AF37",
    manufacturerReference: "Industrial Footwear Chassis Corp",
    productDescription: "Original low-top footwear concept with a crystalline gold Fibonacci-ribbon outsole detail. The finished design must avoid third-party trade dress and marks.",
    fabricSpecification: "Compact-grain industrial calfskin leather concept with micro-etched technical-mesh accents.",
    hardwareSpecification: "Clear translucent outsole compound concept housing an internal gold carbon-ribbon curve.",
    decorationSpecification: "Fibonacci geometry positioning, subject to manufacturability and intellectual-property review.",
    technicalHighlights: ["Calfskin concept", "Technical mesh", "Fibonacci outsole detail"],
    catalogStatus: ["SOURCE_RECORDED", "SUPPLIER_VERIFICATION_PENDING", "ASSET_APPROVAL_PENDING", "CHECKOUT_DISABLED"],
    assetStatus: "AWAITING_APPROVED_IMAGE",
    commerceStatus: "CHECKOUT_DISABLED",
    sourceLabel: "USER-SUPPLIED TECHNICAL PACK",
  },
];

export const ATLANTIS_FILTERS = {
  categories: ["All", "Outerwear", "Tailoring", "Utility", "Footwear", "Pants"] as const,
  frequencies: ["All", "444Hz", "528Hz", "741Hz", "963Hz"] as const,
  regions: ["All", "08232 · Pleasantville", "08330 · Mays Landing", "08360 · Vineland", "08401 · Atlantic City"] as const,
  assetStatuses: ["All", "AWAITING_APPROVED_IMAGE", "APPROVED_IMAGE_ATTACHED"] as const,
  commerceStatuses: ["All", "CHECKOUT_DISABLED", "READY_FOR_CONFIGURATION"] as const,
};
