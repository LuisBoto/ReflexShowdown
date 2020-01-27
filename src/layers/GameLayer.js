class GameLayer extends Layer {

    constructor(mode) {
        super();
        this.initiate(mode);
        playAmbientMusic();
    }

    initiate(mode) {
        this.background = new Model(images.backgroud, 1920*0.5, 1080*0.5);
        this.player1 = new Model(images.player1, 1920*0.2, 1080*0.63);
        this.player2 = new Model(images.player2, 1920*0.8, 1080*0.63);
        this.singleplayer = false;
        if (mode==1)
            this.singleplayer=true;
        this.awaitingInput = false;
        this.launch = false;
        this.decided = false;
        this.attacker;
        this.playStartAnimation();
    }

    update() {
        if (this.awaitingInput)
            this.processControls();
        if (this.decided) { //A player already attacked

        }
    }

    draw() {
        this.background.draw();
        this.player1.draw();
        this.player2.draw();
    }

    playStartAnimation() {
        playMatchStart();
    }

    processControls() {
        //TODO: Rework this to allow for ties
        if (controls.player1input && !controls.player2input) {
            this.attacker = 1;
            this.decided = true;
            return;
        }
        if (!controls.player1input && controls.player2input) {
            this.attacker = 2;
            this.decided = true;
            return;
        }
    }
}
