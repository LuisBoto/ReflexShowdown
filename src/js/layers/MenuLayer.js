import { Layer } from "./Layer.js";
import { GameLayer } from "./GameLayer.js";
import { HowToLayer } from "./HowToLayer.js";
import { Model } from "../models/Model.js";
import { StrokedText } from "../models/StrokedText.js";
import { images } from "../Resources.js";
import { canvasHeight, canvasWidth, setLayer } from "../../Main.js";
import { Key } from "../models/Key.js";
import { MuteKey } from "../models/MuteKey.js";
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
        this.singlePlayerKey = new Key(canvasWidth*0.3, canvasHeight*0.3, KEYS.Q, "Singleplayer");
        this.multiPlayerKey = new Key(canvasWidth*0.700, canvasHeight*0.3, KEYS.P, "Multiplayer");
        this.increasePlayersKey = new Key(canvasWidth*0.6, canvasHeight*0.6, KEYS.ARROW_RIGHT, "", ">");
        this.decreasePlayersKey = new Key(canvasWidth*0.4, canvasHeight*0.6, KEYS.ARROW_LEFT, "", "<");
        this.howToKey = new Key(canvasWidth*0.500, canvasHeight*0.75, KEYS.ESCAPE, "How to play?", "esc");
        this.muteKey = new MuteKey(canvasWidth*0.9, canvasHeight*0.1);

        this.playerNumber = 2;
        this.playerNumberText = new StrokedText("Players: 2", canvasWidth*0.5, canvasHeight*0.5, true);
        this.playerNumberText.setSize(28);

        this.keys = [this.singlePlayerKey, this.multiPlayerKey, this.howToKey, this.increasePlayersKey, this.decreasePlayersKey, this.muteKey];
    }

    processControls() {
        if (this.increasePlayersKey.consumeControl() && this.playerNumber < 6)
            this.playerNumber++;
        if (this.decreasePlayersKey.consumeControl() && this.playerNumber > 2)
            this.playerNumber--;
        this.playerNumberText.setValue("Players: " + this.playerNumber);
        
        if (this.singlePlayerKey.consumeControl()) 
            setLayer(new GameLayer(1, this.playerNumber-1));
        else if (this.multiPlayerKey.consumeControl()) 
            setLayer(new GameLayer(this.playerNumber, 0));
        
        if (this.howToKey.consumeControl())
            setLayer(new HowToLayer());
    }

    draw() {
        this.background.drawResize(canvasWidth, canvasHeight);
        this.keys.forEach(k => k.draw());
        this.playerNumberText.draw();
    }
}

export {
    MenuLayer
}