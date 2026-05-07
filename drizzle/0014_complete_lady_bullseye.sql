CREATE TABLE `book_of_life_mints` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`walletAddress` varchar(128),
	`guardianTier` enum('guardian','sovereign','ascendant') NOT NULL DEFAULT 'guardian',
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`tokenId` varchar(128),
	`polygonTxHash` varchar(128),
	`ipfsHash` varchar(128),
	`stripePaymentIntentId` varchar(128),
	`mintStatus` enum('pending','paid','minting','minted','failed') NOT NULL DEFAULT 'pending',
	`mintedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `book_of_life_mints_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `family_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`memberId` int NOT NULL,
	`type` enum('zakat','londc_send','londc_receive','nft_mint','royalty','guardian_fee') NOT NULL DEFAULT 'londc_receive',
	`amountLondc` int NOT NULL DEFAULT 0,
	`txHash` varchar(128),
	`note` text,
	`status` varchar(32) NOT NULL DEFAULT 'confirmed',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `family_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `family_wallets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`member` varchar(64) NOT NULL,
	`role` varchar(128) NOT NULL,
	`walletAddress` varchar(128),
	`londcBalance` int NOT NULL DEFAULT 0,
	`nftTier` varchar(64) NOT NULL DEFAULT 'Sovereign',
	`qfsStatus` varchar(32) NOT NULL DEFAULT 'ACTIVE',
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `family_wallets_id` PRIMARY KEY(`id`),
	CONSTRAINT `family_wallets_member_unique` UNIQUE(`member`)
);
