
// Over all div for calculator
const calculatorDiv = document.createElement('div')
calculatorDiv.id = 'calculator'
calculatorDiv.style.backgroundColor = 'black'
calculatorDiv.style.display = 'flex'
calculatorDiv.style.maxWidth = '600px'
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
    firstValue: 0,
    secondValue: null,
    pendingOperation: null,
    calculatedValue: null,
    lastOperation: null,
    equalsFlag: false,
    screenStatus: 'firstValue'
}

// Div for all of the buttons
const controlDiv = document.createElement('div')
controlDiv.id = 'controls'
controlDiv.style.backgroundColor = 'green'
controlDiv.style.paddingTop = '10px'
controlDiv.style.paddingBottom = '10px'
controlDiv.style.display = 'flex'

// Left side of calculator div
const leftDiv = document.createElement('div')
leftDiv.id = 'leftDiv'
leftDiv.style.display = 'flex'
leftDiv.style.flexDirection = 'column'

// For now its just the clear button
const modifierDiv = document.createElement('div')
modifierDiv.id = 'modifierDiv'
modifierDiv.style.display = 'flex'
modifierDiv.style.paddingBottom = '10px'

// Add modifier buttons
const clearButton = modifierDiv.appendChild(addButton('AC', 'modifierButton'))
clearButton.addEventListener('click', function() {
    screenDiv.textContent = 0
    calcMemory = {
        firstValue: 0,
        secondValue: null,
        pendingOperation: null,
        calculatedValue: null,
        lastOperation: null,
        equalsFlag: false,
        screenStatus: 'firstValue'
    }
})

// These are the number buttons
const keypadDiv = document.createElement('div')
keypadDiv.id = 'keypad'
keypadDiv.style.backgroundColor = 'purple'
keypadDiv.style.display = 'flex'
keypadDiv.style.flexWrap = 'wrap'
keypadDiv.style.flexGrow = 3
keypadDiv.style.gap = '10px'

// Add the digits to the keypad
const sevenButton = keypadDiv.appendChild(addButton(7, 'keypadButton'))
const eightButton = keypadDiv.appendChild(addButton(8, 'keypadButton'))
const nineButton = keypadDiv.appendChild(addButton(9, 'keypadButton'))
const fourButton = keypadDiv.appendChild(addButton(4, 'keypadButton'))
const fiveButton = keypadDiv.appendChild(addButton(5, 'keypadButton'))
const sixButton = keypadDiv.appendChild(addButton(6, 'keypadButton'))
const oneButton = keypadDiv.appendChild(addButton(1, 'keypadButton'))
const twoButton = keypadDiv.appendChild(addButton(2, 'keypadButton'))
const threeButton = keypadDiv.appendChild(addButton(3, 'keypadButton'))
const zeroButton = keypadDiv.appendChild(addButton(0, 'keypadButton'))

// These are the operator buttons e.g. multiply, add, etc.
const operatorDiv = document.createElement('div')
operatorDiv.id = 'operators'
operatorDiv.style.backgroundColor = 'black'
operatorDiv.style.display = 'flex'
operatorDiv.style.flexDirection = 'column'
operatorDiv.style.flexGrow = 1
operatorDiv.style.gap = '10px'

// Add the operators to the operator section
const divideButton = operatorDiv.appendChild(addButton('÷', 'operatorButton'))
const multiplyButton = operatorDiv.appendChild(addButton('×', 'operatorButton'))
const additionButton = operatorDiv.appendChild(addButton('+', 'operatorButton'))
additionButton.addEventListener('click', function () {
    calcMemory.equalsFlag = false
    calcMemory.pendingOperation = 'add'
    calcMemory.firstValue = screenDiv.textContent
    calcMemory.secondValue = null
    
    // DELETE AFTER TEST
    console.log(`${calcMemory.screenStatus} - ${calcMemory.pendingOperation}`)
})
const subtractButton = operatorDiv.appendChild(addButton('-', 'operatorButton'))
subtractButton.addEventListener('click', function () {
    calcMemory.equalsFlag = false
    calcMemory.pendingOperation = 'subtract'
    calcMemory.firstValue = screenDiv.textContent
    calcMemory.secondValue = null

    // DELETE AFTER TEST
    console.log(`${calcMemory.screenStatus} - ${calcMemory.pendingOperation}`)
})
const equalsButton = operatorDiv.appendChild(addButton('=', 'operatorButton'))
equalsButton.addEventListener('click', function () {
    // Checks if we have stored a value already
    if (calcMemory.equalsFlag === true) {
        calcMemory.calculatedValue = calcMemory.lastOperation()
    } else { 
        calcMemory.secondValue = screenDiv.textContent
        // Checks what operation we are doing, executes the operation and updates the screen
        // TODO: replace Number with parseFloat
        switch (calcMemory.pendingOperation) {
            case 'add':
                calcMemory.lastOperation = function add() {
                    return Number(calcMemory.firstValue) + Number(calcMemory.secondValue) 
                }
                calcMemory.calculatedValue = calcMemory.lastOperation()
                break;
            case 'subtract':
                calcMemory.lastOperation = function subtract() {
                    return Number(calcMemory.firstValue) - Number(calcMemory.secondValue) 
                }
                calcMemory.calculatedValue = calcMemory.lastOperation()
                break;
            default:
                screenDiv.textContent = 'Error'
        }
    }
    // Prepare for the case of the user doing another operation
    calcMemory.equalsFlag = true
    screenDiv.textContent = calcMemory.calculatedValue
    calcMemory.screenStatus = 'calculatedValue'
    calcMemory.firstValue = calcMemory.calculatedValue
    calcMemory.pendingOperation = null
    calcMemory.calculatedValue = null

    // DELETE AFTER TEST
    console.log(`${calcMemory.screenStatus} - ${calcMemory.pendingOperation}`)
})

// A function to add buttons
function addButton (symbol, assignedClass) {
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

            // DELETE AFTER TEST
            console.log(`${calcMemory.screenStatus} - ${calcMemory.pendingOperation}`)
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
