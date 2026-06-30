CREATE TABLE `zernio_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`raw_caption` text NOT NULL,
	`full_caption` text NOT NULL,
	`platforms` text NOT NULL DEFAULT ('[]'),
	`media_url` varchar(1024),
	`scheduled_at` timestamp,
	`status` varchar(32) NOT NULL DEFAULT 'draft',
	`hashtags` text NOT NULL DEFAULT ('[]'),
	`cta_url` varchar(255) NOT NULL DEFAULT 'scrollverse.co/link',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `zernio_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `zernio_posts` ADD CONSTRAINT `zernio_posts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;