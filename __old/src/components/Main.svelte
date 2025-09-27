<script lang="ts">
	export let className: string|undefined = undefined;
</script>

<main id="main" class={className}>
	<slot/>
</main>
