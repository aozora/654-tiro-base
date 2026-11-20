import * as v from 'valibot';
import { deleteMultiKeySchema } from '#lib/validation/common-schemas.ts';

export const schema = v
	.object({
		matchId: v.string(),
		playerId: v.pipe(v.string(), v.nonEmpty('Seleziona un giocatore')),
		points: v.number(),
		territoriesPoints: v.number()
	});

export const deleteSchema = deleteMultiKeySchema;
