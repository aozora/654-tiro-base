import * as v from 'valibot';

export const schema = v.object({
	id: v.optional(v.string()),
	name: v.pipe(v.string(), v.minLength(2)),
	picture: v.optional(v.string()),
	isActive: v.boolean()
});

export const deleteSchema = v.object({
	id: v.string()
})