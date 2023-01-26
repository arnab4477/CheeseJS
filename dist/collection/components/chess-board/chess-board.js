import { h } from '@stencil/core';
import { generateChessBoard } from '../../utils/chessboard';
export class ChessBoard {
  constructor() {
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
  static get is() { return "chess-board"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["chess-board.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["chess-board.css"]
    };
  }
  static get properties() {
    return {
      "light": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "light",
        "reflect": false,
        "defaultValue": "'#E0C35A'"
      },
      "dark": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "dark",
        "reflect": false,
        "defaultValue": "'#7A6A31'"
      },
      "fen": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "fen",
        "reflect": false,
        "defaultValue": "'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'"
      }
    };
  }
}
