import * as v from 'valibot';
import { deleteSchema as commonDeleteSchema } from '#lib/validation/common-schemas.ts';

export const schema = v.object({
	matchId: v.optional(v.string()),
	tournamentId: v.string(),
	date: v.pipe(
		v.string(),
		v.nonEmpty('Scegli una data'),
		v.transform((value) => new Date(value)),
		v.check((value) => !Number.isNaN(value.getTime()), 'Data non valida'),
		v.date()
	)
});

export const deleteSchema = commonDeleteSchema;
