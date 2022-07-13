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
        <button id="menu-button" 
            class="shadow-button"
            class:active={active}
            class:blue-bg={isPin}
            on:click={() => isPin = !isPin} 
            on:mouseenter={() => isCloseTo = true}
        >
            <!-- TODO: pin animation when clicked -->
            <img src="img/pin.png" alt="">
        </button>
    {#each buttons as button}
        <button 
            class="sub-button shadow-button" 
            class:blue-bg={currentState == button.toState}
            style="--x: {button.toX}px; --y: {button.toY}px"
            on:click={() => currentState = button.toState}
        >    
            <img src={button.imageURL} alt="">
        </button>
    {/each}
    </div>
</main>
<style lang="scss">
    @import "Global.scss";
    .button-container {
        position: fixed;
        bottom: calc(50px + 5vh);   // 50px is [$diameter] of buttons
        right: calc(50px + 5vh);
    }
    button {
        position: absolute;
    }
    #menu-button {
        @extend .circle-btn;
        z-index: 1;
        &.active {
            ~.sub-button {
                transform: translateX(var(--x)) translateY(var(--y));
            }
        }
    }
    .sub-button {
        @extend .circle-btn;
        transition: 300ms;
    }
    .blue-bg {
        background-color: #74b9ff !important;
    }
</style>