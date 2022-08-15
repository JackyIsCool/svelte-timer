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
    {#each times as time}
        <div>{time}</div>   
    {/each}
</main>

<style lang="scss">
    main {
        height: calc(37px * 3); // 37px is the height of per child
        overflow: scroll;
        display: flex;
        flex-direction: column;
        width: max-content;
        scroll-snap-type: y mandatory;
    }
    div {
        margin: 0;
        width: max-content;
        color: var(--foreground-color);
        font-size: xx-large;
        scroll-snap-align: center;
    }
</style>