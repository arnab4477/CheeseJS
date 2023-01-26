import { a as BoardMap, B as BoardArray } from './BoardTypes.js';

/**
 * This enum matches with the piece representations of an FEN string.
 * Capital letter for white pieces and small letter for black pieces
 */
var PieceType;
(function (PieceType) {
  PieceType["whitePawn"] = "P";
  PieceType["blackPawn"] = "p";
  PieceType["whiteRook"] = "R";
  PieceType["blackRook"] = "r";
  PieceType["whiteKnight"] = "N";
  PieceType["blackKnight"] = "n";
  PieceType["whiteBishop"] = "B";
  PieceType["blackBishop"] = "b";
  PieceType["whiteQueen"] = "Q";
  PieceType["blackQueen"] = "q";
  PieceType["whiteKing"] = "K";
  PieceType["blackKing"] = "k";
})(PieceType || (PieceType = {}));

/**
 * getPieceImage takes a piece type and color and returns the corresponding symbol for the piece,
 * and function then creates an HTML string to add the pieces to the squares
 */
const getPieceImage = (type, color, BoardArray, rank, file) => {
  switch (type) {
    case PieceType.whitePawn:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="P" alt='white pawn' class="piece" draggable="true" src=${'../assets/WP.svg.png'}></div>`;
    case PieceType.blackPawn:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="p" alt='black pawn' class="piece" draggable="true" src=${'../assets/bp.svg.png'}></div>`;
    case PieceType.whiteRook:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="R" alt='white rook' class="piece" draggable="true" src=${'../assets/WR.svg.png'}></div>`;
    case PieceType.blackRook:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="r" alt='black rook' class="piece" draggable="true" src=${'../assets/br.svg.png'}></div>`;
    case PieceType.whiteKnight:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="N" alt='white knight' class="piece" draggable="true" src=${'../assets/WN.svg.png'}></div>`;
    case PieceType.blackKnight:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="n" alt='black knight' class="piece" draggable="true" src=${'../assets/bn.svg.png'}></div>`;
    case PieceType.whiteBishop:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="B" alt='white bishop' class="piece" draggable="true" src=${'../assets/WB.svg.png'}></div>`;
    case PieceType.blackBishop:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="b" alt='black bishop' class="piece" draggable="true" src=${'../assets/bb.svg.png'}></div>`;
    case PieceType.whiteQueen:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="Q" alt='white queen' class="piece" draggable="true" src=${'../assets/WQ.svg.png'}></div>`;
    case PieceType.blackQueen:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="q" alt='black queen' class="piece" draggable="true" src=${'../assets/bq.svg.png'}></div>`;
    case PieceType.whiteKing:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="K" alt='white king' class="piece" draggable="true" src=${'../assets/WK.svg.png'}></div>`;
    case PieceType.blackKing:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="k" alt='black king' class="piece" draggable="true" src=${'../assets/bk.svg.png'}></div>`;
    default:
      return '';
  }
};
/**
 * fenToBoardMap takes one optional input
 * @param fen : an FEN string of a vlid Chess position. If no FEN
 * os provided then uses the FEN for the starting position and
 * @returns an object representation of a Chess board and places pieces
 * according to the FEN
 */
const fenToBoardMap = (fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR') => {
  const rows = fen.split('/');
  // create a copy of the BoardMap
  const board = Object.assign({}, BoardMap);
  let piece = '';
  // Iterate over the ranks and files of the Chess board array
  for (let rank = 0; rank < BoardArray.length; rank++) {
    for (let file = 0; file < BoardArray.length; file++) {
      piece = rows[rank][file];
      // Each square is a 2 character string, like 'a1'
      // The following code will extract the file and rank out of each square
      let currentSquare = BoardArray[rank][file];
      let currentFile = currentSquare[0];
      let currentRank = currentSquare[1];
      // if the piece is a character, it is a piece
      if (typeof piece === 'string' && piece.match(/[a-zA-Z]/)) {
        board[currentFile][currentRank] = piece;
      }
      else if (typeof parseInt(piece) === 'number') {
        // If the piece is a number then it is the number of empty squares
        // Sp ;oop through the array and increment the file to leave out the empty squares
        for (let empties = 0; empties < parseInt(piece); empties++) {
          file++;
        }
      }
    }
  }
  return board;
};

// To learn about FEN stings, visit: https://www.chess.com/terms/fen-chess
/**
 * generateChessBoard is a function that takes three optional arguments:
 * @param lightSquareColor string representing the color of the light squares on the chess board
 * @param darkSquareColor string representing the color of the dark squares on the chess board
 * @param fen string representing the FEN notation of the current state of the chess board
 * and returns an HTML string representing the chess board with the given colors and piece positions
 */
const generateChessBoard = (lightSquareColor, darkSquareColor, fen) => {
  // split the FEN notation into rows
  const rows = fen.split('/');
  // array to store the colors of the squares on the chess board
  const colorArray = [lightSquareColor, darkSquareColor];
  // index to keep track of the current color of the square
  let currentColorIndex = 0;
  // color of the current square
  let color = ``;
  // HTML string to store the HTML representation of the chess board
  let html = ``;
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
      }
      else if (typeof parseInt(square) === 'number') {
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

export { fenToBoardMap as f, generateChessBoard as g };
