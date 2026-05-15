CREATE TABLE `crypto_price_cache` (
	`id` int AUTO_INCREMENT NOT NULL,
	`symbol` varchar(32) NOT NULL,
	`coinId` varchar(64) NOT NULL,
	`name` varchar(128) NOT NULL,
	`price` varchar(64) NOT NULL,
	`change24h` varchar(32) DEFAULT '0',
	`volume24h` varchar(64) DEFAULT '0',
	`marketCap` varchar(64) DEFAULT '0',
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `crypto_price_cache_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stock_price_cache` (
	`id` int AUTO_INCREMENT NOT NULL,
	`symbol` varchar(16) NOT NULL,
	`price` varchar(32) NOT NULL,
	`change` varchar(32) DEFAULT '0',
	`changePercent` varchar(32) DEFAULT '0',
	`volume` varchar(32) DEFAULT '0',
	`high` varchar(32) DEFAULT '0',
	`low` varchar(32) DEFAULT '0',
	`open` varchar(32) DEFAULT '0',
	`close` varchar(32) DEFAULT '0',
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `stock_price_cache_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uap_coins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`symbol` varchar(32) NOT NULL,
	`name` varchar(128) NOT NULL,
	`description` text,
	`totalSupply` varchar(64) NOT NULL,
	`price` varchar(64) NOT NULL DEFAULT '0',
	`backingAsset` varchar(128),
	`logoUrl` varchar(512),
	`contractAddress` varchar(128),
	`chain` varchar(64) DEFAULT 'Polygon',
	`isActive` tinyint DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uap_coins_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uap_documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(512) NOT NULL,
	`agency` varchar(128) NOT NULL,
	`date` varchar(32) NOT NULL,
	`summary` text NOT NULL,
	`category` varchar(64) NOT NULL DEFAULT 'general',
	`mediaUrl` varchar(512),
	`tokenized` tinyint DEFAULT 0,
	`classificationLevel` varchar(64) DEFAULT 'DECLASSIFIED',
	`sourceUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uap_documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uap_entities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`type` varchar(64) NOT NULL DEFAULT 'craft',
	`description` text NOT NULL,
	`frequency` varchar(64),
	`imageUrl` varchar(512),
	`nftMinted` tinyint DEFAULT 0,
	`nftCollection` varchar(128),
	`sightingsCount` int DEFAULT 0,
	`firstSighted` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uap_entities_id` PRIMARY KEY(`id`)
);
