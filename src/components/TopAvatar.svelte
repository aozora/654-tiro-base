<script lang="ts">
	// PROPS
	import { getCldImageUrl } from 'svelte-cloudinary';

	export let picture: string;
	export let name: string;
	export let className: string = '';
	export let size: number = 24;
	export let index: number;

	let initials: string;
	$:initials = name[0] + name[1];

	const getPictureUrl = (publicId: string) => {
		return getCldImageUrl({
			width: size + 3,
			height: size + 3,
			src: publicId
		});
	};
</script>

<div class="avatar" class:className style:--size={`${size}px`}>
	{#if picture}
		<img src={getPictureUrl(picture)} alt="" class="avatar-picture" />
	{:else }
		<span class="avatar-initials">{initials}</span>
	{/if}

	{#if index === 0}
		<svg xmlns="http://www.w3.org/2000/svg" width="38" height="29" fill="none">
			<rect width="38" height="14" y="15" fill="#C7F064" rx="2" />
			<path fill="#C7F064" d="m6 4 4.33 11.25H1.67L6 4ZM18.5 0l5.63 15H12.87L18.5 0ZM32 4l4.33 11.25h-8.66L32 4Z" />
		</svg>
	{/if}

	<div class="position">{index + 1}</div>
</div>

<style lang="scss">
  .avatar {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background-color: var(--color-brand);
  }

  .avatar-picture {
    width: var(--size);
		max-width: none;
    height: var(--size);
		object-fit: cover;
    border-radius: 50%;
    border: 3px solid #C7F064;
  }

  .avatar-initials {
    font-size: var(--text-scale-20);
		--text-weight: var(--font-weight-bold);
    font-variation-settings: "wght" var(--text-weight);
    text-transform: uppercase;
  }

  svg {
    position: absolute;
    top: -14%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .position {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
		width: 20px;
		height: 20px;
    border-radius: 50%;
    background-color: #C7F064;
  }
</style>
