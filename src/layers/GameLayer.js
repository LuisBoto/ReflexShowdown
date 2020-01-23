class GameLayer extends Layer {

    constructor() {
        super();
        this.initiate();
        playAmbientMusic();
    }

    initiate() {
        this.background = new Model(images.backgroud, 1920*0.5, 1080*0.5);
        this.player1 = new Model(images.player1, 1920*0.2, 1080*0.63);
        this.player2 = new Model(images.player2, 1920*0.8, 1080*0.63);
    }

    update() {

    }

    draw() {
        this.background.draw();
        this.player1.draw();
        this.player2.draw();
    }

    processControls() {

    }
}
