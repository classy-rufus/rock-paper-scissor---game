document.addEventListener('DOMContentLoaded', function() {
    // Game elements
    const playerScoreEl = document.getElementById('playerScore');
    const computerScoreEl = document.getElementById('computerScore');
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const resultText = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');

    // Game variables
    let playerScore = 0;
    let computerScore = 0;
    const choices = ['rock', 'paper', 'scissors'];

    // Event listeners
    choiceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const playerChoice = this.getAttribute('data-choice');
            playGame(playerChoice);
        });
    });

    resetBtn.addEventListener('click', resetGame);

    function playGame(playerChoice) {
        choiceBtns.forEach(btn => btn.classList.add('shake'));
        
        setTimeout(() => {
            choiceBtns.forEach(btn => btn.classList.remove('shake'));
            
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            const winner = getWinner(playerChoice, computerChoice);
            
            displayResult(winner, playerChoice, computerChoice);
            updateScores();
        }, 500);
    }

    function getWinner(player, computer) {
        if (player === computer) return 'draw';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            playerScore++;
            return 'player';
        } else {
            computerScore++;
            return 'computer';
        }
    }

    function displayResult(winner, playerChoice, computerChoice) {
        if (winner === 'player') {
            resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
            resultText.style.color = 'green';
        } else if (winner === 'computer') {
            resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
            resultText.style.color = 'red';
        } else {
            resultText.textContent = `It's a draw! Both chose ${playerChoice}`;
            resultText.style.color = 'blue';
        }
    }

    function updateScores() {
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        updateScores();
        resultText.textContent = '';
    }
});