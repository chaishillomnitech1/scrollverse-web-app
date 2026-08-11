ALTER TABLE `catalog_asset_records` ADD `assigned_reviewer_user_id` int;--> statement-breakpoint
ALTER TABLE `catalog_asset_records` ADD `evidence_document_url` varchar(2048);--> statement-breakpoint
ALTER TABLE `catalog_asset_records` ADD `evidence_expires_at` timestamp;--> statement-breakpoint
ALTER TABLE `catalog_asset_records` ADD `last_expiry_reminder_at` timestamp;--> statement-breakpoint
ALTER TABLE `catalog_asset_records` ADD CONSTRAINT `catalog_asset_records_assigned_reviewer_user_id_users_id_fk` FOREIGN KEY (`assigned_reviewer_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;