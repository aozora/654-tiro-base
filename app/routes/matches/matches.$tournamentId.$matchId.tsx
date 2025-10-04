import { ChevronRight } from 'lucide-react';
import { data, Link } from 'react-router';
import Header from '@/components/Header';
import Main from '@/components/Main';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import type { Match, Tournament } from '@/lib/database/schema';
import { pluralizePoints } from '@/lib/helpers';
import {
	getMatch,
	getMatchPlayers,
	getTournament,
	type PlayerExtended,
} from '@/lib/repository';
import type { PlayerLeaderboardWithNormalizedRanking } from '@/lib/types';
import { cn } from '@/lib/utils';
import type { Route } from './+types/matches.$tournamentId.$matchId';

function sortPointsDesc(a: PlayerExtended, b: PlayerExtended) {
	if (a.points > b.points) {
		return -1;
	} else if (a.points < b.points) {
		return 1;
	}

	// a must be equal to b
	return 0;
}

function normalizeLeaderboardRanking(
	sortedLeaderboard: Array<PlayerExtended>,
): Array<PlayerLeaderboardWithNormalizedRanking> {
	const list: Array<PlayerLeaderboardWithNormalizedRanking> = [];
	let previousRank = 0;
	let previousPoints = 0;

	for (let index = 0; index < sortedLeaderboard.length; index++) {
		const current = sortedLeaderboard[index];
		let currentRank = 0;
		if (current.points === previousPoints) {
			currentRank = previousRank;
		} else {
			currentRank = previousRank + 1;
			previousRank += 1;
		}

		// console.log(current.sumPoints, previousPoints, previousRank, currentRank);
		list.push({
			playerId: current.id,
			name: current.name,
			picture: current.picture,
			sumPoints: current.points,
			rank: currentRank,
		} as PlayerLeaderboardWithNormalizedRanking);

		previousPoints = current.points;
	}

	return list;
}

export async function loader({ params }: Route.LoaderArgs) {
	const { tournamentId, matchId } = params;
	const tournament: Tournament = await getTournament(tournamentId);
	const match: Match = await getMatch(matchId);
	const matchPlayers: Array<PlayerExtended> = await getMatchPlayers(matchId);

	return data({
		tournament,
		match,
		matchPlayers: normalizeLeaderboardRanking(
			matchPlayers.sort(sortPointsDesc),
		),
	});
}

export default function TournamentMatchPage({
	loaderData,
}: Route.ComponentProps) {
	const { tournament, match, matchPlayers } = loaderData;

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
					<PageTitle
						title={`Partita del ${new Intl.DateTimeFormat('it', { dateStyle: 'short' }).format(match.date)}`}
						showBackButton={true}
					/>

					<div className="matches-wrapper mx-auto w-full max-w-3xl">
						<ul className="flex flex-col gap-5">
							{matchPlayers?.map((player) => (
								<li key={player.playerId} className="h-12">
									<Button asChild variant="ghost" className="">
										<div className="h-12 w-full">
											<span>{player.rank}</span>
											<span>{player.name}</span>
											<span className="points">
												{pluralizePoints(player.sumPoints)}
											</span>
										</div>
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
