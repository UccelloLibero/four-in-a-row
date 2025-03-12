const game = new Game();

/**
 * listens for click on `#begin-game` and calls startGame() on game object
 */
document.getElementById('begin-game').addEventListener('click', function(){
    game.startGame();
    this.style.display = 'none'; // Hide the start button
    document.getElementById('play-area').style.opacity = '1'; // Show the game board
    document.getElementById('welcome-section').style.display = 'none'; // Hide welcome message and instructions
});

/**
* listens for keyboards presses
*/
document.addEventListener('keydown', function(event) {
  game.handleKeydown(event);
});
