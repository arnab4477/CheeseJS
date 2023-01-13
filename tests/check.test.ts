import { updateBoardMap } from '../src/MoveValidators/validatorHelper';
import { isCheck } from '../src/MoveValidators/check';
import * as check from '../src/MoveValidators/check';
import { fenToBoardMap } from '../src/pieces/pieceUtils';
import { BoardType } from '../src/BoardTypes';

describe('The check direction function ', () => {
  it('checkHorizontally returns true if there is a check', () => {
    let boardMap: BoardType = fenToBoardMap();

    boardMap = updateBoardMap('P', 'e2', 'e4', boardMap);
    boardMap = updateBoardMap('K', 'e1', 'e3', boardMap);

    expect(check.checkHorizontally('e', '3', 'w', 'right', boardMap)).toEqual(
      false
    );
    expect(check.checkHorizontally('e', '3', 'w', 'left', boardMap)).toEqual(
      false
    );

    boardMap = updateBoardMap('q', 'd8', 'g3', boardMap);
    boardMap = updateBoardMap('q', 'd8', 'b3', boardMap);
    expect(check.checkHorizontally('e', '3', 'w', 'left', boardMap)).toEqual(
      true
    );
    expect(check.checkHorizontally('e', '3', 'w', 'right', boardMap)).toEqual(
      true
    );
  });
  it('checkVertically returns true if there is a check', () => {
    let boardMap: BoardType = fenToBoardMap();

    boardMap = updateBoardMap('P', 'e2', 'e4', boardMap);
    boardMap = updateBoardMap('K', 'e1', 'e3', boardMap);

    expect(check.checkVertically('e', '3', 'w', 'down', boardMap)).toEqual(
      false
    );

    boardMap = updateBoardMap('K', 'e3', 'e2', boardMap);

    expect(check.checkVertically('e', '2', 'w', 'down', boardMap)).toEqual(
      false
    );

    boardMap = updateBoardMap('K', 'e2', 'd4', boardMap);
    boardMap = updateBoardMap('p', 'd7', 'f6', boardMap);
    expect(check.checkVertically('d', '4', 'w', 'up', boardMap)).toEqual(true);
    expect(check.checkVertically('d', '4', 'w', 'down', boardMap)).toEqual(
      false
    );
  });
});

describe('the isCheck function ', () => {
  it('returns true when it is a check', () => {
    let boardMap: BoardType = fenToBoardMap();

    // Chek from a pawn
    boardMap = updateBoardMap('P', 'e2', 'e4', boardMap);
    boardMap = updateBoardMap('p', 'e7', 'e5', boardMap);
    boardMap = updateBoardMap('K', 'e1', 'f3', boardMap);
    boardMap = updateBoardMap('k', 'e8', 'f6', boardMap);

    expect(isCheck('f4', 'w', boardMap)).toEqual(true);
    expect(isCheck('f5', 'b', boardMap)).toEqual(true);
    expect(isCheck('d4', 'w', boardMap)).toEqual(true);
    expect(isCheck('d5', 'b', boardMap)).toEqual(true);

    // Chek from the Queen
    boardMap = updateBoardMap('Q', 'd1', 'c6', boardMap);
    boardMap = updateBoardMap('q', 'd8', 'c3', boardMap);
    boardMap = updateBoardMap('K', 'f3', 'e3', boardMap);

    expect(isCheck('e3', 'w', boardMap)).toEqual(true);
    expect(isCheck('e6', 'b', boardMap)).toEqual(true);
  });
  it('returns false when it is not a check', () => {
    let boardMap: BoardType = fenToBoardMap();

    // Chek from a pawn
    boardMap = updateBoardMap('P', 'e2', 'e4', boardMap);
    boardMap = updateBoardMap('p', 'e7', 'e5', boardMap);
    boardMap = updateBoardMap('K', 'e1', 'f3', boardMap);
    boardMap = updateBoardMap('k', 'e8', 'f6', boardMap);

    expect(isCheck('g4', 'w', boardMap)).toEqual(false);
    expect(isCheck('g6', 'b', boardMap)).toEqual(false);

    boardMap = updateBoardMap('K', 'g5', 'e2', boardMap);
    boardMap = updateBoardMap('k', 'g6', 'e7', boardMap);
    expect(isCheck('e1', 'w', boardMap)).toEqual(false);
    expect(isCheck('e8', 'b', boardMap)).toEqual(false);
  });
});
