import { canvasHeight, canvasWidth } from "../Main.js";

class Control {
    
    constructor(keyCode) {
        this.keyCode = keyCode;
        this.pressed = false;
        this.lifted = true;
        this.time = -1;
        this.enableTimeMeasurement = true;
    }

    onKey() {
        if (this.enableTimeMeasurement) 
            this.time = Date.now();
        this.pressed = true;
        this.lifted = false;
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

class PlayerTouchControl extends Control {

    constructor(keyCode, degreesPerPlayer, playerDegrees) {
        super(keyCode);
        this.degreesPerPlayer = degreesPerPlayer;
        this.playerDegrees = playerDegrees;
    }

}

let player1Control = new PlayerTouchControl(65);
let player2Control = new Control(76);
let singlePlayerControl = new Control(81);
let multiPlayerControl = new Control(80);
let escapeKeyControl = new Control(27);
const controls = [player1Control, player2Control, singlePlayerControl, multiPlayerControl, escapeKeyControl];
const playerTouchControls = [];
const buttonTouchControls = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown(event) {
    controls
        .filter((control) => control.keyCode == event.keyCode)
        .forEach((control) => control.onKey());
}

function onKeyUp(event) {
    controls
        .filter((control) => control.keyCode == event.keyCode)
        .forEach((control) => control.onKeyUp());
}

const ongoingTouches = [];
let canvas = document.getElementById("canvas");
canvas.addEventListener("pointerdown", handleStart, false);
canvas.addEventListener("pointerup", handleEnd, false);
canvas.addEventListener("pointermove", handleMove, false);
canvas.addEventListener("pointercancel", handleEnd, false);

function handleStart(event) {
    ongoingTouches.push(event);
    triggerPlayerTouchControls();
}

function handleMove(event) {
    ongoingTouches.splice(
        ongoingTouches.findIndex((tch) => tch.pointerId == event.pointerId), 
        1, event); 
    triggerPlayerTouchControls();
}
  
function handleEnd(event) {
    ongoingTouches.splice(
        ongoingTouches.findIndex(
            (tch) => tch.pointerId == event.pointerId), 
        1); 
}

function triggerPlayerTouchControls() {
    playerTouchControls.forEach(ptc => {
        let touched = ongoingTouches
            .map(t => { t.clientX -= canvasWidth/2; t.clientY -= canvasHeight/2; return t; }) 
            .map(t => Math.atan2(t.clientY, t.clientX))
            .map(touchDegrees => { let degrees = 90 - touchDegrees; return degrees < 0 ? degrees+360 : degrees; })
            .filter(touchDegrees => {
                let isOverLowerLimit = touchDegrees > ptc.playerDegrees - ptc.degreesPerPlayer/2;
                let isUnderUpperLimit = touchDegrees < ptc.playerDegrees + ptc.degreesPerPlayer/2;
                if (ptc.playerDegrees != 0)
                    isOverLowerLimit && isUnderUpperLimit;
                else
                    isOverLowerLimit || isUnderUpperLimit;
            }).length > 0;
        if (touched) 
            ptc.onKey();
    });
}
  

export {
    Control,
    player1Control,
    player2Control,
    singlePlayerControl,
    multiPlayerControl,
    escapeKeyControl
}