CREATE TABLE `experience_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author_user_id` int NOT NULL,
	`display_name` varchar(96) NOT NULL,
	`title` varchar(180) NOT NULL,
	`content` text NOT NULL,
	`themes` varchar(512) NOT NULL DEFAULT 'reflection',
	`visibility` enum('PUBLIC','COMMUNITY') NOT NULL DEFAULT 'PUBLIC',
	`allow_replies` boolean NOT NULL DEFAULT true,
	`status` enum('PUBLISHED','ARCHIVED') NOT NULL DEFAULT 'PUBLISHED',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `experience_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experience_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`display_name` varchar(96) NOT NULL,
	`profile_visibility` enum('PUBLIC','PSEUDONYMOUS','COMMUNITY') NOT NULL DEFAULT 'PSEUDONYMOUS',
	`allow_replies` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `experience_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `experience_profiles_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `experience_reactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entry_id` int NOT NULL,
	`user_id` int NOT NULL,
	`reaction` enum('REFLECT','SUPPORT','CONNECT') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `experience_reactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experience_replies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entry_id` int NOT NULL,
	`author_user_id` int NOT NULL,
	`display_name` varchar(96) NOT NULL,
	`content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `experience_replies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experience_saves` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entry_id` int NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `experience_saves_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `experience_entries` ADD CONSTRAINT `experience_entries_author_user_id_users_id_fk` FOREIGN KEY (`author_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experience_profiles` ADD CONSTRAINT `experience_profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experience_reactions` ADD CONSTRAINT `experience_reactions_entry_id_experience_entries_id_fk` FOREIGN KEY (`entry_id`) REFERENCES `experience_entries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experience_reactions` ADD CONSTRAINT `experience_reactions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experience_replies` ADD CONSTRAINT `experience_replies_entry_id_experience_entries_id_fk` FOREIGN KEY (`entry_id`) REFERENCES `experience_entries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experience_replies` ADD CONSTRAINT `experience_replies_author_user_id_users_id_fk` FOREIGN KEY (`author_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experience_saves` ADD CONSTRAINT `experience_saves_entry_id_experience_entries_id_fk` FOREIGN KEY (`entry_id`) REFERENCES `experience_entries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experience_saves` ADD CONSTRAINT `experience_saves_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `experience_entries_visibility_idx` ON `experience_entries` (`visibility`,`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `experience_entries_author_idx` ON `experience_entries` (`author_user_id`,`updated_at`);--> statement-breakpoint
CREATE INDEX `experience_profiles_visibility_idx` ON `experience_profiles` (`profile_visibility`,`updated_at`);--> statement-breakpoint
CREATE INDEX `experience_reactions_entry_idx` ON `experience_reactions` (`entry_id`,`reaction`);--> statement-breakpoint
CREATE INDEX `experience_replies_entry_idx` ON `experience_replies` (`entry_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `experience_saves_user_idx` ON `experience_saves` (`user_id`,`created_at`);