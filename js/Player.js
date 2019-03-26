class Player {
  constructor(name, id, color, active = false) {
    this.name = name;
    this.id = id; // which player the tokens belong to
    this.color = color; // player tokens color
    this.active = active; // who's turn is it - boolean value instantiated the game with a default value of false so whoever starts the game they can assume it's not their turn unless otherwise specified
    this.tokens = this.createTokens(21); // array of players tokens -- this array will eventually hold instances of tokens
    // this keyword in case of "this.createTokens(21)" is indicating that the method you're calling is avaliable on the object that you're intializing -- 21 equals to the half of the number of spaces on the board, each player gets 21 token
  }

  /**
    * Creates token objects for player
    * @param   {integer}   num - Number of token objects to be created
    * @return  {array}     tokens - an array of new token objects
  */

// Create token objects for players
// num represents the number of token objects that need to be created
  createTokens(num) {
    const tokens = [];

    for(let i = 0; i < num; i++) {
      let token = new Token(i, this); // new variable named 'token' is created and it's set to equal a new Token object -- then the loop index and owning player object are passed to the token's constructor method -- '(i,this)' -- 'this' refering to owner parameter which is reperesenting the player object -- i is 'index' being passed in to represent the id for that token
      tokens.push(token); // add newly created token to tokens array via push() method
    }
    // when the loop is finished and all tokens are created then return the array
    return tokens;

  }


  /**
  * get all tokens that haven't been dropped
  * @return {array} array of unused tokens
  */

  // what tokens have not been dropped yet, how many tokens does each player have left
  get unusedTokens() {
    return this.tokens.filter(token => !token.dropped);
    // the filter method is called on an array and it's passed the test; the methods returns in the form of another array any elements of the original array that pass the provided test -- calling the filter method on the player's token's property which is holding an array of every token object belonging to the player
  }


  /**
  * get the active token by returning the first token in the array of unused tokens
  * @return {Object} first token object in the array of unused tokens
  */

  // pull one of the unused Token objects to be used as the Player's next active Token
  get activeToken() {
    return this.unusedTokens[0];
    // returns the first token object inside the unusedTokens array you created above
    // every time a player takes a turn, this getter method grabs the first token object in this array
    // when the active token is dropped into the game board, it's dropped property will be set to true, thus removing it from the unused tokens array
  }


  /**
  * Check if a player has any undropped tokens left
  * @return {Boolean}
  */
  checkTokens() {
    return this.unusedTokens.length == 0 ? false : true;
  }

}
