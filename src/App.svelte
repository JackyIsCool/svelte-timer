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
	
	function countDown() {
		secondLeft --;
	}
	function countUp() {
		secondPassed ++;
	}
	function resetTimer() {
		secondPassed = 0;
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
			
		window.utools.onPluginEnter(({code, type, payload}) => {
			// console.log('用户进入插件', code, type, payload);
			switch (code) {
				case "countdown":
					currentState = ClockState.countdown;
					break;
				case "time":
					currentState = ClockState.time;
					break;
				case "timer":
					currentState = ClockState.timer;
					break;
				default:
					break;
			}
		})
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
		<Clock bind:second={secondLeft} currentState={currentState} />
		<div class="btn-container">
			<ToggleButton bind:value={isCountingDown}/>
		</div>

	{:else if currentState == ClockState.time}
		<Clock second={secondSinceMorning} currentState={currentState} />

	{:else if currentState == ClockState.timer}
		<Clock second={secondPassed} currentState={currentState} />
		<div class="btn-container">
			<ToggleButton bind:value={isCountingUp}/>
			<button id="restart-btn" class="shadow-btn" on:click={resetTimer}>
				<img src="img/restart.png" alt="">
			</button>
		</div>
	{/if}
	<SwitchButton bind:currentState/> 
</main>

<style lang="scss">
	@import "Global.scss";
	main {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}
	.btn-container {
		display: flex;
		gap: 10px;
		align-items: center;
        position: fixed;
        left: calc(50% - 30px);	// 30px=half of the [ToggleButton](aka first button)
        bottom: 6vh;
	}
	#restart-btn {
		@extend .circle-btn;
		width: 30px;
		height: 30px;;
	}
</style>