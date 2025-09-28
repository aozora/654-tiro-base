import React, { useEffect, useRef } from 'react';

const Loader = () => {
	const cubeRef = useRef<HTMLDivElement>(null);
	const min = 1;
	const max = 24;

	const getRandom = (max: number, min: number): number => {
		return (Math.floor(Math.random() * (max - min)) + min) * 90;
	};

	const roll = (): void => {
		if (!cubeRef.current) return;

		const xRand = getRandom(max, min);
		const yRand = getRandom(max, min);

		cubeRef.current.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg)`;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <ok>
	useEffect(() => {
		console.log('rolling dice...', cubeRef.current);

		if (cubeRef.current) {
			roll();
		}
	}, []);

	const onClick = (): void => {
		roll();
	};

	// Common CSS classes
	const diceFaceClasses =
		'absolute mx-auto block h-[200px] w-[200px] border-2 border-[#ab1a1a] bg-[#FF4544] py-[50px]';
	const dotClasses = 'absolute block h-[30px] w-[30px] rounded-[15px] bg-white';

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<section
				className="relative mx-auto mb-10 h-[200px] w-[200px] border-0"
				style={{ perspective: '1000px', perspectiveOrigin: '50% 100%' }}
			>
				<div
					role="none"
					ref={cubeRef}
					onClick={onClick}
					className="absolute h-full w-full cursor-pointer transition-transform duration-[6s] hover:cursor-pointer"
					style={{ transformStyle: 'preserve-3d' }}
				>
					{/* Front face - 1 dot */}
					<div
						className={diceFaceClasses}
						style={{ transform: 'translateZ(100px)' }}
					>
						<span className={`${dotClasses} top-[85px] left-[85px]`}></span>
					</div>

					{/* Back face - 2 dots */}
					<div
						className={diceFaceClasses}
						style={{ transform: 'rotateX(-180deg) translateZ(100px)' }}
					>
						<span className={`${dotClasses} top-[45px] left-[45px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[125px]`}></span>
					</div>

					{/* Right face - 3 dots */}
					<div
						className={diceFaceClasses}
						style={{ transform: 'rotateY(90deg) translateZ(100px)' }}
					>
						<span className={`${dotClasses} top-[45px] left-[45px]`}></span>
						<span className={`${dotClasses} top-[85px] left-[85px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[125px]`}></span>
					</div>

					{/* Left face - 4 dots */}
					<div
						className={diceFaceClasses}
						style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}
					>
						<span className={`${dotClasses} top-[45px] left-[45px]`}></span>
						<span className={`${dotClasses} top-[45px] left-[125px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[45px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[125px]`}></span>
					</div>

					{/* Top face - 5 dots */}
					<div
						className={diceFaceClasses}
						style={{ transform: 'rotateX(90deg) translateZ(100px)' }}
					>
						<span className={`${dotClasses} top-[45px] left-[45px]`}></span>
						<span className={`${dotClasses} top-[45px] left-[125px]`}></span>
						<span className={`${dotClasses} top-[85px] left-[85px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[45px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[125px]`}></span>
					</div>

					{/* Bottom face - 6 dots */}
					<div
						className={diceFaceClasses}
						style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}
					>
						<span className={`${dotClasses} top-[45px] left-[45px]`}></span>
						<span className={`${dotClasses} top-[45px] left-[85px]`}></span>
						<span className={`${dotClasses} top-[45px] left-[125px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[45px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[85px]`}></span>
						<span className={`${dotClasses} top-[125px] left-[125px]`}></span>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Loader;
