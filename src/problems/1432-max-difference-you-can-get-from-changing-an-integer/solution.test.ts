import { maxDiff } from './solution';

describe('maxDiff', () => {
  it('should return correct result', () => {
    expect(maxDiff(555)).toEqual(888);
    expect(maxDiff(9)).toEqual(8);
    expect(maxDiff(111)).toEqual(888);
  });
});
