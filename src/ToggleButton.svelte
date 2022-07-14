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
    main {
        position: fixed;
        left: 50%;
        bottom: 2vh;
        transform: translate(-50%, -50%);
        margin: 0 auto;
    }
    button {
        @extend .circle-btn;
        padding: 10px;
        height: 60px;
        width: 60px;
    }
</style>