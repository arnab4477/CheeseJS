'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9d39a049.js');

const BoardArray = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
];

/*
This function generates a string of html that represents a checkered board with the specified light and dark square colors
*/
const generateCheckeredBoard = (lightSquareColor, darkSquareColor) => {
  // An array of the two colors that will be used to alternate between squares
  const colors = [lightSquareColor, darkSquareColor];
  // The index of the current color in the 'colors' array
  let currentColorIndex = 1;
  // The current color that is being used
  let color;
  // The html string that will be returned
  let html = ``;
  // Loop through each row in the board
  for (let i = 0; i < BoardArray.length; i++) {
    // Set the current color for the row
    color = colors[currentColorIndex];
    // Add the opening tag for the row and set its background color to the current color
    html += `<div class='row' style='background-color: ${color}'>`;
    // Loop through each square in the row
    for (let j = 0; j < BoardArray.length; j++) {
      // Update the current color index to the next color in the 'colors' array
      currentColorIndex = (currentColorIndex + 1) % 2;
      // Set the current color to the updated color index
      color = colors[currentColorIndex];
      // Add a div element for the square and set its background color to the current color
      html += `<div class='square' style='background-color: ${color}'></div>`;
    }
    // Add the closing tag for the row
    html += `</div>`;
    // Update the current color index to the next color in the 'colors' array
    currentColorIndex = (currentColorIndex + 1) % 2;
    // Set the current color to the updated color index
    color = colors[currentColorIndex];
  }
  // Return the html string
  return html;
};

const checkerBoardCss = "#checker-board-container{position:relative;width:400px;height:400px}.row{display:flex;flex-direction:row;width:100%;height:50px}.square{width:50px;height:50px}@media (max-width: 550px){#checker-board-container{width:280px;height:280px}.row{height:35px}.square{width:35px;height:35px}}";

const Checkerboard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // The html string for the checkered board, generated with the goven colors as props
    this.checkerboardHTML = generateCheckeredBoard(this.lightSquare, this.darkSquare);
    this.lightSquare = 'white';
    this.darkSquare = 'black';
  }
  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner html of the checkerboard container to the html string for the checkered board
    this.checkerboardContainer.innerHTML = this.checkerboardHTML;
  }
  render() {
    return (index.h("div", { ref: (el) => (this.checkerboardContainer = el), id: "checker-board-container" }));
  }
};
Checkerboard.style = checkerBoardCss;

exports.checker_board = Checkerboard;
