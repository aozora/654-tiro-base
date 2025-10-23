import { sqliteTable, AnySQLiteColumn, foreignKey, text, integer, primaryKey, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const match = sqliteTable("Match", {
	id: text().primaryKey().notNull(),
	date: integer().notNull(),
	tournamentId: text().notNull().references(() => tournament.id),
});

export const player = sqliteTable("Player", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	picture: text(),
	isActive: integer().default(true).notNull(),
	isDeleted: integer().default(false).notNull(),
});

export const playersOnMatches = sqliteTable("PlayersOnMatches", {
	playerId: text().notNull().references(() => player.id, { onUpdate: "cascade" } ),
	matchId: text().notNull().references(() => match.id, { onUpdate: "cascade" } ),
	points: integer().notNull(),
	territoriesPoints: integer().default(0).notNull(),
},
(table) => [
	primaryKey({ columns: [table.playerId, table.matchId], name: "PlayersOnMatches_playerId_matchId_pk"})
]);

export const tournament = sqliteTable("Tournament", {
	id: text().primaryKey().notNull(),
	title: text().notNull(),
	isActive: integer().default(true).notNull(),
});

export const account = sqliteTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at"),
	refreshTokenExpiresAt: integer("refresh_token_expires_at"),
	scope: text(),
	password: text(),
	createdAt: integer("created_at").default(sql`(current_timestamp)`).notNull(),
	updatedAt: integer("updated_at").notNull(),
});

export const session = sqliteTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: integer("expires_at").notNull(),
	token: text().notNull(),
	createdAt: integer("created_at").default(sql`(current_timestamp)`).notNull(),
	updatedAt: integer("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	impersonatedBy: text("impersonated_by"),
},
(table) => [
	uniqueIndex("session_token_unique").on(table.token),
]);

export const user = sqliteTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer("email_verified").default(false).notNull(),
	image: text(),
	createdAt: integer("created_at").default(sql`(current_timestamp)`).notNull(),
	updatedAt: integer("updated_at").default(sql`(current_timestamp)`).notNull(),
	role: text().default("user"),
	banned: integer().default(false),
	banReason: text("ban_reason"),
	banExpires: integer("ban_expires"),
},
(table) => [
	uniqueIndex("user_email_unique").on(table.email),
]);

export const verification = sqliteTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer("expires_at").notNull(),
	createdAt: integer("created_at").default(sql`(current_timestamp)`).notNull(),
	updatedAt: integer("updated_at").default(sql`(current_timestamp)`).notNull(),
});

