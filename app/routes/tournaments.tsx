import Main from '@/components/Main';
import PageTitle from '@/components/PageTitle';
import type { Route } from './+types/tournaments';
import { isUserAuthenticated } from '@/lib/auth';
import { redirect } from 'react-router';
import { getTournaments } from '@/lib/repository';
import type { Match, Tournament } from '@/lib/database/schema';

export async function loader({ request, params }: Route.LoaderArgs) {
	const user = await isUserAuthenticated(request);
	if (!user) {
		return redirect('/signin');
	}

	const tournaments: Array<Tournament & { matches: Match[] }> = await getTournaments();

	return {
		tournaments
	};
}

export default function TournamentsPage({ loaderData }: Route.ComponentProps) {
	const { tournaments } = loaderData;

	const activeTournament: Tournament & { matches: Match[] } = tournaments.find(t => t.isActive);
	const otherTournaments: Array<Tournament & {
		matches: Match[]
	}> = tournaments.filter(t => t.id !== activeTournament?.id);

	return (
		<Main>
			<PageTitle title="Tornei" />
			<h2>Torneo attuale:</h2>

			{activeTournament && (
				<ul>
					<li>
						<a href={`/leaderboard/${activeTournament.id}`}>
							<strong>{activeTournament.title}</strong>
							{/*<ArrowCircleRight size="20" class="arrow" />*/}
						</a>
					</li>
				</ul>
			)}

			{!activeTournament && (
				<p>Non c'è un torneo attivo</p>
			)}

			<h2>Tornei precedenti:</h2>
			{otherTournaments && otherTournaments.length > 0 && (
				<ul>
					{otherTournaments.map(t => (
						<li>
							<a href={`/leaderboard/${t.id}`}>
								<strong>{t.title}</strong>
								{/*<ArrowCircleRight size="20" class="arrow" />*/}
							</a>
						</li>
					))}
				</ul>
			)}

			{!otherTournaments || otherTournaments.length === 0 && (
				<p>Non ci sono altri tornei.</p>
			)}
		</Main>
	);
}