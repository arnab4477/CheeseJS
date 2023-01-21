import { BoardType } from '../BoardTypes';
/**
 * Function to check if a Pawn move is en passant.This does not heck the legality
 * of the move (like if the Pawn can en passant or not)
 */
export declare const isEnPassant: (destFile: string, originRank: string, destRank: string, color: string, boardMap: BoardType) => boolean;
export declare const getEnPassantSquare: (square: string, piece: string, documentHTML: HTMLElement) => Element;
