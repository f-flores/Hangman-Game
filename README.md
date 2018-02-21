# Hangman-Game

#### Fabian Flores

### Description
The Hangman-Game project implements the classic hangman game with a baseball theme. The game consists
of two boxes. In the left box is an 'interesting facts' section which displays random facts about baseball and its history. In the right box is the display box of the hangman game. The user must press the `Start` button in order to begin the game. A random word is selected from the word bank and the player gets 10 guesses to solve the puzzle. On the lower part of this box, a scoreboard appears which keeps track of the wins, losses and games played.

### Implementation
The main resources utilized for this project are `javascript` and the `bootstrap 4` library. There are also links to `jquery` just in case this library will be used for future versions of the game.
I decided to use an object (called hangman) to represent the Hangman-Game's main data structure and functions. The *hangman* object essentially stores the data values, such *currentGuess*, a boolean newGame, numGuessesLeft, currentHWord, html text variables, and a few arrays like wordBank[], randomFact[], and currentWordGuess[]. Some methods associated with this object are hangman.getRandomWord(), hangman.initWordguess(), displayGuess(), isCharAlreadyInGuess(), isCharAlreadyInWrongList() and isCharInWord(). A scoreBoard object keeps track of the player's wins and losses.
I was able to leverage these methods when tracking the game's state and implementing the game's logic. For example, with the condition **((hangman.isCharAlreadyInGuess()) || (hangman.isCharAlreadyInWrongList())**,
I was able to check whether or not to display the *"Letter already chosen"* error message. 
There are a few helper functions too. initializeGame() resets the hangman object, and empties the game's `<divs>` in `index.html`. printScores() shows the scoreboard's values. A couple of functions, **isValidAlphaChar()** and **isNormalKey()** return true or false depending on the validity of the key press entered and read via the `document.onkeyup` event.

### Playing the Game
Upon pressing the `Start Game` button, the `startNewGame()` function is triggered.
The `index.html` file contains the various divs. The hangman word is selected randomly from the 
word bank. The left box is dynamically populated with facts about baseball and the right box changes with each user's guess. A scoreboard is displayed on the lower part of the screen. 
If the user wishes to see the console logs and follow the game's logic, he or she can set a global variable DEBUG to "true" in the `game.js`. Also, the default number of maximum guesses is 10; the MAX_GUESSES variable in `game.js` to modify this limit.

### Getting Started
The user can clone this project into his or her respective repositories. This is a purely front end
project and all of the project's assets are locally stored. Javascript needs to enabled. The Hangman-Game project makes use of the `Bootstrap 4` library.

### Browser versions
This game is optimized for Google Chrome. The game does not correctly display on Microsoft Edge or Mozilla Firefox.

### Comments
This game was added to my github profile's portfolio:
[f-flores portfolio](https://f-flores.github.io/Responsive-Portfolio/portfolio.html).
