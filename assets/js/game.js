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

// Hangman game object
var hangman = {
  newGame: false,
  currentGuess: "",
  numGuessesLeft: 0,
  totalLosses: 0,
  totalWins: 0,
  wordBank: ["bat","baseball","inning"],
  wrongGuessesList: [],
  currentHWord: "",
  startHtml: "",
  htmlBlanks: "",
  htmlWrongSection: "",
  HWordArray: [],
  currentWordGuess: [],
  //------------------------------------------------------------------------
  // hangman Object Methods
  //
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
/* initializes data values for new game */
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
  var validKey = true;
  if (DEBUG) { console.log(wordToGuess); }

  // Display start message to begin game
  hangman.startHtml = "<h5> Hangman game has begun. Start Guessing by pressing keys 'a' to 'z'.</h5>";
  document.querySelector("#introText").innerHTML = hangman.startHtml;

  // get randomly chosen word from word bank
  hangman.currentHWord = hangman.getRandomWord();

  // display blanks for each letter of word... 
  //hangman.htmlText = hangman.initWordGuess() + "<p>&nbsp;</p>";
  document.querySelector("#hangmanWord").innerHTML += hangman.initWordGuess() + "<br />";

  document.onkeyup = function (event) {
    document.querySelector("#errorMsg").innerHTML = ""; // reset error message
    //  while (hangman.numGuessesLeft > 0) {
    // Determines which key was pressed. Convert to lower case
    // hangman.currentGuess = event.key.toLowerCase();
    if (DEBUG) { console.log("Hangman Word to Guess: " + hangman.currentHWord); 
                 console.log("Event Key: " + event.key)}


    // check for valid hangman characters: a..z
    if ( (validAlphaChar(event.key)) &&
         (validKey == true) &&
         (event.key !== "Alt") &&
         (event.key !== "Shift") &&
         (event.key !== "CapsLock") &&
         (event.key !== "Control") &&
         (event.key !== "Meta") &&
         (event.key !== "Fn")
        )
     {
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
            document.querySelector("#wonMsg").innerHTML += "You won!";
          }
        }
        else {
          /* push wrong guess onto WrongList array */
          hangman.wrongGuessesList.push(hangman.currentGuess);
          /* guesses remaining decreases by one */
          hangman.numGuessesLeft--;
          if (DEBUG) {console.log("Wrong Guesses: " + hangman.numGuessesLeft);}
          //hangman.htmlText = hangman.currentGuess;
          document.querySelector("#wrongList").innerHTML += hangman.currentGuess;
          document.querySelector("#wrongSection").innerHTML = hangman.htmlWrongSection + hangman.numGuessesLeft.toString();
          if (hangman.numGuessesLeft === 0) {
            if (DEBUG) {console.log("You lose!");}
            hangman.totalLosses++;
            document.querySelector("#wrongList").innerHTML += "<p>YOU LOSE!</p>";
            //break;
          }
        }
      }
    } else {
      if (DEBUG) { console.log("NOT a valid character"); }
      document.querySelector("#errorMsg").innerHTML = "Not a valid character. Please try again.";
      validKey = false;
     // event.key = undefined; // clear event.key
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