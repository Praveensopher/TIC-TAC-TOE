const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartButton = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (board[clickedIndex] !== '' || !gameActive) {
    return;
  }

  updateCell(clickedCell, clickedIndex);
  checkResult();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
  let roundWon = false;
  let winningCells = [];
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] === '' || board[b] === '' || board[c] === '') {
      continue;
    }
    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      winningCells = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWinningCells(winningCells);
    return;
  }

  if (!board.includes('')) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  changePlayer();
}

function highlightWinningCells(cells) {
  cells.forEach(index => {
    document.querySelector(`.cell[data-index='${index}']`).classList.add('winning');
  });
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusDiv.textContent = `Player ${currentPlayer}'s turn`;
