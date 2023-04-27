import ambientWindFile from "../res/ambientWind.mp3";
import matchStartFile from "../res/matchStart.mp3";
import launchSoundFile from "../res/launchSound.mp3";

var ambientMusic = new Audio(ambientWindFile);
var matchStart = new Audio(matchStartFile);
var launchSound = new Audio(launchSoundFile);
ambientMusic.loop = true;
matchStart.loop = false;
launchSound.loop = false;

function playAmbientMusic() {
    ambientMusic.volume = 0.25;
    ambientMusic.play();
}

function playMatchStart() {
    matchStart.volume = 0.5;
    matchStart.play();
}

function playLaunchSound() {
    launchSound.play();
}

function restartSound() {
    ambientMusic.pause();
    ambientMusic.currentTime = 0;
    launchSound.pause();
    launchSound.currentTime = 0;
    matchStart.pause();
    matchStart.currentTime = 0;
}

export {
    playAmbientMusic,
    playMatchStart,
    playLaunchSound,
    restartSound
}


