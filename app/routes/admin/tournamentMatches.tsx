import type { Route } from './+types/tournamentMatches';

export async function loader({ request, params }: Route.LoaderArgs) {}

export default async function AdminTournamentMatchPage({
	loaderData,
}: Route.ComponentProps) {
	return null;
}
