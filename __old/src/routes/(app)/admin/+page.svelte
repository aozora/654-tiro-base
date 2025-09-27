<script lang="ts">

	import Main from '../../../components/Main.svelte';
	import AdminPageTitle from '../../../components/AdminPageTitle.svelte';
</script>

<AdminPageTitle title="Gestione 654" />

<Main className="admin-page">
	<div class="admin-home">


		<ul>
			<li>
				<a href="/admin/players">Gestione giocatori</a>
			</li>
			<li>
				<a href="/admin/tournaments">Gestione tornei</a>
			</li>
		</ul>
	</div>
</Main>

<style lang="scss">
  .admin-home {
    display: flex;
    flex-direction: column;

    ul, li {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      width: 100%;
      margin: 2rem 0 0 0;
    }

    a {
      color: var(--color-white);
    }
  }
</style>
