CREATE TABLE `casino_jackpot` (
	`id` int AUTO_INCREMENT NOT NULL,
	`poolName` varchar(64) NOT NULL,
	`currentAmount` varchar(64) NOT NULL DEFAULT '0',
	`lastWonAt` timestamp,
	`lastWinnerId` int,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `casino_jackpot_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `casino_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`game` varchar(64) NOT NULL,
	`betAmount` varchar(32) NOT NULL,
	`outcome` varchar(32) NOT NULL,
	`payout` varchar(32) NOT NULL DEFAULT '0',
	`kickback` varchar(32) NOT NULL DEFAULT '0',
	`serverSeed` varchar(128) NOT NULL,
	`clientSeed` varchar(128) NOT NULL,
	`nonce` int NOT NULL DEFAULT 0,
	`result` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `casino_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`message` text NOT NULL,
	`type` varchar(32) NOT NULL DEFAULT 'info',
	`link` varchar(512),
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
