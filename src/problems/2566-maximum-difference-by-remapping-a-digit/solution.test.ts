import { minMaxDifference } from './solution';

describe('minMaxDifference', () => {
  it('should return correct result', () => {
    expect(minMaxDifference(11891)).toEqual(99009);
    expect(minMaxDifference(90)).toEqual(99);
  });
});
