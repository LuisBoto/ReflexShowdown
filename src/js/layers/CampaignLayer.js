import { GameLayer } from "./GameLayer.js";
import { setLayer, canvasWidth, getCanvasProportionSize } from "../../Main.js";
import { StrokedText } from "../models/StrokedText.js";


class CampaignLayer extends GameLayer {

    constructor(humanPlayerNumber, cpuPlayerNumber, victoryStreak) {
        super(humanPlayerNumber, cpuPlayerNumber);
        this.victoryStreak = victoryStreak;
    }

    initiate() {
        if (this.isPlayerVictory) {
            this.victoryStreak += 1;
            this.cpuPlayerNumber = this.victoryStreak%2==0? this.cpuPlayerNumber + 1 : this.cpuPlayerNumber;
        }
        super.initiate();
        this.victoryBanner = new StrokedText(this.victoryStreak == undefined ? "" : "VICTORY STREAK: ".concat(this.victoryStreak), canvasWidth*0.5, getCanvasProportionSize(6), true);
        this.victoryBanner.setSize(getCanvasProportionSize(18));
    }

    draw() {
        super.draw();
        this.victoryBanner.draw("red", "black");
    }

    playVictory() {
        super.playVictory();
        this.isPlayerVictory = this.players[0].isVictorious;
    }
}

export {
    CampaignLayer
}
