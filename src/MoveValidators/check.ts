import * as helpers from './validatorHelper';
import { BoardType } from '../BoardTypes';

/**
 * Function that checks in a file according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "up" or "down"
 */
export const checkVertically = (
  file: string,
  rank: string,
  color: string,
  direction: string,
  boardMap: BoardType
): boolean => {
  let isCheck: boolean = false;
  let objectedSquareInfo: { square: string; piece: string; color: string } = {
    square: '',
    piece: '',
    color: '',
  };

  // Check if any piece is on the way

  if (direction === 'up') {
    objectedSquareInfo = helpers.checkThroughFile(rank, '8', file, boardMap);
  } else if (direction === 'down') {
    objectedSquareInfo = helpers.checkThroughFile(rank, '1', file, boardMap);
  }

  // Check if the objected piece is on the adjaent square
  if (helpers.isAdjacent(file + rank, objectedSquareInfo.square)) {
    // Check if any enemy King, Queen or Rook is on the way
    isCheck = helpers.evaluateCheck(
      objectedSquareInfo.piece,
      color,
      objectedSquareInfo.color,
      ['Q', 'R', 'K'],
      ['q', 'r', 'k']
    );
    if (isCheck) {
      return true;
    }
  }

  // Check if any enemy Queen or Rook is on the way across squares
  isCheck = helpers.evaluateCheck(
    objectedSquareInfo.piece,
    color,
    objectedSquareInfo.color,
    ['Q', 'R'],
    ['q', 'r']
  );
  if (isCheck) {
    return true;
  }

  // If none of the checks returned true, then there is no check
  return false;
};

/**
 * Function that checks in a rank according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "right" or "left"
 */
export const checkHorizontally = (
  file: string,
  rank: string,
  color: string,
  direction: string,
  boardMap: BoardType
): boolean => {
  let isCheck: boolean = false;
  let objectedSquareInfo: { square: string; piece: string; color: string } = {
    square: '',
    piece: '',
    color: '',
  };

  // Check if any piece is on the way
  if (direction === 'left') {
    objectedSquareInfo = helpers.checkThroughRank(file, 'a', rank, boardMap);
  } else if (direction === 'right') {
    objectedSquareInfo = helpers.checkThroughRank(file, 'h', rank, boardMap);
  }

  // Check if the objected piece is on the adjaent square
  if (helpers.isAdjacent(file + rank, objectedSquareInfo.square)) {
    // Check if any enemy King, Queen or Rook is on the way
    isCheck = helpers.evaluateCheck(
      objectedSquareInfo.piece,
      color,
      objectedSquareInfo.color,
      ['Q', 'R', 'K'],
      ['q', 'r', 'k']
    );
    if (isCheck) {
      return true;
    }
  }

  // Check if any enemy Queen or Rook is on the way across squares
  isCheck = helpers.evaluateCheck(
    objectedSquareInfo.piece,
    color,
    objectedSquareInfo.color,
    ['Q', 'R'],
    ['q', 'r']
  );
  if (isCheck) {
    return true;
  }

  // If none of the checks returned true, then there is no check
  return false;
};

/**
 * Funtion that checks if the King is in check by an enemy pawn.
 * @param direction must be either "right-up", "left-up", "right-down"
 * or "left-down"
 */
export const isCheckFromPawn = (
  color: string,
  pawn: string,
  direction: string
) => {
  // If a black pawn is digonally above the white King, it is a check
  if (
    color === 'w' &&
    pawn === 'p' &&
    (direction === 'right-up' || direction === 'left-up')
  ) {
    return true;
  }
  // If a white pawn is digonally below the black King, it is a check
  else if (
    color === 'b' &&
    pawn === 'P' &&
    (direction === 'right-down' || direction === 'left-down')
  ) {
    return true;
  }

  // If none of the checks returned true, then there is no check
  return false;
};

/**
 * Function that checks diagonally according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "right-up", "left-up", "right-down"
 * or "left-down"
 */
export const checkDiagonally = (
  file: string,
  rank: string,
  color: string,
  direction: string,
  boardMap: BoardType
): boolean => {
  // Get the diagonal edge for a given direction
  let [diagonalEdgeFile, diagonalEdgeRank] = helpers.getDiagonalEdge(
    file + rank,
    direction
  );
  let isCheck: boolean = false;
  let objectedSquareInfo: { square: string; piece: string; color: string } = {
    square: '',
    piece: '',
    color: '',
  };

  // Check if the objected piece is on the adjaent square
  objectedSquareInfo = helpers.checkThroughDiagonals(
    file,
    diagonalEdgeFile,
    rank,
    diagonalEdgeRank,
    boardMap
  );

  // Check if the objected piece is on the adjaent square
  if (helpers.isAdjacent(file + rank, objectedSquareInfo.square)) {
    // Check if there is any check from a Pawn
    if (isCheckFromPawn(color, objectedSquareInfo.piece, direction)) {
      return true;
    }

    // Check if any enemy King, Queen or Bishop is on the way
    isCheck = helpers.evaluateCheck(
      objectedSquareInfo.piece,
      color,
      objectedSquareInfo.color,
      ['Q', 'B', 'K'],
      ['q', 'b', 'k']
    );
    if (isCheck) {
      return true;
    }
  }

  // Check if any enemy Queen or Bishop is on the way across squares
  isCheck = helpers.evaluateCheck(
    objectedSquareInfo.piece,
    color,
    objectedSquareInfo.color,
    ['Q', 'B'],
    ['q', 'b']
  );
  if (isCheck) {
    return true;
  }

  // If none of the checks returned true, then there is no check
  return false;
};

/**
 * Function that checks if the King is in check in any given square
 */
export const isCheck = (
  square: string,
  color: string,
  boardMap: BoardType
): boolean => {
  // Get the file and rank of the square
  const [file, rank] = helpers.getFileAndRank(square);

  // Check vertically for an enemy King, Rook or Queen
  if (checkVertically(file, rank, color, 'up', boardMap)) return true;
  if (checkVertically(file, rank, color, 'down', boardMap)) return true;

  // Check horizontally for an enemy King, Rook or Queen
  if (checkHorizontally(file, rank, color, 'right', boardMap)) return true;
  if (checkHorizontally(file, rank, color, 'left', boardMap)) return true;

  // Check diagonally for an enemy Pawm, King, Bishop or Queen
  if (checkDiagonally(file, rank, color, 'right-up', boardMap)) return true;
  if (checkDiagonally(file, rank, color, 'right-down', boardMap)) return true;
  if (checkDiagonally(file, rank, color, 'left-up', boardMap)) return true;
  if (checkDiagonally(file, rank, color, 'left-down', boardMap)) return true;

  // If none of the checks returned true, that means the King is not in check
  return false;
};
