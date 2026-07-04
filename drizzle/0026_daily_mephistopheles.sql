CREATE TABLE `chess_matches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`challenger_id` int NOT NULL,
	`opponent_id` int NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`wager_amount` int NOT NULL DEFAULT 0,
	`wager_tier` varchar(20) NOT NULL DEFAULT 'none',
	`board_state` text,
	`current_turn` varchar(10) NOT NULL DEFAULT 'white',
	`challenger_color` varchar(10) NOT NULL DEFAULT 'white',
	`winner_id` int,
	`move_history` text,
	`created_at` bigint NOT NULL DEFAULT 0,
	`updated_at` bigint NOT NULL DEFAULT 0,
	CONSTRAINT `chess_matches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chess_wager_escrow` (
	`id` int AUTO_INCREMENT NOT NULL,
	`match_id` int NOT NULL,
	`user_id` int NOT NULL,
	`amount` int NOT NULL DEFAULT 0,
	`status` varchar(20) NOT NULL DEFAULT 'held',
	`created_at` bigint NOT NULL DEFAULT 0,
	CONSTRAINT `chess_wager_escrow_id` PRIMARY KEY(`id`)
);
