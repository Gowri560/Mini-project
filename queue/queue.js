

// const enqueueBtn = document.getElementById('enqueueBtn');
// const dequeueBtn = document.getElementById('dequeueBtn');
// const queueInput = document.getElementById('queueInput');
// const queue = document.getElementById('queue');
// const message = document.getElementById('message');
// const indexContainer = document.getElementById('index-container');
// const frontValue = document.getElementById('frontValue');
// const rearValue = document.getElementById('rearValue');

// const MAX_SIZE = 5;
// let queueArray = new Array(MAX_SIZE).fill(null); // Fixed-size queue
// let front = -1;
// let rear = -1;

// function updateQueueDisplay() {
//     queue.innerHTML = '';
//     indexContainer.innerHTML = '';

//     for (let i = 0; i < MAX_SIZE; i++) {
//         const queueItem = document.createElement('div');
//         queueItem.textContent = queueArray[i] !== null ? queueArray[i] : '';
//         queue.appendChild(queueItem);

//         const indexDiv = document.createElement('div');
//         indexDiv.textContent = i;
//         indexContainer.appendChild(indexDiv);
//     }

//     frontValue.textContent = front === -1 ? '-' : front;
//     rearValue.textContent = rear === -1 ? '-' : rear;
// }

// function enqueue() {
//     const value = queueInput.value.trim();

//     if (rear === MAX_SIZE) {
//         message.textContent = `Queue Overflow! Maximum size is ${MAX_SIZE}.`;
//         return;
//     }

//     if (value !== '') {
//         if (front === -1) front = 0; 
//         rear = (rear + 1);
//         if (rear >= MAX_SIZE) {
//             message.textContent = `Queue Overflow! Maximum size is ${MAX_SIZE}.`;
//             return;
//         } 
//         queueArray[rear] = value;
//         queueInput.value = '';
//         updateQueueDisplay();
//         message.textContent = `Enqueued: ${value}`;
//     } else {
//         message.textContent = 'Please enter a value!';
//     }
// }

// function dequeue() {
//     if (front === -1) {
//         message.textContent = 'Queue Underflow! The queue is empty.';
//         return;
//     }

//     let dequeuedValue = queueArray[front]; // Store the dequeued value
//     queueArray[front] = null; // Keep positions intact

//     if (front === rear) {
//         //front = rear =; // Reset queue when last element is dequeued
//     } else {
//         front = (front + 1);
//     }

//     updateQueueDisplay();
//     message.textContent = `Dequeued: ${dequeuedValue}`; // Display dequeued value
// }



// enqueueBtn.addEventListener('click', enqueue);
// dequeueBtn.addEventListener('click', dequeue);

// updateQueueDisplay(); // Initialize display with front and rear values

const enqueueBtn = document.getElementById('enqueueBtn');
const dequeueBtn = document.getElementById('dequeueBtn');
const clearBtn = document.getElementById('clearBtn'); // Get Clear Button
const queueInput = document.getElementById('queueInput');
const queue = document.getElementById('queue');
const message = document.getElementById('message');
const indexContainer = document.getElementById('index-container');
const frontValue = document.getElementById('frontValue');
const rearValue = document.getElementById('rearValue');

const MAX_SIZE = 5;
let queueArray = new Array(MAX_SIZE).fill(null);
let front = -1;
let rear = -1;

function updateQueueDisplay() {
    queue.innerHTML = '';
    indexContainer.innerHTML = '';

    for (let i = 0; i < MAX_SIZE; i++) {
        const queueItem = document.createElement('div');
        queueItem.textContent = queueArray[i] !== null ? queueArray[i] : '';
        queue.appendChild(queueItem);

        const indexDiv = document.createElement('div');
        indexDiv.textContent = i;
        indexContainer.appendChild(indexDiv);
    }

    frontValue.textContent = front === -1 ? '-' : front;
    rearValue.textContent = rear === -1 ? '-' : rear;
}

function enqueue() {
    const value = queueInput.value.trim();

    if (rear === MAX_SIZE - 1) {
        message.textContent = `Queue Overflow! Maximum size is ${MAX_SIZE}.`;
        return;
    }

    if (value !== '') {
        if (front === -1) front = 0;
        rear = (rear + 1);
        queueArray[rear] = value;
        queueInput.value = '';
        updateQueueDisplay();
        message.textContent = `Enqueued: ${value}`;
    } else {
        message.textContent = 'Please enter a value!';
    }
}

function dequeue() {
    let dequeuedValue = queueArray[front];
    queueArray[front] = null;
    if (front === -1 || front > rear || !dequeuedValue) {
        message.textContent = 'Queue Underflow! The queue is empty.';
        return;
    }


    if (front === rear) {
        // front = -1;
        // rear = -1;
    } else {
        front = (front + 1);
    }

    updateQueueDisplay();
    message.textContent = `Dequeued: ${dequeuedValue}`;
}

function clearQueue() {
    queueArray.fill(null);
    front = -1;
    rear = -1;
    updateQueueDisplay();
    message.textContent = 'Queue has been cleared!';
}

enqueueBtn.addEventListener('click', enqueue);
dequeueBtn.addEventListener('click', dequeue);
clearBtn.addEventListener('click', clearQueue);

updateQueueDisplay();
