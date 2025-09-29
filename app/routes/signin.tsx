import { redirect } from 'react-router';
import { LoginForm } from '@/components/auth/LoginForm';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import type { Route } from './+types/signin';

export async function loader({ request }: Route.LoaderArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (session?.user) {
		return redirect('/leaderboard');
	}

	return {};
}

export default function SignIn() {
	return (
		<div
			className={cn(
				'flex h-full min-h-screen w-full items-center justify-center',
				'bg-[url("/img/frame6.webp")] bg-cover bg-position-[60%_100%] bg-no-repeat',
			)}
		>
			<LoginForm className="mx-auto max-w-7xl" />
		</div>
	);
}
