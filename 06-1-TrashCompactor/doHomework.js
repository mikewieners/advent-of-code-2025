
import { worksheetMatrix } from './testData.js';

let checkSum = 0;

function doHomework() {
    let countOfColumns = worksheetMatrix[0].length;
    let countOfNumberRows = worksheetMatrix.length - 1;
    for (let i = 0; i < countOfColumns; i++) {
        let theseNumbers = [];
        let operatorsArray = worksheetMatrix[countOfNumberRows];
        let operator = operatorsArray[i];
        let nextOperatorIndex = operatorsArray.findIndex((element, idx) => {
            return idx > i && element !== '';
        });
        nextOperatorIndex = nextOperatorIndex < 0 ? countOfColumns + 1 : nextOperatorIndex;
        theseNumbers = getNumbersToMath(i, nextOperatorIndex-i-1, countOfNumberRows);
        i = nextOperatorIndex - 1;
        if (operator === '+') {
            checkSum += addNumbers(theseNumbers);
            continue;
        }
        checkSum += multiplyNumbers(theseNumbers);
    }
    console.log(`${checkSum}`);
}

function getNumbersToMath(start, columnWidth, rowCount) {
    let numbersToMath = [];
    for (let j = start; j < start + columnWidth; j++) {
        let thisNumber = '';
        for (let i = 0; i < rowCount; i++) {
            thisNumber += worksheetMatrix[i][j];
        }
        numbersToMath.push(parseInt(thisNumber));
    }
    return numbersToMath;
}

function addNumbers(numbersToAdd) {
    let sum = 0;
    numbersToAdd.forEach(n => {
        sum += n;
    });
    return sum;
}

function multiplyNumbers(numbersToMultiply) {
    let product = 0;
    numbersToMultiply.forEach((n, i) => {
        if (i === 0) {
            product += n;
        } else {
            product *= n;
        }
    });
    return product;
}

doHomework();