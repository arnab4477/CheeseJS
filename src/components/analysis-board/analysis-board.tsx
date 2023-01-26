import { Component, Prop, h, ComponentDidLoad } from '@stencil/core';
import { generateChessBoard } from '../../utils/chessboard';
import Validator from '../../MoveValidators/Validator';
import * as DnD from '../../utils/dragNdrop';

@Component({
  tag: 'analysis-board',
  styleUrl: 'analysis-board.css',
  shadow: true,
})
export class AnalysisBoard implements ComponentDidLoad {
  // Component properties for the square colors
  @Prop({ mutable: true }) light?: string = '#E0C35A';
  @Prop({ mutable: true }) dark?: string = '#7A6A31';

  // A reference to the checkerboard container element
  analysisBoardContainer: HTMLElement;

  // An instance of the Validator class for move validation
  validator = new Validator();

  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner HTML of the checkerboard container to the HTML string for the checkered board
    this.analysisBoardContainer.innerHTML = generateChessBoard(
      this.light,
      this.dark,
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
    );

    // Get all the pieces and squares in the chess board
    const pieces = this.analysisBoardContainer.querySelectorAll('.piece');
    const squares = this.analysisBoardContainer.querySelectorAll('.square');

    // Add drag and drop event listeners to each piece
    pieces.forEach((piece) => {
      piece.addEventListener('dragstart', () => {
        DnD.dragStart(piece);
      });

      piece.addEventListener('dragend', () => {
        DnD.dragEnd(piece);
      });
    });

    // Add drag and drop event listeners to each square
    squares.forEach((square) => {
      // Allow dropping on the square by preventing the default behavior
      square.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      square.addEventListener('drop', (e) => {
        e.preventDefault();
        DnD.dropPiece(square, this.analysisBoardContainer, this.validator);
      });
    });
  }

  render() {
    return (
      <div
        ref={(el) => (this.analysisBoardContainer = el as HTMLElement)}
        id="analysis-board-container"
      ></div>
    );
  }
}
