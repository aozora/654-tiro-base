import { ChevronRight } from 'lucide-react';
import { data, Link } from 'react-router';
import Header from '@/components/Header';
import Main from '@/components/Main';
import PageTitle from '@/components/PageTitle';
import PlayerProfile from '@/components/PlayerProfile';
import { Button } from '@/components/ui/button';
import type { Tournament } from '@/lib/database/schema';
import { pluralizePoints } from '@/lib/helpers';
import {
	getPlayerById,
	getPlayerStats,
	getTournament,
	type PlayerStats,
} from '@/lib/repository';
import { cn } from '@/lib/utils';
import type { Route } from './+types/route';

export async function loader({ params }: Route.LoaderArgs) {
	const { tournamentId, playerId } = params;

	const player = await getPlayerById(playerId);
	const tournament: Tournament = await getTournament(tournamentId);
	const stats: PlayerStats = await getPlayerStats(tournamentId, playerId);

	return data({
		player,
		tournament,
		stats,
	});
}

export default function TournamentPlayerMatchesPage({
	loaderData,
}: Route.ComponentProps) {
	const { player, tournament, stats } = loaderData;

	return (
		<div className={cn('relative min-h-screen')}>
			<img
				src="/img/risiko-challenge-tabellone.webp"
				className="-z-1 absolute top-0 left-0 h-full w-full object-cover blur-xs"
				alt=""
			/>

			<Header tournament={tournament} />

			<Main className="user-page">
				<div className="matches flex flex-col">
					<PageTitle
						title={`Profilo di ${player.name}`}
						showBackButton={true}
					/>

					<PlayerProfile player={player} stats={stats} />

					<div className="chart">
						{/*<LayerCake*/}
						{/*	padding={{ top: 8, right: 10, bottom: 20, left: 25 }}*/}
						{/*	x="x"*/}
						{/*	y="y"*/}
						{/*	yDomain={[0, null]}*/}
						{/*	data={points}*/}
						{/*>*/}
						{/*	<Svg>*/}
						{/*		<AxisX ticks={4} format={d => `${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(d)}`} />*/}
						{/*		<AxisY ticks={4} />*/}
						{/*		<Line stroke="#fff" />*/}
						{/*		<Area fill="#1a479550" />*/}
						{/*	</Svg>*/}
						{/*</LayerCake>*/}
					</div>

					<div className="matches-wrapper mx-auto w-full max-w-3xl">
						<h2 className="h-20 w-full text-center text-2xl">Partite:</h2>
						<ul className="flex flex-col gap-5">
							{stats.matchesDatesAndPoints?.map((match) => (
								<li key={match.matchId} className="h-12">
									<Button
										asChild
										variant="secondary"
										className="h-12 w-full bg-indigo-500 hover:bg-indigo-700"
									>
										<Link to={`/matches/${tournament.id}/${match.matchId}`}>
											<span>
												{new Intl.DateTimeFormat('it', {
													dateStyle: 'short',
												}).format(match.date)}
											</span>
											<span className="points">
												{pluralizePoints(match.points)}
											</span>
											<ChevronRight size="24" />
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
