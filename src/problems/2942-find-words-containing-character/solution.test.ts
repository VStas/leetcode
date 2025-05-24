import { findWordsContaining } from './solution';

describe('findWordsContaining', () => {
  it('should return correct indices', () => {
    expect(findWordsContaining(['leet', 'code'], 'e')).toEqual([0, 1]);
    expect(findWordsContaining(['abc', 'bcd', 'aaaa', 'cbc'], 'a')).toEqual([0, 2]);
    expect(findWordsContaining(['abc', 'bcd', 'aaaa', 'cbc'], 'z')).toEqual([]);
  });
});
