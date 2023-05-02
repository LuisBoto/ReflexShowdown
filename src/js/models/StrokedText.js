import { context } from "../../Main";
import { Text } from "./Text.js";

class StrokedText extends Text {

    constructor(value, x, y) {
        super(value, x, y, true);
        this.setSize(50);
    }

    draw(innerColor, outerColor, strokeWidth) {
        context.lineWidth = strokeWidth ? strokeWidth : 8; 
        context.font = this.size + " monospace";
        context.fillStyle = innerColor ? innerColor : "white";
        context.strokeStyle = outerColor ? outerColor : "black";

        context.miterLimit=2;
        context.textAlign = "center";
        context.strokeText(this.value, this.x, this.y);
        context.fillText(this.value, this.x, this.y);
    }

}

export {
    StrokedText
}
