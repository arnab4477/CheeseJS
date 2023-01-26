import { r as registerInstance, h } from './index-e0c21bd2.js';
import { g as generateChessBoard } from './chessboard-56c4a00e.js';
import './BoardTypes-d86232b4.js';

const chessBoardCss = "#chess-board-container{position:relative;width:400px;height:400px;border:1px solid black}.row{display:flex;flex-direction:row;width:100%;height:50px}.square{width:50px;height:50px;border:0.1px black}.piece{display:flex;justify-content:center;align-items:center;touch-action:none}.invisible{display:none}@media (max-width: 550px){#chess-board-container{width:360px;height:360px}.row{height:45px}.square{width:45px;height:45px}.piece{height:40px}}";

const ChessBoard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.light = '#E0C35A';
    this.dark = '#7A6A31';
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
      piece.addEventListener('click', () => {
        if (piece.classList.contains('dragging')) {
          piece.classList.remove('dragging');
          return;
        }
        const otherHighlightedPiece = this.chessBoardContainer.querySelector('.dragging');
        if (otherHighlightedPiece !== null) {
          const parentSquare = otherHighlightedPiece.parentElement;
          parentSquare.innerHTML = '';
          parentSquare.appendChild(otherHighlightedPiece);
          otherHighlightedPiece.classList.remove('dragging');
          return;
        }
        piece.classList.add('dragging');
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
      square.addEventListener('click', (e) => {
        e.preventDefault();
        const pieceBeingDragged = this.chessBoardContainer.querySelector('.dragging');
        if (pieceBeingDragged === null)
          return;
        square.innerHTML = '';
        square.appendChild(pieceBeingDragged);
        pieceBeingDragged.classList.remove('dragging');
      });
    });
  }
  render() {
    return (h("div", { ref: (el) => (this.chessBoardContainer = el), id: "chess-board-container" }));
  }
};
ChessBoard.style = chessBoardCss;

export { ChessBoard as chess_board };