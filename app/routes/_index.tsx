import { redirect } from 'react-router';
import { isUserAuthenticated } from '@/lib/auth';
import type { Route } from './+types/_index';

export async function loader({ request }: Route.LoaderArgs) {
	const user = await isUserAuthenticated(request);

	if (!user) {
		return redirect('/signin');
	}

	return redirect('/leaderboard');
}

export default function Home() {
	return <div>ciao!</div>;
}
