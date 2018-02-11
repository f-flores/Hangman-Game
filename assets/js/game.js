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
const MAX_GUESSES = 12;
const DEBUG = true;

//------------------------------------------------------------------------------------------
// VARIABLES and OBJECTS
//

// Hangman game object
var hangman = {
  newGame: false,
  currentGuess: "",
  numWrongGuesses: 0,
  totalLosses: 0,
  totalWins: 0,
  wordBank: ["bat","baseball","inning"],
  wrongGuesses: [],
  currentHWord: "",
  htmlText: "",
  startHtml: "",
  htmlBlanks: "",
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
    }
    return this.htmlBlanks;
  }
}


//------------------------------------------------------------------------------------------
// FUNCTIONS
//
function initializeGame() {
  hangman.newGame = true;
  hangman.currentGuess = "";
  hangman.numWrongGuesses = 0;
  hangman.totalLosses = 0;
  hangman.totalWins = 0;
  //wordBank: ["bat","baseball","inning"],
  hangman.wrongGuesses = [];
  hangman.currentHWord = "";
  hangman.htmlText = "";
  hangman.startHtml = "";
  hangman.htmlBlanks = "";
  hangman.currentWordGuess = [];

  document.querySelector("#game").innerHTML = "";
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
  if (DEBUG) {console.log(wordToGuess);}

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
    // Determines which key was pressed.
    hangman.currentGuess = event.key;
    // check for valid character key
    if (hangman.newGame === true) {
      //hangman.htmlText += "<h6>Wrong Guesses:</h6>";
      document.querySelector("#wrongGuessList").innerHTML += "<h5>Wrong Guesses:</h5>";
      hangman.newGame = false;
    }
//    hangman.htmlText = "<strong>" + hangman.currentGuess + "</strong>  ";
    document.querySelector("#game").innerHTML += "<strong>" + hangman.currentGuess + "</strong>  ";
  }
}
    //}
  //}
//}

// press Start button to begin game
//sButton = document.getElementById("#startButton");
//sButton.onmousedown =  startNewGame();



// get randomly chosen word from word bank,
// display blanks for each letter of word... (display on console for now)
// set this word to hangmanWord

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