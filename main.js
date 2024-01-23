
// Over all div for calculator
const calculatorDiv = document.createElement('div')
calculatorDiv.id = 'calculator'
calculatorDiv.style.backgroundColor = 'black'
calculatorDiv.style.display = 'flex'
calculatorDiv.style.maxWidth = '900px'
calculatorDiv.style.flexDirection = 'column'
calculatorDiv.style.alignItems = 'stretch'

// Div for the display area "screen"
const screenDiv = document.createElement('div')
screenDiv.id = 'screen'
screenDiv.style.textAlign = 'right'
screenDiv.style.backgroundColor = '#e6d39e'
screenDiv.style.paddingTop = '30px'
screenDiv.style.paddingRight = '10px'
screenDiv.textContent = 0

// Handle the memory of the calculator
let calcMemory = {
    screenStatus: 'firstValue',
    firstValue: 0,
    secondValue: null,
    pendingOperation: null,
    calculatedValue: null,
    lastOperation: null,
    equalsFlag: false,
    memoryLog: function () {
        // Get the keys of the object
        const keys = Object.keys(calcMemory).filter(key => (
            key !== 'memoryLog' && key !== 'lastOperation')
            );

        // Map each key to a string in the format "key: value"
        const keyValuePairs = keys.map(key => `${key}: ${calcMemory[key]}`);

        // Join the key-value pairs with commas
        const resultString = keyValuePairs.join(' | ');

        console.log(resultString);
    }
}

// Div for all of the buttons
const controlDiv = document.createElement('div')
controlDiv.id = 'controls'
controlDiv.style.backgroundColor = 'black'
controlDiv.style.paddingTop = '10px'
controlDiv.style.paddingBottom = '10px'
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
    calcMemory = {
        firstValue: 0,
        secondValue: null,
        pendingOperation: null,
        calculatedValue: null,
        lastOperation: null,
        equalsFlag: false,
        screenStatus: 'firstValue'   // firstValue, secondValue, or calculatedValue
    }
})

// This is the div that contains the number buttons
const keypadDiv = document.createElement('div')
keypadDiv.id = 'keypad'
keypadDiv.style.backgroundColor = 'black'
keypadDiv.style.margin = '10px'
keypadDiv.style.display = 'flex'
keypadDiv.style.flexWrap = 'wrap'
keypadDiv.style.gap = '10px'

// Add the digits to the keypad
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
const multiplyButton = operatorDiv.appendChild(insertButton('×', 'operatorButton'))
const additionButton = operatorDiv.appendChild(insertButton('+', 'operatorButton'))
additionButton.addEventListener('click', function () {
    calcMemory.pendingOperation = 'add'
    calcMemory.memoryLog()

})
const subtractButton = operatorDiv.appendChild(insertButton('-', 'operatorButton'))
subtractButton.addEventListener('click', function () {
    calcMemory.pendingOperation = 'subtract'
    calcMemory.memoryLog()

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
        default:
            screenDiv.textContent = 'Error'
            return;
        }
    calcMemory.calculatedValue = calcMemory.lastOperation()
}
equalsButton.addEventListener('click', function () {
    // Checks if equals is toggled on
    if (calcMemory.equalsFlag === true) {
        calcMemory.calculatedValue = calcMemory.lastOperation()
    } else { 
        calcMemory.secondValue = screenDiv.textContent
        // Checks what operation we are doing, executes the operation and updates the screen
        calculate(calcMemory.pendingOperation)
    }
    // Prepare for the case of the user doing another operation
    calcMemory.equalsFlag = true
    calcMemory.pendingOperation = null
    calcMemory.screenStatus = 'calculatedValue'
    screenDiv.textContent = calcMemory.calculatedValue
    calcMemory.memoryLog()
    calcMemory.firstValue = calcMemory.calculatedValue
    calcMemory.calculatedValue = null
})

// A function to insert buttons
function insertButton (symbol, assignedClass) {
    const calButton = document.createElement('button')
    calButton.classList.add(assignedClass)
    calButton.textContent = symbol

    if (assignedClass == 'keypadButton') {
        calButton.addEventListener('click', function () {
            const oldNumber = screenDiv.textContent
            
            if (calcMemory.equalsFlag === true) {
                screenDiv.textContent = Number(symbol)
                calcMemory.equalsFlag = false
                calcMemory.screenStatus = 'firstValue'
            } else if (calcMemory.pendingOperation === null) {
                if (Number(oldNumber) !== 0) {
                    const digitsArray = oldNumber.toString().split('').map(Number)
                    digitsArray.push(symbol)
                    const concatString = digitsArray.join('')
                    const newNumber = parseInt(concatString, 10)
                    screenDiv.textContent = newNumber
                } else if (Number(oldNumber) === 0) {
                    screenDiv.textContent = Number(symbol)
                }
            } else if (calcMemory.pendingOperation !== null) {
                if (calcMemory.screenStatus == 'firstValue' || calcMemory.screenStatus == 'calculatedValue' ) {
                    screenDiv.textContent = Number(symbol)
                    calcMemory.screenStatus = 'secondValue'
                } else if (calcMemory.screenStatus == 'secondValue') {
                    const digitsArray = oldNumber.toString().split('').map(Number)
                    digitsArray.push(symbol)
                    const concatString = digitsArray.join('')
                    const newNumber = parseInt(concatString, 10)
                    screenDiv.textContent = newNumber
                }
            }

            // See the log
            calcMemory.memoryLog()
        })
    } else if (assignedClass == 'operatorButton' && symbol !== '=') {
        calButton.addEventListener('click', function () {
            calcMemory.equalsFlag = false  // Toggles off the flag when user clicks number
            calcMemory.firstValue = screenDiv.textContent
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
