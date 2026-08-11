CREATE TABLE `fashion_lookboards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`creator_name` varchar(160) NOT NULL DEFAULT 'Guardian',
	`title` varchar(96) NOT NULL,
	`item_ids` json NOT NULL,
	`is_public` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fashion_lookboards_id` PRIMARY KEY(`id`)
);
