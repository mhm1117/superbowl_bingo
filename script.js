window.addEventListener('DOMContentLoaded', init);

let main21 = ["Commentator Glazes Mahomes","Taylor Sighting","BS Pro-Chief Flag Call",
              "Barkley 30+ Yard TD","Mahomes Toes Sideline For 1st Down","Chiefpeat mentioned",
              "Missed Field Goal","Game goes into OT","Successful Challenge","Pick-6",
              "Crazy Impressive Catch","Fight Fight Fight","Player Throws Tantrum",
              "Top Notch TD Celebration","Missed Extra Point","Turnover on downs","Chiefs Touchdown",
              "Eagles Touchdown","Fumble / Interception","20+ yard catch","Quarterback Running Touchdown"];

let commsComp = ["FanDuel","Geico","State Farm","BudLight","Coca-Cola","Toyota","Kia","Michelob Ultra",
             "M&Ms","Little Caesars","UberEats","Wing Stop","Doritos","Redbull","Allstate"];

let commsFeat = ["Mahomes","Purdy","Kelce Brothers","Musical Artist","Backup QB"];

function init() {

    fillEntries();
}

function fillEntries() {

    let entries = document.querySelectorAll(".entry");
    let cardList = ['20+ yard catch', 'Geico', 'Successful Challenge', 'Missed Extra Point', 'Commentator Glazes Mahomes', 'BS Pro-Chief Flag Call', 'Allstate', 'Backup QB', 'Chiefpeat mentioned', 'Chiefs Touchdown', 'Game goes into OT', 'Crazy Impressive Catch', 'Fight Fight Fight', 'Barkley 30+ Yard TD', 'Pick-6', 'Fumble / Interception', 'FanDuel', 'Taylor Sighting', 'Top Notch TD Celebration', 'Player Throws Tantrum', 'Missed Field Goal', 'Mahomes Toes Sideline For 1st Down', 'Turnover on downs', 'Eagles Touchdown', 'Quarterback Running Touchdown'];
    let x = 0;
    entries.forEach(entry => {
        entry.textContent = cardList[x];
        x++;
    });
}

function selectCommsComp() {
    
}