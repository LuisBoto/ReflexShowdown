var cache = [];
var images = {
    menu_background : "res/menubackground.png",
    exclamation : "res/exclamation.png",
    backgroud : "res/background.png",
    inverseBackground : "res/invertBackground.png",
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
