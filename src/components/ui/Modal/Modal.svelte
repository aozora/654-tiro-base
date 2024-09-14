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

<style lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 50;
  }

  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90vw;
    max-width: 860px;
    min-width: 320px;
    max-height: 85vh;
    min-height: 200px;
    padding: 0 1rem;
    transform: translate(-50%, -50%);
    border-radius: var(--global-radius);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    z-index: 90;
    background-color: var(--color-white);

    h1 {
      margin: 0;
      padding: 1rem 3rem 1rem 1rem;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: 2rem;
    }

  }

  .modal-body {
    display: flex;
    flex-direction: column;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      flex: 1 1 50%;
      width: 50%;
      max-width: none;
    }
  }

  .modal-close {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--token-color-white);
    background-color: transparent;
    cursor: pointer;
  }
</style>
