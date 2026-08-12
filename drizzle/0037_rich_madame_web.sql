CREATE TABLE `collaboration_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requester_user_id` int NOT NULL,
	`recipient_user_id` int NOT NULL,
	`request_type` enum('INTRODUCTION','CO_CREATE','FEEDBACK','RESEARCH') NOT NULL,
	`project_title` varchar(160) NOT NULL,
	`message` varchar(1500) NOT NULL,
	`status` enum('PENDING','ACCEPTED','DECLINED','WITHDRAWN') NOT NULL DEFAULT 'PENDING',
	`responded_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `collaboration_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_governance_profiles` (
	`user_id` int NOT NULL,
	`display_name` varchar(120) NOT NULL DEFAULT 'Creator',
	`bio` varchar(600),
	`disciplines` json NOT NULL,
	`signature_statement` varchar(600),
	`origin_statement` varchar(600),
	`is_public` boolean NOT NULL DEFAULT false,
	`collaboration_enabled` boolean NOT NULL DEFAULT false,
	`public_profile_consent_at` timestamp,
	`collaboration_consent_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creator_governance_profiles_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `provenance_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`owner_user_id` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`record_type` enum('IDEA','TEXT','VISUAL','AUDIO','DESIGN','RESEARCH') NOT NULL,
	`summary` varchar(2000) NOT NULL,
	`source_category` enum('ORIGINAL','LICENSED','PUBLIC_DOMAIN','COLLABORATIVE','UNVERIFIED') NOT NULL DEFAULT 'UNVERIFIED',
	`source_reference` varchar(2048),
	`owner_attestation` boolean NOT NULL DEFAULT false,
	`review_status` enum('DRAFT','SUBMITTED','ACKNOWLEDGED','NEEDS_INFO','CLOSED') NOT NULL DEFAULT 'DRAFT',
	`submitted_at` timestamp,
	`reviewed_by_user_id` int,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `provenance_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provenance_review_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`provenance_record_id` int NOT NULL,
	`action` enum('CREATED','SUBMITTED','ACKNOWLEDGED','NEEDS_INFO','NOTE') NOT NULL,
	`note` varchar(1500) NOT NULL,
	`actor_user_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `provenance_review_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `collaboration_requests` ADD CONSTRAINT `collaboration_requests_requester_user_id_users_id_fk` FOREIGN KEY (`requester_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `collaboration_requests` ADD CONSTRAINT `collaboration_requests_recipient_user_id_users_id_fk` FOREIGN KEY (`recipient_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_governance_profiles` ADD CONSTRAINT `creator_governance_profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `provenance_records` ADD CONSTRAINT `provenance_records_owner_user_id_users_id_fk` FOREIGN KEY (`owner_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `provenance_records` ADD CONSTRAINT `provenance_records_reviewed_by_user_id_users_id_fk` FOREIGN KEY (`reviewed_by_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `provenance_review_events` ADD CONSTRAINT `provenance_event_record_fk` FOREIGN KEY (`provenance_record_id`) REFERENCES `provenance_records`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `provenance_review_events` ADD CONSTRAINT `provenance_event_actor_fk` FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `collaboration_requests_requester_idx` ON `collaboration_requests` (`requester_user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `collaboration_requests_recipient_idx` ON `collaboration_requests` (`recipient_user_id`,`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `creator_governance_profiles_public_idx` ON `creator_governance_profiles` (`is_public`,`collaboration_enabled`);--> statement-breakpoint
CREATE INDEX `provenance_records_owner_idx` ON `provenance_records` (`owner_user_id`,`review_status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `provenance_records_review_idx` ON `provenance_records` (`review_status`,`submitted_at`);--> statement-breakpoint
CREATE INDEX `provenance_review_events_record_idx` ON `provenance_review_events` (`provenance_record_id`,`created_at`);
