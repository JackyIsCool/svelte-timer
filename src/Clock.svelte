<script lang="ts">
    export let second: number;
	export let readonly: boolean = true;
	$: formatedHour = String(Math.floor(second / 3600)).padStart(2, '0');
	$: formatedMinute = String(Math.floor(second % 3600 / 60)).padStart(2, '0');
	$: formatedSecond = String(Math.floor(second % 60)).padStart(2, '0');
    
	function syncTypedTime() {
		let endResult: number = parseInt(formatedHour) * 3600 + parseInt(formatedMinute) * 60 + parseInt(formatedSecond);
		second = endResult >= 0 ? endResult : 0; // Prevent time less than 0
		updateFormatedTime();
	}
    
	function updateFormatedTime() {
		formatedHour = String(Math.floor(second / 3600)).padStart(2, '0');
		formatedMinute = String(Math.floor(second % 3600 / 60)).padStart(2, '0');
		formatedSecond = String(Math.floor(second % 60)).padStart(2, '0');
	}
    // setInterval(() => {
    //     console.log(second);
    // })
</script>
<main>
    <form class="time-container">
        <input type="number" on:blur={syncTypedTime} bind:value={formatedHour} class="time-text" readonly={readonly}/>
        <div class="time-text">:</div>
        <input type="number" on:blur={syncTypedTime} bind:value={formatedMinute} class="time-text" readonly={readonly} />
        <div class="time-text">:</div>
        <input type="number" on:blur={syncTypedTime} bind:value={formatedSecond} class="time-text" readonly={readonly}/>
    </form>
</main>
<style lang="scss">
	.time-container {
		display: flex;
		justify-content: center;
		.time-text {
			color: var(--foreground-color);
			font-size: 12vw;
			padding: 0;
			margin: 0;
			text-align: center;
		}
		&:focus-within input:not(:focus) {
			opacity: .4;
			transition: 200ms;
		}
	}
    input {
		width: 20%;
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