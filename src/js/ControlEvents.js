class Control {
    
    constructor(keyCode) {
        this.keyCode = keyCode;
        this.pressed = false;
        this.lifted = true;
        this.time = -1;
    }

    onKey() {
        this.pressed = true;
        this.lifted = false;
        this.time = Date.now();
    }

    consume() {
        let aux = this.pressed;
        this.pressed = false;
        return aux;
    }

    onKeyUp() {
        this.lifted = true;
    }

    getCharacterFromKeyCode() {
        return String.fromCharCode((96 <= this.keyCode && this.keyCode <= 105)? this.keyCode-48 : this.keyCode);
    }
}

let player1Control = new Control(65);
let player2Control = new Control(76);
let singlePlayerControl = new Control(81);
let multiPlayerControl = new Control(80);
let escapeKeyControl = new Control(27);
let controls = [player1Control, player2Control, singlePlayerControl, multiPlayerControl, escapeKeyControl];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown(event) {
    controls
        .filter((control) => control.keyCode == event.keyCode)
        .forEach((control) => control.onKey())
}

function onKeyUp(event) {
    controls
        .filter((control) => control.keyCode == event.keyCode)
        .forEach((control) => control.onKeyUp())
}

let canvas = document.getElementById("canvas");
const ongoingTouches = [];
canvas.addEventListener("pointerdown", handleStart, false);
canvas.addEventListener("pointerup", handleEnd, false);
canvas.addEventListener("pointermove", handleMove, false);
canvas.addEventListener("pointercancel", handleEnd, false);

function handleStart(event) {
    ongoingTouches.push(event);
}

function handleMove(event) {
    ongoingTouches.splice(
        ongoingTouches.findIndex(
            (tch) => tch.pointerId == event.pointerId), 
        1, 
        event); 
}
  
function handleEnd(event) {
    ongoingTouches.splice(
        ongoingTouches.findIndex(
            (tch) => tch.pointerId == event.pointerId), 
        1); 
}
  

export {
    Control,
    player1Control,
    player2Control,
    singlePlayerControl,
    multiPlayerControl,
    escapeKeyControl
}