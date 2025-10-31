import type { PlayerLeaderboard } from '$types';

export function pluralizePoints(points: number) {
	return points === 1 ? '1 punto' : `${points} punti`;
}

export function sortMatchPointsDesc(a: PlayerLeaderboard, b: PlayerLeaderboard) {
	if (a.sumPoints > b.sumPoints) {
		return -1;
	} else if (a.sumPoints < b.sumPoints) {
		return 1;
	}

	// a must be equal to b
	return 0;
}
export function sortTerritoriesPointsDesc(a: PlayerLeaderboard, b: PlayerLeaderboard) {
	if (a.sumTerritoriesPoints > b.sumTerritoriesPoints) {
		return -1;
	} else if (a.sumTerritoriesPoints < b.sumTerritoriesPoints) {
		return 1;
	}

	// a must be equal to b
	return 0;
}
