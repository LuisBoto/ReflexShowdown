var cache = [];
var images = {
    backgroud : "res/background.png",
    player1: "res/player1.png",
    player2: "res/player2.png",
};

var routeImages = Object.values(images);
loadImages(0);

function loadImages(index){
    cache[routeImages[index]] = new Image();
    cache[routeImages[index]].src = routeImages[index];
    cache[routeImages[index]].onload = function(){
        if ( index < routeImages.length-1 ){
            index++;
            loadImages(index);
        } else {
            startGame();
        }
    }
}
