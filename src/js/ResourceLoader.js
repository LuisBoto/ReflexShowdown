import { images } from "./Resources.js";

let cache = [];

let playerAssets = [];
for (let i=1; i<=6; i++) {
    playerAssets.push({
        base: images["player"+i],
        win: images["player"+i+"Win"],
        lose: images["player"+i+"Lose"]
    })
}

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
