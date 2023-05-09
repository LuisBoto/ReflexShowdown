import { Model } from "./Model.js";
import { canvasHeight, canvasWidth } from "../../Main.js";
import { context } from "../../Main.js";

class Slash extends Model {

    constructor(imageRoute) {
        super(imageRoute, 0, 0);
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
            let rotation = Math.floor(Math.random()*360);

            context.save();
            context.translate(canvasWidth*0.5, canvasHeight*0.65);
            context.rotate(rotation * (Math.PI / 180));
            this.drawResize(this.width*6, this.height*6);
            context.restore();
            this.frames -= 1;
        }
        if (this.frames < 0)
            this.show = false;
    }

}

export {
    Slash
}
