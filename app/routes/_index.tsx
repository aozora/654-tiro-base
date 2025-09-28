import { redirect } from 'react-router';
import { auth } from '@/lib/auth';
import type { Route } from './+types/_index';

export async function loader({ request }: Route.LoaderArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session?.user) {
		return redirect('/signin');
	}

	return { user: session.user };
}

export default function Home() {
	return <div>ciao!</div>;
}
