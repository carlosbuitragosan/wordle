// arrows movements
export function moveRight(event, keyIndex, keys) {
    event.preventDefault();
    keyIndex = (keyIndex + 1) % keys.length;
    keys[keyIndex].focus();
    return keyIndex;
  }
  
  export function moveLeft(event, keyIndex, keys) {
    event.preventDefault();
    keyIndex = (keyIndex - 1 + keys.length) % keys.length;
    keys[keyIndex].focus();
    return keyIndex;
  }
  
  export function moveDown(event, keyIndex, keys) {
    event.preventDefault();
    const nextRowIndex = Math.floor((keyIndex + 1) / 9);
    if (nextRowIndex < Math.ceil(keys.length / 9)) {
      keyIndex = Math.min(keyIndex + 9, keys.length - 1);
      keys[keyIndex].focus();
    }
    return keyIndex;
  }
  
  export function moveUp(event, keyIndex, keys) {
    event.preventDefault();
    const prevRowIndex = Math.floor((keyIndex - 1) / 9);
    if (prevRowIndex >= 0) {
      keyIndex = Math.max(keyIndex - 9, 0);
      keys[keyIndex].focus();
    }
    return keyIndex;
  }
  
export function handleEnter(keyIndex, keys, enterCount, guessBoxes, checkWord) {
    const currentGuessBox = document.querySelector(`.guessBox1-${enterCount + 1}`);
    if (keys[keyIndex].textContent === 'Backspace') { // Delete the previous selection
      const previousGuessBox = document.querySelector(`.guessBox1-${enterCount}`);
      if (previousGuessBox) {
        previousGuessBox.textContent = '';
        enterCount = Math.max(enterCount - 1, 0);
      }
    } else {
      currentGuessBox.textContent = keys[keyIndex].textContent;
      enterCount = (enterCount + 1) % 6;
      if (enterCount === 0 && guessBoxes[guessBoxes.length - 1].textContent !== '') {
        checkWord();
      }
    }
    return enterCount;
  }

