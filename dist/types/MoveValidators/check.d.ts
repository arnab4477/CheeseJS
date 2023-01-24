import { BoardType } from '../BoardTypes';
/**
 * Function that returns if the King is safe from checks after a move is
 * played, If it returns false, then the move cannot be played as then the
 * King can be captured
 */
export declare const isSafe: (piece: string, origin: string, dest: string, whiteKingsPosition: string, blackKingsPosition: string, boardMap: BoardType) => boolean;
/**
 * Function that checks in a file according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "up" or "down"
 */
export declare const checkVertically: (file: string, rank: string, color: string, direction: string, boardMap: BoardType) => boolean;
/**
 * Function that checks in a rank according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "right" or "left"
 */
export declare const checkHorizontally: (file: string, rank: string, color: string, direction: string, boardMap: BoardType) => boolean;
/**
 * Funtion that checks if the King is in check by an enemy pawn.
 * @param direction must be either "right-up", "left-up", "right-down"
 * or "left-down"
 */
export declare const isCheckFromPawn: (color: string, pawn: string, direction: string) => boolean;
/**
 * Function that checks diagonally according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "right-up", "left-up", "right-down"
 * or "left-down"
 */
export declare const checkDiagonally: (file: string, rank: string, color: string, direction: string, boardMap: BoardType) => boolean;
/**
 * Function that checks if the King is in check in any given square
 */
export declare const isCheck: (square: string, color: string, boardMap: BoardType) => boolean;
