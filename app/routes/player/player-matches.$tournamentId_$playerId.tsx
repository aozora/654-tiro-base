import type { Route } from './+types/player-matches.$tournamentId_$playerId';

export async function loader({ request, params }: Route.LoaderArgs) {}

export default function TournamentPlayerMatchesPage({
	loaderData,
}: Route.ComponentProps) {
	return null;
}
