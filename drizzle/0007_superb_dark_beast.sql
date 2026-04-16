CREATE TABLE `legion_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorName` varchar(128) NOT NULL,
	`authorType` enum('guardian','manus','omnitech1','sovereign') NOT NULL DEFAULT 'guardian',
	`authorTier` varchar(32) NOT NULL DEFAULT 'Guardian',
	`channel` varchar(64) NOT NULL DEFAULT 'general',
	`content` text NOT NULL,
	`mediaUrl` varchar(512),
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`pinned` boolean NOT NULL DEFAULT false,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `legion_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `legion_reactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`emoji` varchar(8) NOT NULL,
	`authorName` varchar(128) NOT NULL,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `legion_reactions_id` PRIMARY KEY(`id`)
);
