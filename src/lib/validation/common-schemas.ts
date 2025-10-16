import * as v from 'valibot';

/**
 * Common validation schema for delete operations with a single ID
 */
export const deleteSchema = v.object({
	id: v.string()
});

/**
 * Validation schema for delete operations with multiple keys (composite primary key)
 */
export const deleteMultiKeySchema = v.object({
	matchId: v.string(),
	playerId: v.string()
});