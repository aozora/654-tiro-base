<script lang="ts">
	import { DiceSix } from 'phosphor-svelte';
	import MobileMenu from '$components/MobileMenu.svelte';

	export let data;

	// console.log({ data });
	const { user } = data;

	let isOpen = false;
</script>

<header class="header">
	<a href="/" class="logo">
		<span>654 tiro base</span>
	</a>

	<button
		type="button"
		class="toggle-menu"
		aria-expanded={isOpen}
		on:click={() => (isOpen = !isOpen)}
	>
		<DiceSix size="36" weight="fill" />
	</button>
	<MobileMenu open={isOpen} {user} />

	<nav class="menu">
		<!--    <ul></ul>-->
	</nav>
</header>

<style lang="scss">
	.header {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 48px;
		padding: 0 1rem;
		background: var(--color-dark) url(/img/frame-mini1.webp) no-repeat center center;
		background-size: 100%;
		z-index: 10;
	}

	.logo {
		font-family: var(--variable-font-family-brutal);
		font-size: var(--text-scale-18);
		text-decoration: none;
		color: var(--color-black);
	}

	.toggle-menu {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: 0;
		background-color: transparent;
		z-index: 101;
		transition:
			color 0.35s ease-in-out,
			transform 0.35s ease-in-out;

		&[aria-expanded='true'] {
			color: var(--color-white);
			transform: rotate(360deg);
		}
	}

	.menu {
		display: none;
	}
</style>
