<script>
	import Dice from '$components/Dice.svelte';
</script>

<div class="page-loader">
	<Dice />
</div>

<style lang="scss">
  .page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
  }
</style>
