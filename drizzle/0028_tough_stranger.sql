CREATE TABLE `atlantis_catalog_skus` (
	`sku` varchar(96) NOT NULL,
	`set_number` tinyint NOT NULL,
	`title` varchar(255) NOT NULL,
	`manufacturer_id` int,
	`impact_recipient_id` int,
	`base_cost_cents` int,
	`retail_price_cents` int,
	`tax_classification` varchar(128),
	`fulfillment_center` varchar(255),
	`refund_policy_url` varchar(2048),
	`production_status` enum('DRAFT','APPROVED','BLOCKED') NOT NULL DEFAULT 'DRAFT',
	`review_notes` text,
	`reviewed_by_user_id` int,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `atlantis_catalog_skus_sku` PRIMARY KEY(`sku`)
);
--> statement-breakpoint
CREATE TABLE `catalog_asset_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sku` varchar(96) NOT NULL,
	`asset_kind` enum('HERO','DETAIL','ON_BODY') NOT NULL,
	`storage_key` varchar(1024) NOT NULL,
	`asset_url` varchar(2048) NOT NULL,
	`review_status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
	`review_notes` text,
	`uploaded_by_user_id` int NOT NULL,
	`reviewed_by_user_id` int,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `catalog_asset_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `catalog_manufacturers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`supplier_name` varchar(255) NOT NULL,
	`legal_entity_name` varchar(255),
	`country_code` varchar(8),
	`facility_address` varchar(1000),
	`agreement_url` varchar(2048),
	`sample_evidence_url` varchar(2048),
	`compliance_status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
	`review_notes` text,
	`reviewed_by_user_id` int,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalog_manufacturers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commerce_activation_configs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`catalog_key` varchar(96) NOT NULL,
	`shopify_authorized` boolean NOT NULL DEFAULT false,
	`shopify_shop_domain` varchar(255),
	`tax_policy_url` varchar(2048),
	`shipping_policy_url` varchar(2048),
	`refund_policy_url` varchar(2048),
	`customer_support_email` varchar(320),
	`impact_disclosure_url` varchar(2048),
	`activation_status` enum('LOCKED','READY','ACTIVE') NOT NULL DEFAULT 'LOCKED',
	`updated_by_user_id` int,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `commerce_activation_configs_id` PRIMARY KEY(`id`),
	CONSTRAINT `commerce_activation_configs_catalog_key_unique` UNIQUE(`catalog_key`)
);
--> statement-breakpoint
CREATE TABLE `impact_recipients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`display_name` varchar(255) NOT NULL,
	`agreement_url` varchar(2048),
	`payment_destination` varchar(512),
	`allocation_basis_points` int NOT NULL DEFAULT 0,
	`status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
	`review_notes` text,
	`reviewed_by_user_id` int,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `impact_recipients_id` PRIMARY KEY(`id`)
);
