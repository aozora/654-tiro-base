import type { Route } from './+types/matches.$tournamentId';

export async function loader({ request, params }: Route.LoaderArgs) {
}

export default async function MatchesPage({ loaderData }: Route.ComponentProps) {
	return null;
}