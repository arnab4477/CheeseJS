import {
  updateBoardMap,
  isAdjacent,
  checkThroughFile,
  // checkThroughRank,
  // checkThroughDiagonals,
  //   getHorizontalalEdge,
  //   getDiagonalEdge,
} from '../src/MoveValidators/validatorHelper';
import { fenToBoardMap } from '../src/pieces/pieceUtils';
import { BoardType } from '../src/BoardTypes';

describe('the function ', () => {
  it('isAdjacent returns proper true for adjacent squares', () => {
    // let boardMap : BoardType = fenToBoardMap()
    expect(isAdjacent('e2', 'e1')).toEqual(true);
    expect(isAdjacent('e1', 'e2')).toEqual(true);
    expect(isAdjacent('e4', 'f4')).toEqual(true);
    expect(isAdjacent('e4', 'd4')).toEqual(true);
    expect(isAdjacent('e4', 'f5')).toEqual(true);
    expect(isAdjacent('e4', 'd5')).toEqual(true);
    expect(isAdjacent('e4', 'f3')).toEqual(true);
    expect(isAdjacent('e4', 'd3')).toEqual(true);
    expect(isAdjacent('b4', 'a4')).toEqual(true);
    expect(isAdjacent('g4', 'h4')).toEqual(true);
    expect(isAdjacent('b7', 'a8')).toEqual(true);
    expect(isAdjacent('b2', 'a1')).toEqual(true);
    expect(isAdjacent('g7', 'h8')).toEqual(true);
    expect(isAdjacent('g2', 'h1')).toEqual(true);

    expect(isAdjacent('e4', 'e2')).toEqual(false);
    expect(isAdjacent('g3', 'h1')).toEqual(false);
    expect(isAdjacent('g3', 'h6')).toEqual(false);
    expect(isAdjacent('c3', 'e1')).toEqual(false);
    expect(isAdjacent('a6', 'f1')).toEqual(false);
  });

  it('checkThroughFile returns correct info', () => {
    let boardMap: BoardType = fenToBoardMap();
    let square = checkThroughFile('2', '8', 'e', boardMap).square;
    let piece = checkThroughFile('2', '8', 'e', boardMap).piece;
    expect(square).toBe('e7');
    expect(piece).toBe('p');

    boardMap = updateBoardMap('K', 'e1', 'e2', boardMap);
    square = checkThroughFile('1', '1', 'e', boardMap).square;
    piece = checkThroughFile('2', '1', 'e', boardMap).piece;
    expect(square).toBe('e1');
    expect(piece).toBe('');
  });
});
