const gameGrid = document.querySelector(".game-grid");
let reactionsElement = document.querySelector(".reaction-time");
let mouseClicksElement = document.querySelector(".mouse-click-count");
const reactionInput = document.querySelector("#reaction-input");
let isPaused = false;
const boardSize = 20;
let redCell = { x: getRandomInt(boardSize), y: getRandomInt(boardSize) };
let reactions = [];

const btnStart = document.querySelector(".btn-start");
const btnPause = document.querySelector(".btn-pause");
const btnReset = document.querySelector(".btn-reset");

let intervalId;
let startTime = 0;
let elapsedTime = 0;
let switchInterval = 2;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createGrid() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = i;
      cell.dataset.y = j;
      gameGrid.appendChild(cell);
    }
  }
}

createGrid();

function createList() {
  let count = 1;

  let temp = Array.from(reactionsElement.children).length;

  while (temp > 0) {
    reactionsElement.removeChild(reactionsElement.children[0]);
    temp--;
  }
  temp = Array.from(mouseClicksElement.children).length;

  while (temp > 0) {
    mouseClicksElement.removeChild(mouseClicksElement.children[0]);
    temp--;
  }

  reactionsElement.children = [];
  mouseClicksElement.children = [];

  reactions.forEach((react) => {
    const listEle = document.createElement("div");
    listEle.textContent = `${react} s`;

    const mousClickEle = document.createElement("div");
    mousClickEle.textContent = `${count}`;
    count++;

    reactionsElement.appendChild(listEle);
    mouseClicksElement.appendChild(mousClickEle);
  });
}

function generateRed() {
  Array.from(gameGrid.children).forEach((cell) =>
    cell.classList.remove("red-cell")
  );
  redCell = { x: getRandomInt(boardSize), y: getRandomInt(boardSize) };
  Array.from(gameGrid.children)
    .find(
      (cell) => +cell.dataset.x === redCell.x && +cell.dataset.y === redCell.y
    )
    .classList.add("red-cell");
}

function generateRandomRed() {
  intervalId = setInterval(generateRed, switchInterval * 1000);
}

function handleGridClick(event) {
  if (isPaused) return;
  const clickedCell = event.target;

  if (
    +clickedCell.dataset.x === redCell.x &&
    +clickedCell.dataset.y === redCell.y
  ) {
    elapsedTime = Date.now() - startTime;
    reactions.push(Math.round(elapsedTime / 1000, 2));
    createList();
    Array.from(gameGrid.children).forEach((cell) =>
      cell.classList.remove("red-cell")
    );
    clearInterval(intervalId);
    startTime = Date.now();
    generateRed();
    generateRandomRed();
  }
}

reactionInput.addEventListener("input", function (event) {
  switchInterval = Number(event.target.value);
});
gameGrid.addEventListener("click", handleGridClick);

btnStart.addEventListener("click", function () {
  isPaused = false;
  startTime = Date.now();
  generateRed();
  generateRandomRed();
});

btnPause.addEventListener("click", function () {
  Array.from(gameGrid.children).forEach((cell) =>
    cell.classList.remove("red-cell")
  );
  clearInterval(intervalId);
  isPaused = true;
});

btnReset.addEventListener("click", function () {
  Array.from(gameGrid.children).forEach((cell) =>
    cell.classList.remove("red-cell")
  );
  reactions = [];
  createList();

  clearInterval(intervalId);
  isPaused = true;
});
