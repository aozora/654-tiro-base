<script lang="ts" module>
	import { Dices, PencilLine, Trash2 } from '@lucide/svelte';

	// Only the icons listed here are bundled: importing the whole library by
	// name ships every icon to the browser.
	const icons = { Dices, PencilLine, Trash2 };

	export type IconName = keyof typeof icons;
</script>

<script lang="ts">
	type Props = {
		name: IconName;
		[key: string]: unknown;
	};

	let { name, ...props }: Props = $props();
	const Icon = $derived(icons[name]);
</script>

<Icon {...props} />
