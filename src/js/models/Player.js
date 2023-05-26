import { Model } from "./Model.js";
import { canvasHeight, canvasWidth, context, getCanvasProportionSize } from "../../Main.js";
import { Key } from "./Key.js";
import { getPlayerControl } from "../ControlEvents.js";
import { StrokedText } from "./StrokedText.js";

class Player extends Model {

    constructor(imageAssets, x, y, degreesPerPlayer, degreePosition) {
        super(imageAssets.base, x, y);
        this.initialX = x;
        this.initialY = y;
        this.assets = imageAssets;
        this.isLeftSide = this.x <= canvasWidth / 2;
        this.control = getPlayerControl(degreesPerPlayer, degreePosition);
        this.initiate();
    }

    initiate() {
        this.setImage(this.assets.base);
        this.x = this.initialX;
        this.y = this.initialY;
        this.control.consume();
        this.control.enableTimeMeasurement = true;
        this.launchTime = -1;
        this.attacked = false;
        this.keyYModifier = getCanvasProportionSize(7);
        this.key = new Key(this.x, this.y+this.keyYModifier, this.control);
        this.canvasProportion = 3;
    }

    update() {
        if (this.getTime() > 0 && this.launchTime != -1) { 
            this.key.setTag(this.getTime()+"ms");
            this.control.enableTimeMeasurement = false;
        }
    }

    draw() {
        if (this.isLeftSide) 
            this.drawProportionalToCanvas(this.canvasProportion);
        else
            this.drawReversed();
        this.drawUI();
    }

    drawReversed() {
        let x = this.x;
        let y = this.y;
        context.save();
        context.translate(this.x, this.y);
        this.x = 0;
        this.y = 0;
        context.scale(-1,1);
        this.drawProportionalToCanvas(this.canvasProportion);
        context.restore();
        this.x = x;
        this.y = y;
    }

    drawUI() {
        this.key.draw();
    }

    drawScore(positionY) {
        new Model(this.assets.base, getCanvasProportionSize(10), positionY).drawProportionalToCanvas(this.canvasProportion*1.5);
        let text = new StrokedText(this.getTime() > 0 ? this.getTime().toString().concat("ms") : "-", getCanvasProportionSize(5), positionY);
        text.setSize(getCanvasProportionSize(35));
        text.draw();
    }

    processControls() {
        if (this.control.consume()) 
            this.attacked = true;
    }

    skipControls() {
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
        this.#calculateFinalVictoryPosition();
        this.key.setCoords(this.x, this.y+this.keyYModifier);
    }

    doDefeat() {
        this.setImage(this.assets.lose);
        this.x = Math.random()*(canvasWidth*0.08) + canvasWidth*0.46;
        this.y = Math.random()*(canvasHeight*0.1) + canvasHeight*0.55;
        this.key.setCoords(this.x, this.y+this.keyYModifier);
    }

    #calculateFinalVictoryPosition() {
        if (this.x == canvasWidth/2) 
            return this.y = canvasHeight - this.y;
        
        let x1 = this.x;
        let y1 = this.y;
        let x2 = canvasWidth/2;
        let y2 = canvasHeight/2;
        let dashLine = (x) => ((x-x1)/(x2-x1)) * (y2-y1) + y1

        this.x = canvasWidth - this.x;
        this.y = dashLine(this.x);
    }

}

export {
    Player
}
