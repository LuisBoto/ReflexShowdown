// Canvas & context
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let minimumResize = 1;

let layer;

function startGame() {
    layer = new MenuLayer();
    setInterval(loop, 1000 / 60);
}

function loop(){
    layer.processControls();
    layer.update();
    layer.draw();
}

// Resize
window.addEventListener('load', resize, false);

function resize() {
    var resizeWidth = parseFloat(window.innerWidth / canvas.width);
    var resizeHeight = parseFloat(window.innerHeight / canvas.height);

    minimumResize = Math.min(resizeWidth, resizeHeight);

    canvas.width = canvas.width*minimumResize;
    canvas.height = canvas.height*minimumResize;

    context.scale(minimumResize, minimumResize);
}
