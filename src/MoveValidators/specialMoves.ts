// import * as helpers from './validatorHelper';
import { BoardType } from '../BoardTypes';
import * as helpers from './validatorHelper';
import * as check from './check';
import { pieceImages as i } from '../pieces/pieceImages';

/**
 * Function to check if a Pawn move is en passant.This does not heck the legality
 * of the move (like if the Pawn can en passant or not)
 */
export const isEnPassant = (
  destFile: string,
  originRank: string,
  destRank: string,
  color: string,
  boardMap: BoardType
): boolean => {
  if (color === 'w') {
    // White Pawns can only en passant from the 5th rank to the 6th rank
    if (originRank !== '5' || destRank !== '6') {
      return false;
    }

    // There must a black Pawn adjacent to the white Pawns origin square
    if (boardMap[destFile][originRank] !== 'p') {
      return false;
    }
    return true;
  } else if (color === 'b') {
    // Black Pawns can only en passant from the 4th rank to the 3rd rank
    if (originRank !== '4' || destRank !== '3') {
      return false;
    }

    // There must a white Pawn adjacent to the black Pawns origin square
    if (boardMap[destFile][originRank] !== 'P') {
      return false;
    }
    return true;
  }
};

export const getEnPassantSquare = (
  square: string,
  piece: string,
  documentHTML: HTMLElement
): Element => {
  if (helpers.getPieceColor(piece) === 'w') {
    const enPassantedSquareId =
      square[0] + (parseInt(square[1]) - 1).toString();
    const enPassantedSquare = documentHTML.querySelector(
      `#${enPassantedSquareId}`
    );

    return enPassantedSquare;
  } else if (helpers.getPieceColor(piece) === 'b') {
    const enPassantedSquareId =
      square[0] + (parseInt(square[1]) + 1).toString();
    const enPassantedSquare = documentHTML.querySelector(
      `#${enPassantedSquareId}`
    );

    return enPassantedSquare;
  }
};

export const isCastle = (
  origin: string,
  dest: string,
  color,
  boardMap: BoardType,
  canWhiteCastleKingSide: boolean,
  canWhiteCastleQueenSide: boolean,
  canBlackCastleKingSide: boolean,
  canBlackCastleQueenSide: boolean
): boolean => {
  if (color === 'w') {
    if (
      origin !== 'e1' ||
      !(dest === 'g1' || dest === 'h1' || dest === 'c1' || dest === 'a1') ||
      !(boardMap['h']['1'] === 'R' || boardMap['a']['1'] === 'R')
    ) {
      return false;
    }
    // Validate Kingside castle
    if (dest === 'g1' || dest === 'h1') {
      if (!canWhiteCastleKingSide) {
        return false;
      }

      // The castlingsquares must be empty
      if (boardMap['f']['1'] !== '' || boardMap['g']['1'] !== '') {
        return false;
      }

      // <ale sure that the castling squares are not checked by amy piece
      const isF1Checked = check.isCheck('f1', 'w', boardMap);
      const isG1Checked = check.isCheck('g1', 'w', boardMap);

      if (isF1Checked || isG1Checked) {
        return false;
      }
      return true;
    }
    // Validate Queenside castle
    if (dest === 'c1' || dest === 'a1') {
      if (!canWhiteCastleQueenSide) {
        return false;
      }

      // The castlingsquares must be empty
      if (boardMap['d']['1'] !== '' || boardMap['c']['1'] !== '') {
        return false;
      }

      // <ale sure that the castling squares are not checked by amy piece
      const isD1Checked = check.isCheck('d1', 'w', boardMap);
      const isC1Checked = check.isCheck('c1', 'w', boardMap);

      if (isD1Checked || isC1Checked) {
        return false;
      }
      return true;
    }
  } else if (color === 'b') {
    if (
      origin !== 'e8' ||
      !(dest === 'g8' || dest === 'h8' || dest === 'c8' || dest === 'a8') ||
      !(boardMap['h']['8'] === 'r' || boardMap['a']['8'] === 'r')
    ) {
      return false;
    }
    // Validate Kingside castle
    if (dest === 'g8' || dest === 'h8') {
      if (!canBlackCastleKingSide) {
        return false;
      }

      // The castlingsquares must be empty
      if (boardMap['f']['8'] !== '' || boardMap['g']['8'] !== '') {
        return false;
      }

      // <ale sure that the castling squares are not checked by amy piece
      const isF8Checked = check.isCheck('f8', 'b', boardMap);
      const isG8Checked = check.isCheck('g8', 'b', boardMap);

      if (isF8Checked || isG8Checked) {
        return false;
      }
      return true;
    }
    // Validate Queenside castle
    if (dest === 'c8' || dest === 'a8') {
      if (!canBlackCastleQueenSide) {
        return false;
      }

      // The castlingsquares must be empty
      if (boardMap['d']['8'] !== '' || boardMap['c']['8'] !== '') {
        return false;
      }

      // <ale sure that the castling squares are not checked by amy piece
      const isD8Checked = check.isCheck('d8', 'b', boardMap);
      const isC8Checked = check.isCheck('c8', 'b', boardMap);

      if (isD8Checked || isC8Checked) {
        return false;
      }
      return true;
    }
  }
};

/**
 * Function that returns the origin and desination squares of the King and the Rook castling
 * as Element
 */
export const getCastlingSquares = (
  piece: string,
  dest: string,
  documentHTML: HTMLElement
): Array<Element> => {
  let KingsOrigin: Element;
  let KingsDest: Element;
  let RooksOrigin: Element;
  let RooksDest: Element;

  if (piece === 'K') {
    KingsOrigin = documentHTML.querySelector('#e1');
    if (dest === 'g1' || dest === 'h1') {
      // if the white King is castling Kingside, its destination square should be g1
      // and the Rook should go to f1
      KingsDest = documentHTML.querySelector('#g1');
      RooksOrigin = documentHTML.querySelector('#h1');
      RooksDest = documentHTML.querySelector('#f1');
    } else if (dest === 'c1' || dest === 'a1') {
      // if the white King is castling Queenside, its destination square should be c1
      // and the Rook should go to d1
      KingsDest = documentHTML.querySelector('#c1');
      RooksOrigin = documentHTML.querySelector('#a1');
      RooksDest = documentHTML.querySelector('#d1');
    }
  } else if (piece === 'k') {
    KingsOrigin = documentHTML.querySelector('#e8');
    if (dest === 'g8' || dest === 'h8') {
      // if the black King is castling Kingside, its destination square should be g8
      // and the Rook should go to f8
      KingsDest = documentHTML.querySelector('#g8');
      RooksOrigin = documentHTML.querySelector('#h8');
      RooksDest = documentHTML.querySelector('#f8');
    } else if (dest === 'c8' || dest === 'a8') {
      // if the black King is castling Queenside, its destination square should be c8
      // and the Rook should go to d8
      KingsDest = documentHTML.querySelector('#c8');
      RooksOrigin = documentHTML.querySelector('#a8');
      RooksDest = documentHTML.querySelector('#d8');
    }
  }

  return [KingsOrigin, KingsDest, RooksOrigin, RooksDest];
};

/**
 * Function that returns if Pawn move is a Pawn promotion
 */
export const isPromotion = (color: string, destRank: string): boolean => {
  // Pawns can only promote on the 8th and the 1st square (for white and black
  // respectively)
  if (!(destRank === '8' || destRank === '1')) return false;
  if (color === 'w' && destRank === '8') return true;
  if (color === 'b' && destRank === '1') return true;

  return false;
};

/**
 * Function that returns an HTML element for the list for the pieces a Pawn can promote to
 * according to its color
 */
export const createPawnPromotionHtmlElement = (rank: string): Element => {
  // Create HTML string for both the colors
  const whitePromotionHtml = `<div class='promotion-list'>
       <img id="Q" alt='white queen' class="piece promoting-piece" src=${i.Q}>
       <img id="R" alt='white rook' class="piece promoting-piece" src=${i.R}>
       <img id="B" alt='white bishop' class="piece promoting-piece" src=${i.B}>
       <img id="N" alt='white knight' class="piece promoting-piece" src=${i.N}>
     </div>`;

  const blackPromotionHtml = `<div class='promotion-list'>
      <img id="n" alt='black knight' class="piece promoting-piece" src=${i.n}>
      <img id="b" alt='black bishop' class="piece promoting-piece" src=${i.b}>
      <img id="r" alt='black rook' class="piece promoting-piece" src=${i.r}>
      <img id="q" alt='black queen' class="piece promoting-piece" src=${i.q}>
     </div>`;

  // Add the HTML strings above to a Wrapper element
  // and extract it to return it as an individual element
  const Wrapper = document.createElement('div');

  if (rank === '8') {
    Wrapper.innerHTML = whitePromotionHtml;
    return Wrapper.firstElementChild;
  }
  if (rank === '1') {
    Wrapper.innerHTML = blackPromotionHtml;
    return Wrapper.firstElementChild;
  }
};
