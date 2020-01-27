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
            controls.singleplayer = false;
            gameLayer = new GameLayer(1);
            layer = gameLayer;
        }

        else if (controls.multiplayer) {
            controls.multiplayer = false;
            gameLayer = new GameLayer(2);
            layer = gameLayer;
        }
    }

    draw (){
        this.background.draw();
    }
}