
import { manifold } from './testData.js';

let manifoldDiagramResult = [manifold[0]];
let rowLength = manifold[0].length;
let splitCount = 0;

let beamStartIndex = manifold[0].indexOf('S');
let lastRowBeamIndices = [beamStartIndex];

function findTheSplits() {
    for (let i = 1; i < manifold.length; i++) {
        let thisRow = manifold[i];
        let thisRowResult = [];
        let newBeamLocations = [];
        if (i % 2 != 0) {
            for (let r = 0; r < rowLength; r++) {
                if (lastRowBeamIndices.includes(r)) {
                    thisRowResult.push('|');
                    newBeamLocations.push(r);
                    continue;
                }
                thisRowResult.push('.');
            }
            lastRowBeamIndices = []
            newBeamLocations.forEach(i => {
                lastRowBeamIndices.push(i);
            });
            manifoldDiagramResult.push(thisRowResult);
            continue;
        }
        
        for (let r = 0; r < rowLength; r++) {
            if (lastRowBeamIndices.includes(r)) {
                if (thisRow[r] === '^') {
                    newBeamLocations.push(r-1);
                    newBeamLocations.push(r+1);
                    thisRowResult.push('^');
                    splitCount++
                    continue;
                }

                newBeamLocations.push(r)
                thisRowResult.push('|');
                continue;
            }
            thisRowResult.push('.');
        }
        lastRowBeamIndices = []
        newBeamLocations.forEach(i => {
            lastRowBeamIndices.push(i);
        });
        manifoldDiagramResult.push(thisRowResult);
    }
    manifoldDiagramResult.forEach(l => {
        let logString = '';
        l.forEach(c => {
            logString += c;
        });
        console.log(logString);
    });
    console.log(`Total splits: ${splitCount}`)
}

findTheSplits();