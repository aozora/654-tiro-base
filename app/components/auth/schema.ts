import { type } from 'arktype';

export const LoginSchema = type({
	email: 'string.email',
	password: 'string >= 6',
});

export type LoginData = typeof LoginSchema.infer;

// export const loginSchema = v.object({
// 	email: v.pipe(
// 		v.string('Email obbligatoria'),
// 		v.minLength(3, 'Minimo 3 caratteri'),
// 		v.email('Email non valida'),
// 	),
// 	password: v.pipe(
// 		v.string('password obbligatoria'),
// 		v.minLength(6, 'Minimo 6 caratteri'),
// 	),
// });
//
// export type LoginData = v.InferOutput<typeof loginSchema>;
