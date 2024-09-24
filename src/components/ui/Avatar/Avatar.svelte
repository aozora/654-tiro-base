<script lang="ts">
	// PROPS
	import { getCldImageUrl } from 'svelte-cloudinary';

	export let picture: string;
	export let name: string;
	export let className: string = '';
	export let size: number = 24;

	let initials: string;
	$:initials = name[0] + name[1];

	const getPictureUrl = (publicId: string) => {
		return getCldImageUrl({
			width: size,
			height: size,
			src: publicId
		});
	};
</script>

<div class="avatar" class:className style:--size={`${size}px`}>
	{#if picture}
		<img src={getPictureUrl(picture)} alt="" class="avatar-picture" />
	{:else }
		<div class="avatar-initials">{initials}</div>
	{/if}
</div>

<style lang="scss">
  .avatar {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    border: 1px solid var(--color-dark);
    background-color: var(--color-brand);
  }

  .avatar-picture {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }

  .avatar-initials {
    font-size: var(--text-scale-12);
    text-transform: uppercase;
  }
</style>
