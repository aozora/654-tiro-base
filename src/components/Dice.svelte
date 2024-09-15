<script lang="ts">
	/* eslint-disable a11y-click-events-have-key-events */
	import { onMount } from 'svelte';

	let cube: HTMLDivElement;
	const min = 1;
	const max = 24;

	function getRandom(max:number, min:number) {
		return (Math.floor(Math.random() * (max - min)) + min) * 90;
	}

	function roll() {
		const xRand = getRandom(max, min);
		const yRand = getRandom(max, min);

		cube.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
	}

	onMount(() => {
		roll();
	});

	const onClick = () => {
		roll();
	};
</script>

<section class="container">
	<div id="cube" bind:this={cube} on:click={() => onClick()}>
		<div class="front">
			<span class="dot dot1"></span>
		</div>
		<div class="back">
			<span class="dot dot1"></span>
			<span class="dot dot2"></span>
		</div>
		<div class="right">
			<span class="dot dot1"></span>
			<span class="dot dot2"></span>
			<span class="dot dot3"></span>
		</div>
		<div class="left">
			<span class="dot dot1"></span>
			<span class="dot dot2"></span>
			<span class="dot dot3"></span>
			<span class="dot dot4"></span>
		</div>
		<div class="top">
			<span class="dot dot1"></span>
			<span class="dot dot2"></span>
			<span class="dot dot3"></span>
			<span class="dot dot4"></span>
			<span class="dot dot5"></span>
		</div>
		<div class="bottom">
			<span class="dot dot1"></span>
			<span class="dot dot2"></span>
			<span class="dot dot3"></span>
			<span class="dot dot4"></span>
			<span class="dot dot5"></span>
			<span class="dot dot6"></span>
		</div>
	</div>
</section>

<style lang="scss">
  #cube .front {
    transform: translateZ(100px);
  }

  #cube .back {
    transform: rotateX(-180deg) translateZ(100px);
  }

  #cube .right {
    transform: rotateY(90deg) translateZ(100px);
  }

  #cube .left {
    transform: rotateY(-90deg) translateZ(100px);
  }

  #cube .top {
    transform: rotateX(90deg) translateZ(100px);
  }

  #cube .bottom {
    transform: rotateX(-90deg) translateZ(100px);
  }

  .container {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto 40px;
    border: 1px solid #FFF;
    perspective: 1000px;
    perspective-origin: 50% 100%;
  }

  #cube {
    position: absolute;
    //top: 100px;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 6s;
  }

  #cube:hover {
    cursor: pointer;
  }

  #cube div {
    background: #FF4544;
    display: block;
    position: absolute;
    width: 200px;
    height: 200px;
    border: 2px solid #ab1a1a;
    margin: 0 auto;
    padding: 50px 0;
  }

  .dot {
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 15px;
  }

  .front .dot1 {
    top: 85px;
    left: 85px;
  }

  .back .dot1 {
    top: 45px;
    left: 45px;
  }

  .back .dot2 {
    top: 125px;
    left: 125px;
  }

  .right .dot1 {
    top: 45px;
    left: 45px;
  }

  .right .dot2 {
    top: 85px;
    left: 85px;
  }

  .right .dot3 {
    top: 125px;
    left: 125px;
  }

  .left .dot1 {
    top: 45px;
    left: 45px;
  }

  .left .dot2 {
    top: 45px;
    left: 125px;
  }

  .left .dot3 {
    top: 125px;
    left: 45px;
  }

  .left .dot4 {
    top: 125px;
    left: 125px;
  }

  .top .dot1 {
    top: 45px;
    left: 45px;
  }

  .top .dot2 {
    top: 45px;
    left: 125px;
  }

  .top .dot3 {
    top: 85px;
    left: 85px;
  }

  .top .dot4 {
    top: 125px;
    left: 45px;
  }

  .top .dot5 {
    top: 125px;
    left: 125px;
  }

  .bottom .dot1 {
    top: 45px;
    left: 45px;
  }

  .bottom .dot2 {
    top: 45px;
    left: 85px;
  }

  .bottom .dot3 {
    top: 45px;
    left: 125px;
  }

  .bottom .dot4 {
    top: 125px;
    left: 45px;
  }

  .bottom .dot5 {
    top: 125px;
    left: 85px;
  }

  .bottom .dot6 {
    top: 125px;
    left: 125px;
  }
</style>
