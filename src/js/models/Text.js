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
        let workingY = this.y;
        let maxWordsPerLine = 10;
        context.font = this.size + " monospace";
        context.fillStyle = color ? color : "white";
        context.textAlign = "left";
        if (this.center)
            context.textAlign = "center";
        let i = 0;
        while (i < this.value.split(" ").length/maxWordsPerLine) {
            let line = this.value.split(" ").slice(i*maxWordsPerLine, (i+1)*maxWordsPerLine).join(" ");
            this.doText(line, this.x, workingY);
            workingY += parseInt(this.size.substring(0, 2))*1.05;
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
