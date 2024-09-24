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

    &.is-open {

    }
  }

  .separator {

  }
</style>
