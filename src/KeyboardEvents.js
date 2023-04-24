class Control {
    
    constructor(keyCode) {
        this.keyCode = keyCode;
        this.pressed = false;
    }

    onKey() {
        this.pressed = true;
    }

    process() {
        this.pressed = false;
    }
}

let keys = [];

let player1Control = new Control(65);
let player2Control = new Control(76);
var singlePlayerControl = new Control(81);
let multiPlayerControl = new Control(80);
let escapeKeyControl = new Control(27);
let controls = [player1Control, player2Control, singlePlayerControl, multiPlayerControl, escapeKeyControl];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    var pos = keys.indexOf(event.keyCode);
    controls
        .filter((control) => control.keyCode == event.keyCode)
        .map((control) => control.onKey())
    /*if ( pos == -1 ) {
        keys.push(event.keyCode);
        if (event.keyCode == 65) //'A' for player 1
            controls.player1input = true;
        if (event.keyCode == 76) //'L' for player 2
            controls.player2input = true;
        if (event.keyCode == 81) //'Q' for singleplayer
            controls.singleplayer = true;
        if (event.keyCode == 80) //'P' for multiplayer
            controls.multiplayer = true;
        if (event.keyCode == 27) //Escape key
            controls.exit = true;
    }*/
}

function onKeyUp(event) {
    var pos = keys.indexOf(event.keyCode);
    keys.splice( pos, 1);
}