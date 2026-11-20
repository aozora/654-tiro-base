<!--
  @component
  Generates an SVG area shape.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill] - The shape's fill color.
	 */

	/** @type {Props} */
	let { fill = '#ab00d610' } = $props();

	const area = $derived.by(() => {
		const path =
			'M' +
			k.data
				.map((/** @type {any} */ d) => k.xGet(d) + ',' + k.yGet(d))
				.join('L');
		const baseline = k.yScale.range()[0];
		const extent = k.extents.x;

		return (
			path +
			('L' + k.xScale(extent ? extent[1] : 0) + ',' + baseline) +
			('L' + k.xScale(extent ? extent[0] : 0) + ',' + baseline + 'Z')
		);
	});
</script>

<path class="path-area" d={area} {fill}></path>
