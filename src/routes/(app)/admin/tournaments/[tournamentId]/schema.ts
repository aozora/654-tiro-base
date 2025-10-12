import * as v from 'valibot';

export const schema = v.object({
	matchId: v.optional(v.string()),
	tournamentId: v.string(),
	date: v.date()
});

export const deleteSchema = v.object({
	id: v.string()
});