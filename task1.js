// Task: Generate a square matrix of size N x N filled with integers from 1 to N^2 in a spiral order (clockwise).
// Return the matrix as a 2D list.

function createSpiralMatrix(n) {
  const arr = Array(n)
    .fill(0)
    .map((ele) => Array(n).fill(0));

  let top = 0,
    bottom = n - 1,
    left = 0,
    right = n - 1;

  let element = 1;
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      arr[top][i] = element;
      element++;
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      arr[i][right] = element;
      element++;
    }
    right--;
    for (let i = right; i >= left; i--) {
      arr[bottom][i] = element;
      element++;
    }
    bottom--;
    for (let i = bottom; i >= top; i--) {
      arr[i][left] = element;
      element++;
    }
    left++;
  }
  return arr;
}

function printArray(arr) {
  for (let i = 0; i < n; i++) {
    let line = "";
    for (let j = 0; j < n; j++) {
      line += `${arr[i][j]} `;
    }
    console.log(line);
  }
}

let n = 5;
const arr = createSpiralMatrix(n);
printArray(arr);
