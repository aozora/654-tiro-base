import type { PageServerLoad } from './$types';
import {
	getMatch,
	getMatchPlayers,
	getTournament,
	type PlayerExtended
} from '$lib/server/repository';
import type { Match, Tournament } from '@prisma/client';

function sortPointsDesc(a: PlayerExtended, b: PlayerExtended) {
	if (a.points > b.points) {
		return -1;
	} else if (a.points < b.points) {
		return 1;
	}

	// a must be equal to b
	return 0;
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
		matchPlayers: matchPlayers.sort(sortPointsDesc)
	};
};
