import { canvasHeight, canvasWidth, setLayer } from "../../Main.js";
import { StrokedText } from "../models/StrokedText.js";
import { Text } from "../models/Text.js";
import { Layer } from "./Layer.js";
import { MenuLayer } from "./MenuLayer.js";
import { Model } from "../models/Model.js";
import { images } from "../Resources.js";
import { Key } from "../models/Key.js";
import { KEYS } from "../ControlEvents.js";

class HowToLayer extends Layer {

    constructor() {
        super();
        this.initiate();
    }

    initiate() {
        this.background = new Model(images.background, canvasWidth*0.5, canvasHeight*0.5);
        this.backToMenuKey = new Key(canvasWidth*0.075, canvasHeight*0.1, KEYS.ESCAPE, "Back to menu", "esc");

        let basics = "Stay sharp and prove how fast you are! A match begins with a stare down, waiting for the signal to attack. Once it comes up, react as fast as you can and press your button or click or your character to beat your opponent!";
        let multi = "Play against your friends locally, up to 6 players, to compete for the best time and see who has lightining fast reflexes!"
        this.titleText = new StrokedText("How to play:", canvasWidth*0.5, canvasHeight*0.15);
        this.basicsParagraph = new StrokedText(basics, canvasWidth*0.1, canvasHeight*0.4, false);
        this.multiParagrapgh = new StrokedText(multi, canvasWidth*0.55, canvasHeight*0.7, false);
        this.basicsParagraph.setSize(25);
        this.multiParagrapgh.setSize(25);
    }

    processControls() {
        if (this.backToMenuKey.consumeControl())
            setLayer(new MenuLayer());
    }

    draw() {
        this.background.drawResize(canvasWidth, canvasHeight);
        this.backToMenuKey.draw();
        this.titleText.draw();
        this.basicsParagraph.draw();
        this.multiParagrapgh.draw();
    }

}

export {
    HowToLayer
}