CREATE TABLE `guardian_waitlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`tier` varchar(64) NOT NULL DEFAULT 'Guardian',
	`mailchimpStatus` varchar(64) NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `guardian_waitlist_id` PRIMARY KEY(`id`),
	CONSTRAINT `guardian_waitlist_email_unique` UNIQUE(`email`)
);
