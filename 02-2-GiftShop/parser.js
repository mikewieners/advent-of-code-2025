
const input = require('./testData.js');

let checkSum = 0
function findAndSumInvalidProducts(range) {
    let rangeArray = range.split("-");
    let start = parseInt(rangeArray[0]);
    let end = parseInt(rangeArray[1]);

    for (let i = start; i <= end; i++){
        idString = i.toString();

        let maxDivisor = idString.length / 2;
        for (let j = 1; j <= maxDivisor; j++){
            if (idString.length % j !== 0){
                continue;
            }

            let splits = [];
            splits = getSplitsArray(idString, j);
            if (!isValid(splits, j)) {
                checkSum += i;
                break;
            }
        }
    }
}

function getSplitsArray(targetString, chunkSize){
    let chunks = [];
    for (let i = 0; i < targetString.length; i += chunkSize){
        chunks.push(targetString.substring(i, i+chunkSize));
    }
    return chunks;
}

function isValid(splitsArray){
    for (let i = 1; i < splitsArray.length; i++){
        if (splitsArray[0] !== splitsArray[i]){
            return true;
        }
    }
    return false;
}

function processIDs(rangesToCheck) {
    rangesToCheck.forEach(i => {
        findAndSumInvalidProducts(i);
    });
    console.log(`The checksum value is ${checkSum}.`);
}

processIDs(input);