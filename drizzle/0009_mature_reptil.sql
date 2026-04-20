CREATE TABLE `audio_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookId` int NOT NULL,
	`userId` int,
	`listenerName` varchar(128),
	`durationListenedSec` int NOT NULL DEFAULT 0,
	`completedFull` boolean NOT NULL DEFAULT false,
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audio_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `book_purchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`bookId` int NOT NULL,
	`purchaserEmail` varchar(320),
	`purchaserName` varchar(256),
	`stripePaymentIntentId` varchar(128),
	`amountPaidCents` int NOT NULL DEFAULT 0,
	`format` enum('pdf','audio','motion','bundle') NOT NULL DEFAULT 'bundle',
	`status` varchar(32) NOT NULL DEFAULT 'completed',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `book_purchases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scrollverse_books` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`title` varchar(256) NOT NULL,
	`subtitle` varchar(512),
	`author` varchar(256) NOT NULL DEFAULT 'Chais Kenyatta Hill',
	`category` enum('scroll','doctrine','music','prophecy','manual','codex') NOT NULL DEFAULT 'scroll',
	`description` text,
	`coverImageUrl` varchar(512),
	`pdfUrl` varchar(512),
	`audioUrl` varchar(512),
	`motionVideoUrl` varchar(512),
	`priceUsd` int NOT NULL DEFAULT 0,
	`priceLondc` int NOT NULL DEFAULT 0,
	`tier` enum('free','guardian','sovereign','ascendant') NOT NULL DEFAULT 'free',
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`chapters` int NOT NULL DEFAULT 1,
	`pages` int NOT NULL DEFAULT 0,
	`audioDurationMin` int NOT NULL DEFAULT 0,
	`hasAudio` boolean NOT NULL DEFAULT false,
	`hasMotionVisual` boolean NOT NULL DEFAULT false,
	`hasPdf` boolean NOT NULL DEFAULT false,
	`featured` boolean NOT NULL DEFAULT false,
	`sortOrder` int NOT NULL DEFAULT 0,
	`downloadCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `scrollverse_books_id` PRIMARY KEY(`id`),
	CONSTRAINT `scrollverse_books_slug_unique` UNIQUE(`slug`)
);
