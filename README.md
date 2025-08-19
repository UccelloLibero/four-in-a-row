# Four in a Row

![Four in a Row Demo Screenshot](https://github.com/UccelloLibero/four-in-a-row/blob/master/connect-4-preview.png)

Four in a Row is a browser-based Connect Four game developed using JavaScript. The game allows two players to compete against each other or play against the computer. While it works with every browser, for the best experience, it is recommended to use Chrome.


## Features
- **Two Player Mode:** Play against another person.
- **Single Player Mode:** Play against the computer.
- **Cross-Browser Compatibility:** Works on all modern browsers.
- **Minimalist Design:** Simple and intuitive user interface.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/four-in-a-row.git

2. Navigate to the project directory:
   ```bash
   cd four-in-a-row

3. Open index.html in your preferred browser:
   ```bash
   open index.html


## Usage 
1. Open the game in your browser.
2. Click the "Start" button to begin a new game.
3. Players take turns to drop their tokens into the columns of the game board.
4. The first player to connect four of their tokens in a row (horizontally, vertically, or diagonally) wins the game.
5. A game over message will be displayed once the game ends.


## Project Structure
- **index.html:** Main HTML file that sets up the structure of the game.
- **css/style.css:** Stylesheet that defines the appearance of the game.
- **js/Game.js:** Contains the game logic and manages the game state.
- **js/Board.js:** Manages the game board and space objects.
- **js/Space.js:** Defines the space objects on the game board.
- **js/Player.js:** Defines player objects and manages player actions.
- **js/Token.js:** Manages token objects and their interactions.
- **js/app.js:** Initializes the game and handles user interactions.


## Game Logic
### Board Class
The Board class is responsible for creating and managing the game board.

- **Constructor:** Initializes the board with 6 rows and 7 columns.
- **createSpaces():** Generates a 2D array of space objects.
- **drawHTMLBoard():** Draws the board using SVG elements.

### Game Class
The Game class manages the overall game state and player interactions.

- **Constructor:** Initializes the board, players, and sets the game as not ready.
- **activePlayer():** Returns the current active player.
- **createPlayers():** Creates two player objects.
- **startGame():** Prepares the game for play.
- **handleKeydown(event):** Handles keyboard events for player actions.
- **playToken():** Handles the logic for dropping a token into the board.
- **updateGameState(token, target):** Updates the game state after a token is dropped.
- **checkForWin(target):** Checks if there is a winning condition on the board.
- **switchPlayers():** Switches the active player.
- **gameOver(message):** Displays the game over message.

### Player Class
The Player class represents the players in the game.

- **Constructor:** Initializes player properties.
- **createTokens(num):** Creates token objects for the player.
- **unusedTokens():** Returns an array of unused tokens.
- **activeToken():** Returns the current active token.
- **checkTokens():** Checks if the player has any undropped tokens left.

### Space Class
The Space class represents individual spaces on the game board.

- **Constructor:** Initializes space properties.
- **owner():** Returns the owner of the token in the space.
- **drawSVGSpace():** Draws the space using SVG elements.
- **mark(token):** Marks the space with a token.

### Token Class
The Token class represents the tokens used in the game.

- **Constructor:** Initializes token properties.
- **htmlToken():** Returns the HTML element associated with the token.
- **offsetLeft():** Returns the left offset of the HTML token.
- **drawHTMLToken():** Draws the HTML token.
- **moveLeft():** Moves the token one column to the left.
- **moveRight(columns):** Moves the token one column to the right.
- **drop(target, reset):** Drops the token into the targeted space.


## Contact
Created by Maya. 
