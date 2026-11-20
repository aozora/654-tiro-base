-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Match` (
	`id` text NOT NULL,
	`date` integer NOT NULL,
	`tournamentId` text NOT NULL,
	CONSTRAINT `Match_pk` PRIMARY KEY(`id`),
	CONSTRAINT `fk_Match_tournamentId_Tournament_id_fk` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`)
);
--> statement-breakpoint
CREATE TABLE `Player` (
	`id` text NOT NULL,
	`name` text NOT NULL,
	`picture` text,
	`isActive` integer DEFAULT true NOT NULL,
	`isDeleted` integer DEFAULT false NOT NULL,
	CONSTRAINT `Player_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `PlayersOnMatches` (
	`playerId` text NOT NULL,
	`matchId` text NOT NULL,
	`points` integer NOT NULL,
	`territoriesPoints` integer DEFAULT 0 NOT NULL,
	CONSTRAINT `PlayersOnMatches_pk` PRIMARY KEY(`playerId`, `matchId`),
	CONSTRAINT `fk_PlayersOnMatches_matchId_Match_id_fk` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON UPDATE CASCADE,
	CONSTRAINT `fk_PlayersOnMatches_playerId_Player_id_fk` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON UPDATE CASCADE
);
--> statement-breakpoint
CREATE TABLE `Tournament` (
	`id` text NOT NULL,
	`title` text NOT NULL,
	`isActive` integer DEFAULT true NOT NULL,
	CONSTRAINT `Tournament_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `account` (
	`id` text NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `account_pk` PRIMARY KEY(`id`),
	CONSTRAINT `fk_account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	`impersonated_by` text,
	CONSTRAINT `session_pk` PRIMARY KEY(`id`),
	CONSTRAINT `fk_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer DEFAULT current_timestamp NOT NULL,
	`role` text DEFAULT 'user',
	`banned` integer DEFAULT false,
	`ban_reason` text,
	`ban_expires` integer,
	CONSTRAINT `user_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer DEFAULT current_timestamp NOT NULL,
	CONSTRAINT `verification_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);
*/