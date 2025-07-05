export function findLucky(arr: number[]): number {
  return Object.entries(
    arr.reduce(
      (freq, num) => {
        if (!freq[num]) {
          freq[num] = 0;
        }
        freq[num]++;
        return freq;
      },
      {} as Record<string, number>,
    ),
  ).reduce((largestLucky, [numStr, freq]) => {
    const num = +numStr;
    if (num > largestLucky && num === freq) {
      return num;
    }
    return largestLucky;
  }, -1);
}
