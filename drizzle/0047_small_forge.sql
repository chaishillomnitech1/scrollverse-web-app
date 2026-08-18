CREATE TABLE IF NOT EXISTS `portal_route_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`route_path` varchar(255) NOT NULL,
	`label` varchar(180) NOT NULL,
	`category` varchar(96) NOT NULL,
	`operating_state` enum('AVAILABLE_NOW','RESEARCH','REQUIRES_OWNER_RELEASE') NOT NULL DEFAULT 'AVAILABLE_NOW',
	`source_label` varchar(255) NOT NULL,
	`is_featured` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portal_route_records_id` PRIMARY KEY(`id`),
	CONSTRAINT `portal_route_records_route_path_unique` UNIQUE(`route_path`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `portal_route_refresh_runs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settings_id` int NOT NULL,
	`refresh_key` varchar(180) NOT NULL,
	`task_uid` varchar(65),
	`route_count` int NOT NULL,
	`inserted_count` int NOT NULL DEFAULT 0,
	`updated_count` int NOT NULL DEFAULT 0,
	`summary` varchar(1200) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portal_route_refresh_runs_id` PRIMARY KEY(`id`),
	CONSTRAINT `portal_route_refresh_runs_refresh_key_unique` UNIQUE(`refresh_key`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `portal_route_refresh_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settings_key` varchar(96) NOT NULL,
	`schedule_cron_task_uid` varchar(65),
	`cron_expression` varchar(64),
	`enabled` boolean NOT NULL DEFAULT false,
	`last_refresh_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portal_route_refresh_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `portal_route_refresh_settings_settings_key_unique` UNIQUE(`settings_key`)
);
--> statement-breakpoint
ALTER TABLE `portal_route_refresh_runs` ADD CONSTRAINT `prrr_settings_fk` FOREIGN KEY (`settings_id`) REFERENCES `portal_route_refresh_settings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `portal_route_records_category_state_idx` ON `portal_route_records` (`category`,`operating_state`);--> statement-breakpoint
CREATE INDEX `portal_route_records_featured_idx` ON `portal_route_records` (`is_featured`,`updated_at`);--> statement-breakpoint
CREATE INDEX `portal_route_refresh_runs_settings_created_idx` ON `portal_route_refresh_runs` (`settings_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `portal_route_refresh_runs_task_created_idx` ON `portal_route_refresh_runs` (`task_uid`,`created_at`);--> statement-breakpoint
CREATE INDEX `portal_route_refresh_task_uid_idx` ON `portal_route_refresh_settings` (`schedule_cron_task_uid`);
