<script lang="ts">
	export let open: boolean = false;
	export let user;
</script>

<div class="mobile-menu" class:is-open={open}>
	<header>
		<h1>Menu</h1>
	</header>
	<nav>
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
</div>

<style lang="scss">
	.mobile-menu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0 1rem 1rem 1rem;
		background: var(--color-dark);
		transform: translate3d(100%, 0, 0);
		transition: transform 0.5s ease-in-out;
		z-index: 100;

		&.is-open {
			transform: translateX(0);
		}

		header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 48px;
			margin: 0 0 3rem 0;
		}

		h1 {
			/* height: 48px; */
			margin: 0;
			font-family: var(--variable-font-family-default);
			font-size: var(--text-scale-20);
			line-height: 1;
			color: var(--color-white);
		}

		ul,
		li {
			list-style-type: none;
		}

		ul {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
		}

		li {
			&.logout {
				margin-top: 4rem;
			}

			a,
			button {
				padding: 0;
				margin: 0;
				border: 0;
				background-color: transparent;
				font-family: var(--variable-font-family-brand);
				font-size: 9vw;
				color: var(--color-white);
				text-decoration: none;
			}
		}
	}
</style>
