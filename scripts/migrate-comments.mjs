import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await createConnection(process.env.DATABASE_URL);

try {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS \`chapter_comments\` (
      \`id\` int AUTO_INCREMENT NOT NULL,
      \`chapterId\` varchar(64) NOT NULL,
      \`authorName\` varchar(128) NOT NULL,
      \`authorId\` varchar(128),
      \`content\` text NOT NULL,
      \`frequency\` varchar(16) NOT NULL DEFAULT '528Hz',
      \`guardianTier\` enum('visitor','guardian','sovereign','ascendant','legion') NOT NULL DEFAULT 'visitor',
      \`likes\` int NOT NULL DEFAULT 0,
      \`isPinned\` boolean NOT NULL DEFAULT false,
      \`createdAt\` timestamp NOT NULL DEFAULT (now()),
      \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT \`chapter_comments_id\` PRIMARY KEY(\`id\`)
    )
  `);
  console.log('✅ chapter_comments table created successfully');
} catch (e) {
  if (e.code === 'ER_TABLE_EXISTS_ERROR') {
    console.log('✅ chapter_comments table already exists');
  } else {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
} finally {
  await conn.end();
}
