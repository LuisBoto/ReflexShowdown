class Key extends Model {

    constructor(x, y, keyText) {
        super(images.key, x, y);
        this.text = new Text(keyText, x, y, true);
    }

    draw() {
        super.draw();
        this.text.draw();
    }
}