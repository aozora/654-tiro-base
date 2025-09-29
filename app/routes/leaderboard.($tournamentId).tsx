import { data, redirect } from 'react-router';
import Header from '@/components/Header';
import LeaderboardComponent from '@/components/leaderboard/Leaderboard';
import Main from '@/components/Main';
import PageTitle from '@/components/PageTitle';
import TopThree from '@/components/TopThree';
import { isUserAuthenticated } from '@/lib/auth';
import type { Player, Tournament } from '@/lib/database/schema';
import { sortPointsDesc } from '@/lib/helpers';
import {
	getActiveTournament,
	getLeaderboard,
	getPlayers,
	getTournament,
} from '@/lib/repository';
import type {
	PlayerLeaderboard,
	PlayerLeaderboardWithNormalizedRanking,
} from '@/lib/types';
import type { Route } from './+types/leaderboard.($tournamentId)';

function normalizeLeaderboardRanking(
	sortedLeaderboard: Array<PlayerLeaderboard>,
): Array<PlayerLeaderboardWithNormalizedRanking> {
	const list: Array<PlayerLeaderboardWithNormalizedRanking> = [];
	let previousRank = 0;
	let previousPoints = 0;

	for (let index = 0; index < sortedLeaderboard.length; index++) {
		const current = sortedLeaderboard[index];
		let currentRank = 0;
		if (current.sumPoints === previousPoints) {
			currentRank = previousRank;
		} else {
			currentRank = previousRank + 1;
			previousRank += 1;
		}

		// console.log(current.sumPoints, previousPoints, previousRank, currentRank);
		list.push({
			...current,
			rank: currentRank,
		} as PlayerLeaderboardWithNormalizedRanking);

		previousPoints = current.sumPoints;
	}

	return list;
}

export async function loader({ request, params }: Route.LoaderArgs) {
	const user = await isUserAuthenticated(request);
	if (!user) {
		console.log(`🍄 loader: user not authenticated, redirect to signin...`);
		return redirect('/signin');
	}

	let tournament: Tournament;
	if (params.tournamentId) {
		tournament = await getTournament(String(params.tournamentId));
	} else {
		tournament = await getActiveTournament();
	}

	const players: Array<Player> = await getPlayers();

	if (!tournament) {
		throw data('Tournament not found', { status: 500 });
	}

	const leaderboardData = await getLeaderboard(tournament.id);

	const leaderboard: Array<PlayerLeaderboard> = leaderboardData
		.map((x: { playerId: string; totalPoints: number }) => {
			const player = players.find((p) => p.id === x.playerId);

			return {
				playerId: x.playerId,
				name: player?.name || '',
				picture: player?.picture || '',
				sumPoints: x.totalPoints || 0,
			} satisfies PlayerLeaderboard;
		})
		.sort(sortPointsDesc);

	return {
		user,
		tournament,
		leaderboard: normalizeLeaderboardRanking(leaderboard),
	};
}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
	const { tournament, leaderboard } = loaderData;

	return (
		<>
			<Header tournament={tournament} />

			<Main>
				<PageTitle title="Classifica" />

				<TopThree leaderboard={leaderboard} />

				<LeaderboardComponent
					tournament={tournament}
					leaderboard={leaderboard}
				/>
			</Main>
		</>
	);
}
