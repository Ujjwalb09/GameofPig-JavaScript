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

//function to switch player
const switchPlayer = function () {
  //setting active player current score to zero before switching to another player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  //switching active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //toggeling active class to change bg color
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

let currentScore, scores, activePlayer, playing;
//starting conditions
const initialize = function () {
  //setting all score to 0 on reset
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  //removing winner class from both elements and active class from player 1
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');

  //adding player active class to player 0 element
  player0.classList.add('player--active');
};

initialize();

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for rolled 1:

    if (dice != 1) {
      //add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if dice roll is 1, switch player.
      switchPlayer();
    }
  }
});

// hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.add current score to active player total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.if score > 100, active player wins
    if (scores[activePlayer] >= 100) {
      //making playing variable false so that buttons don't respons once the player wins the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //removing active player class from the winner player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. if score is not >= 100 switch player
      switchPlayer();
    }
  }
});

// Reset game button
btnNew.addEventListener('click', initialize);
