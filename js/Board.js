class Board {
  constructor() {
    // here no arguments are passed to the constructor method because each game will have one Board object and you're statically setting the number of rows and columns
    this.rows = 6; // number of rows on board
    this.columns = 7; // number of columns on the board
    this.spaces = this.createSpaces(); // array of spaces -- this will be set to the return value form the method bellow called createSpaces
  }

// Documentation for the method
/**
* Generates 2D array of spaces.
* @return  {Array}     An array of space objects
*/

  createSpaces() {
    const spaces = []; // the returned array will be 2D array -- this means that it is an array whose elements are also arrays -- this variable will hold an array of columns, where each column is an array of individual space objects -- by setting it up like this it's eacy to access each column of spaces as a whole

    // a for loop that iterates through the number of columns
    for(let x = 0; x < this.columns; x++) {
      const column = []; // this will hold an array of the individual space objects in that column

      // this is where the new space objects are created
      for (let y = 0; y < this.rows; y++) {
        const space = new Space(x, y); // pass to the Space constructor method the value for the x and y index of the for loops
        column.push(space); // push the newly created space to the column array
      // on each iteration through this nested for loop another space is added to the column

      }

      spaces.push(column); // after the column is complete and the nested for loop is finished push the entire column back into spaces array -- then the x index is increased by 1 and the process continues until the entire board of spaces has been created

    }

    return spaces; // return the array fully created goes into this.spaces
  }

  // drawing out the associated SVG spaces for all game spaces
  // calling the drawSVGSpace method on each space object
  drawHTMLBoard() {
    // think of the 'for of' loop as 'for each element of an array'
    for (let column of this.spaces) {
      for (let space of column) {
        space.drawSVGSpace();
      }
    } // imagine conect four board -- each element of the array is a column on the board(vertically all the circles in first column) holding an array of space objects; the outter 'for of' loop iterates over each column; the inner 'for of' loop iterates over each space object inside the column(every circle); inside the inner loop you have access to the space object and can call the method on it


  }

}
