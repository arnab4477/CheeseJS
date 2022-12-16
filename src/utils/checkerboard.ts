import BoardArray from '../BoardArray';

/*  
This function generates a string of html that represents a checkered board with the specified light and dark square colors
*/
export const generateCheckeredBoard = (
  lightSquareColor: string,
  darkSquareColor: string
): string => {
  // An array of the two colors that will be used to alternate between squares
  const colors: string[] = [lightSquareColor, darkSquareColor];

  // The index of the current color in the 'colors' array
  let currentColorIndex: number = 1;

  // The current color that is being used
  let color: string;

  // The html string that will be returned
  let html: string = ``;

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
