import type { PlayerLeaderboard } from '@/lib/types';

export function pluralizePoints(points: number) {
	return points === 1 ? '1 punto' : `${points} punti`;
}

export function sortPointsDesc(a: PlayerLeaderboard, b: PlayerLeaderboard) {
	if (a.sumPoints > b.sumPoints) {
		return -1;
	} else if (a.sumPoints < b.sumPoints) {
		return 1;
	}

	// a must be equal to b
	return 0;
}
