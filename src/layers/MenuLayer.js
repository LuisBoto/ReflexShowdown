class MenuLayer extends Layer {
    constructor() {
        super();
        this.initiate();
    }
    
    initiate() {
        this.background = new Model(images.background, canvasWidth*0.5, canvasHeight*0.5);
        this.singlePlayerKey = new Key(canvasWidth*0.2, canvasHeight*0.4, "Q");
        this.singlePlayerTag = new Text("Singleplayer", canvasWidth*0.235, canvasHeight*0.4);
        this.multiPlayerKey = new Key(canvasWidth*0.600, canvasHeight*0.4, "P");
        this.multiPlayerTag = new Text("Multiplayer", canvasWidth*0.635, canvasHeight*0.4);
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
        this.singlePlayerTag.draw();
        this.multiPlayerKey.draw();
        this.multiPlayerTag.draw();
    }
}