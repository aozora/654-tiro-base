CREATE TABLE `Match` (
	`id` text PRIMARY KEY NOT NULL,
	`date` integer NOT NULL,
	`tournamentId` text NOT NULL,
	FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Player` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`picture` text,
	`isActive` integer DEFAULT true NOT NULL,
	`isDeleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `PlayersOnMatches` (
	`playerId` text NOT NULL,
	`matchId` text NOT NULL,
	`points` integer NOT NULL,
	PRIMARY KEY(`playerId`, `matchId`),
	FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON UPDATE cascade ON DELETE no action,
	FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON UPDATE cascade ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Tournament` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`isActive` integer DEFAULT true NOT NULL
);
