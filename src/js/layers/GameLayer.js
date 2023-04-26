import { Layer } from "./Layer.js";
import { playAmbientMusic, playLaunchSound, playMatchStart, restartSound } from "../AudioManager.js";
import { images } from "../Res.js";
import { Model } from "../models/Model.js";
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

        this.awaitingInput = false;
        this.signal = false;
        this.decided = false;
        this.players.forEach((p) => p.initiate())

        this.playStartAnimation();
    }

    update() {
        if (Math.random()*1000 < 10 && this.awaitingInput && !this.signal) {
            this.signal = true;
            playLaunchSound();
        }

        this.decided = this.awaitingInput && this.players.filter((p) => p.hasAttacked()).length > 0;
        if (this.decided) {
            this.awaitingInput = false;
            if (this.signal) { // A player attacked within opportunity window
                //Winner animation
                this.initiate();
            } else {
                this.playTie()
            }
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
        window.setTimeout(function(){
                this.initiate(this.mode); }
            .bind(this), 3000);
    }
}

export {
    GameLayer
}
