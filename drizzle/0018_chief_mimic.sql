CREATE TABLE `creator_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(200) NOT NULL,
	`instagram` varchar(100) NOT NULL,
	`followers` int DEFAULT 0,
	`niche` varchar(100),
	`tier` varchar(50) DEFAULT 'guardian',
	`bio` text,
	`status` varchar(50) DEFAULT 'pending',
	`referralCode` varchar(50),
	`loncEarned` varchar(64) DEFAULT '0',
	`activationsCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`approvedAt` timestamp,
	CONSTRAINT `creator_applications_id` PRIMARY KEY(`id`)
);
