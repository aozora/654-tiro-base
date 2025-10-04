import { ChevronRight } from 'lucide-react';
import { data, Link } from 'react-router';
import Header from '@/components/Header';
import Main from '@/components/Main';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import type { Match } from '@/lib/database/schema';
import { getMatches, getTournament } from '@/lib/repository';
import { cn } from '@/lib/utils';
import type { Route } from './+types/matches.$tournamentId';

export async function loader({ params }: Route.LoaderArgs) {
	const { tournamentId } = params;
	const tournament = await getTournament(String(tournamentId));
	const matches: Array<Match> = await getMatches(tournamentId);

	return data({
		tournament,
		matches,
	});
}

export default function MatchesPage({ loaderData }: Route.ComponentProps) {
	const { tournament, matches } = loaderData;

	return (
		<div className={cn('relative min-h-screen')}>
			<img
				src="/img/risiko-challenge-tabellone.webp"
				className="-z-1 absolute top-0 left-0 h-full w-full object-cover blur-xs"
				alt=""
			/>

			<Header tournament={tournament} />

			<Main className="matches-page">
				<div className="matches">
					<PageTitle title={`Cronologia partite`} showBackButton={true} />

					<div className="matches-wrapper mx-auto w-full max-w-3xl">
						<h2 className="h-12 w-full text-center">
							{matches.length} partite giocate.
						</h2>

						<ul className="flex flex-col gap-5">
							{matches?.map((match) => (
								<li key={match.id} className="h-12">
									<Button
										asChild
										variant="secondary"
										className="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
									>
										<Link
											to={`/matches/${tournament.id}/${match.id}`}
											className="flex items-center justify-between gap-4"
										>
											<strong>
												{new Intl.DateTimeFormat('it', {
													dateStyle: 'short',
												}).format(match.date)}
											</strong>
											<ChevronRight size={24} />
										</Link>
									</Button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Main>
		</div>
	);
}
