<script lang='ts'>
	import { Dialog } from 'bits-ui';
	import { fade } from 'svelte/transition';
	import { flyAndScale } from '$lib/transitions';
	import { X } from 'phosphor-svelte';

	export let isOpen = false;
	// export let onClose = undefined;
	export let title: string;
</script>

<Dialog.Root open={isOpen} on:close={() => (isOpen = false)}>
	<Dialog.Portal>
		<Dialog.Overlay
			transition={fade}
			transitionConfig={{ duration: 150 }}
			class="modal-overlay"
		/>
		<Dialog.Content transition={flyAndScale} class="modal-content">
			<Dialog.Title>{title}</Dialog.Title>

			<div class="modal-body">
				<slot name='modal-content' />
			</div>

			<div class="modal-actions">
				<slot name='modal-actions' />
			</div>
			<!--			<div>-->
			<!--				<Dialog.Close-->
			<!--					class="inline-flex h-input items-center justify-center rounded-input bg-dark px-[50px] text-[15px] font-semibold text-background shadow-mini hover:bg-dark/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-98"-->
			<!--				>-->
			<!--					Salva-->
			<!--				</Dialog.Close>-->
			<!--			</div>-->

			<Dialog.Close class="" on:click={() => (isOpen = false)}>
				<div>
					<X class="size-5 text-foreground" />
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

