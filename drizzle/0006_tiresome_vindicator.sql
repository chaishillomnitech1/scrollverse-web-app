CREATE TABLE `merchant_nodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessName` varchar(256) NOT NULL,
	`ownerName` varchar(256) NOT NULL,
	`email` varchar(320),
	`city` varchar(128) NOT NULL,
	`state` varchar(64) NOT NULL,
	`country` varchar(64) NOT NULL DEFAULT 'USA',
	`cluster` varchar(64) NOT NULL DEFAULT 'South Jersey',
	`businessType` varchar(64) NOT NULL DEFAULT 'Retail',
	`gpvMonthly` int NOT NULL DEFAULT 0,
	`zakatAmount` int NOT NULL DEFAULT 0,
	`status` enum('active','pending','inactive') NOT NULL DEFAULT 'pending',
	`tier` enum('seed','guardian','sovereign','ascendant') NOT NULL DEFAULT 'seed',
	`referralCode` varchar(32),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`activatedAt` timestamp,
	CONSTRAINT `merchant_nodes_id` PRIMARY KEY(`id`)
);
