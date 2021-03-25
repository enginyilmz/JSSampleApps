const display = document.querySelector('.calculator-input');
const keys = document.querySelectorAll('div.calculator-keys > button');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

keys.forEach(function (key) {
    key.addEventListener('click', btnClick);
})
updateDisplay();


function updateDisplay() {
    display.value = displayValue;
}

function btnClick(e) {
    var val = e.target.value;
    switch (e.target.className) {
        case 'operator':
        case 'equal-sign operator':
            handleOperator(val);
            break;
        case 'decimal':
            inputDecimal(val);
            break;
        case 'clear':
            displayValue = '0';
            break;
        default:
            inputNumber(val);
    }
    updateDisplay();
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue.concat(num);
    }
}

function inputDecimal(dec) {
    if (!displayValue.includes('.')) {
        displayValue = displayValue.concat(dec);
    }
}

function handleOperator(op) {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue){
        operator = op;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = op;
}

function calculate(first, second, op) {
    console.log(first + ' ' + op + ' ' + second);
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}

