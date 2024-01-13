const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;
let playerXName = "X";
let playerOName = "O";
let playerXScore = 0;
let playerOScore = 0;

const playerXClass = "x";
const playerOClass = "circle";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const setupPlayers = () => {
    playerXName = prompt("Digite o nome do Jogador X:") || "X";
    playerOName = prompt("Digite o nome do Jogador O:") || "O";
};

const startGame = () => {
    setupPlayers();
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove(playerXClass);
        cell.classList.remove(playerOClass);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn
            ? `${playerOName} Venceu!`
            : `${playerXName} Venceu!`;

        if (isCircleTurn) {
            playerOScore++;
        } else {
            playerXScore++;
        }

        updateScores();
    }

    winningMessage.classList.add("show-winning-message");
};

const updateScores = () => {
    console.log(`${playerXName}: ${playerXScore} pontos | ${playerOName}: ${playerOScore} pontos`);
};

const handleClick = (e) => {
    const cell = e.target;
    const currentPlayerClass = isCircleTurn ? playerOClass : playerXClass;

    placeMark(cell, currentPlayerClass);

    const isWin = checkForWin(currentPlayerClass);
    const isDraw = checkForDraw();

    if (isWin || isDraw) {
        endGame(isDraw);
    } else {
        swapTurns();
    }
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove(playerXClass);
    board.classList.remove(playerOClass);

    if (isCircleTurn) {
        board.classList.add(playerOClass);
    } else {
        board.classList.add(playerXClass);
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains(playerXClass) || cell.classList.contains(playerOClass);
    });
};

startGame();

restartButton.addEventListener("click", startGame);
