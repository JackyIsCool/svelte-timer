<script lang="ts">
    import { mousePosition, windowSize } from "./mousePosition";
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
    ];
    let isPin:boolean = false;
    let isCloseTo = false;
    $: active = isPin || isCloseTo;
    setInterval(() => {
        if((windowSize.x - mousePosition.x) > 200 && (windowSize.y - mousePosition.y) > 200) {
            isCloseTo = false;
        }
        console.log(isPin || isCloseTo);
    });
</script>
<main>
    <div class="button-container">
        <span id="menu-button" 
            class:active={active}
            on:click={() => isPin = !isPin} 
            on:mouseenter={() => isCloseTo = true}
        >
            {#each buttons as button}
                <span class="sub-button" 
                    style="--x: {button.toX}px; --y: {button.toY}px"
                >    
                </span>
            {/each}
        </span>
    </div>
</main>
<style lang="scss">
    .button-container {
        position: absolute;
        bottom: 5vh;
        right: 5vh;
    }
    span {
        display: block;
    }
    #menu-button {
        position: relative;
        $diameter: 50px;
        background-color: red;
        height: $diameter;
        width: $diameter;
        border-radius: 100%;
        z-index: 1;
        transform-style: preserve-3d;
        &.active {
            .sub-button {
                transform: translateX(var(--x)) translateY(var(--y));
            }
        }
    }
    .sub-button {
        position: absolute;
        $diameter: 50px;
        height: $diameter;
        width: $diameter;
        border-radius: 100%;
        background-color: blue;
        transform: translateZ(-10px);
                transition: 300ms;
    }
</style>