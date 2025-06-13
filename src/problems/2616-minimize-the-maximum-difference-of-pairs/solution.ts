export function minimizeMax(nums: number[], p: number): number {
  if (nums.length < 2 || p === 0) {
    return 0;
  }

  nums.sort((a, b) => a - b);

  function countValidPairs(threshold: number) {
    let res = 0;
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i + 1] - nums[i] <= threshold) {
        res += 1;
        i += 1;
      }
    }
    return res;
  }

  let leftValue = 0;
  let rightValue = nums[nums.length - 1] - nums[0];
  let validPairAmount = 0;

  while (leftValue < rightValue) {
    const mid = leftValue + Math.floor((rightValue - leftValue) / 2);

    validPairAmount = countValidPairs(mid);
    if (validPairAmount >= p) {
      rightValue = mid;
    } else {
      leftValue = mid + 1;
    }
  }

  return leftValue;
}
