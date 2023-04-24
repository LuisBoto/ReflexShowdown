class Player extends Model {

    constructor(imageRoute, isLeftSide, control) {
        let x = isLeftSide ? 1920*0.2 : 1920*0.8;
        let y = 1080*0.63;
        super(imageRoute, x, y);
        this.control = control;
        this.time = -1;
        this.width = this.image.width;
        this.height = this.image.height;
    }

    doTurn() {
        if (this.control.pressed) {
            this.control.process();
            this.time = Date.now();
        }
    }

    hasAttacked() {
        return this.time != -1;
    }

    
}
