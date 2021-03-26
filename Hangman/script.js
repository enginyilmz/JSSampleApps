
const wordArea = document.getElementById('word');
const wrongLettersArea = document.querySelector('#wrong-letters');
const h3 = document.createElement('h3');
h3.innerHTML = 'Wrong Letters';
const span = document.createElement('span')
const popupContainer = document.getElementById('popup-container');
const popup = document.querySelector('.popup');
const hangMan = document.querySelectorAll('.item');
const message =  document.getElementById('message');
const messageBox = document.getElementById('message-box');
const btn = document.getElementById('play-again');
let selectedWord = getRandomWord();

const correctLetters = [];
const wrongLetters = [];

function getRandomWord() {
    const words = ['javascript', 'java', 'python']
    const randomNumber = Math.floor(Math.random() * words.length);
    return words[randomNumber];
}

function displayWord() {
    wordArea.innerHTML = '';
    for (let l of selectedWord) {
        const letter = document.createElement('div');
        letter.classList.add('letter');
        letter.innerText = correctLetters.includes(l) ? l : '';
        wordArea.appendChild(letter);
    }

    const w = wordArea.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popupContainer.style.display = 'flex';
    }
}

function updateWrongLetters() {
    if (wrongLetters.length === 1) {
        wrongLettersArea.appendChild(h3);
    }

    span.innerHTML = wrongLetters.join(', ');
    wrongLettersArea.appendChild(span);
    updateHangMan();
}

function updateHangMan() {
    for (let i = 0; i < wrongLetters.length; i++) {
        hangMan[i].style.display = 'block';
    }

    if(wrongLetters.length===5){
        popupContainer.style.display='flex';
        popup.style.backgroundColor = 'Red';
        message.innerText='You lost The Game!';
    }
}

function displayMessageBox()
{
    messageBox.classList.add('show');

    setTimeout(function(){
        messageBox.classList.remove('show');
    },2000);
}

btn.addEventListener('click',function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
  

    popupContainer.style.display='none';
    popup.style.backgroundColor = 'Green';
    message.innerText='You win :)';
    wrongLettersArea.innerHTML='';

    hangMan.forEach(function(item){
        item.style.display = 'none';
    });
    

})

window.addEventListener('keydown', function (e) {
    if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 222) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                displayMessageBox();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }
});

displayWord();

