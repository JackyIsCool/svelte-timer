<script lang="ts">
	import Clock from "./Clock.svelte";
	import SwitchButton from "./SwitchButton.svelte";
	import { ClockState } from "./ClockState";
	let secondLeft: number = 0;//In second
	let isCounting: boolean = false;
	let currentState: ClockState = ClockState.countdown;
	
	function toggleOnOff() {
		isCounting = !isCounting
	}
	function addTime(time:number) {
		let endResult: number = secondLeft + time;
		secondLeft = endResult >= 0 ? endResult : 0; // Prevent time less than 0
	}
	function countDown() {
		secondLeft --;
	}
	function alertTimeUp() {
		alert("Time Up");
	}
	setInterval(() => {
		if (isCounting) {
			countDown();
			if (secondLeft <= 0) {
				alertTimeUp();
				isCounting = false;
			}
		}
	}, 1000);
	setInterval(() => {
		console.log(currentState)
	});
</script>

<main>
	<SwitchButton bind:currentState/> 
	<section>
		<div class="button-container">
			<button on:click={() => addTime(3600)}>👆</button>
			<button on:click={() => addTime(60)}>👆</button>
			<button on:click={() => addTime(1)}>👆</button>
		</div>
		<Clock bind:second={secondLeft}/>
		<div class="button-container">
			<button on:click={() => addTime(-3600)}>👇</button>
			<button on:click={() => addTime(-60)}>👇</button>
			<button on:click={() => addTime(-1)}>👇</button>
		</div>
	</section>
	<button on:click={toggleOnOff}>
		{#if isCounting}
			Pause
		{:else}
			Start
		{/if}
	</button>
</main>

<style lang="scss">
	main {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}
	section {
		padding-top: 10vh;
	}
	.button-container {
		display: flex;
		justify-content: space-evenly;
		button {
			border: none;
			height: 50px;
			width: 50px;
		}
	}
</style>