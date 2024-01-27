
// Handle the memory of the calculator
const calcMemoryTemplate = {
    screenStatus: 'firstValue',   // firstValue, secondValue, or calculatedValue
    firstValue: 0,
    secondValue: null,
    decimalFlag: false,
    maxDigitFlag: false,
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
        const keyValuePairs = keys.map(key => `${key}: ${this[key]}`);

        // Join the key-value pairs with commas
        const resultString = keyValuePairs.join(' | ');

        console.log('Action: ' + String(action) + '\n' + resultString);
    }
}

let calcMemory = { ...calcMemoryTemplate }

// func to update a value in calcMemory
function updateCalcMemoryItem (key, value) {
    calcMemory[key] = value
}

function getCalcMemoryItem (key) {
    return calcMemory[key]
}

let screen = document.getElementById('screen')

function formatValue(value) {
    // Convert the string to an array of characters
    const characters = value.split('');
    const charactersNoCommas = characters.filter(value => value !== ',')
    console.log(charactersNoCommas)
    let startingIndex = charactersNoCommas.length - 3
    
    if (characters.indexOf('.') > -1) {
        startingIndex = characters.indexOf('.') - 4
    } 

    // Iterate over the characters in reverse order
    for (let i = startingIndex; i > 0; i -= 3) {
        // Insert a comma after every group of three digits
        charactersNoCommas.splice(i, 0, ',');
    }
    
    // Join the characters back into a string with commas
    const formattedValue = charactersNoCommas.join('');
    return formattedValue
}


// add event listeners to buttons
const digits = document.getElementById('digits')
const zeroAndDecimal = document.getElementById('zeroAndDecimal')

const childrenOfDigits = digits.querySelectorAll('button')
const childrenOfZeroAndDecimal = zeroAndDecimal.querySelectorAll('button')

const keypad = [...childrenOfDigits, ...childrenOfZeroAndDecimal]

// add click events for keypad
keypad.forEach(child => {
    child.addEventListener('click', function () {
        
        // get the string from the screen
        const inputString = screen.textContent
        // create an array of digits found
        const digitArray = inputString.match(/\d/g);
        
        // get id and value of the button pressed
        const id = this.id 
        const modifier = this.textContent

        // if max allowable length hit then do nothing and exit function
        if (digitArray.length >= 16) {
            return calcMemory.memoryLog(`Pressed ${modifier}; Max allowable digits reached`);
        }

        // if they click the decimal button
        if (id == 'decimal') {
            // if the value show on screen doesn't have a decimal
            if (!screen.textContent.includes('.')) {
                // append a decimal to what is shown on screen
                screen.textContent += '.'
                // // ensure that next digit pressed is the tenths place
                // updateCalcMemoryItem('decimalFlag', true)
            }
        } else {
            if (inputString === '0') {
                screen.textContent = modifier
            } else {
                console.log(`oldString: ${screen.textContent}`)
                let newString = screen.textContent += modifier
                console.log(`newString: ${newString}`)
                screen.textContent = formatValue(newString)
                console.log(`displayString: ${screen.textContent}`)
            }
        }

        calcMemory.memoryLog(`Pressed ${modifier}`)
    })
    
})

// func to perform arithmatic to get calculatedValue

// func to clear/reset calcMemory



screen.textContent = calcMemory[calcMemory.screenStatus]




// else if (calcMemory.decimalFlag === true) {
//     // this digit needs to be in the tenths place
//     const originalNumber = new Big(screen.textContent);     // takes a string and converts to Big
//     const newDigit = modifier                               // takes the string version

//     // Get the original coefficient array
//     const originalCoefficient = originalNumber.c;

//     // Create a new coefficient array by adding the new digit
//     const newCoefficient = [...originalCoefficient, '.', newDigit];

//     // Create a new Big number with the updated coefficient
//     const newNumber = new Big(newCoefficient.join(''))
//     const updatedNumber = newNumber.toFixed(1)

//     updateCalcMemoryItem(calcMemory.screenStatus, updatedNumber)
//     updateCalcMemoryItem('decimalFlag', false)
//     updateScreen(updatedNumber)
// } else {
//     if (!screen.textContent.includes('.')) {
//         // When a digit is pressed and the number does not have decimals
//         const originalNumber = new Big(screen.textContent);     // takes a string and converts to Big
//         const newDigit = Number(modifier)                       // takes the Number version

//         // Get the original coefficient array
//         const originalCoefficient = originalNumber.c;
        
//         // Create a new coefficient array by adding the new digit
//         const newCoefficient = [...originalCoefficient, newDigit];

//         // Create a new Big number with the updated coefficient
//         const updatedNumber = new Big(newCoefficient.join(''))

//         updateCalcMemoryItem(calcMemory.screenStatus, updatedNumber)
//         updateScreen(updatedNumber)
//     } else {
//         // When a digit is pressed and the number has decimals
//         const originalNumber = [...screen.textContent]
//         const newDigit = modifier

//         const newCoefficient = [...originalNumber, newDigit]
//         const newString = newCoefficient.join('')

//         const updatedNumber = new Big(newString)
        
//         updateCalcMemoryItem(calcMemory.screenStatus, updatedNumber)
//         updateScreen(newString)
//     }
// }

// TESTING BELOW



// // this digit needs to be in the tenths place
// const originalNumber = new Big('12345');     // takes a string and converts to Big
// const newDigit = String(0)

// // Get the original coefficient array
// const originalCoefficient = originalNumber.c.map(String);


// // Create a new coefficient array by adding the new digit
// const newCoefficient = [...originalCoefficient, '.', newDigit];

// // Create a new Big number with the updated coefficient
// const newNumber = new Big(newCoefficient.join(''))
// const updatedNumber = newNumber.toFixed(1)

// console.log(updatedNumber.toString())
