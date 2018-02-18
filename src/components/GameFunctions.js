export class GameFunctions {
    
    static CreateNumbersToAdd = (targetMin, targetMax) => {
        const targetNumber = randomNumberBetween(targetMin, targetMax);
        const numTargetSplitInto = randomNumberBetween(NUMBERS_COUNT_MIN, NUMBERS_COUNT_MAX);
        let numbersToAdd = [];

        for (let i=0; i < numTargetSplitInto-1; i++) {
            let remainingTotal = (numbersToAdd && numbersToAdd.length > 0) 
                ? targetNumber - numbersToAdd.reduce((total, value) => total += value)
                : targetNumber;
            let number = randomNumberBetween(0, remainingTotal);
            numbersToAdd.push(number);
        }
        
        numbersToAdd.push(targetNumber - numbersToAdd.reduce((total, value) => total += value));
        numbersToAdd = removeZeros(numbersToAdd);
        return numbersToAdd;
    }
}

// Set outside of class to remain private
const NUMBERS_COUNT_MIN = 2;
const NUMBERS_COUNT_MAX = 10;

const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const removeZeros = (array) => {
    let zerolessNumbers = array.filter(value => value > 0);
    return zerolessNumbers;
}