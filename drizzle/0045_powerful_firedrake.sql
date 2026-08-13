CREATE TABLE `continuity_review_runs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`review_week` varchar(10) NOT NULL,
	`route_count` int NOT NULL,
	`readiness_record_count` int NOT NULL,
	`ready_count` int NOT NULL,
	`awaiting_owner_count` int NOT NULL,
	`blocked_count` int NOT NULL,
	`in_progress_count` int NOT NULL,
	`route_summary` text NOT NULL,
	`dependency_summary` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `continuity_review_runs_id` PRIMARY KEY(`id`),
	CONSTRAINT `continuity_review_runs_review_week_unique` UNIQUE(`review_week`)
);
--> statement-breakpoint
CREATE TABLE `continuity_review_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settings_key` varchar(96) NOT NULL,
	`enabled` boolean NOT NULL DEFAULT true,
	`schedule_cron_task_uid` varchar(65),
	`last_review_week` varchar(10),
	`last_review_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `continuity_review_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `continuity_review_settings_settings_key_unique` UNIQUE(`settings_key`),
	CONSTRAINT `continuity_review_settings_schedule_cron_task_uid_unique` UNIQUE(`schedule_cron_task_uid`)
);
--> statement-breakpoint
CREATE INDEX `continuity_review_runs_created_idx` ON `continuity_review_runs` (`created_at`);