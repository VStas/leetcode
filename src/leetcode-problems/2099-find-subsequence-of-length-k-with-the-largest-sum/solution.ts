export function maxSubsequence(nums: number[], k: number): number[] {
  const numsWithIndices = nums.map((num, index) => ({ num, index }));
  numsWithIndices.sort((a, b) => b.num - a.num);
  const indicesSet = new Set<number>();
  for (let i = 0; i < k; i++) {
    indicesSet.add(numsWithIndices[i].index);
  }

  const result = [];

  for (let i = 0; i < nums.length; i++) {
    if (indicesSet.has(i)) {
      result.push(nums[i]);
    }
  }

  return result;
}
