import prisma from '$lib/server/prisma';
import type { Match, Player, Tournament } from '@prisma/client';

export async function getPlayers(): Promise<Array<Player>> {
	return prisma.player.findMany({
		where: {
			isDeleted: false
		},
		orderBy: [
			{
				name: 'asc'
			}
		]
	});
}

export async function getPlayerById(id: string): Promise<Player> {
	return prisma.player.findUniqueOrThrow({
		where: {
			id
		}
	});
}

export type PlayerMatches = {
	points: number;
	date: Date;
};

export async function getPlayerWithMatchesById(
	tournamentId: string,
	playerId: string
): Promise<Array<PlayerMatches>> {
	const tournamentMatches = await prisma.playersOnMatches.findMany({
		where: {
			match: {
				tournamentId
			},
			player: {
				id: playerId
			}
		},
		select: {
			match: {
				select: {
					date: true
				}
			},
			points: true
		},
		orderBy: {
			match: {
				date: 'asc'
			}
		}
	});

	return tournamentMatches.map((m) => {
		return {
			date: m.match.date,
			points: m.points
		};
	});
}

export async function upsertPlayer(
	id: undefined | string,
	name: string,
	isActive: boolean
	// picture: string
): Promise<Player> {
	// console.log({ id, name, isActive });

	return prisma.player.upsert({
		where: {
			id: id
		},
		update: {
			name,
			isActive
			// picture
		},
		create: {
			name,
			isActive
			// picture
		}
	});
}

export async function updatePlayerPicture(
	id: undefined | string,
	picture: string
): Promise<Player> {
	return prisma.player.update({
		where: {
			id: id
		},
		data: {
			picture
		}
	});
}

/**
 * Delete a player and all its matches
 * @param id
 */
export async function deletePlayer(id: string) {
	await prisma.player.update({
		where: {
			id: id
		},
		data: {
			isDeleted: true,
			isActive: false
		}
	});
}

// export type
export async function getTournaments(): Promise<Array<Tournament>> {
	return prisma.tournament.findMany({
		include:{
			matches: true
		},
		orderBy: [
			{
				title: 'desc'
			}
		]
	});
}

export async function getTournament(id: string): Promise<Tournament> {
	return prisma.tournament.findUniqueOrThrow({
		where: { id }
	});
}

export async function getActiveTournament(): Promise<Tournament> {
	return prisma.tournament.findFirstOrThrow({
		where: {
			isActive: true
		}
	});
}

export async function upsertTournament(
	id: undefined | string,
	title: string,
	isActive: boolean
): Promise<Tournament> {
	return prisma.tournament.upsert({
		where: {
			id: id
		},
		update: {
			title,
			isActive
		},
		create: {
			title,
			isActive
		}
	});
}

export async function getMatches(tournamentId: string): Promise<Array<Match>> {
	return prisma.match.findMany({
		// include: {
		// 	players: {
		// 		select: {
		// 			player: true
		// 		}
		// 	}
		// },
		where: { tournamentId },
		orderBy: {
			date: 'desc'
		}
	});
}

export async function getMatch(id: string): Promise<Match> {
	return prisma.match.findUniqueOrThrow({
		where: { id }
	});
}

export async function upsertMatch(
	id: undefined | string,
	tournamentId: string,
	date: Date
): Promise<Match> {
	console.log({ id, tournamentId, date });

	return prisma.match.upsert({
		where: {
			id: id
		},
		update: {
			date
		},
		create: {
			date,
			tournamentId
		}
	});
}

export async function deleteMatchDeep(id: string): Promise<Match> {
	await prisma.playersOnMatches.deleteMany({
		where: {
			matchId: id
		}
	});

	return prisma.match.delete({
		where: {
			id: id
		}
	});
}

export type PlayerExtended = Player & { points: number };

export async function getMatchPlayers(matchId: string): Promise<Array<PlayerExtended>> {
	const data = await prisma.playersOnMatches.findMany({
		include: {
			player: true
		},
		where: {
			matchId
		}
		// orderBy: {
		// 	player: {
		// 		name: true
		// 	}
		// }
	});

	return data.map((x) => {
		return {
			...x.player,
			points: x.points
		} satisfies PlayerExtended;
	});
}

export async function upsertMatchPlayer(matchId: string, playerId: string, points: number) {
	return prisma.playersOnMatches.upsert({
		where: {
			playerId_matchId: { playerId, matchId }
		},
		update: {
			points
		},
		create: {
			matchId,
			playerId,
			points
		}
	});
}

export async function removePlayerFromMatch(matchId: string, playerId: string) {
	return prisma.playersOnMatches.delete({
		where: {
			playerId_matchId: { playerId, matchId }
		}
	});
}

export async function getLeaderboard(tournamentId: string) {
	// get all the matches of the given tournament
	const matches = await prisma.match.findMany({
		where: {
			tournamentId
		}
	});

	return prisma.playersOnMatches.groupBy({
		by: ['playerId'],
		where: {
			matchId: {
				in: matches.map((m) => m.id)
			}
		},
		_sum: {
			points: true
		}
	});
}
