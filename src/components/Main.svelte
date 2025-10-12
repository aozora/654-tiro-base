<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string|undefined = undefined;
</script>

<main id="main" class={cn('main px-4 md:px-6 lg:px-8 h-full min-h-full flex flex-col', className)}>
	<slot/>
</main>
