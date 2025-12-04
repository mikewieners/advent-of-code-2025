
const input = require('./testData.js');
let movedRolls = [];
let movedRollsCount = 0;

function countOfAdjacentRollsInPreviousRow(currentRowIndex, currentPositionIndex) {
    let adjacentRollCount = 0;
    let previousRowIndex = currentRowIndex - 1;
    if (previousRowIndex < 0) {
        return 0;
    }
    let rowArray = input[previousRowIndex].split('');
    for (i = currentPositionIndex - 1; i <= currentPositionIndex + 1; i++) {
        if (i < 0) { continue; }
        rowArray[i] === '@' || rowArray[i] === 'X' ? adjacentRollCount++ : null;
    }
    return adjacentRollCount;
}

function countOfAdjacentRollsInCurrentRow(currentRowIndex, currentPositionIndex) {
    let adjacentRollCount = 0;
    let rowArray = input[currentRowIndex].split('');
    for (i = currentPositionIndex - 1; i <= currentPositionIndex + 1 && i < rowArray.length; i += 2) {
        if (i < 0) { continue; }
        rowArray[i] === '@' || rowArray[i] === 'X' ? adjacentRollCount++ : null;
    }
    return adjacentRollCount;
}

function countOfAdjacentRollsInNextRow(currentRowIndex, currentPositionIndex) {
    let adjacentRollCount = 0;
    let nextRowIndex = currentRowIndex + 1;
    if (nextRowIndex === input.length) {
        return 0;
    }
    let rowArray = input[nextRowIndex].split('');
    for (i = currentPositionIndex - 1; i <= currentPositionIndex + 1; i++) {
        if (i < 0) { continue; }
        rowArray[i] === '@' || rowArray[i] === 'X' ? adjacentRollCount++ : null;
    }
    return adjacentRollCount;
}

function findMovableRolls() {
    let currentLayout = input;
    console.log('Initial State:')
    currentLayout.forEach(r => {
        console.log(r);
    });
    let rollsMovedOnThisPass = 0;
    do {
        rollsMovedOnThisPass = 0;
        for (r = 0; r < currentLayout.length; r++) {
            let rowArray = currentLayout[r].split('');
            let newRow = '';
            let movableRollsInRow = 0;
            for (p = 0; p < rowArray.length; p++) {
                if (rowArray[p] != '@') {
                    newRow += '.';
                    continue;
                }
                let adjacentRolls = 0;
                adjacentRolls += countOfAdjacentRollsInPreviousRow(r,p);
                adjacentRolls += countOfAdjacentRollsInCurrentRow(r,p);
                adjacentRolls += countOfAdjacentRollsInNextRow(r,p);
                if (adjacentRolls < 4) {
                    movableRollsInRow++;
                    newRow += 'X';
                } else {
                    newRow += '@';
                }
            }
            rollsMovedOnThisPass += movableRollsInRow;
            // console.log(`There are ${movableRollsInRow} movable rolls in the row at index ${r}`)
            currentLayout[r] = newRow;
        }
        movedRollsCount += rollsMovedOnThisPass;
        movedRolls = currentLayout;
        console.log(`This pass removed ${rollsMovedOnThisPass} as illustrated:`)
        for (r = 0; r < movedRolls.length; r++) {
            let thisRowText = movedRolls[r];
            console.log(thisRowText);
            movedRolls[r] = thisRowText.replace('X', '.');
        }

        console.log(`This leaves the current state as:`)
        for (r = 0; r < movedRolls.length; r++) {
            let thisRowText = movedRolls[r];
            console.log(thisRowText);
        }
    } while (rollsMovedOnThisPass > 0);
    console.log(`A total of ${movedRollsCount} rolls were moved`)
}

findMovableRolls();