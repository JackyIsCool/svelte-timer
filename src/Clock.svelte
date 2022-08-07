<script lang="ts">
	import { ClockState } from "./ClockState";

    export let msecond: number;
	export let currentState: ClockState;

	let isTyping: boolean;

	$: formatedHour = String(Math.floor(msecond / 3600000)).padStart(2, '0');
	$: formatedMinute = String(Math.floor(msecond % 3600000 / 60000)).padStart(2, '0');
	$: formatedSecond = String(Math.floor(msecond % 60000 / 1000)).padStart(2, '0');
	$: formatedMsecond = String(msecond % 1000).padStart(3, '0');
    
	function syncTypedTime() {
		let endResult: number = parseInt(formatedHour) * 3600000 + parseInt(formatedMinute) * 60000 + parseInt(formatedSecond) * 1000;
		msecond = endResult >= 0 ? endResult : 0; // Prevent time less than 0
	}
	function addTime(time:number) {
		let endResult: number = msecond + time;
		msecond = endResult >= 0 ? endResult : 0; // Prevent time less than 0
	}
	function scrollTime(event: WheelEvent, multiplier: number) {
		if (currentState !== ClockState.countdown)
			return;
		// Fun fact: Math.sign(number) turn the number to raw(-1, 0,or 1)
		addTime(Math.sign(event.deltaY) * multiplier);
	}
	function onType(this: HTMLElement, event: KeyboardEvent) {
		if (event.key === "Enter")
			this.blur();
	}
	function msecond2Second(millisecond: number): number {
		return millisecond / 1000;	
	}
	function msecond2Minute(millisecond: number): number {
		return millisecond / 360000;	
	}
    // setInterval(() => {
    //     console.log(second);
    // })
</script>
<main class="center">
	{#if currentState === ClockState.countdown}
	{#each [3600, 60, 1, -3600, -60, -1] as second}
		<button style="grid-area: btn-{second}" on:click={() => addTime(second * 1000)} class="shadow-btn">
			<img 
				src={second > 0 ? "img/up_arrow.png" : "img/down_arrow.png"}
				alt=""
			/>
		</button>
	{/each}
	{/if}
	<input bind:value={formatedHour} style="grid-area: hour-text" 
		type="number" class="time-text" class:input-text={isTyping} on:wheel={(e) => scrollTime(e, 3600000)} on:keypress={onType} on:blur={()=>{syncTypedTime(); isTyping = false}} on:focus={()=>isTyping = true} readonly={currentState !== ClockState.countdown} />
	<input bind:value={formatedMinute} style="grid-area: min-text" 
		type="number" class="time-text" class:input-text={isTyping} on:wheel={(e) => scrollTime(e, 60000)} on:keypress={onType} on:blur={()=>{syncTypedTime(); isTyping = false}} on:focus={()=>isTyping = true} readonly={currentState !== ClockState.countdown} />
	<input bind:value={formatedSecond} style="grid-area: sec-text" 
		type="number" class="time-text" class:input-text={isTyping} on:wheel={(e) => scrollTime(e, 1000)} on:keypress={onType} on:blur={()=>{syncTypedTime(); isTyping = false}} on:focus={()=>isTyping = true} readonly={currentState !== ClockState.countdown} />
	{#if currentState === ClockState.timer}	
	<div class="ms-text" style="grid-area: ms-text;">{formatedMsecond}</div>
	{/if}
	
	<div class="time-text" style="grid-area: colon-1;">:</div>
	<div class="time-text" style="grid-area: colon-2;">:</div>
</main>
<style lang="scss">
	@import "Global.scss";
	main {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr 2fr 1fr 2fr 1fr;
		grid-template-areas:
			".	btn-3600	. 		btn-60		.		btn-1		."
			".	hour-text 	colon-1 min-text	colon-2	sec-text	ms-text"
			".	btn--3600	. 		btn--60		. 		btn--1		.";
		// grid-template-columns: 3fr 1fr 3fr 1fr 3fr;
		justify-items: center;
		padding: 0 10vw;
	}
	.time-text {
		color: var(--foreground-color);
		font-size: 12vw;
		padding: 0;
		margin: 0;
		text-align: center;
		align-self: baseline;
	}
	.ms-text {
		@extend .time-text;
		align-self: baseline;
		font-size: 4vw;
		color: #605e5c;
	}
	.input-text {
		&:not(:focus) {
			opacity: .4;
			transition: 200ms;
		}
	}
	button {
		@extend .circle-btn;
	}
	.center {
		position: absolute;
  		top: 50%;
		transform: translateY(-50%);
	}
    input {
		width: 100%;
		display: inline-block;
		border: none;
		background-color: transparent;
		&:focus {
			outline: none;
		}
	}
	/* Disable the up and down button when hovering on the input box */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type=number] {
		-moz-appearance: textfield;
	}
</style>