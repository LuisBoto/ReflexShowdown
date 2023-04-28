import ambientWindFile from "../res/ambientWind.mp3";
import matchStartFile from "../res/matchStart.mp3";
import launchSoundFile from "../res/launchSound.mp3";
import slashFile from "../res/slash.mp3";

let ambientMusic = new Audio(ambientWindFile);
let matchStart = new Audio(matchStartFile);
let launchSound = new Audio(launchSoundFile);
let slashSound = new Audio(slashFile);
ambientMusic.loop = true;
matchStart.loop = false;
launchSound.loop = false;
slashSound.loop = false;

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

function playSlashSound() {
    slashSound.play();
}

function restartAudio() {
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
    playSlashSound,
    restartAudio
}


