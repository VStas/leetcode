export function findWordsContaining(words: string[], x: string): number[] {
  const indices = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(x)) {
      indices.push(i);
    }
  }

  return indices;
}
