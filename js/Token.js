class Token {
  constructor(index, owner) {
    this.owner = owner; // this property holds a referece to the player object that owns the token
    this.id = `token-${index}-${owner.id}`; //  concatenate this index with the string token and then each token object of a given player will now have a unique ID (template literal); ++ concat the value of the owning player's ID property so to tell the tokens of each player apart -- id of the token will be a string that reflects the index and the id of the owner
    this.dropped = false; // boolean value that indicated whether or not that token has been played -- to start the game it's set to false because none of the tokens have been dropped yet
    this.columnLocation = 0;
  }

  /**
  * gets associated htmlToken
  * @return {element} html element associated with token object
  */

  // getter method created to return the div element 'token' created in the method above

  get htmlToken() {
    return document.getElementById(this.id);

  }

  // it's a JavaScript DOM property, tells how far left an element is relative to the nearest ancestor without a static position --  how far, in pixels, the htmlToken element has traveled from the left edge of the game board -- you need this value to calculate the new left position of the htmlToken after a left or right arrow key has been pressed

  /**
  * gets left offset of the html element
  * @return {number} left offset of token object's htmlToken
  */
  get offsetLeft() {
    return this.htmlToken.offsetLeft;
  }


  // draw new HTML token
  drawHTMLToken() {
    const token = document.createElement('div');
    document.getElementById('game-board-underlay').appendChild(token);
    token.setAttribute('id', this.id);
    token.setAttribute('class', 'token');
    token.style.backgroundColor = this.owner.color;
  }


  /**
  * moves html token one column to left.
  */
  moveLeft() {
    if (this.columnLocation > 0) {
      this.htmlToken.style.left = this.offsetLeft - 76;
      //this.htmlToken.style.left = (this.columnLocation - 1) * 76;
      this.columnLocation -= 1;
    }
  }


  /**
  * Moves html token one column to right.
  * @param   {number}    columns - number of columns on the game board
  */
  moveRight(columns) {
    if(this.columnLocation < columns -1) {
      this.htmlToken.style.left = this.offsetLeft + 76;
      //this.htmlToken.style.left = (this.columnLocation + 1) * 76;
      this.columnLocation += 1;
    }
  }

  /**
  * Drops html token into targeted board space.
  * @param   {Object}   target - Targeted space for dropped token.
  * @param   {function} reset  - The reset function to call after the drop animation has completed.
  */

  // this method is called on the active token when the player presses the arrow down key
  drop(target, reset) {
    this.dropped = true;

    $(this.htmlToken).animate({
      top: (target.y * target.diameter)
    }, 750, 'easeOutBounce', reset);

    // 'target' -- is the actual space object that the token is being dropped into
    // 'top' -- the active token's HTML counterpart is animated so that its top position value is changed to a value equal to the target spaces row, times the target space's diameter
    // '750' -- the number 750 is how many milliseconds the animation should take
    // 'reset' is a callback function -- this is added into the code for the animation -- when the animation finishes and the token has visibly dropped into the space on the board, the reset function is called -- it resets the boards and gets the game ready for the next player

  }

}
