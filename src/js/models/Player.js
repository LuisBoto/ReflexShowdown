import { Model } from "./Model.js";
import { canvasHeight, canvasWidth } from "../../Main.js";
import { Key } from "./Key.js";

class Player extends Model {

    constructor(imageAssets, isLeftSide, control) {
        super(imageAssets.base);
        this.assets = imageAssets;
        this.isLeftSide = isLeftSide;
        this.control = control;
        this.initiate();
    }

    initiate() {
        this.setImage(this.assets.base);
        this.x = this.isLeftSide ? canvasWidth*0.2 : canvasWidth*0.8;
        this.y = canvasHeight*0.63;
        this.control.consume();
        this.control.enableTimeMeasurement = true;
        this.launchTime = -1;
        this.attacked = false;
        this.key = new Key(this.x, this.y+this.height*0.6, this.control);
    }

    update() {
        if (this.getTime() > 0 && this.launchTime != -1) { 
            this.key.setTag(this.getTime() > 0 ? this.getTime()+"ms" : "-");
            this.control.enableTimeMeasurement = false;
        }
    }

    draw() {
        super.drawResize(this.width*0.8, this.height*0.8);
        this.key.draw();
    }

    doTurn() {
        if (this.control.consume()) 
            this.attacked = true;
    }

    skipTurn() {
        this.control.consume();
    }

    hasAttacked() {
        return this.attacked;
    }

    getTime() {
        return this.control.time - this.launchTime;
    }

    doVictory() {
        this.setImage(this.assets.win);
        this.x = this.isLeftSide ? canvasWidth*0.8 : canvasWidth*0.2;
        this.key.setX(this.x);
    }

    doDefeat() {
        this.setImage(this.assets.lose);
        this.x = canvasWidth*0.5;
        this.key.setX(this.x);
    }

}

export {
    Player
}
