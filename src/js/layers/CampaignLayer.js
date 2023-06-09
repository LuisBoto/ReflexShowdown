import { GameLayer } from "./GameLayer.js";
import { canvasWidth, getCanvasProportionSize } from "../../Main.js";
import { StrokedText } from "../models/StrokedText.js";


class CampaignLayer extends GameLayer {

    constructor(humanPlayerNumber, cpuPlayerNumber, victoryStreak) {
        super(humanPlayerNumber, cpuPlayerNumber);
        this.victoryStreak = victoryStreak;
    }

    initiate() {
        if (this.isPlayerVictory) {
            this.victoryStreak += 1;
            this.cpuPlayerNumber = this.victoryStreak%3==0? this.cpuPlayerNumber + 1 : this.cpuPlayerNumber;
        }
        super.initiate();
        this.victoryBanner = new StrokedText(this.victoryStreak == undefined ? "" : "VICTORY STREAK: ".concat(this.victoryStreak), canvasWidth*0.5, getCanvasProportionSize(6), true);
        this.victoryBanner.setSize(getCanvasProportionSize(18));
        this.setRivalPlayerScores();
    }

    draw() {
        super.draw();
        this.victoryBanner.draw("red", "black");
    }

    playVictory() {
        super.playVictory();
        this.isPlayerVictory = this.players[0].isVictorious;
    }

    setRivalPlayerScores() {
        this.players.forEach(p => p.score = Math.floor(
                Math.pow(this.victoryStreak/30, 2)/Math.pow(this.victoryStreak/30, 3)*30 + Math.random()*50 + 150
            )
        )
    }
}

export {
    CampaignLayer
}
