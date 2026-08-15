import { maxSubsequence } from './solution';

describe('maxSubsequence', () => {
  it('should return correct result', () => {
    expect(maxSubsequence([2, 1, 3, 3], 2)).toEqual([3, 3]);
    expect(maxSubsequence([-1, -2, 3, 4], 3)).toEqual([-1, 3, 4]);
    expect(maxSubsequence([3, 4, 3, 3], 2)).toEqual([3, 4]);
  });
});
