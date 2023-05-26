import { context, getCanvasProportionSize } from "../../Main";

class Text {

    constructor(value, x, y, centered) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.center = centered;
        this.setSize(getCanvasProportionSize(25));
        this.wordsPerLine = 10;
    }

    setValue(value) {
        this.value = value;
    }

    setSize(size) {
        this.size = size + "px";
    }

    setWordsPerLine(wordsPerLine) {
        this.wordsPerLine = wordsPerLine;
    }

    draw(color) {
        let workingY = this.y;
        context.font = this.size + " monospace";
        context.fillStyle = color ? color : "white";
        context.textAlign = "left";
        if (this.center)
            context.textAlign = "center";
        let i = 0;
        while (i < this.value.split(" ").length/this.wordsPerLine) {
            let line = this.value.split(" ").slice(i*this.wordsPerLine, (i+1)*this.wordsPerLine).join(" ");
            this.doText(line, this.x, workingY);
            workingY += getCanvasProportionSize(parseInt(this.size.substring(0, 2)));
            i += 1;
        }
    }

    doText(text, x, y) {
        context.fillText(text, x, y);
    }

}

export {
    Text
}
