import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { g as generateChessBoard } from './chessboard.js';

const chessBoardCss = "#chess-board-container{position:relative;width:400px;height:400px;border:1px solid black}.row{display:flex;flex-direction:row;width:100%;height:50px}.square{width:50px;height:50px;border:0.1px black}.piece{display:flex;justify-content:center;align-items:center;touch-action:none}.invisible{display:none}@media (max-width: 550px){#chess-board-container{width:280px;height:280px}.row{height:35px}.square{width:35px;height:35px}}";

const ChessBoard$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  static get style() { return chessBoardCss; }
}, [1, "chess-board", {
    "light": [1025],
    "dark": [1025],
    "fen": [1025]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["chess-board"];
  components.forEach(tagName => { switch (tagName) {
    case "chess-board":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ChessBoard$1);
      }
      break;
  } });
}

const ChessBoard = ChessBoard$1;
const defineCustomElement = defineCustomElement$1;

export { ChessBoard, defineCustomElement };
