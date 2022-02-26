<script lang="ts">
    import { fly } from 'svelte/transition';
	enum ClockState {
		countdown,
		time,
		timer
	}
	let state: ClockState;
    class Button {
        constructor(toX: number, toY: number, toState: ClockState, ) {
            this.toX = toX;
            this.toY = toY;
            this.toState = toState;
        }
        toX: number;
        toY: number;
        toState: ClockState;
    }
    const buttons:Button[] = [
        new Button(0, -80, ClockState.countdown),
        new Button(-60, -60, ClockState.countdown),
        new Button(-80, 0, ClockState.countdown)
    ]
</script>
<main>
	<span id="menu-button">
        {#each buttons as button}
            <span class="sub-button" style="--x: {button.toX}px; --y: {button.toY}px">
                
            </span>
        {/each}
    </span>
</main>
<style lang="scss">
    span {
        position: absolute;
        margin: auto;
        right: 0%;
        &:hover {
            transform: scale(1.1);
            transition-duration: 100ms; 
        }
    }
    #menu-button {
        $diameter: 50px;
        background-color: red;
        height: $diameter;
        width: $diameter;
        border-radius: 100%;
        z-index: 1;
        bottom: 5vh;
        right: 5vh;
        transform-style: preserve-3d;
        &:hover {
            .sub-button {
                transform: translateX(var(--x)) translateY(var(--y));
                transition: 300ms;
            }
        }
    }
    .sub-button {
        $diameter: 50px;
        height: $diameter;
        width: $diameter;
        border-radius: 100%;
        background-color: blue;
        transform: translateZ(-10px);
    }
</style>