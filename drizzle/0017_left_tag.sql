CREATE TABLE `exchange_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`symbol` varchar(32) NOT NULL,
	`name` varchar(128) NOT NULL,
	`assetClass` varchar(32) NOT NULL DEFAULT 'crypto',
	`price` varchar(64) NOT NULL DEFAULT '0',
	`change24h` varchar(32) DEFAULT '0',
	`volume` varchar(64) DEFAULT '0',
	`marketCap` varchar(64) DEFAULT '0',
	`description` text,
	`logoUrl` varchar(512),
	`isActive` tinyint DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exchange_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exchange_governance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proposalId` varchar(64) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`proposerUserId` int,
	`votesFor` int DEFAULT 0,
	`votesAgainst` int DEFAULT 0,
	`status` varchar(32) NOT NULL DEFAULT 'active',
	`enactedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exchange_governance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exchange_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`assetId` int NOT NULL,
	`orderType` varchar(16) NOT NULL DEFAULT 'market',
	`side` varchar(8) NOT NULL DEFAULT 'buy',
	`quantity` varchar(64) NOT NULL,
	`price` varchar(64),
	`status` varchar(16) NOT NULL DEFAULT 'pending',
	`filledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exchange_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exchange_portfolio` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`assetId` int NOT NULL,
	`quantity` varchar(64) NOT NULL DEFAULT '0',
	`avgCost` varchar(64) DEFAULT '0',
	`currentValue` varchar(64) DEFAULT '0',
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exchange_portfolio_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knowledge_base` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`category` varchar(64) NOT NULL DEFAULT 'general',
	`content` text NOT NULL,
	`tags` text,
	`authorId` int,
	`authorName` varchar(128),
	`usageCount` int DEFAULT 0,
	`rating` int DEFAULT 0,
	`isPublished` tinyint DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `knowledge_base_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `legion_rewards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`memberId` int NOT NULL,
	`memberName` varchar(128),
	`rewardType` varchar(64) NOT NULL DEFAULT 'contribution',
	`amount` varchar(64) NOT NULL,
	`currency` varchar(32) NOT NULL DEFAULT 'LONDC',
	`reason` text,
	`impactScore` int DEFAULT 0,
	`status` varchar(32) NOT NULL DEFAULT 'pending',
	`distributedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `legion_rewards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quantum_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`symbol` varchar(32) NOT NULL,
	`assetClass` varchar(64) NOT NULL DEFAULT 'quantum',
	`dimension` varchar(64),
	`frequency` varchar(64),
	`resonance` varchar(64),
	`value` varchar(64) DEFAULT '0',
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quantum_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflow_templates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`description` text,
	`category` varchar(64) NOT NULL DEFAULT 'general',
	`steps` text,
	`authorId` int,
	`authorName` varchar(128),
	`timesUsed` int DEFAULT 0,
	`isPublished` tinyint DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `workflow_templates_id` PRIMARY KEY(`id`)
);
