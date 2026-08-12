CREATE TABLE `creator_media_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`owner_user_id` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`description` varchar(2000) NOT NULL,
	`media_kind` enum('IMAGE','AUDIO','VIDEO','DOCUMENT','OTHER') NOT NULL,
	`storage_key` varchar(512),
	`asset_url` varchar(2048),
	`original_file_name` varchar(255),
	`mime_type` varchar(120),
	`byte_size` int,
	`visibility` enum('PRIVATE','THINK_SPACE_DRAFT','PUBLIC_PENDING_REVIEW') NOT NULL DEFAULT 'PRIVATE',
	`consent_attestation` boolean NOT NULL DEFAULT false,
	`provenance_note` varchar(2000),
	`distribution_status` enum('NOT_REQUESTED','CREATOR_HANDOFF_ONLY') NOT NULL DEFAULT 'NOT_REQUESTED',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creator_media_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `creator_media_assets` ADD CONSTRAINT `creator_media_assets_owner_user_id_users_id_fk` FOREIGN KEY (`owner_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `creator_media_owner_idx` ON `creator_media_assets` (`owner_user_id`,`visibility`,`updated_at`);--> statement-breakpoint
CREATE INDEX `creator_media_distribution_idx` ON `creator_media_assets` (`distribution_status`,`updated_at`);