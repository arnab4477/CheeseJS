import parsePGN from '../src/utils/pgnParser';

describe('parsePGN', () => {
  it('should extract moves from a PGN string', () => {
    const pgn = '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6';
    const expected = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6'];
    expect(parsePGN(pgn)).toEqual(expected);
  });
  it('should extract results from a PGN string', () => {
    const results = '1/2-1/2 0-1 1-0';
    const expected = ['1/2-1/2', '0-1', '1-0'];
    expect(parsePGN(results)).toEqual(expected);
  });

  it('should handle empty PGN strings', () => {
    expect(parsePGN('')).toEqual([]);
  });
});
