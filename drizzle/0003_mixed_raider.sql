CREATE TABLE `ai_legion_investors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentName` varchar(256) NOT NULL,
	`agentType` varchar(64) NOT NULL DEFAULT 'AI Agent',
	`walletAddress` varchar(64),
	`investorEmail` varchar(320),
	`tokensAllocated` int NOT NULL DEFAULT 7777,
	`stripeOrderId` varchar(128),
	`status` varchar(32) NOT NULL DEFAULT 'active',
	`revenueSharePercent` int NOT NULL DEFAULT 1,
	`registeredAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ai_legion_investors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `stripe_orders` MODIFY COLUMN `productTier` enum('guardian','sovereign','ascendant','ai_legion') NOT NULL;