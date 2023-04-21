// Canvas & context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var minimumResize = 1;

// Controls
var controls = {};
controls.player1input = false;
controls.player2input = false;
controls.singleplayer = false;
controls.multiplayer = false;
controls.exit = false;

var layer;
var gameLayer;

function startGame() {
    mLayer = new MenuLayer();
    layer=mLayer;
    setInterval(loop, 1000 / 60);
}

function loop(){
    layer.update();
    layer.processControls();
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
