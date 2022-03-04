<script lang="ts">
	import Clock from "./Clock.svelte";
	import SwitchButton from "./SwitchButton.svelte";
	import { ClockState } from "./ClockState";
	import ToggleButton from "./ToggleButton.svelte";
	export let secondLeft: number = 0;//In second
	let secondSinceMorning: number;
	let secondPassed: number = 0;
	let isCountingDown: boolean = false;
	let isCountingUp: boolean = false;
	let currentState: ClockState = ClockState.countdown;
	
	
	function addTime(time:number) {
		let endResult: number = secondLeft + time;
		secondLeft = endResult >= 0 ? endResult : 0; // Prevent time less than 0
	}
	function countDown() {
		secondLeft --;
	}
	function countUp() {
		secondPassed ++;
	}
	function alertTimeUp() {
		alert("Time Up");
	}
	setInterval(() => {
		if (isCountingDown) {
			if (secondLeft > 0) {
				countDown();	
			} 
			//Detect if secondLeft meet 0 after countDown()
			if (secondLeft <= 0) {
				alertTimeUp();
				isCountingDown = false;
			}
		}
		if (isCountingUp) {
			countUp();
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
		{#each [3600, 60, 1] as value}
			<button on:click={() => addTime(value)} class="shadow-button">👆</button>
		{/each}
		</div>
		<Clock bind:second={secondLeft} disabled={false}/>
		<div class="button-container">
		{#each [-3600, -60, -1] as value}
			<button on:click={() => addTime(value)} class="shadow-button">👇</button>
		{/each}
		</div>
		<ToggleButton bind:value={isCountingDown}/>
	{:else if currentState == ClockState.time}
		<Clock second={secondSinceMorning} />
	{:else if currentState == ClockState.timer}
		<Clock second={secondPassed} />
		<ToggleButton bind:value={isCountingUp}/>
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
	:global(.shadow-button) {
        box-shadow: 1px 1px 3px black;
        &:active {
            box-shadow: inset 1px 1px 3px black;
        }
	}
</style>