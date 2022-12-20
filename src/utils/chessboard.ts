import BoardArray from '../BoardArray';
import { getPieceImage } from '../pieces/pieceUtils';

// to learn about FEN stings, visit: https://www.chess.com/terms/fen-chess

/**
 * generateChessBoard is a function that takes three optional arguments:
 * @param lightSquareColor string representing the color of the light squares on the chess board
 * @param darkSquareColor string representing the color of the dark squares on the chess board
 * @param fen string representing the FEN notation of the current state of the chess board
 * and returns an HTML string representing the chess board with the given colors and piece positions
 */
export const generateChessBoard = (
  lightSquareColor: string,
  darkSquareColor: string,
  fen: string
): string => {
  // split the FEN notation into rows
  const rows = fen.split('/');

  // array to store the colors of the squares on the chess board
  const colorArray: string[] = [lightSquareColor, darkSquareColor];
  // index to keep track of the current color of the square
  let currentColorIndex: number = 0;
  // color of the current square
  let color: string = ``;
  // HTML string to store the HTML representation of the chess board
  let html: string = ``;

  // iterate through each row of the chess board
  for (let rank = 0; rank < BoardArray.length; rank++) {
    // add opening div tag for the row to the HTML string
    html += `<div class="row">`;

    // iterate through each square in the row
    for (let file = 0; file < BoardArray.length; file++) {
      // get the FEN notation for the current square
      let square = rows[rank][file];
      // set the color of the square to the current color
      color = colorArray[currentColorIndex];

      // if the square is a character, it is a piece
      if (typeof square === 'string' && square.match(/[a-zA-Z]/)) {
        // add the HTML returned from the getPieeImage
        html += getPieceImage(square, color, BoardArray, rank, file);

        // toggle the current color index to switch the color of the next square
        currentColorIndex = (currentColorIndex + 1) % 2;
      } else if (typeof parseInt(square) === 'number') {
        // if the square is a number, it represents empty squares
        // if the number is >1, then it means there are that many empty squares
        // add the number of empty squares to the HTML string
        for (let k = 0; k < parseInt(square); k++) {
          html += `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"></div>`;

          currentColorIndex = (currentColorIndex + 1) % 2;
          color = colorArray[currentColorIndex];
          file++;
        }
      }
    }

    // toggle the current color index to switch the color of the first square in the next row
    currentColorIndex = (currentColorIndex + 1) % 2;

    // add the closing div tag for the rows
    html += `</div>`;
  }

  return html;
};
