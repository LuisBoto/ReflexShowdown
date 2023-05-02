import { context } from "../../Main";

class Text {

    constructor(value, x, y, centered) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.center = centered;
        this.size = "20px";
    }

    setValue(value) {
        this.value = value;
    }

    setSize(size) {
        this.size = size + "px";
    }

    draw(color) {
        context.font = this.size + " monospace";
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
