<script lang="ts">
	// PROPS
	import { getCldImageUrl } from 'svelte-cloudinary';

	export let picture: string;
	export let name: string;

	let initials: string;
	$:initials = name[0] + name[1];

	const getPictureUrl = (publicId: string) => {
		return getCldImageUrl({
			width: 24,
			height: 24,
			src: publicId
		});
	};
</script>

<div class="avatar">
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
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid var(--color-dark);
    background-color: var(--color-brand);
  }

  .avatar-picture {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .avatar-initials {
    font-size: var(--text-scale-12);
    text-transform: uppercase;
  }
</style>
