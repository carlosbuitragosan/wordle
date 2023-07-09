import { moveRight, moveLeft, moveDown, moveUp, handleEnter } from "./utils.js";

const keys = document.querySelectorAll('.key');
const guessBoxes = document.querySelectorAll('.guessBox');
const result = document.querySelector('.result');
const buttonReload = document.querySelector('.button__reload');
let keyIndex = 0;
let enterCount = 0;


// Function to perform an action on a selected key
function submitLetterGuess(key) {
    const currentGuessBox = document.querySelector(`.guessBox1-${keyIndex + 1}`);
    if (currentGuessBox) {
            if (key.textContent === 'Backspace') { // Delete the previous entry 
            const previousGuessBox = document.querySelector(`.guessBox1-${keyIndex}`);
            if (previousGuessBox) {
                previousGuessBox.textContent = '';
                keyIndex = Math.max(keyIndex - 1, 0);
            }
        } 
        else { // Place the selected character in the respective box
        currentGuessBox.textContent = key.textContent;
        keyIndex = (keyIndex + 1) % (keys.length - 1);
            if (keyIndex === 6 && guessBoxes[guessBoxes.length - 1].textContent !== '') {
                checkWord();
            }  
        }
    }
  }
  
  // Event listener for Backspace key
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Backspace') {
        event.preventDefault();
        submitLetterGuess({ textContent: 'Backspace' });
    }
  });
  

  
// navigates throough the keyboard using arrow keys or tab key 
document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight') {
        keyIndex = moveRight(event, keyIndex, keys);
      } else if (event.key === 'ArrowLeft') {
        keyIndex = moveLeft(event, keyIndex, keys);
      } else if (event.key === 'ArrowDown') {
        keyIndex = moveDown(event, keyIndex, keys);
      } else if (event.key === 'ArrowUp') {
        keyIndex = moveUp(event, keyIndex, keys);
      }
    if (event.key === 'Enter') {
        enterCount = handleEnter(keyIndex, keys, enterCount, guessBoxes, checkWord);
    }
  });

  // Submit guess for each key
  keys.forEach((key) => {
    key.addEventListener('click', () => {
        submitLetterGuess(key);
    });
  });



  
  // Function to check the submitted word
function checkWord() {
    const submittedWord = Array.from(guessBoxes)
      .map((guessBox) => guessBox.textContent)
      .join('');
    const targetWord = 'london';
    if (submittedWord.toLowerCase() === targetWord) {
        result.insertAdjacentHTML('beforeend', '<span>Congratulations! You guessed the word correctly!</span>');
        buttonReload.classList.add('button__reload_show')
    }
    else {
        result.insertAdjacentHTML('beforeend', '<p>Incorrect guess.</p>');
        buttonReload.classList.add('button__reload_show')
    }
}
  
function reloadPage() {
    location.reload();
}
buttonReload.addEventListener('click', reloadPage);
