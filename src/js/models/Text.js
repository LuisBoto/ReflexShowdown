import { context } from "../../Main";

class Text {

    constructor(value, x, y, centered) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.center = centered;
    }

    setValue(value) {
        this.value = value;
    }

    draw(color) {
        context.font = "25px monospace";
        context.fillStyle = color ? color : "white";
        context.textAlign = "left";
        if (this.center)
            context.textAlign = "center";
        context.fillText(this.value, this.x, this.y);
    }

}

export {
    Text
}
