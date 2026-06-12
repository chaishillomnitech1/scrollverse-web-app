CREATE TABLE `sovereign_cuts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transactionId` varchar(255) NOT NULL,
	`sourceType` varchar(100) NOT NULL,
	`sourceRef` varchar(255),
	`grossAmount` int NOT NULL,
	`zakatAmount` int NOT NULL,
	`ownerCutAmount` int NOT NULL,
	`netAmount` int NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'USD',
	`recipientAddress` varchar(255),
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sovereign_cuts_id` PRIMARY KEY(`id`)
);
