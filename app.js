// import functions and grab DOM elements
const shedButton = document.getElementById('shed-button');
const treeButton = document.getElementById('tree-button');
const boulderButton = document.getElementById('boulder-button');
const resetStatsButton = document.getElementById('resetStatsButton');
const tryAgainButton = document.getElementById('tryAgainButton');

const shedContainer = document.getElementById('shed-container');
const treeContainer = document.getElementById('tree-container');
const boulderContainer = document.getElementById('boulder-container');

const totalEl = document.getElementById('total');
const lossesEl = document.getElementById('losses');
const winsEl = document.getElementById('wins');

// initialize state
const hidingPlaces = ['tree', 'shed', 'boulder'];
tryAgainButton.disabled = true;

let correctGuesses = 0;
let totalGuesses = 0;

shedButton.addEventListener('click', () => {
    const hidingSpot = Math.floor(Math.random() * 3);
    const answer = hidingPlaces[hidingSpot];
    handleGuess(answer, 'shed');
});

treeButton.addEventListener('click', () => {
    const hidingSpot = Math.floor(Math.random() * 3);
    const answer = hidingPlaces[hidingSpot];
    handleGuess(answer, 'tree');
});

boulderButton.addEventListener('click', () => {
    const hidingSpot = Math.floor(Math.random() * 3);
    const answer = hidingPlaces[hidingSpot];
    handleGuess(answer, 'boulder');
});

resetStatsButton.addEventListener('click', () => {
    correctGuesses = 0;
    totalGuesses = 0;
    totalEl.textContent = 0;
    lossesEl.textContent = 0;
    winsEl.textContent = 0;

    // also should reset game state to initial state
    tryAgainButton.disabled = true;
    shedButton.disabled = false;
    treeButton.disabled = false;
    boulderButton.disabled = false;
    shedContainer.classList.remove('face');
    treeContainer.classList.remove('face');
    boulderContainer.classList.remove('face');
});

tryAgainButton.addEventListener('click', () => {
    // hide emoji showing where hiding spot was
    shedContainer.classList.remove('face');
    treeContainer.classList.remove('face');
    boulderContainer.classList.remove('face');

    // enable buttons for picking hiding places again
    shedButton.disabled = false;
    treeButton.disabled = false;
    boulderButton.disabled = false;

    // disable try again button
    tryAgainButton.disabled = true;
});

function handleGuess(correctSpot, userGuess) {
    // disable the hiding place buttons, enable try again button
    shedButton.disabled = true;
    treeButton.disabled = true;
    boulderButton.disabled = true;
    tryAgainButton.disabled = false;

    // then increment the guesses
    totalGuesses++;

    // then grab the appropriate container element for the correct guess from the DOM
    // then add the face class to that element so that the face shows up
    if (correctSpot === 'shed') {
        shedContainer.classList.toggle('face');
    } else if (correctSpot === 'tree') {
        treeContainer.classList.toggle('face');
    } else {
        boulderContainer.classList.toggle('face');
    }

    // then if the user guess is correct, increment the correct guesses
    if (userGuess === correctSpot) {
        correctGuesses++;
    }
    // update the DOM to show this change to the user (including the losses, not tracked directly in state)
    totalEl.textContent = totalGuesses;
    lossesEl.textContent = totalGuesses - correctGuesses;
    winsEl.textContent = correctGuesses;
}
