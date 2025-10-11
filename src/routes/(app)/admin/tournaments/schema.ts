import * as v from 'valibot';

export const schema = v.object({
	id: v.optional(v.string()),
	title: v.pipe(v.string(),v.minLength(2)),
	isActive: v.boolean()
});