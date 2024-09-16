<script lang="ts">
	interface Props {
		title: string;
		subtitle: string;
	}

	let { title, subtitle }: Props = $props();
</script>

<h1 class="page-title full-bleed">
	{title}
	{#if subtitle}
		<br/>
		{subtitle}
	{/if}
</h1>

<style lang="scss">
  .page-title {
    position: sticky;
    top: 48px;
    width: 100%;
    min-height: 40px;
    margin: 0;
		padding: 0.5rem;
    background-color: var(--color-light-gray);
    font-family: var(--variable-font-family-brutal);
    font-size: var(--text-scale-20);
    line-height: 1.2;
    text-align: center;
    z-index: 10;
  }
</style>
