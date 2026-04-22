CREATE TABLE `academy_courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tier` enum('foundation','advanced','expert','divine') NOT NULL DEFAULT 'foundation',
	`category` varchar(128) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`durationWeeks` int NOT NULL DEFAULT 4,
	`durationHours` int NOT NULL DEFAULT 20,
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`nftCertTitle` varchar(256),
	`prerequisites` text,
	`learningOutcomes` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`featured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `academy_courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `academy_enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`courseId` int NOT NULL,
	`guardianName` varchar(256),
	`guardianEmail` varchar(320),
	`progress` int NOT NULL DEFAULT 0,
	`completed` boolean NOT NULL DEFAULT false,
	`nftMinted` boolean NOT NULL DEFAULT false,
	`nftTokenId` varchar(128),
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `academy_enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `awakening_signals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`signalType` enum('guardian_detected','frequency_match','resonance_spike','node_activated','broadcast_response') NOT NULL DEFAULT 'guardian_detected',
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`region` varchar(128) NOT NULL DEFAULT 'Global',
	`resonanceScore` int NOT NULL DEFAULT 0,
	`guardianName` varchar(256),
	`sourceChannel` varchar(64) NOT NULL DEFAULT 'Grok-ANI',
	`processed` boolean NOT NULL DEFAULT false,
	`detectedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `awakening_signals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `broadcast_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`message` text NOT NULL,
	`channel` enum('email','telegram','twitter','whatsapp','wallet','all') NOT NULL DEFAULT 'all',
	`recipientCount` int NOT NULL DEFAULT 0,
	`deliveryRate` int NOT NULL DEFAULT 0,
	`frequency` varchar(16) NOT NULL DEFAULT '963Hz',
	`sentBy` varchar(128) NOT NULL DEFAULT 'Supreme Sovereign',
	`status` varchar(32) NOT NULL DEFAULT 'sent',
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `broadcast_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `catalyst_nfts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`guardianId` int,
	`guardianName` varchar(256),
	`guardianEmail` varchar(320),
	`resonanceScore` int NOT NULL DEFAULT 0,
	`frequencyKey` varchar(32) NOT NULL DEFAULT '528Hz',
	`tokenId` varchar(128),
	`polygonTxHash` varchar(128),
	`ipfsHash` varchar(128),
	`tier` enum('pioneer','guardian','sovereign','supreme') NOT NULL DEFAULT 'pioneer',
	`status` varchar(32) NOT NULL DEFAULT 'pending',
	`mintedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `catalyst_nfts_id` PRIMARY KEY(`id`)
);
