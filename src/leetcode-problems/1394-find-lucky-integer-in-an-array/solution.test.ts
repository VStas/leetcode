import { findLucky } from './solution';

describe('findLucky', () => {
  it('should return correct result', () => {
    expect(findLucky([2, 2, 3, 4])).toEqual(2);
    expect(findLucky([1, 2, 2, 3, 3, 3])).toEqual(3);
    expect(findLucky([2, 2, 2, 3, 3])).toEqual(-1);
  });
});
