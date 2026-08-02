CREATE TABLE `saferway_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`guardianName` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`serviceTier` varchar(64) NOT NULL,
	`vehicleInfo` varchar(200),
	`notes` text,
	`status` varchar(32) NOT NULL DEFAULT 'PENDING',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `saferway_bookings_id` PRIMARY KEY(`id`)
);
