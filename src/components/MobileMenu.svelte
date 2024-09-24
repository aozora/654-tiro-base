<script lang="ts">
	export let open: boolean = false;
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
			<li class="separator">
				<div />
			</li>
			<li>
				<a href="/admin">Amministrazione</a>
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
    transition: transform .5s ease-in-out;
    z-index: 100;

    &.is-open {
      transform: translateX(0);
    }

		h1 {
      height: 48px;
			margin: 0 0 3rem 0;
      color: var(--color-white);
		}

    ul, li {
      list-style-type: none;
    }

		li{
			a {
				font-size: 9vw;
				color: var(--color-white);
				text-decoration: none;
			}
		}
  }

  .separator {

  }
</style>
