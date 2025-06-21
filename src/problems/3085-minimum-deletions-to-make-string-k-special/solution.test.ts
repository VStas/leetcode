import { minimumDeletions } from './solution';

describe('minimumDeletions', () => {
  it('should return correct results', () => {
    expect(minimumDeletions('aabcaba', 0)).toEqual(3);
    expect(minimumDeletions('dabdcbdcdcd', 2)).toEqual(2);
    expect(minimumDeletions('aaabaaa', 2)).toEqual(1);
    expect(minimumDeletions('ahahnhahhah', 1)).toEqual(2);
  });
});
