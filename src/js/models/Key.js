import { images } from "../Resources.js";
import { Model } from "./Model.js";
import { Text } from "./Text.js";
import { StrokedText } from "./StrokedText.js";
import { getButtonControl } from "../ControlEvents.js";
import { Control } from "../ControlEvents.js";
import { getCanvasProportionSize } from "../../Main.js";

class Key extends Model {

    constructor(x, y, key, keyTag, keyText) {
        super(images.key, x, y);
        if (key instanceof Control)
            this.keyControl = key;
        else
            this.keyControl = getButtonControl(this.x, this.y, key);
        
        this.setTag(keyTag);
        this.text = new Text(keyText ? keyText : this.keyControl.getCharacterFromKeyCode(), x, y, true);
        this.isPressed = false;
        this.pressedYModifier = 1;
        this.pressedY = this.y+this.pressedYModifier;
    }

    consumeControl() {
        return this.keyControl.consume();
    }

    draw() {
        this.processPressedFrames();
        if (this.isPressed) {
            this.setImage(images.pressedKey);
            this.y = this.pressedY;
        }
        else {
            this.setImage(images.key);
            this.y = this.pressedY - this.pressedYModifier;
        }
        
        this.drawProportionalToCanvas(10);

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

    setCoords(x, y) {
        this.x = x;
        this.y = y;
        this.pressedY = this.y + this.pressedYModifier;
        this.text.x = x;
        this.text.y = y;
        if (this.tagged) {
            this.tag.x = x;
            this.tag.y = y+this.height; 
        }
    }

    setTag(tagText) {
        this.tagged = tagText;
        if (this.tagged) this.tag = new StrokedText(tagText, this.x, this.y+getCanvasProportionSize(10), true); 
    }
}

export {
    Key
}