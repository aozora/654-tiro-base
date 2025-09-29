import { redirect } from 'react-router';
import { auth } from '@/lib/auth';
import type { Route } from './+types/leaderboard.($tournamentId)';

export async function loader({ request }: Route.LoaderArgs) {
	await auth.api.signOut({
		headers: request.headers,
	});

	return redirect(`/signin`);
}

export async function action({ request }: Route.ActionArgs) {
	await auth.api.signOut({
		headers: request.headers,
	});

	return redirect(`/signin`);
}
