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
  if (strNum[0] !== '1') {
    return Number(strNum.replaceAll(strNum[0], '1'));
  }
  for (let i = 1; i < strNum.length; i++) {
    if (strNum[i] !== '0' && strNum[i] !== '1') {
      return Number(strNum.replaceAll(strNum[i], '0'));
    }
  }
  // we do not change any digit
  return num;
}

export function maxDiff(num: number): number {
  return maxNumber(num) - minNumber(num);
}
