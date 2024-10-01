/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PageServerLoad } from './$types';
import type { Player, Tournament } from '@prisma/client';
import {
	getActiveTournament,
	getLeaderboard,
	getPlayers,
	getTournament
} from '$lib/server/repository';
import { error } from '@sveltejs/kit';
import type { PlayerLeaderboard } from '$types';
import { sortPointsDesc } from '$lib/helpers';


/**
 * Page Load
 */
export const load: PageServerLoad = async ({ params }) => {
	let tournament: Tournament;
	if (params.tournamentId) {
		tournament = await getTournament(String(params.tournamentId));
	} else {
		tournament = await getActiveTournament();
	}

	const players: Array<Player> = await getPlayers();

	if (!tournament) {
		error(500, 'Active tournament not found!');
	}

	const leaderboardData = await getLeaderboard(tournament.id);
	const leaderboard: Array<PlayerLeaderboard> = leaderboardData
		.map((x) => {
			const player = players.find((p) => p.id === x.playerId);

			return {
				playerId: x.playerId,
				// @ts-ignore
				name: player.name,
				// @ts-ignore
				picture: player.picture || '',
				sumPoints: x._sum.points || 0
			} satisfies PlayerLeaderboard;
		})
		.sort(sortPointsDesc);

	return {
		tournament,
		leaderboard
	};
};
