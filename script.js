window.addEventListener('DOMContentLoaded', init);

let cardsFile = "./bingoCards.csv";
let cardNum = -1;
let bingoCards;

function init() {
    getBingoCards(cardsFile);
    getCardNum();
}

function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const result = [];
  
    for (const row of rows) {
      const values = row.split(',');
      result.push(values);
    }
    result.pop();
    return result;
}

async function getBingoCards(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();

    bingoCards = parseCSV(myText);
}

function getCardNum() {
    const numForm = document.querySelector("form");

    numForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(numForm);
        cardNum = formData.get('num') - 1;
        enterBingo(numForm);
    });
}

function fillEntries() {

    let entries = document.querySelectorAll(".entry");
    let card = bingoCards[cardNum];
    let x = 0;
    entries.forEach(entry => {
        entry.textContent = card[x];
        x++;
    });
}

function enterBingo(form) {
    if (cardNum >= 0 && cardNum <= 15) {
        fillEntries();
        let numPicker = document.getElementById("num-picker");
        numPicker.style.display = "none";
        let bingo = document.getElementById("bingo-card");
        bingo.style.display = "flex";
    } else {
        let badNumMsg = document.getElementById("badnum-msg");
        badNumMsg.style.display = "inline";
        form.reset();
    }
}