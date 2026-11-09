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

  if (present.length !== 0) {
    throw new Error(
      "Atlas migration preflight stopped safely. Existing tables detected: " +
      present.join(", ") +
      ". Compare their columns, indexes, constraints, and Drizzle migration history manually; no DDL was executed.",
    );
  }

  console.log(JSON.stringify({
    result: "PREFLIGHT_PASS",
    databaseName,
    requiredTablesAbsent: requiredTables,
    note: "No schema mutation occurred. The committed migration may now be applied by the protected migration job.",
  }, null, 2));
} finally {
  await connection.end();
}
