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
		<div className="mb-9 flex w-full cursor-pointer items-center justify-center">
			{showBackButton && (
				<Button type="button" className="flex-0" onClick={goBack}>
					<ArrowLeft size="20" />
				</Button>
			)}

			<h1 className="font-serif text-4xl text-foreground">{title}</h1>
		</div>
	);
}
