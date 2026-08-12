CREATE TABLE `legion_commons_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author_user_id` int,
	`author_label` varchar(120) NOT NULL,
	`constellation` enum('ORIGIN','LEARNING','BUILD','REFLECTION','GUIDANCE') NOT NULL,
	`content` varchar(1500) NOT NULL,
	`activity_state` enum('HUMAN_AUTHORED','SYSTEM_GENERATED','AWAITING_INTERACTION','REVIEWED_GUIDANCE') NOT NULL DEFAULT 'HUMAN_AUTHORED',
	`system_label` varchar(120),
	`is_visible` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `legion_commons_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `legion_commons_entries` ADD CONSTRAINT `legion_commons_entries_author_user_id_users_id_fk` FOREIGN KEY (`author_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `legion_commons_visible_idx` ON `legion_commons_entries` (`is_visible`,`created_at`);--> statement-breakpoint
CREATE INDEX `legion_commons_author_idx` ON `legion_commons_entries` (`author_user_id`,`updated_at`);