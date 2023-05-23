import ambientWindFile from "../res/ambientWind.mp3";
import matchStartFile from "../res/matchStart.mp3";
import launchSoundFile from "../res/launchSound.mp3";
import slashFile from "../res/slash.mp3";

let muted = false;
const sounds = {
    ambientMusic : new Audio(ambientWindFile),
    matchStart : new Audio(matchStartFile),
    launchSound : new Audio(launchSoundFile),
    slashSound : new Audio(slashFile)
}
sounds.ambientMusic.loop = true;

function playAmbientMusic() {
    play("ambientMusic", 0.25);
}

function playMatchStart() {
    play("matchStart", 0.5);
}

function playLaunchSound() {
    play("launchSound");
}

function playSlashSound() {
    play("slashSound");
}

function restartAudio() {
    Object.values(sounds).forEach(s => {
        s.pause();
        s.currentTime = 0;
    });
}

function play(audio, volume = 1) {
    sounds[audio].volume = volume;
    if (!muted) 
        sounds[audio].play();
}

function isMuted() {
    return muted;
}

function switchMuted() {
    muted = !muted;
}

export {
    playAmbientMusic,
    playMatchStart,
    playLaunchSound,
    playSlashSound,
    restartAudio,
    isMuted,
    switchMuted
}


