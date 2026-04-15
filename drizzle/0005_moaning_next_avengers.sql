CREATE TABLE `anno_omni_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(320) NOT NULL,
	`businessName` varchar(256),
	`businessType` varchar(64),
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`sovereignGoal` text,
	`referralCode` varchar(32),
	`status` varchar(32) NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `anno_omni_leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referral_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(32) NOT NULL,
	`creatorName` varchar(128) NOT NULL,
	`creatorEmail` varchar(320),
	`userId` int,
	`clicks` int NOT NULL DEFAULT 0,
	`conversions` int NOT NULL DEFAULT 0,
	`rewardTokens` int NOT NULL DEFAULT 0,
	`tier` varchar(32) NOT NULL DEFAULT 'Guardian',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referral_codes_id` PRIMARY KEY(`id`),
	CONSTRAINT `referral_codes_code_unique` UNIQUE(`code`)
);
