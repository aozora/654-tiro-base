import type { Route } from './+types/matches.$tournamentId.$matchId';

export async function loader({ request, params }: Route.LoaderArgs) {
}

export default async function TournamentMatchPage({ loaderData }: Route.ComponentProps) {
	return null;
}