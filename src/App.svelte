<script lang="ts">
	let secondLeft: number = 0;//In second
	$: formatedHour = String(Math.floor(secondLeft / 3600)).padStart(2, '0');
	$: formatedMinute = String(Math.floor(secondLeft % 3600 / 60)).padStart(2, '0');
	$: formatedSecond = String(Math.floor(secondLeft % 60)).padStart(2, '0');
	let isCounting = false;
	
	function toggleOnOff() {
		isCounting = !isCounting
	}
	function addTime(time:number) {
		let endResult: number = secondLeft + time;
		secondLeft = endResult >= 0 ? endResult : 0; // Prevent time less than 0
	}
	function syncTypedTime() {
		let endResult: number = parseInt(formatedHour) * 3600 + parseInt(formatedMinute) * 60 + parseInt(formatedSecond);
		secondLeft = endResult >= 0 ? endResult : 0; // Prevent time less than 0
		updateFormatedTime();
	}
	function updateFormatedTime() {
		formatedHour = String(Math.floor(secondLeft / 3600)).padStart(2, '0');
		formatedMinute = String(Math.floor(secondLeft % 3600 / 60)).padStart(2, '0');
		formatedSecond = String(Math.floor(secondLeft % 60)).padStart(2, '0');
	}
	function countDown() {
		secondLeft --;
	}
	function alertTimeUp() {
		alert("Time Up");
	}
	setInterval(() => {
		if (isCounting) {
			countDown();
			if (secondLeft <= 0) {
				alertTimeUp();
				isCounting = false;
			}
		}
	}, 1000);
	setInterval(() => {
		console.log(secondLeft);
	}, 10)
</script>

<main>
	<section>
		<div class="button-container">
			<button on:click={() => addTime(3600)}>👆</button>
			<button on:click={() => addTime(60)}>👆</button>
			<button on:click={() => addTime(1)}>👆</button>
		</div>
		<form class="time-container">
			<input type="number" on:blur={syncTypedTime} bind:value={formatedHour} class="time-text"/>
			<div class="time-text">:</div>
			<input type="number" on:blur={syncTypedTime} bind:value={formatedMinute} class="time-text"/>
			<div class="time-text">:</div>
			<input type="number" on:blur={syncTypedTime} bind:value={formatedSecond} class="time-text"/>
		</form>

		<div class="button-container">
			<button on:click={() => addTime(-3600)}>👇</button>
			<button on:click={() => addTime(-60)}>👇</button>
			<button on:click={() => addTime(-1)}>👇</button>
		</div>
	</section>
	<button on:click={toggleOnOff}>
		{#if isCounting}
			Pause
		{:else}
			Start
		{/if}
	</button>
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
	.time-container {
		display: flex;
		justify-content: center;
		.time-text {
			font-size: 10rem;
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