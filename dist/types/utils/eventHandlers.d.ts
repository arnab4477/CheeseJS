import Validator from '../MoveValidators/Validator';
/**
 * Event listener function for the 'dragstart' event. This adds the 'dragging'
 * and 'invisible' class to the dragged piece
 */
export declare const dragStart: (piece: Element) => void;
/**
 * Event listener function for the 'dragend' event. This removes the 'dragging'
 * and 'invisible' class to the dragged piece
 */
export declare const dragEnd: (piece: Element) => void;
/**
 * Event listener function for the 'drop' event. This checks if the move is valid
 * with the provided validator class and drops the piece on the square if it is
 * valid.This also takes care of special moves like 'en passant', 'castling' and
 * 'Pawn promotion'
 */
export declare const dropPiece: (square: Element, boardHtml: HTMLElement, validator: Validator) => void;
/**
 * Event handler to run when a piece is clicked
 */
export declare const onPieceClick: (piece: Element, documentHtml: HTMLElement, validator: Validator) => void;
