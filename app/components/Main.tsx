import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MainProps = {
	children: ReactNode;
	className?: string;
};
export default function Main({ children, className }: MainProps) {
	return (
		<main className={cn('main px-4 md:px-6 lg:px-8', className)}>
			{children}
		</main>
	);
}
