import type { Icons } from '@/lib/types';

type IconProps = {
	id: Icons;
	className?: string | undefined;
};

export default function Icon({ id, className }: IconProps) {
	return (
		<svg
			className={`icon icon-${id} ${className ?? ''}`}
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden={true}
		>
			<use xlinkHref={`#${id}`} />
		</svg>
	);
}
