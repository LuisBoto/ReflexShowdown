class GameLayer extends Layer {

    constructor(players) {
        super();
        this.players = players;
        this.initiate();
    }

    initiate() {
        restartSound();
        playAmbientMusic();
        this.background = new Model(images.backgroud, 1920*0.5, 1080*0.5);
        this.exclamation = new Model(images.exclamation, 1920*0.5, 1080*0.5);

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
        if (this.decided && this.signal) { //A player already attacked
            //Winner animation
            this.initiate();
        }
    }

    draw() {
        this.background.draw();
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

    processControls() {
        if (!this.awaitingInput) {
            this.players.forEach(player => player.control.process());
            return;
        }

        this.players.forEach(player => player.doTurn());

        this.decided = this.players.filter((p) => p.hasAttacked()).length > 0;
        if (this.decided && !this.signal) {
            this.playTie()
        }
        this.awaitingInput = !this.decided;
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
