<script lang="ts">
	// PROPS
	let { picture, name } = $props();

	const initials: string = $derived(name[0] + name[1]);
</script>

<div class="avatar">
	{#if picture}
		<img src={picture} alt="" class="avatar-picture" />
	{:else }
		<div class="avatar-initials">{initials}</div>
	{/if}
</div>

<style lang="scss">
  .avatar {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid var(--color-dark);
    background-color: var(--color-brand);
  }

  .avatar-picture {
  }

  .avatar-initials {
    font-size: var(--text-scale-12);
    text-transform: uppercase;
  }
</style>
