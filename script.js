const boardElement = document.getElementById('board');
const winnerElement = document.getElementById('winner');
let board = Array(9).fill(null);
let isXNext = true;
let winner = null;

const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes(null) ? null : 'Empate';
};

const handleClick = (index) => {
  if (board[index] || winner) return;

  board[index] = isXNext ? 'X' : 'O';
  isXNext = !isXNext;
  updateBoard();

  winner = checkWinner();
  if (winner) {
    winnerElement.textContent = winner === 'Empate' ? 'É um empate!' : `Vencedor: ${winner}`;
  }
};

const updateBoard = () => {
  boardElement.querySelectorAll('.cell').forEach((cell, index) => {
    cell.textContent = board[index];
  });
};

const resetGame = () => {
  board = Array(9).fill(null);
  isXNext = true;
  winner = null;
  winnerElement.textContent = '';
  updateBoard();
};

boardElement.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell.dataset.index));
});

updateBoard();
