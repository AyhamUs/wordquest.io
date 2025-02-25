const wordList = [
    { word: "adventure", clue: "A journey with challenges" },
    { word: "mystery", clue: "Something that is hidden or unexplained" },
    { word: "puzzle", clue: "A game of logic" },
    { word: "heroic", clue: "Related to heroes or bravery" },
    // Add more words here...
];

const currentWord = wordList[Math.floor(Math.random() * wordList.length)];
const word = currentWord.word.toUpperCase();
const clue = currentWord.clue;

let attempts = 0;
let maxAttempts = 6;
let guessedLetters = [];

document.addEventListener('DOMContentLoaded', function() {
    renderGameBoard();
    setupHintButton();
});

function renderGameBoard() {
    const gameBoard = document.getElementById("game-board");
    const wordDisplay = word.split('').map((letter, index) => {
        return `<div class="letter-box flex justify-center items-center bg-gray-200 rounded text-lg font-bold w-12 h-12 mx-1 mb-2">${guessedLetters[index] || '_'}</div>`;
    }).join('');
    gameBoard.innerHTML = `
        <div class="flex mb-4">
            ${wordDisplay}
        </div>
        <div>
            <input id="user-input" type="text" maxlength="1" class="text-center py-2 px-4 w-12 rounded focus:outline-none text-lg" />
            <button onclick="handleGuess()" class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded ml-4">Guess</button>
        </div>
    `;
}

function handleGuess() {
    const inputField = document.getElementById("user-input");
    const guess = inputField.value.toUpperCase();
    if (!guess || guessedLetters.includes(guess)) {
        return;
    }

    guessedLetters.push(guess);
    attempts++;
    renderGameBoard();

    if (guessedLetters.join('') === word) {
        alert("Congratulations! You solved it!");
    } else if (attempts >= maxAttempts) {
        alert(`Game Over! The word was: ${word}`);
    }
}

function setupHintButton() {
    const hintButton = document.getElementById("hint-button");
    hintButton.addEventListener('click', function() {
        const hintSection = document.getElementById("hint-section");
        hintSection.innerHTML = `<p class="text-center">Hint: ${clue}</p>`;
    });
}
