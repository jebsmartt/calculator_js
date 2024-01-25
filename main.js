
// Over all div for calculator
const calculatorDiv = document.createElement('div')
calculatorDiv.id = 'calculator'
calculatorDiv.style.backgroundColor = 'white'
calculatorDiv.style.padding = '10px'
calculatorDiv.style.borderRadius = '15px'
calculatorDiv.style.display = 'flex'
calculatorDiv.style.maxWidth = '600px'
calculatorDiv.style.flexDirection = 'column'
calculatorDiv.style.alignItems = 'stretch'

// Div for the display area "screen"
const screenDiv = document.createElement('div')
screenDiv.id = 'screen'
screenDiv.style.textAlign = 'right'
screenDiv.style.backgroundColor = '#e6d39e'
screenDiv.style.borderStyle = 'solid'
screenDiv.style.borderColor = 'black'
screenDiv.style.borderWidth = '20px'
screenDiv.style.paddingTop = '30px'
screenDiv.style.paddingRight = '20px'
screenDiv.style.paddingLeft = '20px'
screenDiv.textContent = 0

// Handle the memory of the calculator
const calcMemoryTemplate = {
    screenStatus: 'firstValue',   // firstValue, secondValue, or calculatedValue
    firstValue: 0,
    secondValue: null,
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

// Div for all of the buttons
const controlDiv = document.createElement('div')
controlDiv.id = 'controls'
controlDiv.style.backgroundColor = 'black'
controlDiv.style.paddingTop = '10px'
controlDiv.style.paddingBottom = '10px'
controlDiv.style.paddingLeft = '20px'
controlDiv.style.paddingRight = '20px'
controlDiv.style.display = 'flex'

// Left side of calculator div
const leftDiv = document.createElement('div')
leftDiv.id = 'leftDiv'
leftDiv.style.display = 'flex'
leftDiv.style.flexDirection = 'column'
leftDiv.style.flexGrow = 3

// For now its just the clear button
const modifierDiv = document.createElement('div')
modifierDiv.id = 'modifierDiv'
modifierDiv.style.padding = '10px'
modifierDiv.style.display = 'flex'
modifierDiv.style.paddingBottom = '10px'

// Add modifier buttons
const clearButton = modifierDiv.appendChild(insertButton('AC', 'modifierButton'))
clearButton.addEventListener('click', function() {
    screenDiv.textContent = 0
    calcMemory = { ...calcMemoryTemplate }
    calcMemory.memoryLog('Pressed AC')
})

// This is the div that contains the number buttons
const keypadDiv = document.createElement('div')
keypadDiv.id = 'keypad'
keypadDiv.style.backgroundColor = 'black'
keypadDiv.style.margin = '10px'
keypadDiv.style.display = 'flex'
keypadDiv.style.flexWrap = 'wrap'
keypadDiv.style.gap = '10px'

// Add the digits to the keypad and add the click event listener
const sevenButton = keypadDiv.appendChild(insertButton(7, 'keypadButton'))
const eightButton = keypadDiv.appendChild(insertButton(8, 'keypadButton'))
const nineButton = keypadDiv.appendChild(insertButton(9, 'keypadButton'))
const fourButton = keypadDiv.appendChild(insertButton(4, 'keypadButton'))
const fiveButton = keypadDiv.appendChild(insertButton(5, 'keypadButton'))
const sixButton = keypadDiv.appendChild(insertButton(6, 'keypadButton'))
const oneButton = keypadDiv.appendChild(insertButton(1, 'keypadButton'))
const twoButton = keypadDiv.appendChild(insertButton(2, 'keypadButton'))
const threeButton = keypadDiv.appendChild(insertButton(3, 'keypadButton'))
const zeroButton = keypadDiv.appendChild(insertButton(0, 'keypadButton'))
const decimalButton = keypadDiv.appendChild(insertButton('.', 'keypadButton'))

// These are the operator buttons e.g. multiply, add, etc.
const operatorDiv = document.createElement('div')
operatorDiv.id = 'operators'
operatorDiv.style.backgroundColor = 'black'
operatorDiv.style.padding = '10px'
operatorDiv.style.display = 'flex'
operatorDiv.style.flexDirection = 'column'
operatorDiv.style.flexGrow = 1
operatorDiv.style.gap = '10px'

// Add the operators to the operator section
const divideButton = operatorDiv.appendChild(insertButton('÷', 'operatorButton'))
divideButton.addEventListener('click', function () {
    calcMemory.pendingOperation = 'divide'
    calcMemory.memoryLog('Pressed ÷')

})
const multiplyButton = operatorDiv.appendChild(insertButton('×', 'operatorButton'))
multiplyButton.addEventListener('click', function () {
    calcMemory.pendingOperation = 'multiply'
    calcMemory.memoryLog('Pressed ×')

})
const subtractButton = operatorDiv.appendChild(insertButton('-', 'operatorButton'))
subtractButton.addEventListener('click', function () {
    calcMemory.pendingOperation = 'subtract'
    calcMemory.memoryLog('Pressed -')

})
const additionButton = operatorDiv.appendChild(insertButton('+', 'operatorButton'))
additionButton.addEventListener('click', function () {
    calcMemory.pendingOperation = 'add'
    calcMemory.memoryLog('Pressed +')

})

// Logic for OPERATOR buttons
const equalsButton = operatorDiv.appendChild(insertButton('=', 'operatorButton'))
equalsButton.id = "equalsButton"

function calculate (operation) {
    switch (operation) {
        case 'add':
            calcMemory.lastOperation = function add() {
                return Number(calcMemory.firstValue) + Number(calcMemory.secondValue) 
            }
            break;
        case 'subtract':
            calcMemory.lastOperation = function subtract() {
                return Number(calcMemory.firstValue) - Number(calcMemory.secondValue) 
            }
            break;
        case 'multiply':
            calcMemory.lastOperation = function multiply() {
                return Number(calcMemory.firstValue) * Number(calcMemory.secondValue) 
            }
            break;
        case 'divide':
            calcMemory.lastOperation = function divide() {
                return Number(calcMemory.firstValue) / Number(calcMemory.secondValue) 
            }
            break;
        default:
            return;
        }
    calcMemory.calculatedValue = calcMemory.lastOperation()
    calcMemory.screenStatus = 'calculatedValue'

    screenDiv.textContent = displayValue(calcMemory.calculatedValue)
}

function displayValue (value) {
    const valueString = String(value)
    if (valueString.length > 20) {
        console.log(Number(value).toExponential(2))
        return String(Number(value).toExponential(2))
    } else {
        let formattedString = value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
        })
        return formattedString
    }
}

// Adds event listener to the equals button
equalsButton.addEventListener('click', function () {
    // Checks if equals is toggled on
    if (calcMemory.equalsFlag === true) {
        try {
            calcMemory.calculatedValue = calcMemory.lastOperation()
        } catch (err) {
            calcMemory.calculatedValue = calcMemory.secondValue
        }
        screenDiv.textContent = displayValue(calcMemory.calculatedValue)
    } else { 
        calcMemory.secondValue = Number(screenDiv.textContent)
        // Checks what operation we are doing, executes the operation and updates the screen
        calculate(calcMemory.pendingOperation)
    }
    // Prepare for the case of the user doing another operation
    calcMemory.equalsFlag = true
    calcMemory.pendingOperation = null
    calcMemory.memoryLog('Pressed =')
    calcMemory.firstValue = calcMemory.calculatedValue
    calcMemory.calculatedValue = null
})

// A function to insert buttons
function insertButton (symbol, assignedClass) {
    const calButton = document.createElement('button')
    calButton.classList.add(assignedClass)
    calButton.textContent = symbol
    
    // Add click event listener to keypad buttons (0-9)
    if (assignedClass == 'keypadButton') {
        calButton.addEventListener('click', function () {
            const oldNumber = screenDiv.textContent    // The number currently shown on the screen
            
            // Handles the translation of keypad clicks to the number displayed
            if (calcMemory.equalsFlag === true) {
                calcMemory = { ...calcMemoryTemplate }
                if (Number(symbol)) {       // True if not the decimal
                    screenDiv.textContent = Number(symbol)
                } else {        // Aka the button pushed was the decimal
                    screenDiv.textContent = '0.'
                }
                calcMemory.equalsFlag = false
                calcMemory.screenStatus = 'firstValue'
            } else if (calcMemory.pendingOperation === null) {
                if (oldNumber !== '0') {
                    if (Number(symbol)) {       // True if not the decimal
                        const digitsArray = oldNumber.split('')
                        digitsArray.push(String(symbol))
                        const concatString = digitsArray.join('')
                        // const newNumber = parseFloat(concatString)
                        screenDiv.textContent = concatString
                    } else {
                        if (oldNumber.includes(".")) {
                            // don't add a decimal because already float
                        } else {
                            // add a decimal
                            const digitsArray = oldNumber.split('')
                            digitsArray.push(String(symbol))
                            const concatString = digitsArray.join('')
                            // const newNumber = parseFloat(concatString)
                            screenDiv.textContent = concatString
                        }
                    }
                } else if (oldNumber === '0') {
                    if (Number(symbol)) {
                        screenDiv.textContent = Number(symbol)
                    } else {    // Aka the button pushed was the decimal
                        screenDiv.textContent = '0.'
                    }
                }
            } else if (calcMemory.pendingOperation !== null) {
                if (calcMemory.screenStatus == 'firstValue' || calcMemory.screenStatus == 'calculatedValue' ) {
                    screenDiv.textContent = (symbol !== '.') ? symbol : '0.'
                    calcMemory.screenStatus = 'secondValue'
                } else if (calcMemory.screenStatus == 'secondValue') {
                    const digitsArray = oldNumber.toString().split('')
                    digitsArray.push(symbol)
                    const concatString = digitsArray.join('')
                    screenDiv.textContent = concatString
                }
            }
            // See the log
            calcMemory.memoryLog(`Pressed ${symbol}`)
        })
    } else if (assignedClass == 'operatorButton' && symbol !== '=') {
        calButton.addEventListener('click', function () {
            if (calcMemory.pendingOperation !== null && calcMemory.equalsFlag === false) {
                calcMemory.secondValue = Number(screenDiv.textContent)
                calculate(calcMemory.pendingOperation)
                calcMemory.memoryLog('Chained Auto Calc')
                calcMemory.firstValue = calcMemory.calculatedValue
                calcMemory.calculatedValue = null

            }
            
            calcMemory.equalsFlag = false  // Toggles off the flag when user clicks number
            calcMemory.firstValue = Number(screenDiv.textContent.replace(/,/g, '')) // Number can't handle commas
            calcMemory.secondValue = null
        })
    }
    return calButton
}

// Add elements to page
document.body.appendChild(calculatorDiv)
calculatorDiv.appendChild(screenDiv)
calculatorDiv.appendChild(controlDiv)
controlDiv.appendChild(leftDiv)
controlDiv.appendChild(operatorDiv)
leftDiv.appendChild(modifierDiv)
leftDiv.appendChild(keypadDiv)
