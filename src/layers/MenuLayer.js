class MenuLayer extends Layer {
    constructor() {
        super();
        this.initiate();
    }
    
    initiate() {
        this.background = new Model(images.background,1920*0.5,1080*0.5);
        this.singlePlayerKey = new Key(1920*0.2, 1080*0.4, "Q");
        this.singlePlayerTag = new Text("Singleplayer", 1920*0.235, 1080*0.4);
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
        this.background.draw();
        this.singlePlayerKey.draw();
        this.singlePlayerTag.draw();
    }
}