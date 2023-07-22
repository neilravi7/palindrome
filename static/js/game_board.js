const playerCard = document.querySelector('#playerCard');
const computerCard = document.querySelector('#computerCard');
const playerSubmit = document.querySelector('#playerSubmit');
const computerSubmit = document.querySelector('#computerSubmit');
const userHeader = document.querySelector('#userHeader');
const totalMoves = 10;
var moves = 1;
const computerFaildNumber = getRandomEvenNumber(1, 12);

console.log("computerFaildNumber", computerFaildNumber);

// Get the entered value from the input field of player
var playerInput = document.querySelector('input[name="player"]');
playerInput.focus();

// Get the entered value from the input field of player
var computerInput = document.querySelector('input[name="computer"]');

// get player submitted value
playerSubmit.addEventListener('click', handlePlayerSubmit);
computerSubmit.addEventListener('click', handleComputerSubmit);

//Get computer and Player Card
const playerShow = document.querySelector('#player-show');
const computerShow = document.querySelector('#computer-show');


async function handlePlayerSubmit(event) {
    event.preventDefault();
    
    // If moves limit exeeds.
    moves+=1;
    if (moves > 10){
      isGameDraw();
    };
    
    console.log("moves : ", moves);

    // API CALL TO CHECK THE ENTERD VALUE IS PLAINDROME OR NOT:
    const isPalindrome = await checkPalindrome(playerInput.value);

    if (isPalindrome){
      // Success logic.
      
     // an letter effact 
     playerInput.classList.remove('animate__animated', 'animate__shakeX');

      // Changing user input controll's and it's header.
      playerInput.value = ""
      playerSubmit.disabled = true;
      userHeader.innerHTML = "You guess it right!";

      // Get the computer guessed value from our API's and filled into the box.
      const computerGuess = await getPalindromeString();

      computerInput.value = computerGuess;

      if (computerFaildNumber == moves){
        console.log("Computer lose this match");
        computerInput.value = computerGuess+'o';
      }
      

    }
    else{
      // Faild logic.
      // = "Nope! Not a palindrome"
      computerShow.remove()
      console.log("Player lose game");
      playerLoseGame();
    }
    //computerSubmit.classList.replace('btn-primary', 'btn-success');
    computerSubmit.disabled = false;

    //applyEffect(playerCard, computerCard);    
}

async function handleComputerSubmit(event) {
    event.preventDefault();
    moves+=1;
    if (moves > 10){
      isGameDraw();
    };
    console.log("moves : ", moves);
    console.log('%c handleComputer ', 'background: #222; color: #bada55');
    computerSubmit.classList.replace('btn-success', 'btn-primary');
    computerSubmit.disabled = true;

    const isPalindrome = await checkPalindrome(computerInput.value);

    if (isPalindrome){
      // Success logic.
      console.log("It's Palindrome");
      playerInput.value = '';
      userHeader.innerHTML = "It's Your turn!"
      playerInput.focus();
      playerInput.classList.add('animate__animated', 'animate__shakeX', 'is_valid');
      playerSubmit.disabled = false;
    }
    else{
      // Faild logic.
      computerLoseGame();
      celebrate();
      
    }

    // playerSubmit.classList.replace('btn-primary', 'btn-success');
    // playerSubmit.disabled = false;

    //applyEffect(computerCard, playerCard);
}

function applyEffect(elementOne, elementTwo) {

    // changing focus one of element
    // elementOne is supposed to have active mode we have turn it into deactive mode
    elementOne.classList.remove('border-success', 'shadow-lg', 'animate__animated', 'animate__bounce');
    elementOne.classList.add('border-primary');

    // elementOne is supposed to in deactive mode we have turned into active mode
    elementTwo.classList.remove('border-primary');
    elementTwo.classList.add('border-success', 'shadow-lg', 'animate__animated', 'animate__bounce');

}

// ============================Action=Functions=======================//
function playerLoseGame(){
  // Called when player enter non palindrome keywords. //
  // Computer wins player lose. //
  const rowElement = document.querySelector(".row");
  rowElement.innerHTML = "";
  const htmlCode = `
          <div class="col-md-12 d-flex justify-content-center" id="player-show">
            <div class="card bg-danger shadow-lg animate__animated animate__wobble" id="playerCard">
              <div id="userHeader" class="card-header">
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
};

function isGameDraw(){
  // Called when player and computer equally give answers.
  // player and Computer both wins. //
  const rowElement = document.querySelector(".row");
  rowElement.innerHTML = "";
  const htmlCode = `
          <div class="col-md-12 d-flex justify-content-center" id="player-show">
            <div class="card border-success shadow-lg animate__animated animate__bounce" id="playerCard">
              <div id="userHeader" class="card-header">
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
};

function computerLoseGame(){
  // Called when computer enter non palindrome word.
  // Player wins computer lose. //
  const rowElement = document.querySelector(".row");
  rowElement.innerHTML = "";
  const htmlCode = `
          <div class="col-md-12 d-flex justify-content-center" id="player-show">
            <div class="card border-success shadow-lg animate__animated animate__bounce" id="playerCard">
              <div id="userHeader" class="card-header">
                You won the game 
                <!-- It's Your Turn  -->
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
};