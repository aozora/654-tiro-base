import { LoginForm } from '@/components/auth/LoginForm';
import { cn } from '@/lib/utils';

export default function SignIn() {
	return (
		<div
			className={cn(
				'flex h-full min-h-screen w-full items-center justify-center',
				'bg-[url("/img/frame6.webp")] bg-cover bg-position-[60%_100%] bg-no-repeat',
			)}
		>
			<LoginForm className="mx-auto max-w-7xl" />
		</div>
	);
}
