CREATE TABLE `revenue_operation_digest_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settings_key` varchar(96) NOT NULL,
	`enabled` boolean NOT NULL DEFAULT true,
	`schedule_cron_task_uid` varchar(65),
	`last_digest_day` varchar(10),
	`last_digest_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `revenue_operation_digest_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `revenue_operation_digest_settings_settings_key_unique` UNIQUE(`settings_key`),
	CONSTRAINT `revenue_operation_digest_settings_schedule_cron_task_uid_unique` UNIQUE(`schedule_cron_task_uid`)
);
