CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`displayName` varchar(128) NOT NULL,
	`message` text NOT NULL,
	`channel` varchar(64) NOT NULL DEFAULT 'general',
	`frequency` varchar(16) NOT NULL DEFAULT '528Hz',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
