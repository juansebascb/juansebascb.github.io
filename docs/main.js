const calculator = document.getElementById('calculator');
const keys = calculator.querySelector('.pressable');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;

        if (!action) {
            console.log('number key');
        }

        switch (action) {
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
            case 'clear':
            case 'percent':
            case 'plusminus':
            case 'save':
            case 'cleared':
            case 'recall':
            case 'equals':
            console.log('operator key');
        }
    }
})