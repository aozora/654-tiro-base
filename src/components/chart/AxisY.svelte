<!--
  @component
  Generates an SVG y-axis. This component is also configured to detect if your y-scale is an ordinal scale. If so, it will place the tickMarks in the middle of the bandwidth.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {boolean} [tickMarks] - Show marks next to the tick label.
	 * @property {string} [labelPosition] - Whether the label sits even with its value ('even') or sits on top ('above') the tick mark.
	 * @property {boolean} [snapBaselineLabel] - When labelPosition='even', adjust the lowest label so that it sits above the tick mark.
	 * @property {boolean} [gridlines] - Show gridlines extending into the chart area.
	 * @property {number|undefined} [tickMarkLength] - The length of the tick mark. If not set, becomes the length of the widest tick.
	 * @property {(d: any) => string} [format] - A function that passes the current tick value and expects a nicely formatted value in return.
	 * @property {number|Array<any>|Function} [ticks] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return.
	 * @property {number} [tickGutter] - The amount of whitespace between the start of the tick and the chart drawing area (the xRange min).
	 * @property {number} [dx] - Any optional value passed to the `dx` attribute on the text label.
	 * @property {number} [dy] - Any optional value passed to the `dy` attribute on the text label.
	 * @property {number} [charPixelWidth] - Used to calculate the widest label length to offset labels.
	 */

	/** @type {Props} */
	let {
		tickMarks = false,
		labelPosition = 'even',
		snapBaselineLabel = false,
		gridlines = true,
		tickMarkLength = undefined,
		format = (d) => d,
		ticks = 4,
		tickGutter = 0,
		dx = 0,
		dy = 0,
		charPixelWidth = 7.25,
	} = $props();

	const isBandwidth = $derived(typeof k.yScale.bandwidth === 'function');

	/** @type {Array<any>} */
	const tickVals = $derived(
		Array.isArray(ticks)
			? ticks
			: isBandwidth
				? k.yScale.domain()
				: typeof ticks === 'function'
					? ticks(k.yScale.ticks())
					: k.yScale.ticks(ticks),
	);

	/**
	 * @param {number} sum
	 * @param {string} val
	 */
	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}

	const widestTickLen = $derived(
		Math.max(
			10,
			Math.max(
				...tickVals.map((d) =>
					format(d).toString().split('').reduce(calcStringLength, 0),
				),
			),
		),
	);

	const tickLen = $derived(
		tickMarks === true
			? labelPosition === 'above'
				? (tickMarkLength ?? widestTickLen)
				: (tickMarkLength ?? 6)
			: 0,
	);

	const x1 = $derived(
		-tickGutter - (labelPosition === 'above' ? widestTickLen : tickLen),
	);
	const y = $derived(isBandwidth ? k.yScale.bandwidth() / 2 : 0);

	const maxTickValPx = $derived(Math.max(...tickVals.map((d) => k.yScale(d))));
</script>

<g class="axis y-axis">
	{#each tickVals as tick (tick)}
		{@const tickValPx = k.yScale(tick)}
		<g
			class="tick tick-{tick}"
			transform="translate({k.xRange[0]}, {tickValPx})"
		>
			{#if gridlines === true}
				<line class="gridline" {x1} x2={k.width} y1={y} y2={y}></line>
			{/if}
			{#if tickMarks === true}
				<line class="tick-mark" {x1} x2={x1 + tickLen} y1={y} y2={y}></line>
			{/if}
			<text
				x={x1}
				{y}
				dx={dx + (labelPosition === 'even' ? -3 : 0)}
				text-anchor={labelPosition === 'above' ? 'start' : 'end'}
				dy={dy +
					(labelPosition === 'above' ||
					(snapBaselineLabel === true && tickValPx === maxTickValPx)
						? -3
						: 4)}>{format(tick)}</text
			>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: 11px;
	}

	.tick line {
		stroke: #aaa;
	}

	.tick .gridline {
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #aaa;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}
</style>
