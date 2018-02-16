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
  getTotal: function() {
    return this.losses + this.wins;
  }
}

// Hangman game object
var hangman = {
  newGame: false,
  currentGuess: "",
  numGuessesLeft: 0,
  wordBank: ["wild pitch","Babe Ruth","inning","baseball","World Series","Cooperstown", "Hank Aaron","Joe Dimaggio","Yankees","Red Sox","perfect game","major league","Cardinals","Ty Cobb","intentional walk","balk","pitcher","catcher","umpire","left field","mound","glove","bat","coach","manager","dugout","second base","homerun"],
  randomFacts: ["The base most stolen in a baseball game is second base.",
      "The unofficial anthem of American baseball, “Take Me Out to the Ballgame,” is traditionally sung during the middle of the 7th inning. It was written in 1908 by Jack Norworth and Albert von Tilzer, both of whom had never been to a baseball game",
      "Mo’ne Davis (2001– ) became the first female to win a Little League World Series baseball game.",
      "No woman has ever played in a major league baseball game. American sports executive Effa Louise Manley (1897–1981) is the first and only woman inducted into the Baseball Hall of Fame.",
      "Early baseballs contained anything from a rock to a walnut in the center. The life span of a major league baseball is 5–7 pitches. During a typical game, approximately 70 balls are used.",
      "While baseball initially started in the U.S., it has spread worldwide. Today more than 100 countries are part of the International Baseball Federation. Japan has the largest pro baseball league outside the U.S.",
      "Baseball’s L.A. Dodgers, originally founded in Brooklyn, are named after the legendary skill that that local residents showed at “dodging” the city’s trolley streetcar system.",
      "The baseball team with the most World Series wins is the New York Yankees with 27 titles.",
      "A 'can of corn' is an easy fly ball. The term comes from when old-time grocers used their aprons to catch cans knocked from a high shelf.",
      "Craig Biggio (1965– ) of the Houston Astros holds the record for a player most often hit by a pitch.",
      "In 2008, Dr. David A. Peters found that sliding headfirst into a base is faster than a feet-first slide.",
      "The oldest baseball park still in use is Fenway Park, the home field of the Boston Red Sox, which debuted in 1912",
      "The New York Yankees were the first baseball team to wear numbers on their backs, in the 1920s. They initially wore numbers based on the batting order. Babe Ruth always hit third, so he was number 3.",
      "For the first half of the 20th century, major league teams barred African-Americans from participating in its baseball games. However, African-Americans formed “Negro Leagues,” which had some of the greatest players of the century.",
      "The Yankees’ Mickey Mantle holds the record for the longest home run on record for a 565-foot clout hit at Washington DC’s old Griffith Stadium on April 17, 1953. As a switch hitter, he was batting right-handed against left-handed pitcher Chuck Stobbs from the Washington Senators."
                ],
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
      if (DEBUG) {console.log(this.currentHWord.charAt(i));}
      
      /* put default underscore in currentWordGuess array */
      if (this.currentHWord.charAt(i) === " ") {
        this.currentWordGuess[i] = " ";
        this.htmlBlanks += " ";
     /*    this.htmlBlanks += "<strong>" + "&nbsp;" + "</strong>" + " "; */
      } else {
        this.currentWordGuess[i] = "_";
        this.htmlBlanks += "_";
       /*  this.htmlBlanks += "<strong>" + "_" + "</strong>" + " "; */
      }
    }
    return this.htmlBlanks;
  },
  /* displays current Guess 'correctly'. That is, with upper case or lower case. */
  displayGuess: function() {
    var wordWithCases = [];
    for (var i = 0; i < this.currentHWord.length; i++) {
      if ((this.currentWordGuess[i] !== " ") &&  
          (this.currentWordGuess[i] !== "_")) {
      /* this condition means letter has been guessed */
        this.currentWordGuess[i] = this.currentHWord.charAt(i);
      }
    }
    return this.currentWordGuess;
  },
  isCharAlreadyInGuess: function() {
    for (var i = 0; i < this.currentWordGuess.length; i++) {
      /* since currentGuess is automatically converted to lowercase, the currentWordGuess[i] is
         also converted to lowercase */
      if (this.currentGuess === this.currentWordGuess[i].toLowerCase())
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
      if ((this.currentGuess === this.currentHWord[i]) ||
          (this.currentGuess.toUpperCase() === this.currentHWord[i]))  {
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
  var imgNames = ["baseball.png", "bat-ball.png","baseball-swing.jpg","diamond.JPG","umpire-calls-pitch.png",
    "intentional-walk.jpg","cooperstown.jpg","baseball1866.jpg","little-league-ws.jpg","JackieRobinson1945.jpg","Babe_Ruth.jpg","Baseball_positions.png"];
  var rIndex = Math.floor(Math.random() * imgNames.length);

  return imgNames[rIndex];
}

/* 
 * Initializes game. This includes resetting relevant hangman object's values,
 * choosing an image to display, and selecting a random fact. Also, this function
 * has the "Start Game" button lose focus.
 */
function initializeGame() {
  hangman.newGame = true;
  hangman.currentGuess = "";
  hangman.numGuessesLeft = MAX_GUESSES;
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
  document.querySelector("#randomImg").innerHTML = '<img src="' + rImg + '"alt="Baseball image">';
  var fIndx = Math.floor(Math.random() * hangman.randomFacts.length);
  if (DEBUG) {console.log("Scoreboard: " + scoreBoard);console.log("factIndex: " + fIndx);
              console.log("Fact: " + hangman.randomFacts[fIndx]);}
  document.querySelector("#randomFacts").innerHTML = hangman.randomFacts[fIndx];

  btn.blur();
}

/* 
 * checks for valid alphabetic character, input is in lower case 
 *  source: https://lowrey.me/test-if-a-string-is-alphanumeric-in-javascript/
 */
function validAlphaChar(ch){
  return ch.match(/^[a-z]+$/i) !== null;
}

/*
 * printScores displays values of Scoreboard
 */
function printScores() {
  var scoreSection = document.querySelector("#scores");
  scoreSection.setAttribute("class","col-md-9");
  var htmlText = '<h5>SCORES</h5>' +
                '<ul><li>Wins:  ' + scoreBoard.wins +
                '</li><li>Losses:  ' + scoreBoard.losses +
                '</li><li></li>Games Played:  ' + scoreBoard.getTotal() + '</li></ul>';
  scoreSection.innerHTML = htmlText;
}

/*
 * returns false if a non-character key, such as Alt, Shift, Capslock, Control, Meta, Enter or Fn
 * were pressed, other wise returns true
 */
function isNormalKey(k) {
  return (event.key !== "Alt") &&
         (event.key !== "Shift") &&
         (event.key !== "CapsLock") &&
         (event.key !== "Control") &&
         (event.key !== "Meta") &&
         (event.key !== "Enter") &&
         (event.key !== "Fn") ;
}



//------------------------------------------------------------------------------------------
// MAIN PROCEDURE
//
function startNewGame() {
  initializeGame();

  var wordToGuess = hangman.getRandomWord();
  if (DEBUG) { console.log("Hangman word to guess: " + wordToGuess); }

  // Display start message to begin game
  document.querySelector("#introText").innerHTML = hangman.getStartHtml();

  // get randomly chosen word from word bank
  hangman.currentHWord = hangman.getRandomWord();

  // display blanks for each letter of word... 
  document.querySelector("#hangmanWord").innerHTML += hangman.initWordGuess() + "<br />";
  //document.querySelector("#hangmanWord").focus();


  document.onkeyup = function(event) {
    document.querySelector("#errorMsg").innerHTML = ""; // reset error message
    // check for valid hangman characters: a..z
    if ( validAlphaChar(event.key) && isNormalKey(event.key) ) {
      if (DEBUG) { console.log( " *Valid* and *Normal* key. Event Key: " + event.key);}
      // Determines which key was pressed. Convert to lower case
      hangman.currentGuess = event.key.toLowerCase();
      if (hangman.newGame === true) {
        hangman.htmlWrongSection = "<h5>Guesses Remaining:</h5>"
        document.querySelector("#wrongSection").innerHTML += hangman.htmlWrongSection + hangman.numGuessesLeft.toString();
        hangman.newGame = false;
        hangman.wrongGuesses = 0;
      }
      //   check if currentChar already present in guess or wrong list[]
      if ((hangman.isCharAlreadyInGuess()) || (hangman.isCharAlreadyInWrongList())) {
        // key is already pressed, request next key press;
        if (DEBUG){console.log("key already pressed"); } 
        document.querySelector("#errorMsg").innerHTML = "Letter already chosen. Choose another one."
      } else {
        if (hangman.isCharInWord() === true) { //   if currentChar in hangmanWord
          document.querySelector("#hangmanWord").innerHTML = hangman.displayGuess().join("") + "<br />";
          if (DEBUG) {console.log("Guess: " + hangman.currentWordGuess.join("") + " HWord: " + hangman.currentHWord)};
          // currentWordGuess is an array of characters, currentHWord is a string....
          // the join method is applied to currentWordGuess in order to convert to a string and correctly compare
          if (hangman.currentWordGuess.join("") === hangman.currentHWord) {
            // player wins
            if (DEBUG) {console.log(" You won!");}
            scoreBoard.wins++;
            document.querySelector("#wonMsg").innerHTML += "You won!";
            printScores();
          }
        } else {
          // push wrong guess onto WrongList array 
          hangman.wrongGuessesList.push(hangman.currentGuess);
          // guesses remaining decreases by one
          hangman.numGuessesLeft--;
          if (DEBUG) {console.log("Wrong Guesses: " + hangman.numGuessesLeft);}
          document.querySelector("#wrongList").innerHTML += hangman.currentGuess;
          document.querySelector("#wrongSection").innerHTML = hangman.htmlWrongSection + hangman.numGuessesLeft.toString();
          if (hangman.numGuessesLeft === 0) {
            if (DEBUG) {console.log("You lose!");}
            scoreBoard.losses++;
            document.querySelector("#wrongList").innerHTML += "<p>YOU LOSE!</p>";
            printScores();
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
