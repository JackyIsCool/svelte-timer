<script lang="ts">
    import { mousePosition, windowSize } from "./mousePosition";
	import { ClockState } from "./ClockState";
	export let currentState: ClockState;
    class Button {
        constructor(toX: number, toY: number, toState: ClockState, imageURL:string) {
            this.toX = toX;
            this.toY = toY;
            this.toState = toState;
            this.imageURL = imageURL;
        }
        toX: number;
        toY: number;
        toState: ClockState;
        imageURL;
    }
    const buttons:Button[] = [
        new Button(0, -80, ClockState.countdown, "img/countdown.png"),
        new Button(-60, -60, ClockState.time, "img/time.png"),
        new Button(-80, 0, ClockState.timer, "img/timer.png")
    ];
    let isPin:boolean = false;
    let isCloseTo = false;
    $: active = isPin || isCloseTo;
    setInterval(() => {
        if((windowSize.x - mousePosition.x) > 150 && (windowSize.y - mousePosition.y) > 150) {
            isCloseTo = false;
        }
    });
</script>
<main>
    <div class="button-container">
        <span id="menu-button" 
            class:active={active}
            on:click|self={() => isPin = !isPin} 
            on:mouseenter={() => isCloseTo = true}
        >
            <!-- TODO: pin animation when clicked -->
            <img src="img/pin.png" alt="">
            {#each buttons as button}
                <span class="sub-button" 
                    style="--x: {button.toX}px; --y: {button.toY}px"
                    on:click={() => currentState = button.toState}
                >    
                    <img src={button.imageURL} alt="">
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
        background-color: white;
        box-shadow: 1px 1px 3px black;
        &:active {
            box-shadow: inset 1px 1px 3px black;
        }
        img {
            top: 0;
            bottom: 0;
            margin: auto;
            position: absolute;
            left: 0;
            right: 0;
            width: 75%;
            
            pointer-events: none;
            user-select: none;
            filter: brightness(0);
        }
    }
    #menu-button {
        position: relative;
        $diameter: 50px;
        height: $diameter;
        width: $diameter;
        
        border-radius: 100%;
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
        background-color: white;
        transform: translateZ(-10px);
        transition: 300ms;
    }
</style>