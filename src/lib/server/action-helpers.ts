import { fail, message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Generic handler for update/create form actions
 * @param request - The request object from the action
 * @param schema - The valibot schema to validate against
 * @param updateFn - Async function that performs the update/create operation with form data
 * @returns SuperValidated form with success/error status
 */
export async function handleUpdate<T>(
	request: Request,
	schema: any,
	updateFn: (data: T) => Promise<void>
) {
	const form = await superValidate(request, valibot(schema));

	if (!form.valid) {
		console.error('Form not valid', form);
		return fail(400, { form, message: 'Form not valid' });
	}

	try {
		await updateFn(form.data as T);
		return message(form, 'success');
	} catch (error: unknown) {
		console.error(error);
		return fail(500, { form, message: 'Something went wrong' });
	}
}

/**
 * Generic handler for delete form actions
 * @param request - The request object from the action
 * @param schema - The valibot schema to validate against
 * @param deleteFn - Async function that performs the delete operation with the ID(s)
 * @param successMessage - Optional custom success message (defaults to 'success')
 * @returns SuperValidated form with success/error status
 */
export async function handleDelete<T>(
	request: Request,
	schema: any,
	deleteFn: (data: T) => Promise<void>,
	successMessage: string = 'success'
) {
	const form = await superValidate(request, valibot(schema));

	if (!form.valid) {
		console.error('Delete Form not valid', form);
		return fail(400, { form, message: 'Form not valid' });
	}

	try {
		await deleteFn(form.data as T);
		return message(form, successMessage);
	} catch (error: unknown) {
		console.error(error);
		return fail(500, { form, message: 'Something went wrong' });
	}
}