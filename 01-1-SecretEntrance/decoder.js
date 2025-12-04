
const input = require('./testData.js');

let endZerosCount = 0;
let totalZerosCount = 0;
let dialPosition = 50;

function ProcessTheTestData() {
    input.forEach(t => TurnTheDial(t));
    console.log(endZerosCount, totalZerosCount, dialPosition);
}

function TurnTheDial(turn) {
    let dir = turn.substring(0, 1).toUpperCase();
    let clicks = turn.substring(1);
    let zeroPasses = Math.floor(clicks/100);
    let thisPosition = dialPosition;
    if (dir === 'R'){
        dialPosition += clicks % 100;
    } else {
        dialPosition -= clicks % 100;
    }

    if (dialPosition < 0){
        dialPosition += 100;
        thisPosition === 0 ? null : zeroPasses++;
    } else if (dialPosition > 99) {
        dialPosition -= 100;
        dialPosition === 0 ? null : zeroPasses++;
    }
    
    if (dialPosition === 0){
        zeroPasses++;
        endZerosCount++;
    }
    totalZerosCount += zeroPasses;
}

ProcessTheTestData();