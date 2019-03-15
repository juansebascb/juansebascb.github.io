const calculator = document.getElementById('calculator');
const keys = calculator.querySelector('.pressable');
const display = calculator.querySelector('#display');
const memoryRecall = keys.querySelector('.recall');

decimalPressed = false;

let history = {
    calculationStack : [],
    displayStack: function() {
        for (i = 1; i <= this.calculationStack.length; i++){
            para = document.createElement("p");
            node = document.createTextNode(this.calculationStack[this.calculationStack.length - i]);
            para.appendChild(node);
            element = document.getElementById("history");
            element.appendChild(para);
        }
    },
    addToTop: function(str) {
        this.calculationStack.push(str);
        localStorage.setItem("pastHistory", JSON.stringify(this));
        this.displayLatest();
    },
    displayLatest: function() {
        if (this.calculationStack.length == 1){
            this.displayStack();
        } else {
            var para = document.createElement("p");
            var node = document.createTextNode(this.calculationStack[this.calculationStack.length - 1]);
            para.appendChild(node);
            var element = document.getElementById("history");
            var child = element.getElementsByTagName("p");
            element.insertBefore(para,child[0]);
        }
    },
    size: function() {
        return this.calculationStack.length;
    },
    clearHistory: function() {
        var element = document.getElementById("history");

        for (i = 0; i <= this.calculationStack.length; i++){
            element.removeChild(element.childNodes[2]);
        }

        this.calculationStack = [];
        localStorage.setItem("pastHistory", "");
    }
}

function displayMemory() {
    if (localStorage.getItem("MS")) {
        memoryRecall.classList.add('somethingSaved');
    }
}

function displayHistory() {
    if (localStorage.getItem("pastHistory")) {
        var temp = JSON.parse(localStorage.getItem("pastHistory"));
        history.calculationStack = temp.calculationStack
        history.displayStack();
    }
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

            if (display.value === '0' || previousKeyType === 'function' || previousKeyType === 'equals'){
                if (previousKeyType === 'function' || previousKeyType === 'equals') {
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
                if (calculator.dataset.firstValue && calculator.dataset.previousKeyType != 'function') {
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
                    calculator.dataset.previousKeyType = 'equals';
                    calculate();
                }
        }
    }
});

function calculate() {
    str = "";

    switch (calculator.dataset.operator) {
        case 'add':
            str = calculator.dataset.firstValue + " + " + display.value;
            display.value = parseFloat(calculator.dataset.firstValue) + parseFloat(display.value);
            break;
        case 'subtract':
            str = calculator.dataset.firstValue + " - " + display.value;
            display.value = parseFloat(calculator.dataset.firstValue) - parseFloat(display.value);
            break;
        case 'multiply':
            str = calculator.dataset.firstValue +  " * " + display.value;
            display.value = parseFloat(calculator.dataset.firstValue) * parseFloat(display.value);
            break;
        case 'divide':
            str = calculator.dataset.firstValue + " / " + display.value;
            display.value = parseFloat(calculator.dataset.firstValue) / parseFloat(display.value);
            break;
    };
    calculator.dataset.firstValue = '';
    str += " = " + display.value;
    history.addToTop(str);
}

function clear() {
    calculator.dataset.previousKeyType = '';
    display.value = '0';
    calculator.dataset.firstValue = '';
}

window.addEventListener ('keypress', e => {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 47:
            document.getElementById('%').click();
        case 46:
            document.getElementById('.').click();
            break;
        case 13:
        case 61:
            document.getElementById('equals').click();
            break;
        case 47:
            document.getElementById('/').click();
            break;
        case 42:
            document.getElementById('*').click();
            break;
        case 45:
            document.getElementById('-').click();
            break;
        case 43:
            document.getElementById('+').click();
            break;
        case 57:
            document.getElementById('9').click();
            break;
        case 56:
            document.getElementById('8').click();
            break;
        case 55:
            document.getElementById('7').click();
            break;
        case 54:
            document.getElementById('6').click();
            break;
        case 53:
            document.getElementById('5').click();
            break;
        case 48:
            document.getElementById('0').click();
            break;
        case 49:
            document.getElementById('1').click();
            break;
        case 50:
            document.getElementById('2').click();
            break;
        case 51:
            document.getElementById('3').click();
            break;
        case 52:
            document.getElementById('4').click();
            break;
    };
});