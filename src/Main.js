import { MenuLayer } from "./js/layers/MenuLayer.js";
import { loadImages } from "./js/Res.js";

// Canvas & context
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let layer;

function startGame() {
    layer = new MenuLayer();
    loop();
}

function loop(){
    layer.processControls();
    layer.update();
    layer.draw();
    requestAnimationFrame(loop);
}

function resize() {
    console.log("Resize")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
}

function setLayer(newLayer) {
    layer = newLayer;
}

window.addEventListener('load', resize, false);
loadImages(0, startGame);

export {
    context,
    canvasWidth,
    canvasHeight,
    setLayer
}
