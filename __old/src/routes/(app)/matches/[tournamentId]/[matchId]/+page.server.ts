import type { PageServerLoad } from './$types';
import {
	getMatch,
	getMatchPlayers,
	getTournament,
	type PlayerExtended
} from '$lib/server/db/repository';
import type { Match, Tournament } from '$lib/server/db';
import type { PlayerLeaderboardWithNormalizedRanking } from '$types';

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
	sortedLeaderboard: Array<PlayerExtended>
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
			rank: currentRank
		} as PlayerLeaderboardWithNormalizedRanking);

		previousPoints = current.points;
	}

	return list;
}

/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	const { tournamentId, matchId } = params;

	const tournament: Tournament = await getTournament(tournamentId);
	const match: Match = await getMatch(matchId);
	const matchPlayers: Array<PlayerExtended> = await getMatchPlayers(matchId);

	return {
		tournament,
		match,
		matchPlayers: normalizeLeaderboardRanking(matchPlayers.sort(sortPointsDesc))
	};
};
