import { updateBoardMap } from '../src/MoveValidators/validatorHelper';
import { fenToBoardMap } from '../src/pieces/pieceUtils';
import { BoardType } from '../src/BoardTypes';

describe('the updateBoardMap function', () => {
  it('updates the board correctly', () => {
    let boardMap: BoardType = fenToBoardMap();
    let boardMapToUpdate = { ...boardMap };

    boardMap['e']['4'] = 'P';
    boardMap['e']['2'] = '';

    boardMapToUpdate = updateBoardMap('P', 'e2', 'e4', boardMapToUpdate);
    expect(boardMap).toEqual(boardMapToUpdate);
    expect(boardMapToUpdate['e']['2']).toEqual('');
    expect(boardMapToUpdate['e']['4']).toEqual('P');
    boardMap['e']['4'] = 'P';
    boardMap['e']['2'] = '';

    boardMapToUpdate = updateBoardMap('P', 'e2', 'e4', boardMapToUpdate);
    expect(boardMap).toEqual(boardMapToUpdate);
    expect(boardMapToUpdate['e']['2']).toEqual('');
    expect(boardMapToUpdate['e']['4']).toEqual('P');

    boardMap['e']['5'] = 'p';
    boardMap['e']['7'] = '';

    boardMapToUpdate = updateBoardMap('p', 'e7', 'e5', boardMapToUpdate);
    expect(boardMap).toEqual(boardMapToUpdate);
    expect(boardMapToUpdate['e']['7']).toEqual('');
    expect(boardMapToUpdate['e']['5']).toEqual('p');

    boardMap['e']['2'] = 'K';
    boardMap['e']['1'] = '';

    boardMapToUpdate = updateBoardMap('K', 'e1', 'e2', boardMapToUpdate);
    expect(boardMap).toEqual(boardMapToUpdate);
    expect(boardMapToUpdate['e']['1']).toEqual('');
    expect(boardMapToUpdate['e']['2']).toEqual('K');

    boardMap['e']['6'] = 'k';
    boardMap['e']['8'] = '';

    boardMapToUpdate = updateBoardMap('k', 'e8', 'e6', boardMapToUpdate);
    expect(boardMap).toEqual(boardMapToUpdate);
    expect(boardMapToUpdate['e']['8']).toEqual('');
    expect(boardMapToUpdate['e']['6']).toEqual('k');

    boardMap['c']['3'] = 'K';
    boardMap['e']['2'] = '';

    boardMapToUpdate = updateBoardMap('K', 'e2', 'c3', boardMapToUpdate);
    expect(boardMap).toEqual(boardMapToUpdate);
    expect(boardMapToUpdate['e']['2']).toEqual('');
    expect(boardMapToUpdate['c']['3']).toEqual('K');

    boardMap['b']['4'] = 'k';
    boardMap['e']['6'] = '';

    boardMapToUpdate = updateBoardMap('k', 'e6', 'b4', boardMapToUpdate);
    expect(boardMap).toEqual(boardMapToUpdate);
    expect(boardMapToUpdate['e']['6']).toEqual('');
    expect(boardMapToUpdate['b']['4']).toEqual('k');

    expect(boardMapToUpdate['b']['3']).toEqual('');
    expect(boardMapToUpdate['b']['6']).toEqual('');

    let emptySquaresInTestBoard = 0;
    let emptySquaresInNormalBoard = 0;
    for (let file in boardMap) {
      for (let i = 1; i <= 8; i++) {
        if (boardMap[file][i.toString()] === '') {
          emptySquaresInNormalBoard++;
        }
      }
    }
    for (let file in boardMapToUpdate) {
      for (let i = 1; i <= 8; i++) {
        if (boardMapToUpdate[file][i.toString()] === '') {
          emptySquaresInTestBoard++;
        }
      }
    }

    expect(emptySquaresInTestBoard).toBe(emptySquaresInNormalBoard);
  });
});
