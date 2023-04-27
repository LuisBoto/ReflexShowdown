import { Model } from "./Model.js";
import { canvasHeight, canvasWidth } from "../../Main.js";
import { Key } from "./Key.js";

class Player extends Model {

    constructor(imageRoute, isLeftSide, control) {
        super(imageRoute);
        this.isLeftSide = isLeftSide;
        this.control = control;
        this.initiate();
    }

    initiate() {
        this.x = this.isLeftSide ? canvasWidth*0.2 : canvasWidth*0.8;
        this.y = canvasHeight*0.63;
        this.time = -1;
        this.launchTime = -1;
        this.control.consume();
        this.key = new Key(this.x, this.y+this.height*0.75, this.control);
    }

    draw() {
        super.draw();
        this.key.draw();
    }

    doTurn() {
        if (this.control.consume()) {
            this.time = Date.now();
        }
    }

    skipTurn() {
        this.control.consume();
    }

    hasAttacked() {
        return this.time != -1;
    }

    getTime() {
        return this.time - this.launchTime;
    }

    doVictory() {
        this.x = this.isLeftSide ? canvasWidth*0.7 : canvasWidth*0.3;
        this.key.setX(this.x);
    }

    doDefeat() {
        this.x = canvasWidth*0.5;
        this.key.setX(this.x);
    }

    
}

export {
    Player
}
