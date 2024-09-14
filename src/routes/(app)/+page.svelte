<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<h1>Hello, {data.user?.email}</h1>
<h1>Sei un  {data.user?.role}</h1>

<a href="/admin/">Admin</a>

{#if data.user}
  <form action="?/logout" method="post" use:enhance>
    <button class="w3-bar-item w3-button">Logout</button>
  </form>
{/if}
