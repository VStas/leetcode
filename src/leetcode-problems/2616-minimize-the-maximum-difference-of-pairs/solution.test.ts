import { minimizeMax } from './solution';

describe('findWordsContaining', () => {
  it('should return correct result', () => {
    expect(minimizeMax([10, 1, 2, 7, 1, 3], 2)).toEqual(1);
    expect(minimizeMax([4, 2, 1, 2], 1)).toEqual(0);
  });
});
