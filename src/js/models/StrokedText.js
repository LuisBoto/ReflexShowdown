import { context, getCanvasProportionSize } from "../../Main";
import { Text } from "./Text.js";

class StrokedText extends Text {

    constructor(value, x, y, centered) {
        super(value, x, y, centered);
    }

    draw(innerColor, outerColor, strokeWidth) {
        context.lineWidth = strokeWidth ? strokeWidth : getCanvasProportionSize(100); 
        context.strokeStyle = outerColor ? outerColor : "black";
        context.miterLimit=2;
        super.draw(innerColor ? innerColor : "white");
    }

    doText(text, x, y) {
        context.strokeText(text, x, y);
        context.fillText(text, x, y);
    }

}

export {
    StrokedText
}
