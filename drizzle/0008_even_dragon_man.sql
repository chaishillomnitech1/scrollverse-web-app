CREATE TABLE `bridge_status` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chainId` int NOT NULL,
	`chainName` varchar(64) NOT NULL,
	`healthScore` int NOT NULL DEFAULT 100,
	`syncPercent` int NOT NULL DEFAULT 100,
	`pendingTransfers` int NOT NULL DEFAULT 0,
	`completedTransfers` int NOT NULL DEFAULT 0,
	`totalVolumeLondc` int NOT NULL DEFAULT 0,
	`status` enum('online','degraded','offline') NOT NULL DEFAULT 'online',
	`lastSyncAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bridge_status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `frequency_activation_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`frequency` varchar(16) NOT NULL,
	`activatedBy` varchar(128) NOT NULL,
	`userId` int,
	`duration` int NOT NULL DEFAULT 60,
	`intention` text,
	`guardianCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `frequency_activation_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `governance_proposals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`proposalId` varchar(32) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`proposerName` varchar(128) NOT NULL,
	`proposerWallet` varchar(64),
	`userId` int,
	`votesFor` int NOT NULL DEFAULT 0,
	`votesAgainst` int NOT NULL DEFAULT 0,
	`votingPower` int NOT NULL DEFAULT 0,
	`status` enum('active','passed','rejected','pending') NOT NULL DEFAULT 'pending',
	`category` varchar(64) NOT NULL DEFAULT 'general',
	`endsAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `governance_proposals_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_proposals_proposalId_unique` UNIQUE(`proposalId`)
);
--> statement-breakpoint
CREATE TABLE `guardian_protocol_status` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activeGuardians` int NOT NULL DEFAULT 0,
	`threatsDetected` int NOT NULL DEFAULT 0,
	`threatsNeutralized` int NOT NULL DEFAULT 0,
	`protectionLevel` enum('standard','elevated','maximum','sovereign') NOT NULL DEFAULT 'sovereign',
	`aiStatus` varchar(32) NOT NULL DEFAULT 'ACTIVE',
	`frequencyShield` varchar(16) NOT NULL DEFAULT '963Hz',
	`uptime` int NOT NULL DEFAULT 100,
	`recordedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `guardian_protocol_status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `infrastructure_status` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activePods` int NOT NULL DEFAULT 10,
	`maxPods` int NOT NULL DEFAULT 1000,
	`redisOpsPerSec` int NOT NULL DEFAULT 0,
	`cdnEdgeLocations` int NOT NULL DEFAULT 200,
	`activeUsers` int NOT NULL DEFAULT 0,
	`targetUsers` int NOT NULL DEFAULT 50000000,
	`cpuPercent` int NOT NULL DEFAULT 0,
	`memoryPercent` int NOT NULL DEFAULT 0,
	`status` enum('optimal','scaling','degraded') NOT NULL DEFAULT 'optimal',
	`recordedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `infrastructure_status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nft_marketplace` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tokenId` int NOT NULL,
	`name` varchar(256) NOT NULL,
	`tier` enum('pioneer','guardian','sovereign','ascendant') NOT NULL,
	`ownerName` varchar(128),
	`ownerWallet` varchar(64),
	`userId` int,
	`priceUsd` int NOT NULL DEFAULT 0,
	`priceLondc` int NOT NULL DEFAULT 0,
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`imageUrl` varchar(512),
	`listed` boolean NOT NULL DEFAULT false,
	`mintedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `nft_marketplace_id` PRIMARY KEY(`id`),
	CONSTRAINT `nft_marketplace_tokenId_unique` UNIQUE(`tokenId`)
);
--> statement-breakpoint
CREATE TABLE `staking_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`walletAddress` varchar(64),
	`stakerName` varchar(128) NOT NULL,
	`tier` enum('guardian','sovereign','supreme') NOT NULL,
	`amountLondc` int NOT NULL,
	`apyPercent` int NOT NULL,
	`lockDays` int NOT NULL,
	`rewardsClaimed` int NOT NULL DEFAULT 0,
	`status` enum('active','completed','withdrawn') NOT NULL DEFAULT 'active',
	`stakedAt` timestamp NOT NULL DEFAULT (now()),
	`unlocksAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `staking_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `token_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`priceUsd` varchar(32) NOT NULL DEFAULT '0.0144',
	`change24h` varchar(16) NOT NULL DEFAULT '+7.77%',
	`marketCap` varchar(64) NOT NULL DEFAULT '$2.07M',
	`totalSupply` int NOT NULL DEFAULT 144000000,
	`circulatingSupply` int NOT NULL DEFAULT 0,
	`guardianCount` int NOT NULL DEFAULT 0,
	`totalStaked` int NOT NULL DEFAULT 0,
	`zakatDistributed` int NOT NULL DEFAULT 0,
	`recordedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `token_stats_id` PRIMARY KEY(`id`)
);
