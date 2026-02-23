import { hasAllCodes } from './solution';

describe('hasAllCodes', () => {
  it('should return correct result', () => {
    expect(hasAllCodes('00110110', 2)).toEqual(true);
    expect(hasAllCodes('0110', 1)).toEqual(true);
    expect(hasAllCodes('0110', 2)).toEqual(false);
  });
});
