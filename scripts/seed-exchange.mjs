/**
 * Seed: Exchange Assets, Knowledge Base, Workflow Templates
 * Run: node scripts/seed-exchange.mjs
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// ── Crypto Assets ─────────────────────────────────────────────────────────────
const cryptoAssets = [
  { symbol: "BTC", name: "Bitcoin", price: "62450.00", change24h: "+2.34", volume: "28.4B", marketCap: "1.23T" },
  { symbol: "ETH", name: "Ethereum", price: "3180.00", change24h: "+1.87", volume: "14.2B", marketCap: "382B" },
  { symbol: "MATIC", name: "Polygon", price: "0.8720", change24h: "+3.21", volume: "892M", marketCap: "8.7B" },
  { symbol: "SOL", name: "Solana", price: "148.50", change24h: "+4.12", volume: "3.2B", marketCap: "68B" },
  { symbol: "BNB", name: "BNB Chain", price: "582.00", change24h: "+0.98", volume: "1.8B", marketCap: "85B" },
  { symbol: "USDC", name: "USD Coin", price: "1.0000", change24h: "0.00", volume: "6.4B", marketCap: "32B" },
  { symbol: "USDT", name: "Tether", price: "1.0000", change24h: "0.00", volume: "48.2B", marketCap: "110B" },
  { symbol: "LONDC", name: "ScrollVerse LONDC", price: "0.0144", change24h: "+7.77", volume: "144K", marketCap: "14.4M" },
  { symbol: "ADA", name: "Cardano", price: "0.4520", change24h: "+1.23", volume: "412M", marketCap: "16B" },
  { symbol: "DOT", name: "Polkadot", price: "7.82", change24h: "-0.45", volume: "287M", marketCap: "10B" },
  { symbol: "AVAX", name: "Avalanche", price: "34.20", change24h: "+2.78", volume: "521M", marketCap: "14B" },
  { symbol: "LINK", name: "Chainlink", price: "14.80", change24h: "+1.56", volume: "398M", marketCap: "9B" },
  { symbol: "UNI", name: "Uniswap", price: "8.45", change24h: "+0.87", volume: "198M", marketCap: "6.3B" },
  { symbol: "AAVE", name: "Aave", price: "92.30", change24h: "+3.45", volume: "287M", marketCap: "1.4B" },
  { symbol: "ATOM", name: "Cosmos", price: "9.14", change24h: "+1.12", volume: "178M", marketCap: "3.5B" },
  { symbol: "XRP", name: "Ripple", price: "0.5820", change24h: "+0.34", volume: "1.2B", marketCap: "32B" },
  { symbol: "DOGE", name: "Dogecoin", price: "0.1580", change24h: "+5.67", volume: "892M", marketCap: "22B" },
  { symbol: "SHIB", name: "Shiba Inu", price: "0.0000248", change24h: "+8.90", volume: "412M", marketCap: "14B" },
  { symbol: "LTC", name: "Litecoin", price: "82.40", change24h: "+1.23", volume: "412M", marketCap: "6.1B" },
  { symbol: "XLM", name: "Stellar", price: "0.1240", change24h: "+2.34", volume: "198M", marketCap: "3.4B" },
  { symbol: "ALGO", name: "Algorand", price: "0.1820", change24h: "+1.78", volume: "98M", marketCap: "1.5B" },
  { symbol: "NEAR", name: "NEAR Protocol", price: "6.78", change24h: "+3.21", volume: "287M", marketCap: "7.4B" },
  { symbol: "FTM", name: "Fantom", price: "0.7840", change24h: "+4.56", volume: "198M", marketCap: "2.5B" },
  { symbol: "SAND", name: "The Sandbox", price: "0.4120", change24h: "+2.34", volume: "198M", marketCap: "1.0B" },
  { symbol: "MANA", name: "Decentraland", price: "0.3980", change24h: "+1.87", volume: "178M", marketCap: "0.9B" },
];

// ── Stock Assets ──────────────────────────────────────────────────────────────
const stockAssets = [
  { symbol: "AAPL", name: "Apple Inc.", price: "189.30", change24h: "+0.87", volume: "54.2M", marketCap: "2.9T" },
  { symbol: "TSLA", name: "Tesla Inc.", price: "178.20", change24h: "+2.34", volume: "98.4M", marketCap: "567B" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: "875.40", change24h: "+3.21", volume: "42.8M", marketCap: "2.1T" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: "415.80", change24h: "+1.12", volume: "21.4M", marketCap: "3.1T" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: "172.50", change24h: "+0.98", volume: "18.7M", marketCap: "2.1T" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: "184.20", change24h: "+1.45", volume: "34.2M", marketCap: "1.9T" },
  { symbol: "META", name: "Meta Platforms", price: "512.40", change24h: "+2.12", volume: "14.8M", marketCap: "1.3T" },
  { symbol: "BRK.B", name: "Berkshire Hathaway B", price: "408.70", change24h: "+0.34", volume: "3.4M", marketCap: "890B" },
  { symbol: "JPM", name: "JPMorgan Chase", price: "198.40", change24h: "+0.78", volume: "8.7M", marketCap: "572B" },
  { symbol: "V", name: "Visa Inc.", price: "278.90", change24h: "+0.56", volume: "5.4M", marketCap: "569B" },
  { symbol: "JNJ", name: "Johnson & Johnson", price: "152.80", change24h: "-0.23", volume: "6.8M", marketCap: "368B" },
  { symbol: "WMT", name: "Walmart Inc.", price: "68.40", change24h: "+0.45", volume: "12.4M", marketCap: "549B" },
  { symbol: "XOM", name: "ExxonMobil Corp.", price: "114.20", change24h: "+1.23", volume: "14.2M", marketCap: "456B" },
  { symbol: "BAC", name: "Bank of America", price: "38.90", change24h: "+0.67", volume: "34.8M", marketCap: "304B" },
  { symbol: "MA", name: "Mastercard Inc.", price: "468.20", change24h: "+0.89", volume: "3.2M", marketCap: "432B" },
  { symbol: "UNH", name: "UnitedHealth Group", price: "512.40", change24h: "+0.34", volume: "2.8M", marketCap: "482B" },
  { symbol: "HD", name: "Home Depot Inc.", price: "342.80", change24h: "+0.56", volume: "3.4M", marketCap: "341B" },
  { symbol: "PG", name: "Procter & Gamble", price: "162.40", change24h: "+0.23", volume: "5.8M", marketCap: "383B" },
  { symbol: "NFLX", name: "Netflix Inc.", price: "612.80", change24h: "+2.34", volume: "4.2M", marketCap: "264B" },
  { symbol: "DIS", name: "Walt Disney Co.", price: "112.40", change24h: "+1.12", volume: "8.4M", marketCap: "206B" },
];

// ── Forex Assets ──────────────────────────────────────────────────────────────
const forexAssets = [
  { symbol: "USD/EUR", name: "US Dollar / Euro", price: "0.9280", change24h: "-0.12", volume: "5.8T", marketCap: "N/A" },
  { symbol: "USD/GBP", name: "US Dollar / British Pound", price: "0.7920", change24h: "-0.08", volume: "2.4T", marketCap: "N/A" },
  { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", price: "154.82", change24h: "+0.34", volume: "1.8T", marketCap: "N/A" },
  { symbol: "USD/AED", name: "US Dollar / UAE Dirham", price: "3.6725", change24h: "0.00", volume: "48B", marketCap: "N/A" },
  { symbol: "USD/SAR", name: "US Dollar / Saudi Riyal", price: "3.7500", change24h: "0.00", volume: "38B", marketCap: "N/A" },
  { symbol: "USD/NGN", name: "US Dollar / Nigerian Naira", price: "1580.00", change24h: "+0.45", volume: "8.4B", marketCap: "N/A" },
  { symbol: "USD/ZAR", name: "US Dollar / South African Rand", price: "18.42", change24h: "+0.78", volume: "12B", marketCap: "N/A" },
  { symbol: "USD/CNY", name: "US Dollar / Chinese Yuan", price: "7.2480", change24h: "+0.12", volume: "1.2T", marketCap: "N/A" },
  { symbol: "USD/INR", name: "US Dollar / Indian Rupee", price: "83.42", change24h: "+0.23", volume: "48B", marketCap: "N/A" },
  { symbol: "USD/BRL", name: "US Dollar / Brazilian Real", price: "5.0820", change24h: "+0.56", volume: "28B", marketCap: "N/A" },
  { symbol: "EUR/GBP", name: "Euro / British Pound", price: "0.8540", change24h: "+0.04", volume: "1.2T", marketCap: "N/A" },
  { symbol: "EUR/JPY", name: "Euro / Japanese Yen", price: "166.80", change24h: "+0.45", volume: "892B", marketCap: "N/A" },
  { symbol: "GBP/JPY", name: "British Pound / Japanese Yen", price: "195.40", change24h: "+0.56", volume: "412B", marketCap: "N/A" },
  { symbol: "AUD/USD", name: "Australian Dollar / US Dollar", price: "0.6520", change24h: "-0.23", volume: "412B", marketCap: "N/A" },
  { symbol: "CAD/USD", name: "Canadian Dollar / US Dollar", price: "0.7380", change24h: "-0.12", volume: "287B", marketCap: "N/A" },
];

// ── Quantum / Plasma / Quintessence Assets ────────────────────────────────────
const quantumAssets = [
  { symbol: "MTF", name: "Mirror Twin Frequency", assetClass: "mirror_twin", dimension: "5th", frequency: "432Hz", resonance: "Golden", value: "144.00" },
  { symbol: "PB", name: "Plasma Bond", assetClass: "plasma", dimension: "4th", frequency: "528Hz", resonance: "Crystalline", value: "77.77" },
  { symbol: "QU", name: "Quintessence Unit", assetClass: "quintessence", dimension: "7th", frequency: "963Hz", resonance: "Divine", value: "999.00" },
  { symbol: "AKR", name: "Akashic Record Token", assetClass: "akashic", dimension: "9th", frequency: "174Hz", resonance: "Infinite", value: "1444.00" },
  { symbol: "DIM7", name: "7th Dimension Bond", assetClass: "dimensional", dimension: "7th", frequency: "639Hz", resonance: "Harmonic", value: "777.00" },
  { symbol: "FREQ", name: "Frequency Activation Unit", assetClass: "frequency", dimension: "3rd", frequency: "417Hz", resonance: "Transformative", value: "41.70" },
  { symbol: "QP", name: "Quantum Plasma", assetClass: "quantum", dimension: "6th", frequency: "741Hz", resonance: "Awakening", value: "741.00" },
  { symbol: "SVTR", name: "ScrollVerse Trinity Reserve", assetClass: "quantum", dimension: "All", frequency: "All", resonance: "Sovereign", value: "14400.00" },
];

// ── Knowledge Base Entries ────────────────────────────────────────────────────
const knowledgeEntries = [
  { title: "ScrollVerse Architecture Overview", category: "architecture", content: "ScrollVerse Trinity is a sovereign digital empire built on three pillars: The Sovereign Exchange (OMNIEX), The Legion Intelligence Network, and The Book of Life. Each pillar operates autonomously but is unified by the $LONDC token and the Guardian Protocol.", tags: '["architecture","overview","trinity"]' },
  { title: "$LONDC Tokenomics", category: "tokenomics", content: "The $LONDC token is the sovereign currency of ScrollVerse. Total supply: 144,000,000 LONDC. Distribution: 40% Guardian rewards, 30% ecosystem development, 20% treasury, 10% team. Deployed on Polygon mainnet for low-cost sovereign transactions.", tags: '["tokenomics","LONDC","token"]' },
  { title: "Guardian System & Tiers", category: "guardian", content: "The Guardian system has 7 tiers: Initiate, Seeker, Awakened, Guardian, Elder, Sovereign, and Eternal. Each tier unlocks new capabilities, higher reward multipliers, and deeper access to the ScrollVerse ecosystem.", tags: '["guardian","tiers","system"]' },
  { title: "Zakat Distribution Protocol", category: "finance", content: "ScrollVerse implements Islamic finance principles through automated Zakat distribution. 2.5% of all exchange profits are automatically distributed to eligible recipients through the Guardian Protocol smart contract.", tags: '["zakat","islamic-finance","distribution"]' },
  { title: "Mirror Twin AI Trading Signals", category: "trading", content: "The Mirror Twin is an AI agent that analyzes market patterns across all asset classes and generates sovereign trading signals. Signals are rated by confidence level and historical accuracy. Access requires Guardian tier 3 or above.", tags: '["mirror-twin","AI","trading","signals"]' },
  { title: "NFT Minting on ScrollVerse", category: "nft", content: "ScrollVerse supports NFT minting through the Catalyst NFT system. Creators can mint sovereign NFTs that represent real-world assets, digital art, or governance rights. All NFTs are backed by the Guardian Protocol.", tags: '["nft","minting","catalyst"]' },
  { title: "Governance & Shura Council", category: "governance", content: "ScrollVerse governance operates through a Shura (consultative) council model. $LONDC holders can propose and vote on protocol changes. Proposals require 1000 LONDC to submit and 51% approval to pass.", tags: '["governance","shura","voting","DAO"]' },
  { title: "Legion Compensation Framework", category: "compensation", content: "Legion members earn $LONDC through contributions, content creation, referrals, and governance participation. Impact scores determine reward multipliers. Top contributors receive quarterly bonus distributions.", tags: '["legion","compensation","rewards","impact"]' },
  { title: "KYC & Compliance Protocol", category: "compliance", content: "ScrollVerse implements a tiered KYC system. Basic tier requires email verification. Advanced tier requires government ID. Institutional tier requires full AML/KYC documentation. KYC status affects trading limits and withdrawal thresholds.", tags: '["kyc","compliance","verification"]' },
  { title: "Staking & Yield Generation", category: "staking", content: "LONDC staking offers 3 tiers: Flexible (8% APY), 90-day lock (15% APY), 365-day lock (25% APY). Staked LONDC also earns governance voting power proportional to stake amount and duration.", tags: '["staking","yield","APY","LONDC"]' },
  { title: "Book of Life NFT System", category: "nft", content: "The Book of Life is a sovereign NFT collection representing guardian identities. Each Book of Life NFT is unique and contains the holder's guardian history, achievements, and sovereign credentials. Limited to 144,000 total mints.", tags: '["book-of-life","NFT","guardian","identity"]' },
  { title: "Frequency Activation Protocol", category: "metaphysical", content: "ScrollVerse integrates sacred frequency science through the Frequency Activation system. Users can activate specific frequencies (432Hz, 528Hz, 639Hz, 741Hz, 852Hz, 963Hz) to enhance their guardian journey and unlock special capabilities.", tags: '["frequency","activation","sacred-science"]' },
  { title: "Revenue Distribution Model", category: "finance", content: "ScrollVerse revenue is distributed as follows: 40% to Guardian rewards pool, 25% to ecosystem development, 15% to Zakat fund, 10% to team, 10% to treasury. Revenue sources include exchange fees, NFT royalties, and premium subscriptions.", tags: '["revenue","distribution","model"]' },
  { title: "AI Legion Intelligence Network", category: "AI", content: "The AI Legion consists of specialized AI agents: OmniSentinel (market intelligence), MirrorTwin (trading signals), GuardianAI (protocol security), and AwakeningAI (user guidance). Each agent operates autonomously within defined parameters.", tags: '["AI","legion","intelligence","agents"]' },
  { title: "Merchant Node System", category: "merchant", content: "Merchant Nodes are sovereign business entities within ScrollVerse. Node operators earn 2% of all transactions processed through their node. Nodes require 10,000 LONDC stake and Guardian tier 4 or above.", tags: '["merchant","node","business","stake"]' },
];

// ── Workflow Templates ────────────────────────────────────────────────────────
const workflowTemplates = [
  { name: "Guardian Onboarding Flow", category: "onboarding", description: "Complete onboarding process for new Guardians", steps: JSON.stringify([{step:1,title:"Create Account",description:"Register with email and set up 2FA"},{step:2,title:"Complete KYC",description:"Submit identity verification documents"},{step:3,title:"Acquire LONDC",description:"Purchase or earn initial LONDC tokens"},{step:4,title:"Activate Guardian Status",description:"Stake minimum LONDC and activate guardian profile"},{step:5,title:"Join Legion",description:"Connect with the Legion community and select channels"}]) },
  { name: "NFT Mint Flow", category: "nft", description: "Step-by-step process for minting a Catalyst NFT", steps: JSON.stringify([{step:1,title:"Prepare Assets",description:"Upload artwork and metadata to IPFS"},{step:2,title:"Set Parameters",description:"Define NFT name, description, royalties, and supply"},{step:3,title:"Pay Mint Fee",description:"Approve LONDC transaction for minting fee"},{step:4,title:"Confirm Mint",description:"Sign transaction and confirm on Polygon network"},{step:5,title:"List on Marketplace",description:"Set price and list NFT on ScrollVerse marketplace"}]) },
  { name: "Zakat Distribution Process", category: "finance", description: "Automated Zakat calculation and distribution workflow", steps: JSON.stringify([{step:1,title:"Calculate Nisab",description:"Determine current Nisab threshold in LONDC"},{step:2,title:"Identify Recipients",description:"Query eligible recipients from Guardian registry"},{step:3,title:"Calculate Amounts",description:"Apply 2.5% Zakat rate to qualifying balances"},{step:4,title:"Execute Distribution",description:"Trigger smart contract distribution transaction"},{step:5,title:"Record & Report",description:"Log distribution to audit trail and notify recipients"}]) },
  { name: "Exchange Asset Listing", category: "exchange", description: "Process for listing a new asset on OMNIEX", steps: JSON.stringify([{step:1,title:"Submit Proposal",description:"Submit asset listing proposal with documentation"},{step:2,title:"Community Review",description:"7-day community review and voting period"},{step:3,title:"Technical Audit",description:"Smart contract and security audit"},{step:4,title:"Governance Vote",description:"Final Shura council vote on listing"},{step:5,title:"Launch",description:"Asset goes live on OMNIEX with initial liquidity"}]) },
  { name: "Revenue Claim Process", category: "finance", description: "How to claim your Legion revenue share", steps: JSON.stringify([{step:1,title:"Check Eligibility",description:"Verify impact score and contribution history"},{step:2,title:"Calculate Share",description:"Review your percentage of quarterly revenue pool"},{step:3,title:"Submit Claim",description:"Submit claim through Legion Rewards dashboard"},{step:4,title:"Verification",description:"Admin verifies claim within 48 hours"},{step:5,title:"Receive Payment",description:"LONDC transferred to your wallet"}]) },
  { name: "Governance Proposal Flow", category: "governance", description: "How to submit and pass a governance proposal", steps: JSON.stringify([{step:1,title:"Draft Proposal",description:"Write proposal with title, description, and implementation plan"},{step:2,title:"Community Discussion",description:"Post in Legion for 3-day community feedback"},{step:3,title:"Formal Submission",description:"Submit with 1000 LONDC deposit"},{step:4,title:"Voting Period",description:"14-day voting period for LONDC holders"},{step:5,title:"Implementation",description:"If passed, Shura council implements within 30 days"}]) },
  { name: "Merchant Node Setup", category: "merchant", description: "Complete setup process for a Merchant Node", steps: JSON.stringify([{step:1,title:"Meet Requirements",description:"Ensure Guardian tier 4+ and 10,000 LONDC available"},{step:2,title:"Submit Application",description:"Complete merchant node application form"},{step:3,title:"Stake LONDC",description:"Lock 10,000 LONDC as node collateral"},{step:4,title:"Configure Node",description:"Set up node parameters, fee structure, and services"},{step:5,title:"Go Live",description:"Node activated and begins processing transactions"}]) },
  { name: "Book of Life Mint", category: "nft", description: "Mint your unique Book of Life NFT", steps: JSON.stringify([{step:1,title:"Verify Guardian Status",description:"Confirm active Guardian status and tier"},{step:2,title:"Choose Attributes",description:"Select your guardian archetype and attributes"},{step:3,title:"Pay Mint Fee",description:"Pay 144 LONDC mint fee"},{step:4,title:"Confirm Identity",description:"Link your guardian profile to the NFT"},{step:5,title:"Receive NFT",description:"Book of Life NFT minted to your wallet"}]) },
];

// ── Insert all data ────────────────────────────────────────────────────────────
console.log("Seeding exchange assets...");

// Clear existing
await conn.execute("DELETE FROM exchange_assets WHERE 1=1");
await conn.execute("DELETE FROM quantum_assets WHERE 1=1");
await conn.execute("DELETE FROM knowledge_base WHERE 1=1");
await conn.execute("DELETE FROM workflow_templates WHERE 1=1");

// Insert crypto
for (const asset of cryptoAssets) {
  const price = parseFloat(asset.price.replace(/[^0-9.]/g, '')) || 0;
  const change = parseFloat(asset.change24h.replace(/[^0-9.-]/g, '')) || 0;
  await conn.execute(
    "INSERT INTO exchange_assets (symbol, name, asset_class, price, price_usd, change_24h, created_at) VALUES (?, ?, 'crypto', ?, ?, ?, ?)",
    [asset.symbol, asset.name, price, price, change, Date.now()]
  );
}
console.log(`✓ ${cryptoAssets.length} crypto assets inserted`);

// Insert stocks
for (const asset of stockAssets) {
  const price = parseFloat(asset.price.replace(/[^0-9.]/g, '')) || 0;
  const change = parseFloat(asset.change24h.replace(/[^0-9.-]/g, '')) || 0;
  await conn.execute(
    "INSERT INTO exchange_assets (symbol, name, asset_class, price, price_usd, change_24h, created_at) VALUES (?, ?, 'stock', ?, ?, ?, ?)",
    [asset.symbol, asset.name, price, price, change, Date.now()]
  );
}
console.log(`✓ ${stockAssets.length} stock assets inserted`);

// Insert forex
for (const asset of forexAssets) {
  const price = parseFloat(asset.price.replace(/[^0-9.]/g, '')) || 0;
  const change = parseFloat(asset.change24h.replace(/[^0-9.-]/g, '')) || 0;
  await conn.execute(
    "INSERT INTO exchange_assets (symbol, name, asset_class, price, price_usd, change_24h, created_at) VALUES (?, ?, 'forex', ?, ?, ?, ?)",
    [asset.symbol, asset.name, price, price, change, Date.now()]
  );
}
console.log(`✓ ${forexAssets.length} forex assets inserted`);

// Insert quantum assets
for (const asset of quantumAssets) {
  const freqNum = parseFloat(asset.frequency?.replace(/[^0-9.]/g, '') || '0') || null;
  const val = parseFloat(asset.value?.replace(/[^0-9.]/g, '') || '0') || 0;
  await conn.execute(
    "INSERT INTO quantum_assets (name, symbol, asset_class, dimension, frequency_hz, resonance, value_usd, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [asset.name, asset.symbol, asset.assetClass, asset.dimension, freqNum, asset.resonance, val, Date.now()]
  );
}
console.log(`✓ ${quantumAssets.length} quantum assets inserted`);

// Insert knowledge entries
for (const entry of knowledgeEntries) {
  await conn.execute(
    "INSERT INTO knowledge_base (title, category, content, tags, author) VALUES (?, ?, ?, ?, 'ScrollVerse Foundation')",
    [entry.title, entry.category, entry.content, entry.tags]
  );
}
console.log(`✓ ${knowledgeEntries.length} knowledge entries inserted`);

// Insert workflow templates — check actual columns first
for (const wf of workflowTemplates) {
  await conn.execute(
    "INSERT INTO workflow_templates (name, category, description, steps) VALUES (?, ?, ?, ?)",
    [wf.name, wf.category, wf.description, wf.steps]
  );
}
console.log(`✓ ${workflowTemplates.length} workflow templates inserted`);

await conn.end();
console.log("\n✅ Seed complete! All sovereign data loaded.");
