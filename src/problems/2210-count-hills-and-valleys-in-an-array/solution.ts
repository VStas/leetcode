export function countHillValley(nums: number[]): number {
  let isIncreasing: boolean | undefined;
  let result = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    if (isIncreasing === undefined) {
      if (nums[i] === nums[i + 1]) {
        continue;
      }
      isIncreasing = nums[i] < nums[i + 1];
      continue;
    }

    if (nums[i] < nums[i + 1] && !isIncreasing) {
      isIncreasing = true;
      result++;
      continue;
    }
    if (nums[i] > nums[i + 1] && isIncreasing) {
      isIncreasing = false;
      result++;
    }
  }

  return result;
}
