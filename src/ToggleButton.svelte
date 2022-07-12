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
    main {
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translate(-50%, -50%);
        margin: 0 auto;
    }
    button {
        margin: 0;
        padding: 10px;
        border-radius: 100%;
        background-color: var(--second-background-color);
        border-color: transparent;
        height: 60px;
        width: 60px;
        img {
            height: 100%;
            width: 100%;
            filter: brightness(var(--is-dark-mode));
        }
    }
</style>