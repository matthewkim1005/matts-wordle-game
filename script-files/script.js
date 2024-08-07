import { fiveLetterWords } from './5-letter-words.js';

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

const keys = document.querySelectorAll(".key");
const gameGrid = document.querySelector(".game-grid")
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

// Keyboard Code -------------------------------------------------------------------------------------------------------------

init();
render();

keys.forEach((key) => {
    key.addEventListener('click', (event) => {
      if (key.innerHTML === 'Clear') {
        clearButton(event);
      } else {
        userInput += key.innerHTML;
        gameGrid.childNodes[userInput.length-1].innerHTML = key.innerHTML.toUpperCase();
        if (userInput.length % 5 === 0) {
          if (wordExists(userInput.substr(userInput.length - 5))) {
            checkWord();
          } else {
            winMessage.innerHTML = 'Invalid word! Please try again';
            shakeBoxes();
          }
        }
      }
    });
  });

// Initialize Functions --------------------------------------------------------------------------------------------------------  

  function init() {
    //select random word from the array of 5-letter-words
    document.addEventListener('keyup', keyboardInput, true);
    resetButton.addEventListener('click', reset);
    randomWord = '';
    userInput = [];
    currentWord = '';
    guessedLetters = [];
    correctLetters = [];
    wrongLetters = [];
    containsLetters = [];
    numGuesses = 0;
    won = false;
    clear();
    
    randomWord = fiveLetterWords[getRandomIndex(fiveLetterWords.length)].toUpperCase();
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

    //removes the classlists to reset the board
    keys.forEach(key => {
      key.classList.remove("correct");
      key.classList.remove("wrong");
      key.classList.remove("containsLetter");
      });
    }

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  //Functions --------------------------------------------------------------------------------------------------------  

  function keyboardInput(event) {
    //appends sets the childNode's letter to the inputed key
    if (event.key === 'Backspace') {
      clearButton(event);
    }
    //catches non-letter keys
    else if (event.key === 'Shift' || event.key === 'Enter' || event.key === 'Alt' || event.key === 'Meta' || event.key === 'Command' 
      || event.key === 'Control' || event.key === 'Tab' || event.key === '\\' || event.key === ' ' || event.key === 'ArrowRight'
      || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Escape' || event.key === 'F12') {
      return;
    } else {
      userInput += event.key.toUpperCase();
      gameGrid.childNodes[userInput.length-1].innerHTML = event.key.toUpperCase();
      if (userInput.length % 5 === 0) {
        if (wordExists(userInput.substr(userInput.length - 5))) {
          checkWord();
        } else {
          winMessage.innerHTML = 'Invalid word! Please try again';
          shakeBoxes();
        }
      }
    }
  }

  function checkWord() {
    winMessage.innerHTML = '';
    let index = userInput.length - 5;
    let tempWord = randomWord.toUpperCase();;
    currentWord = userInput.substr(userInput.length - 5).toUpperCase();

    for (let i = 0; i < 5; i++) {
      if (currentWord === tempWord) {
        gameGrid.childNodes[index + i].classList.add('correct');
        won = true;
        correctGuess(i, index);
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
    gameEnd();
    checkWinner();
    updateKeyboard();
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
    if(fiveLetterWords.includes(userWord.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  function reset() {
    init();
  }

  //ends game if more than 6 guesses
  function gameEnd() {
    if (userInput.length > 29 && !won) {
      winMessage.innerHTML = `You lost! The word is ${randomWord}`;
    } else {
      return;
    }
  }

  function clearButton(event) {
    if (userInput.length%5 === 0 && wordExists(userInput.substr(userInput.length - 5))) {
      return;
    } else {
      winMessage.innerHTML = '';
      userInput = userInput.slice(0, userInput.length-1);
      gameGrid.childNodes[userInput.length].innerHTML = '';
    } 
  }

  function updateKeyboard() {
    keys.forEach(key => {
      //checks the correct letters
      for (let i = 0; i < correctLetters.length ; i++) {
        if (correctLetters[i].toUpperCase().includes(key.innerHTML)){
          key.classList.add("correct");
        }
      }
      //checks the wrong letters
      for (let i = 0; i < wrongLetters.length ; i++) {
        if (wrongLetters[i].toUpperCase().includes(key.innerHTML)){
          key.classList.add("wrong");
        }
      }
      //checks the contains letters
      for (let i = 0; i < containsLetters.length ; i++) {
        if (containsLetters[i].toUpperCase().includes(key.innerHTML)){
          key.classList.add("containsLetter");
        }
      }
    })
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