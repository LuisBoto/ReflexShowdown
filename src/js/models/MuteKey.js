import { isMuted, switchMuted } from "../AudioManager.js";
import { KEYS } from "../ControlEvents.js";
import { Key } from "./Key.js";

class MuteKey extends Key {

    constructor(x, y) {
        super(x, y, KEYS.M, "Sound ON");
    }

    drawTag() {
        this.tag.setValue(isMuted() ? "Sound OFF" : "Sound ON");
        super.drawTag();
    }

    consumeControl() {
        if (super.consumeControl()) {
            switchMuted();
            return true;
        }
        return false;
    }

    processPressedFrames() {
        super.processPressedFrames();
        this.consumeControl();
    }

}

export {
    MuteKey
}