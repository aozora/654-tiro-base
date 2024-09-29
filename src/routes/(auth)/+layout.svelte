<script lang="ts">
	import SkipLink from '$components/SkipLink.svelte';
	import type { LayoutData } from '../$types';
	import { page } from '$app/stores';
	import Main from '$components/Main.svelte';
	import '$styles/app.scss';

	export let data: LayoutData;

	// console.log($page.data.user);
	// console.log($data.user.email)
</script>

<!-- svg-sprite -->
<div id="svg-defs" style="display: none">
	<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
		<symbol id="tank-blue" viewBox="0 0 75 32" fill="none">
			<g data-testid="Tank-1">
				<g class="fills">
					<rect width="75" height="32" class="frame-background" rx="0" ry="0" transform="matrix(-1 0 0 1 75 0)" />
				</g>
				<g class="frame-children">
					<rect width="62.143" height="22.933" y="9.067" fill="#487abf" class="fills" data-testid="Rectangle 25-1"
								rx="11.467" ry="11.467" transform="matrix(-1 0 0 1 62.143 0)" />
					<g data-testid="Rectangle 26-1">
						<defs>
							<filter id="a" width="1" height="1" x="0" y="0" color-interpolation-filters="sRGB"
											filterUnits="objectBoundingBox">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
								<feMorphology in="SourceAlpha" radius="12" result="filter_e72b28c8-8cdf-80ca-8004-f0b266789fdc" />
								<feOffset />
								<feGaussianBlur stdDeviation="3" />
								<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b266789fdc" />
							</filter>
						</defs>
						<rect width="55.714" height="16.533" x="3.214" y="12.267" fill="#487abf" class="fills" filter="url(#a)"
									rx="8.267" ry="8.267" transform="matrix(-1 0 0 1 62.143 0)" />
					</g>
					<ellipse cx="50.357" cy="20.267" fill="#487abf" class="fills" data-testid="Ellipse 10-1" rx="5.357" ry="5.333"
									 transform="matrix(-1 0 0 1 100.714 0)" />
					<ellipse cx="11.786" cy="20.267" fill="#487abf" class="fills" data-testid="Ellipse 11-1" rx="5.357" ry="5.333"
									 transform="matrix(-1 0 0 1 23.571 0)" />
					<g data-testid="Rectangle 27-1">
						<defs>
							<filter id="b" width="1" height="1" x="0" y="0" color-interpolation-filters="sRGB"
											filterUnits="objectBoundingBox">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
								<feOffset dy="-3" />
								<feGaussianBlur stdDeviation="2" />
								<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b26678cfc8" />
							</filter>
						</defs>
						<rect width="18.75" height="9.067" x="9.643" fill="#487abf" class="fills" filter="url(#b)" rx="0" ry="0"
									transform="matrix(-1 0 0 1 38.036 0)" />
					</g>
					<g data-testid="Rectangle 28-1">
						<defs>
							<filter id="c" width="1" height="1" x="0" y="0" color-interpolation-filters="sRGB"
											filterUnits="objectBoundingBox">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
								<feMorphology in="SourceAlpha" radius="3" result="filter_e72b28c8-8cdf-80ca-8004-f0b26678cfca" />
								<feOffset dy="4" />
								<feGaussianBlur stdDeviation="2" />
								<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b26678cfca" />
							</filter>
						</defs>
						<rect width="23.036" height="1.067" x="45" y="8" fill="#487abf" class="fills" filter="url(#c)" rx="0" ry="0"
									transform="matrix(-1 0 0 1 113.036 0)" />
					</g>
					<g data-testid="Rectangle 30-1">
						<defs>
							<filter id="d" width="1" height="1" x="0" y="0" color-interpolation-filters="sRGB"
											filterUnits="objectBoundingBox">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
								<feOffset />
								<feGaussianBlur stdDeviation="1.5" />
								<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b26678cfcc" />
							</filter>
						</defs>
						<rect width="30" height="4.267" x="45" y="3.733" fill="#487abf" class="fills" filter="url(#d)" rx="0" ry="0"
									transform="matrix(-1 0 0 1 120 0)" />
					</g>
					<g data-testid="Rectangle 29-1">
						<defs>
							<filter id="e" width="1" height="1" x="0" y="0" color-interpolation-filters="sRGB"
											filterUnits="objectBoundingBox">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
								<feOffset dy="-3" />
								<feGaussianBlur stdDeviation="2" />
								<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b2667933a7" />
							</filter>
						</defs>
						<rect width="16.607" height="5.867" x="28.393" y="3.2" fill="#487abf" class="fills" filter="url(#e)" rx="0"
									ry="0" transform="matrix(-1 0 0 1 73.393 0)" />
					</g>
				</g>
			</g>
		</symbol>
		<symbol id="tank-brand" fill="none" viewBox="0 0 140 60">
			<rect width="116" height="43" fill="#E6795A" rx="20" transform="matrix(-1 0 0 1 116 17)" />
			<g filter="url(#a)">
				<rect width="104" height="31" fill="#E6795A" rx="15.5" transform="matrix(-1 0 0 1 110 23)" />
			</g>
			<circle cx="10" cy="10" r="10" fill="#E6795A" transform="matrix(-1 0 0 1 104 28)" />
			<circle cx="10" cy="10" r="10" fill="#E6795A" transform="matrix(-1 0 0 1 32 28)" />
			<g filter="url(#b)">
				<path fill="#E6795A" d="M53 0H18v17h35z" />
			</g>
			<g filter="url(#c)">
				<path fill="#E6795A" d="M127 15H84v2h43z" />
			</g>
			<g filter="url(#d)">
				<path fill="#E6795A" d="M140 7H84v8h56z" />
			</g>
			<g filter="url(#e)">
				<path fill="#E6795A" d="M84 6H53v11h31z" />
			</g>
			<defs>
				<filter id="a" width="104" height="31" x="6" y="23" color-interpolation-filters="sRGB"
								filterUnits="userSpaceOnUse">
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feMorphology in="SourceAlpha" radius="12" result="effect1_innerShadow_96_21" />
					<feOffset />
					<feGaussianBlur stdDeviation="3" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend in2="shape" result="effect1_innerShadow_96_21" />
				</filter>
				<filter id="b" width="35" height="20" x="18" y="-3" color-interpolation-filters="sRGB"
								filterUnits="userSpaceOnUse">
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feOffset dy="-3" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend in2="shape" result="effect1_innerShadow_96_21" />
				</filter>
				<filter id="c" width="43" height="6" x="84" y="15" color-interpolation-filters="sRGB"
								filterUnits="userSpaceOnUse">
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feMorphology in="SourceAlpha" radius="3" result="effect1_innerShadow_96_21" />
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend in2="shape" result="effect1_innerShadow_96_21" />
				</filter>
				<filter id="d" width="56" height="8" x="84" y="7" color-interpolation-filters="sRGB"
								filterUnits="userSpaceOnUse">
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feOffset />
					<feGaussianBlur stdDeviation="1.5" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend in2="shape" result="effect1_innerShadow_96_21" />
				</filter>
				<filter id="e" width="31" height="14" x="53" y="3" color-interpolation-filters="sRGB"
								filterUnits="userSpaceOnUse">
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
					<feOffset dy="-3" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
					<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend in2="shape" result="effect1_innerShadow_96_21" />
				</filter>
			</defs>
		</symbol>
	</svg>
</div>

<SkipLink />

<Main className="auth-page">
	<slot></slot>
</Main>

<!--<img src="/img/risiko-challenge-tabellone.webp" alt="" />-->
<!--<Footer />-->
