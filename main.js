
// Handle the memory of the calculator
const calcMemoryTemplate = {
    screenStatus: 'firstValue',   // firstValue, secondValue, or calculatedValue
    firstValue: 0,
    secondValue: null,
    decimalFlag: false,
    pendingOperation: null,     // add, subtract, multiply, divide
    calculatedValue: null,      // the result of the operation
    lastOperation: null,        // stored function that when used will do the pendingOperation
    equalsFlag: false,          // used to indicate if equals button was pressed
    memoryLog: function (action) {
        // Get the keys of the object
        const keys = Object.keys(calcMemory).filter(key => (
            key !== 'memoryLog' && key !== 'lastOperation')
            );

        // Map each key to a string in the format "key: value"
        const keyValuePairs = keys.map(key => `${key}: ${calcMemory[key]}`);

        // Join the key-value pairs with commas
        const resultString = keyValuePairs.join(' | ');

        console.log('Action: ' + String(action) + '\n' + resultString);
    }
}

let calcMemory = { ...calcMemoryTemplate }


// func to update a value in calcMemory
function updateCalcMemoryItem (key, value) {
    calcMemory.key = value
}

function getCalcMemoryItem (key) {
    return calcMemory.key
}

let screen = document.getElementById('screen')

function updateScreen(value) {
    screen.textContent = value
}

// Updates the screen when a digit (0, 1-9, or decimal) is pressed
function pressDigit(id) {
    modifier = document.getElementById(id).textContent
    
    // if they click the decimal button
    if (id == 'decimal') {
        // if the value show on screen does not have a decimal
        if (!screen.textContent.includes('.')) {
            // append a decimal to what is shown on screen
            screen.textContent += '.'
            // ensure that next digit pressed is the tenths place
            updateCalcMemoryItem(decimalFlag, true)
        }
    } else if (calcMemory.decimalFlag === true) {
        // this digit needs to be in the tenths place
        const originalNumber = new Big(screen.textContent);     // takes a string and converts to Big
        const newDigit = modifier                               // takes the string version

        // Get the original coefficient array
        const originalCoefficient = originalNumber.c;

        // Create a new coefficient array by adding the new digit
        const newCoefficient = [...originalCoefficient, '.', newDigit];

        // Create a new Big number with the updated coefficient
        const newNumber = new Big(newCoefficient.join(''))
        const updatedNumber = newNumber.toFixed(1)

        updateCalcMemoryItem(calcMemory.screenStatus, updatedNumber)
        updateScreen(updatedNumber)
    } else {
        const originalNumber = new Big(screen.textContent);     // takes a string and converts to Big
        const newDigit = Number(modifier)                       // takes the Number version

        // Get the original coefficient array
        const originalCoefficient = originalNumber.c;

        // Create a new coefficient array by adding the new digit
        const newCoefficient = [...originalCoefficient, newDigit];

        // Create a new Big number with the updated coefficient
        const updatedNumber = new Big(newCoefficient.join(''))

        updateCalcMemoryItem(calcMemory.screenStatus, updatedNumber)
        updateScreen(updatedNumber)
    }
}

// func to perform arithmatic to get calculatedValue

// func to clear/reset calcMemory

// add event listeners to buttons


screen.textContent = calcMemory[calcMemory.screenStatus]






// TESTING BELOW



// this digit needs to be in the tenths place
const originalNumber = new Big('12345');     // takes a string and converts to Big
const newDigit = String(0)

// Get the original coefficient array
const originalCoefficient = originalNumber.c.map(String);


// Create a new coefficient array by adding the new digit
const newCoefficient = [...originalCoefficient, '.', newDigit];

// Create a new Big number with the updated coefficient
const newNumber = new Big(newCoefficient.join(''))
const updatedNumber = newNumber.toFixed(1)

console.log(updatedNumber.toString())
