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
        const { isValid, isEnPassant, isCastle, isPromotion } =
          this.validator.ValidateMove(originSquare, destSquare, piece);

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

          // If the move is a castling move, change the King and the Rook's
          // positions accordingly
          if (isCastle && (piece === 'K' || piece === 'k')) {
            const [KingsOrigin, KingsDest, RooksOrigin, RooksDest] =
              specials.getCastlingSquares(
                piece,
                destSquare,
                this.analysisBoardContainer
              );

            KingsOrigin.innerHTML = '';
            KingsDest.appendChild(pieceBeingDragged);

            const Rook = RooksOrigin.firstElementChild;
            RooksOrigin.innerHTML = '';
            RooksDest.appendChild(Rook);
            return;
          }

          if (isPromotion) {
            // Toggle the IsPromoting state to true
            this.validator.IsPromoting = true;

            // Delete the pawn from the square it was on before the promotion
            pieceBeingDragged.remove();

            const promotionRank = destSquare[1];
            const promotionRankElement = square.parentElement;

            // For the black Pawn's promotion, the list will be displayed
            // starting from 3 squares above so that list ends on the promotion
            // square. Get the temprary elements and its info if only the
            // promoting pawn is a black Pawn
            let temporaryReplaceSquareRank: string = '';
            let temporaryReplaceSquare: Element;
            let temporaryReplaceRankElement: Element;
            if (piece === 'p') {
              temporaryReplaceSquareRank = (
                parseInt(destSquare[1]) + 3
              ).toString();
              temporaryReplaceSquare =
                this.analysisBoardContainer.querySelector(
                  `#${destSquare[0] + temporaryReplaceSquareRank}`
                );
              temporaryReplaceRankElement =
                temporaryReplaceSquare.parentElement;
            }

            // Get the list of the pieces that cane be promoted to and replace it with
            // with the appropriate square
            const list = specials.createPawnPromotionHtmlElement(promotionRank);
            piece === 'P'
              ? promotionRankElement.replaceChild(list, square)
              : temporaryReplaceRankElement.replaceChild(
                  list,
                  temporaryReplaceSquare
                );

            // This event listner runs when a piece from the list is clicked
            list.addEventListener('click', (e: Event) => {
              // Get the selected piece, remove its promoting class and
              // add the same attributes as a normal piece
              const pieceToPromoteTo = e.target as Element;
              pieceToPromoteTo.classList.remove('promoting-piece');
              pieceToPromoteTo.setAttribute('draggable', 'true');

              // Set the same dragging event listeners to the promoted piece as a normal piece
              pieceToPromoteTo.addEventListener('dragstart', () => {
                setTimeout(() => {
                  pieceToPromoteTo.classList.add('dragging', 'invisible');
                }, 0);
              });

              pieceToPromoteTo.addEventListener('dragend', () => {
                pieceToPromoteTo.classList.remove('dragging', 'invisible');
              });

              // Add the promoted piece to its promoted square and replace the
              // list element with original square element according to color
              square.innerHTML = '';
              square.appendChild(pieceToPromoteTo);
              piece === 'P'
                ? promotionRankElement.replaceChild(square, list)
                : temporaryReplaceRankElement.replaceChild(
                    temporaryReplaceSquare,
                    list
                  );

              // Update the boardMap with the new promoted piece
              this.validator.PromotePawn(pieceToPromoteTo.id);

              // Toggle the IsPromoting state to false
              this.validator.IsPromoting = false;
            });

            return;
          }

          square.innerHTML = '';
          square.appendChild(pieceBeingDragged);
        }
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
