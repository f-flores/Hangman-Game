/*****************************************************************************************
 *  
 * File name: game.js
 * Author: Fabian Flores
 * Date: February, 2018
 * Description: This javascript file implements the hangman game. The user is
 *  given a total of 10 guesses. If the random word is guessed by the player before
 *  using up 10 guesses, the player wins. Otherwise, the player loses.
 * 
 ******************************************************************************************/
const MAX_GUESSES = 10;
const DEBUG = true;

//------------------------------------------------------------------------------------------
// VARIABLES and OBJECTS
//

var btn = document.querySelector("#startButton");

var scoreBoard = {
  losses: 0,
  wins: 0,
  totalGames: 0
}

// Hangman game object
var hangman = {
  newGame: false,
  currentGuess: "",
  numGuessesLeft: 0,
  totalLosses: 0,
  totalWins: 0,
  wordBank: ["bat","baseball","inning"],
  randomFacts: ["The base most stolen in a baseball game is second base.",
      "The unofficial anthem of American baseball, “Take Me Out to the Ballgame,” is traditionally sung during the middle of the 7th inning. It was written in 1908 by Jack Norworth and Albert von Tilzer, both of whom had never been to a baseball game"
                ],
  currentFact: "",
  wrongGuessesList: [],
  currentHWord: "",
  htmlBlanks: "",
  htmlWrongSection: "",
  HWordArray: [],
  currentWordGuess: [],
  //------------------------------------------------------------------------
  // hangman Object Methods
  //
  getStartHtml: function() {
    return "<h5> Hangman game has begun. Start Guessing by pressing keys 'a' to 'z'.</h5>";
  },
  getRandomWord: function() {
    var randomIndex = Math.floor((Math.random() * this.wordBank.length))
    this.currentHWord = this.wordBank[randomIndex];
    return this.currentHWord;
  },
  initWordGuess: function() {
    for (var i = 0; i < this.currentHWord.length; i++) {
      console.log(this.currentHWord.charAt(i));
      this.htmlBlanks += "<strong>" + "_" + "</strong>" + " ";
      /* put default underscore in currentWordGuess array */
      this.currentWordGuess[i] = "_"; 
    }
    return this.htmlBlanks;
  },
  isCharAlreadyInGuess: function() {
    for (var i = 0; i < this.currentWordGuess.length; i++) {
      if (this.currentGuess === this.currentWordGuess[i])
        return true;
    }
    return false;
  },
  isCharAlreadyInWrongList: function() {
    for (var i = 0; i < this.wrongGuessesList.length; i++) {
      if (this.currentGuess === this.wrongGuessesList[i])
        return true;
    }
    return false;
  },
  setHWordArray: function() {
    for (var k = 0; k < this.currentHWord.length; k++)  {
      this.HWordArray[k] = this.currentHWord[k];
    }
  },
  isCharInWord: function() {
    var isInWord = false;
    for (var i = 0; i < this.currentHWord.length; i++) {
      if (this.currentGuess === this.currentHWord[i]) {
        /* place correct guess's characters in WordGuess array */
        this.currentWordGuess[i] = this.currentGuess;
        isInWord = true;
      }
    }
    return isInWord;
  }
}


//------------------------------------------------------------------------------------------
// FUNCTIONS
//
/* random image selector */
function randomImgSelector() {
  var imgNames = ["b-diamond.png","baseball.png", "bat-ball.png"];
  var rIndex = Math.floor(Math.random() * imgNames.length);

  return imgNames[rIndex];
}

/* initializes data values for new game */
/* also chooses random fact and updates scoreboard's total games */
function initializeGame() {
  hangman.newGame = true;
  hangman.currentGuess = "";
  hangman.numGuessesLeft = MAX_GUESSES;
  hangman.totalLosses = 0;
  hangman.totalWins = 0;
  //wordBank: ["bat","baseball","inning"],
  hangman.wrongGuessesList = [];
  hangman.currentHWord = "";
  hangman.htmlText = "";
  hangman.startHtml = "";
  hangman.htmlBlanks = "";
  hangman.currentWordGuess = [];

  document.querySelector("#hangmanWord").innerHTML = "";
  document.querySelector("#wonMsg").innerHTML = "";
  document.querySelector("#wrongSection").innerHTML = "";
  document.querySelector("#wrongList").innerHTML = "";
  document.querySelector("#errorMsg").innerHTML = "";
  var rImg = "./assets/images/" + randomImgSelector();
  document.querySelector("#randomImg").innerHTML = '<img src="' + rImg + '">';
  var fIndx = scoreBoard.totalGames % hangman.randomFacts.length;
  if (DEBUG) {console.log("Scoreboard: " + scoreBoard);console.log("factIndex: " + fIndx);}
  document.querySelector("#randomFacts").innerHTML = hangman.randomFacts[fIndx];
}

/* checks for valid alphabetic character, input is in lower case 
 *  source: https://lowrey.me/test-if-a-string-is-alphanumeric-in-javascript/
 */
function validAlphaChar(ch){
  return ch.match(/^[a-z]+$/i) !== null;
}
/*
  print current state of game
  get current status
*/
/* function printGameState {
  hangmanHtml = " "
} */



//------------------------------------------------------------------------------------------
// MAIN PROCEDURE
//
function startNewGame() {
  if (DEBUG) { console.log("Begin Game"); console.log("Initialize object"); }
  initializeGame();

  var wordToGuess = hangman.getRandomWord();
  if (DEBUG) { console.log(wordToGuess); }

  // Display start message to begin game
  document.querySelector("#introText").innerHTML = hangman.getStartHtml();

  // get randomly chosen word from word bank
  hangman.currentHWord = hangman.getRandomWord();

  // display blanks for each letter of word... 
  document.querySelector("#hangmanWord").innerHTML += hangman.initWordGuess() + "<br />";

  document.onkeyup = function (event) {
    document.querySelector("#errorMsg").innerHTML = ""; // reset error message
    //  while (hangman.numGuessesLeft > 0) {
    // Determines which key was pressed. Convert to lower case
    // hangman.currentGuess = event.key.toLowerCase();



    // check for valid hangman characters: a..z
    if ( (validAlphaChar(event.key)) &&
         (event.key !== "Alt") &&
         (event.key !== "Shift") &&
         (event.key !== "CapsLock") &&
         (event.key !== "Control") &&
         (event.key !== "Meta") &&
         (event.key !== "Enter") &&
         (event.key !== "Fn") 
        )
     {
      if (DEBUG) { console.log("Hangman Word to Guess: " + hangman.currentHWord); 
      console.log("Event Key: " + event.key)}
      if (DEBUG) { console.log("VALID character"); }
      validKey = true;
      hangman.currentGuess = event.key.toLowerCase();
      if (hangman.newGame === true) {
        hangman.htmlWrongSection = "<h5>Wrong Guesses Remaining:</h5>"
        document.querySelector("#wrongSection").innerHTML += hangman.htmlWrongSection + hangman.numGuessesLeft.toString();;
        hangman.newGame = false;
        hangman.wrongGuesses = 0;
      }
      //   check if currentChar already present in guess or wrong list[]
      if ((hangman.isCharAlreadyInGuess()) || (hangman.isCharAlreadyInWrongList())) {
        // key is already pressed, waits for next key press;
        if (DEBUG){console.log("key already pressed"); }
        document.querySelector("#errorMsg").innerHTML = "Letter already chosen. Choose another one."
      }
      else {
        //   if currentChar in hangmanWord
        if (hangman.isCharInWord() === true) {
          document.querySelector("#hangmanWord").innerHTML = hangman.currentWordGuess.join(" ")+ "<br />";
          // currentWordGuess is an array of characters, currentHWord is a string....
          // the join method is applied to currentWordGuess in order to convert to a string and correctly compare
          if (hangman.currentWordGuess.join("") === hangman.currentHWord) {
            // player wins
            if (DEBUG) {console.log(hangman.currentWordGuess + " " + hangman.currentHWord + " You won!");}
            hangman.totalWins++;
            scoreBoard.wins++;
            scoreBoard.totalGames++;
            document.querySelector("#wonMsg").innerHTML += "You won!";
          }
        }
        else {
          /* push wrong guess onto WrongList array */
          hangman.wrongGuessesList.push(hangman.currentGuess);
          /* guesses remaining decreases by one */
          hangman.numGuessesLeft--;
          if (DEBUG) {console.log("Wrong Guesses: " + hangman.numGuessesLeft);}
          document.querySelector("#wrongList").innerHTML += hangman.currentGuess;
          document.querySelector("#wrongSection").innerHTML = hangman.htmlWrongSection + hangman.numGuessesLeft.toString();
          if (hangman.numGuessesLeft === 0) {
            if (DEBUG) {console.log("You lose!");}
            hangman.totalLosses++;
            scoreBoard.losses++;
            scoreBoard.totalGames++;
            document.querySelector("#wrongList").innerHTML += "<p>YOU LOSE!</p>";
            //break;
          }
        }
      }
    } else {
      if (DEBUG) { console.log("NOT a valid character"); }
      document.querySelector("#errorMsg").innerHTML = "Not a valid character. Please try again.";
    }
  }
}

btn.onclick = startNewGame;

//   print current state of game
//          
// out of loop
// if num Guesses === MAX_GUESSES
//    display you lose
//    increment losses
//
// print current state of game

/* document.onkeyup = function(event) { */