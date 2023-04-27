import { Layer } from "./Layer.js";
import { GameLayer } from "./GameLayer.js";
import { Model } from "../models/Model.js";
import { images } from "../Res.js";
import { canvasHeight, canvasWidth, setLayer } from "../../Main.js";
import { Player } from "../models/Player.js";
import { Key } from "../models/Key.js";
import { multiPlayerControl, singlePlayerControl, player1Control, player2Control, escapeKeyControl } from "../KeyboardEvents.js"

class MenuLayer extends Layer {
    constructor() {
        super();
        this.initiate();
    }
    
    initiate() {
        this.background = new Model(images.background, canvasWidth*0.5, canvasHeight*0.5);
        this.singlePlayerKey = new Key(canvasWidth*0.3, canvasHeight*0.4, singlePlayerControl, "Singleplayer");
        this.multiPlayerKey = new Key(canvasWidth*0.700, canvasHeight*0.4, multiPlayerControl, "Multiplayer");
        this.howToKey = new Key(canvasWidth*0.500, canvasHeight*0.75, escapeKeyControl, "How to play?");
    }

    processControls() {
        if (singlePlayerControl.consume()) {
            setLayer(new GameLayer([new Player(images.player1, true, player1Control), new Player(images.player2, false, player2Control)]));
        }
        else if (multiPlayerControl.consume()) {
            setLayer(new GameLayer([new Player(images.player1, true, player1Control), new Player(images.player2, false, player2Control)]));
        }
        escapeKeyControl.consume();
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