<!--
  @component
  Generates an SVG line shape.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [stroke] - The line color.
	 */

	/** @type {Props} */
	let { stroke = '#ab00d6' } = $props();

	const path = $derived(
		'M' +
			k.data
				.map((/** @type {any} */ d) => k.xGet(d) + ',' + k.yGet(d))
				.join('L'),
	);
</script>

<path class="path-line" d={path} {stroke}></path>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>
