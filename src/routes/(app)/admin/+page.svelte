<script lang="ts">
	import { ChevronRight, Swords, UsersRound } from '@lucide/svelte';
	import Main from '#components/Main.svelte';
	import PageTitle from '#components/PageTitle.svelte';

	const sections = [
		{
			href: '/admin/players',
			title: 'Giocatori',
			description: 'Aggiungi, modifica o disattiva i giocatori',
			icon: UsersRound,
		},
		{
			href: '/admin/tournaments',
			title: 'Tornei',
			description: 'Gestisci tornei, partite e punteggi',
			icon: Swords,
		},
	];
</script>

<PageTitle title="Gestione 654" variant="admin" />

<Main>
	<ul class="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
		{#each sections as section (section.href)}
			<li>
				<a
					href={section.href}
					class="panel flex h-full items-center gap-4 p-5 transition-colors hover:bg-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2"
				>
					<span
						class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
					>
						<section.icon size={24} aria-hidden="true" />
					</span>
					<span class="flex min-w-0 flex-1 flex-col gap-3">
						<strong class="text-lg">{section.title}</strong>
						<span class="text-sm text-muted-foreground"
							>{section.description}</span
						>
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
</Main>
