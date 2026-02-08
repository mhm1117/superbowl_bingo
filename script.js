window.addEventListener('DOMContentLoaded', init);

let cardsFile = "./bingoCards.csv";
let cardNum = -1;
let bingoCards;

function init() {
    setUpBingo(cardsFile);
    
    addSquareFunc();

    addResetFuncs();
}

function addSquareFunc() {
    let squares = document.querySelectorAll(".square");

    for (const square of squares) {
        let text = square.querySelector("p");
        square.addEventListener('click', event => {
            let sqNum = square.getAttribute('sqNum');
            let selected = localStorage.getItem("square"+ sqNum);
            if (selected == "no") {
                text.style.backgroundColor = "#FFF11B";
                localStorage.setItem("square" + sqNum, "yes");
                checkBingo(sqNum);
            } else {
                text.style.backgroundColor = "white";
                localStorage.setItem("square" + sqNum, "no");
            }
        });
    }
}

function addResetFuncs() {
    let rechooseBtn = document.getElementById("rechoose-btn");

    rechooseBtn.addEventListener('click', event => {
        localStorage.clear();
        window.location.reload();
    });

    let resetBtn = document.getElementById("reset-btn");

    resetBtn.addEventListener('click', event => {
        let squares = document.querySelectorAll(".square");
        let x = 0;
        for (let square of squares) {
            square.setAttribute('sqNum', x);
            localStorage.setItem("square" + x, "no");
            x++;
        }
        window.location.reload();
    });
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
    let resetBtns = document.getElementById("reset-btns");
    resetBtns.style.display = "inline-block";
    let bg1 = document.getElementById("bg-team1");
    let bg2 = document.getElementById("bg-team2");
    bg1.style.border = "none";
    bg2.style.border = "none";
    let patslogo = document.getElementById("pats-logo");
    let hawkslogo = document.getElementById("hawks-logo");
    patslogo.style.display = "none";
    hawkslogo.style.display = "none";
    let page = document.querySelector("body");
    page.style.overflow = visible;
}

function checkBingo(sqNum) {
    
    // sqNum == 13
    console.log("Square Number: " + sqNum);
    let remainder = sqNum % 5; // == 3
    let multiple = parseInt(sqNum / 5) // == 2
    let diagonalUp = sqNum % 4 == 0 && sqNum != 24;
    let diagonalDown = sqNum % 6 == 0;

    let bingoFlags = [];
    for (let i = 5 * multiple; i < 5 * (multiple + 1); i++) {
        if (localStorage.getItem("square" + i) == "no") {
            bingoFlags.push(false);
            break;
        }
    }

    for (let i = remainder; i <= 20 + remainder; i += 5) {
        if (localStorage.getItem("square" + i) == "no") {
            bingoFlags.push(false);
            break;
        }
    }

    if (diagonalUp) {
        for (let i = 4; i <= 20; i += 4) {
            if (localStorage.getItem("square" + i) == "no") {
                bingoFlags.push(false);
                break;
            }
        }
    } else {
        bingoFlags.push(false);
    }

    if (diagonalDown) {
        for (let i = 0; i < 25; i += 6) {
            if (localStorage.getItem("square" + i) == "no") {
                bingoFlags.push(false);
                break;
            }
        }
    } else {
        bingoFlags.push(false);
    }

    let numBingos = (4 - bingoFlags.length);
    if (numBingos > 0) {
        celebrateBingo(numBingos);
    }
}

function celebrateBingo(numBingos) {
    let bingoMsg = "YOU GOT BINGO!"
    console.log(numBingos);
    switch(numBingos) {
        case 2:
            bingoMsg = "DOUBLE BINGO!!";
            break;
        case 3:
            bingoMsg = "TRIPLE BINGO!!!";
            break;
        case 4:
            bingoMsg = "QUADRUPLE BINGO!?!?"
            break;
    } 
    console.log("YAY! " + bingoMsg);

    let bingoDisplay = document.getElementById("bingo-msg");
    let bingoMsgHolder = document.getElementById("bingo-msg-holder");
    bingoMsgHolder.innerText = bingoMsg;
    bingoDisplay.style.display = "block";
    setTimeout(() => {
        bingoDisplay.style.display = "none";
    }, 2000);
}