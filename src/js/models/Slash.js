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
        this.rotation = Math.floor(Math.random()*360);
    }

    draw() {
        if (this.show && this.frames >= 0) {
            context.fillStyle = "black";
            context.fillRect(0, 0, canvasWidth, canvasHeight);

            context.save();
            //context.translate(this.x, this.y); // TODO random rotation of slash
            //context.rotate(this.rotation * (Math.PI / 180));
            super.drawResize(this.width*4, this.height*3);
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
