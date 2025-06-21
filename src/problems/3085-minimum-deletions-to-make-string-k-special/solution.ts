export function minimumDeletions(word: string, k: number): number {
  const totalOccurs = word.length;
  const occurs: Record<string, number> = {};
  for (const letter of word) {
    if (!occurs[letter]) {
      occurs[letter] = 0;
    }
    occurs[letter]++;
  }
  const occurences = Object.values(occurs).sort((a, b) => a - b);

  let windowStartIndex = 0;
  let windowEndIndex = 0; // not including
  let acc = 0;
  while (
    occurences[windowEndIndex] - occurences[windowStartIndex] <= k &&
    windowEndIndex <= occurences.length
  ) {
    acc += occurences[windowEndIndex];
    windowEndIndex += 1;
  }
  let maxResult = acc + (occurences.length - windowEndIndex) * (occurences[windowStartIndex] + k);

  for (windowStartIndex = 1; windowStartIndex < occurences.length; windowStartIndex++) {
    acc -= occurences[windowStartIndex - 1];
    while (
      occurences[windowEndIndex] - occurences[windowStartIndex] <= k &&
      windowEndIndex <= occurences.length
    ) {
      acc += occurences[windowEndIndex];
      windowEndIndex += 1;
    }
    const result = acc + (occurences.length - windowEndIndex) * (occurences[windowStartIndex] + k);
    maxResult = Math.max(maxResult, result);
  }

  return word.length - maxResult;
}
