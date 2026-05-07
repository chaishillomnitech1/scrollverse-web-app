CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`action` varchar(128) NOT NULL,
	`resource` varchar(128),
	`resourceId` varchar(128),
	`ipAddress` varchar(64),
	`userAgent` text,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kyc_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'pending',
	`documentType` varchar(64),
	`fullName` varchar(128),
	`dateOfBirth` varchar(32),
	`country` varchar(64),
	`documentNumber` varchar(64),
	`verifiedAt` timestamp,
	`rejectedReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `kyc_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `revenue_distributions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourceType` varchar(64) NOT NULL,
	`sourceId` varchar(128),
	`totalAmount` int NOT NULL,
	`referralAmount` int DEFAULT 0,
	`zakatAmount` int DEFAULT 0,
	`tradingFeeAmount` int DEFAULT 0,
	`nftRoyaltyAmount` int DEFAULT 0,
	`netAmount` int NOT NULL,
	`referralUserId` int,
	`distributedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revenue_distributions_id` PRIMARY KEY(`id`)
);
