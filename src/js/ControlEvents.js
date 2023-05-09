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

const playerControlKeyCodes = [80, 76, 77, 90, 65, 81];
let singlePlayerControl = new Control(81);
let multiPlayerControl = new Control(80);
let escapeKeyControl = new Control(27);
const controls = [];
const playerTouchControls = [];
const buttonTouchControls = [];

function updateControls() {
    controls.length = 0;
    controls.push(...playerTouchControls, ...buttonTouchControls, singlePlayerControl, multiPlayerControl, escapeKeyControl);
}
updateControls();


// ###### KEYBOARD EVENTS
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

// ###### TOUCHSCREEN / MOUSE EVENTS
const ongoingTouches = [];
let canvas = document.getElementById("canvas");
canvas.addEventListener("pointerdown", handleStart, false);
canvas.addEventListener("pointerup", handleEnd, false);
canvas.addEventListener("pointercancel", handleEnd, false);
//canvas.addEventListener("pointermove", handleMove, false);

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
    let touchIndex = ongoingTouches.findIndex((tch) => tch.pointerId == event.pointerId)
    playerTouchControls.forEach(ptc => {
        if (isAffectedByTouches(ptc, [ongoingTouches[touchIndex]])) 
            ptc.onKeyUp()
        });
    ongoingTouches.splice(touchIndex, 1); 
}

function triggerPlayerTouchControls() {
    playerTouchControls.forEach(ptc => {
        if (isAffectedByTouches(ptc, ongoingTouches)) 
            ptc.onKey();
    });
}

function isAffectedByTouches(playerTouchControl, touches) {
    return touches
        .map(t => { let coordinate = { X: t.clientX - canvasWidth/2, Y: t.clientY - canvasHeight/2 }; return coordinate; }) 
        .map(t => Math.atan2(t.Y, t.X)*180/Math.PI)
        .map(touchDegrees => { let degrees = 90 - touchDegrees; return degrees < 0 ? degrees+360 : degrees; })
        .filter(touchDegrees => {
            let lowerLimit = playerTouchControl.playerDegrees - playerTouchControl.degreesPerPlayer/2;
            if (lowerLimit < 0) lowerLimit += 360;
            let upperLimit = playerTouchControl.playerDegrees + playerTouchControl.degreesPerPlayer/2;
            if (upperLimit > 360) upperLimit -= 360;

            let isOverLowerLimit = touchDegrees > lowerLimit;
            let isUnderUpperLimit = touchDegrees < upperLimit;
            
            if (playerTouchControl.playerDegrees != 0)
                return isOverLowerLimit && isUnderUpperLimit;
            else
                return isOverLowerLimit || isUnderUpperLimit;
        }).length > 0;
    }

function getPlayerControls(playerNumber) {
    playerTouchControls.length = 0;
    let degreesPerPlayer = 360 / playerNumber;
    for (let i = 0; i < playerNumber; i++) 
        playerTouchControls.push(new PlayerTouchControl(playerControlKeyCodes[i], degreesPerPlayer, 360-(i*degreesPerPlayer+degreesPerPlayer/2)));
    updateControls();
    return playerTouchControls;
}
  

export {
    Control,
    getPlayerControls,
    singlePlayerControl,
    multiPlayerControl,
    escapeKeyControl
}