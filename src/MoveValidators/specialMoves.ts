// import * as helpers from './validatorHelper';
import { BoardType } from '../BoardTypes';
import * as helpers from './validatorHelper';

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
