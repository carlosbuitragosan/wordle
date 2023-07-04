const keys = document.querySelectorAll('.key');

let currentKeyIndex = 0;


// Function to perform an action on a selected key
function performAction(key) {
    const currentLetter = document.querySelector(`.letter1-${currentKeyIndex + 1}`);
  
    if (currentLetter) {
      if (key.textContent === 'Backspace') {
        // Delete the previous selection
        const previousLetter = document.querySelector(`.letter1-${currentKeyIndex}`);
        if (previousLetter) {
          previousLetter.textContent = '';
          currentKeyIndex = Math.max(currentKeyIndex - 1, 0);
        }
      } else {
        // Place the selected character in the respective <div>
        currentLetter.textContent = key.textContent;
        currentKeyIndex = (currentKeyIndex + 1) % (keys.length - 1);
      }
    }
  }
  
  // Event listener for Backspace key
  document.addEventListener('keydown', (event) => {
    
    if (event.key === 'Backspace') {
      event.preventDefault();
      performAction({ textContent: 'Backspace' });
    }
  });
  

  
  
  // Event listener for ENTER key press
  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    const currentLetter = document.querySelectorAll(`.letter1-${currentKeyIndex}`);

    if (event.key === 'Enter') {
        if (currentLetter) {
            console.log('empty box', currentLetter)
            console.log('key pressed', keys[currentKeyIndex].textContent)
        // currentLetter.textContent = key.textContent;
        // currentKeyIndex = (currentKeyIndex + 1) % (keys.length - 1);
        }
    }
  });
  

  
  
  

  
// navigates throough the keyboard using arrow keys or tab key 
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      currentKeyIndex = (currentKeyIndex + 1) % keys.length;
      keys[currentKeyIndex].focus();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      currentKeyIndex = (currentKeyIndex - 1 + keys.length) % keys.length;
      keys[currentKeyIndex].focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextRowIndex = Math.floor((currentKeyIndex + 1) / 10);
      if (nextRowIndex < Math.ceil(keys.length / 10)) {
        currentKeyIndex = Math.min(currentKeyIndex + 10, keys.length - 1);
        keys[currentKeyIndex].focus();
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevRowIndex = Math.floor((currentKeyIndex - 1) / 10);
      if (prevRowIndex >= 0) {
        currentKeyIndex = Math.max(currentKeyIndex - 10, 0);
        keys[currentKeyIndex].focus();
      }
    } 
    // else if (event.key === 'Enter') {
    //     event.preventDefault();

    //     console.log(keys[currentKeyIndex]);
    //   }
  });


  

  keys.forEach((key) => {
    key.addEventListener('click', () => {
      performAction(key);
    });
  });

  
 
  
  
  
  
  
  
   

