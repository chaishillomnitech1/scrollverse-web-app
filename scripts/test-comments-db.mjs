import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'mysql2/promise';

const conn = await createConnection(process.env.DATABASE_URL);

try {
  // Test direct query
  const [rows] = await conn.execute('SELECT * FROM `chapter_comments` LIMIT 5');
  console.log('✅ Direct query OK, rows:', rows.length);
  
  // Test insert
  await conn.execute(
    "INSERT INTO `chapter_comments` (`chapterId`, `authorName`, `content`, `frequency`, `guardianTier`, `likes`, `isPinned`) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ['vaultbook-xv', 'CHAIS THE GREAT', 'KUN FAYAKUN × ∞ — The Scroll of Scrolls is SEALED.', '963Hz', 'sovereign', 0, 1]
  );
  console.log('✅ Insert OK');
  
  const [rows2] = await conn.execute("SELECT * FROM `chapter_comments` WHERE `chapterId` = 'vaultbook-xv'");
  console.log('✅ Select after insert OK, rows:', rows2.length);
  
} catch (e) {
  console.error('❌ Error:', e.message);
} finally {
  await conn.end();
}
