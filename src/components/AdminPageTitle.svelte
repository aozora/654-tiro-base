<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';

	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let showBackButton: boolean = false;

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="mb-9 flex h-12 w-full cursor-pointer items-center justify-center">
	{#if showBackButton}
		<button type="button" class="back-button" on:click={()=> goBack()}>
			<ArrowLeft size="20" />
		</button>
	{/if}

	<h1 class="font-serif text-4xl text-brand">
		{title}
		{#if subtitle}
			<span>{subtitle}</span>
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
		color: var(--color-white);
  }

  .page-title {
    //position: sticky;
    //top: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 40px;
    margin: 0;
    padding: 0.5rem;
    background-color: var(--color-blue-star);
    z-index: 10;

    h1 {
			flex: 1 1 auto;
      margin: 0;
			padding: 0 33px 0 0;
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
