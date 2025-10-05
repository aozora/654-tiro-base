import type { Route } from './+types/index';

export async function loader({ request, params }: Route.LoaderArgs) {}

export default async function AdminRootPage({
	loaderData,
}: Route.ComponentProps) {
	return null;
}
