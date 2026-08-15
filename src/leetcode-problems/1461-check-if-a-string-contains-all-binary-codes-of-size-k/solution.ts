export function hasAllCodes(s: string, k: number): boolean {
  const seen = new Set<number>();
  const totalCombs = Math.pow(2, k);

  for (let i = 0; i < s.length - k + 1; i++) {
    const number = parseInt(s.slice(i, i + k), 2);
    seen.add(number);
  }

  return seen.size === totalCombs;
}
