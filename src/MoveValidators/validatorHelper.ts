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

  const maxFileUnicode = 'h'.charCodeAt(0);
  const minFileUnicode = 'a'.charCodeAt(0);
  const maxRankNum = 8;
  const minRankNum = 1;

  // Initialize the return values that will hold the data for the piece and
  // its square
  let square: string = ``;
  let piece: string = ``;
  let color: string = ``;

  // If the piece is going right and up, eg: e5 to h8
  if (destFileUnicode > originFileUnicode && destRankNum > originRankNum) {
    while (
      (nextFileUnicode <= destFileUnicode &&
        nextFileUnicode <= maxFileUnicode) ||
      (nextRankNum <= destRankNum && nextRankNum <= maxRankNum)
    ) {
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
    while (
      (nextFileUnicode <= destFileUnicode &&
        nextFileUnicode <= maxFileUnicode) ||
      (prevRankNum >= destRankNum && prevRankNum >= minRankNum)
    ) {
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
    while (
      (prevFileUnicode >= destFileUnicode &&
        prevFileUnicode >= minFileUnicode) ||
      (nextRankNum <= destRankNum && nextRankNum <= maxRankNum)
    ) {
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
    while (
      (prevFileUnicode >= destFileUnicode &&
        prevFileUnicode >= minFileUnicode) ||
      (prevRankNum >= destRankNum && prevRankNum >= minRankNum)
    ) {
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

export const getDiagonalEdge = (
  square: string,
  direction: string
): Array<string> => {
  console.log(`${square}`);
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
  } else if (direction === 'right-down') {
    while (fileUnicode < maxFileUnicode && rankNum > minRank) {
      fileUnicode++;
      rankNum--;
    }
  } else if (direction === 'left-up') {
    while (fileUnicode > minFileUnicode && rankNum < maxRank) {
      fileUnicode--;
      rankNum++;
    }
  } else if (direction === 'left-down') {
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

      if (square[1] === '1') {
        // If there is no piece on the way
        console.log('fuck 1');
        break;
      } else if (piece === '') {
        console.log('fuck 2');

        // If there is no piece on the way
        continue;
      } else {
        // This means there is a piece on the way
        console.log('fuck 3');
        break;
      }
    }
  }
  console.log('return ' + square);
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
 * Function that takes two squares and checks if they are adjacent
 * to one another, either vertically, horizontally or diagonally
 */
export const isAdjacent = (
  originSquare: string,
  objectedSquare: string
): boolean => {
  // get the info foof the origin and objected square
  console.log(`${objectedSquare} gee`);
  const [originFile, originRank, objectedFile, objectedRank] =
    getOriginAndDestInfo(originSquare, objectedSquare);
  const [fileDifference, rankDifference] = getFileAndRankDifferences(
    originFile,
    originRank,
    objectedFile,
    objectedRank
  );

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

  console.log('not next');
  // If none of the checks returned true that means the squares are not adjacent
  return false;
};

/**
 * Function that takes information about the King, and an array
 * of enemy pieces and checks if those pieces can give a check to
 * the King
 */
export const evaluateCheck = (
  objectedPiece: string,
  ownPieceColor: string,
  objectedPieceColor: string,
  enemyWhitePieces: Array<string>,
  enemyBlackPieces: Array<string>
): boolean => {
  // This means there is an own piece before enemy one, so not check
  if (objectedPieceColor === ownPieceColor) {
    return false;
  }

  // Check if the objected piece is in the list of pieces that
  // can give the King a check
  if (ownPieceColor === 'w' && enemyBlackPieces.includes(objectedPiece)) {
    return true;
  } else if (
    ownPieceColor === 'b' &&
    enemyWhitePieces.includes(objectedPiece)
  ) {
    return true;
  }
  return false;
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
): BoardType => {
  const [originFile, originRank, destFile, destRank] = getOriginAndDestInfo(
    origin,
    dest
  );

  let boardMapToUpdate = { ...boardMap };

  // Empty and original square and place the piece on the destination square
  boardMapToUpdate[originFile][originRank] = '';
  boardMapToUpdate[destFile][destRank] = piece;

  return boardMapToUpdate;
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
  console.log(`${destFile} ${destRank}`);
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
