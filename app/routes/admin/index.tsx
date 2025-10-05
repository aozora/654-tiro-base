import { ChevronRight } from 'lucide-react';
import { data, Link, redirect } from 'react-router';
import AdminPageTitle from '@/components/AdminPageTitle';
import Header from '@/components/Header';
import Main from '@/components/Main';
import { Button } from '@/components/ui/button';
import { isUserAuthenticated } from '@/lib/auth';
import { cn } from '@/lib/utils';
import type { Route } from './+types/index';

export async function loader({ request }: Route.LoaderArgs) {
	const user = await isUserAuthenticated(request);
	if (!user) {
		console.log(`🍄 loader: user not authenticated, redirect to signin...`);
		return redirect('/signin');
	}

	return data({ user });
}

export default function AdminRootPage({ loaderData }: Route.ComponentProps) {
	return (
		<div className={cn('relative min-h-screen')}>
			<Header />

			<AdminPageTitle title="Gestione 654" />

			<Main className="flex flex-col pb-10">
				<div className="mx-auto w-full max-w-3xl">
					<ul className="flex flex-col gap-4">
						<li className="h-12">
							<Button
								asChild
								variant="secondary"
								className="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
							>
								<Link to="/admin/tournaments">
									<span>Gestione tornei</span>
									<ChevronRight size={24} />
								</Link>
							</Button>
						</li>
						<li className="h-12">
							<Button
								asChild
								variant="secondary"
								className="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
							>
								<Link
									to="/admin/players"
									className="flex items-center justify-between"
								>
									<span>Gestione giocatori</span>
									<ChevronRight size={24} />
								</Link>
							</Button>
						</li>
					</ul>
				</div>
			</Main>
		</div>
	);
}
