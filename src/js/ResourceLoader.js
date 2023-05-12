import { images } from "./Resources.js";

let cache = [];

let player1Assets = {
    base: images.player1,
    win: images.player1Win,
    lose: images.player1Lose
}

let player2Assets = {
    base: images.player2,
    win: images.player2Win,
    lose: images.player2Lose
}

let playerAssets = [player1Assets, player2Assets];

let routeImages = Object.values(images);
function loadImages(index = 0, callback) {
    cache[routeImages[index]] = new Image();
    cache[routeImages[index]].src = routeImages[index];
    cache[routeImages[index]].onload = function() {
        if ( index < routeImages.length-1 ) {
            index++;
            loadImages(index++, callback);
        }
        else
            callback();
    }
}

export {
    loadImages,
    cache,
    playerAssets
}
