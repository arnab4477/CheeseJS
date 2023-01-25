import { Component, Prop, h, ComponentDidLoad } from '@stencil/core';
import { generateChessBoard } from '../../utils/chessboard';

@Component({
  tag: 'chess-board',
  styleUrl: 'chess-board.css',
  shadow: true,
})
export class ChessBoard implements ComponentDidLoad {
  // Component properties for the square colors and the FEN string
  @Prop({ mutable: true }) light?: string = 'white';
  @Prop({ mutable: true }) dark?: string = 'black';
  @Prop({ mutable: true }) fen?: string =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

  // A reference to the checkerboard container element
  chessBoardContainer: HTMLElement;

  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner HTML of the checkerboard container to the HTML string for the checkered board
    this.chessBoardContainer.innerHTML = generateChessBoard(
      this.light,
      this.dark,
      this.fen
    );

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
        const pieceBeingDragged =
          this.chessBoardContainer.querySelector('.dragging');
        square.innerHTML = '';
        square.appendChild(pieceBeingDragged);
      });
    });
  }

  render() {
    return (
      <div
        ref={(el) => (this.chessBoardContainer = el as HTMLElement)}
        id="chess-board-container"
      ></div>
    );
  }
}
