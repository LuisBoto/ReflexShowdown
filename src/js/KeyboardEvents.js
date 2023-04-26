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
let singlePlayerControl = new Control(81);
let multiPlayerControl = new Control(80);
let escapeKeyControl = new Control(27);
let controls = [player1Control, player2Control, singlePlayerControl, multiPlayerControl, escapeKeyControl];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    controls
        .filter((control) => control.keyCode == event.keyCode)
        .map((control) => control.onKey())
}

function onKeyUp(event) {
    var pos = keys.indexOf(event.keyCode);
    keys.splice( pos, 1);
}