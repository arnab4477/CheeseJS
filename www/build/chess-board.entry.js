import { r as registerInstance, h } from './index-96fdd9b9.js';
import { B as BoardArray } from './BoardArray-e64c4a8b.js';

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
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="wp" alt='white pawn' class="piece" draggable="true" src=${'../assets/WP.svg.png'} alt="abc"></div>`;
    case PieceType.blackPawn:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="bp" alt='black pawn' class="piece" draggable="true" src=${'../assets/bp.svg.png'} alt="abc"></div>`;
    case PieceType.whiteRook:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="wr" alt='white rook' class="piece" draggable="true" src=${'../assets/WR.svg.png'} alt="abc"></div>`;
    case PieceType.blackRook:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="br" alt='black rook' class="piece" draggable="true" src=${'../assets/br.svg.png'} alt="abc"></div>`;
    case PieceType.whiteKnight:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="wn" alt='white knight' class="piece" draggable="true" src=${'../assets/WN.svg.png'} alt="abc"></div>`;
    case PieceType.blackKnight:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="bn" alt='black knight' class="piece" draggable="true" src=${'../assets/bn.svg.png'} alt="abc"></div>`;
    case PieceType.whiteBishop:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="wb" alt='white bishop' class="piece" draggable="true" src=${'../assets/WB.svg.png'} alt="abc"></div>`;
    case PieceType.blackBishop:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="bb" alt='black bishop' class="piece" draggable="true" src=${'../assets/bb.svg.png'} alt="abc"></div>`;
    case PieceType.whiteQueen:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="wq" alt='white queen' class="piece" draggable="true" src=${'../assets/WQ.svg.png'} alt="abc"></div>`;
    case PieceType.blackQueen:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="bq" alt='black queen' class="piece" draggable="true" src=${'../assets/bq.svg.png'} alt="abc"></div>`;
    case PieceType.whiteKing:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="wk" alt='white king' class="piece" draggable="true" src=${'../assets/WK.svg.png'} alt="abc"></div>`;
    case PieceType.blackKing:
      return `<div id="${BoardArray[rank][file]}" class="square" style="background-color: ${color}"><img id="bk" alt='black king' class="piece" draggable="true" src=${'../assets/bk.svg.png'} alt="abc"></div>`;
    default:
      return '';
  }
};

// to learn about FEN stings, visit: https://www.chess.com/terms/fen-chess
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

const chessBoardCss = "#chess-board-container{position:relative;width:400px;height:400px;border:1px solid black}.row{display:flex;flex-direction:row;width:100%;height:50px}.square{width:50px;height:50px;border:0.1px black}.piece{display:flex;justify-content:center;align-items:center;touch-action:none}.invisible{display:none}@media (max-width: 550px){#analysis-board-container{width:280px;height:280px}.row{height:35px}.square{width:35px;height:35px}}";

const ChessBoard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.light = 'white';
    this.dark = 'black';
    this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  }
  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner HTML of the checkerboard container to the HTML string for the checkered board
    this.chessBoardContainer.innerHTML = generateChessBoard(this.light, this.dark, this.fen);
    // Get all the pieces and squares in the chess board
    const pieces = this.chessBoardContainer.querySelectorAll('.piece');
    const squares = this.chessBoardContainer.querySelectorAll('.square');
    // Add drag and drop event listeners to each piece
    pieces.forEach((piece) => {
      // When a piece is dragged, add the 'dragging' and 'invisible' classes to it
      piece.addEventListener('dragstart', () => {
        setTimeout(() => {
          piece.classList.add('dragging', 'invisible');
        }, 0);
      });
      // When a piece is dropped, remove the 'dragging' and 'invisible' classes from it
      piece.addEventListener('dragend', () => {
        piece.classList.remove('dragging', 'invisible');
      });
    });
    // Add drag and drop event listeners to each square
    squares.forEach((square) => {
      // Allow dropping on the square by preventing the default behavior
      square.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      // When a piece is dropped on a square, append the piece to the square and clear the square's inner HTML
      square.addEventListener('drop', (e) => {
        e.preventDefault();
        const pieceBeingDragged = this.chessBoardContainer.querySelector('.dragging');
        square.innerHTML = '';
        square.appendChild(pieceBeingDragged);
      });
    });
  }
  render() {
    return (h("div", { ref: (el) => (this.chessBoardContainer = el), id: "chess-board-container" }));
  }
};
ChessBoard.style = chessBoardCss;

export { ChessBoard as chess_board };
