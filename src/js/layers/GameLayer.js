import { Layer } from "./Layer.js";
import { playAmbientMusic, playLaunchSound, playMatchStart, restartSound } from "../AudioManager.js";
import { images } from "../Res.js";
import { Model } from "../models/Model.js";
import { Slash } from "../models/Slash.js";
import { canvasHeight, canvasWidth } from "../../Main.js";

class GameLayer extends Layer {

    constructor(players) {
        super();
        this.players = players;
        this.initiate();
    }

    initiate() {
        restartSound();
        playAmbientMusic();
        this.background = new Model(images.background, canvasWidth*0.5, canvasHeight*0.5);
        this.exclamation = new Model(images.exclamation, canvasWidth*0.5, canvasHeight*0.5);
        this.slash = new Slash(images.slash);

        this.awaitingInput = false;
        this.signal = false;
        this.decided = false;
        this.players.forEach((p) => p.initiate())

        this.playStartAnimation();
    }

    update() {
        if (Math.random()*1000 < 5 && this.awaitingInput && !this.signal) {
            this.signal = true;
            this.launchTime = new Date();
            this.players.forEach(p => p.launchTime = this.launchTime);
            playLaunchSound();
        }

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

    processControls() {
        if (!this.awaitingInput) 
            this.players.forEach(player => player.skipTurn());
        else
            this.players.forEach(player => player.doTurn());
    }

    draw() {
        this.background.drawResize(canvasWidth, canvasHeight);
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
