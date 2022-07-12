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
		<Clock bind:second={secondLeft} readonly={false}/>
		<ToggleButton bind:value={isCountingDown}/>

	{:else if currentState == ClockState.time}
		<Clock second={secondSinceMorning} />

	{:else if currentState == ClockState.timer}
		<Clock second={secondPassed} />
		<ToggleButton bind:value={isCountingUp}/>
	{/if}
	<SwitchButton bind:currentState/> 
</main>

<style lang="scss">
	main {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}
	:global(.shadow-button) {
        box-shadow: 1px 1px 3px black;
		cursor: pointer;
        &:active {
            box-shadow: inset 1px 1px 3px black;
        }
	}
</style>