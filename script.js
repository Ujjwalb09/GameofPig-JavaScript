'use strict';

// Selecting elements
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore = 0;
let mainScore0 = 0;
let mainScore1 = 0;

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  // 2. Display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // 3. check for rolled 1:

  if (dice != 1) {
    //add the dice to the current score
    currentScore += dice;
    if (player0.classList.contains('player--active')) {
      current0El.textContent = currentScore;
    } else {
      current1El.textContent = currentScore;
    }
  } else {
    //if dice roll is 1, switch player.
    if (player0.classList.contains('player--active')) {
      // switching from player 0 to player 1
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
      current0El.textContent = 0;
      currentScore = 0;
    } else {
      // switching from player 1 to player 0
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
      current1El.textContent = 0;
      currentScore = 0;
    }
  }
});

// hold button functionality
btnHold.addEventListener('click', function () {
  // 1.add current score to total score
  // 2.if score > 100, current player wins
  //3. if score is not >= 100 switch player

  if (player0.classList.contains('player--active')) {
    // 1.add current score to total score
    mainScore0 += currentScore;
    score0El.textContent = mainScore0;
    current0El.textContent = 0;
    currentScore = 0;

    if (score0El.textContent >= 100) {
      player0.classList.add('player--winner');
    } else {
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  } else {
    mainScore1 += currentScore;
    score1El.textContent = mainScore1;
    current1El.textContent = 0;
    currentScore = 0;

    if (score1El.textContent >= 100) {
      player1.classList.add('player--winner');
    } else {
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }
  }
});

// Reset game button
btnNew.addEventListener('click', function () {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');

  if (player0.classList.contains('player--winner')) {
    player0.classList.remove('player--winner');
  } else {
    player1.classList.remove('player--winner');
  }

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  mainScore0 = 0;
  mainScore1 = 0;
});
