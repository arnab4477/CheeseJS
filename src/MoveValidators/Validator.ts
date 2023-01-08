import { fenToBoardMap } from '../pieces/pieceUtils';
import { BoardType } from '../BoardTypes';
import * as helpers from './validatorHelper';

class Validator {
  // Declarations of properties that will hold various states of the game
  private boardMap: BoardType = fenToBoardMap();
  private canEnPassant: boolean = false;
  private canWhiteCastle: boolean = false;
  private canBlackCastle: boolean = false;

  private castlingRightViolatedWhite: boolean = false;
  private castlingRightViolatedBlack: boolean = false;
  private canWhitePromote: boolean = false;
  private canBlackPromote: boolean = false;

  private whitesTurn: boolean = true;
  private whiteKingInCheck: boolean = false;
  private blackKingInCheck: boolean = false;
  private fiftyMovesRule: (number | boolean)[] = [0, false];

  private movingPiece: string = '';
  private movingPiecesOrigin: string = '';
  private movingPiecesDest: string = '';
  private movingPiecesColor: string = '';

  /**
   * Method to run after each move that updates the game's various states
   */
  public NewMove(): void {
    // Update the board map
    helpers.updateBoardMap(
      this.movingPiece,
      this.movingPiecesOrigin,
      this.movingPiecesDest,
      this.boardMap
    );

    // Toggle the color's turn
    this.whitesTurn = !this.whitesTurn;
  }

  /**
   Validator method that takes in a piece and runs the corresponding validator
   function for that piece (urrently only for the Queen) 
  */
  public ValidateMove(origin: string, dest: string, piece: string): boolean {
    // Set the info of the moving piece to the states
    this.movingPiece = piece;
    this.movingPiecesColor = helpers.getPieceColor(piece);
    this.movingPiecesOrigin = origin;
    this.movingPiecesDest = dest;

    // Check if the moving piece matches the appropriate color's turn
    if (this.whitesTurn && this.movingPiecesColor !== 'w') {
      return false;
    } else if (!this.whitesTurn && this.movingPiecesColor !== 'b') {
      return false;
    }

    // Run the validator function for the moving piece (currently only Queen)
    switch (piece) {
      case `Q`:
        return this.validateQueenMove(origin, dest, `w`);
      case 'q':
        return this.validateQueenMove(origin, dest, `b`);
      default:
        return true;
    }
  }

  /**
   * Validator method for the Queen that checks if
   * the sqyare the Queen is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while pinned)
   */
  private validateQueenMove(
    origin: string,
    dest: string,
    color: string
  ): boolean {
    // Get the file and rank information and check they are correct
    const fileAndRankArray = helpers.getOriginAndDestInfo(origin, dest);
    if (fileAndRankArray.includes(null)) {
      console.log('invalid square input');
      return false;
    }

    // Get the information of the origin and destination squares and their differences
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;
    const [fileDifference, rankDifference] = helpers.getFileAndRankDifferences(
      originFile,
      originRank,
      destFile,
      destRank
    );

    // If the move is neither straight horizontal, vertical or diagonal
    // then it is an illegal move
    if (
      !(
        originFile === destFile ||
        originRank === destRank ||
        fileDifference === rankDifference
      )
    ) {
      return false;
    }

    // If The move is along the files (horizontal, like a1 to h1)
    if (originRank === destRank) {
      // See if there is any piece on the way
      const objectedSquareInfo = helpers.checkThroughRank(
        originFile,
        destFile,
        originRank,
        this.boardMap
      );

      // If the piece's color is sane as the Queen
      // then the Queen cannot move through/to it
      if (color === objectedSquareInfo.color) {
        return false;
      }
    }
    // If the move is along ranks (vertically, like a1 to a8)
    else if (originFile === destFile) {
      // See if there is any piece on the way
      const objectedSquareInfo = helpers.checkThroughFile(
        originRank,
        destRank,
        originFile,
        this.boardMap
      );

      // If the piece's color is sane as the Queen
      // then the Queen cannot move through/to it
      if (color === objectedSquareInfo.color) {
        return false;
      }
    }
    // If the move is diagonal (like a1 to h8
    else if (fileDifference === rankDifference) {
      // See if there is any piece on the way)
      const objectedSquareInfo = helpers.checkThroughDiagonals(
        originFile,
        destFile,
        originRank,
        destRank,
        this.boardMap
      );

      // If the piece's color is sane as the Queen
      // then the Queen cannot move through/to it
      if (color === objectedSquareInfo.color) {
        return false;
      }
    }

    // if none of checks returned false, that means the move is valid
    return true;
  }
}

export default Validator;
