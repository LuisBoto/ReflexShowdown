var ambientMusic = new Audio("res/ambientWind.mp3");
var matchStart = new Audio("res/matchStart.mp3");
ambientMusic.loop = true;
matchStart.loop = false;

function playAmbientMusic() {
    ambientMusic.volume = 0.35;
    ambientMusic.play();
}

function playMatchStart() {
    matchStart.play();
}

function stopMusic() {
    ambientMusic.pause();
}

