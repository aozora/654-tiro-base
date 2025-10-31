<script lang="ts">
	import MobileMenu from '$components/MobileMenu.svelte';
	import { page } from '$app/state';
	import { MediaQuery } from 'svelte/reactivity';
	import { Dices } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	// import { Button } from '$lib/components/ui/button';
	// import { toggleMode } from 'mode-watcher';
	// import MoonIcon from "@lucide/svelte/icons/moon";
	// import SunIcon from "@lucide/svelte/icons/sun";

	const { user } = $props();

	const isDesktop = new MediaQuery('min-width: 40em');
	const isMobile = $derived(!isDesktop.current);
	let isOpen = $state(false);

	const onClose = () => {
		isOpen = false;
	};
</script>

<header class={cn(
	"header sticky top-0 z-10 flex h-16 items-center justify-between p-4 px-4",
	"bg-gradient-to-b from-black via-black/80 to-black/40"
)}>
	<a href="/" class="logo">
		{#if page.data.tournament}
			<span>{page.data.tournament.title}</span>
		{:else}
			<span>654 tiro base</span>
		{/if}
	</a>

	{#if !isMobile}
		<nav class="menu flex-1">
			<ul class="flex items-center justify-end gap-4">
<!--				<li>-->
<!--					<Button onclick={toggleMode} variant="ghost" size="icon" class="cursor-pointer">-->
<!--						<SunIcon-->
<!--							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"-->
<!--						/>-->
<!--						<MoonIcon-->
<!--							class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"-->
<!--						/>-->
<!--						<span class="sr-only">Toggle theme</span>-->
<!--					</Button>-->
<!--				</li>-->
				<li>
					<a href="/leaderboard"
						 class="cursor-pointer text-base text-primary transition hover:underline">Classifica</a>
				</li>
				<li>
					<a href="/tournaments"
						 class="cursor-pointer text-base text-primary transition hover:underline">Tornei</a>
				</li>

				{#if user && user?.role === 'admin'}
					<li>
						<a href="/admin"
							 class="cursor-pointer text-base text-primary transition hover:underline">Amministrazione</a>
					</li>
				{/if}

				<li class="logout">
					<form action="/logout" method="POST">
						<button type="submit"
										class="cursor-pointer text-base text-primary transition hover:underline">Esci
						</button>
					</form>
				</li>
			</ul>
		</nav>
	{:else}
		<button
			type="button"
			class="toggle-menu z-101"
			aria-expanded={isOpen}
			onclick={() => (isOpen = !isOpen)}
		>
			<Dices size="36" />
		</button>

		<MobileMenu open={isOpen} {user} {onClose} />
	{/if}
</header>

