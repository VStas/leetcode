import { removeSubfolders } from './solution';

describe('removeSubfolders', () => {
  it('should return correct result', () => {
    expect(removeSubfolders(['/a', '/a/b', '/c/d', '/c/d/e', '/c/f'])).toEqual([
      '/a',
      '/c/d',
      '/c/f',
    ]);
    expect(removeSubfolders(['/a', '/a/b/c', '/a/b/d'])).toEqual(['/a']);
    expect(removeSubfolders(['/a/b/c', '/a/b/ca', '/a/b/d'])).toEqual([
      '/a/b/c',
      '/a/b/ca',
      '/a/b/d',
    ]);
  });
});
