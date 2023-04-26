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

    draw() {
        context.font = "30px monospace";
        context.fillStyle = "white";
        context.textAlign = "left";
        if (this.center)
            context.textAlign = "center";
        context.fillText(this.value, this.x, this.y);
    }

}
