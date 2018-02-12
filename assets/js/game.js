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
  numWrongGuesses: 0,
  totalLosses: 0,
  totalWins: 0,
  wordBank: ["bat","baseball","inning"],
  wrongGuessesList: [],
  currentHWord: "",
  htmlText: "",
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
  displayBlanks: function() {
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
  hangman.numWrongGuesses = 0;
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
  document.querySelector("#wrongSection").innerHTML = "";
  document.querySelector("#wrongList").innerHTML = "";
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
//btn.onclick = function() {
  if (DEBUG) { console.log("Begin Game"); console.log("Initialize object"); }
  initializeGame();

  var wordToGuess = hangman.getRandomWord();
  if (DEBUG) { console.log(wordToGuess); }

  // Display start message to begin game
  hangman.startHtml = "<h5> Hangman game has begun. Start Guessing by pressing keys 'a' to 'z'.</h5>";
  document.querySelector("#introText").innerHTML = hangman.startHtml;

  // get randomly chosen word from word bank
  hangman.currentHWord = hangman.getRandomWord();

  // display blanks for each letter of word... 
  //hangman.htmlText = hangman.displayBlanks() + "<p>&nbsp;</p>";
  document.querySelector("#hangmanWord").innerHTML += hangman.displayBlanks() + "<p>&nbsp;</p>";

  document.onkeyup = function (event) {
    if (DEBUG) { console.log("Hangman Word to Guess: " + hangman.currentHWord); }

    //  while (hangman.numWrongGuesses < MAX_GUESSES) {
    // Determines which key was pressed. Convert to lower case
    hangman.currentGuess = event.key.toLowerCase();

    // check for valid character key
    if (validAlphaChar(hangman.currentGuess)) {
      if (DEBUG) { console.log("VALID character"); }
      if (hangman.newGame === true) {
        hangman.htmlWrongSection = "<h5>Wrong Guesses:</h5>"
        document.querySelector("#wrongSection").innerHTML += hangman.htmlWrongSection + hangman.numWrongGuesses.toString();;
        hangman.newGame = false;
        hangman.wrongGuesses = 0;
      }
      //   see if currentChar in hangmanWord or wrongGuess[]
      if ((hangman.isCharAlreadyInGuess()) || (hangman.isCharAlreadyInWrongList())) {
        console.log("key already pressed");
        // key is alreadpy pressed, waits for next key press;
      }
      else {
        //   if currentChar in hangmanWord
        if (hangman.isCharInWord() === true) {
          document.querySelector("#hangmanWord").innerHTML = hangman.currentWordGuess.join(" ");
          // currentWordGuess is an array of characters, currentHWord is a string....
          // the join method is applied to currentWordGuess in order to convert to a string and correctly compare
          if (hangman.currentWordGuess.join("") === hangman.currentHWord) {
            if (DEBUG) {console.log(hangman.currentWordGuess + " " + hangman.currentHWord + " You won!");}
            hangman.totalWins++;
          }
        }
//          push currentChar into currentWordGuess[]
//          /* push currentChar into appropriate positions of array */
//          if currentWordGuess === hangmanWord
//              display you win
//              increment wins
        else {
          /* push wrong guess onto WrongList array */
          hangman.wrongGuessesList.push(hangman.currentGuess);
          hangman.numWrongGuesses++;
          if (DEBUG) {console.log("Wrong Guesses: " + hangman.numWrongGuesses);}
          if (hangman.numWrongGuesses === MAX_GUESSES) {
            if (DEBUG) {console.log("You lose!");}
            hangman.totalLosses++;
            //break;
          }
          hangman.htmlText = "<strong>" + hangman.currentGuess + "</strong>  ";
          document.querySelector("#wrongList").innerHTML += hangman.htmlText;
          document.querySelector("#wrongSection").innerHTML = hangman.htmlWrongSection + hangman.numWrongGuesses.toString();
        }
      }
    } else {
      if (DEBUG) { console.log("NOT a valid character"); }
    }
  }
}

btn.onclick = startNewGame;
// press Start button to begin game
//sButton = document.getElementById("#startButton");
//sButton.onmousedown =  startNewGame();





// get player's guesses
//
// ** game logic **
//
// while numWrongGuesses < maxGuesses
//   get currentChar  
//   toLowerCase
//   check if valid currentChar (a...z, A...Z)
//   see if currentChar in hangmanWord or wrongGuess[] 
//        display char already pressed, try again
//        continue nextLoop
//
//   if currentChar in hangmanWord
//          push currentChar into currentWordGuess[]
//          /* push currentChar into appropriate positions of array */
//          if currentWordGuess === hangmanWord
//              display you win
//              increment wins
//
//   else  
//          increment numWrongGuesses
//          push currentChar into wrongGuesses
//   print current state of game
//          
// out of loop
// if num Guesses === MAX_GUESSES
//    display you lose
//    increment losses
//
// print current state of game

/* document.onkeyup = function(event) { */