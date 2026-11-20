<script lang="ts">
	import { navigating } from '$app/state';
</script>

<!--
	Shown while the next page is loading. The bar only becomes visible after a
	short delay, so navigations that are already preloaded never flash it.
-->
{#if navigating.to}
	<div
		class="progress"
		role="progressbar"
		aria-label="Caricamento pagina"
	></div>
{/if}

<style>
	.progress {
		position: fixed;
		inset: 0 0 auto;
		z-index: 60;
		height: 3px;
		background: var(--color-brand);
		transform-origin: left;
		transform: scaleX(0);
		animation: progress 8s cubic-bezier(0.1, 0.7, 0.1, 1) 120ms forwards;
		view-transition-name: navigation-progress;
	}

	@keyframes progress {
		to {
			transform: scaleX(0.92);
		}
	}
</style>
