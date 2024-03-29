import { Player } from "./Player.js";
import { StrokedText } from "./StrokedText.js";
import { Control } from "../ControlEvents.js";

class PlayerCpu extends Player {

    constructor(imageAssets, x, y) {
        super(imageAssets, x, y, new Control());
    }

    initiate() {
        super.initiate();
        this.timeTextYModifier = this.keyYModifier;
        this.timeText = new StrokedText("", this.x, this.y+this.timeTextYModifier, true);
        this.score = Math.floor(Math.random()*400 + 150);
    }

    update() {
        if (this.launchTime != -1) {
            if (this.getTime() >= 0)
                this.timeText.setValue(this.getTime()+"ms");
            else if (Date.now() - this.launchTime >= this.score) {
                this.attacked = true;
                this.attackTime = Date.now();
            }
        }
    }

    drawUI() {
        this.timeText.draw();
    }

    processControls() {
        this.skipControls();
    }

    getTime() {
        return this.attackTime - this.launchTime;
    }

    doVictory() {
        super.doVictory();
        this.timeText.x = this.x;
        this.timeText.y = this.y+this.timeTextYModifier
    }

    doDefeat() {
        super.doDefeat();
        this.timeText.x = this.x;
        this.timeText.y = this.y+this.timeTextYModifier
    }

}

export {
    PlayerCpu
}
