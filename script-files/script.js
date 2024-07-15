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
let userInput = [];
let numGuesses = 0;

const keys = document.querySelectorAll(".key");
const gameGrid = document.querySelector(".game-grid")
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

// Code -------------------------------------------------------------------------------------------------------------

init();

document.addEventListener('keypress', keyboardInput, true);

keys.forEach((key) => {
    key.addEventListener('click', (event) => {
    });
  });

// Functions --------------------------------------------------------------------------------------------------------  

  function init() {
    //select random word from the array of 5-letter-words
    randomWord = fiveLetterWords[getRandomIndex(fiveLetterWords.length)];

    //then create the grid for the wordle game
    console.log(randomWord);
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 5; c++) {
        //creates a div for each row and column
        const letter = document.createElement('div');
        letter.classList.add('letter');
        gameGrid.appendChild(letter);
      }
    }
  }

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  function keyboardInput(event) {
    userInput += event.key;
    //appends sets the childNode's letter to the inputed key
    gameGrid.childNodes[userInput.length-1].innerHTML = event.key;
    if (userInput.length % 5 === 0) {
        checkWord(userInput);
    }
  }

//   function stopInput(event) {
//     document.removeEventListener('keypress', keyboardInput(event), false);
//   }

  function checkWord(guess) {
    // setTimeout(stopInput, 1000);
    let index = numGuesses * 5;
    for (let i = 0; i < 5; i++) {
      console.log(index + i);
      if (userInput.charAt(index + i) === randomWord.charAt(i)) {
        gameGrid.childNodes[index + i].classList.add('correct');
      } else if (userInput.charAt(index + i) !== randomWord.charAt(i) && !randomWord.includes(userInput.charAt(index + i))) {
        gameGrid.childNodes[index + i].classList.add('wrong');
      } else {
        gameGrid.childNodes[index + i].classList.add('containsLetter');
      }

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
  
    // gameGrid.childNodes[0].animate(flipLetter, flipTiming);
    // gameGrid.childNodes[1].animate(flipLetter, flipTiming2);
    // gameGrid.childNodes[2].animate(flipLetter, flipTiming3);
    // gameGrid.childNodes[3].animate(flipLetter, flipTiming4);
    // gameGrid.childNodes[4].animate(flipLetter, flipTiming5);
  }