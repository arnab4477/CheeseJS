'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1fbd0a00.js');
const BoardTypes = require('./BoardTypes-d378026b.js');

/**
 * generateCheckeredBoard is a function that takes two required arguments:
 * @param lightSquareColor string representing the color of the light squares on the chess board
 * @param darkSquareColor string representing the color of the dark squares on the chess board
 *
 * and returns an HTML string representing a checkered board with the given colors.
 */
const generateCheckeredBoard = (lightSquareColor, darkSquareColor) => {
  // The current color that is being used
  let color;
  // The html string that will be returned
  let html = ``;
  // Loop through each row in the board
  for (let i = 0; i < BoardTypes.BoardArray.length; i++) {
    // Add the opening tag for the row and set its background color to the current color
    html += `<div class='row'>`;
    // Loop through each square in the row
    for (let j = 0; j < BoardTypes.BoardArray.length; j++) {
      // Determine the background color of the square
      color = (i + j) % 2 === 0 ? lightSquareColor : darkSquareColor;
      // Add a div element for the square and set its background color to the current color
      html += `<div class='square' style='background-color: ${color}'></div>`;
    }
    // Add the closing tag for the row
    html += `</div>`;
  }
  // Return the html string
  return html;
};

const checkerBoardCss = "#checker-board-container{position:relative;width:400px;height:400px}.row{display:flex;flex-direction:row;width:100%;height:50px}.square{width:50px;height:50px}@media (max-width: 550px){#checker-board-container{width:280px;height:280px}.row{height:35px}.square{width:35px;height:35px}}";

const Checkerboard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.light = 'white';
    this.dark = 'black';
  }
  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner html of the checkerboard container to the html string for the checkered board
    this.checkerboardContainer.innerHTML = generateCheckeredBoard(this.light, this.dark);
  }
  render() {
    return (index.h("div", { ref: (el) => (this.checkerboardContainer = el), id: "checker-board-container" }));
  }
};
Checkerboard.style = checkerBoardCss;

exports.checker_board = Checkerboard;
