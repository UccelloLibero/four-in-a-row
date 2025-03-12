class Game {
  constructor() {
    this.board = new Board(); // set to a new Board object
    this.players = this.createPlayers(); // set to the return value from a call to the createPlayers method
    this.ready = false; // when the Game object is initialized it automatically won't be ready to play or be interacted with
  }

  /**
  * returns active player
  * @return {Object} player - the active player
  */
  // whose turn is it and which token to move on the screen
  // using array method find to return a single value
  get activePlayer() {
    return this.players.find(player => player.active);
    // find method returns the first element that has passed the provided test -- the test condition: does the player objects active property equal to true, is this the active player
  }

  /**
  * Creates two player objects
  * @return  {Array}    An array of two Player objects.
  */
  createPlayers() {
    const players = [
      new Player('Player 1', 1, '#e15258', true),
      new Player('Player 2', 2, '#e59a13')
    ]; // look at Player.js files to understand arguments
    return players;
  }

  /*
  * Gets game ready for play -- initializes game
  */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;

  }

  /**
  * branches code, depending on what key player presses
  * @param {Object} event - Keydown event object
  */
  // checks if the Game is ready
  // the 'event' arg that's being passed here is the actual event object that is passed to the event listener callback method in app.js
  handleKeydown(event) {
    if(this.ready) {
      if(event.key === 'ArrowLeft') {
        // move left
        this.activePlayer.activeToken.moveLeft();
      } else if (event.key === 'ArrowRight') {
        // move right
        this.activePlayer.activeToken.moveRight(this.board.columns);
      } else if (event.key === 'ArrowDown') {
        // play token
        this.playToken();
      }
    }
  }


  // each activeToken has a columnLocation property
  // each columns of spaces is an array of individual Space objects in that column, so you need to identify which specific space in that column is the target -- that's the logic of the playToken method
  /**
  * finds Space object to drop Token into, drops Token
  */
  playToken() {
    let spaces = this.board.spaces;
    let activeToken = this.activePlayer.activeToken;
    let targetColumn = spaces[activeToken.columnLocation];
    let targetSpace = null;
    // the spaces variable holds a reference to the entire 2D array of space objects representing the game board

    // 'for of' -- loop iterating through the individual space objects in the target column array
    // if the spaces token property is equal to null, it means the space is empty and it is a potential target space
    // at the end of the for loop, the target space variable will hold the lowest empty space in that column, which is now the target space
    for(let space of targetColumn) {
      if(space.token === null) {
        targetSpace = space;
      }
    }

    // if at the end of the loop the target space variable is still equal to null, that means the column is full
    // if above is not the case, and you find a target space, then set the game's 'game.ready' state to false, and call the drop method on the active token, passing in the target space as a parameter
    if(targetSpace !== null) {
      const game = this;
      game.ready = false;

      activeToken.drop(targetSpace, function() {
        game.updateGameState(activeToken, targetSpace);
      });
    }
  }

  /**
  * Updates game state after token is dropped.
  * @param   {Object}  token  -  The token that's being dropped.
  * @param   {Object}  target -  Targeted space for dropped token.
  */
  updateGameState(token, target) {
    target.mark(token);

    if (!this.checkForWin(target)) {
        console.log('No win');
        this.switchPlayers();

        if (this.activePlayer.checkTokens()) {
            this.activePlayer.activeToken.drawHTMLToken();
            this.ready = true;
        } else {
            this.ready = false;
            this.gameOver('There are no more tokens!');
        }

    } else {
        console.log('Win detected');
        this.ready = false;

        // 🛠 Fix: Ensure target has a token before accessing owner
        if (target.token && target.token.owner) {
            this.gameOver(`${target.token.owner.name} wins!`);
        } else {
            console.error('Error: Target token owner is undefined.');
            this.gameOver(`Game Over!`);
        }
    } 
  }

  /**
  * Checks if there a winner on the board after each token drop.
  * @param   {Object}    target - Targeted space for dropped token.
  * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
  */
  checkForWin(target) {
    const owner = target.token.owner;
    console.log(`Checking win condition for ${owner.name}`);

    // Vertical win
    for (let x = 0; x < this.board.columns; x++) {
        for (let y = 0; y < this.board.rows - 3; y++) {
            if (this.board.spaces[x][y].token &&
                this.board.spaces[x][y].token.owner === owner &&
                this.board.spaces[x][y + 1].token &&
                this.board.spaces[x][y + 1].token.owner === owner &&
                this.board.spaces[x][y + 2].token &&
                this.board.spaces[x][y + 2].token.owner === owner &&
                this.board.spaces[x][y + 3].token &&
                this.board.spaces[x][y + 3].token.owner === owner) {
                console.log(`Vertical win detected at column ${x}, row ${y}`);
                return true; // STOP searching
            }
        }
    }

    // Horizontal win
    for (let x = 0; x < this.board.columns - 3; x++) {
        for (let y = 0; y < this.board.rows; y++) {
            if (this.board.spaces[x][y].token &&
                this.board.spaces[x][y].token.owner === owner &&
                this.board.spaces[x + 1][y].token &&
                this.board.spaces[x + 1][y].token.owner === owner &&
                this.board.spaces[x + 2][y].token &&
                this.board.spaces[x + 2][y].token.owner === owner &&
                this.board.spaces[x + 3][y].token &&
                this.board.spaces[x + 3][y].token.owner === owner) {
                console.log(`Horizontal win detected at column ${x}, row ${y}`);
                return true; // STOP searching
            }
        }
    }

    // Diagonal (\) win
    for (let x = 0; x < this.board.columns - 3; x++) {
        for (let y = 0; y < this.board.rows - 3; y++) {
            if (this.board.spaces[x][y].token &&
                this.board.spaces[x][y].token.owner === owner &&
                this.board.spaces[x + 1][y + 1].token &&
                this.board.spaces[x + 1][y + 1].token.owner === owner &&
                this.board.spaces[x + 2][y + 2].token &&
                this.board.spaces[x + 2][y + 2].token.owner === owner &&
                this.board.spaces[x + 3][y + 3].token &&
                this.board.spaces[x + 3][y + 3].token.owner === owner) {
                console.log(`Diagonal (\\) win detected at column ${x}, row ${y}`);
                return true; // STOP searching
            }
        }
    }

    // Diagonal (/) win
    for (let x = 0; x < this.board.columns - 3; x++) {
        for (let y = 3; y < this.board.rows; y++) {
            if (this.board.spaces[x][y].token &&
                this.board.spaces[x][y].token.owner === owner &&
                this.board.spaces[x + 1][y - 1].token &&
                this.board.spaces[x + 1][y - 1].token.owner === owner &&
                this.board.spaces[x + 2][y - 2].token &&
                this.board.spaces[x + 2][y - 2].token.owner === owner &&
                this.board.spaces[x + 3][y - 3].token &&
                this.board.spaces[x + 3][y - 3].token.owner === owner) {
                console.log(`Diagonal (/) win detected at column ${x}, row ${y}`);
                return true; // STOP searching
            }
        }
    }

    return false; // No win found
  }

  // switches active players
  // iterate through the array of Players for each Player object, switch the value of its active property, if the active property is set to true, it should now be set to false and vice versa
  switchPlayers(){
    for (let player of this.players) {
      player.active = !player.active;
    }
  }

   /**
   * display winner message
   * displays game over message.
   * @param {string} message - Game over message.
   */
  gameOver(message) {
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'block';
    gameOverScreen.innerHTML = `
        <div style="background: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 10px;">
            <h1>${message}</h1>
            <button id="restart-game" style="padding: 10px 20px; font-size: 20px; cursor: pointer; font-family: 'Wendy One', sans-serif; border-radius: 5px; background: #e59a13;">
                Play Again
            </button>
        </div>
    `;

    // Add event listener to restart game
    document.getElementById('restart-game').addEventListener('click', () => {
        window.location.reload(); // Simple way to restart
    });
  }

}
