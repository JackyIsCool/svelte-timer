<script lang="ts">
	import { ClockState } from "./ClockState";

    export let second: number;
	export let currentState: ClockState;

	let isTyping: boolean;

	$: formatedHour = String(Math.floor(second / 3600)).padStart(2, '0');
	$: formatedMinute = String(Math.floor(second % 3600 / 60)).padStart(2, '0');
	$: formatedSecond = String(Math.floor(second % 60)).padStart(2, '0');
    
	function syncTypedTime() {
		let endResult: number = parseInt(formatedHour) * 3600 + parseInt(formatedMinute) * 60 + parseInt(formatedSecond);
		second = endResult >= 0 ? endResult : 0; // Prevent time less than 0
	}
	function addTime(time:number) {
		let endResult: number = second + time;
		second = endResult >= 0 ? endResult : 0; // Prevent time less than 0
	}
	function onType(this: HTMLElement, event: KeyboardEvent) {
		if (event.key === "Enter")
			this.blur();
	}
    // setInterval(() => {
    //     console.log(second);
    // })
</script>
<main class="center">
	{#if currentState === ClockState.countdown}
	{#each [3600, 60, 1, -3600, -60, -1] as value}
		<button style="grid-area: btn-{value}" on:click={() => addTime(value)} class="shadow-button">
			<img 
				src={value > 0 ? "img/up_arrow.png" : "img/down_arrow.png"}
				alt=""
			/>
		</button>
	{/each}
	{/if}
	<input bind:value={formatedHour} style="grid-area: hour-text" 
		type="number" class="time-text" class:input-text={isTyping} on:keypress={onType} on:blur={()=>{syncTypedTime(); isTyping = false}} on:focus={()=>isTyping = true} readonly={currentState !== ClockState.countdown} />
	<input bind:value={formatedMinute} style="grid-area: min-text" 
		type="number" class="time-text" class:input-text={isTyping} on:keypress={onType} on:blur={()=>{syncTypedTime(); isTyping = false}} on:focus={()=>isTyping = true} readonly={currentState !== ClockState.countdown} />
	<input bind:value={formatedSecond} style="grid-area: sec-text" 
		type="number" class="time-text" class:input-text={isTyping} on:keypress={onType} on:blur={()=>{syncTypedTime(); isTyping = false}} on:focus={()=>isTyping = true} readonly={currentState !== ClockState.countdown} />
	<div class="time-text" style="grid-area: colon-1;">:</div>
	<div class="time-text" style="grid-area: colon-2;">:</div>
</main>
<style lang="scss">
	main {
		display: grid;
		grid-template-areas:
			"btn-3600	. 		btn-60		.		btn-1"
			"hour-text 	colon-1 min-text	colon-2	sec-text"
			"btn--3600	. 		btn--60		. 		btn--1";
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
	}
	.input-text {
		&:not(:focus) {
			opacity: .4;
			transition: 200ms;
		}
	}
	button {
		border: none;
		border-radius: 100%;
		height: 50px;
		width: 50px;
		background-color: var(--second-background-color);
		
		img {
			// Set png icon to white if is in light mode
			width: 100%;
			height: 100%;
			filter: brightness(var(--is-dark-mode));
		}
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