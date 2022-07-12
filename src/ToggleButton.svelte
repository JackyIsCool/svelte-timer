<script lang="ts">
    export let value: boolean = false;
    function toggleOnOff() {
		value = !value
	}
</script>
<main>
    <button on:click={toggleOnOff} class="shadow-button">
        {#if value}
            ⏸
        {:else}
            ▶️
        {/if}
    </button>
</main>
<style>
    button {
        background-color: var(--second-background-color);
        border-color: transparent;
    }
</style>