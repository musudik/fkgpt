class TambolaGame {
  constructor() {
    this.numbers = Array.from({length: 90}, (_, i) => i + 1);
    this.calledNumbers = [];
    this.currentNumber = null;
    this.isGameActive = false;
    
    // Initialize the board immediately
    this.createBoard();
    this.initializeControls();
  }

  createBoard() {
    const board = document.querySelector('.tambola-board');
    board.innerHTML = ''; // Clear existing content
    
    // Create 90 number cells
    for (let i = 1; i <= 90; i++) {
      const cell = document.createElement('div');
      cell.className = 'number-cell';
      cell.textContent = i;
      board.appendChild(cell);
    }
  }

  initializeControls() {
    const drawBtn = document.getElementById('drawNumber');
    const resetBtn = document.getElementById('resetGame');
    
    drawBtn.addEventListener('click', () => this.drawNumber());
    resetBtn.addEventListener('click', () => this.resetGame());
    
    // Initialize fullscreen controls
    this.initializeFullscreenControls();
  }

  drawNumber() {
    if (this.numbers.length === 0) {
      alert('Game Over! All numbers have been called.');
      return;
    }

    const index = Math.floor(Math.random() * this.numbers.length);
    this.currentNumber = this.numbers.splice(index, 1)[0];
    this.calledNumbers.push(this.currentNumber);

    // Update displays
    document.getElementById('currentNumber').textContent = this.currentNumber;
    
    const cells = document.querySelectorAll('.number-cell');
    cells[this.currentNumber - 1].classList.add('called', 'just-called');
    setTimeout(() => {
      cells[this.currentNumber - 1].classList.remove('just-called');
    }, 500);

    this.updateHistory();
  }

  updateHistory() {
    const history = this.calledNumbers.slice(-5).reverse().join(' - ');
    document.getElementById('numberHistory').textContent = history;
  }

  resetGame() {
    this.numbers = Array.from({length: 90}, (_, i) => i + 1);
    this.calledNumbers = [];
    this.currentNumber = null;
    
    document.getElementById('currentNumber').textContent = '--';
    document.getElementById('numberHistory').textContent = '';
    
    document.querySelectorAll('.number-cell').forEach(cell => {
      cell.classList.remove('called', 'just-called');
    });
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const tambolaGame = new TambolaGame();
}); 