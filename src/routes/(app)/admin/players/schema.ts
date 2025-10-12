import * as v from 'valibot';
import { deleteSchema as commonDeleteSchema } from '$lib/validation/common-schemas';

export const schema = v.object({
	id: v.optional(v.string()),
	name: v.pipe(v.string(), v.minLength(2)),
	picture: v.optional(v.string()),
	isActive: v.boolean()
});

export const deleteSchema = commonDeleteSchema;