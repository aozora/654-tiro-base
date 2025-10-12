<script lang="ts">
	import Main from '$components/Main.svelte';
	import AdminPageTitle from '$components/AdminPageTitle.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
</script>

<AdminPageTitle title="Gestione 654" />

<Main className="flex flex-col pb-10">
	<div class="mx-auto w-full max-w-xl">
		<ul class="flex flex-col gap-4">
			<li class="h-12">
				<a href="/admin/players"
					 class={cn(
					buttonVariants({variant: "secondary"}),
					"h-12 w-full bg-indigo-500 hover:bg-indigo-700"
				)}>Gestione giocatori</a>
			</li>
			<li class="h-12">
				<a href="/admin/tournaments"
					 class={cn(
					buttonVariants({variant: "secondary"}),
					"h-12 w-full bg-indigo-500 hover:bg-indigo-700"
				)}>Gestione tornei</a>
			</li>
		</ul>
	</div>
</Main>
