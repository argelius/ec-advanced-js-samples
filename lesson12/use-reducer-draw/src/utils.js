import { WIDTH, HEIGHT } from './constants';

export function createEmptyGrid() {
  return Array(WIDTH * HEIGHT).fill("white");
}

export function floodFill(grid, color, idx) {
  function fill(grid, col, row, startColor, color) {
    grid[row * WIDTH + col] = color;

    if (row - 1 >= 0 && rv[(row - 1) * WIDTH + col] === startColor) {
      fill(grid, col, row - 1, startColor, color);
    }

    if (row + 1 < HEIGHT && rv[(row + 1) * WIDTH + col] === startColor) {
      fill(grid, col, row + 1, startColor, color);
    }

    if (col - 1 >= 0 && rv[row * WIDTH + col - 1] === startColor) {
      fill(grid, col - 1, row, startColor, color);
    }

    if (col + 1 < WIDTH && rv[row * WIDTH + col + 1] === startColor) {
      fill(grid, col + 1, row, startColor, color);
    }
  }

  /**
   * Edge case.
   */
  if (grid[idx] === color) {
    return grid;
  }

  const rv = [...grid];

  const startColor = rv[idx];

  const col = idx % WIDTH;
  const row = Math.floor(idx / WIDTH);

  fill(rv, col, row, startColor, color);

  return rv;
}

export function drawWithBrush(grid, color, size, idx) {
  const rv = [...grid];

  const col = idx % WIDTH;
  const row = Math.floor(idx / WIDTH);

  if (size === 1) {
    rv[idx] = color;
  } else if (size === 2) {
    rv[row * WIDTH + col] = color;

    rv[Math.max(0, row - 1) * WIDTH + col] = color;
    rv[Math.min(HEIGHT - 1, row + 1) * WIDTH + col] = color;

    rv[row * WIDTH + Math.max(0, col - 1)] = color;
    rv[row * WIDTH + Math.min(WIDTH - 1, col + 1)] = color;
  } else if (size === 3) {
    rv[row * WIDTH + col] = color;

    rv[Math.max(0, row - 2) * WIDTH + col] = color;
    rv[Math.max(0, row - 1) * WIDTH + col] = color;
    rv[Math.min(HEIGHT - 1, row + 1) * WIDTH + col] = color;
    rv[Math.min(HEIGHT - 1, row + 2) * WIDTH + col] = color;

    rv[row * WIDTH + Math.max(0, col - 2)] = color;
    rv[row * WIDTH + Math.max(0, col - 1)] = color;
    rv[row * WIDTH + Math.min(WIDTH - 1, col + 1)] = color;
    rv[row * WIDTH + Math.min(WIDTH - 1, col + 2)] = color;

    rv[Math.max(0, row - 1) * WIDTH + Math.max(0, col - 1)] = color;
    rv[Math.max(0, row - 1) * WIDTH + Math.min(WIDTH - 1, col + 1)] = color;
    rv[
      Math.min(HEIGHT - 1, row + 1) * WIDTH + Math.min(WIDTH - 1, col + 1)
    ] = color;
    rv[Math.min(HEIGHT - 1, row + 1) * WIDTH + Math.max(0, col - 1)] = color;
  } else {
    rv[idx] = color;
  }
  return rv;
}


