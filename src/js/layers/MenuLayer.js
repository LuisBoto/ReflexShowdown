import { Layer } from "./Layer.js";
import { GameLayer } from "./GameLayer.js";
import { Model } from "../models/Model.js";
import { images } from "../Resources.js";
import { canvasHeight, canvasWidth, setLayer } from "../../Main.js";
import { Key } from "../models/Key.js";
import { KEYS } from "../ControlEvents.js"
import { restartAudio } from "../AudioManager.js";

class MenuLayer extends Layer {
    constructor() {
        super();
        this.initiate();
    }
    
    initiate() {
        restartAudio();
        this.background = new Model(images.background, canvasWidth*0.5, canvasHeight*0.5);
        this.singlePlayerKey = new Key(canvasWidth*0.3, canvasHeight*0.4, KEYS.Q, "Singleplayer");
        this.multiPlayerKey = new Key(canvasWidth*0.700, canvasHeight*0.4, KEYS.P, "Multiplayer");
        this.howToKey = new Key(canvasWidth*0.500, canvasHeight*0.75, KEYS.ESCAPE, "How to play?", "esc");
    }

    processControls() {
        this.playerNumber = 2;
        if (this.singlePlayerKey.consumeControl()) {
            setLayer(new GameLayer(1, 1));
        }
        else if (this.multiPlayerKey.consumeControl()) {
            setLayer(new GameLayer(5, 0));
        }
        this.howToKey.consumeControl();
    }

    draw() {
        this.background.drawResize(canvasWidth, canvasHeight);
        this.singlePlayerKey.draw();
        this.multiPlayerKey.draw();
        this.howToKey.draw();
    }
}

export {
    MenuLayer
}