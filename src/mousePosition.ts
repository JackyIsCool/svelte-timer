export let mousePosition:{ x:number, y:number } = { x: 0, y: 0 };
document.body.addEventListener("mousemove", move);
function move(event:any) {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
}