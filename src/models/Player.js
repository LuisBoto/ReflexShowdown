class Player extends Model {

    constructor(imageRoute, isLeftSide) {
        let x = isLeftSide ? 1920*0.2 : 1920*0.8;
        let y = 1080*0.63;
        super(imageRoute, x, y)
        this.width = this.image.width;
        this.height = this.image.height;
    }

    
}
