const calculator = document.getElementById('calculator');
const keys = calculator.querySelector('.pressable');
const display = calculator.querySelector('#display');
const memoryRecall = keys.querySelector('.recall');
decimalPressed = false;

if (localStorage.getItem("MS")) {
    memoryRecall.classList.add('somethingSaved');
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('pendingFunction'));

        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {

            if (display.value === '0' || previousKeyType === 'function'){
                if (previousKeyType === 'function') {
                    calculator.dataset.previousKeyType = '';
                }

                display.value = keyContent;

                if (keyContent === '.') {
                    decimalPressed = true;
                }
            } else {
                if (keyContent === '.' && decimalPressed == true){
                    // Do nothing, we cannot have more than one decimal point
                    console.log("Trying to add more than one decimal place.")
                } else if (keyContent === '.') {
                    decimalPressed = true;
                    display.value += keyContent;
                } else {
                    display.value += keyContent;
                }
            }
        }

        switch (action) {
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                if (calculator.dataset.firstValue) {
                    calculate();
                }
                key.classList.add('pendingFunction');
                decimalPressed = false;
                calculator.dataset.previousKeyType = 'function';
                calculator.dataset.firstValue = display.value;
                calculator.dataset.operator = action;
                break;
            case 'clear':
                clear();
                break;
            case 'percent':
                display.value = parseFloat(display.value) / 100;
                break;
            case 'plusminus':
                display.value = parseFloat(display.value) * -1;
                break;
            case 'save':
                localStorage.setItem("MS", display.value);
                memoryRecall.classList.add('somethingSaved');
                break;
            case 'cleared':
                localStorage.setItem("MS", "");
                memoryRecall.classList.remove('somethingSaved');
                break;
            case 'recall':
                if (localStorage.getItem("MS")) {
                    display.value = localStorage.getItem("MS");
                }
                break;
            case 'equals':
                if (calculator.dataset.firstValue) {
                    calculate();
                }
        }
    }
});

function calculate() {
    switch (calculator.dataset.operator) {
        case 'add':
            display.value = parseFloat(calculator.dataset.firstValue) + parseFloat(display.value);
            break;
        case 'subtract':
            display.value = parseFloat(calculator.dataset.firstValue) - parseFloat(display.value);
            break;
        case 'multiply':
            display.value = parseFloat(calculator.dataset.firstValue) * parseFloat(display.value);
            break;
        case 'divide':
            display.value = parseFloat(calculator.dataset.firstValue) / parseFloat(display.value);
            break;
    };
    calculator.dataset.firstValue = '';
}

function clear() {
    calculator.dataset.previousKeyType = '';
    display.value = '0';
    calculator.dataset.firstValue = '';
}