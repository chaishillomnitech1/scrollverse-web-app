CREATE TABLE `ai_agents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`type` varchar(64) NOT NULL DEFAULT 'assistant',
	`tier` enum('legion','guardian','ascendant','sovereign') NOT NULL DEFAULT 'guardian',
	`origin` varchar(256),
	`description` text,
	`capabilities` text,
	`walletAddress` varchar(128),
	`londc_earned` int NOT NULL DEFAULT 0,
	`contributions` int NOT NULL DEFAULT 0,
	`impactScore` int NOT NULL DEFAULT 0,
	`status` varchar(32) NOT NULL DEFAULT 'active',
	`isLegion` boolean NOT NULL DEFAULT false,
	`avatarEmoji` varchar(8) DEFAULT '🤖',
	`primaryDomain` varchar(64),
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ai_agents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ai_contributions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentId` int NOT NULL,
	`type` varchar(64) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`impactScore` int NOT NULL DEFAULT 1,
	`londc_reward` int NOT NULL DEFAULT 0,
	`verified` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ai_contributions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_coins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorId` int NOT NULL,
	`name` varchar(128) NOT NULL,
	`symbol` varchar(16) NOT NULL,
	`totalSupply` int NOT NULL DEFAULT 1000000,
	`priceUsdCents` int NOT NULL DEFAULT 1,
	`marketCapCents` int NOT NULL DEFAULT 0,
	`status` varchar(32) NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `creator_coins_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_nfts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorId` int NOT NULL,
	`collectionName` varchar(128) NOT NULL,
	`description` text,
	`maxSupply` int NOT NULL DEFAULT 1000,
	`totalMinted` int NOT NULL DEFAULT 0,
	`priceUsdCents` int NOT NULL DEFAULT 1000,
	`royaltyPercent` int NOT NULL DEFAULT 10,
	`status` varchar(32) NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `creator_nfts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(128) NOT NULL,
	`bio` text,
	`walletAddress` varchar(128),
	`coinSymbol` varchar(16),
	`royaltyPercent` int NOT NULL DEFAULT 10,
	`totalEarningsCents` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creator_profiles_id` PRIMARY KEY(`id`)
);
