<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
	export let data;
</script>

<h1>Hello, {data.user?.email}</h1>
<h1>Sei un {data.user?.role}</h1>

<a href="/leaderboard">Classifica</a>

<a href="/admin/">Admin</a>
