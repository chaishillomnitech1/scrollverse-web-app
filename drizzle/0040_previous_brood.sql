CREATE TABLE `creator_release_asset_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`release_asset_id` int NOT NULL,
	`action` enum('CREATED','SUBMITTED','ACKNOWLEDGED','NEEDS_INFO','EXCLUDED','NOTE') NOT NULL,
	`note` varchar(1500) NOT NULL,
	`actor_user_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `creator_release_asset_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_release_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`owner_user_id` int NOT NULL,
	`provenance_record_id` int,
	`asset_kind` enum('APP_ICON','SCREENSHOT','STORE_COPY','PRIVACY_COPY','RELEASE_NOTE','SUPPORT_POLICY','OTHER') NOT NULL,
	`title` varchar(180) NOT NULL,
	`description` varchar(2000) NOT NULL,
	`source_reference` varchar(2048),
	`owner_attestation` boolean NOT NULL DEFAULT false,
	`review_status` enum('DRAFT','SUBMITTED','ACKNOWLEDGED','NEEDS_INFO','EXCLUDED') NOT NULL DEFAULT 'DRAFT',
	`submitted_at` timestamp,
	`reviewed_by_user_id` int,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creator_release_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_support_request_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`support_request_id` int NOT NULL,
	`action` enum('CREATED','IN_REVIEW','AWAITING_CREATOR','RESOLVED','CLOSED','NOTE') NOT NULL,
	`note` varchar(1500) NOT NULL,
	`actor_user_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `creator_support_request_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `creator_support_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requester_user_id` int NOT NULL,
	`category` enum('ACCESS','CREATOR_WORKSPACE','RELEASE_PLANNING','PROVENANCE','OTHER') NOT NULL DEFAULT 'OTHER',
	`subject` varchar(180) NOT NULL,
	`details` varchar(2000) NOT NULL,
	`requester_attestation` boolean NOT NULL DEFAULT false,
	`status` enum('OPEN','IN_REVIEW','AWAITING_CREATOR','RESOLVED','CLOSED') NOT NULL DEFAULT 'OPEN',
	`assigned_reviewer_user_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creator_support_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `creator_release_asset_events` ADD CONSTRAINT `c_rel_asset_ev_asset_fk` FOREIGN KEY (`release_asset_id`) REFERENCES `creator_release_assets`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_release_asset_events` ADD CONSTRAINT `c_rel_asset_ev_actor_fk` FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD CONSTRAINT `c_rel_asset_owner_fk` FOREIGN KEY (`owner_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD CONSTRAINT `c_rel_asset_prov_fk` FOREIGN KEY (`provenance_record_id`) REFERENCES `provenance_records`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_release_assets` ADD CONSTRAINT `c_rel_asset_reviewer_fk` FOREIGN KEY (`reviewed_by_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_support_request_events` ADD CONSTRAINT `c_support_ev_request_fk` FOREIGN KEY (`support_request_id`) REFERENCES `creator_support_requests`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_support_request_events` ADD CONSTRAINT `c_support_ev_actor_fk` FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_support_requests` ADD CONSTRAINT `c_support_req_user_fk` FOREIGN KEY (`requester_user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `creator_support_requests` ADD CONSTRAINT `c_support_req_reviewer_fk` FOREIGN KEY (`assigned_reviewer_user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `creator_release_asset_event_idx` ON `creator_release_asset_events` (`release_asset_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `creator_release_asset_owner_idx` ON `creator_release_assets` (`owner_user_id`,`review_status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `creator_release_asset_review_idx` ON `creator_release_assets` (`review_status`,`submitted_at`);--> statement-breakpoint
CREATE INDEX `creator_support_event_request_idx` ON `creator_support_request_events` (`support_request_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `creator_support_requester_idx` ON `creator_support_requests` (`requester_user_id`,`status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `creator_support_review_idx` ON `creator_support_requests` (`status`,`updated_at`);
