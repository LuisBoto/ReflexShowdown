class MenuLayer extends Layer {
    constructor() {
        super();
        this.initiate();
    }
    
    initiate() {
        this.background = new Model(images.background, canvasWidth*0.5, canvasHeight*0.5);
        this.singlePlayerKey = new Key(canvasWidth*0.3, canvasHeight*0.4, "Q", "Singleplayer");
        this.multiPlayerKey = new Key(canvasWidth*0.700, canvasHeight*0.4, "P", "Multiplayer");
        this.howToKey = new Key(canvasWidth*0.500, canvasHeight*0.75, "A", "How to play?");
    }

    processControls() {
        if (singlePlayerControl.pressed) {
            singlePlayerControl.process();
            layer = new GameLayer([new Player(images.player1, true, player1Control), new Player(images.player2, false, player2Control)]);
        }
        else if (multiPlayerControl.pressed) {
            multiPlayerControl.process();
            layer = new GameLayer([new Player(images.player1, true, player1Control), new Player(images.player2, false, player2Control)]);
        }

    }

    draw() {
        this.background.drawResize(canvasWidth, canvasHeight);
        this.singlePlayerKey.draw();
        this.multiPlayerKey.draw();
        this.howToKey.draw();
    }
}