/**
 * Re-seed the library catalog — clears existing books and triggers re-seed
 * on next API call with the updated catalog including VaultBook XV
 */
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

try {
  const [rows] = await conn.execute("SELECT COUNT(*) as count FROM scrollverse_books");
  console.log("Current book count:", rows[0].count);

  // Delete all books so the seed function re-runs with the new catalog
  await conn.execute("DELETE FROM scrollverse_books");
  console.log("✅ Books cleared. The library will re-seed with 10 books (including VaultBook XV + Majestic Anchor) on next API call.");

  // Verify
  const [after] = await conn.execute("SELECT COUNT(*) as count FROM scrollverse_books");
  console.log("Book count after clear:", after[0].count);
} finally {
  await conn.end();
}
