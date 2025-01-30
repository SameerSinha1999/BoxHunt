const arr = Array(8)
  .fill("*")
  .map((ele) => Array(36).fill("*"));

let spaceCounter = 7;
let spaceIndex = 1;

for (let i = 0; i < arr.length; i++) {
  let tempSpaces = spaceCounter;
  let tempSpaceIndex = spaceIndex;
  while (tempSpaces--) {
    arr[i][tempSpaceIndex] = " ";
    arr[i][arr[i].length - tempSpaceIndex - 1] = " ";
    tempSpaceIndex++;
  }
  spaceCounter--;
  spaceIndex++;
}

spaceCounter = 10;
for (let i = arr.length - 1; i > 0; i--) {
  let mid = arr[i].length / 2 - 1;
  let b = mid,
    f = mid + 1;
  let tempSpaces = spaceCounter / 2;
  if (tempSpaces <= 0) continue;
  while (tempSpaces--) {
    arr[i][b] = " ";
    arr[i][f] = " ";
    b--;
    f++;
  }
  spaceCounter -= 2;
}

function printArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    let line = "";
    for (let j = 0; j < arr[i].length; j++) {
      line += `${arr[i][j]}`;
    }
    console.log(line);
  }
}

printArray(arr);
