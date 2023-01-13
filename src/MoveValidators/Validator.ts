import { fenToBoardMap } from '../pieces/pieceUtils';
import { BoardType } from '../BoardTypes';
import * as helpers from './validatorHelper';
import { isCheck } from './check';

class Validator {
  // Declarations of properties that will hold various states of the game
  private boardMap: BoardType = fenToBoardMap();
  private whitesTurn: boolean = true;
  private movingPiece: string = '';
  private movingPiecesOrigin: string = '';

  private movingPiecesDest: string = '';
  private movingPiecesColor: string = '';

  /**
   * Method to run after each move that updates the game's various states
   */
  private NewMove(): void {
    // Update the board map
    const updatedBoardMap = helpers.updateBoardMap(
      this.movingPiece,
      this.movingPiecesOrigin,
      this.movingPiecesDest,
      this.boardMap
    );

    this.boardMap = { ...updatedBoardMap };

    // Toggle the color's turn
    this.whitesTurn = !this.whitesTurn;
  }

  /**
   Validator method that takes in a piece and runs the corresponding validator
   function for that piece (urrently only for the Queen) 
  */
  public ValidateMove(origin: string, dest: string, piece: string): boolean {
    // Tempporarily change the movingPieceColor to the moving piece's color
    // If the move is invalid, thecolor will be changed back to the previous one
    // tempHoldColor holds the previous color value
    let tempHoldColor = this.movingPiecesColor;
    this.movingPiecesColor = helpers.getPieceColor(piece);

    let isValid: boolean = false;

    // Check if the moving piece matches the appropriate color's turn
    if (this.whitesTurn && this.movingPiecesColor !== 'w') {
      return false;
    } else if (!this.whitesTurn && this.movingPiecesColor !== 'b') {
      return false;
    }

    // Run the validator function for the moving piece (currently only Queen)
    switch (piece) {
      case `K`:
        isValid = this.validateKingMove(origin, dest, `w`);
        break;
      case 'k':
        isValid = this.validateKingMove(origin, dest, `b`);
        break;
      case `Q`:
        isValid = this.validateQueenMove(origin, dest, `w`);
        break;
      case 'q':
        isValid = this.validateQueenMove(origin, dest, `b`);
        break;
      case `R`:
        isValid = this.validateRookMove(origin, dest, `w`);
        break;
      case `r`:
        isValid = this.validateRookMove(origin, dest, `b`);
        break;
      case `B`:
        isValid = this.validateBishopMove(origin, dest, `w`);
        break;
      case 'b':
        isValid = this.validateBishopMove(origin, dest, `b`);
        break;
      case 'N':
        isValid = this.validateKnightMove(origin, dest, `w`);
        break;
      case 'n':
        isValid = this.validateKnightMove(origin, dest, `b`);
        break;
      case 'P':
        isValid = this.validatePawnMove(origin, dest, `w`);
        break;
      case 'p':
        isValid = this.validatePawnMove(origin, dest, `b`);
        break;
    }

    if (isValid) {
      // Set the info of the moving piece to the states
      this.movingPiece = piece;
      this.movingPiecesOrigin = origin;
      this.movingPiecesDest = dest;

      // Call the NewMove method to update the game's states
      this.NewMove();
      console.log(this.boardMap);
      return true;
    }

    // If none of the checks returned true, that means that the move is invalid
    // Change the movingPieeColor's value to the previous color
    this.movingPiecesColor = tempHoldColor;
    return false;
  }

  /**
   * Validator method for the Pawn that checks if
   * the square the Pawn is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  private validatePawnMove(origin: string, dest: string, color: string) {
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

    // A Pawn cammot move diagonally or vertically more than 1 square
    if (fileDifference > 1 || rankDifference > 2) {
      return false;
    }

    let objectedPieceColor: string = '';

    if (color === 'w') {
      // Pawns can only move 2 squares from their initial position
      if (rankDifference === 2 && originRank !== '2') {
        return false;
      }
      // White Pawns can only move up
      if (!(parseInt(destRank) > parseInt(originRank))) {
        return false;
      }
      if (fileDifference === rankDifference) {
        // A Pawn can only move diagonally if it is capturing an enemy piece
        if (helpers.getPieceColor(this.boardMap[destFile][destRank]) === 'b') {
          return true;
        } else {
          return false;
        }
      }

      objectedPieceColor = helpers.checkThroughFile(
        originRank,
        destRank,
        originFile,
        this.boardMap
      ).color;

      // Pawns can only move forward if the square is empty
      if (objectedPieceColor !== '') {
        return false;
      }
    } else if (color === 'b') {
      // Pawns can only move 2 squares from their initial position
      if (rankDifference === 2 && originRank !== '7') {
        return false;
      }
      // Black Pawns can only move down
      if (!(parseInt(destRank) < parseInt(originRank))) {
        return false;
      }
      if (fileDifference === rankDifference) {
        // A Pawn can only move diagonally if it is capturing an enemy piece
        if (helpers.getPieceColor(this.boardMap[destFile][destRank]) === 'w') {
          return true;
        } else {
          return false;
        }
      }

      objectedPieceColor = helpers.checkThroughFile(
        originRank,
        destRank,
        originFile,
        this.boardMap
      ).color;

      // Pawns can only move forward if the square is empty
      if (objectedPieceColor !== '') {
        return false;
      }
    }
    // console.log(`${objectedPieceColor}`);

    return true;
  }

  /**
   * Validator method for the Knight that checks if
   * the square the Knight is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  private validateKnightMove(
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

    // Get the information of the origin and destination squares
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;
    const [fileDifference, rankDifference] = helpers.getFileAndRankDifferences(
      originFile,
      originRank,
      destFile,
      destRank
    );

    // Check that the Knight can only move in an L shape
    if (
      !(
        (fileDifference === 1 && rankDifference === 2) ||
        (fileDifference === 2 && rankDifference === 1)
      )
    ) {
      return false;
    }

    // Check if thereis any piece on the destination square
    // and get its color
    const destPieceColor = helpers.getPieceColor(
      this.boardMap[destFile][destRank]
    );

    // If the obected piece's color is same as the Knight
    // then the Knight cannot move /to it
    if (color === destPieceColor) {
      return false;
    }

    // if none of checks returned false, that means the move is valid
    return true;
  }

  /**
   * Validator method for the Queen that checks if
   * the square the Queen is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  private validateQueenMove(
    origin: string,
    dest: string,
    color: string
  ): boolean {
    /*
    The Queen is basically a Rook + a Bishop. So instead of writing
    a separate validator for the Queen, the same validators for the
    Rook and the Bishop can be used. If one of them return true then the
    move is valid,else it is invalid
     */
    const IsValidRanksAndFiles = this.validateRookMove(origin, dest, color);
    const IsValidDiagonals = this.validateBishopMove(origin, dest, color);

    if (!IsValidRanksAndFiles && !IsValidDiagonals) {
      return false;
    }

    // if none of checks returned false, that means the move is valid
    return true;
  }

  /**
   * Validator method for the King that checks if
   * the square the King is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * to an enemy protected square)
   */
  private validateKingMove(
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

    // If the move is more than one square then it is an illegal move
    if (fileDifference !== 1 && rankDifference !== 1) {
      return false;
    }

    /*
    The King moves exactly like the Queen except for only one square.
    So, after the one square rule is validated, the Queen's validator can be used
    for the King's move
     */
    const isValidMove = this.validateQueenMove(origin, dest, color);
    if (!isValidMove) {
      return false;
    }

    if (isCheck(dest, color, this.boardMap)) {
      return false;
    }

    // if none of checks returned false, that means the move is valid
    return true;
  }

  /**
   * Validator method for the Bishop that checks if
   * the square the Bishop is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  private validateBishopMove(
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

    // If the move is not diagonal then it is an illegal move
    if (fileDifference !== rankDifference) {
      return false;
    }

    // See if there is any piece on the way
    const objectedSquareInfo = helpers.checkThroughDiagonals(
      originFile,
      destFile,
      originRank,
      destRank,
      this.boardMap
    );

    // If the piece's color is same as the Bishop
    // then the Bishop cannot move through/to it
    if (color === objectedSquareInfo.color) {
      return false;
    }

    // console.log('vushio');

    // if none of checks returned false, that means the move is valid
    return true;
  }

  /**
   * Validator method for the Rook that checks if
   * the square the Rook is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  private validateRookMove(
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

    // Get the information of the origin and destination squares
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;

    // If the move is neither straight horizontal or vertical
    // then it is an illegal move
    if (!(originFile === destFile || originRank === destRank)) {
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

      // If the piece's color is same as the Rook
      // then the Rook cannot move through/to it
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

      // If the piece's color is same as the Rook
      // then the Rook cannot move through/to it
      if (color === objectedSquareInfo.color) {
        return false;
      }
    }

    // if none of checks returned false, that means the move is valid
    return true;
  }
}

export default Validator;
