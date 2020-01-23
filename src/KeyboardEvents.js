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
    }
}

function onKeyUp( event) {
    var pos = keys.indexOf(event.keyCode);
    keys.splice( pos, 1);
}
