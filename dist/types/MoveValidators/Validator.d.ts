/**
 * The main move validator class that contains the methods for validating
 * all the moves and contains all the states of the game
 */
declare class Validator {
  private boardMap;
  private whitesTurn;
  private movingPiece;
  private movingPiecesOrigin;
  private movingPiecesDest;
  private movingPiecesColor;
  private canWhiteEnPassant;
  private canBlackEnPassant;
  private canWhiteCastleKingSide;
  private canWhiteCastleQueenSide;
  private canBlackCastleKingSide;
  private canBlackCastleQueenSide;
  IsPromoting: boolean;
  private whiteKingsPosition;
  private blackKingsPosition;
  /**
   * Method to run after a Pawn promotion that updates the game's states
   */
  PromotePawn(pieceToPromoteTo: string): void;
  /**
   * Method to run after each move that updates the game's states
   */
  private newMove;
  /**
   Validator method that takes in a piece and runs the corresponding validator
   function for that piece
  */
  ValidateMove(origin: string, dest: string, piece: string): {
    isValid: boolean;
    isEnPassant: boolean;
    isCastle: boolean;
    isPromotion: boolean;
  };
  /**
   * Validator method for the Pawn that checks if
   * the square the Pawn is trying to move to is legal
   */
  private validatePawnMove;
  /**
   * Validator method for the Knight that checks if
   * the square the Knight is trying to move to is legal
   */
  private validateKnightMove;
  /**
   * Validator method for the Queen that checks if
   * the square the Queen is trying to move to is legal
   */
  private validateQueenMove;
  /**
   * Validator method for the King that checks if
   * the square the King is trying to move to is legal
   */
  private validateKingMove;
  /**
   * Validator method for the Bishop that checks if
   * the square the Bishop is trying to move to is legal
   */
  private validateBishopMove;
  /**
   * Validator method for the Rook that checks if
   * the square the Rook is trying to move to is legal
   */
  private validateRookMove;
}
export default Validator;
