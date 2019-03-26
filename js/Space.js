class Space {
  constructor(x, y, id, token) {
    this.x = x; // column
    this.y = y; // row
    this.id = `space-${x}-${y}`; // a way to identify the space -- a concatenation of the word space and the Space's x and y property values
    this.token = null; // a way to associate the Token object with the space it's dropped into -- this is a way to repe whether or not a given Space is holding a token -- since the board is empty when the game begins each Space will have a null value for the token property -- when a token is dropped into a Space, the value for that Space's token property will be set to the token object the space contains
    this.diameter = 76;
    this.radius = this.diameter/2;
  }

  /**
  * Checks if space has an associated token to find its owner
  * @return  {(null|Object)} Returns null or the owner object of the space's associated token.
  */
  get owner() {
      if(this.token === null) {
        return null;
      } else {
        this.token.owner;
      }
      // checking if a Space object has an occupying Token object: if it does not, return null, else return the owner of the Token object
  }

  drawSVGSpace() {
    const svgSpace = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    svgSpace.setAttributeNS(null, 'id', this.id);
    svgSpace.setAttributeNS(null, 'cx', (this.x * this.diameter) + this.radius);
    svgSpace.setAttributeNS(null, 'cy', (this.y * this.diameter) + this.radius);
    svgSpace.setAttributeNS(null, 'r', this.radius - 8);
    svgSpace.setAttributeNS(null, 'fill', 'black');
    svgSpace.setAttributeNS(null, 'stroke', 'none');

    document.getElementById('mask').appendChild(svgSpace);
  }


  /**
  * Updates space to reflect a token has been dropped into it.
  * @param {Object} token - The dropped token
  */
  // change a given space object's token property so it's set to the token object that was dropped into it
  mark(token) {
    this.token = token;
  }

}
