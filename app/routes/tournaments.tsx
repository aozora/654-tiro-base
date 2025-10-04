import { ChevronRight } from 'lucide-react';
import { Link, redirect } from 'react-router';
import Header from '@/components/Header';
import Main from '@/components/Main';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { isUserAuthenticated } from '@/lib/auth';
import type { Match, Tournament } from '@/lib/database/schema';
import { getTournaments } from '@/lib/repository';
import { cn } from '@/lib/utils';
import type { Route } from './+types/tournaments';

export async function loader({ request, params }: Route.LoaderArgs) {
	const user = await isUserAuthenticated(request);
	if (!user) {
		return redirect('/signin');
	}

	const tournaments: Array<Tournament & { matches: Match[] }> =
		await getTournaments();

	return {
		tournaments,
	};
}

export default function TournamentsPage({ loaderData }: Route.ComponentProps) {
	const { tournaments } = loaderData;

	const activeTournament = tournaments.find((t) => t.isActive);
	const otherTournaments: Array<
		Tournament & {
			matches: Match[];
		}
	> = tournaments.filter((t) => t.id !== activeTournament?.id);

	return (
		<div className={cn('relative min-h-screen')}>
			<img
				src="/img/risiko-challenge-tabellone.webp"
				className="-z-1 absolute top-0 left-0 h-full w-full object-cover blur-xs"
				alt=""
			/>

			<Header />

			<Main>
				<div className="flex flex-col">
					<PageTitle title="Tornei" />
					<h2>Torneo attuale:</h2>

					{activeTournament && (
						<ul className="flex w-full flex-col items-center gap-4">
							<li className="h-12">
								<Button
									asChild
									variant="secondary"
									className="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
								>
									<Link to={`/leaderboard/${activeTournament.id}`}>
										<strong>{activeTournament.title}</strong>
										<ChevronRight size={24} />
									</Link>
								</Button>
							</li>
						</ul>
					)}

					{!activeTournament && <p>Non c'è un torneo attivo</p>}

					<h2>Tornei precedenti:</h2>
					{otherTournaments && otherTournaments.length > 0 && (
						<ul className="flex w-full flex-col items-center gap-4">
							{otherTournaments.map((t) => (
								<li key={t.id} className="h-12">
									<Button
										asChild
										variant="secondary"
										className="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
									>
										<Link to={`/leaderboard/${t.id}`}>
											<strong>{t.title}</strong>
											<ChevronRight size={24} />
										</Link>
									</Button>
								</li>
							))}
						</ul>
					)}

					{!otherTournaments ||
						(otherTournaments.length === 0 && <p>Non ci sono altri tornei.</p>)}
				</div>
			</Main>
		</div>
	);
}
