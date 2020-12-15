const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');

let selectedWord;
let correctLetters = []

selectedWord = fetchWord()


// Fetch selected word
function fetchWord() {
    fetch('https://random-word.ryanrk.com/api/en/word/random')
        .then(res => res.json())
        .then(data => selectedWord = data.toString())
}


// Singelton naite leiab sona salvestamisel, mis laseb mangus olla korraga vaid uhel sonal.
class Word {
    constructor(word) {
        if (Word.exists) {
            return Word.instance
        }
        Word.instance = this
        Word.exists = true
        this.word = word
    }

    getWord() {
        return this.word
    }
}



setTimeout(()=> {


   const w1 = new Word(selectedWord.toLowerCase())
    console.log(w1.getWord())


addEventListener('keydown', (e) => {
    let letter = e.key
    if (w1.getWord().includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter)
            displayWord()
        } else {
            correctLetters.push(letter)
        }
    }
});

function displayWord() {
    wordEl.innerHTML = `
    ${w1.getWord().split('').map(letter =>
        `<span class="letter"> ${correctLetters.includes(letter) ? letter : ''} </span>`).join("")}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, "");

    if (innerWord === w1.getWord()) {
        finalMessage.innerText = 'YAHOO';
        popup.style.display = 'flex';
    }
}
    displayWord()

    if(selectedWord.includes("-")){
        correctLetters.push("-")
        displayWord()
    } else if (selectedWord.includes("\'")){
        correctLetters.push("\'")
        displayWord()
    }

}, 1000)






