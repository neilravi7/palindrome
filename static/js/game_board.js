// status bar elements and it's text. 
var statusBarCard = document.querySelector("#status-bar-card"); //card
var statusBarText = document.querySelector("#status-bar-text"); // status bar text

const statusBarHandler = (addClass, removeClass, text) => {
  statusBarCard.classList.add(addClass);
  statusBarCard.classList.remove(removeClass);
  statusBarText.innerHTML = text;
}

//------------------------------------------------------------------------------------------

//---------- These elements are used to Faild Computer Moves--------------------------------

const totalMoves = 10;
var moves = 1;
const computerFaildNumber = getRandomEvenNumber(1, 12);
console.log("computerFaildNumber", computerFaildNumber);

//------------------------------------------------------------------------------------------


// Player elements.

const playerForm = document.querySelector('#player_form'); // player form
const playerSubmit = document.querySelector('#playerSubmit'); //button
const playerInput = document.querySelector('input[name="player"]'); // input element
const playerCard = document.querySelector('#playerCard'); // card
const playerFeedBack = document.querySelector('#player_error');
const playerHeader = document.querySelector("#userHeader");

//------------------------------------------------------------------------------------------

// For some behavioural error i placed this code here.

playerInput.addEventListener('input', async function (event) {
  event.preventDefault();
  console.log("Player is typing");
  playerInput.classList.remove('is-valid', 'is-invalid');
  playerFeedBack.style.display = 'none';
});

// changing focus player 
const focusPlayer = (focus) => {
  if (focus) {
    playerCard.classList.add("custom-shadow-orange");
    playerInput.focus();
    playerSubmit.disabled = false;
  } else {
    playerCard.classList.remove("custom-shadow-orange");
    playerSubmit.disabled = true;
    playerInput.classList.remove('is-valid', 'is-invalid');
    playerInput.value = '';

  }
}

//------------------------------------------------------------------------------------------

// computer related elements.
const computerForm = document.querySelector('#computer_form');
const computerSubmit = document.querySelector('#computerSubmit'); //button
const computerInput = document.querySelector('input[name="computer"]'); // input
const computerCard = document.querySelector('#computerCard'); // card

function autoSubmitComputerForm() {
  computerSubmit.click();
}


const focusComputer = async (focus) => {

  if (focus) {
    // Focussing on computer.
    computerCard.classList.add('custom-shadow-blue');
    computerSubmit.disabled = false;
    computerInput.focus();
    // ------- API's Level call's ---------  
    const computerGuess = await getPalindromeString();

    if (moves >= computerFaildNumber) {
      computerInput.value = computerGuess + 'o'
    } else {
      computerInput.value = computerGuess;
    }
    
    // auto submit computer form with 3 second delay.
    setInterval(autoSubmitComputerForm, 3000);

  } else {
    // Applying status bar card and text effects
    statusBarHandler('bg-warning', 'bg-primary', 'Player moves');
    computerCard.classList.remove('custom-shadow-blue');
    computerInput.value = '';
    computerSubmit.disabled = true;

  }
}
//------------------------------------------------------------------------------------------

// ============================Win and LOSE Functions=======================//
function playerLoseGame() {
  // Called when player enter non palindrome keywords. //
  // Computer wins player lose. //
  const rowElement = document.querySelector(".row");
  rowElement.innerHTML = "";
  const htmlCode = `
      <div class="col-md-12 d-flex justify-content-center">
        <div class="card bg-danger shadow-lg animate__animated animate__wobble">
          <div class="card-header">
            Game is over 
            <!-- It's Your Turn  -->
          </div>
          <img src="/static/images/lose.png" class="card-img-top" alt="player-lose-game">
          <div class="card-body">
            <h3>Opps!!</h3>
            <h5>You guess the palindrome string wrong!!</h5>
          </div>
        </div>
      </div>
    `;

  rowElement.innerHTML += htmlCode;
  functionWinAndLose(computerCard, playerCard);

};

//------------------------------------------------------------------------------------------

function isGameDraw() {
  // Called when player and computer equally give answers.
  // player and Computer both wins. //
  const rowElement = document.querySelector(".row");
  rowElement.innerHTML = "";
  const htmlCode = `
      <div class="col-md-12 d-flex justify-content-center">
        <div class="card border-success shadow-lg animate__animated animate__bounce">
          <div class="card-header">
            Game is draw 
            <!-- It's Your Turn  -->
          </div>
          <img src="/static/images/draw.png" class="card-img-top" alt="game-tie">
          <div class="card-body">
            <h3>Well Done !!</h3>
            <h5>You give equal compitation to computer !!</h5>
          </div>
        </div>
      </div>
    `;

  rowElement.innerHTML += htmlCode;

  playerCard.innerHTML = '';
  computerInput.innerHTML = '';
  
  playerCard.innerHTML = `<div class="card-body bg-info text-light"><h2>Winner</h2></div>`;
  computerCard.innerHTML = `<div class="card-body bg-info text-light"><h2>Loser</h2></div>`;
  
  playerCard.classList.add('custom-shadow-blue');
  computerCard.classList.add('custom-shadow-blue');
  
};

//------------------------------------------------------------------------------------------

function computerLoseGame() {
  // Called when computer enter non palindrome word.
  // Player wins computer lose. //
  const rowElement = document.querySelector(".row");
  rowElement.innerHTML = "";
  const htmlCode = `
      <div class="col-md-12 d-flex justify-content-center">
        <div class="card border-success shadow-lg animate__animated animate__bounce">
          <div class="card-header">
            You won the game 
          </div>
          <img src="/static/images/win.png" class="card-img-top" alt="player-win-game">
          <div class="card-body">
            <h3>Well Done !!</h3>
            <h5>Computer guess the palindrome string wrong!!</h5>
          </div>
        </div>
      </div>
    `;  
  rowElement.innerHTML += htmlCode;
  functionWinAndLose(playerCard, computerCard);
};

//----------------- win and lose -------------------

const functionWinAndLose = (winner, loser) => {
  winner.innerHTML = '';
  loser.innerHTML = '';

  winner.innerHTML = `<div class="card-body bg-success text-light"><h2>Winner</h2></div>`;
  loser.innerHTML = `<div class="card-body bg-danger text-light"><h2>Loser</h2></div>`;

  winner.classList.add('custom-shadow-green');
  loser.classList.add('custom-shadow-red');

};

//--------------------Restart game ---------------

const restartGame= () => {
  window.location.reload();
};

//------------------------------------------------------------------------------------------
//----------------- refrsh button code ---------------
document.querySelector('#restartTheGame').addEventListener('click', restartGame);
//====================================================
// Starting behaviour 
document.addEventListener("DOMContentLoaded", () => {

  // Set the initial text
  statusBarText.textContent = "Player Moves";
  statusBarCard.classList.add('custom-shadow-orange', 'bg-warning', 'text-light');
  const playerInfo = getUser();
  playerHeader.innerHTML = `${playerInfo.first_name} ${playerInfo.last_name}`

  // set both buttons disabled at initials stage
  computerInput.disabled =true
  computerSubmit.disabled = true;

  playerInput.disabled = true;
  playerSubmit.disabled = true;

  // Start the countdown
  let count = 5;
  const countdownInterval = setInterval(() => {
    count--;
    statusBarText.textContent = `Countdown: ${count} second${count !== 1 ? "s" : ""}`;

    // When the countdown is finished, update the text back to the original text
    if (count === 0) {
      clearInterval(countdownInterval);
      statusBarCard.classList.remove('custom-shadow-orange');
      statusBarText.textContent = "Player Moves";
      
      playerCard.classList.add('animate__animated', 'animate__bounce', 'custom-shadow-orange');
      playerInput.disabled = false;
      playerInput.focus();
      playerSubmit.disabled = false;
    }
  }, 1000);

});
//------------------------------------------------------------------------------------------


// Main Handler.
(function () {
  'use strict'

  // Temporary data structure to store guessed words
  const guessedWords = new Set();

  // Fetch the player form
  playerForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!playerForm.checkValidity()) {
      playerForm.classList.add('was-validated');
      return;
    }

    if (playerInput.value != '') {
      playerInput.classList.remove('is-invalid');
      playerInput.classList.add('is-valid');
      playerFeedBack.style.display = 'none';
    } else {
      playerInput.classList.add('is-invalid');
      playerInput.classList.remove('is-valid');
      playerFeedBack.style.display = 'block';
    }

    if (!guessedWords.has(playerInput.value)) {

      // Adding value into the DS to prevent user to enter same words.
      if (playerInput.value != '') {
        guessedWords.add(playerInput.value);
      }

      playerInput.classList.remove('is-invalid');
      playerInput.classList.add('is-valid');

      // API CALL TO CHECK THE ENTERD VALUE IS PLAINDROME OR NOT:
      const isPalindrome = await checkPalindrome(playerInput.value);
      console.log("isPalindrome :", isPalindrome);

      if (isPalindrome) {

        // Applying status bar card and text effects
        statusBarHandler('bg-primary', 'bg-warning', 'Computer Moves');

        console.log("Player Submited");
        console.log("Current: ", moves);

        if (moves > 10) {
          isGameDraw();
          celebrate();
          
        };

        moves += 1;

        // remove focus on player.
        focusPlayer(false);
        // Add focus on computer.
        await focusComputer(true);
      } else {
        console.log("Player guess it worng");
        playerLoseGame();
      }

    } else {
      
      // Check if word used by user previous
      playerFeedBack.innerHTML = `You've already used ${playerInput.value}. Try another word.`
      playerInput.classList.remove('is-valid');
      playerInput.classList.add('is-invalid');
      playerFeedBack.style.display = 'block';

    }

  }, false);


  computerSubmit.addEventListener('click', async function (event) {
    event.preventDefault();
    event.stopPropagation();

    //computer handling code
    console.log("Computer submitted");
    console.log("Current: ", moves);

    console.log("// Chaking computer moves");
    const isPalindrome = await checkPalindrome(computerInput.value);

    if (moves >= computerFaildNumber) {
      computerInput.value = computerInput.value + 'o'
    }

    if (isPalindrome) {

      moves += 1;

      console.log("Computer guess it right");
      // Remove focus on computer
      await focusComputer(false)
      // Add focus on player
      focusPlayer(true);
    } else {
      console.log("Computer guess it wrong");
      computerLoseGame();
      celebrate();
    }

  });

  // Function to reset the guessedWords data structure
  function resetGuessedWords() {
    guessedWords.clear();
  }

})();