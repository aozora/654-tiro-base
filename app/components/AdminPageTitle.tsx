import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AdminPageTitleProps = {
	title: string;
	subtitle?: string;
	showBackButton?: boolean;
};

export default function AdminPageTitle({
	title,
	subtitle,
	showBackButton = false,
}: AdminPageTitleProps) {
	const goBack = () => {
		window.history.back();
	};

	return (
		<div className="mb-9 flex h-12 w-full cursor-pointer items-center justify-center">
			{showBackButton && (
				<Button
					variant="ghost"
					type="button"
					className="mr-8 flex-0"
					onClick={goBack}
				>
					<ArrowLeft size="20" />
				</Button>
			)}

			<h1 className="font-serif text-4xl text-brand">
				{title}
				{subtitle && <span>{subtitle}</span>}
			</h1>
		</div>
	);
}
