<script lang="ts">
	import Main from '$components/Main.svelte';
	import PageTitle from '$components/PageTitle.svelte';
	import type { PageProps } from './$types';
	import { ChevronRight } from '@lucide/svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { data }: PageProps = $props();
	const { tournaments } = data;

	const activeTournament = tournaments.find((t) => t.isActive);
	const otherTournaments = tournaments.filter((t) => t.id !== activeTournament?.id);
</script>

<Main className="user-page">
	<div class="flex flex-col gap-4 justify-center items-center">
		<PageTitle title="Tornei" />

		<h2 class="mb-4">Torneo attuale:</h2>

		{#if activeTournament}
			<ul class="flex w-full flex-col items-center gap-4">
				<li class="h-12">
					<a href={`/leaderboard/${activeTournament.id}`}
						 class={cn(
							 buttonVariants({variant: "secondary"}),
							 "h-12 w-full bg-indigo-500 hover:bg-indigo-700"
							 )}>
						<strong>{activeTournament.title}</strong>
						<ChevronRight size="24" />
					</a>
				</li>
			</ul>
		{:else}
			<p class="mb-4">Non c'è un torneo attivo</p>
		{/if}

		<h2 class="mb-4">Tornei precedenti:</h2>
		{#if otherTournaments && otherTournaments.length > 0}
			<ul class="flex w-full flex-col items-center gap-4">
				{#each otherTournaments as t}
					<li class="h-12">
						<a href={`/leaderboard/${t.id}`}
							 class={cn(
							 buttonVariants({variant: "secondary"}),
							 "h-12 w-full bg-indigo-500 hover:bg-indigo-700"
							 )}>
							<strong>{t.title}</strong>
							<ChevronRight size="24" />
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="mb-4">Non ci sono altri tornei.</p>
		{/if}
	</div>
</Main>
