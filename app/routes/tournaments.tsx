import { ChevronRight } from 'lucide-react';
import { Link, redirect } from 'react-router';
import Main from '@/components/Main';
import PageTitle from '@/components/PageTitle';
import { isUserAuthenticated } from '@/lib/auth';
import type { Match, Tournament } from '@/lib/database/schema';
import { getTournaments } from '@/lib/repository';
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

	const activeTournament: Tournament & { matches: Match[] } = tournaments.find(
		(t) => t.isActive,
	);
	const otherTournaments: Array<
		Tournament & {
			matches: Match[];
		}
	> = tournaments.filter((t) => t.id !== activeTournament?.id);

	return (
		<Main>
			<div className="flex flex-col">
				<PageTitle title="Tornei" />
				<h2>Torneo attuale:</h2>

				{activeTournament && (
					<ul className="flex w-full flex-col items-center gap-4">
						<li>
							<Link to={`/leaderboard/${activeTournament.id}`}>
								<strong>{activeTournament.title}</strong>
								<ChevronRight size={24} />
							</Link>
						</li>
					</ul>
				)}

				{!activeTournament && <p>Non c'è un torneo attivo</p>}

				<h2>Tornei precedenti:</h2>
				{otherTournaments && otherTournaments.length > 0 && (
					<ul className="flex w-full flex-col items-center gap-4">
						{otherTournaments.map((t) => (
							<li key={t.id}>
								<Link to={`/leaderboard/${t.id}`}>
									<strong>{t.title}</strong>
									<ChevronRight size={24} />
								</Link>
							</li>
						))}
					</ul>
				)}

				{!otherTournaments ||
					(otherTournaments.length === 0 && <p>Non ci sono altri tornei.</p>)}
			</div>
		</Main>
	);
}
