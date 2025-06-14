function maxNumber(num: number) {
  const strNum = String(num);

  for (const digit of strNum) {
    if (digit !== '9') {
      return Number(strNum.replaceAll(digit, '9'));
    }
  }

  // we do not change any digit
  return num;
}

function minNumber(num: number): number {
  const strNum = String(num);
  return Number(strNum.replaceAll(strNum[0], '0'));
}

export function minMaxDifference(num: number): number {
  // console.log({max: maxNumber(num), min: minNumber(num)})
  return maxNumber(num) - minNumber(num);
}
