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
// (Extra): Making it harder with more than 5 letters.

//------------------------------------------------------------------------------------------------------------------

const fiveLetterWords = require('script-files/5-letter-words.js')   
