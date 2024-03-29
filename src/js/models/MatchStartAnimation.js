import { Model } from "./Model.js";
import { canvasHeight, canvasWidth } from "../../Main.js";
import { context } from "../../Main.js";
import { images } from "../Resources.js";

class MatchStartAnimation extends Model {

    constructor() {
        super(images.matchStartBackground, 0, 0);
        this.initiate();
    }

    initiate() {
        this.mg = new SlidingModel(images.matchStartMiddleground, canvasWidth, canvasHeight, -17, 2.5)
        this.fg = new SlidingModel(images.matchStartForeground, 0, canvasHeight, 30, 1.5);
        this.bg = new SlidingModel(images.matchStartBackground, 0, canvasHeight-(this.fg.height/2), 15, 3);
    }

    update() {
        if (!this.isFinished()) {
            this.bg.update();
            this.mg.update();
            this.fg.update();
        }
    }

    draw() {
        if (!this.isFinished()) {
            let gradient = context.createLinearGradient(0, 0, 0, canvasHeight);
            gradient.addColorStop(0, "#FFFFFF00");
            gradient.addColorStop(1, this.#getFinalGradientColor());
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            this.bg.draw();
            this.mg.draw();
            this.fg.draw();   
        } 
    }

    #getFinalGradientColor() {
        let finalColor = (canvasHeight - this.bg.y >= 0 ? canvasHeight - this.bg.y : 0).toString(16).split('.')[0];
        return "#000000".concat(finalColor.length < 2 ? "0".concat(finalColor) : finalColor.length > 2 ? "ff" : finalColor);
    }

    isFinished() {
        return this.bg.isFinished() && this.mg.isFinished() && this.fg.isFinished();
    }

}

class SlidingModel extends Model {

    constructor(imageRoute, x, y, slideSpeed, sinkSpeed) {
        super(imageRoute, x, y);
        this.slideSpeed = slideSpeed;
        this.sinkSpeed = sinkSpeed;
        this.sinkDelay = 10;
        this.y = y - this.height / 2;
    }

    update() {
        this.x = this.x < -this.width ? 0 : this.x - this.slideSpeed;
        this.y += this.sinkSpeed;
    }

    draw() {
        let initialX = this.x;
        let duplicates = (canvasWidth / this.width) + 1;
        for (let i = 0; i <= duplicates; i++) {
            super.draw();
            this.x += this.slideSpeed > 0 ? this.width : -this.width;
        }
        this.x = initialX;
    }

    isFinished() {
        return this.y > canvasHeight + this.height/2;
    }

}

export {
    MatchStartAnimation
}
