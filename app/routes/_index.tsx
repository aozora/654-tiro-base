import { auth } from '@/lib/auth'; // Adjust the path as necessary
import type { Route } from './+types/home';

export async function loader({ params }: Route.LoaderArgs) {
	auth.api.
}

export default function Home() {
	return <div>ciao!</div>;
}
