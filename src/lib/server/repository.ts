import prisma from '$lib/server/prisma';
import type { Player } from '@prisma/client';

export async function getPlayers(): Promise<Array<Player>> {
	return prisma.player.findMany({
		orderBy: [
			{
				name: 'asc'
			}
		]
	});
}

export async function upsertPlayer(
	id: undefined | number,
	name: string,
	isActive: boolean
): Promise<Player> {
	console.log({ id, name, isActive });

	return prisma.player.upsert({
		where: {
			id: id
		},
		update: {
			name,
			isActive
		},
		create: {
			name,
			isActive
		}
	});
}
