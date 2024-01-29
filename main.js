Big.PE = 15


// Handle the memory of the calculator
const calcMemoryTemplate = {
    screenStatus: 'firstValue',     // firstValue, secondValue, or calculatedValue
    firstValue: '0',                // stored as Big 
    secondValue: null,              // stored as Big
    pendingOperation: null,         // plus, minus, times, divide
    calculatedValue: null,          // the result of the operation as a Big
    equalsFlag: false,              // used to indicate if equals button was pressed
    memoryLog: function (action) {
        // Get the keys of the object
        const keys = Object.keys(calcMemory).filter(key => (key !== 'memoryLog'));

        // Map each key to a string in the format "key: value"
        const keyValuePairs = keys.map(key => `${key}: ${this[key]}`);

        // Join the key-value pairs with commas
        const resultString = keyValuePairs.join(' | ');

        console.log('Action: ' + String(action) + '\n' + resultString);
    }
}

let calcMemory = { ...calcMemoryTemplate }

// func to update a value in calcMemory
function updateCalcMem (key, value) {
    calcMemory[key] = value
}

function getCalcMem (key) {
    return calcMemory[key]
}

let screen = document.getElementById('screen')

function formatValue(value) {
    const formatToggle = true
    
    if (formatToggle) {
        // expects a string and all formatting should be string methods
        // Convert the string to an array of characters
        const characters = value.split('')
        // Filter the array down to just digits and decimal
        const charactersNoCommas = characters.filter(value => /[0-9.]/.test(value))
        // Determine where to start the for loop to add commas back in
        let startingIndex = charactersNoCommas.length - 3
        if (charactersNoCommas.indexOf('.') > -1) {
            startingIndex = charactersNoCommas.indexOf('.') - 3
        }
    
        // Iterate over the characters in reverse order
        for (let i = startingIndex; i > 0; i -= 3) {
            // Insert a comma after every group of three digits
            charactersNoCommas.splice(i, 0, ',')
        }
    
        // Join the characters back into a string with commas
        const formattedValue = charactersNoCommas.join('')
    
        return formattedValue
    } else {
        return value
    }
    

    // BigCoef = Big();
    // BigCoef.DP = 6;
    // if (value.includes('e')) {
    //     // what to do if in scientific notation
    //     const parts = value.split('e')

    //     coefficient = BigCoef(parts[0])
    //     roundedCoefficient = coefficient.div(1)
        
    //     parts.splice(0,1,roundedCoefficient.toString())
    //     const formattedValue = parts.join('e')
    //     return formattedValue

    // } else {
    //     // Convert the string to an array of characters
    //     const characters = value.split('')
    //     const charactersNoCommas = characters.filter(value => /[0-9.]/.test(value))
    //     coefficient = BigCoef(charactersNoCommas.join(''))
    //     console.log(coefficient.toString())
    //     roundedCoefficient = coefficient.div(1).toString().split('')
    //     let startingIndex = roundedCoefficient.length - 3
        
    //     if (roundedCoefficient.indexOf('.') > -1) {
    //         startingIndex = roundedCoefficient.indexOf('.') - 3
    //     } 
    
    //     // Iterate over the characters in reverse order
    //     for (let i = startingIndex; i > 0; i -= 3) {
    //         // Insert a comma after every group of three digits
    //         roundedCoefficient.splice(i, 0, ',')
    //     }

    //     // Join the characters back into a string with commas
    //     const formattedValue = roundedCoefficient.join('')

    //     return formattedValue
    // }
}

function clearCalcMem () {
    calcMemory = { ...calcMemoryTemplate }
    screen.textContent = '0'
}

// Let the clear button clear the calcMemory
const allClear = document.getElementById('clear')
allClear.addEventListener('click', clearCalcMem)

// add click event listeners to keypad button
const digits = document.getElementById('digits')
const zeroAndDecimal = document.getElementById('zeroAndDecimal')

const childrenOfDigits = digits.querySelectorAll('button')
const childrenOfZeroAndDecimal = zeroAndDecimal.querySelectorAll('button')

const keypad = [...childrenOfDigits, ...childrenOfZeroAndDecimal]

keypad.forEach(child => {
    child.addEventListener('click', function () {
        
        // get the string from the screen
        const inputString = screen.textContent
        
        // get id and value of the button pressed
        const id = this.id 
        const modifier = this.textContent

        if (getCalcMem('screenStatus') === 'firstValue' && !getCalcMem('pendingOperation')) {
            // if they click the decimal button
            if (id == 'decimal') {
                // if the value show on screen doesn't have a decimal
                if (!screen.textContent.includes('.')) {
                    // append a decimal to what is shown on screen
                    screen.textContent += '.'
                }
            } else if (inputString === '0') {
                screen.textContent = modifier
            } else {
                // Check if the screen value is already at maximum digit length
                if (digitLimitReached(inputString, modifier)) {
                    return calcMemory.memoryLog(`Pressed ${modifier}; Max allowable digits reached`)
                }
                // if maximum digit length not hit, add digit
                let newString = screen.textContent += modifier
                screen.textContent = formatValue(newString)
            }
        } else if (getCalcMem('screenStatus') === 'firstValue' && getCalcMem('pendingOperation')) {
            // Catch situation where the screen is still showing fv but we have a pending operation
            updateCalcMem('screenStatus','secondValue');

            if (id == 'decimal') {
                    screen.textContent = '0.'
            } else {
                screen.textContent = modifier
            }
        } else if (getCalcMem('screenStatus') === 'secondValue') {
            if (id == 'decimal') {
                // if the value show on screen doesn't have a decimal
                if (!screen.textContent.includes('.')) {
                    // append a decimal to what is shown on screen
                    screen.textContent += '.'
                }
            } else {
                if (inputString === '0') {
                    screen.textContent = modifier
                } else {
                    if (digitLimitReached(inputString, modifier)) {
                        return calcMemory.memoryLog(`Pressed ${modifier}; Max allowable digits reached`)
                    }
                    
                    let newString = screen.textContent += modifier
                    screen.textContent = formatValue(newString)
                }
            }
        } else if (getCalcMem('screenStatus') === 'calculatedValue') {
            clearCalcMem()

            if (id == 'decimal') {
                screen.textContent = '0.'
            } else {
            screen.textContent = modifier
            }
        }

        calcMemory.memoryLog(`Pressed ${modifier}`)
    })
    
})

function digitLimitReached(inputString, modifier) {
    // create an array of digits found
    const digitArray = inputString.match(/\d/g);

    // if max allowable length hit then do nothing and exit function
    if (digitArray.length + 1 >= 16) {
        return true
    }

    return false;
}


const rightControls = document.getElementById('rightControls')

// click event behavior of plus, minus, divide, and times
const notEquals = rightControls.querySelectorAll(':not(#equals)')
notEquals.forEach(opButton => {
    opButton.addEventListener('click', function () {
        
        
        // Update values in memory
        switch (calcMemory.screenStatus) {
            case 'firstValue':
                // set pendingOperation to the corresponding operator (e.g. divide)
                updateCalcMem('pendingOperation', this.id)
                // if on firstValue and they click operator then we need a secondValue
                updateCalcMem('firstValue', convertToBig(screen.textContent));
                break;
            case 'secondValue':
                // if on secondValue and click operator
                // ..set secondValue in calcMemory
                updateCalcMem('secondValue', convertToBig(screen.textContent))
                // ..then we execute operation between first and second value
                // trigger the calculation and store result in calculatedValue
                updateCalcMem('calculatedValue', bigMath(
                    getCalcMem('pendingOperation'),
                    getCalcMem('firstValue'),
                    getCalcMem('secondValue')
                ))
                // ..the we store the result of that operation as the firstValue and update the screen
                updateCalcMem('firstValue', getCalcMem('calculatedValue'))
                screen.textContent = getCalcMem('firstValue').toString()
                updateCalcMem('screenStatus','firstValue')
                // set pendingOperation to the corresponding operator (e.g. divide)
                updateCalcMem('pendingOperation', this.id)

                // ..then we need to get a secondValue from the user

                break;
            case 'calculatedValue':
                // set pendingOperation to the corresponding operator (e.g. divide)
                updateCalcMem('pendingOperation', this.id)    
                
                // if on calculatedValue and click operation
                // ..then we set firstValue equal to calculatedValue
                updateCalcMem('firstValue', getCalcMem('calculatedValue'))
                // ..now we need to get secondvalue from the user
                updateCalcMem('screenStatus', 'firstValue')     // because we are now showing firstValue
                break;
            default:
                break;
        }

        calcMemory.memoryLog(`Pressed ${this.id}`)
    })
})

const equalsButton = document.getElementById('equals')
equalsButton.addEventListener('click', function () {
    // Refrences firstValue, secondValue, and pendingOperation
    // ..executes equation and updates calculatedValue
    if (calcMemory.screenStatus === 'firstValue') {
        // Do nothing
    } else if (calcMemory.screenStatus === 'secondValue') {
        updateCalcMem('secondValue', convertToBig(screen.textContent))
        // trigger the calculation and store result in calculatedValue
        updateCalcMem('calculatedValue', bigMath(
            getCalcMem('pendingOperation'),
            getCalcMem('firstValue'),
            getCalcMem('secondValue')
        ))
        // Updated screen after equals button pressed
        screen.textContent = formatValue(getCalcMem('calculatedValue').toString())
        updateCalcMem('screenStatus','calculatedValue')
    } else if (calcMemory.screenStatus === 'calculatedValue') {
        // Set the fv to cv of the last operation (aka whats on the screen)
        updateCalcMem('firstValue', getCalcMem('calculatedValue'))
        updateCalcMem('calculatedValue', bigMath(
            getCalcMem('pendingOperation'),
            getCalcMem('firstValue'),
            getCalcMem('secondValue')
        ))
        // Update screen after equals button pressed
        screen.textContent = formatValue(getCalcMem('calculatedValue').toString())

    }
    calcMemory.memoryLog(`Pressed ${this.id}`)
})

function convertToBig(valueWithCommas) {
    // returns value as Big
    const numericString = valueWithCommas.replace(/,/g, '');
    const bigNumber = new Big(numericString)
    return bigNumber
}

function bigMath(operator, fv, sv) {
    try {
        if (fv instanceof Big && sv instanceof Big) {
            // keep going
        } else {
            // fv or sv is not an instance of Big
            throw new Error('bigMath was not provided instances of Big');
        }
    } catch (error) {
        // Handle the error
        console.error(error.message);
    }
    
    switch (operator) {
        case 'plus':
            return fv.plus(sv)
        case 'minus':
            return fv.minus(sv)
        case 'times':
            return fv.times(sv)
        case 'divide':
            return fv.div(sv)
        default:
            break;
    }
}


// Set default value to zero on screen
screen.textContent = calcMemory[calcMemory.screenStatus]

