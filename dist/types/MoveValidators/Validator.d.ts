declare class Validator {
  private boardMap;
  private canEnPassant;
  private canWhiteCastle;
  private canBlackCastle;
  private castlingRightViolatedWhite;
  private castlingRightViolatedBlack;
  private canWhitePromote;
  private canBlackPromote;
  private whitesTurn;
  private whiteKingInCheck;
  private blackKingInCheck;
  private fiftyMovesRule;
  private movingPiece;
  private movingPiecesOrigin;
  private movingPiecesDest;
  private movingPiecesColor;
  /**
   * Method to run after each move that updates the game's various states
   */
  NewMove(): void;
  /**
   Validator method that takes in a piece and runs the corresponding validator
   function for that piece (urrently only for the Queen)
  */
  ValidateMove(origin: string, dest: string, piece: string): boolean;
  /**
   * Validator method for the Queen that checks if
   * the sqyare the Queen is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while pinned)
   */
  private validateQueenMove;
}
export default Validator;
