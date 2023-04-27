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
        this.pressedFrames = 0;
    }

    draw() {
        this.processPressedFrames();
        if (this.pressedFrames > 0) 
            this.setImage(images.pressedKey);
        else 
            this.setImage(images.key);
        super.draw();

        this.drawText();
        this.drawTag();
    }

    drawText() {
        if (this.pressedFrames > 0) {
            this.text.y += 3;
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
            this.pressedFrames = 6;
        else
            this.pressedFrames -= 1;
    }
}

export {
    Key
}