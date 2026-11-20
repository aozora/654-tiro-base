<script lang="ts">
	import { page } from '$app/state';
	import { LogOut, Settings, Swords, Trophy } from '@lucide/svelte';
	import { cn } from '#lib/utils.ts';

	const { user } = $props();

	const links = $derived([
		{
			href: '/leaderboard',
			label: 'Classifica',
			icon: Trophy,
			// Player and match pages are reached from the leaderboard
			sections: ['/leaderboard', '/player', '/matches'],
		},
		{
			href: '/tournaments',
			label: 'Tornei',
			icon: Swords,
			sections: ['/tournaments'],
		},
		...(user?.role === 'admin'
			? [
					{
						href: '/admin',
						label: 'Admin',
						icon: Settings,
						sections: ['/admin'],
					},
				]
			: []),
	]);

	const isCurrent = (sections: string[]) =>
		sections.some((section) => page.url.pathname.startsWith(section));
</script>

<header
	class="sticky top-0 z-20 border-b bg-background pt-[env(safe-area-inset-top)] [view-transition-name:site-header]"
>
	<div
		class="mx-auto flex h-14 w-full max-w-5xl items-center gap-4 px-4 md:px-6"
	>
		<a
			href="/leaderboard"
			class="font-brutal text-xl whitespace-nowrap text-brand sm:text-2xl"
			>654 tiro base</a
		>

		<nav class="ml-auto hidden sm:block" aria-label="Principale">
			<ul class="flex items-center gap-1">
				{#each links as link (link.href)}
					{@const current = isCurrent(link.sections)}
					<li>
						<a
							href={link.href}
							aria-current={current ? 'page' : undefined}
							class={cn(
								'inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors',
								'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
								current &&
									'bg-accent text-foreground underline decoration-brand decoration-2 underline-offset-8',
							)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<form action="/logout" method="POST" class="ml-auto flex sm:ml-0">
			<button
				type="submit"
				class="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground sm:h-9"
			>
				<LogOut size={18} aria-hidden="true" />
				<span>Esci</span>
			</button>
		</form>
	</div>
</header>

<!-- Mobile: primary navigation stays within thumb reach -->
<nav
	class="fixed inset-x-0 bottom-0 z-20 border-t bg-background pb-[env(safe-area-inset-bottom)] [view-transition-name:tab-bar] sm:hidden"
	aria-label="Principale"
>
	<ul class="mx-auto flex max-w-md">
		{#each links as link (link.href)}
			{@const current = isCurrent(link.sections)}
			<li class="flex-1">
				<a
					href={link.href}
					aria-current={current ? 'page' : undefined}
					class={cn(
						'flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
						current ? 'text-foreground' : 'text-muted-foreground',
					)}
				>
					<span
						class={cn(
							'flex h-8 w-14 items-center justify-center rounded-md transition-colors',
							current && 'bg-primary text-primary-foreground',
						)}
					>
						<link.icon size={20} aria-hidden="true" />
					</span>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
