CREATE TABLE `catalog_evidence_digest_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`catalog_key` varchar(96) NOT NULL,
	`enabled` boolean NOT NULL DEFAULT false,
	`days_before_expiry` int NOT NULL DEFAULT 30,
	`schedule_cron_task_uid` varchar(65),
	`last_digest_day` varchar(10),
	`last_digest_at` timestamp,
	`updated_by_user_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalog_evidence_digest_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `catalog_evidence_digest_settings_catalog_key_unique` UNIQUE(`catalog_key`)
);
--> statement-breakpoint
ALTER TABLE `catalog_evidence_digest_settings` ADD CONSTRAINT `catalog_evidence_digest_settings_updated_by_user_id_users_id_fk` FOREIGN KEY (`updated_by_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `catalog_evidence_digest_task_uid_idx` ON `catalog_evidence_digest_settings` (`schedule_cron_task_uid`);