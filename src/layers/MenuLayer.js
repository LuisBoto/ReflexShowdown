class MenuLayer extends Layer {
    constructor() {
        super();
        this.initiate();
    }
    initiate() {
        this.background =
            new Model(images.menu_background,1920*0.5,1080*0.5);
    }

    processControls( ) {
        if (singlePlayerControl.pressed) {
            singlePlayerControl.process();
            gameLayer = new GameLayer(1);
            layer = gameLayer;
        }

        else if (multiPlayerControl.pressed) {
            multiPlayerControl.process();
            gameLayer = new GameLayer(2);
            layer = gameLayer;
        }
    }

    draw (){
        this.background.draw();
    }
}