<script lang="ts">
	import { cn } from '$lib/utils';

	let { open, user, onClose } = $props();

	const closeOnClick = () => {
		if (onClose) {
			onClose();
		}
	};
</script>

<div class={cn(
	"mobile-menu fixed w-screen h-screen top-0 left-0 bg-background p-4",
	"z-100 translate-x-full transition-transform duration-500",
	open && "translate-x-0",
	)}>
	<header class="flex justify-center items-center h-16">
		<h1 class="text-5xl">Menu</h1>
	</header>
	<nav>
		<ul class="flex flex-col gap-4 mt-12">
			<li class="h-12">
				<a class="text-3xl" href="/leaderboard" onclick={()=> closeOnClick()}>Classifica</a>
			</li>
			<li class="h-12">
				<a class="text-3xl" href="/tournaments" onclick={()=> closeOnClick()}>Tornei</a>
			</li>

			{#if user && user?.role === 'admin'}
				<li class="h-12">
					<a class="text-3xl" href="/admin" onclick={()=> closeOnClick()}>Amministrazione</a>
				</li>
			{/if}

			<li class="h-12">
				<form action="/logout" method="POST">
					<button type="submit" class="text-3xl">Esci</button>
				</form>
			</li>
		</ul>
	</nav>
</div>
