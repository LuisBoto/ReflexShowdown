import menuBackgroundFile from "../res/menubackground.png";
import exclamationFile from "../res/exclamation.png";
import backgroundFile from "../res/background.png";
import inverseBackgroundFile from "../res/invertBackground.png";
import player1File from "../res/player1.png";
import player1WinFile from "../res/player1Win.png";
import player1LoseFile from "../res/player1Lose.png";
import player2File from "../res/player2.png";
import player2WinFile from "../res/player2Win.png";
import player2LoseFile from "../res/player2Lose.png";
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
    player1Win: player1WinFile,
    player1Lose: player1LoseFile,
    player2: player2File,
    player2Win: player2WinFile,
    player2Lose: player2LoseFile,
    key: keyFile,
    pressedKey: pressedKeyFile,
    slash: slashFile,
    slash2: slash2File
};

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
    cache,
    player1Assets,
    player2Assets
}
