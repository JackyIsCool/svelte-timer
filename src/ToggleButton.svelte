<script lang="ts">
    export let value: boolean = false;
    function toggleOnOff() {
		value = !value
	}
</script>
<main>
    <button on:click={toggleOnOff} class="shadow-button">
        {#if value}
            <img src="img/pause.png" alt="pause">
        {:else}
            <img src="img/play.png" alt="play">
        {/if}
    </button>
</main>
<style lang="scss">
    @import "Global.scss";
    button {
        @extend .circle-btn;
        padding: 10px;
        height: 60px;
        width: 60px;
    }
</style>