import { countHillValley } from './solution';

describe('countHillValley', () => {
  it('should return correct result', () => {
    expect(countHillValley([2, 4, 1, 1, 6, 5])).toEqual(3);
    expect(countHillValley([6, 6, 5, 5, 4, 1])).toEqual(0);
    expect(
      countHillValley([1, 1, 1, 1, 1, 1, 1, 57, 57, 57, 50, 50, 50, 50, 22, 22, 22, 86]),
    ).toEqual(2);
  });
});
