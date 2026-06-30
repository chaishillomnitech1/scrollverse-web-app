CREATE TABLE `ai_twin_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`guestId` varchar(128),
	`title` varchar(255) NOT NULL DEFAULT 'New Consultation',
	`messages` text NOT NULL DEFAULT ('[]'),
	`messageCount` int NOT NULL DEFAULT 0,
	`lastMessageAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_twin_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `broadcast_chat` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`userId` int,
	`displayName` varchar(128) NOT NULL DEFAULT 'Guardian',
	`tier` varchar(64) NOT NULL DEFAULT 'Guardian',
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `broadcast_chat_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `broadcast_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`hostId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`status` enum('scheduled','live','ended') NOT NULL DEFAULT 'scheduled',
	`viewerCount` int NOT NULL DEFAULT 0,
	`peakViewers` int NOT NULL DEFAULT 0,
	`streamKey` varchar(128),
	`scheduledAt` timestamp,
	`startedAt` timestamp,
	`endedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `broadcast_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `ai_twin_sessions` ADD CONSTRAINT `ai_twin_sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `broadcast_chat` ADD CONSTRAINT `broadcast_chat_sessionId_broadcast_sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `broadcast_sessions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `broadcast_chat` ADD CONSTRAINT `broadcast_chat_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `broadcast_sessions` ADD CONSTRAINT `broadcast_sessions_hostId_users_id_fk` FOREIGN KEY (`hostId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;