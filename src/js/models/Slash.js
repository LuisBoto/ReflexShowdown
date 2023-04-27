import { Model } from "./Model.js";
import { canvasHeight, canvasWidth } from "../../Main.js";
import { context } from "../../Main.js";

class Slash extends Model {

    constructor(imageRoute) {
        super(imageRoute, canvasWidth*0.5, canvasHeight*0.65);
        this.initiate();
    }

    initiate() {
        this.frames = 3;
        this.show = false;
    }

    draw() {
        if (this.show && this.frames >= 0) {
            context.fillStyle = "black";
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            super.drawResize(this.width*10, this.height*6);
            this.frames -= 1;
        }
        if (this.frames < 0)
            this.show = false;
    }

}

export {
    Slash
}
