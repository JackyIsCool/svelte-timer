<script lang="ts">
    export let value: boolean = false;
    function toggleOnOff() {
		value = !value
	}
</script>
<main>
    <button on:click={toggleOnOff}>
        {#if value}
            Pause
        {:else}
            Start
        {/if}
    </button>
    
</main>