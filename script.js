// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Get references to DOM elements
    const board = document.getElementById('board'); // Game board
    const restartButton = document.getElementById('restart'); // Restart button
    const playerScoreDisplay = document.getElementById('playerScore'); // Player score display
    const aiScoreDisplay = document.getElementById('aiScore'); // AI score display
    const clearScoresButton = document.getElementById('clearScores'); // Clear scores button
  
    // Initialize game variables
    let currentPlayer = 'X'; // Current player (initially set to 'X')
    let cells = Array.from({ length: 9 }); // Array to hold individual cells of the game board
    let playerScore = 0; // Player score (initially set to 0)
    let aiScore = 0; // AI score (initially set to 0)
  
    // Initialize the game board
    for (let i = 0; i < cells.length; i++) {
      const cell = document.createElement('div'); // Create a div element for each cell
      cell.classList.add('cell'); // Add 'cell' class to the cell element
      cell.dataset.index = i; // Set the 'data-index' attribute to the cell's index
      cell.addEventListener('click', handleCellClick); // Add click event listener to handle cell clicks
      board.appendChild(cell); // Append the cell to the game board
      cells[i] = cell; // Store reference to the cell in the 'cells' array
    }
  
    // Add event listeners for restart and clear scores buttons
    restartButton.addEventListener('click', resetBoard);
    clearScoresButton.addEventListener('click', clearScores);
  
    // Function to handle cell click events
    function handleCellClick(event) {
      const cell = event.target; // Get the clicked cell
      if (cell.textContent === '') { // If the cell is empty
        cell.classList.add(currentPlayer); // Add class to display the current player's mark
        cell.textContent = currentPlayer; // Set the text content of the cell to the current player's mark
        if (checkWin()) { // Check if the current player has won
          if (currentPlayer === 'X') { // If the player wins
            playerScore++; // Increment player's score
            playerScoreDisplay.textContent = playerScore; // Update player's score display
          } else { // If the AI wins
            aiScore++; // Increment AI's score
            aiScoreDisplay.textContent = aiScore; // Update AI's score display
          }
          alert(`${currentPlayer} wins!`); // Show alert indicating the winner
          resetBoard(); // Reset the game board
        } else if (checkDraw()) { // If the game ends in a draw
          alert("It's a draw!"); // Show alert indicating a draw
          resetBoard(); // Reset the game board
        } else { // If the game is not over
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch to the next player
          if (currentPlayer === 'O') { // If it's the AI's turn
            makeAIMove(); // Make AI move
          }
        }
      }
    }
  
    // Function to check for a win
    function checkWin() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];
  
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent === currentPlayer &&
               cells[b].textContent === currentPlayer &&
               cells[c].textContent === currentPlayer;
      });
    }
  
    // Function to check for a draw
    function checkDraw() {
      return cells.every(cell => cell.textContent !== ''); // Check if all cells are filled
    }
  
    // Function to reset the game board
    function resetBoard() {
      cells.forEach(cell => {
        cell.textContent = ''; // Clear the text content of each cell
        cell.classList.remove('X', 'O'); // Remove player marks from cells
      });
      currentPlayer = 'X'; // Reset current player to 'X'
    }
  
    // Function to simulate AI move
    function makeAIMove() {
      let index;
      do {
        index = Math.floor(Math.random() * 9); // Generate a random index between 0 and 8
      } while (cells[index].textContent !== ''); // Keep generating random index until an empty cell is found
      cells[index].classList.add(currentPlayer); // Add class to display AI's mark
      cells[index].textContent = currentPlayer; // Set the text content of the cell to AI's mark
      if (checkWin()) { // Check if the AI wins
        if (currentPlayer === 'X') { // If the player wins
          playerScore++; // Increment player's score
          playerScoreDisplay.textContent = playerScore; // Update player's score display
        } else { // If the AI wins
          aiScore++; // Increment AI's score
          aiScoreDisplay.textContent = aiScore; // Update AI's score display
        }
        alert(`${currentPlayer} wins!`); // Show alert indicating the winner
        resetBoard(); // Reset the game board
      } else if (checkDraw()) { // If the game ends in a draw
        alert("It's a draw!"); // Show alert indicating a draw
        resetBoard(); // Reset the game board
      } else { // If the game is not over
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch to the next player
      }
    }
  
    // Function to clear scores
    function clearScores() {
      playerScore = 0; // Reset player's score to 0
      aiScore = 0; // Reset AI's score to 0
      playerScoreDisplay.textContent = playerScore; // Update player's score display
      aiScoreDisplay.textContent = aiScore; // Update AI's score display
    }

    
  });
  