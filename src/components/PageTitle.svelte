<script lang="ts">
	// import { ArrowLeft } from 'phosphor-svelte';

	export let title: string;
	export let showBackButton: boolean = false;

	const goBack = () => {
		window.history.back();
	};
</script>

<div class="page-title" class:with-back-button={showBackButton}>
	{#if showBackButton}
		<button type="button" class="back-button" on:click={goBack}>
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
			padding: 0;
			font-size: var(--text-scale-20);
			text-align: center;
			text-transform: uppercase;

			@media (min-width: 64em) {
				font-size: var(--text-scale-40);
			}
		}

		&.with-back-button {
			h1 {
				padding: 0 33px 0 0;
			}
		}
	}

	.back-button {
		flex: 0 0 auto;
		display: inline-flex;
		width: 24px;
		height: 24px;
		margin: 0 0.5rem 0 0;
		padding: 0;
		border: 0;
		background-color: transparent;
		color: var(--color-white);
	}
</style>
