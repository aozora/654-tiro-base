# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs on http://localhost:5173)
- **Build for production**: `npm run build`
- **Type checking**: `npm run typecheck` (runs React Router typegen + tsc)
- **Database seeding**: `npm run seed`
- **Start production server**: `npm run start`

## Code Quality & Linting

This project uses **oxlint** for linting and **oxfmt** for formatting:
- Tab indentation and single quotes (configured in `.oxfmtrc.json`)
- Import sorting and Tailwind class sorting via oxfmt
- Svelte files are formatted by oxfmt (`svelte: true`); oxlint checks their script blocks

Run commands manually if needed:
- Format: `pnpm format`
- Format check: `pnpm format:check`
- Lint: `pnpm lint`
- Lint with fixes: `pnpm lint:fix`

## Architecture Overview

**Framework**: SvelteKit with server-side rendering (SSR) enabled by default

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