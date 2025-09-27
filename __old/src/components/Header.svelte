<script lang="ts">
	import { DiceSix } from 'phosphor-svelte';
	import MobileMenu from './MobileMenu.svelte';
	import { page } from '$app/stores';
	import { listen } from 'svelte-mq-store';

	export let data;

	// console.log($page.data.tournament);
	const { user } = data;
	const isDesktop = listen('(min-width: 64em)');
	let isOpen = false;

	const onClose = () => {
		isOpen = false;
	};
</script>

<header class="header">
	<a href="/__old/static" class="logo">
		{#if $page.data.tournament}
			<span>{$page.data.tournament.title}</span>
		{:else}
			<span>654 tiro base</span>
		{/if}
	</a>

	{#if isDesktop.v}
		<nav class="menu">
			<ul>
				<li>
					<a href="/leaderboard">Classifica</a>
				</li>
				<li>
					<a href="/tournaments">Tornei</a>
				</li>

				{#if user && user?.role === 'admin'}
					<li>
						<a href="/admin">Amministrazione</a>
					</li>
				{/if}

				<li class="logout">
					<form action="/logout" method="POST">
						<button type="submit">Esci</button>
					</form>
				</li>
			</ul>
		</nav>
	{:else}
		<button
			type="button"
			class="toggle-menu"
			aria-expanded={isOpen}
			on:click={() => (isOpen = !isOpen)}
		>
			<DiceSix size="36" weight="fill" />
		</button>

		<MobileMenu open={isOpen} {user} {onClose} />
	{/if}
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
		/* background: var(--color-dark) url(/img/frame-mini1.webp) no-repeat center center;
		background-size: 100%; */
		z-index: 10;
	}

	.logo {
		font-family: var(--variable-font-family-brutal);
		font-size: var(--text-scale-18);
		text-decoration: none;
		color: var(--color-white);
	}

	.toggle-menu {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: 0;
		color: var(--color-white);
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
		flex: 1 1 auto;

		ul,
		li {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}

		ul {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}

		a,
		button {
			margin: 0;
			padding: 0 0.5rem;
			border: 0;
			background-color: transparent;
			font-size: 1rem;
			text-decoration: none;
			color: var(--color-white);
			cursor: pointer;
			transition: all 0.35s ease-in-out;

			&:hover,
			&:focus-visible {
				text-decoration: underline;
			}
		}
	}
</style>
