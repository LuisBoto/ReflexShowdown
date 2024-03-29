import { canvasHeight, canvasWidth, setLayer, getCanvasProportionSize } from "../../Main.js";
import { StrokedText } from "../models/StrokedText.js";
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
        super.initiate();
        this.background = new Model(images.background, canvasWidth*0.5, canvasHeight*0.5);
        this.backToMenuKey = new Key(getCanvasProportionSize(5), getCanvasProportionSize(5), KEYS.ESCAPE, "Back to menu", "esc");

        this.playerModel = new Model(images.player1Win, canvasWidth*0.25, canvasHeight*0.8);
        this.screenshot = new Model(images.screenshot, canvasWidth*0.75, canvasHeight*0.8);

        let basics = "Stay sharp and prove how fast you are! A match begins with a stare down, waiting for the signal to attack. Once it comes up, react as fast as you can and press your button or click or your character to beat your opponent!";
        let multi = "Play against your friends locally, up to 6 players, to compete for the best time and see who has lightining fast reflexes!"
        this.titleText = new StrokedText("How to play:", canvasWidth*0.5, canvasHeight*0.15, true);
        this.basicsParagraph = new StrokedText(basics, canvasWidth*0.5, canvasHeight*0.3, true);
        this.multiParagrapgh = new StrokedText(multi, canvasWidth*0.5, canvasHeight*0.65, true);
        this.basicsParagraph.setSize(getCanvasProportionSize(30));
        this.multiParagrapgh.setSize(getCanvasProportionSize(30));
        this.multiParagrapgh.setWordsPerLine(8);
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
        this.playerModel.drawProportionalToCanvas(2.5);
        this.screenshot.drawProportionalToCanvas(4);
    }

}

export {
    HowToLayer
}