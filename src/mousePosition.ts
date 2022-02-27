import { bind } from "svelte/internal";

export let mousePosition:{ x:number, y:number } = { x: 0, y: 0 };
export let windowSize:{ x:number, y:number } = { x: 0, y:0 };
document.body.addEventListener("mousemove", move);
function move(event:any) {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    mousePosition = mousePosition;
}
$: windowSize.x = window.innerWidth;
$: windowSize.y = window.innerHeight;