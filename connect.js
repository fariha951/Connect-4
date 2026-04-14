const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 1;

// create board
const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

for (let r = 0; r < rows; r++) {
  board[r] = [];
  for (let c = 0; c < cols; c++) {
    board[r][c] = 0;

    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.col = c;

    cell.addEventListener("click", handleClick);
    boardDiv.appendChild(cell);
  }
}

let gameOver = false;

function handleClick(e) {
  if (gameOver) return;

  const col = Number(e.target.dataset.col);

  for (let r = rows - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      board[r][col] = currentPlayer;

      updateUI();

        if (checkWin(r, col)) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === 1 ? 2 : 1;
      statusText.textContent = `Player ${currentPlayer}'s turn`;
      break;
    }
  }
}

function updateUI() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    const r = Math.floor(index / cols);
    const c = index % cols;

    cell.classList.remove("player1", "player2");

    if (board[r][c] === 1) {
      cell.classList.add("player1");
    } else if (board[r][c] === 2) {
      cell.classList.add("player2");
    }
  });
}

// check win (horizontal, vertical, diagonal)
function checkWin(row, col) {
  const directions = [
    [1, 0],   // horizontal
    [0, 1],   // vertical
    [1, 1],   // diagonal /
    [1, -1],  // diagonal \
  ];

  for (let [dx, dy] of directions) {
    let count = 1;

    // forward direction
    let r = row + dy;
    let c = col + dx;
    while (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      board[r][c] === currentPlayer
    ) {
      count++;
      r += dy;
      c += dx;
    }

    // backward direction
    r = row - dy;
    c = col - dx;
    while (
      r >= 0 && r < rows &&
      c >= 0 && c < cols &&
      board[r][c] === currentPlayer
    ) {
      count++;
      r -= dy;
      c -= dx;
    }

    if (count >= 4) return true;
  }

  return false;
}
