import * as specials from '../MoveValidators/specialMoves';
/**
 * Event listener function for the 'dragstart' event. This adds the 'dragging'
 * and 'invisible' class to the dragged piece
 */
export const dragStart = (piece) => {
  setTimeout(() => {
    piece.classList.add('dragging', 'invisible');
  }, 0);
};
/**
 * Event listener function for the 'dragend' event. This removes the 'dragging'
 * and 'invisible' class to the dragged piece
 */
export const dragEnd = (piece) => {
  piece.classList.remove('dragging', 'invisible');
};
/**
 * Event listener function for the 'drop' event. This checks if the move is valid
 * with the provided validator class and drops the piece on the square if it is
 * valid.This also takes care of special moves like 'en passant', 'castling' and
 * 'Pawn promotion'
 */
export const dropPiece = (square, boardHtml, validator) => {
  // Get the HTML element being dragged
  const pieceBeingDragged = boardHtml.querySelector('.dragging');
  // Get the info for the piece, its origin and destination square
  const originSquare = pieceBeingDragged.parentElement.id;
  const destSquare = square.id;
  const piece = pieceBeingDragged.id;
  // Validate the move
  const { isValid, isEnPassant, isCastle, isPromotion } = validator.ValidateMove(originSquare, destSquare, piece);
  if (isValid) {
    // Get the square where the opposite Pawn moved 2 squares tp (which can get en passanted)
    // and remove that Pawn
    if (isEnPassant) {
      const enPassantSquare = specials.getEnPassantSquare(destSquare, piece, boardHtml);
      enPassantSquare.innerHTML = '';
      square.appendChild(pieceBeingDragged);
      pieceBeingDragged.classList.remove('dragging');
      return;
    }
    // If the move is a castling move, change the King and the Rook's
    // positions accordingly
    if (isCastle && (piece === 'K' || piece === 'k')) {
      const [KingsOrigin, KingsDest, RooksOrigin, RooksDest] = specials.getCastlingSquares(piece, destSquare, boardHtml);
      KingsOrigin.innerHTML = '';
      KingsDest.appendChild(pieceBeingDragged);
      const Rook = RooksOrigin.firstElementChild;
      RooksOrigin.innerHTML = '';
      RooksDest.appendChild(Rook);
      pieceBeingDragged.classList.remove('dragging');
      return;
    }
    if (isPromotion) {
      // Toggle the IsPromoting state to true
      validator.IsPromoting = true;
      // Delete the pawn from the square it was on before the promotion
      pieceBeingDragged.remove();
      const promotionRank = destSquare[1];
      const promotionRankElement = square.parentElement;
      // For the black Pawn's promotion, the list will be displayed
      // starting from 3 squares above so that list ends on the promotion
      // square. Get the temprary elements and its info if only the
      // promoting pawn is a black Pawn
      let temporaryReplaceSquareRank = '';
      let temporaryReplaceSquare;
      let temporaryReplaceRankElement;
      if (piece === 'p') {
        temporaryReplaceSquareRank = (parseInt(destSquare[1]) + 3).toString();
        temporaryReplaceSquare = boardHtml.querySelector(`#${destSquare[0] + temporaryReplaceSquareRank}`);
        temporaryReplaceRankElement = temporaryReplaceSquare.parentElement;
      }
      // Get the list of the pieces that cane be promoted to and replace it with
      // with the appropriate square
      const list = specials.createPawnPromotionHtmlElement(promotionRank);
      piece === 'P'
        ? promotionRankElement.replaceChild(list, square)
        : temporaryReplaceRankElement.replaceChild(list, temporaryReplaceSquare);
      // This event listner runs when a piece from the list is clicked
      list.addEventListener('click', (e) => {
        // Get the selected piece, remove its promoting class and
        // add the same attributes as a normal piece
        const pieceToPromoteTo = e.target;
        pieceToPromoteTo.classList.remove('promoting-piece');
        pieceToPromoteTo.setAttribute('draggable', 'true');
        // Set the same dragging event listeners to the promoted piece as a normal piece
        pieceToPromoteTo.addEventListener('dragstart', () => {
          dragStart(pieceToPromoteTo);
        });
        pieceToPromoteTo.addEventListener('dragend', () => {
          dragEnd(pieceToPromoteTo);
        });
        // Add the promoted piece to its promoted square and replace the
        // list element with original square element according to color
        square.innerHTML = '';
        square.appendChild(pieceToPromoteTo);
        piece === 'P'
          ? promotionRankElement.replaceChild(square, list)
          : temporaryReplaceRankElement.replaceChild(temporaryReplaceSquare, list);
        // Update the boardMap with the new promoted piece
        validator.PromotePawn(pieceToPromoteTo.id);
        // Toggle the IsPromoting state to false
        validator.IsPromoting = false;
      });
      return;
    }
    square.innerHTML = '';
    square.appendChild(pieceBeingDragged);
    pieceBeingDragged.classList.remove('dragging');
    return;
  }
  if (!(pieceBeingDragged.parentElement.id === square.id)) {
    pieceBeingDragged.classList.remove('dragging');
  }
};
/**
 * Event handler to run when a piece is clicked
 */
export const onPieceClick = (piece, documentHtml, validator) => {
  // If the piece is already highlighted, unhighlight it  
  if (piece.classList.contains('dragging')) {
    piece.classList.remove('dragging');
    return;
  }
  // See if any other piece is highlighted as well, if there is
  // then try to move to that square (will be invalid for same color piece)
  const otherHighlightedPiece = documentHtml.querySelector('.dragging');
  if (otherHighlightedPiece !== null) {
    const parentSquare = otherHighlightedPiece.parentElement;
    dropPiece(parentSquare, documentHtml, validator);
    return;
  }
  // Highlight the piece
  piece.classList.add('dragging');
};
