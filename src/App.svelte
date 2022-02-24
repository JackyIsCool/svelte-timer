<script>
	let secondLeft = 0;//In second
	$: formatedSecond = String(Math.floor(secondLeft / 60)).padStart(2, '0');
	$: formatedMinute = String(Math.floor(secondLeft % 60)).padStart(2, '0');
	$: formatedTime = formatedSecond + ":" + formatedMinute;
	let isCounting = false;
	function toggleOnOff() {
		isCounting = !isCounting
	}
	function setTime(time) {
		secondLeft += time;
		console.log(formatedTime);
	}
	function countDown() {
		secondLeft --;
	}
	setInterval(() => {
		if (isCounting) {
			countDown();
		}
	}, 1000);
</script>

<main>
	<h1 id="time">{formatedTime}</h1>
	<button on:click={() => setTime(60)}>+1m</button>
	<button on:click={() => setTime(-60)}>-1m</button>
	<button on:click={() => setTime(1)}>+1s</button>
	<button on:click={() => setTime(-1)}>-1s</button>
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
		text-align: center;
	}
	#time {
		text-align: center;
		font-size: 10rem;
	}
</style>