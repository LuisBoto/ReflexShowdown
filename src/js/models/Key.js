class Key extends Model {

    constructor(x, y, keyText, keyTag) {
        super(images.key, x, y);
        this.text = new Text(keyText, x, y, true);
        this.tagged = keyTag;
        if (this.tagged) this.tag = new Text(keyTag, x, y+this.height, true);
    }

    draw() {
        super.draw();
        this.text.draw();
        if (this.tagged)
            this.tag.draw();
    }
}