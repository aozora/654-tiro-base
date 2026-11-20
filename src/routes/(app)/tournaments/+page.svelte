<script lang="ts">
	import { ChevronRight, Trophy } from '@lucide/svelte';
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { tournaments } = $derived(data);

	const activeTournament = $derived(tournaments.find((t) => t.isActive));
	const otherTournaments = $derived(
		tournaments.filter((t) => t.id !== activeTournament?.id),
	);

	const matchesLabel = (count: number) =>
		count === 1 ? '1 partita' : `${count} partite`;
</script>

<PageTitle title="Tornei" />

<Main>
	<div class="mx-auto flex w-full max-w-xl flex-col gap-10">
		<section aria-labelledby="active-title">
			<h2
				id="active-title"
				class="mb-4 px-1 text-sm font-medium text-muted-foreground"
			>
				Torneo attuale
			</h2>

			{#if activeTournament}
				<a
					href={`/leaderboard/${activeTournament.id}`}
					class="panel flex items-center gap-4 border-primary/60 bg-primary/15 p-5 transition-colors hover:bg-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					<span
						class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
					>
						<Trophy size={24} aria-hidden="true" />
					</span>
					<span class="flex min-w-0 flex-1 flex-col gap-3">
						<strong class="text-lg wrap-anywhere"
							>{activeTournament.title}</strong
						>
						<span class="text-sm text-muted-foreground">
							{matchesLabel(activeTournament.matchesCount)} · In corso
						</span>
					</span>
					<ChevronRight
						size={20}
						class="shrink-0 text-muted-foreground"
						aria-hidden="true"
					/>
				</a>
			{:else}
				<p class="panel px-6 py-8 text-center text-muted-foreground">
					Non c'è un torneo attivo.
				</p>
			{/if}
		</section>

		<section aria-labelledby="past-title">
			<h2
				id="past-title"
				class="mb-4 px-1 text-sm font-medium text-muted-foreground"
			>
				Tornei precedenti
			</h2>

			{#if otherTournaments.length > 0}
				<ul class="panel divide-y">
					{#each otherTournaments as t (t.id)}
						<li>
							<a href={`/leaderboard/${t.id}`} class="panel-row">
								<strong class="min-w-0 flex-1 text-base wrap-anywhere"
									>{t.title}</strong
								>
								<span
									class="shrink-0 text-sm text-muted-foreground tabular-nums"
								>
									{matchesLabel(t.matchesCount)}
								</span>
								<ChevronRight
									size={20}
									class="shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="panel px-6 py-8 text-center text-muted-foreground">
					Non ci sono altri tornei.
				</p>
			{/if}
		</section>
	</div>
</Main>
