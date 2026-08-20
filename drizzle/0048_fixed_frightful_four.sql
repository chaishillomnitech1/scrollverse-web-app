CREATE TABLE `local_royalty_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`owner_user_id` int NOT NULL,
	`record_reference` varchar(160) NOT NULL,
	`asset_label` varchar(32) NOT NULL DEFAULT 'LONDC',
	`network_label` varchar(64),
	`submitted_transaction_reference` varchar(160),
	`counterparty_reference` varchar(160),
	`declared_amount` varchar(80),
	`declared_unit` varchar(32) NOT NULL DEFAULT 'LONDC',
	`source_reference` varchar(2048),
	`source_note` varchar(2000) NOT NULL,
	`review_status` enum('DRAFT','REPORTED','REFERENCE_REVIEWED','NEEDS_INFO','CLOSED') NOT NULL DEFAULT 'DRAFT',
	`observed_at` timestamp,
	`reviewed_by_user_id` int,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `local_royalty_records_id` PRIMARY KEY(`id`),
	CONSTRAINT `local_royalty_records_record_reference_unique` UNIQUE(`record_reference`)
);
--> statement-breakpoint
ALTER TABLE `local_royalty_records` ADD CONSTRAINT `local_royalty_records_owner_user_id_users_id_fk` FOREIGN KEY (`owner_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `local_royalty_records` ADD CONSTRAINT `local_royalty_records_reviewed_by_user_id_users_id_fk` FOREIGN KEY (`reviewed_by_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `local_royalty_records_owner_status_idx` ON `local_royalty_records` (`owner_user_id`,`review_status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `local_royalty_records_reference_idx` ON `local_royalty_records` (`submitted_transaction_reference`,`observed_at`);