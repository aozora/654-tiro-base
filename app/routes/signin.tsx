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
		console.log(`loader: redirect to leaderboard`);
		return redirect('/leaderboard');
	}

	return {};
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	// let title = formData.get("title");

	if (!formData) {
		console.error('error');
	}

	console.log(`action: redirect to leaderboard`);
	return redirect('/leaderboard');
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
