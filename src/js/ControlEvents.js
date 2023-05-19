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


    isTriggeredByTouches(touches) {
        return touches
            .map(t => { let coord = { X: t.clientX - canvasWidth/2, Y: t.clientY - canvasHeight/2 }; return coord; }) 
            .map(coord => Math.atan2(coord.Y, coord.X)*180/Math.PI)
            .map(touchDegrees => { let degrees = 90 + touchDegrees; return degrees < 0 ? degrees+360 : degrees; })
            .filter(touchDegrees => {
                let lowerLimit = this.playerDegrees - this.degreesPerPlayer/2;
                if (lowerLimit < 0) lowerLimit += 360;
                let upperLimit = this.playerDegrees + this.degreesPerPlayer/2;
                if (upperLimit > 360) upperLimit -= 360;

                let isOverLowerLimit = touchDegrees > lowerLimit;
                let isUnderUpperLimit = touchDegrees < upperLimit;
                
                if (lowerLimit < upperLimit)
                    return isOverLowerLimit && isUnderUpperLimit;
                else
                    return isOverLowerLimit || isUnderUpperLimit;
            }).length > 0;
    }

}

class ButtonTouchControl extends Control {

    constructor(keyCode, x, y) {
        super(keyCode);
        this.x = x;
        this.y = y;
    }

    isTriggeredByTouches(touches) {
        return touches
            .map(t => { let coord = { X: t.clientX, Y: t.clientY }; return coord; })
            .filter(coord => {
                let topLimit = this.y - canvasHeight/10;
                let bottomLimit = this.y + canvasHeight/10;
                let rightLimit = this.x + canvasWidth/20;
                let leftLimit = this.x - canvasWidth/20;
                return (coord.X > leftLimit && coord.X < rightLimit) 
                    && (coord.Y > topLimit && coord.Y < bottomLimit)
            }).length > 0;
    }
}

const KEYS = {
    ESCAPE: 27,
    ARROW_RIGHT: 39,
    ARROW_LEFT: 37,
    A: 65,
    P: 80,
    L: 76,
    M: 77,
    Q: 81,
    Z: 90,
}
const playerControlKeyCodes = [KEYS.P, KEYS.L, KEYS.M, KEYS.Z, KEYS.A, KEYS.Q];
const controls = [];

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
window.addEventListener("pointerdown", handleStart, false);
window.addEventListener("pointerup", handleEnd, false);
window.addEventListener("pointercancel", handleEnd, false);
//canvas.addEventListener("pointermove", handleMove, false);

function handleStart(event) {
    ongoingTouches.push(event);
    controls.filter(tc => tc.isTriggeredByTouches(ongoingTouches))
        .forEach(tc => tc.onKey());
}
  
function handleEnd(event) {
    let touchIndex = ongoingTouches.findIndex((tch) => tch.pointerId == event.pointerId)
    controls.filter(ptc => ptc.isTriggeredByTouches([ongoingTouches[touchIndex]]))
           .forEach(ptc => ptc.onKeyUp());
    ongoingTouches.splice(touchIndex, 1); 
}

function getPlayerControl(degreesPerPlayer, playerDegreePosition) {
    let newPlayerControl = new PlayerTouchControl(
        playerControlKeyCodes[controls.length%playerControlKeyCodes.length], degreesPerPlayer, playerDegreePosition);
    controls.push(newPlayerControl);
    return newPlayerControl;
}

function getButtonControl(x, y, keyCode) {
    let control = new ButtonTouchControl(keyCode, x, y);
    controls.push(control);
    return control;
}

function cleanControls() {
    controls.length = 0;
}  

export {
    Control,
    getPlayerControl,
    getButtonControl,
    KEYS,
    cleanControls
}