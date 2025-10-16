import * as v from 'valibot';
import { deleteMultiKeySchema } from '$lib/validation/common-schemas';

export const schema = v
	.object({
		matchId: v.string(),
		playerId: v.string(),
		points: v.number()
	});

export const deleteSchema = deleteMultiKeySchema;