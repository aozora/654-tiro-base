import {
	FormProvider,
	getFormProps,
	getInputProps,
	useForm,
} from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Shell } from 'lucide-react';
import {
	type ActionFunctionArgs,
	Form,
	redirect,
	useActionData,
	useNavigation,
} from 'react-router';
import { formSchema } from '@/components/auth/schema';
import ErrorList from '@/components/form/ErrorList';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import type { Route } from './+types/signin';

export async function loader({ request }: Route.LoaderArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (session?.user) {
		return redirect('/leaderboard');
	}

	return {};
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();

	// Construct an object using `Object.fromEntries`
	const submission = parseWithZod(formData, { schema: formSchema });
	// Then parse it with zod
	if (submission.status !== 'success') {
		return submission.reply();
	}

	console.log('All ok!!!');

	return redirect('/leaderboard');
}

// export async function clientAction({ request }: Route.ClientActionArgs) {
//   const formData = await request.clone().formData();
//   const submission = parseWithZod(formData, { schema: formSchema });

//   if (submission.status !== "success") {
//     return toast.error("Invalid form data.");
//   }

//   const { email, password } = submission.value;
//   const { error } = await authClient.signIn.email({
//     email,
//     password,
//   });

//   if (error) {
//     return toast.error(error.message || "Sign in failed.");
//   }

//   return redirect("/leaderboard");
// }

export default function SignIn() {
	const lastResult = useActionData<typeof action>();

	const [form, fields] = useForm({
		// constraint: getZodConstraint(formSchema),
		id: 'signin',
		lastResult,
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: formSchema });
		},
		defaultValue: {
			email: '',
			password: '',
		},
	});

	const navigation = useNavigation();
	const isPending = () => navigation.state !== 'idle';
	const isSignInPending = isPending();

	return (
		<div
			className={cn(
				'flex h-full min-h-screen w-full items-center justify-center',
				'bg-[url("/img/frame6.webp")] bg-cover bg-position-[60%_100%] bg-no-repeat',
			)}
		>
			{/*<LoginForm className="mx-auto max-w-7xl" />*/}
			<div
				className={cn(
					'flex min-w-80 flex-col gap-6 lg:min-w-100',
					'mx-auto max-w-7xl',
				)}
			>
				<Card>
					<CardHeader className="text-center">
						<CardTitle>
							<h1 className="font-brutal text-5xl text-brand">Risiko!</h1>
						</CardTitle>
						<CardDescription>
							<h2 className="font-brutal text-5xl text-brand">
								654 tiro base!
							</h2>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormProvider context={form.context}>
							<Form {...getFormProps(form)} method="post">
								<div className="flex flex-col gap-2">
									<label htmlFor={fields.email.id}>Email:</label>
									<Input
										placeholder="la tua email"
										{...getInputProps(fields.email, { type: 'email' })}
									/>
									{fields.email.errors?.length ? (
										<ErrorList
											id={fields.email.errorId}
											errors={fields.email.errors}
										/>
									) : null}

									<label htmlFor={fields.password.id}>Password:</label>
									<Input
										placeholder="la tua password"
										{...getInputProps(fields.password, {
											type: 'password',
										})}
									/>
									{fields.password.errors?.length ? (
										<ErrorList
											id={fields.password.errorId}
											errors={fields.password.errors}
										/>
									) : null}

									<div className="flex flex-col gap-3">
										<Button
											type="submit"
											className="w-full"
											disabled={isSignInPending}
										>
											{isSignInPending ? 'Accesso in corso...' : 'Entra'}
											{isSignInPending && (
												<Shell size={24} className="animate-spin" />
											)}
										</Button>
									</div>
								</div>
							</Form>
						</FormProvider>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
