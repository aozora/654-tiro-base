# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on http://localhost:5173)
- **Build for production**: `npm run build`
- **Type checking**: `npm run typecheck` (runs React Router typegen + tsc)
- **Database seeding**: `npm run seed`
- **Start production server**: `npm run start`

## Code Quality & Linting

This project uses **Biome** for formatting and linting:
- Tab indentation (configured in biome.json)
- Single quotes for JavaScript
- React domain rules enabled
- Auto-organize imports on save
- Sorted CSS classes rule enabled

Run Biome commands manually if needed:
- Format: `npx biome format --write .`
- Lint: `npx biome lint .`
- Check all: `npx biome check .`

## Architecture Overview

**Framework**: React Router v7 with server-side rendering (SSR) enabled by default

**Database**:
- Turso (SQLite) with Drizzle ORM
- Schema files: `app/lib/database/schema.ts` (main) and `app/lib/database/auth-schema.ts` (auth)
- Configuration: `drizzle.config.ts`

**Authentication**:
- Better-auth with email/password authentication
- Drizzle adapter for database integration
- Auth configuration: `app/lib/auth.ts`
- Client setup: `app/lib/auth-client.ts`

**UI Framework**:
- Tailwind CSS v4 with Radix UI components
- shadcn/ui component library configured
- Custom components in `app/components/ui/`

**Routing**:
- File-system based routing using `@react-router/fs-routes`
- Routes defined in `app/routes/` directory
- Route configuration: `app/routes.ts`

## Domain Model

This appears to be a tournament/match tracking application with the following core entities:

- **Players**: Participants with names, pictures, and active status
- **Tournaments**: Competition containers with titles
- **Matches**: Individual games within tournaments with timestamps
- **PlayersOnMatches**: Junction table tracking player participation and points per match

## Project Structure

```
app/
├── components/        # Reusable UI components (shadcn/ui)
├── lib/              # Core utilities and configurations
│   ├── database/     # Drizzle schemas and DB setup
│   ├── auth.ts       # Better-auth server configuration
│   ├── auth-client.ts# Better-auth client setup
│   └── utils.ts      # General utilities
├── routes/           # File-system based routes
├── styles/           # CSS files (Tailwind)
└── root.tsx          # Root layout component
```

## Environment Setup

Required environment variables (see `.env`):
- `DATABASE_URL`: Turso database URL
- `DATABASE_AUTH_TOKEN`: Turso authentication token

## Database Operations

- Migrations are handled by Drizzle Kit
- Seed script creates admin users and can be extended for test data
- Database client accessible via `app/lib/db.ts`