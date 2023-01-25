import { BoardArray } from '../BoardTypes';

/**
 * generateCheckeredBoard is a function that takes two required arguments:
 * @param lightSquareColor string representing the color of the light squares on the chess board
 * @param darkSquareColor string representing the color of the dark squares on the chess board
 *
 * and returns an HTML string representing a checkered board with the given colors.
 */

export const generateCheckeredBoard = (
  lightSquareColor: string,
  darkSquareColor: string
): string => {
  // The current color that is being used
  let color: string;

  // The html string that will be returned
  let html: string = ``;

  // Loop through each row in the board
  for (let i = 0; i < BoardArray.length; i++) {
    // Add the opening tag for the row and set its background color to the current color
    html += `<div class='row'>`;

    // Loop through each square in the row
    for (let j = 0; j < BoardArray.length; j++) {
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
