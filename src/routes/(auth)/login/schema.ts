import * as v from 'valibot';

export const formSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty('Inserisci l\'email'),
		v.email('Email non valida.')
	),
	password: v.pipe(
		v.string(),
		v.nonEmpty('Inseri la password.'),
		v.minLength(6, 'La password deve avere almeno 6 caratteri.')
	),
});

export type FormSchema = v.InferOutput<typeof formSchema>;
// import { z } from 'zod/v4';
//
// export const formSchema = z.object({
// 	email: z.email(),
// 	password: z.string().min(8)
// });
//
// export type FormSchema = typeof formSchema;
