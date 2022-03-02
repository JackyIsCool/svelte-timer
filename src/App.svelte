<script lang="ts">
	import Clock from "./Clock.svelte";
	import SwitchButton from "./SwitchButton.svelte";
	import { ClockState } from "./ClockState";
	export let secondLeft: number = 0;//In second
	let secondSinceMorning: number;
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
			if (secondLeft > 0) {
				countDown();	
			} 
			//Detect if secondLeft meet 0 after countDown()
			if (secondLeft <= 0) {
				alertTimeUp();
				isCounting = false;
			}
		}
	}, 1000);
	setInterval(() => {
		const date = new Date();
		const timeInSecond = date.getTime() / 1000;
		const timeZoneOffsetSecond = date.getTimezoneOffset() * 60;
		secondSinceMorning = Math.floor((timeInSecond - timeZoneOffsetSecond) % 86400);
	});
</script>

<main>
	<SwitchButton bind:currentState/> 
	<section>
	{#if currentState == ClockState.countdown}		
		<div class="button-container">
			<button on:click={() => addTime(3600)}>👆</button>
			<button on:click={() => addTime(60)}>👆</button>
			<button on:click={() => addTime(1)}>👆</button>
		</div>
		<Clock bind:second={secondLeft} disabled={false}/>
		<div class="button-container">
			<button on:click={() => addTime(-3600)}>👇</button>
			<button on:click={() => addTime(-60)}>👇</button>
			<button on:click={() => addTime(-1)}>👇</button>
		</div>
	{:else if currentState == ClockState.time}
		<Clock second={secondSinceMorning} />
	{:else if currentState == ClockState.timer}
		<Clock bind:second={secondLeft} />
	{/if}
		
	{#if currentState == ClockState.countdown || currentState == ClockState.timer}
		<button on:click={toggleOnOff}>
			{#if isCounting}
				Pause
			{:else}
				Start
			{/if}
		</button>
	{/if}
	</section>
	
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