import { BoardType } from '../BoardTypes';
/**
 * Function to check if a Pawn move is en passant.This does not heck the legality
 * of the move (like if the Pawn can en passant or not)
 */
export declare const isEnPassant: (destFile: string, originRank: string, destRank: string, color: string, boardMap: BoardType) => boolean;
export declare const getEnPassantSquare: (square: string, piece: string, documentHTML: HTMLElement) => Element;
export declare const isCastle: (origin: string, dest: string, color: any, boardMap: BoardType, canWhiteCastleKingSide: boolean, canWhiteCastleQueenSide: boolean, canBlackCastleKingSide: boolean, canBlackCastleQueenSide: boolean) => boolean;
/**
 * Function that returns the origin and desination squares of the King and the Rook castling
 * as Element
 */
export declare const getCastlingSquares: (piece: string, dest: string, documentHTML: HTMLElement) => Array<Element>;
