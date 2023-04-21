class GameLayer extends Layer {

    constructor(mode) {
        super();
        this.mode = mode;
        this.initiate();
    }

    initiate() {
        restartSound();
        playAmbientMusic();
        this.background = new Model(images.backgroud, 1920*0.5, 1080*0.5);
        this.player1 = new Player(images.player1, true);
        this.player2 = new Player(images.player2, false);
        this.exclamation = new Model(images.exclamation, 1920*0.5, 1080*0.5);
        this.singleplayer = this.mode==1;

        this.awaitingInput = false;
        this.signal = false;
        this.decided = false;

        this.playStartAnimation();
    }

    update() {
        if (Math.random()*1000 < 10 && this.awaitingInput && !this.signal) {
            this.signal = true;
            playLaunchSound();
        }
        if (this.decided && this.signal) { //A player already attacked
            //Winner animation
            this.initiate();
        }
    }

    draw() {
        this.background.draw();
        this.player1.draw();
        this.player2.draw();
        if (this.signal && !this.decided) {
            this.exclamation.draw();
        }
    }

    playStartAnimation() {
        playMatchStart();
        window.setTimeout(function(){
                this.awaitingInput = true;
                console.log("Awaiting input");
            }.bind(this), 2000);
    }

    processControls() {
        if (!this.awaitingInput)
            return;

        this.decided = controls.player1input || controls.player2input;
        if (this.decided && !this.signal) {
            this.playTie()
        }
        this.awaitingInput = !this.decided;

        controls.player1input = false;
        controls.player2input = false;
    }

    playTie() {
        //A player moved before the signal
        this.background = new Model(images.inverseBackground, 1920*0.5, 1080*0.5);
        playLaunchSound();
        window.setTimeout(function(){
                this.initiate(this.mode); }
            .bind(this), 3000);
    }
}
