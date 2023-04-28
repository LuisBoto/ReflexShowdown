import { images } from "../Res.js";
import { Model } from "./Model.js";
import { Text } from "./Text.js";
import { TypeText} from "./TypeText.js";

class Key extends Model {

    constructor(x, y, keyControl, keyTag) {
        super(images.key, x, y);
        this.keyControl = keyControl;
        this.text = new Text(keyControl.getCharacterFromKeyCode(), x, y, true);
        
        this.tagged = keyTag;
        if (this.tagged) this.tag = new TypeText(keyTag, x, y+this.height, true);
        this.isPressed = 0;
        this.pressedY = this.y+4;
    }

    draw() {
        this.processPressedFrames();
        if (this.isPressed) {
            this.setImage(images.pressedKey);
            this.y = this.pressedY;
        }
        else {
            this.setImage(images.key);
            this.y = this.pressedY - 4;
        }
        super.draw();

        this.drawText();
        this.drawTag();
    }

    drawText() {
        if (this.isPressed) {
            this.text.y = this.pressedY+4;
            this.text.draw("#ffffab");
        } else
            this.text.draw();
        this.text.y = this.y;
    }

    drawTag() {
        if (this.tagged)
            this.tag.draw();
    }

    processPressedFrames() {
        if (this.keyControl.pressed)
            this.isPressed = true;
        if (this.keyControl.lifted)
            this.isPressed = false;
    }

    setX(x) {
        this.x = x;
        this.text.x = x;
        if (this.tagged) this.tag.x = x;
    }
}

export {
    Key
}