CREATE TABLE `knick_nfts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`questionId` int NOT NULL,
	`rarity` varchar(20) NOT NULL,
	`coinName` varchar(100) NOT NULL DEFAULT '$KNICK',
	`coinSymbol` varchar(20) NOT NULL DEFAULT 'KNICK',
	`coinColor` varchar(7) NOT NULL DEFAULT '#FFB800',
	`coinGradient` varchar(7) NOT NULL DEFAULT '#00D4FF',
	`coinLogo` varchar(50) NOT NULL DEFAULT '🏀',
	`coinSlogan` varchar(100) NOT NULL DEFAULT 'Never Stop. Never Settle.',
	`tokenId` varchar(255),
	`imageUrl` varchar(1024),
	`xpEarned` int NOT NULL DEFAULT 0,
	`streakBonus` boolean NOT NULL DEFAULT false,
	`mintedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `knick_nfts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knick_trivia` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` text NOT NULL,
	`optionA` varchar(255) NOT NULL,
	`optionB` varchar(255) NOT NULL,
	`optionC` varchar(255) NOT NULL,
	`optionD` varchar(255) NOT NULL,
	`correctAnswer` varchar(1) NOT NULL,
	`difficulty` varchar(20) NOT NULL,
	`nftRarity` varchar(20) NOT NULL,
	`xpReward` int NOT NULL DEFAULT 10,
	`funFact` text,
	`era` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `knick_trivia_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knick_user_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalAnswered` int NOT NULL DEFAULT 0,
	`correctAnswers` int NOT NULL DEFAULT 0,
	`currentStreak` int NOT NULL DEFAULT 0,
	`bestStreak` int NOT NULL DEFAULT 0,
	`totalXp` int NOT NULL DEFAULT 0,
	`nftsEarned` int NOT NULL DEFAULT 0,
	`rank` varchar(50) NOT NULL DEFAULT 'Rookie',
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `knick_user_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `knick_user_stats_userId_unique` UNIQUE(`userId`)
);
