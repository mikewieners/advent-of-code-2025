
import { freshRanges, ingredients } from './testData.js';

let freshIngredients = [];
let spoiledIngredients = [];
let countAllFreshIds = 0;

function sortAndCondenseRanges() {
    freshRanges.sort((a, b) => {
        let aStart = parseInt(a.split('-')[0]);
        let bStart = parseInt(b.split('-')[0]);
        if (aStart !== bStart) {
            return aStart - bStart;
        }
        return parseInt(a.split('-')[1] - b.split('-')[1]);
    });
    
    let condensedRanges = [freshRanges[0]];
    for (let i = 1; i < freshRanges.length; i++) {
        let lastRangeIndex = condensedRanges.length - 1;
        let lastRange = condensedRanges[lastRangeIndex].split('-').map(Number);
        let currentRange = freshRanges[i].split('-').map(Number)
        if (currentRange[0] <= lastRange[1]) {
            if (currentRange[1] <= lastRange[1]) {
                continue;
            }
            let replaceRange = `${lastRange[0]}-${currentRange[1]}`;
            condensedRanges[lastRangeIndex] = replaceRange;
            continue;
        }
        condensedRanges.push(freshRanges[i]);
    }
    
    return condensedRanges;
}

function checkIngredients(rangesToCheck) {
    ingredients.sort((a, b) => a - b);
    for (let i = 0; i < rangesToCheck.length; i++) {
        let numericRange = rangesToCheck[i].split('-').map(Number);
        let thisBottom = numericRange[0];
        let thisTop = numericRange[1];
        let thisIngredient = ingredients[0];
        countAllFreshIds += thisTop - thisBottom + 1;
        
        do {
            if (thisIngredient < thisBottom) {
                spoiledIngredients.push(ingredients.shift());
                thisIngredient = ingredients[0];
                continue;
            }
            if (thisIngredient <= thisTop) {
                freshIngredients.push(ingredients.shift());
                thisIngredient = ingredients[0];
                continue;
            }
        } while (thisIngredient <= numericRange[1])

        if (i === rangesToCheck.length - 1) {
            spoiledIngredients.push(...ingredients);
            continue;
        }
    }
}

function findFreshIngredients() {
    let rangesToCheck = sortAndCondenseRanges();
    console.log(`There are ${ingredients.length} ingredients to check`)
    checkIngredients(rangesToCheck);
    console.log(`There are ${freshIngredients.length} fresh ingredients`);
    console.log(`There are ${spoiledIngredients.length} spoiled ingredients}`);
    console.log(`There is a total of ${countAllFreshIds} fresh ingredient IDs`);
}

findFreshIngredients();