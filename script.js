window.addEventListener('DOMContentLoaded', init);

let cardsFile = "./bingoCards.csv";
let cardNum = -1;
let bingoCards;

function init() {
    setUpBingo(cardsFile);
    
    addSquareFunc();
}

function addSquareFunc() {
    let squares = document.querySelectorAll(".square");

    for (const square of squares) {
        let text = square.querySelector("p");
        square.addEventListener('click', event => {
            let sqNum = square.getAttribute('sqNum');
            console.log(sqNum);
            let selected = localStorage.getItem("square"+ sqNum);
            if (selected == "no") {
                text.style.backgroundColor = "#FFF11B";
                localStorage.setItem("square" + sqNum, "yes");
            } else {
                text.style.backgroundColor = "white";
                localStorage.setItem("square" + sqNum, "no");
            }
        });
    }
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

async function setUpBingo(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();

    bingoCards = parseCSV(myText);

    let storedCardNum = localStorage.getItem("card_number");
    if (storedCardNum != null) {
        if (storedCardNum >= 0 && cardNum <= 14) {
            cardNum = storedCardNum;
            enterBingo();
        }
    } else {
        getCardNum();
    }
}

function getCardNum() {
    const numForm = document.querySelector("form");

    numForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(numForm);
        cardNum = formData.get('num') - 1;
        if (cardNum >= 0 && cardNum <= 14) {
            localStorage.setItem("card_number", cardNum);
            let squares = document.querySelectorAll(".square");
            let x = 0;
            for (let square of squares) {
                square.setAttribute('sqNum', x);
                localStorage.setItem("square" + x, "no");
                x++;
            }
            enterBingo();
        } else {
            let badNumMsg = document.getElementById("badnum-msg");
            badNumMsg.style.display = "inline";
            numForm.reset();
        }
        enterBingo();
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

    let squares = document.querySelectorAll(".square");
    let y = 0;
    for (let square of squares) {
        square.setAttribute('sqNum', y);
        let text = square.querySelector("p");
        let selected = localStorage.getItem("square"+y);
        if (selected == "no") {
            text.style.backgroundColor = "white";
        } else if (selected == "yes"){
            text.style.backgroundColor = "#FFF11B";
        }
        y++;
    }
}

function enterBingo() {
    fillEntries();
    let numPicker = document.getElementById("num-picker");
    numPicker.style.display = "none";
    let bingo = document.getElementById("bingo-card");
    bingo.style.display = "flex";
}