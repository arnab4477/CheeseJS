import { Component, Prop, h, ComponentDidLoad } from '@stencil/core';
import { generateChessBoard } from '../../utils/chessboard';
import Validator from '../../MoveValidators/Validator';
import * as specials from '../../MoveValidators/specialMoves';

@Component({
  tag: 'analysis-board',
  styleUrl: 'analysis-board.css',
  shadow: true,
})
export class AnalysisBoard implements ComponentDidLoad {
  // Component properties for the square colors
  @Prop({ mutable: true }) light?: string = 'white';
  @Prop({ mutable: true }) dark?: string = 'black';

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

        // Get the HTML element being dragged
        const pieceBeingDragged =
          this.analysisBoardContainer.querySelector('.dragging');

        // Get the info for the piece, its origin and destination square
        const originSquare = pieceBeingDragged.parentElement.id;
        const destSquare = square.id;
        const piece = pieceBeingDragged.id;

        // Validate the move
        const { isValid, isEnPassant } = this.validator.ValidateMove(
          originSquare,
          destSquare,
          piece
        );

        if (isValid) {
          // Get the square where the opposite Pawn moved 2 squares tp (which can get en passanted)
          // and remove that Pawn
          if (isEnPassant) {
            const enPassantSquare = specials.getEnPassantSquare(
              destSquare,
              piece,
              this.analysisBoardContainer
            );

            enPassantSquare.innerHTML = '';
            square.appendChild(pieceBeingDragged);
            return;
          }
          square.innerHTML = '';
          square.appendChild(pieceBeingDragged);
        }
        return;
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
