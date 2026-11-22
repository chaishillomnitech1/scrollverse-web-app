import fs from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";

const outputDir = process.argv[2];
if (!outputDir || !path.isAbsolute(outputDir)) {
  throw new Error("Usage: tsx scripts/export-database-readonly.ts /absolute/output/dir");
}
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not available; no database export was performed.");
}

const normalize = (value: unknown): unknown => {
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Buffer.isBuffer(value)) return { encoding: "base64", value: value.toString("base64") };
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalize(item)]));
  }
  return value;
};

await fs.mkdir(outputDir, { recursive: true });
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const startedAt = new Date().toISOString();
const errors: Array<{ table: string; error: string }> = [];
let tableNames: string[] = [];
try {
  const [rows] = await connection.query("SHOW FULL TABLES");
  tableNames = (rows as Array<Record<string, unknown>>)
    .map((row) => String(Object.values(row)[0]))
    .filter(Boolean)
    .sort();

  await fs.writeFile(path.join(outputDir, "tables.json"), JSON.stringify(tableNames, null, 2) + "\n");
  for (const table of tableNames) {
    const safeIdentifier = `\`${table.replaceAll("`", "``")}\``;
    try {
      const [schema] = await connection.query(`SHOW CREATE TABLE ${safeIdentifier}`);
      const [tableRows] = await connection.query(`SELECT * FROM ${safeIdentifier}`);
      await fs.writeFile(
        path.join(outputDir, `${table}.json`),
        JSON.stringify({ table, rows: normalize(tableRows) }, null, 2) + "\n",
      );
      await fs.writeFile(
        path.join(outputDir, `${table}.schema.json`),
        JSON.stringify(normalize(schema), null, 2) + "\n",
      );
    } catch (error) {
      errors.push({ table, error: error instanceof Error ? error.message : String(error) });
    }
  }
} finally {
  await connection.end();
}

const finishedAt = new Date().toISOString();
await fs.writeFile(
  path.join(outputDir, "export-metadata.json"),
  JSON.stringify(
    {
      kind: "read-only database export",
      startedAt,
      finishedAt,
      tableCount: tableNames.length,
      exportedTableCount: tableNames.length - errors.length,
      errors,
      credentialsIncluded: false,
      externalWritesPerformed: false,
      note: "Rows are exported as JSON. Binary values are base64-encoded. Dates are ISO strings."
    },
    null,
    2,
  ) + "\n",
);
console.log(JSON.stringify({ tableCount: tableNames.length, exportedTableCount: tableNames.length - errors.length, errors }, null, 2));
