import { matchPlayersAndTrainers } from './solution';

describe('matchPlayersAndTrainers', () => {
  it('should return correct result', () => {
    expect(matchPlayersAndTrainers([4, 7, 9], [8, 2, 5, 8])).toEqual(2);
    expect(matchPlayersAndTrainers([1, 1, 1], [10])).toEqual(1);
  });
});
