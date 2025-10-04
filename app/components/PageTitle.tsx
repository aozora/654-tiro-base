import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PageTitleProps = {
	title: string;
	showBackButton?: boolean;
};

export default function PageTitle({
	title,
	showBackButton = false,
}: PageTitleProps) {
	const goBack = () => {
		window.history.back();
	};

	return (
		<div className="mb-9 flex w-full items-center justify-center">
			{showBackButton && (
				<Button
					type="button"
					variant="outline"
					className="mr-8 flex-0 cursor-pointer"
					onClick={goBack}
				>
					<ArrowLeft size="20" />
				</Button>
			)}

			<h1 className="font-serif text-4xl text-foreground">{title}</h1>
		</div>
	);
}
