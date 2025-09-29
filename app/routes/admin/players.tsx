import type { Route } from './+types/players';

export async function loader({ request, params }: Route.LoaderArgs) {
}

export default async function AdminPlayersPage({ loaderData }: Route.ComponentProps) {
	return null;
}