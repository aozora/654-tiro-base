import type { Route } from './+types/tournaments';

export async function loader({ request, params }: Route.LoaderArgs) {}

export default async function AdminTournamentPage({
	loaderData,
}: Route.ComponentProps) {
	return null;
}
