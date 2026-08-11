CREATE TABLE `journey_interaction_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`event_type` enum('ZONE_OPENED','ROUTE_SELECTED','RECOMMENDATION_SELECTED') NOT NULL,
	`zone_id` varchar(64),
	`target_href` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `journey_interaction_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `journey_user_progress` (
	`user_id` int NOT NULL,
	`opened_journey_at` timestamp,
	`profile_ready_at` timestamp,
	`activation_started_at` timestamp,
	`recommendation_visited_at` timestamp,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `journey_user_progress_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `journey_interaction_events` ADD CONSTRAINT `journey_interaction_events_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `journey_user_progress` ADD CONSTRAINT `journey_user_progress_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `journey_interaction_user_created_idx` ON `journey_interaction_events` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `journey_interaction_created_idx` ON `journey_interaction_events` (`created_at`);