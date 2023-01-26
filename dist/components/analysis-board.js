import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { f as fenToBoardMap, g as generateChessBoard } from './chessboard.js';

/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving diagonally.
 * Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves diagonally
 * like the Queen, Bishop, King and the Pawn (while capturing)
 */
const checkThroughDiagonals = (originFile, destFile, originRank, destRank, boardMap) => {
  // Initialize the return values that will hold the data for the piece and
  // its square
  let square = ``;
  let piece = ``;
  let color = ``;
  // If the destination is same as the origin, return the origin
  if (originFile === destFile && originRank === destRank) {
    return { square: originFile + originRank, piece, color };
  }
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
  // Set the values for the max and min files and ranks
  const maxFileUnicode = 'h'.charCodeAt(0);
  const minFileUnicode = 'a'.charCodeAt(0);
  const maxRankNum = 8;
  const minRankNum = 1;
  // If the piece is going right and up, eg: e5 to h8
  if (destFileUnicode > originFileUnicode && destRankNum > originRankNum) {
    while ((nextFileUnicode <= destFileUnicode &&
      nextFileUnicode <= maxFileUnicode) ||
      (nextRankNum <= destRankNum && nextRankNum <= maxRankNum)) {
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
    while ((nextFileUnicode <= destFileUnicode &&
      nextFileUnicode <= maxFileUnicode) ||
      (prevRankNum >= destRankNum && prevRankNum >= minRankNum)) {
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
    while ((prevFileUnicode >= destFileUnicode &&
      prevFileUnicode >= minFileUnicode) ||
      (nextRankNum <= destRankNum && nextRankNum <= maxRankNum)) {
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
    while ((prevFileUnicode >= destFileUnicode &&
      prevFileUnicode >= minFileUnicode) ||
      (prevRankNum >= destRankNum && prevRankNum >= minRankNum)) {
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
 * Function that returns diagonal edge square information according to the given
 * direction
 */
const getDiagonalEdge = (square, direction) => {
  const [file, rank] = getFileAndRank(square);
  let fileUnicode = file.charCodeAt(0);
  let rankNum = parseInt(rank);
  const maxFileUnicode = 'h'.charCodeAt(0);
  const minFileUnicode = 'a'.charCodeAt(0);
  const maxRank = 8;
  const minRank = 1;
  if (direction === 'right-up') {
    while (fileUnicode < maxFileUnicode && rankNum < maxRank) {
      fileUnicode++;
      rankNum++;
    }
  }
  else if (direction === 'right-down') {
    while (fileUnicode < maxFileUnicode && rankNum > minRank) {
      fileUnicode++;
      rankNum--;
    }
  }
  else if (direction === 'left-up') {
    while (fileUnicode > minFileUnicode && rankNum < maxRank) {
      fileUnicode--;
      rankNum++;
    }
  }
  else if (direction === 'left-down') {
    while (fileUnicode > minFileUnicode && rankNum > minRank) {
      fileUnicode--;
      rankNum--;
    }
  }
  return [String.fromCharCode(fileUnicode), rankNum.toFixed()];
};
/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving through one file and multiple ranks (moving
 * vertically). Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves vertically
 * like the Queen, Rook, King and the Pawn
 */
const checkThroughFile = (originRank, destRank, file, boardMap) => {
  // Initialize the return values that will hold the data for the piece and
  // its square
  let square = ``;
  let piece = ``;
  let color = ``;
  // If the destination is same as the origin, return the origin
  if (originRank === destRank) {
    return { square: file + originRank, piece, color };
  }
  // Convert the rank characters to numbers
  const originRankNum = parseInt(originRank);
  const destRankNum = parseInt(destRank);
  // The origin square will not be checked so add or subtract 1
  // from the starting rank to look from the next or previous rank respectively
  let nextRank = originRankNum + 1;
  let prevRank = originRankNum - 1;
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
  // Initialize the return values that will hold the data for the piece and
  // its square
  let square = ``;
  let piece = ``;
  let color = ``;
  // If the destination is same as the origin, return the origin
  if (originFile === destFile && boardMap) {
    return { square: originFile + rank, piece, color };
  }
  // Get the unicode value of the files
  let originFileUnicode = originFile.charCodeAt(0);
  let destFileUnicode = destFile.charCodeAt(0);
  // The origin square will not be checked so add or subtract 1
  // from the starting file to look from the next or previous file respectively
  let nextFileUnicode = originFileUnicode + 1;
  let prevFileUnicode = originFileUnicode - 1;
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
 * Function that takes two squares and checks if they are adjacent
 * to one another, either vertically, horizontally or diagonally
 */
const isAdjacent = (originSquare, objectedSquare) => {
  // Get the info of the origin and objected square
  const [originFile, originRank, objectedFile, objectedRank] = getOriginAndDestInfo(originSquare, objectedSquare);
  const [fileDifference, rankDifference] = getFileAndRankDifferences(originFile, originRank, objectedFile, objectedRank);
  // Check if theyare diagonally adjaent
  if (fileDifference === rankDifference && fileDifference === 1) {
    return true;
  }
  // If they are on the same file
  if (originFile === objectedFile) {
    if (Math.abs(parseInt(originRank) - parseInt(objectedRank)) === 1) {
      return true;
    }
  }
  // If they are on the same rank
  else if (originRank === objectedRank) {
    if (Math.abs(originFile.charCodeAt(0) - objectedFile.charCodeAt(0)) === 1) {
      return true;
    }
  }
  // If none of the checks returned true that means the squares are not adjacent
  return false;
};
/**
 * Function that takes information about the King, and an array
 * of enemy pieces and checks if those pieces can give a check to
 * the King
 */
const evaluateCheck = (objectedPiece, ownPieceColor, objectedPieceColor, enemyWhitePieces, enemyBlackPieces) => {
  // This means there is an own piece before enemy one, so not check
  if (objectedPieceColor === ownPieceColor) {
    return false;
  }
  // Check if the objected piece is in the list of pieces that
  // can give the King a check
  if (ownPieceColor === 'w' && enemyBlackPieces.includes(objectedPiece)) {
    return true;
  }
  else if (ownPieceColor === 'b' &&
    enemyWhitePieces.includes(objectedPiece)) {
    return true;
  }
  // If none of the checks returned true, then there is no check
  return false;
};
/**
 * Method that takes the moving piece, its origin and destination
 * square and updates the board accordingly
 */
const updateBoardMap = (piece, origin, dest, boardMap) => {
  const [originFile, originRank, destFile, destRank] = getOriginAndDestInfo(origin, dest);
  let boardMapToUpdate = JSON.parse(JSON.stringify(boardMap));
  // Empty and original square and place the piece on the destination square
  boardMapToUpdate[originFile][originRank] = '';
  boardMapToUpdate[destFile][destRank] = piece;
  return boardMapToUpdate;
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

/**
 * Function that returns if the King is safe from checks after a move is
 * played, If it returns false, then the move cannot be played as then the
 * King can be captured
 */
const isSafe = (piece, origin, dest, whiteKingsPosition, blackKingsPosition, boardMap) => {
  const updatedBoardMap = updateBoardMap(piece, origin, dest, boardMap);
  const color = getPieceColor(piece);
  // After the move has been played and the temporary board has been
  // updated, see if the new position takes the King into check and return
  // the opposite of it (as the opposite of being checked is being safe)
  if (color === 'w') {
    return !isCheck(whiteKingsPosition, 'w', updatedBoardMap);
  }
  if (color === 'b') {
    return !isCheck(blackKingsPosition, 'b', updatedBoardMap);
  }
};
/**
 * Function that checks in a file according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "up" or "down"
 */
const checkVertically = (file, rank, color, direction, boardMap) => {
  let isCheck = false;
  let objectedSquareInfo = {
    square: '',
    piece: '',
    color: '',
  };
  // Check if any piece is on the way
  if (direction === 'up') {
    objectedSquareInfo = checkThroughFile(rank, '8', file, boardMap);
  }
  else if (direction === 'down') {
    objectedSquareInfo = checkThroughFile(rank, '1', file, boardMap);
    if (color === 'w' && objectedSquareInfo.piece === 'K') {
      objectedSquareInfo = checkThroughFile((parseInt(rank) - 2).toString(), '1', file, boardMap);
    }
    if (color === 'b' && objectedSquareInfo.piece === 'k') {
      objectedSquareInfo = checkThroughFile((parseInt(rank) - 2).toString(), '1', file, boardMap);
    }
  }
  // Check if the objected piece is on the adjaent square
  if (isAdjacent(file + rank, objectedSquareInfo.square)) {
    // Check if any enemy King, Queen or Rook is on the way
    isCheck = evaluateCheck(objectedSquareInfo.piece, color, objectedSquareInfo.color, ['Q', 'R', 'K'], ['q', 'r', 'k']);
    if (isCheck) {
      return true;
    }
  }
  // Check if any enemy Queen or Rook is on the way across squares
  isCheck = evaluateCheck(objectedSquareInfo.piece, color, objectedSquareInfo.color, ['Q', 'R'], ['q', 'r']);
  if (isCheck) {
    return true;
  }
  // If none of the checks returned true, then there is no check
  return false;
};
/**
 * Function that checks in a rank according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "right" or "left"
 */
const checkHorizontally = (file, rank, color, direction, boardMap) => {
  let isCheck = false;
  let objectedSquareInfo = {
    square: '',
    piece: '',
    color: '',
  };
  // Check if any piece is on the way
  if (direction === 'left') {
    objectedSquareInfo = checkThroughRank(file, 'a', rank, boardMap);
  }
  else if (direction === 'right') {
    objectedSquareInfo = checkThroughRank(file, 'h', rank, boardMap);
  }
  // Check if the objected piece is on the adjaent square
  if (isAdjacent(file + rank, objectedSquareInfo.square)) {
    // Check if any enemy King, Queen or Rook is on the way
    isCheck = evaluateCheck(objectedSquareInfo.piece, color, objectedSquareInfo.color, ['Q', 'R', 'K'], ['q', 'r', 'k']);
    if (isCheck) {
      return true;
    }
  }
  // Check if any enemy Queen or Rook is on the way across squares
  isCheck = evaluateCheck(objectedSquareInfo.piece, color, objectedSquareInfo.color, ['Q', 'R'], ['q', 'r']);
  if (isCheck) {
    return true;
  }
  // If none of the checks returned true, then there is no check
  return false;
};
/**
 *Function that retrives a piece from the boardMap object with the given
 file and rank information as unicode value and integers respectively
 */
const pieceAt = (fileUnicode, rankNum, boardMap) => {
  // If the file or the rank is out of bounds of the board, return an empty string
  if (rankNum > 8 ||
    rankNum < 1 ||
    fileUnicode > 'h'.charCodeAt(0) ||
    fileUnicode < 'a'.charCodeAt(0)) {
    return '';
  }
  return boardMap[String.fromCharCode(fileUnicode)][rankNum.toString()];
};
/**
 * Fynction that checks if an enemy Knight can give a check to the King
 * from any direction
 */
const isCheckFromKnight = (file, rank, color, boardMap) => {
  const fileUnicode = file.charCodeAt(0);
  const rankNum = parseInt(rank);
  // Check if any Knight can check the King from any direction
  if (color === 'w') {
    if (pieceAt(fileUnicode + 1, rankNum + 2, boardMap) === 'n')
      return true;
    if (pieceAt(fileUnicode - 1, rankNum + 2, boardMap) === 'n')
      return true;
    if (pieceAt(fileUnicode + 1, rankNum - 2, boardMap) === 'n')
      return true;
    if (pieceAt(fileUnicode - 1, rankNum - 2, boardMap) === 'n')
      return true;
    if (pieceAt(fileUnicode + 2, rankNum + 1, boardMap) === 'n')
      return true;
    if (pieceAt(fileUnicode - 2, rankNum + 1, boardMap) === 'n')
      return true;
    if (pieceAt(fileUnicode + 2, rankNum - 1, boardMap) === 'n')
      return true;
    if (pieceAt(fileUnicode - 2, rankNum - 1, boardMap) === 'n')
      return true;
    return false;
  }
  if (color === 'b') {
    if (pieceAt(fileUnicode + 1, rankNum + 2, boardMap) === 'N')
      return true;
    if (pieceAt(fileUnicode - 1, rankNum + 2, boardMap) === 'N')
      return true;
    if (pieceAt(fileUnicode + 1, rankNum - 2, boardMap) === 'N')
      return true;
    if (pieceAt(fileUnicode - 1, rankNum - 2, boardMap) === 'N')
      return true;
    if (pieceAt(fileUnicode + 2, rankNum + 1, boardMap) === 'N')
      return true;
    if (pieceAt(fileUnicode - 2, rankNum + 1, boardMap) === 'N')
      return true;
    if (pieceAt(fileUnicode + 2, rankNum - 1, boardMap) === 'N')
      return true;
    if (pieceAt(fileUnicode - 2, rankNum - 1, boardMap) === 'N')
      return true;
    return false;
  }
};
/**
 * Funtion that checks if the King is in check by an enemy pawn.
 * @param direction must be either "right-up", "left-up", "right-down"
 * or "left-down"
 */
const isCheckFromPawn = (color, pawn, direction) => {
  // If a black pawn is digonally above the white King, it is a check
  if (color === 'w' &&
    pawn === 'p' &&
    (direction === 'right-up' || direction === 'left-up')) {
    return true;
  }
  // If a white pawn is digonally below the black King, it is a check
  else if (color === 'b' &&
    pawn === 'P' &&
    (direction === 'right-down' || direction === 'left-down')) {
    return true;
  }
  // If none of the checks returned true, then there is no check
  return false;
};
/**
 * Function that checks diagonally according to the given direction if there are
 * any piece on the way which can give the King a check
 * @param direction must be either "right-up", "left-up", "right-down"
 * or "left-down"
 */
const checkDiagonally = (file, rank, color, direction, boardMap) => {
  // Get the diagonal edge for a given direction
  let [diagonalEdgeFile, diagonalEdgeRank] = getDiagonalEdge(file + rank, direction);
  let isCheck = false;
  let objectedSquareInfo = {
    square: '',
    piece: '',
    color: '',
  };
  // Check if an enemy piece is on the way through the diagonal
  objectedSquareInfo = checkThroughDiagonals(file, diagonalEdgeFile, rank, diagonalEdgeRank, boardMap);
  // Check if the objected piece is on the adjaent square
  if (isAdjacent(file + rank, objectedSquareInfo.square)) {
    // Check if there is any check from a Pawn
    if (isCheckFromPawn(color, objectedSquareInfo.piece, direction)) {
      return true;
    }
    // Check if any enemy King, Queen or Bishop is on the way
    isCheck = evaluateCheck(objectedSquareInfo.piece, color, objectedSquareInfo.color, ['Q', 'B', 'K'], ['q', 'b', 'k']);
    if (isCheck) {
      return true;
    }
  }
  // Check if any enemy Queen or Bishop is on the way across squares
  isCheck = evaluateCheck(objectedSquareInfo.piece, color, objectedSquareInfo.color, ['Q', 'B'], ['q', 'b']);
  if (isCheck) {
    return true;
  }
  // If none of the checks returned true, then there is no check
  return false;
};
/**
 * Function that checks if the King is in check in any given square
 */
const isCheck = (square, color, boardMap) => {
  // Get the file and rank of the square
  const [file, rank] = getFileAndRank(square);
  // Check vertically for an enemy King, Rook or Queen
  if (checkVertically(file, rank, color, 'up', boardMap))
    return true;
  if (checkVertically(file, rank, color, 'down', boardMap))
    return true;
  // Check horizontally for an enemy King, Rook or Queen
  if (checkHorizontally(file, rank, color, 'right', boardMap))
    return true;
  if (checkHorizontally(file, rank, color, 'left', boardMap))
    return true;
  // Check diagonally for an enemy Pawm, King, Bishop or Queen
  if (checkDiagonally(file, rank, color, 'right-up', boardMap))
    return true;
  if (checkDiagonally(file, rank, color, 'right-down', boardMap))
    return true;
  if (checkDiagonally(file, rank, color, 'left-up', boardMap))
    return true;
  if (checkDiagonally(file, rank, color, 'left-down', boardMap))
    return true;
  // Check for an enemy Knight
  if (isCheckFromKnight(file, rank, color, boardMap))
    return true;
  // If none of the checks returned true, that means the King is not in check
  return false;
};

/**
 * Function to check if a Pawn move is en passant.This does not heck the legality
 * of the move (like if the Pawn can en passant or not)
 */
const isEnPassant = (destFile, originRank, destRank, color, boardMap) => {
  if (color === 'w') {
    // White Pawns can only en passant from the 5th rank to the 6th rank
    if (originRank !== '5' || destRank !== '6') {
      return false;
    }
    // There must a black Pawn adjacent to the white Pawns origin square
    if (boardMap[destFile][originRank] !== 'p') {
      return false;
    }
    return true;
  }
  else if (color === 'b') {
    // Black Pawns can only en passant from the 4th rank to the 3rd rank
    if (originRank !== '4' || destRank !== '3') {
      return false;
    }
    // There must a white Pawn adjacent to the black Pawns origin square
    if (boardMap[destFile][originRank] !== 'P') {
      return false;
    }
    return true;
  }
};
const getEnPassantSquare = (square, piece, documentHTML) => {
  if (getPieceColor(piece) === 'w') {
    const enPassantedSquareId = square[0] + (parseInt(square[1]) - 1).toString();
    const enPassantedSquare = documentHTML.querySelector(`#${enPassantedSquareId}`);
    return enPassantedSquare;
  }
  else if (getPieceColor(piece) === 'b') {
    const enPassantedSquareId = square[0] + (parseInt(square[1]) + 1).toString();
    const enPassantedSquare = documentHTML.querySelector(`#${enPassantedSquareId}`);
    return enPassantedSquare;
  }
};
const isCastle = (origin, dest, color, boardMap, canWhiteCastleKingSide, canWhiteCastleQueenSide, canBlackCastleKingSide, canBlackCastleQueenSide) => {
  if (color === 'w') {
    if (origin !== 'e1' ||
      !(dest === 'g1' || dest === 'h1' || dest === 'c1' || dest === 'a1') ||
      !(boardMap['h']['1'] === 'R' || boardMap['a']['1'] === 'R')) {
      return false;
    }
    // Validate Kingside castle
    if (dest === 'g1' || dest === 'h1') {
      if (!canWhiteCastleKingSide) {
        return false;
      }
      // The castlingsquares must be empty
      if (boardMap['f']['1'] !== '' || boardMap['g']['1'] !== '') {
        return false;
      }
      // <ale sure that the castling squares are not checked by amy piece
      const isF1Checked = isCheck('f1', 'w', boardMap);
      const isG1Checked = isCheck('g1', 'w', boardMap);
      if (isF1Checked || isG1Checked) {
        return false;
      }
      return true;
    }
    // Validate Queenside castle
    if (dest === 'c1' || dest === 'a1') {
      if (!canWhiteCastleQueenSide) {
        return false;
      }
      // The castlingsquares must be empty
      if (boardMap['d']['1'] !== '' || boardMap['c']['1'] !== '') {
        return false;
      }
      // <ale sure that the castling squares are not checked by amy piece
      const isD1Checked = isCheck('d1', 'w', boardMap);
      const isC1Checked = isCheck('c1', 'w', boardMap);
      if (isD1Checked || isC1Checked) {
        return false;
      }
      return true;
    }
  }
  else if (color === 'b') {
    if (origin !== 'e8' ||
      !(dest === 'g8' || dest === 'h8' || dest === 'c8' || dest === 'a8') ||
      !(boardMap['h']['8'] === 'r' || boardMap['a']['8'] === 'r')) {
      return false;
    }
    // Validate Kingside castle
    if (dest === 'g8' || dest === 'h8') {
      if (!canBlackCastleKingSide) {
        return false;
      }
      // The castlingsquares must be empty
      if (boardMap['f']['8'] !== '' || boardMap['g']['8'] !== '') {
        return false;
      }
      // <ale sure that the castling squares are not checked by amy piece
      const isF8Checked = isCheck('f8', 'b', boardMap);
      const isG8Checked = isCheck('g8', 'b', boardMap);
      if (isF8Checked || isG8Checked) {
        return false;
      }
      return true;
    }
    // Validate Queenside castle
    if (dest === 'c8' || dest === 'a8') {
      if (!canBlackCastleQueenSide) {
        return false;
      }
      // The castlingsquares must be empty
      if (boardMap['d']['8'] !== '' || boardMap['c']['8'] !== '') {
        return false;
      }
      // <ale sure that the castling squares are not checked by amy piece
      const isD8Checked = isCheck('d8', 'b', boardMap);
      const isC8Checked = isCheck('c8', 'b', boardMap);
      if (isD8Checked || isC8Checked) {
        return false;
      }
      return true;
    }
  }
};
/**
 * Function that returns the origin and desination squares of the King and the Rook castling
 * as Element
 */
const getCastlingSquares = (piece, dest, documentHTML) => {
  let KingsOrigin;
  let KingsDest;
  let RooksOrigin;
  let RooksDest;
  if (piece === 'K') {
    KingsOrigin = documentHTML.querySelector('#e1');
    if (dest === 'g1' || dest === 'h1') {
      // if the white King is castling Kingside, its destination square should be g1
      // and the Rook should go to f1
      KingsDest = documentHTML.querySelector('#g1');
      RooksOrigin = documentHTML.querySelector('#h1');
      RooksDest = documentHTML.querySelector('#f1');
    }
    else if (dest === 'c1' || dest === 'a1') {
      // if the white King is castling Queenside, its destination square should be c1
      // and the Rook should go to d1
      KingsDest = documentHTML.querySelector('#c1');
      RooksOrigin = documentHTML.querySelector('#a1');
      RooksDest = documentHTML.querySelector('#d1');
    }
  }
  else if (piece === 'k') {
    KingsOrigin = documentHTML.querySelector('#e8');
    if (dest === 'g8' || dest === 'h8') {
      // if the black King is castling Kingside, its destination square should be g8
      // and the Rook should go to f8
      KingsDest = documentHTML.querySelector('#g8');
      RooksOrigin = documentHTML.querySelector('#h8');
      RooksDest = documentHTML.querySelector('#f8');
    }
    else if (dest === 'c8' || dest === 'a8') {
      // if the black King is castling Queenside, its destination square should be c8
      // and the Rook should go to d8
      KingsDest = documentHTML.querySelector('#c8');
      RooksOrigin = documentHTML.querySelector('#a8');
      RooksDest = documentHTML.querySelector('#d8');
    }
  }
  return [KingsOrigin, KingsDest, RooksOrigin, RooksDest];
};
/**
 * Function that returns if Pawn move is a Pawn promotion
 */
const isPromotion = (color, destRank) => {
  // Pawns can only promote on the 8th and the 1st square (for white and black
  // respectively)
  if (!(destRank === '8' || destRank === '1'))
    return false;
  if (color === 'w' && destRank === '8')
    return true;
  if (color === 'b' && destRank === '1')
    return true;
  return false;
};
/**
 * Function that returns an HTML element for the list for the pieces a Pawn can promote to
 * according to its color
 */
const createPawnPromotionHtmlElement = (rank) => {
  // Create HTML string for both the colors
  const whitePromotionHtml = `<div class='promotion-list'>
       <img id="Q" alt='white queen' class="piece promoting-piece" src=${'../assets/WQ.svg.png'}>
       <img id="R" alt='white rook' class="piece promoting-piece" src=${'../assets/WR.svg.png'}>
       <img id="B" alt='white bishop' class="piece promoting-piece" src=${'../assets/WB.svg.png'}>
       <img id="N" alt='white knight' class="piece promoting-piece" src=${'../assets/WN.svg.png'}>
     </div>`;
  const blackPromotionHtml = `<div class='promotion-list'>
      <img id="n" alt='black knight' class="piece promoting-piece" src=${'../assets/bn.svg.png'}>
      <img id="b" alt='black bishop' class="piece promoting-piece" src=${'../assets/bb.svg.png'}>
      <img id="r" alt='black rook' class="piece promoting-piece" src=${'../assets/br.svg.png'}>
      <img id="q" alt='black queen' class="piece promoting-piece" src=${'../assets/bq.svg.png'}>
     </div>`;
  // Add the HTML strings above to a Wrapper element
  // and extract it to return it as an individual element
  const Wrapper = document.createElement('div');
  if (rank === '8') {
    Wrapper.innerHTML = whitePromotionHtml;
    return Wrapper.firstElementChild;
  }
  if (rank === '1') {
    Wrapper.innerHTML = blackPromotionHtml;
    return Wrapper.firstElementChild;
  }
};

/**
 * The main move validator class that contains the methods for validating
 * all the moves and contains all the states of the game
 */
class Validator {
  constructor() {
    // Declarations of properties that will hold various states of the game
    this.boardMap = fenToBoardMap();
    this.whitesTurn = true;
    this.movingPiece = '';
    this.movingPiecesOrigin = '';
    this.movingPiecesDest = '';
    this.movingPiecesColor = '';
    this.canWhiteEnPassant = [false, ''];
    this.canBlackEnPassant = [false, ''];
    this.canWhiteCastleKingSide = true;
    this.canWhiteCastleQueenSide = true;
    this.canBlackCastleKingSide = true;
    this.canBlackCastleQueenSide = true;
    this.IsPromoting = false;
    this.whiteKingsPosition = 'e1';
    this.blackKingsPosition = 'e8';
  }
  /**
   * Method to run after a Pawn promotion that updates the game's states
   */
  PromotePawn(pieceToPromoteTo) {
    // Update the board map
    const updatedBoardMap = updateBoardMap(pieceToPromoteTo, this.movingPiecesOrigin, this.movingPiecesDest, this.boardMap);
    this.boardMap = JSON.parse(JSON.stringify(updatedBoardMap));
    // Toggle the color's turn
    this.whitesTurn = !this.whitesTurn;
  }
  /**
   * Method to run after each move that updates the game's states
   */
  newMove() {
    // Update the board map
    const updatedBoardMap = updateBoardMap(this.movingPiece, this.movingPiecesOrigin, this.movingPiecesDest, this.boardMap);
    this.boardMap = JSON.parse(JSON.stringify(updatedBoardMap));
    // Toggle the color's turn
    this.whitesTurn = !this.whitesTurn;
  }
  /**
   Validator method that takes in a piece and runs the corresponding validator
   function for that piece
  */
  ValidateMove(origin, dest, piece) {
    // Initialize the return values
    let isValid = false;
    let isEnPassant = false;
    let isCastle = false;
    let isPromotion = false;
    if (origin === dest) {
      return { isValid, isEnPassant, isCastle, isPromotion };
    }
    // Temporarily change the movingPieceColor to the moving piece's color
    // If the move is invalid, thecolor will be changed back to the previous one
    // tempHoldColor holds the previous color value
    let tempColor = this.movingPiecesColor;
    this.movingPiecesColor = getPieceColor(piece);
    // Check if the moving piece matches the appropriate color's turn
    if (this.whitesTurn && this.movingPiecesColor !== 'w') {
      return { isValid, isEnPassant, isCastle, isPromotion };
    }
    else if (!this.whitesTurn && this.movingPiecesColor !== 'b') {
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
        ({ isValid, isEnPassant, isPromotion } = this.validatePawnMove(origin, dest, `w`));
        break;
      case 'p':
        ({ isValid, isEnPassant, isPromotion } = this.validatePawnMove(origin, dest, `b`));
        break;
    }
    if (isValid) {
      // Take away the King's castling rights after it moves and updates its position
      if (piece === 'K') {
        this.whiteKingsPosition = dest;
        this.canWhiteCastleKingSide = false;
        this.canWhiteCastleQueenSide = false;
      }
      else if (piece === 'k') {
        this.blackKingsPosition = dest;
        this.canBlackCastleKingSide = false;
        this.canBlackCastleQueenSide = false;
      }
      // Copy of the boardMap to temprarily make the move and update the board
      const tempBoardMap = JSON.parse(JSON.stringify(this.boardMap));
      // Check if the King would be safe if the move is played
      // If the King is not safe, the move is not valid
      const isKingSafeAfterTheMove = isSafe(piece, origin, dest, this.whiteKingsPosition, this.blackKingsPosition, tempBoardMap);
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
          }
          else if (dest === 'c1' || dest === 'a1') {
            this.boardMap['c']['1'] = 'K';
            this.boardMap['d']['1'] = 'R';
            this.boardMap['a']['1'] = '';
          }
        }
        else if (piece === 'k') {
          this.boardMap['e']['8'] = '';
          if (dest === 'g8' || dest === 'h8') {
            this.boardMap['g']['8'] = 'k';
            this.boardMap['f']['8'] = 'r';
            this.boardMap['h']['8'] = '';
          }
          else if (dest === 'c8' || dest === 'a8') {
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
        }
        else if (piece === 'p') {
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
  validatePawnMove(origin, dest, color) {
    // Get the file and rank information and check they are correct
    const fileAndRankArray = getOriginAndDestInfo(origin, dest);
    let isValid = false;
    let isEnPassant$1 = false;
    let isPromotion$1 = false;
    if (fileAndRankArray.includes(null)) {
      console.log('invalid square input');
      return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
    }
    // Get the information of the origin and destination squares and their differences
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;
    const [fileDifference, rankDifference] = getFileAndRankDifferences(originFile, originRank, destFile, destRank);
    // A Pawn cammot move diagonally or vertically more than 1 square
    if (fileDifference > 1 || rankDifference > 2) {
      return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
    }
    let objectedPieceColor = '';
    isEnPassant$1 = isEnPassant(destFile, originRank, destRank, color, this.boardMap);
    isPromotion$1 = isPromotion(color, destRank);
    if (color === 'w') {
      // Pawns can only move 2 squares from their initial position
      if (rankDifference === 2 && originRank !== '2') {
        return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
      }
      // White Pawns can only move up
      if (!(parseInt(destRank) > parseInt(originRank))) {
        return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
      }
      if (fileDifference === rankDifference) {
        if (isEnPassant$1 &&
          this.canWhiteEnPassant[0] &&
          this.boardMap[destFile][destRank] === '' &&
          destFile === this.canWhiteEnPassant[1]) {
          this.canWhiteEnPassant = [false, ''];
          isValid = true;
          return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
        }
        // A Pawn can only move diagonally if it is capturing an enemy piece
        if (getPieceColor(this.boardMap[destFile][destRank]) === 'b') {
          isValid = true;
          return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
        }
        else {
          return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
        }
      }
      objectedPieceColor = checkThroughFile(originRank, destRank, originFile, this.boardMap).color;
      // Pawns can only move forward if the square is empty
      if (objectedPieceColor !== '') {
        return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
      }
    }
    else if (color === 'b') {
      // Pawns can only move 2 squares from their initial position
      if (rankDifference === 2 && originRank !== '7') {
        return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
      }
      // Black Pawns can only move down
      if (!(parseInt(destRank) < parseInt(originRank))) {
        return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
      }
      if (fileDifference === rankDifference) {
        if (isEnPassant$1 &&
          this.canBlackEnPassant[0] &&
          this.boardMap[destFile][destRank] === '' &&
          destFile === this.canBlackEnPassant[1]) {
          this.canBlackEnPassant = [false, ''];
          isValid = true;
          return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
        }
        // A Pawn can only move diagonally if it is capturing an enemy piece
        if (getPieceColor(this.boardMap[destFile][destRank]) === 'w') {
          isValid = true;
          return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
        }
        else {
          return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
        }
      }
      objectedPieceColor = checkThroughFile(originRank, destRank, originFile, this.boardMap).color;
      // Pawns can only move forward if the square is empty
      if (objectedPieceColor !== '') {
        return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
      }
    }
    if (rankDifference === 2) {
      if (color === 'w') {
        this.canBlackEnPassant = [true, originFile];
      }
      else if (color === 'b') {
        this.canWhiteEnPassant = [true, originFile];
      }
    }
    else {
      this.canWhiteEnPassant = [false, ''];
      this.canBlackEnPassant = [false, ''];
    }
    isValid = true;
    return { isValid, isEnPassant: isEnPassant$1, isPromotion: isPromotion$1 };
  }
  /**
   * Validator method for the Knight that checks if
   * the square the Knight is trying to move to is legal
   */
  validateKnightMove(origin, dest, color) {
    // Get the file and rank information and check they are correct
    const fileAndRankArray = getOriginAndDestInfo(origin, dest);
    if (fileAndRankArray.includes(null)) {
      console.log('invalid square input');
      return false;
    }
    // Get the information of the origin and destination squares
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;
    const [fileDifference, rankDifference] = getFileAndRankDifferences(originFile, originRank, destFile, destRank);
    // Check that the Knight can only move in an L shape
    if (!((fileDifference === 1 && rankDifference === 2) ||
      (fileDifference === 2 && rankDifference === 1))) {
      return false;
    }
    // Check if thereis any piece on the destination square
    // and get its color
    const destPieceColor = getPieceColor(this.boardMap[destFile][destRank]);
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
  validateQueenMove(origin, dest, color) {
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
  validateKingMove(origin, dest, color) {
    let isValid = false;
    // Get the file and rank information and check they are correct
    const fileAndRankArray = getOriginAndDestInfo(origin, dest);
    // Get the information of the origin and destination squares and their differences
    const [originFile, originRank, destFile, destRank] = fileAndRankArray;
    const [fileDifference, rankDifference] = getFileAndRankDifferences(originFile, originRank, destFile, destRank);
    // Check if the move is a castling move
    const isCastle$1 = isCastle(origin, dest, color, this.boardMap, this.canWhiteCastleKingSide, this.canWhiteCastleQueenSide, this.canBlackCastleKingSide, this.canBlackCastleQueenSide);
    // If the move is more than one square then it is an illegal move
    if (rankDifference > 1) {
      return { isValid, isCastle: isCastle$1 };
    }
    // The King can only move 2 files if it is a castling move
    if (fileDifference > 1) {
      if (isCastle$1) {
        isValid = true;
        return { isValid, isCastle: isCastle$1 };
      }
      return { isValid, isCastle: isCastle$1 };
    }
    /*
    The King moves exactly like the Queen except for only one square.
    So, after the one square rule is validated, the Queen's validator can be used
    for the King's move
     */
    isValid = this.validateQueenMove(origin, dest, color);
    if (!isValid) {
      return { isValid, isCastle: isCastle$1 };
    }
    if (isCheck(dest, color, this.boardMap)) {
      isValid = false;
      return { isValid, isCastle: isCastle$1 };
    }
    // if none of checks returned false, that means the move is valid
    return { isValid, isCastle: isCastle$1 };
  }
  /**
   * Validator method for the Bishop that checks if
   * the square the Bishop is trying to move to is legal
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
    // This makes sure the pieces cannot jump over the enemy pieces
    if (objectedSquareInfo.color !== '' &&
      objectedSquareInfo.color !== color &&
      objectedSquareInfo.square !== dest) {
      return false;
    }
    // if none of checks returned false, that means the move is valid
    return true;
  }
  /**
   * Validator method for the Rook that checks if
   * the square the Rook is trying to move to is legal
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
      // This makes sure the pieces cannot jump over the enemy pieces
      if (objectedSquareInfo.color !== '' &&
        objectedSquareInfo.color !== color &&
        objectedSquareInfo.square !== dest) {
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
      // This makes sure the pieces cannot jump over the enemy pieces
      if (objectedSquareInfo.color !== '' &&
        objectedSquareInfo.color !== color &&
        objectedSquareInfo.square !== dest) {
        return false;
      }
    }
    // If the Rook moves from its original square, take awau the
    // castling rights of the King according to which Rook moved
    if (origin === 'a1')
      this.canWhiteCastleQueenSide = false;
    if (origin === 'h1')
      this.canWhiteCastleKingSide = false;
    if (origin === 'a8')
      this.canBlackCastleQueenSide = false;
    if (origin === 'h8')
      this.canBlackCastleKingSide = false;
    // if none of checks returned false, that means the move is valid
    return true;
  }
}

/**
 * Event listener function for the 'dragstart' event. This adds the 'dragging'
 * and 'invisible' class to the dragged piece
 */
const dragStart = (piece) => {
  setTimeout(() => {
    piece.classList.add('dragging', 'invisible');
  }, 0);
};
/**
 * Event listener function for the 'dragend' event. This removes the 'dragging'
 * and 'invisible' class to the dragged piece
 */
const dragEnd = (piece) => {
  piece.classList.remove('dragging', 'invisible');
};
/**
 * Event listener function for the 'drop' event. This checks if the move is valid
 * with the provided validator class and drops the piece on the square if it is
 * valid.This also takes care of special moves like 'en passant', 'castling' and
 * 'Pawn promotion'
 */
const dropPiece = (square, boardHtml, validator) => {
  // Get the HTML element being dragged
  const pieceBeingDragged = boardHtml.querySelector('.dragging');
  // Get the info for the piece, its origin and destination square
  const originSquare = pieceBeingDragged.parentElement.id;
  const destSquare = square.id;
  const piece = pieceBeingDragged.id;
  // Validate the move
  const { isValid, isEnPassant, isCastle, isPromotion } = validator.ValidateMove(originSquare, destSquare, piece);
  if (isValid) {
    // Get the square where the opposite Pawn moved 2 squares tp (which can get en passanted)
    // and remove that Pawn
    if (isEnPassant) {
      const enPassantSquare = getEnPassantSquare(destSquare, piece, boardHtml);
      enPassantSquare.innerHTML = '';
      square.appendChild(pieceBeingDragged);
      pieceBeingDragged.classList.remove('dragging');
      return;
    }
    // If the move is a castling move, change the King and the Rook's
    // positions accordingly
    if (isCastle && (piece === 'K' || piece === 'k')) {
      const [KingsOrigin, KingsDest, RooksOrigin, RooksDest] = getCastlingSquares(piece, destSquare, boardHtml);
      KingsOrigin.innerHTML = '';
      KingsDest.appendChild(pieceBeingDragged);
      const Rook = RooksOrigin.firstElementChild;
      RooksOrigin.innerHTML = '';
      RooksDest.appendChild(Rook);
      pieceBeingDragged.classList.remove('dragging');
      return;
    }
    if (isPromotion) {
      // Toggle the IsPromoting state to true
      validator.IsPromoting = true;
      // Delete the pawn from the square it was on before the promotion
      pieceBeingDragged.remove();
      const promotionRank = destSquare[1];
      const promotionRankElement = square.parentElement;
      // For the black Pawn's promotion, the list will be displayed
      // starting from 3 squares above so that list ends on the promotion
      // square. Get the temprary elements and its info if only the
      // promoting pawn is a black Pawn
      let temporaryReplaceSquareRank = '';
      let temporaryReplaceSquare;
      let temporaryReplaceRankElement;
      if (piece === 'p') {
        temporaryReplaceSquareRank = (parseInt(destSquare[1]) + 3).toString();
        temporaryReplaceSquare = boardHtml.querySelector(`#${destSquare[0] + temporaryReplaceSquareRank}`);
        temporaryReplaceRankElement = temporaryReplaceSquare.parentElement;
      }
      // Get the list of the pieces that cane be promoted to and replace it with
      // with the appropriate square
      const list = createPawnPromotionHtmlElement(promotionRank);
      piece === 'P'
        ? promotionRankElement.replaceChild(list, square)
        : temporaryReplaceRankElement.replaceChild(list, temporaryReplaceSquare);
      // This event listner runs when a piece from the list is clicked
      list.addEventListener('click', (e) => {
        // Get the selected piece, remove its promoting class and
        // add the same attributes as a normal piece
        const pieceToPromoteTo = e.target;
        pieceToPromoteTo.classList.remove('promoting-piece');
        pieceToPromoteTo.setAttribute('draggable', 'true');
        // Set the same dragging event listeners to the promoted piece as a normal piece
        pieceToPromoteTo.addEventListener('dragstart', () => {
          dragStart(pieceToPromoteTo);
        });
        pieceToPromoteTo.addEventListener('dragend', () => {
          dragEnd(pieceToPromoteTo);
        });
        // Add the promoted piece to its promoted square and replace the
        // list element with original square element according to color
        square.innerHTML = '';
        square.appendChild(pieceToPromoteTo);
        piece === 'P'
          ? promotionRankElement.replaceChild(square, list)
          : temporaryReplaceRankElement.replaceChild(temporaryReplaceSquare, list);
        // Update the boardMap with the new promoted piece
        validator.PromotePawn(pieceToPromoteTo.id);
        // Toggle the IsPromoting state to false
        validator.IsPromoting = false;
      });
      return;
    }
    square.innerHTML = '';
    square.appendChild(pieceBeingDragged);
    pieceBeingDragged.classList.remove('dragging');
    return;
  }
  if (!(pieceBeingDragged.parentElement.id === square.id)) {
    pieceBeingDragged.classList.remove('dragging');
  }
};

const analysisBoardCss = "#analysis-board-container{position:relative;width:400px;height:400px;border:1px solid black}.row{display:flex;flex-direction:row;width:100%;height:50px}.promotion-list{display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:10;height:200px;width:50px}.square{width:50px;height:50px;border:0.1px black}.list-squares{width:50px;height:50px;border:0.1px black;background-color:lightgray}.piece{display:flex;justify-content:center;align-items:center;touch-action:none;cursor:grab;cursor:move}.promoting-piece{background-color:gray}.piece:active{cursor:grabbing}.dragging{transform:scale(1.2);transition:0.2s ease-in-out}.invisible{display:none}@media (max-width: 550px){#analysis-board-container{width:360px;height:360px}.row{height:45px}.square{width:45px;height:45px}.piece{height:40px}}";

const AnalysisBoard$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    // An instance of the Validator class for move validation
    this.validator = new Validator();
    this.light = '#E0C35A';
    this.dark = '#7A6A31';
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
      piece.addEventListener('dragstart', () => {
        dragStart(piece);
      });
      piece.addEventListener('dragend', () => {
        dragEnd(piece);
      });
      piece.addEventListener('click', () => {
        if (piece.classList.contains('dragging')) {
          piece.classList.remove('dragging');
          return;
        }
        const otherHighlightedPiece = this.analysisBoardContainer.querySelector('.dragging');
        if (otherHighlightedPiece !== null) {
          const parentSquare = otherHighlightedPiece.parentElement;
          dropPiece(parentSquare, this.analysisBoardContainer, this.validator);
          return;
        }
        piece.classList.add('dragging');
      });
    });
    // Add drag and drop event listeners to each square
    squares.forEach((square) => {
      // Allow dropping on the square by preventing the default behavior
      square.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      square.addEventListener('drop', (e) => {
        e.preventDefault();
        dropPiece(square, this.analysisBoardContainer, this.validator);
      });
      square.addEventListener('click', () => {
        const movingPiece = this.analysisBoardContainer.querySelector('.dragging');
        if (movingPiece === null)
          return;
        dropPiece(square, this.analysisBoardContainer, this.validator);
      });
    });
  }
  render() {
    return (h("div", { ref: (el) => (this.analysisBoardContainer = el), id: "analysis-board-container" }));
  }
  static get style() { return analysisBoardCss; }
}, [1, "analysis-board", {
    "light": [1025],
    "dark": [1025]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["analysis-board"];
  components.forEach(tagName => { switch (tagName) {
    case "analysis-board":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AnalysisBoard$1);
      }
      break;
  } });
}

const AnalysisBoard = AnalysisBoard$1;
const defineCustomElement = defineCustomElement$1;

export { AnalysisBoard, defineCustomElement };
