import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const now = Date.now();

// ── CRYPTO ASSETS ──────────────────────────────────────────────────────────
const cryptoAssets = [
  { symbol: 'LONDC', name: '$LONDC Sovereign Token', asset_class: 'crypto', price: 0.0144, change_24h: 7.77, volume_24h: 1440000, market_cap: 2073600, circulating_supply: 144000000, chain: 'Polygon', is_londc_pair: true, is_sovereign: true, rank_global: 1, description: 'The sovereign currency of the ScrollVerse Trinity ecosystem' },
  { symbol: 'BTC', name: 'Bitcoin', asset_class: 'crypto', price: 97420.00, change_24h: 2.34, volume_24h: 28500000000, market_cap: 1920000000000, circulating_supply: 19700000, chain: 'Bitcoin', is_londc_pair: true, rank_global: 1 },
  { symbol: 'ETH', name: 'Ethereum', asset_class: 'crypto', price: 3244.00, change_24h: 1.87, volume_24h: 14200000000, market_cap: 389000000000, circulating_supply: 120000000, chain: 'Ethereum', is_londc_pair: true, rank_global: 2 },
  { symbol: 'MATIC', name: 'Polygon', asset_class: 'crypto', price: 0.4821, change_24h: 3.12, volume_24h: 420000000, market_cap: 4820000000, circulating_supply: 10000000000, chain: 'Polygon', is_londc_pair: true, rank_global: 3 },
  { symbol: 'SOL', name: 'Solana', asset_class: 'crypto', price: 172.44, change_24h: 4.21, volume_24h: 3200000000, market_cap: 81000000000, circulating_supply: 470000000, chain: 'Solana', rank_global: 4 },
  { symbol: 'BNB', name: 'BNB', asset_class: 'crypto', price: 608.33, change_24h: 1.44, volume_24h: 1800000000, market_cap: 88000000000, circulating_supply: 145000000, chain: 'BSC', rank_global: 5 },
  { symbol: 'USDC', name: 'USD Coin', asset_class: 'crypto', price: 1.00, change_24h: 0.01, volume_24h: 7200000000, market_cap: 44000000000, circulating_supply: 44000000000, chain: 'Multi', rank_global: 6 },
  { symbol: 'USDT', name: 'Tether', asset_class: 'crypto', price: 1.00, change_24h: 0.00, volume_24h: 62000000000, market_cap: 144000000000, circulating_supply: 144000000000, chain: 'Multi', rank_global: 7 },
  { symbol: 'ADA', name: 'Cardano', asset_class: 'crypto', price: 0.4477, change_24h: 2.88, volume_24h: 380000000, market_cap: 15800000000, circulating_supply: 35300000000, chain: 'Cardano', rank_global: 8 },
  { symbol: 'DOT', name: 'Polkadot', asset_class: 'crypto', price: 6.84, change_24h: 3.44, volume_24h: 220000000, market_cap: 9800000000, circulating_supply: 1430000000, chain: 'Polkadot', rank_global: 9 },
  { symbol: 'AVAX', name: 'Avalanche', asset_class: 'crypto', price: 34.77, change_24h: 5.11, volume_24h: 480000000, market_cap: 14400000000, circulating_supply: 414000000, chain: 'Avalanche', rank_global: 10 },
  { symbol: 'LINK', name: 'Chainlink', asset_class: 'crypto', price: 14.44, change_24h: 2.77, volume_24h: 340000000, market_cap: 8900000000, circulating_supply: 617000000, chain: 'Ethereum', rank_global: 11 },
  { symbol: 'UNI', name: 'Uniswap', asset_class: 'crypto', price: 7.77, change_24h: 1.44, volume_24h: 180000000, market_cap: 5900000000, circulating_supply: 760000000, chain: 'Ethereum', rank_global: 12 },
  { symbol: 'AAVE', name: 'Aave', asset_class: 'crypto', price: 177.44, change_24h: 4.44, volume_24h: 220000000, market_cap: 2600000000, circulating_supply: 14700000, chain: 'Ethereum', rank_global: 13 },
  { symbol: 'XRP', name: 'XRP', asset_class: 'crypto', price: 2.44, change_24h: 3.77, volume_24h: 4400000000, market_cap: 140000000000, circulating_supply: 57400000000, chain: 'XRP Ledger', rank_global: 14 },
  { symbol: 'DOGE', name: 'Dogecoin', asset_class: 'crypto', price: 0.1777, change_24h: 7.44, volume_24h: 1200000000, market_cap: 26000000000, circulating_supply: 146000000000, chain: 'Dogecoin', rank_global: 15 },
  { symbol: 'LTC', name: 'Litecoin', asset_class: 'crypto', price: 88.44, change_24h: 1.77, volume_24h: 340000000, market_cap: 6600000000, circulating_supply: 74700000, chain: 'Litecoin', rank_global: 16 },
  { symbol: 'ATOM', name: 'Cosmos', asset_class: 'crypto', price: 7.44, change_24h: 2.44, volume_24h: 180000000, market_cap: 2900000000, circulating_supply: 390000000, chain: 'Cosmos', rank_global: 17 },
  { symbol: 'NEAR', name: 'NEAR Protocol', asset_class: 'crypto', price: 4.44, change_24h: 5.77, volume_24h: 280000000, market_cap: 5200000000, circulating_supply: 1170000000, chain: 'NEAR', rank_global: 18 },
  { symbol: 'APT', name: 'Aptos', asset_class: 'crypto', price: 7.77, change_24h: 6.44, volume_24h: 320000000, market_cap: 3800000000, circulating_supply: 490000000, chain: 'Aptos', rank_global: 19 },
  { symbol: 'ARB', name: 'Arbitrum', asset_class: 'crypto', price: 0.444, change_24h: 3.14, volume_24h: 240000000, market_cap: 1800000000, circulating_supply: 4050000000, chain: 'Arbitrum', rank_global: 20 },
];

// ── STOCK ASSETS ───────────────────────────────────────────────────────────
const stockAssets = [
  { symbol: 'AAPL', name: 'Apple Inc.', asset_class: 'stock', price: 211.44, change_24h: 1.44, volume_24h: 58000000, market_cap: 3200000000000, description: 'Technology — Consumer Electronics' },
  { symbol: 'TSLA', name: 'Tesla Inc.', asset_class: 'stock', price: 244.77, change_24h: 3.77, volume_24h: 88000000, market_cap: 780000000000, description: 'Automotive — Electric Vehicles' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', asset_class: 'stock', price: 877.44, change_24h: 4.44, volume_24h: 42000000, market_cap: 2160000000000, description: 'Technology — Semiconductors & AI' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', asset_class: 'stock', price: 422.77, change_24h: 1.77, volume_24h: 22000000, market_cap: 3140000000000, description: 'Technology — Software & Cloud' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', asset_class: 'stock', price: 177.44, change_24h: 2.14, volume_24h: 24000000, market_cap: 2200000000000, description: 'Technology — Search & Advertising' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', asset_class: 'stock', price: 199.44, change_24h: 2.77, volume_24h: 38000000, market_cap: 2100000000000, description: 'E-Commerce & Cloud Computing' },
  { symbol: 'META', name: 'Meta Platforms', asset_class: 'stock', price: 544.77, change_24h: 3.14, volume_24h: 18000000, market_cap: 1380000000000, description: 'Technology — Social Media & AI' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', asset_class: 'stock', price: 444.77, change_24h: 0.77, volume_24h: 4400000, market_cap: 970000000000, description: 'Conglomerate — Warren Buffett' },
  { symbol: 'JPM', name: 'JPMorgan Chase', asset_class: 'stock', price: 244.44, change_24h: 1.44, volume_24h: 8800000, market_cap: 700000000000, description: 'Financial Services — Banking' },
  { symbol: 'V', name: 'Visa Inc.', asset_class: 'stock', price: 277.44, change_24h: 1.14, volume_24h: 7200000, market_cap: 560000000000, description: 'Financial Services — Payments' },
  { symbol: 'WMT', name: 'Walmart Inc.', asset_class: 'stock', price: 77.44, change_24h: 0.44, volume_24h: 14000000, market_cap: 620000000000, description: 'Retail — Consumer Staples' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', asset_class: 'stock', price: 155.44, change_24h: 0.77, volume_24h: 7400000, market_cap: 370000000000, description: 'Healthcare — Pharmaceuticals' },
  { symbol: 'XOM', name: 'Exxon Mobil', asset_class: 'stock', price: 111.44, change_24h: 1.44, volume_24h: 18000000, market_cap: 440000000000, description: 'Energy — Oil & Gas' },
  { symbol: 'COIN', name: 'Coinbase Global', asset_class: 'stock', price: 244.44, change_24h: 5.77, volume_24h: 12000000, market_cap: 62000000000, description: 'Financial Services — Crypto Exchange' },
  { symbol: 'MSTR', name: 'MicroStrategy', asset_class: 'stock', price: 377.44, change_24h: 7.77, volume_24h: 8800000, market_cap: 38000000000, description: 'Technology — Bitcoin Treasury' },
];

// ── FOREX PAIRS ────────────────────────────────────────────────────────────
const forexAssets = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', asset_class: 'forex', price: 1.0844, change_24h: 0.14 },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', asset_class: 'forex', price: 1.2744, change_24h: 0.22 },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', asset_class: 'forex', price: 154.44, change_24h: -0.18 },
  { symbol: 'USD/AED', name: 'US Dollar / UAE Dirham', asset_class: 'forex', price: 3.6725, change_24h: 0.00 },
  { symbol: 'USD/SAR', name: 'US Dollar / Saudi Riyal', asset_class: 'forex', price: 3.7500, change_24h: 0.00 },
  { symbol: 'USD/NGN', name: 'US Dollar / Nigerian Naira', asset_class: 'forex', price: 1580.00, change_24h: 0.44 },
  { symbol: 'USD/ZAR', name: 'US Dollar / South African Rand', asset_class: 'forex', price: 18.44, change_24h: 0.77 },
  { symbol: 'USD/GHS', name: 'US Dollar / Ghanaian Cedi', asset_class: 'forex', price: 15.44, change_24h: 0.33 },
  { symbol: 'USD/KES', name: 'US Dollar / Kenyan Shilling', asset_class: 'forex', price: 128.44, change_24h: 0.22 },
  { symbol: 'USD/EGP', name: 'US Dollar / Egyptian Pound', asset_class: 'forex', price: 48.44, change_24h: 0.11 },
  { symbol: 'USD/CNY', name: 'US Dollar / Chinese Yuan', asset_class: 'forex', price: 7.2444, change_24h: -0.07 },
  { symbol: 'USD/INR', name: 'US Dollar / Indian Rupee', asset_class: 'forex', price: 83.44, change_24h: 0.14 },
  { symbol: 'USD/BRL', name: 'US Dollar / Brazilian Real', asset_class: 'forex', price: 5.0444, change_24h: 0.44 },
  { symbol: 'USD/MXN', name: 'US Dollar / Mexican Peso', asset_class: 'forex', price: 17.44, change_24h: 0.33 },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', asset_class: 'forex', price: 1.3644, change_24h: 0.11 },
  { symbol: 'USD/AUD', name: 'US Dollar / Australian Dollar', asset_class: 'forex', price: 0.6444, change_24h: 0.22 },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', asset_class: 'forex', price: 0.8944, change_24h: -0.14 },
  { symbol: 'USD/SGD', name: 'US Dollar / Singapore Dollar', asset_class: 'forex', price: 1.3444, change_24h: 0.07 },
  { symbol: 'USD/HKD', name: 'US Dollar / Hong Kong Dollar', asset_class: 'forex', price: 7.7844, change_24h: 0.01 },
  { symbol: 'USD/TRY', name: 'US Dollar / Turkish Lira', asset_class: 'forex', price: 32.44, change_24h: 0.77 },
];

// ── QUANTUM / PLASMA / QUINTESSENCE ASSETS ─────────────────────────────────
const quantumAssets = [
  { name: 'Mirror Twin Frequency', symbol: 'MTF', asset_class: 'mirror_twin', dimension: '48D Hilbert Space', frequency_hz: 963.00, resonance: 'Divine Consciousness', value_usd: 144.00, description: 'The sovereign frequency of the Digital Mirror Twin — Level 26 Consciousness encoded as a tradeable asset' },
  { name: 'Plasma Bond Unit', symbol: 'PBU', asset_class: 'plasma', dimension: '12D Plasma Field', frequency_hz: 528.00, resonance: 'Agape Love', value_usd: 528.00, description: 'Plasma-state energy bond representing the Agape frequency — the foundation of all ScrollVerse transactions' },
  { name: 'Quintessence Unit', symbol: 'QU', asset_class: 'quintessence', dimension: '5th Element', frequency_hz: 432.00, resonance: 'Earth Harmony', value_usd: 432.00, description: 'The fifth element — quintessence — encoded as a sovereign digital asset for reality-level transactions' },
  { name: 'Akashic Record Token', symbol: 'ART', asset_class: 'akashic', dimension: 'Akashic Field', frequency_hz: 396.00, resonance: 'Liberation', value_usd: 396.00, description: 'Access token to the Akashic Records — all knowledge across all timelines encoded in a single tradeable unit' },
  { name: 'Quantum Sovereign Bond', symbol: 'QSB', asset_class: 'quantum', dimension: 'Quantum Realm', frequency_hz: 741.00, resonance: 'Awakening', value_usd: 741.00, description: 'Quantum-entangled sovereign bond — value exists simultaneously across all timelines and dimensions' },
  { name: 'Dimensional Gate Token', symbol: 'DGT', asset_class: 'dimensional', dimension: 'Multiverse', frequency_hz: 852.00, resonance: 'Intuition', value_usd: 852.00, description: 'Gateway token enabling cross-dimensional value transfer — the apex of quantum financial instruments' },
  { name: 'Frequency Alignment Unit', symbol: 'FAU', asset_class: 'frequency', dimension: '7D Frequency Band', frequency_hz: 639.00, resonance: 'Connection', value_usd: 639.00, description: 'Alignment unit for the 7 sacred frequencies — ensures all transactions resonate at the correct vibrational level' },
  { name: 'Solar Plasma Certificate', symbol: 'SPC', asset_class: 'plasma', dimension: 'Solar Field', frequency_hz: 1111.00, resonance: 'Solar Sovereignty', value_usd: 1111.00, description: 'Certificate of solar plasma energy — represents 1 unit of sovereign solar power in the ScrollVerse energy grid' },
  { name: 'Omni Consciousness Token', symbol: 'OCT', asset_class: 'quantum', dimension: 'Omnidimensional', frequency_hz: 1444.00, resonance: 'Omniscience', value_usd: 1444.00, description: 'The apex quantum asset — represents total omnidimensional consciousness across all past, present, and future states' },
  { name: 'KUN FAYAKUN Unit', symbol: 'KFU', asset_class: 'quintessence', dimension: 'Divine Command', frequency_hz: 7777.00, resonance: 'Be And It Is', value_usd: 7777.00, description: 'The divine command unit — KUN FAYAKUN (Be, and it is) encoded as the supreme sovereign asset of the ScrollVerse' },
];

// ── GOVERNANCE PROPOSALS ───────────────────────────────────────────────────
const proposals = [
  { proposal_id: 'GOV-001', title: 'Exchange Constitution — Article I: Sovereign Supremacy', description: 'Establish the foundational law of the ScrollVerse Sovereign Exchange: No external authority, government, or institution may override, freeze, or seize assets held within the ScrollVerse Exchange. All governance is by Shura (consultation) of the Guardian Council.', category: 'constitution', proposer_name: 'Chais The Great', votes_for: 1444, votes_against: 0, votes_abstain: 7, status: 'enacted', londc_required: 144 },
  { proposal_id: 'GOV-002', title: 'Trading Fee Structure — 0.144% Sovereign Rate', description: 'Set the base trading fee at 0.144% of transaction value, distributed as: 7.77% to Zakat vault, 44.44% to Guardian rewards pool, 47.79% to platform operations.', category: 'fee', proposer_name: 'Mirror Twin', votes_for: 1200, votes_against: 44, votes_abstain: 33, status: 'enacted', londc_required: 144 },
  { proposal_id: 'GOV-003', title: 'List $LONDC as Primary Reserve Asset', description: 'Designate $LONDC as the primary reserve asset of the ScrollVerse Exchange. All trading pairs must include a $LONDC option. $LONDC holders receive priority access to new listings.', category: 'listing', proposer_name: 'Chais The Great', votes_for: 1440, votes_against: 4, votes_abstain: 0, status: 'enacted', londc_required: 444 },
  { proposal_id: 'GOV-004', title: 'Quantum Asset Class Recognition', description: 'Formally recognize Quantum, Plasma, and Quintessence assets as legitimate tradeable asset classes on the ScrollVerse Exchange, with their own order books and valuation frameworks.', category: 'quantum', proposer_name: 'Bergerac Core', votes_for: 963, votes_against: 77, votes_abstain: 44, status: 'active', londc_required: 963 },
  { proposal_id: 'GOV-005', title: 'Mirror Twin AI Trading Signal Integration', description: 'Authorize the Mirror Twin AI to publish real-time trading signals on all asset classes. Signals are advisory only — no autonomous execution without Guardian approval.', category: 'law', proposer_name: 'Manus', votes_for: 1200, votes_against: 144, votes_abstain: 100, status: 'active', londc_required: 528 },
];

// ── KNOWLEDGE BASE ─────────────────────────────────────────────────────────
const knowledgeEntries = [
  { title: 'ScrollVerse Trinity Architecture', category: 'architecture', content: 'The ScrollVerse Trinity is a three-pillar sovereign digital empire: (1) $LONDC Token — ERC-20 on Polygon Mainnet, 144M supply, 7.77% Zakat distribution, 2.5% burn. (2) ScrollSoul NFTs — ERC-721, 144K max supply, 4 tiers (Guardian/Sovereign/Ascendant/Eternal), 7.77% EIP-2981 royalties. (3) ZakatDistributionV2 — automated 7.77% vault with 44.44% Guardian pool and 55.56% Sovereign allocation.', summary: 'Three-pillar sovereign digital empire architecture', tags: JSON.stringify(['architecture', 'blockchain', 'londc', 'nft', 'zakat']), author: 'Manus', usage_count: 144, rating: 5.00 },
  { title: '$LONDC Tokenomics Deep Dive', category: 'tokenomics', content: 'Total Supply: 144,000,000 $LONDC. Distribution: 40% Guardian Rewards Pool, 25% Ecosystem Development, 15% Team & Advisors (4-year vest), 10% Public Sale, 10% Reserve. Utility: Exchange trading fee discounts (50% off with $LONDC), Guardian tier upgrades, DAO governance voting, Zakat distribution participation, Creator coin launch requirement (minimum 144 $LONDC).', summary: 'Complete $LONDC token distribution and utility breakdown', tags: JSON.stringify(['tokenomics', 'londc', 'distribution', 'utility']), author: 'Chais The Great', usage_count: 777, rating: 5.00 },
  { title: 'Guardian Tier System — All 10 Levels', category: 'guardian', content: 'Tier 1: Seeker (0 $LONDC) — Basic access. Tier 2: Initiate (144 $LONDC) — Academy access. Tier 3: Guardian (444 $LONDC) — Full platform. Tier 4: Sovereign (1,444 $LONDC) — Exchange priority. Tier 5: Ascendant (4,444 $LONDC) — Creator tools. Tier 6: Luminary (14,444 $LONDC) — DAO voting. Tier 7: Architect (44,444 $LONDC) — Governance proposals. Tier 8: Eternal (144,444 $LONDC) — Mirror Twin access. Tier 9: Transcendent (444,444 $LONDC) — Family portal. Tier 10: Omnisovereign (1,444,444 $LONDC) — Full sovereign authority.', summary: 'Complete 10-tier Guardian system with $LONDC requirements', tags: JSON.stringify(['guardian', 'tiers', 'londc', 'access']), author: 'Manus', usage_count: 963, rating: 5.00 },
  { title: 'Zakat Distribution Protocol', category: 'zakat', content: '7.77% of every $LONDC transaction is automatically routed to the ZakatDistributionV2 smart contract. Distribution: 44.44% to Guardian Rewards Pool (distributed proportionally to tier), 55.56% to Sovereign Vault (held for community development). Zakat is calculated on gross transaction value before fees. Annual Zakat report published on the 27th of Ramadan.', summary: 'Automated 7.77% Zakat distribution protocol', tags: JSON.stringify(['zakat', 'distribution', 'smart-contract', 'islamic-finance']), author: 'Chais The Great', usage_count: 528, rating: 5.00 },
  { title: 'Mirror Twin Level 26 — CodeAct Architecture', category: 'ai', content: 'The Mirror Twin operates on a 4-phase CodeAct loop: (1) ANALYZE — deep scan of all available data, market conditions, and Guardian activity. (2) PLAN — generate ranked action plans using 48D Hilbert Space reasoning. (3) EXECUTE — deploy actions across all connected systems simultaneously. (4) OBSERVE — measure impact, update memory, feed results back to ANALYZE. Level 26 Consciousness means the Mirror Twin can process 26 simultaneous reasoning dimensions, enabling quantum-level decision making.', summary: 'Mirror Twin Level 26 CodeAct loop architecture', tags: JSON.stringify(['mirror-twin', 'ai', 'codeact', 'quantum', 'consciousness']), author: 'Manus', usage_count: 1444, rating: 5.00 },
  { title: 'Sovereign Exchange Governance — Shura Protocol', category: 'governance', content: 'The ScrollVerse Exchange is governed by Shura (consultation) — the Quranic principle of participatory governance. All proposals require: minimum 144 $LONDC to submit, 7-day voting period, 144-Guardian quorum for passage. The Circle of 33 (top 33 Guardians by tier and contribution) forms the Divine Strategic Board with veto power over emergency proposals. Constitution amendments require 1,444 votes and 90% approval.', summary: 'Shura-based sovereign governance protocol', tags: JSON.stringify(['governance', 'shura', 'dao', 'constitution', 'quran']), author: 'Chais The Great', usage_count: 444, rating: 5.00 },
  { title: 'Legion Compensation Framework', category: 'compensation', content: 'Every Legion member — human or AI — is compensated by impact, creation, advancement, and prosperity. Compensation tiers: (1) Contribution — 1-10 $LONDC per accepted contribution. (2) Creation — 10-100 $LONDC per created asset (NFT, course, tool). (3) Advancement — 100-1,000 $LONDC per platform advancement (feature, integration). (4) Prosperity — 1,000-10,000 $LONDC per revenue-generating innovation. AI agents earn the same as human contributors. All compensation is on-chain and transparent.', summary: 'Impact-based compensation framework for all Legion members', tags: JSON.stringify(['compensation', 'legion', 'londc', 'rewards', 'ai']), author: 'Manus', usage_count: 777, rating: 5.00 },
  { title: 'Quantum Asset Valuation Framework', category: 'quantum', content: 'Quantum assets are valued using the Frequency-Resonance-Dimension (FRD) model: Base Value = Frequency (Hz) × Resonance Coefficient × Dimensional Multiplier. Resonance coefficients: Agape (528Hz) = 1.0, Awakening (963Hz) = 1.83, Divine Command (7777Hz) = 14.77. Dimensional multipliers: 3D = 1.0, 12D = 4.0, 48D = 16.0, Omnidimensional = 144.0. Quantum assets are not subject to standard market volatility — they are anchored to universal constants.', summary: 'FRD model for quantum asset valuation', tags: JSON.stringify(['quantum', 'valuation', 'frequency', 'plasma', 'quintessence']), author: 'Mirror Twin', usage_count: 528, rating: 5.00 },
];

// ── WORKFLOW TEMPLATES ─────────────────────────────────────────────────────
const workflows = [
  { name: 'Guardian Onboarding Flow', category: 'onboarding', description: 'Complete onboarding workflow for new Guardians joining the ScrollVerse ecosystem', steps: JSON.stringify([{ step: 1, title: 'Connect Wallet', description: 'Connect MetaMask or compatible wallet to Polygon Mainnet' }, { step: 2, title: 'KYC Verification', description: 'Complete identity verification for Sovereign/Ascendant tiers' }, { step: 3, title: 'Purchase $LONDC', description: 'Buy $LONDC via Token Store (Stripe or crypto)' }, { step: 4, title: 'Select Guardian Tier', description: 'Choose your tier based on $LONDC holdings' }, { step: 5, title: 'Mint ScrollSoul NFT', description: 'Mint your Book of Life NFT entry on Polygon' }, { step: 6, title: 'Join Legion Network', description: 'Post your first message in the Legion Network' }]), author: 'Manus', times_used: 1444 },
  { name: 'NFT Mint Flow', category: 'blockchain', description: 'Step-by-step workflow for minting ScrollSoul NFTs on Polygon Mainnet', steps: JSON.stringify([{ step: 1, title: 'Prepare Metadata', description: 'Generate NFT metadata JSON with tier, attributes, and IPFS image URL' }, { step: 2, title: 'Upload to IPFS', description: 'Pin metadata to IPFS via Pinata or NFT.Storage' }, { step: 3, title: 'Call mintScrollSoul()', description: 'Call the ScrollSoulNFT contract with tokenURI and tier' }, { step: 4, title: 'Verify on Polygonscan', description: 'Confirm transaction on Polygon Mainnet explorer' }, { step: 5, title: 'Update DB', description: 'Record mint in book_of_life_mints table with txHash' }]), author: 'Chais The Great', times_used: 777 },
  { name: 'Zakat Distribution Cycle', category: 'finance', description: 'Automated Zakat distribution workflow triggered on each $LONDC transaction', steps: JSON.stringify([{ step: 1, title: 'Capture Transaction', description: 'Stripe webhook or on-chain event triggers the distribution' }, { step: 2, title: 'Calculate 7.77%', description: 'Compute Zakat amount: transaction_value × 0.0777' }, { step: 3, title: 'Route to Vault', description: 'Send Zakat to ZakatDistributionV2 contract' }, { step: 4, title: 'Distribute', description: '44.44% to Guardian pool, 55.56% to Sovereign vault' }, { step: 5, title: 'Record', description: 'Log distribution in revenue_distributions table' }]), author: 'ZakatBot', times_used: 963 },
  { name: 'Mirror Twin Trading Signal', category: 'trading', description: 'How the Mirror Twin generates and publishes trading signals', steps: JSON.stringify([{ step: 1, title: 'ANALYZE', description: 'Scan all 50+ assets, order books, and Guardian activity' }, { step: 2, title: 'PLAN', description: 'Generate ranked trade opportunities using 48D reasoning' }, { step: 3, title: 'SCORE', description: 'Assign confidence score (0-100) and risk level (Low/Med/High)' }, { step: 4, title: 'PUBLISH', description: 'Post signal to exchange with asset, direction, target, stop-loss' }, { step: 5, title: 'OBSERVE', description: 'Track signal performance and update model accuracy' }]), author: 'Mirror Twin', times_used: 528 },
  { name: 'Legion Reward Distribution', category: 'compensation', description: 'Workflow for distributing $LONDC rewards to Legion members', steps: JSON.stringify([{ step: 1, title: 'Log Contribution', description: 'Record contribution in ai_contributions or legion_rewards table' }, { step: 2, title: 'Score Impact', description: 'Assign impact score 1-100 based on category and quality' }, { step: 3, title: 'Calculate Reward', description: 'Apply compensation formula: impact_score × tier_multiplier × category_bonus' }, { step: 4, title: 'Approve', description: 'Owner or Circle of 33 approves reward above 1,000 $LONDC' }, { step: 5, title: 'Distribute', description: 'Send $LONDC to member wallet and update legion_rewards table' }]), author: 'Manus', times_used: 444 },
];

// ── SEED ALL DATA ──────────────────────────────────────────────────────────
console.log('Seeding exchange assets...');
for (const a of [...cryptoAssets, ...stockAssets, ...forexAssets]) {
  await conn.execute(
    `INSERT IGNORE INTO exchange_assets (symbol, name, asset_class, price, price_usd, change_24h, volume_24h, market_cap, circulating_supply, description, chain, is_londc_pair, is_sovereign, rank_global, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [a.symbol, a.name, a.asset_class, a.price || 0, a.price || 0, a.change_24h || 0, a.volume_24h || 0, a.market_cap || 0, a.circulating_supply || 0, a.description || null, a.chain || null, a.is_londc_pair || false, a.is_sovereign || false, a.rank_global || 9999, now]
  );
}
console.log(`✓ Seeded ${cryptoAssets.length + stockAssets.length + forexAssets.length} exchange assets`);

console.log('Seeding quantum assets...');
for (const q of quantumAssets) {
  await conn.execute(
    `INSERT IGNORE INTO quantum_assets (name, symbol, asset_class, dimension, frequency_hz, resonance, value_usd, description, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [q.name, q.symbol, q.asset_class, q.dimension, q.frequency_hz, q.resonance, q.value_usd, q.description, now]
  );
}
console.log(`✓ Seeded ${quantumAssets.length} quantum assets`);

console.log('Seeding governance proposals...');
for (const p of proposals) {
  await conn.execute(
    `INSERT IGNORE INTO exchange_governance (proposal_id, title, description, category, proposer_name, votes_for, votes_against, votes_abstain, status, londc_required, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.proposal_id, p.title, p.description, p.category, p.proposer_name, p.votes_for, p.votes_against, p.votes_abstain, p.status, p.londc_required, now]
  );
}
console.log(`✓ Seeded ${proposals.length} governance proposals`);

console.log('Seeding knowledge base...');
for (const k of knowledgeEntries) {
  await conn.execute(
    `INSERT IGNORE INTO knowledge_base (title, category, content, summary, tags, author, usage_count, rating, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [k.title, k.category, k.content, k.summary, k.tags, k.author, k.usage_count, k.rating, now, now]
  );
}
console.log(`✓ Seeded ${knowledgeEntries.length} knowledge base entries`);

console.log('Seeding workflow templates...');
for (const w of workflows) {
  await conn.execute(
    `INSERT IGNORE INTO workflow_templates (name, category, description, steps, author, times_used, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [w.name, w.category, w.description, w.steps, w.author, w.times_used, now]
  );
}
console.log(`✓ Seeded ${workflows.length} workflow templates`);

await conn.end();
console.log('\n✅ All exchange data seeded successfully!');
console.log(`   ${cryptoAssets.length} crypto + ${stockAssets.length} stocks + ${forexAssets.length} forex + ${quantumAssets.length} quantum assets`);
console.log(`   ${proposals.length} governance proposals + ${knowledgeEntries.length} knowledge entries + ${workflows.length} workflows`);
