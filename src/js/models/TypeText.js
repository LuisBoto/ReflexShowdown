import { Text } from "./Text.js";

class TypeText extends Text {

    constructor(value, x, y, centered) {
        super(value, x, y, centered);
        this.counter = 0;
    }

    draw() {
        if (this.counter < this.value.length)
            this.counter=this.counter+3;
        context.font = "25px Monospace";
        context.fillStyle = "white";
        context.textAlign = "left";
        if (this.center)
            context.textAlign = "center";
        context.fillText(this.value.substring(0, this.counter), this.x, this.y);
    }

}

export {
    TypeText
}
