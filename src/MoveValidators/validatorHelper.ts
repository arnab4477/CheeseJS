import { BoardType } from '../BoardTypes';

/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving diagonally.
 * Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves diagonally
 * like the Queen, Bishop, King and the Pawn (while capturing)
 */
export const checkThroughDiagonals = (
  originFile: string,
  destFile: string,
  originRank: string,
  destRank: string,
  boardMap: BoardType
): { square: string; piece: string; color: string } => {
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
  let square: string = ``;
  let piece: string = ``;
  let color: string = ``;

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
      } else {
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
      } else {
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
      } else {
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
      } else {
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
export const checkThroughFile = (
  originRank: string,
  destRank: string,
  file: string,
  boardMap: BoardType
): { square: string; piece: string; color: string } => {
  // Convert the rank characters to numbers
  const originRankNum = parseInt(originRank);
  const destRankNum = parseInt(destRank);

  // The origin square will not be checked so add or subtract 1
  // from the starting rank to look from the next or previous rank respectively
  let nextRank = originRankNum + 1;
  let prevRank = originRankNum - 1;

  // Initialize the return values that will hold the data for the piece and
  // its square
  let square: string = ``;
  let piece: string = ``;
  let color: string = ``;

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
      } else {
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
      } else {
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
export const checkThroughRank = (
  originFile: string,
  destFile: string,
  rank: string,
  boardMap: BoardType
): { square: string; piece: string; color: string } => {
  // Get the unicode value of the files
  let originFileUnicode: number = originFile.charCodeAt(0);
  let destFileUnicode: number = destFile.charCodeAt(0);

  // The origin square will not be checked so add or subtract 1
  // from the starting file to look from the next or previous file respectively
  let nextFileUnicode: number = originFileUnicode + 1;
  let prevFileUnicode: number = originFileUnicode - 1;

  // Initialize the return values that will hold the data for the piece and
  // its square
  let square: string = ``;
  let piece: string = ``;
  let color: string = ``;

  // If the piece is moving from left to right (eg: a1 to h1)
  if (originFileUnicode < destFileUnicode) {
    for (
      nextFileUnicode;
      nextFileUnicode <= destFileUnicode;
      nextFileUnicode++
    ) {
      // Get the square and piece data
      square = String.fromCharCode(nextFileUnicode) + rank;
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);

      if (piece === '') {
        // If there is no piece on the way
        continue;
      } else {
        // This means there is a piece on the way
        break;
      }
    }
  }
  // If the piece is moving from right to left (eg: h1 to a1)
  else {
    for (
      prevFileUnicode;
      prevFileUnicode >= destFileUnicode;
      prevFileUnicode--
    ) {
      // Get the square and piece data
      square = String.fromCharCode(prevFileUnicode) + rank;
      piece = boardMap[square[0]][square[1]];
      color = getPieceColor(piece);
      if (piece === '') {
        // If there is no piece on the way
        continue;
      } else {
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
export const updateBoardMap = (
  piece: string,
  origin: string,
  dest: string,
  boardMap: BoardType
): void => {
  const [originFile, originRank, destFile, destRank] = getOriginAndDestInfo(
    origin,
    dest
  );

  // Empty and original square and place the piece on the destination square
  boardMap[originFile][originRank] = '';
  boardMap[destFile][destRank] = piece;
};

export const getPieceColor = (piece: string): string => {
  if (piece === '') return '';

  // If the piece symbol is a lowercase character (like 'b') then
  // it is a black piece, else it is a white piece
  return piece.toLowerCase() === piece ? `b` : `w`;
};

/**
 * Method that retrieves the file names and rank numbers from the original
 * and destination squares and returnes them in an array
 */
export const getOriginAndDestInfo = (
  origin: string,
  dest: string
): (string | null)[] => {
  const [originFile, originRank] = getFileAndRank(origin);
  const [destFile, destRank] = getFileAndRank(dest);

  return [originFile, originRank, destFile, destRank];
};

/**
 * Method that returns the differnces between the origin file and thes
 * destination file and the same for the ranks in an array
 */
export const getFileAndRankDifferences = (
  originFile,
  originRank,
  destFile,
  destRank
): Array<number> => {
  const fileDifference: number = Math.abs(
    originFile.charCodeAt(0) - destFile.charCodeAt(0)
  );
  const rankDifference: number = Math.abs(
    parseInt(originRank) - parseInt(destRank)
  );

  return [fileDifference, rankDifference];
};

export const getFileAndRank = (square: string): (string | null)[] => {
  // If the square is malformatted
  if (square.length !== 2 && typeof parseInt(square[1]) !== 'number') {
    console.error('Invalid square given');
    return [null, null];
  }
  return [square[0], square[1]];
};
