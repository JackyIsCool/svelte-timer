<script>
	$: secondLeft = 0;//In second
	$: formatedHour = String(Math.floor(secondLeft / 3600)).padStart(2, '0');
	$: formatedMinute = String(Math.floor(secondLeft % 3600 / 60)).padStart(2, '0');
	$: formatedSecond = String(Math.floor(secondLeft % 60)).padStart(2, '0');
	let isCounting = false;
	function toggleOnOff() {
		isCounting = !isCounting
	}
	function addTime(time) {
		secondLeft += time;
	}
	function countDown() {
		secondLeft --;
	}
	function syncTypedTime() {
		secondLeft = parseInt(formatedMinute) * 60 + parseInt(formatedSecond);
		console.log(secondLeft);
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
</script>

<main>
	<section>
		<div class="button-container">
			<button on:click={() => addTime(3600)}>+1h</button>
			<button on:click={() => addTime(60)}>+1m</button>
			<button on:click={() => addTime(1)}>+1s</button>
		</div>
		<div class="time-container">
			<input on:blur={syncTypedTime} bind:value={formatedHour} class="time-text"/>
			<div class="time-text">:</div>
			<input on:blur={syncTypedTime} bind:value={formatedMinute} class="time-text"/>
			<div class="time-text">:</div>
			<input on:blur={syncTypedTime} bind:value={formatedSecond} class="time-text"/>
		</div>

		<div class="button-container">
			<button on:click={() => addTime(-3600)}>-1h</button>
			<button on:click={() => addTime(-60)}>-1m</button>
			<button on:click={() => addTime(-1)}>-1s</button>
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

<style>
	main {
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}
	section {
		padding-top: 10vh;
	}
	.button-container {
		display: flex;
		justify-content: center;
	}
	button {
		border: none;
		height: 50px;
		width: 50px;
	}
	.time-text {
		font-size: 10rem;
		padding: 0;
		margin: 0;
		text-align: center;
	}
	.time-container {
		display: flex;
		justify-content: center;
	}
	input {
		width: 20%;
		display: inline-block;
		border: none;
	}
	input:focus {
		outline: none;
	}
</style>