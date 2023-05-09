import { Layer } from "./Layer.js";
import { playAmbientMusic, playLaunchSound, playMatchStart, playSlashSound, restartAudio } from "../AudioManager.js";
import { images } from "../Res.js";
import { Model } from "../models/Model.js";
import { Slash } from "../models/Slash.js";
import { canvasHeight, canvasWidth, setLayer } from "../../Main.js";
import { escapeKeyControl } from "../ControlEvents.js";
import { MenuLayer } from "./MenuLayer.js";
import { Key } from "../models/Key.js";
import { StrokedText } from "../models/StrokedText.js";

class GameLayer extends Layer {

    constructor(players) {
        super();
        this.players = players;
        this.initiate();
    }

    initiate() {
        restartAudio();
        playAmbientMusic();
        this.background = new Model(images.background, canvasWidth*0.5, canvasHeight*0.5);
        this.exclamation = new Model(images.exclamation, canvasWidth*0.5, canvasHeight*0.5);
        this.slash = new Slash(images.slash2);
        this.winnerTime = new StrokedText("", canvasWidth*0.5, canvasHeight*0.2);
        this.backToMenuKey = new Key(canvasWidth*0.075, canvasHeight*0.1, escapeKeyControl, "Back to menu", "esc");

        this.awaitingInput = false;
        this.signal = false;
        this.decided = false;
        this.players.forEach(p => p.initiate())

        this.playStartAnimation();
    }

    processControls() {
        if (escapeKeyControl.consume())
            return setLayer(new MenuLayer());
        if (!this.awaitingInput) 
            this.players.forEach(player => player.skipControls());
        else
            this.players.forEach(player => player.processControls());
    }

    update() {
        if (Math.random()*1000 < 5 && this.awaitingInput && !this.signal) {
            this.launchTime = Date.now();
            this.players.forEach(p => p.launchTime = this.launchTime);
            this.signal = true;
            playLaunchSound();
        }

        this.players.forEach(p => p.update());

        if (!this.decided)
            this.decided = this.awaitingInput && this.players.filter((p) => p.hasAttacked()).length > 0;
        if (this.decided && this.awaitingInput) {
            this.awaitingInput = false;
            if (this.signal) // A player attacked within opportunity window
                this.playVictory();
            else 
                this.playTie()
            this.resetGame();
        }
    }

    draw() {
        this.background.drawResize(canvasWidth, canvasHeight);
        this.backToMenuKey.draw();
        this.players.forEach(player => player.draw());

        if (this.signal && !this.decided) 
            this.exclamation.draw();
        this.slash.draw();
        this.winnerTime.draw("yellow", "black");
    }

    playStartAnimation() {
        playMatchStart();
        window.setTimeout(function(){
                this.awaitingInput = true;
                console.log("Awaiting input");
            }.bind(this), 2000);
    }

    playTie() {
        //A player moved before the signal
        this.background = new Model(images.inverseBackground, canvasWidth*0.5, canvasHeight*0.5);
        playLaunchSound();
    }

    playVictory() {
        let bestTime = Math.min.apply(null, this.players.filter(p => p.getTime() > 0).map(p => p.getTime()));
        this.players.filter(p => p.getTime() != bestTime).forEach(p => p.doDefeat());
        this.players.filter(p => p.getTime() == bestTime).forEach(p => p.doVictory());

        this.winnerTime.setValue("Winner time: " + bestTime + "ms");
        this.slash.show = true;
        playSlashSound();
    }

    resetGame() {
        setTimeout(() => { this.initiate(); }, 2000);
    }
}

export {
    GameLayer
}
