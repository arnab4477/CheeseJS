declare class Validator {
  private boardMap;
  private whitesTurn;
  private movingPiece;
  private movingPiecesOrigin;
  private movingPiecesDest;
  private movingPiecesColor;
  /**
   * Method to run after each move that updates the game's various states
   */
  private NewMove;
  /**
   Validator method that takes in a piece and runs the corresponding validator
   function for that piece (urrently only for the Queen)
  */
  ValidateMove(origin: string, dest: string, piece: string): boolean;
  /**
   * Validator method for the Queen that checks if
   * the square the Queen is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  private validateQueenMove;
  /**
   * Validator method for the King that checks if
   * the square the King is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * to an enemy protected square)
   */
  private validateKingMove;
  /**
   * Validator method for the Bishop that checks if
   * the square the Bishop is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  private validateBishopMove;
  /**
   * Validator method for the Rook that checks if
   * the square the Rook is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  private validateRookMove;
}
export default Validator;
