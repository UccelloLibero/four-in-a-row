const game = new Game();

/**
 * listens for click on `#begin-game` and calls startGame() on game object
 */
document.getElementById('begin-game').addEventListener('click', function(){
    game.startGame();
    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});

/**
* listens for keyboards presses
*/
document.addEventListener('keydown', function(event) {
  game.handleKeydown(event);
});
