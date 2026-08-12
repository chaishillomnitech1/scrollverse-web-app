ALTER TABLE `creator_release_asset_events` MODIFY COLUMN `action` enum('CREATED','UPLOADED','ASSIGNED','SUBMITTED','ACKNOWLEDGED','NEEDS_INFO','EXCLUDED','NOTE') NOT NULL;--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD `storage_key` varchar(512);--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD `asset_url` varchar(2048);--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD `original_file_name` varchar(255);--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD `mime_type` varchar(100);--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD `byte_size` int;--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD `assigned_reviewer_user_id` int;--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD `assigned_at` timestamp;--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD CONSTRAINT `creator_release_assets_assigned_reviewer_user_id_users_id_fk` FOREIGN KEY (`assigned_reviewer_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `creator_release_asset_assignment_idx` ON `creator_release_assets` (`assigned_reviewer_user_id`,`review_status`,`updated_at`);--> statement-breakpoint
ALTER TABLE `creator_release_asset_events` MODIFY COLUMN `action` enum('CREATED','UPLOADED','ASSIGNED','SUBMITTED','ACKNOWLEDGED','NEEDS_INFO','EXCLUDED','NOTE') NOT NULL;
