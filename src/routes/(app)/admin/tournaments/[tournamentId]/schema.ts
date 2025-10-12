import * as v from 'valibot';
import { deleteSchema as commonDeleteSchema } from '$lib/validation/common-schemas';

export const schema = v.object({
	matchId: v.optional(v.string()),
	tournamentId: v.string(),
	date: v.date()
});

export const deleteSchema = commonDeleteSchema;