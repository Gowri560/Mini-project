const pushBtn = document.getElementById('pushBtn');
const popBtn = document.getElementById('popBtn');
const stackInput = document.getElementById('stackInput');
const stack = document.getElementById('stack');
const message = document.getElementById('message');
const pointer = document.getElementById('pointer');

const MAX_SIZE = 5; 
let stackArray = [];

function updateStackDisplay() {
    stack.innerHTML = '';

    stackArray.forEach((item, index) => {
        const stackItem = document.createElement('div');
        stackItem.textContent = item;
        stack.appendChild(stackItem);

        // Update pointer position to topmost element
        if (index === stackArray.length - 1) {
            pointer.style.top = `${stackItem.offsetTop - 25}px`;
        }
    });

    // Hide pointer if stack is empty
    pointer.style.display = stackArray.length === 0 ? 'none' : 'block';
}

function pushToStack() {
    const value = stackInput.value.trim();

    if (stackArray.length >= MAX_SIZE) {
        message.textContent = `Stack Overflow! Maximum size is ${MAX_SIZE}.`;
        return;
    }

    if (value !== '') { 
        stackArray.push(value);
        stackInput.value = '';
        updateStackDisplay();
        message.textContent = `Pushed: ${value}`;
    } else {
        message.textContent = 'Please enter a value!';
    }
}

function popFromStack() {
    if (stackArray.length > 0) {
        const poppedValue = stackArray.pop();
        updateStackDisplay();
        message.textContent = `Popped: ${poppedValue}`;
    } else {
        message.textContent = 'Stack Underflow! The stack is empty.';
    }
}

pushBtn.addEventListener('click', pushToStack);
popBtn.addEventListener('click', popFromStack);

// Initialize pointer position
updateStackDisplay();
