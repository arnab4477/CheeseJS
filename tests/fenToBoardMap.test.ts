import { boardType } from '../src/BoardTypes';
import { fenToBoardMap } from '../src/pieces/pieceUtils';

describe('the function', () => {
  it('should return a BoardMap with properly placed pieces', () => {
    const startingPositionMap: boardType = {
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
        '1': 'R',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'r',
      },
      c: {
        '1': 'R',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'r',
      },
      d: {
        '1': 'R',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'r',
      },
      e: {
        '1': 'R',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'r',
      },
      f: {
        '1': 'R',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'r',
      },
      g: {
        '1': 'R',
        '2': 'P',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'p',
        '8': 'r',
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

    expect(fenToBoardMap()).toEqual(startingPositionMap);
  });
});
