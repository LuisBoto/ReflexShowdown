import "./css/canvasBackground.css";
import { MenuLayer } from "./js/layers/MenuLayer.js";
import { loadImages } from "./js/ResourceLoader.js";

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

function loop() {
    layer.draw();
    layer.processControls();
    layer.update();
    requestAnimationFrame(loop);
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
}

function setLayer(newLayer) {
    layer = newLayer;
}

function getCanvasProportionSize(proportion) {
    return Math.sqrt(canvasHeight*canvasWidth)/proportion/2;
}

window.addEventListener('load', resize, false);
loadImages(0, startGame);
window.addEventListener('resize', () => {resize(); layer.initiate();}, false);

export {
    canvas,
    context,
    canvasWidth,
    canvasHeight,
    setLayer,
    getCanvasProportionSize
}
