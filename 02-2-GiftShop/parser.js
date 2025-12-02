
const input = ['749639-858415', '65630137-65704528', '10662-29791', '1-17', '9897536-10087630', '1239-2285', '1380136-1595466', '8238934-8372812', '211440-256482', '623-1205', '102561-122442', '91871983-91968838', '62364163-62554867', '3737324037-3737408513', '9494926669-9494965937', '9939271919-9939349036', '83764103-83929201', '24784655-24849904', '166-605', '991665-1015125', '262373-399735', '557161-618450', '937905586-937994967', '71647091-71771804', '8882706-9059390', '2546-10476', '4955694516-4955781763', '47437-99032', '645402-707561', '27-86', '97-157', '894084-989884', '421072-462151'];
// const input = ['11-22', '95-115', '998-1012', '1188511880-1188511890', '222220-222224', '1698522-1698528', '446443-446449', '38593856-38593862', '565653-565659', '824824821-824824827', '2121212118-2121212124'];
let checkSum = 0
function findAndSumInvalidProducts(range) {
    let rangeArray = range.split("-");
    let start = parseInt(rangeArray[0]);
    let end = parseInt(rangeArray[1]);

    for (let i = start; i <= end; i++){
        idString = i.toString();
        if (idString.length % 2 === 1){
            continue;
        }

        let halfLength = idString.length / 2;
        let firstHalf = idString.substring(0,halfLength)
        let secondHalf = idString.substring(halfLength);
        if (firstHalf === secondHalf ){
            checkSum += i;
            // console.log(`For product ${i}, the ID is invalid with ${firstHalf} equal to ${secondHalf}.`);
            // console.log(`The checksum total is now ${checkSum}.`)
            continue;
        }
        // console.log(`Product ID ${i} is valid.`)
    }
}

function processIDs(rangesToCheck) {
    rangesToCheck.forEach(i => {
        findAndSumInvalidProducts(i);
    });
    console.log(`The checksum value is ${checkSum}.`);
}

processIDs(input);