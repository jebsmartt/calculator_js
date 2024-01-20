
const calculatorDiv = document.createElement('div')
calculatorDiv.id = 'calculator'
calculatorDiv.style.backgroundColor = 'black'
calculatorDiv.style.display = 'flex'
calculatorDiv.style.maxWidth = '600px'
calculatorDiv.style.flexDirection = 'column'

calculatorDiv.style.alignItems = 'stretch'


const screenDiv = document.createElement('div')
screenDiv.id = 'screen'
screenDiv.style.backgroundColor = '#e6d39e'
screenDiv.textContent = '_______________'

const controlDiv = document.createElement('div')
controlDiv.id = 'controls'
controlDiv.style.backgroundColor = 'green'

controlDiv.style.display = 'flex'

const keypadDiv = document.createElement('div')
keypadDiv.id = 'keypad'
keypadDiv.style.backgroundColor = 'purple'
keypadDiv.style.display = 'flex'
keypadDiv.style.flexWrap = 'wrap'
keypadDiv.style.flexGrow = 3

keypadDiv.appendChild(addButton(7))
keypadDiv.appendChild(addButton(8))
keypadDiv.appendChild(addButton(9))
keypadDiv.appendChild(addButton(4))
keypadDiv.appendChild(addButton(5))
keypadDiv.appendChild(addButton(6))
keypadDiv.appendChild(addButton(1))
keypadDiv.appendChild(addButton(2))
keypadDiv.appendChild(addButton(3))
keypadDiv.appendChild(addButton(0))

const operatorDiv = document.createElement('div')
operatorDiv.id = 'operators'
operatorDiv.style.backgroundColor = 'orange'
operatorDiv.style.display = 'flex'
operatorDiv.style.flexDirection = 'column'
operatorDiv.style.flexGrow = 1

operatorDiv.appendChild(addButton('÷'))
operatorDiv.appendChild(addButton('×'))
operatorDiv.appendChild(addButton('+'))
operatorDiv.appendChild(addButton('-'))
operatorDiv.appendChild(addButton('='))

function addButton (symbol) {
    const calButton = document.createElement('button')
    calButton.textContent = symbol

    return calButton
}


document.body.appendChild(calculatorDiv)
calculatorDiv.appendChild(screenDiv)
calculatorDiv.appendChild(controlDiv)
controlDiv.appendChild(keypadDiv)
controlDiv.appendChild(operatorDiv)

