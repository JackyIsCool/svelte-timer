<script lang="ts">
	import Clock from "./Clock.svelte";
	import SwitchButton from "./SwitchButton.svelte";
	import { ClockState } from "./ClockState";
	import ToggleButton from "./ToggleButton.svelte";
	import { onMount } from "svelte";
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
		if (Notification.permission !== "granted") {
			alert("Time Up");
			Notification.requestPermission();
		}	
		else {
			var notification = new Notification("Times Up!", {
				icon: "favicon.png",
				body: "倒计时已结束",
			});
			notification.onclick = function() {
				// Do something on user click the notification
			};
		}
	}

	onMount(() => {
		if (!Notification) {
			// alert("It seems like your current browser doesn't support notification\n你的浏览器不支持消息提醒");
			return;
		}
 		if (Notification.permission !== "granted")
  			Notification.requestPermission();
	})
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
	{#if currentState == ClockState.countdown}
		<div class="center">
			<div class="button-container">
			{#each [3600, 60, 1] as value}
				<button on:click={() => addTime(value)} class="up-down-button pad-0">
					<img src="img/up_arrow.png" alt="">
				</button>
			{/each}
			</div>
			<Clock bind:second={secondLeft} readonly={false}/>
			<div class="button-container">
			{#each [-3600, -60, -1] as value}
				<button on:click={() => addTime(value)} class="up-down-button pad-0">
					<img src="img/down_arrow.png" alt="">
				</button>
			{/each}
			</div>
		</div>
		<ToggleButton bind:value={isCountingDown}/>
	{:else if currentState == ClockState.time}
		<div class="center">
			<Clock second={secondSinceMorning} />
		</div>
	{:else if currentState == ClockState.timer}
		<div class="center">
			<Clock second={secondPassed} />
		</div>
		<ToggleButton bind:value={isCountingUp}/>
	{/if}
	<SwitchButton bind:currentState/> 
</main>

<style lang="scss">
	main {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}
	.center {
		position: absolute;
  		top: 50%;
		transform: translateY(-50%);
	}
	.button-container {
		display: flex;
		justify-content: space-evenly;
		button {
			@extend :global(.shadow-button);
			border: none;
			border-radius: 100%;
			height: 50px;
			width: 50px;
			background-color: var(--second-background-color);
			img {
				// Set png icon to white if is in light mode
				filter: brightness(var(--is-dark-mode));
			}
		}
	}
	:global(.shadow-button) {
        box-shadow: 1px 1px 3px black;
		cursor: pointer;
        &:active {
            box-shadow: inset 1px 1px 3px black;
        }
	}
	.pad-0 {
		padding: 0;
	}
	.up-down-button {
		background-color: transparent;
		cursor: pointer;
		height: 1000px;
	}
</style>