<script lang="ts">
    export let value: boolean = false;
    function toggleOnOff() {
		value = !value
	}
</script>
<main>
    <button on:click={toggleOnOff} class="shadow-button">
        {#if value}
            Pause
        {:else}
            Start
        {/if}
    </button>
    
</main>