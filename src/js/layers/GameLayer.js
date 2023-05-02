import { Layer } from "./Layer.js";
import { playAmbientMusic, playLaunchSound, playMatchStart, playSlashSound, restartAudio } from "../AudioManager.js";
import { images } from "../Res.js";
import { Model } from "../models/Model.js";
import { Slash } from "../models/Slash.js";
import { canvasHeight, canvasWidth, setLayer } from "../../Main.js";
import { escapeKeyControl } from "../ControlEvents.js";
import { MenuLayer } from "./MenuLayer.js";
import { Key } from "../models/Key.js";

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
        this.backToMenuKey = new Key(canvasWidth*0.075, canvasHeight*0.1, escapeKeyControl, "Back to menu", "esc");

        this.awaitingInput = false;
        this.signal = false;
        this.decided = false;
        this.players.forEach((p) => p.initiate())

        this.playStartAnimation();
    }

    processControls() {
        if (escapeKeyControl.consume())
            return setLayer(new MenuLayer());
        if (!this.awaitingInput) 
            this.players.forEach(player => player.skipTurn());
        else
            this.players.forEach(player => player.doTurn());
    }

    update() {
        if (Math.random()*1000 < 5 && this.awaitingInput && !this.signal) {
            this.signal = true;
            this.launchTime = Date.now();
            this.players.forEach(p => p.launchTime = this.launchTime);
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
        this.slash.show = true;
        playSlashSound();
        this.players.forEach(p => p.doDefeat());
        let max = this.players.map(p => p.getTime()).reduce((a, b) => Math.max(a, b), -Infinity);
        this.players.filter(p => p.getTime() == max)[0].doVictory();
    }

    resetGame() {
        setTimeout(() => { this.initiate(); }, 2000);
    }
}

export {
    GameLayer
}
