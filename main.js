
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
screenDiv.style.backgroundColor = '#e6d39e'
screenDiv.style.paddingTop = '30px'
screenDiv.textContent = 0

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

const clearButton = modifierDiv.appendChild(addButton('AC', 'modifierButton'))

// These are the number buttons
const keypadDiv = document.createElement('div')
keypadDiv.id = 'keypad'
keypadDiv.style.backgroundColor = 'purple'
keypadDiv.style.display = 'flex'
keypadDiv.style.flexWrap = 'wrap'
keypadDiv.style.flexGrow = 3
keypadDiv.style.gap = '10px'

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

operatorDiv.appendChild(addButton('÷', 'operatorButton'))
operatorDiv.appendChild(addButton('×', 'operatorButton'))
operatorDiv.appendChild(addButton('+', 'operatorButton'))
operatorDiv.appendChild(addButton('-', 'operatorButton'))
operatorDiv.appendChild(addButton('=', 'operatorButton'))

function addButton (symbol, assignedClass) {
    const calButton = document.createElement('button')
    calButton.classList.add(assignedClass)
    calButton.textContent = symbol

    if (assignedClass == 'keypadButton') {
        calButton.addEventListener('click', function() {
            screenDiv.textContent = symbol
        })
    }
    
    return calButton
}


document.body.appendChild(calculatorDiv)
calculatorDiv.appendChild(screenDiv)
calculatorDiv.appendChild(controlDiv)
controlDiv.appendChild(leftDiv)
controlDiv.appendChild(operatorDiv)
leftDiv.appendChild(modifierDiv)
leftDiv.appendChild(keypadDiv)

