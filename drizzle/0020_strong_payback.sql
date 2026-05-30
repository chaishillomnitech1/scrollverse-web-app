CREATE TABLE `chx_reservations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripePaymentIntentId` varchar(256),
	`stripeSessionId` varchar(256),
	`chxAmount` int NOT NULL,
	`usdAmount` varchar(32) NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'pending',
	`email` varchar(256),
	`convertedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chx_reservations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staking_positions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pool` varchar(32) NOT NULL,
	`chxStaked` varchar(64) NOT NULL,
	`apyRate` varchar(16) NOT NULL,
	`rewardsEarned` varchar(64) DEFAULT '0',
	`status` varchar(32) NOT NULL DEFAULT 'active',
	`stakedAt` timestamp NOT NULL DEFAULT (now()),
	`lastCompoundAt` timestamp NOT NULL DEFAULT (now()),
	`withdrawnAt` timestamp,
	CONSTRAINT `staking_positions_id` PRIMARY KEY(`id`)
);
