<script lang="ts">
    export let times: string[] = [];

    export function recordTime(millisecond: number) {
        let hour = String(Math.floor(millisecond / 3600000)).padStart(2, '0');
        let minute = String(Math.floor(millisecond % 3600000 / 60000)).padStart(2, '0');
        let second = String(Math.floor(millisecond % 60000 / 1000)).padStart(2, '0');
        let ms = String(millisecond % 1000).padStart(3, '0');
        let newTime = `${hour}:${minute}:${second}:${ms}`;
        times = [newTime, ...times];
    }
</script>

<main>
    <div class="scroll-container"> 
        {#each times as time}
            <div class="time">{time}</div>
        {/each}
    </div>
    <div id="gradient"></div>
</main>

<style lang="scss">
    main {
        position: relative;
        width: max-content;
    }
    .scroll-container {
        height: calc(37px * 3); // 37px is the height of per child
        overflow: scroll;
        display: flex;
        flex-direction: column;
        scroll-snap-type: y mandatory;

    }
    .time {
        margin: 0;
        width: max-content;
        color: var(--foreground-color);
        font-size: xx-large;
        scroll-snap-align: center;
    }
    #gradient {
        position: absolute;
        background: linear-gradient(to bottom, transparent, var(--background-color));
        bottom: 0;
        height: calc(37px * 2);
        width: 100%;
        pointer-events: none;
    }
</style>