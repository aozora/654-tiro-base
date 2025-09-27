<script lang="ts">
	import type { Icons } from '../../types';

	/**
	 * Render an Icon referencing the application SVG Sprite
	 * This svg is aria-hidden by default
	 * @param id
	 * @param className
	 * @param rest
	 * @constructor
	 */
	export let id: Icons;
	// export let key: string = undefined;
	export let className: string | undefined = undefined;
	// export let style: string;
</script>

<svg
	class={`icon icon-${id} ${className ?? ''}`}
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden={true}
>
	<use xlink:href={`#${id}`} />
</svg>
