import * as v from 'valibot';

export const schema = v
	.object({
		matchId: v.string(),
		playerId: v.string(),
		points: v.number()
	});

export const deleteSchema = v
	.object({
		matchId: v.string(),
		playerId: v.string()
	});