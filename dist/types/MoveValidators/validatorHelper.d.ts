import { BoardType } from '../BoardTypes';
/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving diagonally.
 * Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves diagonally
 * like the Queen, Bishop, King and the Pawn (while capturing)
 */
export declare const checkThroughDiagonals: (originFile: string, destFile: string, originRank: string, destRank: string, boardMap: BoardType) => {
  square: string;
  piece: string;
  color: string;
};
/**
 * Function that returns diagonal edge square information according to the given
 * direction
 */
export declare const getDiagonalEdge: (square: string, direction: string) => Array<string>;
/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving through one file and multiple ranks (moving
 * vertically). Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves vertically
 * like the Queen, Rook, King and the Pawn
 */
export declare const checkThroughFile: (originRank: string, destRank: string, file: string, boardMap: BoardType) => {
  square: string;
  piece: string;
  color: string;
};
/**
 * Validator method that checks if another piece is on the way when the
 * given piece is moving through one rank and multiple files (moving
 * horizontally). Then the method returns the data of the obstructing piece
 * and its square. This method can be used for a piece that moves horizontally
 * like the Queen, Rook and the King
 */
export declare const checkThroughRank: (originFile: string, destFile: string, rank: string, boardMap: BoardType) => {
  square: string;
  piece: string;
  color: string;
};
export declare const checkKnightMove: (originFile: string, originRank: string, destFile: string, destRank: string, boardMap: BoardType) => {
  square: string;
  piece: string;
  color: string;
};
/**
 * Function that takes two squares and checks if they are adjacent
 * to one another, either vertically, horizontally or diagonally
 */
export declare const isAdjacent: (originSquare: string, objectedSquare: string) => boolean;
/**
 * Function that takes information about the King, and an array
 * of enemy pieces and checks if those pieces can give a check to
 * the King
 */
export declare const evaluateCheck: (objectedPiece: string, ownPieceColor: string, objectedPieceColor: string, enemyWhitePieces: Array<string>, enemyBlackPieces: Array<string>) => boolean;
/**
 * Method that takes the moving piece, its origin and destination
 * square and updates the board accordingly
 */
export declare const updateBoardMap: (piece: string, origin: string, dest: string, boardMap: BoardType) => BoardType;
export declare const getPieceColor: (piece: string) => string;
/**
 * Method that retrieves the file names and rank numbers from the original
 * and destination squares and returnes them in an array
 */
export declare const getOriginAndDestInfo: (origin: string, dest: string) => (string | null)[];
/**
 * Method that returns the differnces between the origin file and thes
 * destination file and the same for the ranks in an array
 */
export declare const getFileAndRankDifferences: (originFile: any, originRank: any, destFile: any, destRank: any) => Array<number>;
export declare const getFileAndRank: (square: string) => (string | null)[];
