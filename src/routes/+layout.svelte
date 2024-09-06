<script lang="ts">
import SkipLink from '$components/SkipLink.svelte';
import '$styles/app.scss';
import Header from "$components/Header.svelte";
import type {LayoutData} from "./$types";
import { page } from '$app/stores';

export let data: LayoutData;

console.log($page.data.user.email)
// console.log($data.user.email)
</script>

<svelte:head>
	<meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
</svelte:head>

<svelte:body></svelte:body>

<SkipLink />
<Header />


<main id="main">
	<slot></slot>
</main>

<!--<Footer />-->
