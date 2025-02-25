const wordList = [
    { word: "adventure", clue: "A journey of discovery." },
    { word: "mystery", clue: "Something unknown or hidden." },
    { word: "puzzle", clue: "A challenging problem to solve." },
    { word: "heroic", clue: "Related to brave deeds." }
];

let attempts = 0;
let maxAttempts = 6;
let guessedLetters = [];
const currentWord = wordList[Math.floor(Math.random() * wordList.length)];
const word = currentWord.word.toUpperCase();
const clue = currentWord.clue;

document.addEventListener("DOMContentLoaded", () => {
    renderGameBoard();
    setupHintButton();
});

function renderGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Clear the board
    word.split('').forEach((letter, index) => {
        const letterBox = document.createElement("div");
        letterBox.classList.add("letter-box", "w-12", "h-12", "flex", "justify-center", "items-center", "text-lg", "font-bold", "mx-1", "mb-4", "border-2", "border-gray-400", "rounded");
        letterBox.id = `box-${index}`;
        gameBoard.appendChild(letterBox);
    });
}

function handleGuess() {
    const inputField = document.getElementById("user-input");
    const guess = inputField.value.toUpperCase();
    inputField.value = "";

    if (!guess || guessedLetters.includes(guess)) {
        return;
    }

    guessedLetters.push(guess);
    let correctGuess = false;

    for (let i = 0; i < word.length; i++) {
        const box = document.getElementById(`box-${i}`);
        if (word[i] === guess) {
            box.textContent = guess;
            box.classList.add("correct");
            correctGuess = true;
        } else if (word.includes(guess)) {
            box.classList.add("exists");
        } else {
            box.classList.add("wrong");
        }
    }

    attempts++;
    if (!correctGuess) {
        document.getElementById("game-board").classList.add("animate-shake");
    }

    if (attempts >= maxAttempts || guessedLetters.length === word.length) {
        setTimeout(() => {
            alert(guessedLetters.join("") === word ? "Congrats! You solved the word!" : `Game Over! The word was: ${word}`);
            resetGame();
        }, 500);
    }
}

function setupHintButton() {
    document.querySelector("#hint-section button").addEventListener("click", showHint);
}

function showHint() {
    alert(`Hint: ${clue}`);
}

function resetGame() {
    attempts = 0;
    guessedLetters = [];
    renderGameBoard();
}

