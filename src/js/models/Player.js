import { Model } from "./Model.js";
import { canvasHeight, canvasWidth } from "../../Main.js";
import { Key } from "./Key.js";

class Player extends Model {

    constructor(imageRoute, isLeftSide, control) {
        let x = isLeftSide ? canvasWidth*0.2 : canvasWidth*0.8;
        let y = canvasHeight*0.63;
        super(imageRoute, x, y);
        this.control = control;
        this.initiate();
    }

    initiate() {
        this.time = -1;
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

    
}

export {
    Player
}
