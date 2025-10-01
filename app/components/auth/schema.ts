import { z } from 'zod';
// import * as z from "zod";

export const formSchema = z
	.object({
		email: z
			.string({ required_error: 'Email è richiesta' })
			.email({ message: 'Email non valida' }),
		password: z
			.string({ required_error: 'La password è richiesta' })
			.min(6, { message: 'Password non valida' }),
	})
	.required();
