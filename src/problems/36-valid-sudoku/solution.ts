const SUDOKU_SIZE = 9;

function isValidPart(iterable: Iterable<string>) {
  const uniqueItems = new Set<string>();

  for (const item of iterable) {
    if (item === '.') {
      continue;
    }
    if (uniqueItems.has(item)) {
      return false;
    }

    uniqueItems.add(item);
  }

  return true;
}

function* rowItems(board: string[][], row: number) {
  for (let col = 0; col < SUDOKU_SIZE; col++) {
    yield board[row][col];
  }
}

function* colItems(board: string[][], col: number) {
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    yield board[row][col];
  }
}

function* squareItems(board: string[][], row: number, col: number) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      yield board[row + i][col + j];
    }
  }
}

export function isValidSudoku(board: string[][]): boolean {
  for (let row = 0; row < SUDOKU_SIZE; row++) {
    if (!isValidPart(rowItems(board, row))) {
      return false;
    }
  }

  for (let col = 0; col < SUDOKU_SIZE; col++) {
    if (!isValidPart(colItems(board, col))) {
      return false;
    }
  }

  for (let row = 0; row < SUDOKU_SIZE; row += 3) {
    for (let col = 0; col < SUDOKU_SIZE; col += 3) {
      if (!isValidPart(squareItems(board, row, col))) {
        return false;
      }
    }
  }

  return true;
}
