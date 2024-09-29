<script lang="ts">
	import { ArrowLeft } from 'phosphor-svelte';

	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let showBackButton: boolean = false;

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="page-title full-bleed" class:with-subtitle={subtitle !== undefined} class:with-back={showBackButton}>
	{#if showBackButton}
		<button type="button" class="back-button" on:click={()=> goBack()}>
			<ArrowLeft size="20" />
		</button>
	{/if}

	<h1>
		{title}
		{#if subtitle}
			<br />
			{subtitle}
		{/if}
	</h1>
</div>


<style lang="scss">
  .back-button {
		flex: 0 0 auto;
    display: inline-flex;
    width: 24px;
    height: 24px;
    margin: 0 .5rem 0 0;
    padding: 0;
    border: 0;
    background-color: transparent;
  }

  .page-title {
    position: sticky;
    top: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 40px;
    margin: 0;
    padding: 0.5rem;
    background-color: var(--color-light-gray);
    z-index: 10;

    h1 {
			flex: 1 1 auto;
      margin: 0;
      font-family: var(--variable-font-family-brutal);
      font-size: var(--text-scale-18);
      line-height: 1.2;
      text-align: center;
    }

    &.with-subtitle {
      h1 {
        font-size: var(--text-scale-16);
      }
    }
  }
</style>
