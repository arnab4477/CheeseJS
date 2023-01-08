import { BoardType } from '../BoardTypes';
/**
 * getPieceImage takes a piece type and color and returns the corresponding symbol for the piece,
 * and function then creates an HTML string to add the pieces to the squares
 */
export declare const getPieceImage: (type: string, color: string, BoardArray: string[][], rank: number, file: number) => string;
/**
 * fenToBoardMap takes one optional input
 * @param fen : an FEN string of a vlid Chess position. If no FEN
 * os provided then uses the FEN for the starting position and
 * @returns an object representation of a Chess board and places pieces
 * according to the FEN
 */
export declare const fenToBoardMap: (fen?: string) => BoardType;
