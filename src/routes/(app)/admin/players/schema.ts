import * as v from 'valibot';

export const schemaUpdate = v.object({
	id: v.optional(v.string()),
	name: v.pipe(v.string(), v.minLength(2)),
	picture: v.optional(v.string()),
	action: v.optional(v.string()),
	isActive: v.boolean()
});

export const schemaDelete = v.object({
	id: v.string()
})