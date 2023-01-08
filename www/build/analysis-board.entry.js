import { r as registerInstance, h } from './index-96fdd9b9.js';
import { f as fenToBoardMap, g as generateChessBoard } from './chessboard-65d4e5e3.js';
import './BoardTypes-d86232b4.js';

/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving diagonally.
 * Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves diagonally
 * like the Queen, Bishop, King and the Pawn (while capturing)
 */
const checkThroughDiagonals = (originFile, destFile, originRank, destRank, boardMap) => {
  // Convert the files to unicode and the ranks to numbers
  let originFileUnicode = originFile.charCodeAt(0);
  let destFileUnicode = destFile.charCodeAt(0);
  let originRankNum = parseInt(originRank);
  let destRankNum = parseInt(destRank);
  // The origin square will not be checked so add or subtract 1
  // from the starting file and rank to look from the next or the previous square
  let nextFileUnicode = originFileUnicode + 1;
  let prevFileUnicode = originFileUnicode - 1;
  let nextRankNum = originRankNum + 1;
  let prevRankNum = originRankNum - 1;
  // Initialize the return values that will hold the data for the piece and
  // its square
  let square = ``;
  let piece = ``;
  let color = ``;
  // If the piece is going right and up, eg: e5 to h8
  if (destFileUnicode > originFileUnicode && destRankNum > originRankNum) {
    while (nextFileUnicode <= destFileUnicode || nextRankNum <= destRankNum) {
      // Get the square and piece data
      square = String.fromCharCode(nextFileUnicode) + nextRankNum.toString();
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If the squre is empty, go to the next square (if any)
        nextFileUnicode++;
        nextRankNum++;
      }
      else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  // If the piece is going right and down, eg: e5 to h1
  else if (destFileUnicode > originFileUnicode && destRankNum < originRankNum) {
    while (nextFileUnicode <= destFileUnicode || prevRankNum >= destRankNum) {
      // Get the square and piece data
      square = String.fromCharCode(nextFileUnicode) + prevRankNum.toString();
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If the squre is empty, go to the next square (if any)
        nextFileUnicode++;
        prevRankNum--;
      }
      else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  // If the piece is going left and up, eg: e5 to a1
  else if (destFileUnicode < originFileUnicode && destRankNum > originRankNum) {
    while (prevFileUnicode >= destFileUnicode || nextRankNum <= destRankNum) {
      // Get the square and piece data
      square = String.fromCharCode(prevFileUnicode) + nextRankNum.toString();
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If the squre is empty, go to the next square (if any)
        prevFileUnicode--;
        nextRankNum++;
      }
      else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  // If the piece is going left and down, eg: e5 to h1
  else if (destFileUnicode < originFileUnicode && destRankNum < originRankNum) {
    while (prevFileUnicode >= destFileUnicode || prevRankNum >= destRankNum) {
      // Get the square and piece data
      square = String.fromCharCode(prevFileUnicode) + prevRankNum.toString();
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If the squre is empty, go to the next square (if any)
        prevFileUnicode--;
        prevRankNum--;
      }
      else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  return { square, piece, color };
};
/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving through one file and multiple ranks (moving
 * vertically). Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves vertically
 * like the Queen, Rook, King and the Pawn
 */
const checkThroughFile = (originRank, destRank, file, boardMap) => {
  // Convert the rank characters to numbers
  const originRankNum = parseInt(originRank);
  const destRankNum = parseInt(destRank);
  // The origin square will not be checked so add or subtract 1
  // from the starting rank to look from the next or previous rank respectively
  let nextRank = originRankNum + 1;
  let prevRank = originRankNum - 1;
  // Initialize the return values that will hold the data for the piece and
  // its square
  let square = ``;
  let piece = ``;
  let color = ``;
  // If the piece is moving up (eg: a1 to a8)
  if (originRankNum < destRankNum) {
    for (nextRank; nextRank <= destRankNum; nextRank++) {
      // Get the square and piece data
      square = file + nextRank.toString();
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If there is no piece on the way
        continue;
      }
      else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  // If the piece is moving down (eg: a8 to a1)
  else {
    for (prevRank; prevRank >= destRankNum; prevRank--) {
      // Get the square and piece data
      square = file + prevRank.toString();
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If there is no piece on the way
        continue;
      }
      else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  return { square, piece, color };
};
/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving through one rank and multiple files (moving
 * horizontally). Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves horizontally
 * like the Queen, Rook and the King
 */
const checkThroughRank = (originFile, destFile, rank, boardMap) => {
  // Get the unicode value of the files
  let originFileUnicode = originFile.charCodeAt(0);
  let destFileUnicode = destFile.charCodeAt(0);
  // The origin square will not be checked so add or subtract 1
  // from the starting file to look from the next or previous file respectively
  let nextFileUnicode = originFileUnicode + 1;
  let prevFileUnicode = originFileUnicode - 1;
  // Initialize the return values that will hold the data for the piece and
  // its square
  let square = ``;
  let piece = ``;
  let color = ``;
  // If the piece is moving from left to right (eg: a1 to h1)
  if (originFileUnicode < destFileUnicode) {
    for (nextFileUnicode; nextFileUnicode <= destFileUnicode; nextFileUnicode++) {
      // Get the square and piece data
      square = String.fromCharCode(nextFileUnicode) + rank;
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If there is no piece on the way
        continue;
      }
      else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  // If the piece is moving from right to left (eg: h1 to a1)
  else {
    for (prevFileUnicode; prevFileUnicode >= destFileUnicode; prevFileUnicode--) {
      // Get the square and piece data
      square = String.fromCharCode(prevFileUnicode) + rank;
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If there is no piece on the way
        continue;
      }
      else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  return { square, piece, color };
};
/**
 * Method that takes the moving piece, its origin and destination
 * square and updates the board accordingly
 */
const updateBoardMap = (piece, origin, dest, boardMap) => {
  const [originFile, originRank, destFile, destRank] = getOriginAndDestInfo(origin, dest);
  // Empty and original square and place the piece on the destination square
  boardMap[originFile][originRank] = '';
  boardMap[destFile][destRank] = piece;
};
const getPieceColor = (piece) => {
  if (piece === '')
    return '';
  // If the piece symbol is a lowercase character (like 'b') then
  // it is a black piece, else it is a white piece
  return piece.toLowerCase() === piece ? `b` : `w`;
};
/**
 * Method that retrieves the file names and rank numbers from the original
 * and destination squares and returnes them in an array
 */
const getOriginAndDestInfo = (origin, dest) => {
  const [originFile, originRank] = getFileAndRank(origin);
  const [destFile, destRank] = getFileAndRank(dest);
  return [originFile, originRank, destFile, destRank];
};
/**
 * Method that returns the differnces between the origin file and thes
 * destination file and the same for the ranks in an array
 */
const getFileAndRankDifferences = (originFile, originRank, destFile, destRank) => {
  const fileDifference = Math.abs(originFile.charCodeAt(0) - destFile.charCodeAt(0));
  const rankDifference = Math.abs(parseInt(originRank) - parseInt(destRank));
  return [fileDifference, rankDifference];
};
const getFileAndRank = (square) => {
  // If the square is malformatted
  if (square.length !== 2 && typeof parseInt(square[1]) !== 'number') {
    console.error('Invalid square given');
    return [null, null];
  }
  return [square[0], square[1]];
};

class Validator {
  constructor() {
    // Declarations of properties that will hold various states of the game
    this.boardMap = fenToBoardMap();
    this.canEnPassant = false;
    this.canWhiteCastle = false;
    this.canBlackCastle = false;
    this.castlingRightViolatedWhite = false;
    this.castlingRightViolatedBlack = false;
    this.canWhitePromote = false;
    this.canBlackPromote = false;
    this.whitesTurn = true;
    this.whiteKingInCheck = false;
    this.blackKingInCheck = false;
    this.fiftyMovesRule = [0, false];
    this.movingPiece = '';
    this.movingPiecesOrigin = '';
    this.movingPiecesDest = '';
    this.movingPiecesColor = '';
  }
  /**
   * Method to run after each move that updates the game's various states
   */
  NewMove() {
    // Update the board map
    updateBoardMap(this.movingPiece, this.movingPiecesOrigin, this.movingPiecesDest, this.boardMap);
    // Toggle the color's turn
    this.whitesTurn = !this.whitesTurn;
  }
  /**
   Validator method that takes in a piece and runs the corresponding validator
   function for that piece (urrently only for the Queen)
  */
  ValidateMove(origin, dest, piece) {
    // Set the info of the moving piece to the states
    this.movingPiece = piece;
    this.movingPiecesColor = getPieceColor(piece);
    this.movingPiecesOrigin = origin;
    this.movingPiecesDest = dest;
    // Check if the moving piece matches the appropriate color's turn
    if (this.whitesTurn && this.movingPiecesColor !== 'w') {
      return false;
    }
    else if (!this.whitesTurn && this.movingPiecesColor !== 'b') {
      return false;
    }
    // Run the validator function for the moving piece (currently only Queen)
    switch (piece) {
      case `Q`:
        return this.validateQueenMove(origin, dest, `w`);
      case 'q':
        return this.validateQueenMove(origin, dest, `b`);
      case `R`:
        return this.validateRookMove(origin, dest, `w`);
      case 'r':
        return this.validateRookMove(origin, dest, `b`);
      case `B`:
        return this.validateBishopMove(origin, dest, `w`);
      case 'b':
        return this.validateBishopMove(origin, dest, `b`);
      default:
        return true;
    }
  }
  /**
   * Validator method for the Queen that checks if
   * the square the Queen is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  validateQueenMove(origin, dest, color) {
    // Get the file and rank information and check they are correct
    const fileAndRankArray = getOriginAndDestInfo(origin, dest);
    if (fileAndRankArray.includes(null)) {
      console.log('invalid square input');
      return false;
    }
    // Get the information of the origin and destination squares and their differences
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;
    const [fileDifference, rankDifference] = getFileAndRankDifferences(originFile, originRank, destFile, destRank);
    // If the move is neither straight horizontal, vertical or diagonal
    // then it is an illegal move
    if (!(originFile === destFile ||
      originRank === destRank ||
      fileDifference === rankDifference)) {
      return false;
    }
    // If The move is along the files (horizontal, like a1 to h1)
    if (originRank === destRank) {
      // See if there is any piece on the way
      const objectedSquareInfo = checkThroughRank(originFile, destFile, originRank, this.boardMap);
      // If the piece's color is same as the Queen
      // then the Queen cannot move through/to it
      if (color === objectedSquareInfo.color) {
        return false;
      }
    }
    // If the move is along ranks (vertically, like a1 to a8)
    else if (originFile === destFile) {
      // See if there is any piece on the way
      const objectedSquareInfo = checkThroughFile(originRank, destRank, originFile, this.boardMap);
      // If the piece's color is same as the Queen
      // then the Queen cannot move through/to it
      if (color === objectedSquareInfo.color) {
        return false;
      }
    }
    // If the move is diagonal (like a1 to h8
    else if (fileDifference === rankDifference) {
      // See if there is any piece on the way)
      const objectedSquareInfo = checkThroughDiagonals(originFile, destFile, originRank, destRank, this.boardMap);
      // If the piece's color is same as the Queen
      // then the Queen cannot move through/to it
      if (color === objectedSquareInfo.color) {
        return false;
      }
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
  validateBishopMove(origin, dest, color) {
    // Get the file and rank information and check they are correct
    const fileAndRankArray = getOriginAndDestInfo(origin, dest);
    if (fileAndRankArray.includes(null)) {
      console.log('invalid square input');
      return false;
    }
    // Get the information of the origin and destination squares and their differences
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;
    const [fileDifference, rankDifference] = getFileAndRankDifferences(originFile, originRank, destFile, destRank);
    // If the move is not diagonal then it is an illegal move
    if (fileDifference !== rankDifference) {
      return false;
    }
    // See if there is any piece on the way
    const objectedSquareInfo = checkThroughDiagonals(originFile, destFile, originRank, destRank, this.boardMap);
    // If the piece's color is same as the Bishop
    // then the Bishop cannot move through/to it
    if (color === objectedSquareInfo.color) {
      return false;
    }
    // if none of checks returned false, that means the move is valid
    return true;
  }
  /**
   * Validator method for the Rook that checks if
   * the square the Rook is trying to move to is legal.
   * As of now it does not check for any special rules (like moving
   * while being pinned)
   */
  validateRookMove(origin, dest, color) {
    // Get the file and rank information and check they are correct
    const fileAndRankArray = getOriginAndDestInfo(origin, dest);
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
      const objectedSquareInfo = checkThroughRank(originFile, destFile, originRank, this.boardMap);
      // If the piece's color is same as the Rook
      // then the Rook cannot move through/to it
      if (color === objectedSquareInfo.color) {
        return false;
      }
    }
    // If the move is along ranks (vertically, like a1 to a8)
    else if (originFile === destFile) {
      // See if there is any piece on the way
      const objectedSquareInfo = checkThroughFile(originRank, destRank, originFile, this.boardMap);
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

const analysisBoardCss = "#analysis-board-container{position:relative;width:400px;height:400px;border:1px solid black}.row{display:flex;flex-direction:row;width:100%;height:50px}.square{width:50px;height:50px;border:0.1px black}.piece{display:flex;justify-content:center;align-items:center;touch-action:none}.invisible{display:none}@media (max-width: 550px){#analysis-board-container{width:280px;height:280px}.row{height:35px}.square{width:35px;height:35px}}";

const AnalysisBoard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // An instance of the Validator class for move validation
    this.validator = new Validator();
    this.light = 'white';
    this.dark = 'black';
  }
  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner HTML of the checkerboard container to the HTML string for the checkered board
    this.analysisBoardContainer.innerHTML = generateChessBoard(this.light, this.dark, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    // Get all the pieces and squares in the chess board
    const pieces = this.analysisBoardContainer.querySelectorAll('.piece');
    const squares = this.analysisBoardContainer.querySelectorAll('.square');
    // Add drag and drop event listeners to each piece
    pieces.forEach((piece) => {
      // When a piece is dragged, add the 'dragging' and 'invisible' classes to it
      piece.addEventListener('dragstart', () => {
        setTimeout(() => {
          piece.classList.add('dragging', 'invisible');
        }, 0);
      });
      // When a piece is dropped, remove the 'dragging' and 'invisible' classes from it
      piece.addEventListener('dragend', () => {
        piece.classList.remove('dragging', 'invisible');
      });
    });
    // Add drag and drop event listeners to each square
    squares.forEach((square) => {
      // Allow dropping on the square by preventing the default behavior
      square.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      // When a piece is dropped on a square, append the piece to the square and clear the square's inner HTML
      square.addEventListener('drop', (e) => {
        e.preventDefault();
        // Get the HTML element being dragged
        const pieceBeingDragged = this.analysisBoardContainer.querySelector('.dragging');
        // Get the info for the piece, its origin and destination square
        const originSquare = pieceBeingDragged.parentElement.id;
        const destSquare = square.id;
        const piece = pieceBeingDragged.id;
        // Validate the move
        const isValid = this.validator.ValidateMove(originSquare, destSquare, piece);
        if (isValid) {
          // Call the NewMove() ,ethod to update the game states
          this.validator.NewMove();
          square.innerHTML = '';
          square.appendChild(pieceBeingDragged);
        }
        return;
      });
    });
  }
  render() {
    return (h("div", { ref: (el) => (this.analysisBoardContainer = el), id: "analysis-board-container" }));
  }
};
AnalysisBoard.style = analysisBoardCss;

export { AnalysisBoard as analysis_board };
