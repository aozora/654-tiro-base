import { data, redirect } from 'react-router';
import LeaderboardComponent from '@/components/leaderboard/Leaderboard';
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
	console.log(`🍄🍄🍄 DEBUG leaderboardData: `, leaderboardData);
	console.log(`🍄🍄🍄 DEBUG tournament.id: `, tournament.id);

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
		<div>
			<LeaderboardComponent tournament={tournament} leaderboard={leaderboard} />
		</div>
	);
}
