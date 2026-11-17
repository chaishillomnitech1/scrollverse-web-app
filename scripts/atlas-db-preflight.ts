import mysql2 from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required; no database was contacted.");

const connection = await mysql2.createConnection(databaseUrl);
try {
  const [databaseRows] = await connection.query("SELECT DATABASE() AS databaseName");
  const databaseName = (databaseRows as Array<{ databaseName: string | null }>)[0]?.databaseName;
  if (!databaseName) throw new Error("DATABASE_URL did not resolve a selected database.");

  const requiredTables = ["evidence_ledger", "atlas_entities", "atlas_relationships"];
  const [tableRows] = await connection.query(
    "SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN (?, ?, ?)",
    requiredTables,
  );
  const present = (tableRows as Array<{ TABLE_NAME: string }>).map(row => row.TABLE_NAME).sort();
  const [journalTableRows] = await connection.query(
    "SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?",
    ["__drizzle_migrations"],
  );
  const journalExists = (journalTableRows as Array<{ TABLE_NAME: string }>).length > 0;
  let migrationRecorded = false;
  if (journalExists) {
    const [migrationRows] = await connection.query(
      "SELECT created_at FROM __drizzle_migrations WHERE created_at = ?",
      [1794240000000],
    );
    migrationRecorded = (migrationRows as unknown[]).length > 0;
  }

  const allAtlasTablesPresent = requiredTables.every(table => present.includes(table));
  if (present.length === 0 && !migrationRecorded) {
    console.log(JSON.stringify({
      result: "PREFLIGHT_PASS_READY_TO_APPLY",
      databaseName,
      requiredTablesAbsent: requiredTables,
      note: "No schema mutation occurred. The committed migration may now be applied by the protected migration job.",
    }, null, 2));
  } else if (allAtlasTablesPresent && present.length === requiredTables.length && migrationRecorded) {
    console.log(JSON.stringify({
      result: "PREFLIGHT_PASS_ALREADY_APPLIED",
      databaseName,
      requiredTablesPresent: present,
      migrationRecorded: true,
      note: "Migration 0049 is already recorded and all expected tables exist. The migration runner will be a no-op; seed verification may proceed.",
    }, null, 2));
  } else {
    throw new Error(
      "Atlas migration preflight stopped safely. Existing tables: " +
      (present.join(", ") || "none") +
      "; migration 0049 recorded: " + migrationRecorded +
      ". Reconcile table structure and Drizzle migration history manually; no DDL was executed.",
    );
  }
} finally {
  await connection.end();
}
