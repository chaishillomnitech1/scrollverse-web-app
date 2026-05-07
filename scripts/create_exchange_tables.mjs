import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const tables = [
  `CREATE TABLE IF NOT EXISTS exchange_assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    asset_class VARCHAR(30) NOT NULL DEFAULT 'crypto',
    price DECIMAL(20,8) NOT NULL DEFAULT 0,
    price_usd DECIMAL(20,8) NOT NULL DEFAULT 0,
    change_24h DECIMAL(10,4) NOT NULL DEFAULT 0,
    change_7d DECIMAL(10,4) NOT NULL DEFAULT 0,
    volume_24h DECIMAL(30,2) NOT NULL DEFAULT 0,
    market_cap DECIMAL(30,2) NOT NULL DEFAULT 0,
    circulating_supply DECIMAL(30,2) NOT NULL DEFAULT 0,
    description TEXT,
    logo_url VARCHAR(500),
    contract_address VARCHAR(100),
    chain VARCHAR(50),
    is_londc_pair BOOLEAN NOT NULL DEFAULT FALSE,
    is_sovereign BOOLEAN NOT NULL DEFAULT FALSE,
    rank_global INT NOT NULL DEFAULT 9999,
    created_at BIGINT NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS exchange_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    asset_id INT NOT NULL,
    order_type VARCHAR(20) NOT NULL DEFAULT 'market',
    side VARCHAR(10) NOT NULL,
    quantity DECIMAL(20,8) NOT NULL,
    price DECIMAL(20,8) NOT NULL DEFAULT 0,
    filled_quantity DECIMAL(20,8) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    londc_fee DECIMAL(20,8) NOT NULL DEFAULT 0,
    mirror_twin_signal BOOLEAN NOT NULL DEFAULT FALSE,
    created_at BIGINT NOT NULL DEFAULT 0,
    filled_at BIGINT
  )`,
  `CREATE TABLE IF NOT EXISTS exchange_portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    asset_id INT NOT NULL,
    quantity DECIMAL(20,8) NOT NULL DEFAULT 0,
    avg_cost DECIMAL(20,8) NOT NULL DEFAULT 0,
    total_invested DECIMAL(20,8) NOT NULL DEFAULT 0,
    current_value DECIMAL(20,8) NOT NULL DEFAULT 0,
    pnl DECIMAL(20,8) NOT NULL DEFAULT 0,
    pnl_pct DECIMAL(10,4) NOT NULL DEFAULT 0,
    updated_at BIGINT NOT NULL DEFAULT 0,
    UNIQUE KEY unique_user_asset (user_id, asset_id)
  )`,
  `CREATE TABLE IF NOT EXISTS exchange_governance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proposal_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(30) NOT NULL DEFAULT 'law',
    proposer_id INT,
    proposer_name VARCHAR(100),
    votes_for INT NOT NULL DEFAULT 0,
    votes_against INT NOT NULL DEFAULT 0,
    votes_abstain INT NOT NULL DEFAULT 0,
    quorum_required INT NOT NULL DEFAULT 144,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    londc_required DECIMAL(20,8) NOT NULL DEFAULT 144,
    enacted_at BIGINT,
    expires_at BIGINT,
    created_at BIGINT NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS quantum_assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(20) NOT NULL UNIQUE,
    asset_class VARCHAR(30) NOT NULL DEFAULT 'quantum',
    dimension VARCHAR(50),
    frequency_hz DECIMAL(20,4),
    resonance VARCHAR(100),
    value_usd DECIMAL(20,8) NOT NULL DEFAULT 0,
    description TEXT,
    properties JSON,
    is_tradeable BOOLEAN NOT NULL DEFAULT TRUE,
    created_at BIGINT NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS knowledge_base (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'general',
    content LONGTEXT NOT NULL,
    summary TEXT,
    tags JSON,
    author VARCHAR(100),
    usage_count INT NOT NULL DEFAULT 0,
    rating DECIMAL(3,2) NOT NULL DEFAULT 5.00,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at BIGINT NOT NULL DEFAULT 0,
    updated_at BIGINT NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS workflow_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL DEFAULT 'general',
    steps JSON NOT NULL,
    author VARCHAR(100),
    times_used INT NOT NULL DEFAULT 0,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at BIGINT NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS legion_rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    member_name VARCHAR(100) NOT NULL,
    member_type VARCHAR(30) NOT NULL DEFAULT 'human',
    reward_type VARCHAR(30) NOT NULL DEFAULT 'londc',
    amount DECIMAL(20,8) NOT NULL DEFAULT 0,
    currency VARCHAR(20) NOT NULL DEFAULT 'LONDC',
    reason TEXT NOT NULL,
    impact_score INT NOT NULL DEFAULT 0,
    category VARCHAR(50) NOT NULL DEFAULT 'contribution',
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    tx_hash VARCHAR(100),
    created_at BIGINT NOT NULL DEFAULT 0,
    paid_at BIGINT
  )`
];

for (const sql of tables) {
  await conn.execute(sql);
  const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)[1];
  console.log(`✓ Created: ${tableName}`);
}

await conn.end();
console.log('\n✅ All 8 tables created successfully');
