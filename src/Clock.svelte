<script lang="ts">
    export let second: number;
	export let readonly: boolean = true;
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
    // setInterval(() => {
    //     console.log(second);
    // })
</script>
<main class="center">
	<div class="button-container">
	{#each [3600, 60, 1] as value}
		<button on:click={() => addTime(value)} class="shadow-button">
			<img src="img/up_arrow.png" alt="">
		</button>
	{/each}
	</div>
    <form class="time-container">
        <input type="number" on:blur={syncTypedTime} bind:value={formatedHour} class="time-text" readonly={readonly}/>
        <div class="time-text">:</div>
        <input type="number" on:blur={syncTypedTime} bind:value={formatedMinute} class="time-text" readonly={readonly} />
        <div class="time-text">:</div>
        <input type="number" on:blur={syncTypedTime} bind:value={formatedSecond} class="time-text" readonly={readonly}/>
    </form>
	<div class="button-container">
	{#each [-3600, -60, -1] as value}
		<button on:click={() => addTime(value)} class="shadow-button">
			<img src="img/down_arrow.png" alt="">
		</button>
	{/each}
	</div>
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
	.button-container {
		display: flex;
		justify-content: space-evenly;
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
	}
	.center {
		position: absolute;
  		top: 50%;
		transform: translateY(-50%);
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