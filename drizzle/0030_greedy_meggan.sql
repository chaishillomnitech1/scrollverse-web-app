CREATE TABLE `catalog_asset_audit_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset_id` int NOT NULL,
	`action` enum('UPLOADED','APPROVED','REJECTED') NOT NULL,
	`previous_status` enum('PENDING','APPROVED','REJECTED'),
	`next_status` enum('PENDING','APPROVED','REJECTED') NOT NULL,
	`note` text NOT NULL,
	`actor_user_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `catalog_asset_audit_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `catalog_asset_audit_events` ADD CONSTRAINT `catalog_asset_audit_events_actor_user_id_users_id_fk` FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;