export function isPowerOfTwo(n: number): boolean {
  let num = 1;
  while (num <= Math.abs(n)) {
    if (num === n) {
      return true;
    }
    num *= 2;
  }
  return false;
}

export function isPowerOfTwoBitManipulation(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
