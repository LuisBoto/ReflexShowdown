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
        if (controls.singleplayer) {
            gameLayer = new GameLayer(1);
            layer = gameLayer;
            controls.singleplayer = false;
        }

        else if (controls.multiplayer) {
            gameLayer = new GameLayer(2);
            layer = gameLayer;
            controls.multiplayer = false;
        }
    }

    draw (){
        this.background.draw();
    }
}