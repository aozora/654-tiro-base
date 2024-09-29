<script lang="ts">
	import { ArrowLeft } from 'phosphor-svelte';

	export let title: string;
	export let showBackButton: boolean = false;

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="page-title">
	{#if showBackButton}
		<button type="button" class="back-button" on:click={()=> goBack()}>
			<ArrowLeft size="20" />
		</button>
	{/if}

	<h1>{title}</h1>
</div>


<style lang="scss">
  .page-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 1.5rem 0 2rem 0;


    h1 {
			flex: 1 1 auto;
      margin: 0;
      font-size: var(--text-scale-20);
      text-align: center;
      text-transform: uppercase;
    }
  }

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

</style>
