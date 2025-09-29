import type { Route } from './+types/route';

export async function loader({ request, params }: Route.LoaderArgs) {
}

export default async function AdminRootPage({ loaderData }: Route.ComponentProps) {
	return null;
}