<script lang="ts">
	import Clock from "./Clock.svelte";
	import SwitchButton from "./SwitchButton.svelte";
	import { ClockState } from "./ClockState";
	import ToggleButton from "./ToggleButton.svelte";
	import { onMount } from "svelte";

	// Current Clock
	let currentState: ClockState = ClockState.countdown;

	// Countdown
	let isCountingDown: boolean = false;
	export let secondLeft: number = 0;	//In second
	// Time
	let secondSinceMorning: number;
	// Timer
	let isCountingUp: boolean = false;
	$: {
		if (isCountingUp)
			startTimer()
		else
			stopTimer()
	}
	let secondPassed: number = 0;
	let timerStartTime: number;
	let timerInterval: NodeJS.Timer;
	
	// Countdown
	function countDown() {
		secondLeft --;
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
	// Timer
	function startTimer() {
		timerStartTime = Date.now() - secondPassed * 1000;	// Record the time of pressing start, and store [secondPassed] into it
		timerInterval = setInterval(() => {
			secondPassed = (Date.now() - timerStartTime) / 1000;
		});
	}
	function stopTimer() {
		clearInterval(timerInterval);
	}
	function resetTimer() {
		secondPassed = 0;
	}
	//
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
	}, 1000);
	setInterval(() => {
		const date = new Date();
		const timeInSecond = date.getTime() / 1000;
		const timeZoneOffsetSecond = date.getTimezoneOffset() * 60;
		secondSinceMorning = Math.floor((timeInSecond - timeZoneOffsetSecond) % 86400);
	});
	// Utools	
	function clockText2Second(text: string): number {	// example: "00:02:15" -> 135(seconds)
		let numbers: number[] = text.match(/\d+/g)?.map(Number)!;	// Get hour, minute, second in a number[]
		
		switch (numbers.length) {
			case 1:
				return numbers[0];
			case 2:
				return time2Second(numbers[1], numbers[0]);
			case 3:
				return time2Second(numbers[2], numbers[1], numbers[0]);
			default:
				return -1;
		}
	}
	// Example: "3m1m2s" -> 180s+60s+2s -> 242s
	function letterText2Second(text: string): number {
		// Separate all numbers in days, hours, minutes, second. Example: "3m1m4s" -> minutes = [3, 1]; seconds = [4]
		let days: number[] = text.match(/[0-9]+(?=d)/g)?.map(Number) ?? [];	// Set to [](empty array) if [text.match()] is undefined
		let hours: number[] = text.match(/[0-9]+(?=h)/g)?.map(Number) ?? [];
		let minutes: number[] = text.match(/[0-9]+(?=m)/g)?.map(Number) ?? [];
		let seconds: number[] = text.match(/[0-9]+(?=s)/g)?.map(Number) ?? [];
		// Sum up all the numbers in arrays
		let day = sum(days);
		let hour = sum(hours);
		let minute = sum(minutes);
		let second = sum(seconds);
		// get the result in second
		let result = time2Second(second, minute, hour, day);
		return result;
	}

	function sum(numbers: number[]): number {
		return numbers.reduce((a, b) => a + b, 0);
	}

	function time2Second(second: number, minute: number = 0, hour: number = 0, day: number = 0) {
		return (((day * 24) + hour) * 60 + minute) * 60 + second;
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
				case "countdown-input-clock":
					currentState = ClockState.countdown;
					secondLeft = clockText2Second(payload);
					isCountingDown = true;
					break;
				case "countdown-input-letter":
					currentState = ClockState.countdown;
					secondLeft = letterText2Second(payload);
					isCountingDown = true;
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