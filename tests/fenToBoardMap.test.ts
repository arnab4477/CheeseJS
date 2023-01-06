import { fenToBoardMap } from '../src/pieces/pieceUtils';
import { BoardType } from '../src/BoardTypes';

describe('the function', () => {
  it('should return a BoardMap with properly placed pieces', () => {
    const startingPositionMap = {
      a: {
        '1': 'R',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'r',
      },
      b: {
        '1': 'N',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'n',
      },
      c: {
        '1': 'B',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'b',
      },
      d: {
        '1': 'Q',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'q',
      },
      e: {
        '1': 'K',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'k',
      },
      f: {
        '1': 'B',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'b',
      },
      g: {
        '1': 'N',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'n',
      },
      h: {
        '1': 'R',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'r',
      },
    };

    const boardMap: BoardType = fenToBoardMap();
    console.log(JSON.stringify(boardMap));
    expect(boardMap).toEqual(startingPositionMap);
  });
});
