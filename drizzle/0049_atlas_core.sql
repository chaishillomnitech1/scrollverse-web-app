CREATE TABLE `atlas_entities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(160) NOT NULL,
  `title` varchar(240) NOT NULL,
  `kind` enum('PROJECT','REPOSITORY','CONVERSATION','ARTIFACT','DISCOVERY','PERSON','PLATFORM','CONCEPT','DEPLOYMENT') NOT NULL,
  `summary` text,
  `visibility` enum('PUBLIC','PRIVATE') NOT NULL DEFAULT 'PRIVATE',
  `status` enum('DRAFT','PUBLISHED','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
  `provenance` enum('SOURCE_LINKED','OWNER_REPORTED','UNVERIFIED') NOT NULL DEFAULT 'UNVERIFIED',
  `source_label` varchar(255),
  `source_url` varchar(1024),
  `source_evidence_id` int,
  `created_by_user_id` int,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `atlas_entities_id` PRIMARY KEY(`id`),
  CONSTRAINT `atlas_entities_slug_unique` UNIQUE(`slug`),
  CONSTRAINT `atlas_entities_source_evidence_fk` FOREIGN KEY (`source_evidence_id`) REFERENCES `evidence_ledger`(`id`) ON DELETE SET NULL,
  CONSTRAINT `atlas_entities_created_by_fk` FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--> statement-breakpoint
CREATE INDEX `atlas_entities_status_visibility_idx` ON `atlas_entities` (`status`,`visibility`,`updated_at`);
--> statement-breakpoint
CREATE INDEX `atlas_entities_kind_idx` ON `atlas_entities` (`kind`,`status`);
--> statement-breakpoint
CREATE INDEX `atlas_entities_evidence_idx` ON `atlas_entities` (`source_evidence_id`);
--> statement-breakpoint
CREATE TABLE `atlas_relationships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `source_entity_id` int NOT NULL,
  `target_entity_id` int NOT NULL,
  `relation_type` varchar(96) NOT NULL,
  `description` text,
  `visibility` enum('PUBLIC','PRIVATE') NOT NULL DEFAULT 'PRIVATE',
  `status` enum('DRAFT','PUBLISHED','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
  `provenance` enum('SOURCE_LINKED','OWNER_REPORTED','UNVERIFIED') NOT NULL DEFAULT 'UNVERIFIED',
  `source_label` varchar(255),
  `source_url` varchar(1024),
  `source_evidence_id` int,
  `created_by_user_id` int,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `atlas_relationships_id` PRIMARY KEY(`id`),
  CONSTRAINT `atlas_relationships_source_fk` FOREIGN KEY (`source_entity_id`) REFERENCES `atlas_entities`(`id`) ON DELETE CASCADE,
  CONSTRAINT `atlas_relationships_target_fk` FOREIGN KEY (`target_entity_id`) REFERENCES `atlas_entities`(`id`) ON DELETE CASCADE,
  CONSTRAINT `atlas_relationships_evidence_fk` FOREIGN KEY (`source_evidence_id`) REFERENCES `evidence_ledger`(`id`) ON DELETE SET NULL,
  CONSTRAINT `atlas_relationships_created_by_fk` FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--> statement-breakpoint
CREATE INDEX `atlas_relationships_source_idx` ON `atlas_relationships` (`source_entity_id`,`status`,`visibility`);
--> statement-breakpoint
CREATE INDEX `atlas_relationships_target_idx` ON `atlas_relationships` (`target_entity_id`,`status`,`visibility`);
--> statement-breakpoint
CREATE INDEX `atlas_relationships_evidence_idx` ON `atlas_relationships` (`source_evidence_id`);

--> statement-breakpoint
CREATE UNIQUE INDEX `atlas_relationships_edge_unique` ON `atlas_relationships` (`source_entity_id`,`target_entity_id`,`relation_type`);
