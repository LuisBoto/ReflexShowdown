import menuBackgroundFile from "../res/menubackground.png";
import exclamationFile from "../res/exclamation.png";
import backgroundFile from "../res/background.png";
import inverseBackgroundFile from "../res/invertBackground.png";
import player1File from "../res/player1.png";
import player2File from "../res/player2.png";
import keyFile from "../res/key.png";
import pressedKeyFile from "../res/pressedKey.png";
import slashFile from "../res/slash.png";
import slash2File from "../res/slash2.png"

let cache = [];
let images = {
    menuBackground: menuBackgroundFile,
    exclamation: exclamationFile,
    background: backgroundFile,
    inverseBackground: inverseBackgroundFile,
    player1: player1File,
    player2: player2File,
    key: keyFile,
    pressedKey: pressedKeyFile,
    slash: slashFile,
    slash2: slash2File
};

let routeImages = Object.values(images);
function loadImages(index, callback) {
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
    images,
    cache
}
