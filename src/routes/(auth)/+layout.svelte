<script lang="ts">
	import SkipLink from '$components/SkipLink.svelte';
	import '$styles/app.scss';
	import type { LayoutData } from '../$types';
	import { page } from '$app/stores';

	export let data: LayoutData;

	console.log($page.data.user);
	// console.log($data.user.email)
</script>

<svelte:body></svelte:body>

<!-- svg-sprite -->
<div id="svg-defs" style="display: none">
	<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
		<symbol id="tank" viewBox="415 -2471 75 32" fill="none">
			<g>
				<g class="fills">
					<rect rx="0" ry="0" x="415" y="-2471" width="75" height="32" transform="matrix(-1 0 0 1 905 0)"
								class="frame-background" />
				</g>
				<g class="frame-children">
					<rect rx="11.467" ry="11.467" x="415" y="-2461.933" transform="matrix(-1 0 0 1 892.143 0)" width="62.143"
								height="22.933" fill="#487abf" class="fills" />
					<g>
						<defs>
							<filter id="a" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox"
											color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
								<feMorphology radius="12" in="SourceAlpha" result="filter_e72b28c8-8cdf-80ca-8004-f0b266789fdc" />
								<feOffset />
								<feGaussianBlur stdDeviation="3" />
								<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b266789fdc" />
							</filter>
						</defs>
						<rect rx="8.267" ry="8.267" x="418.214" y="-2458.733" transform="matrix(-1 0 0 1 892.143 0)" width="55.714"
									height="16.533" filter="url(#a)" fill="#487abf" class="fills" />
					</g>
					<ellipse cx="465.357" cy="-2450.733" rx="5.357" ry="5.333" transform="matrix(-1 0 0 1 930.714 0)"
									 fill="#487abf" class="fills" />
					<ellipse cx="426.786" cy="-2450.733" rx="5.357" ry="5.333" transform="matrix(-1 0 0 1 853.571 0)"
									 fill="#487abf" class="fills" />
					<g>
						<defs>
							<filter id="b" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox"
											color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
								<feOffset dy="-3" />
								<feGaussianBlur stdDeviation="2" />
								<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b26678cfc8" />
							</filter>
						</defs>
						<rect rx="0" ry="0" x="424.643" y="-2471" transform="matrix(-1 0 0 1 868.036 0)" width="18.75"
									height="9.067" filter="url(#b)" fill="#487abf" class="fills" />
					</g>
					<g>
						<defs>
							<filter id="c" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox"
											color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
								<feMorphology radius="3" in="SourceAlpha" result="filter_e72b28c8-8cdf-80ca-8004-f0b26678cfca" />
								<feOffset dy="4" />
								<feGaussianBlur stdDeviation="2" />
								<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b26678cfca" />
							</filter>
						</defs>
						<rect rx="0" ry="0" x="460" y="-2463" transform="matrix(-1 0 0 1 943.036 0)" width="23.036" height="1.067"
									filter="url(#c)" fill="#487abf" class="fills" />
					</g>
					<g>
						<defs>
							<filter id="d" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox"
											color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
								<feOffset />
								<feGaussianBlur stdDeviation="1.5" />
								<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b26678cfcc" />
							</filter>
						</defs>
						<rect rx="0" ry="0" x="460" y="-2467.267" transform="matrix(-1 0 0 1 950 0)" width="30" height="4.267"
									filter="url(#d)" fill="#487abf" class="fills" />
					</g>
					<g>
						<defs>
							<filter id="e" x="0" y="0" width="1" height="1" filterUnits="objectBoundingBox"
											color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
								<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
								<feOffset dy="-3" />
								<feGaussianBlur stdDeviation="2" />
								<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
								<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend in2="shape" result="filter_e72b28c8-8cdf-80ca-8004-f0b2667933a7" />
							</filter>
						</defs>
						<rect rx="0" ry="0" x="443.393" y="-2467.8" transform="matrix(-1 0 0 1 903.393 0)" width="16.607"
									height="5.867" filter="url(#e)" fill="#487abf" class="fills" />
					</g>
				</g>
			</g>
		</symbol>
	</svg>
</div>

<SkipLink />

<main id="main" class="auth-page">
	<slot></slot>
</main>

<img src="/img/risiko-challenge-tabellone.webp" alt=""/>
<!--<Footer />-->
