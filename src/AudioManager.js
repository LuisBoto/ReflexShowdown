var ambientMusic = new Audio("res/ambientWind.mp3");
var matchStart = new Audio("res/matchStart.mp3");
var launchSound = new Audio("res/launchSound.mp3");
ambientMusic.loop = true;
matchStart.loop = false;
launchSound.loop = false;

function playAmbientMusic() {
    ambientMusic.volume = 0.25;
    //ambientMusic.play();
}

function playMatchStart() {
    matchStart.volume = 0.5;
    //matchStart.play();
}

function playLaunchSound() {
    //launchSound.play();
}

function restartSound() {
    ambientMusic.pause();
    ambientMusic.currentTime = 0;
    launchSound.pause();
    launchSound.currentTime = 0;
    matchStart.pause();
    matchStart.currentTime = 0;
}


