export function numSubseq(nums: number[], target: number): number {
  const modulo = Math.pow(10, 9) + 7;

  nums.sort((a, b) => a - b);

  const pows = [1];
  for (let i = 1; i < nums.length; i++) {
    pows[i] = (pows[i - 1] * 2) % modulo;
  }

  let start = 0;
  let end = nums.length - 1;
  let result = 0;

  while (start <= end) {
    // min is always start
    // max is any number between start and end
    // обязательно есть start. От start + 1 до end чередуем
    if (nums[start] + nums[end] <= target) {
      const count = pows[end - start];
      result += count;
      result %= modulo;
      start += 1;
    } else {
      end -= 1;
    }
  }

  return result;
}

/*
0 1 2 3 4 5

1...5
2...5
3...5
4...5
5...5
*/
