
import { manifold } from './testData.js';
let splitCount = 0;

let beamLocations = [];
beamLocations = findCharacterIndices(manifold[0], 'S');
for (let i = 1; i < manifold.length; i++) {

}

function findCharacterIndices(arr, char) {
    let charIndices = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === char) { charIndices.push(i) }
    }
    return charIndices;
}