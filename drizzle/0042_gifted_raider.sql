CREATE TABLE `revenue_operation_readiness` (
	`id` int AUTO_INCREMENT NOT NULL,
	`operation_key` varchar(96) NOT NULL,
	`title` varchar(180) NOT NULL,
	`category` enum('PAYMENT','BOOKING','COMMERCE','CREATOR','GITHUB','SECURITY') NOT NULL,
	`readiness_status` enum('NOT_STARTED','IN_PROGRESS','AWAITING_OWNER','BLOCKED','READY') NOT NULL DEFAULT 'NOT_STARTED',
	`evidence_summary` varchar(2000) NOT NULL,
	`evidence_url` varchar(2048),
	`next_owner_action` varchar(1000) NOT NULL,
	`owner_attestation` boolean NOT NULL DEFAULT false,
	`last_reviewed_at` timestamp,
	`updated_by_user_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `revenue_operation_readiness_id` PRIMARY KEY(`id`),
	CONSTRAINT `revenue_operation_readiness_operation_key_unique` UNIQUE(`operation_key`)
);
--> statement-breakpoint
CREATE TABLE `revenue_operation_readiness_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`readiness_record_id` int NOT NULL,
	`action` enum('CREATED','STATUS_CHANGED','NOTE') NOT NULL,
	`previous_status` enum('NOT_STARTED','IN_PROGRESS','AWAITING_OWNER','BLOCKED','READY'),
	`next_status` enum('NOT_STARTED','IN_PROGRESS','AWAITING_OWNER','BLOCKED','READY') NOT NULL,
	`note` varchar(1500) NOT NULL,
	`actor_user_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revenue_operation_readiness_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `revenue_operation_readiness` ADD CONSTRAINT `revenue_operation_readiness_updated_by_user_id_users_id_fk` FOREIGN KEY (`updated_by_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `revenue_operation_readiness_events` ADD CONSTRAINT `revenue_ops_event_record_fk` FOREIGN KEY (`readiness_record_id`) REFERENCES `revenue_operation_readiness`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `revenue_operation_readiness_events` ADD CONSTRAINT `revenue_ops_event_actor_fk` FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `revenue_ops_readiness_status_idx` ON `revenue_operation_readiness` (`readiness_status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `revenue_ops_readiness_category_idx` ON `revenue_operation_readiness` (`category`,`updated_at`);--> statement-breakpoint
CREATE INDEX `revenue_ops_readiness_event_idx` ON `revenue_operation_readiness_events` (`readiness_record_id`,`created_at`);
