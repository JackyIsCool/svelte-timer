<script lang="ts">
    import { mousePosition } from "./mousePosition";
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
        if((window.innerWidth - mousePosition.x) > 150 && (window.innerHeight - mousePosition.y) > 150) {
            isCloseTo = false;
        }
    });
</script>
<main>
    <div class="button-container">
        <span id="menu-button" class="shadow-button"
            class:active={active}
            class:blue-bg={isPin}
            on:click|self={() => isPin = !isPin} 
            on:mouseenter={() => isCloseTo = true}
            
        >
            <!-- TODO: pin animation when clicked -->
            <img src="img/pin.png" alt="">
        </span>
    {#each buttons as button}
        <span 
            class="sub-button shadow-button" 
            class:blue-bg={currentState == button.toState}
            style="--x: {button.toX}px; --y: {button.toY}px"
            on:click={() => currentState = button.toState}
        >    
            <img src={button.imageURL} alt="">
        </span>
    {/each}
    </div>
</main>
<style lang="scss">
    .button-container {
        position: fixed ;
        display: flex;
        bottom: 10vh;
        right: 10vh;
    }
    span {
        display: block;
        background-color: white;
        position: absolute;
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
            // Set png icon to white if is in light mode
            filter: brightness(var(--is-dark-mode));
        }
    }
    #menu-button {
        $diameter: 50px;
        height: $diameter;
        width: $diameter;
        border-radius: 100%;
        transform-style: preserve-3d;
        z-index: 1;
        background-color: var(--second-background-color);
        &.active {
            ~.sub-button {
                transform: translateX(var(--x)) translateY(var(--y));
            }
        }
    }
    .sub-button {
        $diameter: 50px;
        height: $diameter;
        width: $diameter;
        border-radius: 100%;
        background-color: var(--second-background-color);
        transition: 300ms;
    }
    .blue-bg {
        background-color: #74b9ff;
    }
</style>