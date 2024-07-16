//Pseudocode:

// 1. Getting a list of 5 letter words to pull from and selecting a random one

// 2. Creating a 5x? grid in the HTML for the GUI.

// 3. Taking user input from the keyboard or the on screen keyboard.

// 4. Taking in a user's 5 letter word and comparing it to the randomly chosen word.

// 5. Checking each letter and the index of that letter to see if it matches the word.

// 6. Giving the user graphical cues to show which letters are in the right/wrong place.

// 7. Letting the user know that they won by guessing the correct word.

// 8. Letting the user know IF they have run out of guesses and lost.

// 9. Play again, help, and reset functionality.

// 10. Verify if it is a word in the list. If word is invalid or not.

//------------------------------------------------------------------------------------------------------------------

// Define the random 5-letter word from a list of 5-letter words, this will be LET.

// Define the letters that the user has guessed, LET.

// Define the letters that are correct, in contained in the word, and wrong.

// User inputs 5 letters
    //IF all 5 letter match the squence of letters of the word THEN user wins the game.
    //IF a letter is out of sequence, but is in the word, make it YELLOW.
        //turn words on the on-screen keyboard YELLOW as well.
    //IF a letter is in the correct sequence, make it GREEN.
        //turn words on the on-screen keyboard GREEN as well.
    //IF a letter is not in the word at all, make it GRAY.
        //turn words on the on-screen keyboard GRAY as well.

// User will get 6 tries to guess the word.

//------------------------------------------------------------------------------------------------------------------

// (Extra): Scoreboard: Keeps track of words guessed wrong/right.
// (Extra): Sound effects.

//------------------------------------------------------------------------------------------------------------------

import { fiveLetterWords } from './5-letter-words.js';
// fiveLetterWords = require('./5-letter-words.js');

// Variables -------------------------------------------------------------------------------------------------------

let randomWord = '';
let currentWord = '';
let userInput = [];
let guessedLetters = [];
let correctLetters = [];
let wrongLetters = [];
let containsLetters = [];
let numGuesses = 0;
let won = false;
let finished = false;

const title = document.querySelector('h1');
const keys = document.querySelectorAll(".key");
const gameGrid = document.querySelector(".game-grid")
const keyboard = document.querySelector('.keyboard');
const resetButton = document.querySelector('.reset');
const winMessage = document.querySelector('.message');

const flipLetter = [
    { transform: "rotateY(180deg)" },
  ];
  
const flipTiming = {
    duration: 500,
    iterations: 1,
};

const flipTiming2 = {
    duration: 500,
    delay: 250,
    iterations: 1,
};

const flipTiming3 = {
    duration: 500,
    delay: 500,
    iterations: 1,
};

const flipTiming4 = {
    duration: 500,
    delay: 750,
    iterations: 1,
};

const flipTiming5 = {
    duration: 500,
    delay: 1000,
    iterations: 1,
};

const shake = {

}

// Keyboard Code -------------------------------------------------------------------------------------------------------------

init();
render();

resetButton.addEventListener('click', reset);

keys.forEach((key) => {
    key.addEventListener('click', (event) => {
    });
  });

// Initialize Functions --------------------------------------------------------------------------------------------------------  

  function init() {
    //select random word from the array of 5-letter-words
    document.addEventListener('keyup', keyboardInput, true);
    randomWord = '';
    userInput = [];
    currentWord = '';
    guessedLetters = [];
    correctLetters = [];
    wrongLetters = [];
    containsLetters = [];
    numGuesses = 0;
    won = false;
    finished = false;
    clear();
    
    randomWord = fiveLetterWords[getRandomIndex(fiveLetterWords.length)];
    console.log(randomWord);
  }

  function render() {
    //then create the grid for the wordle game
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 5; c++) {
          //creates a div for each row and column
          const letter = document.createElement('div');
          letter.classList.add('letter');
          gameGrid.appendChild(letter);
      }
    }
  }

  function clear() {
    winMessage.innerHTML = '';
    for (let child = 0; child  < gameGrid.childElementCount; child++) {
      gameGrid.childNodes[child].innerHTML = '';
      gameGrid.childNodes[child].classList.remove("correct");
      gameGrid.childNodes[child].classList.remove("wrong");
      gameGrid.childNodes[child].classList.remove("containsLetter");
  }
}

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  //Functions --------------------------------------------------------------------------------------------------------  

  function keyboardInput(event) {
    // console.log(event);
    //appends sets the childNode's letter to the inputed key
    if (event.key === 'Backspace') {
      clearButton(event);
    } 
    //catches non-letter keys
    else if (event.key === 'Shift' || event.key === 'Enter' || event.key === 'Alt' || event.key === 'Meta' || event.key === 'Command' 
      || event.key === 'Control' || event.key === 'Tab' || event.key === '\\' || event.key === ' ' || event.key === 'ArrowRight'
      || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Escape') {
      return;
    } else {
      userInput += event.key;
      console.log(event);
      gameGrid.childNodes[userInput.length-1].innerHTML = event.key.toUpperCase();
      if (userInput.length % 5 === 0) {
        if (wordExists(userInput.substr(userInput.length - 5))) {
          checkWord();
        } else {
          winMessage.innerHTML = 'Invalid word! Please try again';
          shakeBoxes();
          console.log(userInput.length);
        }
      }
    }
  }

//   function stopInput(event) {
//     document.removeEventListener('keypress', keyboardInput(event), false);
//   }

  function checkWord() {
    winMessage.innerHTML = '';
    // let index = numGuesses * 5;
    let index = userInput.length - 5;
    let tempWord = randomWord;
    currentWord = userInput.substr(userInput.length - 5);

    for (let i = 0; i < 5; i++) {
      // console.log(index + i);
      if (currentWord === tempWord) {
        gameGrid.childNodes[index + i].classList.add('correct');
        won = true;
        finished = true;
      }
      //correct letters
      else if (userInput.charAt(index + i) === tempWord.charAt(i)) {
        correctGuess(i, index);
      } 
      //wrong letters
      else if (userInput.charAt(index + i) !== tempWord.charAt(i) && !tempWord.includes(userInput.charAt(index + i))) {
        wrongGuess(i, index);
      } 
      // contains letter
      else {
        containsGuess(i, index);
      }
      guessedLetters += userInput.charAt(index + i);

      //animation for the word checking
      if ((index + i) % 5 === 0) {
        gameGrid.childNodes[index + i].animate(flipLetter, flipTiming);
      } else if ((index + i) % 5 === 1) {
        gameGrid.childNodes[index + i].animate(flipLetter, flipTiming2);
      } else if ((index + i) % 5 === 2) {
        gameGrid.childNodes[index + i].animate(flipLetter, flipTiming3);
      } else if ((index + i) % 5 === 3) {
        gameGrid.childNodes[index + i].animate(flipLetter, flipTiming4);
      } else if ((index + i) % 5 === 4) {
        gameGrid.childNodes[index + i].animate(flipLetter, flipTiming5);
      }
    }
    numGuesses++;
    checkWinner();
  }
  //the letter is in the correct index.
  function correctGuess(i, index) {
    gameGrid.childNodes[index + i].classList.add('correct');
    correctLetters += userInput.charAt(index + i);
  }
  //the letter is not in the word at all
  function wrongGuess(i, index) {
    gameGrid.childNodes[index + i].classList.add('wrong');
    wrongLetters += userInput.charAt(index + i);
  }
  //if the word contains the letter, but it is not in the correct index
  function containsGuess(i, index) {
    gameGrid.childNodes[index + i].classList.add('containsLetter');
    containsLetters += userInput.charAt(index + i);
  }

  function checkWinner() {
    if (won) {
      winMessage.innerHTML = `You won in ${numGuesses} attempt(s)!`;
      document.removeEventListener('keypress', keyboardInput, true);
    } else {
      return;
    }
  }

  function wordExists(userWord) {
    if(fiveLetterWords.includes(userWord)) {
      console.log(userWord);
      return true;
    } else {
      return false;
    }
  }

  function reset() {
    init();
  }

  function clearButton(event) {
    if (userInput.length%5 === 0 && wordExists(userInput.substr(userInput.length - 5))) {
      return;
    } else {
      winMessage.innerHTML = '';
      userInput = userInput.slice(0, userInput.length-1);
      console.log(userInput);
      gameGrid.childNodes[userInput.length].innerHTML = '';
    } 
  }

  //animates the boxes with a shake if they are wrong
  function shakeBoxes() {
    gameGrid.childNodes[userInput.length-1].classList.add("apply-shake");
    gameGrid.childNodes[userInput.length-1].addEventListener("animationend", (e) => {
    gameGrid.childNodes[userInput.length-1].classList.remove("apply-shake");
    });

    gameGrid.childNodes[userInput.length-2].classList.add("apply-shake");
    gameGrid.childNodes[userInput.length-2].addEventListener("animationend", (e) => {
    gameGrid.childNodes[userInput.length-2].classList.remove("apply-shake");
    });

    gameGrid.childNodes[userInput.length-3].classList.add("apply-shake");
    gameGrid.childNodes[userInput.length-3].addEventListener("animationend", (e) => {
    gameGrid.childNodes[userInput.length-3].classList.remove("apply-shake");
    });

    gameGrid.childNodes[userInput.length-4].classList.add("apply-shake");
    gameGrid.childNodes[userInput.length-4].addEventListener("animationend", (e) => {
    gameGrid.childNodes[userInput.length-4].classList.remove("apply-shake");
    });

    gameGrid.childNodes[userInput.length-5].classList.add("apply-shake");
    gameGrid.childNodes[userInput.length-5].addEventListener("animationend", (e) => {
    gameGrid.childNodes[userInput.length-5].classList.remove("apply-shake");
    });
  } 