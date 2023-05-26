import { cache } from "../ResourceLoader.js";
import { context, canvasHeight, canvasWidth } from "../../Main.js";

class Model {

    constructor(imageRoute, x, y) {
        this.image = cache[imageRoute];
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.width = this.image.width;
        this.height = this.image.height;
    }

    isOnScreen () {
        if ( this.x  - this.width/2 <= 900 &&
            (this.x)  + this.width/2 >= 0 &&
            this.y - this.height/2 <= 600 &&
            this.y + this.height/2 >= 0 ){
            return true;
        }
        return false;
    }

    update() {
        
    }

    draw() {
        context.drawImage(this.image,
            this.x - this.width /2,
            this.y - this.height /2);
    }

    drawResize(imageWidth, imageHeight) {
        context.drawImage(this.image,
            this.x - imageWidth/2, this.y - imageHeight/2,
            Math.floor(imageWidth), Math.floor(imageHeight));
    }

    drawProportionalToCanvas(proportion) {
        let sizeRelativeToCanvas = Math.sqrt(canvasHeight*canvasWidth) / proportion / 2;
        this.drawResize(sizeRelativeToCanvas*this.width/this.height, sizeRelativeToCanvas);
    }

    setImage(imageRoute) {
        this.image = cache[imageRoute];
        this.width = this.image.width;
        this.height = this.image.height;
    }
}

export {
    Model
}
