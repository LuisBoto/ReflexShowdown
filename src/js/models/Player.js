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
        this.attacked = false;
        this.launchTime = -1;
        this.control.consume();
        this.key = new Key(this.x, this.y+this.height*0.75, this.control);
    }

    draw() {
        super.draw();
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
        this.x = this.isLeftSide ? canvasWidth*0.7 : canvasWidth*0.3;
        this.key.setX(this.x);
        this.key.setTag(this.getTime()+"ms");
    }

    doDefeat() {
        this.setImage(this.assets.lose);
        this.x = this.isLeftSide ? canvasWidth*0.1 : canvasWidth*0.9;
        this.key.setX(this.x);
    }

    
}

export {
    Player
}
