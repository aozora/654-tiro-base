-- Create better-auth tables manually to avoid naming conflicts
-- This will be run directly on the database

CREATE TABLE IF NOT EXISTS "better_auth_user" (
    "id" text PRIMARY KEY NOT NULL,
    "email" text NOT NULL UNIQUE,
    "emailVerified" boolean DEFAULT false NOT NULL,
    "name" text,
    "image" text,
    "createdAt" timestamp NOT NULL,
    "updatedAt" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "better_auth_session" (
    "id" text PRIMARY KEY NOT NULL,
    "expiresAt" timestamp NOT NULL,
    "token" text NOT NULL UNIQUE,
    "createdAt" timestamp NOT NULL,
    "updatedAt" timestamp NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "userId" text NOT NULL REFERENCES "better_auth_user"("id")
);

CREATE TABLE IF NOT EXISTS "better_auth_account" (
    "id" text PRIMARY KEY NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "userId" text NOT NULL REFERENCES "better_auth_user"("id"),
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" timestamp,
    "refreshTokenExpiresAt" timestamp,
    "scope" text,
    "password" text,
    "createdAt" timestamp NOT NULL,
    "updatedAt" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "better_auth_verification" (
    "id" text PRIMARY KEY NOT NULL,
    "identifier" text NOT NULL,
    "value" text NOT NULL,
    "expiresAt" timestamp NOT NULL,
    "createdAt" timestamp,
    "updatedAt" timestamp
);
