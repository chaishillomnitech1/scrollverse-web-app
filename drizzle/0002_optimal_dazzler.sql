CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`category` varchar(64) NOT NULL,
	`tier` enum('free','guardian','sovereign','ascendant') NOT NULL DEFAULT 'free',
	`durationHours` int NOT NULL DEFAULT 1,
	`instructor` varchar(128) NOT NULL DEFAULT 'Chais Kenyatta Hill',
	`icon` varchar(8) NOT NULL DEFAULT '📚',
	`featured` boolean NOT NULL DEFAULT false,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `courses_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `revenue_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(64) NOT NULL,
	`productTier` varchar(64),
	`amountCents` int NOT NULL DEFAULT 0,
	`currency` varchar(8) NOT NULL DEFAULT 'usd',
	`stripeEventId` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revenue_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stripe_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`stripePaymentIntentId` varchar(128) NOT NULL,
	`stripeCustomerId` varchar(128),
	`productTier` enum('guardian','sovereign','ascendant') NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `stripe_orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripe_orders_stripePaymentIntentId_unique` UNIQUE(`stripePaymentIntentId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `guardianTier` enum('none','guardian','sovereign','ascendant') DEFAULT 'none' NOT NULL;