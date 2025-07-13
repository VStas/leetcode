export function matchPlayersAndTrainers(players: number[], trainers: number[]): number {
  players.sort((a, b) => a - b);
  trainers.sort((a, b) => a - b);

  let totalCount = 0;
  let i = 0;
  let j = 0;
  while (i < players.length && j < trainers.length) {
    if (players[i] <= trainers[j]) {
      totalCount++;
      i++;
    }
    j++;
  }

  return totalCount;
}

// 4 7 9
// 5 8 8
