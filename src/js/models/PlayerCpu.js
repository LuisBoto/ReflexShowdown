import { Player } from "./Player.js";
import { Text } from "./Text.js";
import { Control } from "../ControlEvents.js";

class PlayerCpu extends Player {

    constructor(imageAssets, x, y) {
        super(imageAssets, x, y, new Control());
    }

    initiate() {
        super.initiate();
        this.timeText = new Text("", this.x, this.y+this.height*0.6, true);
        this.attackDelay = 10; // To avoid humanly unbeatable times
    }

    update() {
        if (this.launchTime != -1) {
            if (this.getTime() > 0)
                this.timeText.setValue(this.getTime() > 0 ? this.getTime()+"ms" : "-");
            else if (this.attackDelay <= 0 && Math.random()*15 <= 1) {
                this.attacked = true;
                this.attackTime = Date.now();
            }
            this.attackDelay -= 1;
        }
    }

    draw() {
        this.drawResize(this.width*0.8, this.height*0.8);
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
    }

    doDefeat() {
        super.doDefeat();
        this.timeText.x = this.x;
    }

}

export {
    PlayerCpu
}
