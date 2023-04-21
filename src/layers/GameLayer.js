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
        this.player1 = new Model(images.player1, 1920*0.2, 1080*0.63);
        this.player2 = new Model(images.player2, 1920*0.8, 1080*0.63);
        this.exclamation = new Model(images.exclamation, 1920*0.5, 1080*0.5);
        this.singleplayer = this.mode==1;

        this.awaitingInput = false;
        this.launch = false;
        this.decided = false;

        this.playStartAnimation();
    }

    update() {
        if (Math.random()*10000 < 10 && this.awaitingInput) {
            this.launch = true;
            playLaunchSound();
        }
        if (this.decided && this.launch) { //A player already attacked
            //Winner animation
            this.initiate();
        }
    }

    draw() {
        this.background.draw();
        this.player1.draw();
        this.player2.draw();
        if (this.launched && !this.decided) {
            this.exclamation.draw();
        }
    }

    playStartAnimation() {
        playMatchStart();
        window.setTimeout(function(){
                this.awaitingInput = true;
                console.log("Awaiting input");
            }.bind(this), 3000);
    }

    processControls() {
        if (!this.awaitingInput)
            return;

        console.log(controls.player1input);
        if (controls.player1input && !controls.player2input) {
            controls.player1input = false;
            if (!this.launch) 
                this.playTie();
            this.attacker = 1;
            this.decided = true;
            this.awaitingInput = false;
            return;
        }
        if (!controls.player1input && controls.player2input) {
            controls.player2input = false;
            if (!this.launch)
                this.playTie();
            this.attacker = 2;
            this.decided = true;
            this.awaitingInput = false;
            return;
        }
    }

    playTie() {
        //A player moved before the signal
        this.background = new Model(images.inverseBackground, 1920*0.5, 1080*0.5);
        window.setTimeout(function(){
                this.initiate(this.mode); }
            .bind(this), 3000);
    }
}
