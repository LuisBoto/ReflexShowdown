var keys = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    input = inputs.keyboard;

    var pos = keys.indexOf(event.keyCode);
    if ( pos == -1 ) {
        keys.push(event.keyCode);
        if (event.keyCode == 65) //'A' for player 1
            controls.player1input = true;
        if (event.keyCode == 76) //'L' for player 2
            controls.player2input = true;
        if (event.keyCode == 81) //'Q' for singleplayer
            controls.singleplayer = true;
        if (event.keyCode == 80) //'P' for multiplayer
            controls.multiplayer = true;
        if (event.keyCode == 27) //Escape key
            controls.exit = true;
    }
}

function onKeyUp( event) {
    var pos = keys.indexOf(event.keyCode);
    keys.splice( pos, 1);
}
