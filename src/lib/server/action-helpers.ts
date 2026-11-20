import { fail } from '@sveltejs/kit';
import * as v from 'valibot';

async function readBody(request: Request): Promise<unknown> {
	const type = request.headers.get('content-type') ?? '';
	if (type.includes('application/json') || type.includes('text/plain')) {
		return request.json();
	}

	const data = await request.formData();
	return Object.fromEntries(data);
}

async function validate<TSchema extends v.GenericSchema>(request: Request, schema: TSchema) {
	return v.safeParse(schema, await readBody(request));
}

/**
 * Validates a create/update submission with Valibot, then runs the write.
 */
export async function handleUpdate<TSchema extends v.GenericSchema>(
	request: Request,
	schema: TSchema,
	updateFn: (data: v.InferOutput<TSchema>) => Promise<void>
) {
	const parsed = await validate(request, schema);

	if (!parsed.success) {
		console.error('Form not valid', parsed.issues);
		return fail(400, { message: 'Form not valid' });
	}

	try {
		await updateFn(parsed.output);
		return { message: 'success' };
	} catch (error: unknown) {
		console.error(error);
		return fail(500, { message: 'Something went wrong' });
	}
}

/**
 * Validates a delete submission with Valibot, then runs the delete.
 */
export async function handleDelete<TSchema extends v.GenericSchema>(
	request: Request,
	schema: TSchema,
	deleteFn: (data: v.InferOutput<TSchema>) => Promise<void>,
	successMessage = 'success'
) {
	const parsed = await validate(request, schema);

	if (!parsed.success) {
		console.error('Delete Form not valid', parsed.issues);
		return fail(400, { message: 'Form not valid' });
	}

	try {
		await deleteFn(parsed.output);
		return { message: successMessage };
	} catch (error: unknown) {
		console.error(error);
		return fail(500, { message: 'Something went wrong' });
	}
}
