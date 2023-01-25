/**
 * BoardArray is a 2D representation of a Chess board.
 * Each row correspondes to the ranks of a Chess board
 * and each column to the files. Each square's uniqie address
 * on the Chess board can be found with `BoardArray[rank][file]
 */
export declare const BoardArray: string[][];
/**
 * Type for an object representation of a hess board
 */
export interface BoardType {
  [file: string]: {
    [rank: string]: string;
  };
}
/**
 * Object representation of a (currently empty) Chess board
 */
export declare const BoardMap: BoardType;
