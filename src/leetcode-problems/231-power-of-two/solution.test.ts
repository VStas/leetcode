import { isPowerOfTwo, isPowerOfTwoBitManipulation } from './solution';

describe('isPowerOfTwo', () => {
  it('should return correct result', () => {
    expect(isPowerOfTwo(1)).toEqual(true);
    expect(isPowerOfTwo(16)).toEqual(true);
    expect(isPowerOfTwo(3)).toEqual(false);
  });

  it('should return correct result for bit manipulation method', () => {
    expect(isPowerOfTwoBitManipulation(1)).toEqual(true);
    expect(isPowerOfTwoBitManipulation(16)).toEqual(true);
    expect(isPowerOfTwoBitManipulation(3)).toEqual(false);
  });
});
