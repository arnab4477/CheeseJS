import { h } from '@stencil/core';
import { generateChessBoard } from '../../utils/chessboard';
import Validator from '../../MoveValidators/Validator';
import * as events from '../../utils/eventHandlers';
export class AnalysisBoard {
  constructor() {
    // An instance of the Validator class for move validation
    this.validator = new Validator();
    this.light = '#E0C35A';
    this.dark = '#7A6A31';
  }
  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner HTML of the checkerboard container to the HTML string for the checkered board
    this.analysisBoardContainer.innerHTML = generateChessBoard(this.light, this.dark, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    // Get all the pieces and squares in the chess board
    const pieces = this.analysisBoardContainer.querySelectorAll('.piece');
    const squares = this.analysisBoardContainer.querySelectorAll('.square');
    // Add drag, drop and click event listeners to each piece
    pieces.forEach((piece) => {
      piece.addEventListener('dragstart', () => {
        events.dragStart(piece);
      });
      piece.addEventListener('dragend', () => {
        events.dragEnd(piece);
      });
      piece.addEventListener('click', () => {
        events.onPieceClick(piece, this.analysisBoardContainer, this.validator);
      });
    });
    // Add drag, drop and click event listeners to each square
    squares.forEach((square) => {
      // Allow dropping on the square by preventing the default behavior
      square.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      square.addEventListener('drop', (e) => {
        e.preventDefault();
        events.dropPiece(square, this.analysisBoardContainer, this.validator);
      });
      square.addEventListener('click', () => {
        const movingPiece = this.analysisBoardContainer.querySelector('.dragging');
        if (movingPiece === null)
          return;
        events.dropPiece(square, this.analysisBoardContainer, this.validator);
      });
    });
  }
  render() {
    return (h("div", { ref: (el) => (this.analysisBoardContainer = el), id: "analysis-board-container" }));
  }
  static get is() { return "analysis-board"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["analysis-board.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["analysis-board.css"]
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
      }
    };
  }
}
