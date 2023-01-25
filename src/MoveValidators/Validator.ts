import { fenToBoardMap } from '../pieces/pieceUtils';
import { BoardType } from '../BoardTypes';
import * as helpers from './validatorHelper';
import * as specials from './specialMoves';
import { isCheck, isSafe } from './check';

/**
 * The main move validator class that contains the methods for validating
 * all the moves and contains all the states of the game
 */
class Validator {
  // Declarations of properties that will hold various states of the game
  private boardMap: BoardType = fenToBoardMap();
  private whitesTurn: boolean = true;
  private movingPiece: string = '';
  private movingPiecesOrigin: string = '';

  private movingPiecesDest: string = '';
  private movingPiecesColor: string = '';

  private canWhiteEnPassant: (boolean | string)[] = [false, ''];
  private canBlackEnPassant: (boolean | string)[] = [false, ''];

  private canWhiteCastleKingSide: boolean = true;
  private canWhiteCastleQueenSide: boolean = true;
  private canBlackCastleKingSide: boolean = true;
  private canBlackCastleQueenSide: boolean = true;

  public IsPromoting: boolean = false;

  private whiteKingsPosition: string = 'e1';
  private blackKingsPosition: string = 'e8';

  /**
   * Method to run after a Pawn promotion that updates the game's states
   */
  public PromotePawn(pieceToPromoteTo: string): void {
    // Update the board map
    const updatedBoardMap = helpers.updateBoardMap(
      pieceToPromoteTo,
      this.movingPiecesOrigin,
      this.movingPiecesDest,
      this.boardMap
    );

    this.boardMap = JSON.parse(JSON.stringify(updatedBoardMap));

    // Toggle the color's turn
    this.whitesTurn = !this.whitesTurn;
  }

  /**
   * Method to run after each move that updates the game's states
   */
  private newMove(): void {
    // Update the board map
    const updatedBoardMap = helpers.updateBoardMap(
      this.movingPiece,
      this.movingPiecesOrigin,
      this.movingPiecesDest,
      this.boardMap
    );

    this.boardMap = JSON.parse(JSON.stringify(updatedBoardMap));

    // Toggle the color's turn
    this.whitesTurn = !this.whitesTurn;
  }

  /**
   Validator method that takes in a piece and runs the corresponding validator
   function for that piece
  */
  public ValidateMove(
    origin: string,
    dest: string,
    piece: string
  ): {
    isValid: boolean;
    isEnPassant: boolean;
    isCastle: boolean;
    isPromotion: boolean;
  } {
    // Initialize the return values
    let isValid: boolean = false;
    let isEnPassant: boolean = false;
    let isCastle: boolean = false;
    let isPromotion: boolean = false;

    if (origin === dest) {
      return { isValid, isEnPassant, isCastle, isPromotion };
    }

    // Temporarily change the movingPieceColor to the moving piece's color
    // If the move is invalid, thecolor will be changed back to the previous one
    // tempHoldColor holds the previous color value
    let tempColor = this.movingPiecesColor;
    this.movingPiecesColor = helpers.getPieceColor(piece);

    // Check if the moving piece matches the appropriate color's turn
    if (this.whitesTurn && this.movingPiecesColor !== 'w') {
      return { isValid, isEnPassant, isCastle, isPromotion };
    } else if (!this.whitesTurn && this.movingPiecesColor !== 'b') {
      return { isValid, isEnPassant, isCastle, isPromotion };
    }

    // Check if a Pawn is promoting while this move is played
    if (this.IsPromoting) {
      return { isValid, isEnPassant, isCastle, isPromotion };
    }

    // Run the appropriate validator function for the moving piece
    switch (piece) {
      case `K`:
        ({ isValid, isCastle } = this.validateKingMove(origin, dest, `w`));
        break;
      case 'k':
        ({ isValid, isCastle } = this.validateKingMove(origin, dest, `b`));
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
        ({ isValid, isEnPassant, isPromotion } = this.validatePawnMove(
          origin,
          dest,
          `w`
        ));
        break;
      case 'p':
        ({ isValid, isEnPassant, isPromotion } = this.validatePawnMove(
          origin,
          dest,
          `b`
        ));
        break;
    }

    if (isValid) {
      // Take away the King's castling rights after it moves and updates its position
      if (piece === 'K') {
        this.whiteKingsPosition = dest;
        this.canWhiteCastleKingSide = false;
        this.canWhiteCastleQueenSide = false;
      } else if (piece === 'k') {
        this.blackKingsPosition = dest;
        this.canBlackCastleKingSide = false;
        this.canBlackCastleQueenSide = false;
      }

      // Copy of the boardMap to temprarily make the move and update the board
      const tempBoardMap: BoardType = JSON.parse(JSON.stringify(this.boardMap));

      // Check if the King would be safe if the move is played
      // If the King is not safe, the move is not valid
      const isKingSafeAfterTheMove = isSafe(
        piece,
        origin,
        dest,
        this.whiteKingsPosition,
        this.blackKingsPosition,
        tempBoardMap
      );
      if (!isKingSafeAfterTheMove) {
        return { isValid: false, isEnPassant, isCastle, isPromotion };
      }

      // If the move is a castling move update the board accordingly
      if (isCastle) {
        if (piece === 'K') {
          this.boardMap['e']['1'] = '';

          if (dest === 'g1' || dest === 'h1') {
            this.boardMap['g']['1'] = 'K';
            this.boardMap['f']['1'] = 'R';
            this.boardMap['h']['1'] = '';
          } else if (dest === 'c1' || dest === 'a1') {
            this.boardMap['c']['1'] = 'K';
            this.boardMap['d']['1'] = 'R';
            this.boardMap['a']['1'] = '';
          }
        } else if (piece === 'k') {
          this.boardMap['e']['8'] = '';

          if (dest === 'g8' || dest === 'h8') {
            this.boardMap['g']['8'] = 'k';
            this.boardMap['f']['8'] = 'r';
            this.boardMap['h']['8'] = '';
          } else if (dest === 'c8' || dest === 'a8') {
            this.boardMap['c']['8'] = 'k';
            this.boardMap['d']['8'] = 'r';
            this.boardMap['a']['8'] = '';
          }
        }

        // Toggle the color's turn
        this.whitesTurn = !this.whitesTurn;
        return { isValid, isEnPassant, isCastle, isPromotion };
      }

      if (isPromotion) {
        return { isValid, isEnPassant, isCastle, isPromotion };
      }

      if (isEnPassant) {
        if (piece === 'P') {
          this.boardMap[dest[0]][(parseInt(dest[1]) - 1).toString()] = '';
        } else if (piece === 'p') {
          this.boardMap[dest[0]][(parseInt(dest[1]) + 1).toString()] = '';
        }
      }

      if (!(piece === 'P' || piece === 'p')) {
        this.canBlackEnPassant = [false, ''];
        this.canWhiteEnPassant = [false, ''];
      }

      // Set the info of the moving piece to the states
      this.movingPiece = piece;
      this.movingPiecesOrigin = origin;
      this.movingPiecesDest = dest;

      // Call the newMove method to update the game's states
      this.newMove();
      return { isValid, isEnPassant, isCastle, isPromotion };
    }

    // If none of the checks returned true, that means that the move is invalid
    // Change the movingPieeColor's value to the previous color
    this.movingPiecesColor = tempColor;
    return { isValid, isEnPassant, isCastle, isPromotion };
  }

  /**
   * Validator method for the Pawn that checks if
   * the square the Pawn is trying to move to is legal
   */
  private validatePawnMove(
    origin: string,
    dest: string,
    color: string
  ): { isValid: boolean; isEnPassant: boolean; isPromotion: boolean } {
    // Get the file and rank information and check they are correct
    const fileAndRankArray = helpers.getOriginAndDestInfo(origin, dest);
    let isValid: boolean = false;
    let isEnPassant: boolean = false;
    let isPromotion: boolean = false;

    if (fileAndRankArray.includes(null)) {
      console.log('invalid square input');
      return { isValid, isEnPassant, isPromotion };
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
      return { isValid, isEnPassant, isPromotion };
    }

    let objectedPieceColor: string = '';
    isEnPassant = specials.isEnPassant(
      destFile,
      originRank,
      destRank,
      color,
      this.boardMap
    );

    isPromotion = specials.isPromotion(color, destRank);

    if (color === 'w') {
      // Pawns can only move 2 squares from their initial position
      if (rankDifference === 2 && originRank !== '2') {
        return { isValid, isEnPassant, isPromotion };
      }
      // White Pawns can only move up
      if (!(parseInt(destRank) > parseInt(originRank))) {
        return { isValid, isEnPassant, isPromotion };
      }
      if (fileDifference === rankDifference) {
        if (
          isEnPassant &&
          this.canWhiteEnPassant[0] &&
          this.boardMap[destFile][destRank] === '' &&
          destFile === this.canWhiteEnPassant[1]
        ) {
          this.canWhiteEnPassant = [false, ''];
          isValid = true;
          return { isValid, isEnPassant, isPromotion };
        }

        // A Pawn can only move diagonally if it is capturing an enemy piece
        if (helpers.getPieceColor(this.boardMap[destFile][destRank]) === 'b') {
          isValid = true;
          return { isValid, isEnPassant, isPromotion };
        } else {
          return { isValid, isEnPassant, isPromotion };
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
        return { isValid, isEnPassant, isPromotion };
      }
    } else if (color === 'b') {
      // Pawns can only move 2 squares from their initial position
      if (rankDifference === 2 && originRank !== '7') {
        return { isValid, isEnPassant, isPromotion };
      }
      // Black Pawns can only move down
      if (!(parseInt(destRank) < parseInt(originRank))) {
        return { isValid, isEnPassant, isPromotion };
      }
      if (fileDifference === rankDifference) {
        if (
          isEnPassant &&
          this.canBlackEnPassant[0] &&
          this.boardMap[destFile][destRank] === '' &&
          destFile === this.canBlackEnPassant[1]
        ) {
          this.canBlackEnPassant = [false, ''];
          isValid = true;
          return { isValid, isEnPassant, isPromotion };
        }
        // A Pawn can only move diagonally if it is capturing an enemy piece
        if (helpers.getPieceColor(this.boardMap[destFile][destRank]) === 'w') {
          isValid = true;
          return { isValid, isEnPassant, isPromotion };
        } else {
          return { isValid, isEnPassant, isPromotion };
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
        return { isValid, isEnPassant, isPromotion };
      }
    }

    if (rankDifference === 2) {
      if (color === 'w') {
        this.canBlackEnPassant = [true, originFile];
      } else if (color === 'b') {
        this.canWhiteEnPassant = [true, originFile];
      }
    } else {
      this.canWhiteEnPassant = [false, ''];
      this.canBlackEnPassant = [false, ''];
    }

    isValid = true;
    return { isValid, isEnPassant, isPromotion };
  }

  /**
   * Validator method for the Knight that checks if
   * the square the Knight is trying to move to is legal
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
   * the square the Queen is trying to move to is legal
   */
  private validateQueenMove(
    origin: string,
    dest: string,
    color: string
  ): boolean {
    /*
    The Queen is basically a Rook plus a Bishop. So instead of writing
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
   * the square the King is trying to move to is legal
   */
  private validateKingMove(
    origin: string,
    dest: string,
    color: string
  ): { isValid: boolean; isCastle: boolean } {
    let isValid: boolean = false;

    // Get the file and rank information and check they are correct
    const fileAndRankArray = helpers.getOriginAndDestInfo(origin, dest);

    // Get the information of the origin and destination squares and their differences
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;
    const [fileDifference, rankDifference] = helpers.getFileAndRankDifferences(
      originFile,
      originRank,
      destFile,
      destRank
    );

    // Check if the move is a castling move
    const isCastle = specials.isCastle(
      origin,
      dest,
      color,
      this.boardMap,
      this.canWhiteCastleKingSide,
      this.canWhiteCastleQueenSide,
      this.canBlackCastleKingSide,
      this.canBlackCastleQueenSide
    );

    // If the move is more than one square then it is an illegal move
    if (rankDifference > 1) {
      return { isValid, isCastle };
    }

    // The King can only move 2 files if it is a castling move
    if (fileDifference > 1) {
      if (isCastle) {
        isValid = true;
        return { isValid, isCastle };
      }
      return { isValid, isCastle };
    }

    /*
    The King moves exactly like the Queen except for only one square.
    So, after the one square rule is validated, the Queen's validator can be used
    for the King's move
     */
    isValid = this.validateQueenMove(origin, dest, color);
    if (!isValid) {
      return { isValid, isCastle };
    }

    if (isCheck(dest, color, this.boardMap)) {
      isValid = false;
      return { isValid, isCastle };
    }

    // if none of checks returned false, that means the move is valid
    return { isValid, isCastle };
  }

  /**
   * Validator method for the Bishop that checks if
   * the square the Bishop is trying to move to is legal
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

    // This makes sure the pieces cannot jump over the enemy pieces
    if (
      objectedSquareInfo.color !== '' &&
      objectedSquareInfo.color !== color &&
      objectedSquareInfo.square !== dest
    ) {
      return false;
    }

    // if none of checks returned false, that means the move is valid
    return true;
  }

  /**
   * Validator method for the Rook that checks if
   * the square the Rook is trying to move to is legal
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

      // This makes sure the pieces cannot jump over the enemy pieces
      if (
        objectedSquareInfo.color !== '' &&
        objectedSquareInfo.color !== color &&
        objectedSquareInfo.square !== dest
      ) {
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

      // This makes sure the pieces cannot jump over the enemy pieces
      if (
        objectedSquareInfo.color !== '' &&
        objectedSquareInfo.color !== color &&
        objectedSquareInfo.square !== dest
      ) {
        return false;
      }
    }

    // If the Rook moves from its original square, take awau the
    // castling rights of the King according to which Rook moved
    if (origin === 'a1') this.canWhiteCastleQueenSide = false;
    if (origin === 'h1') this.canWhiteCastleKingSide = false;
    if (origin === 'a8') this.canBlackCastleQueenSide = false;
    if (origin === 'h8') this.canBlackCastleKingSide = false;

    // if none of checks returned false, that means the move is valid
    return true;
  }
}

export default Validator;
