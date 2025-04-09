let array = [];
let target = null;
let isSearching = false;

function generateArray() {
    const input = document.getElementById('arrayInput').value;
    array = input.split(',').map(num => parseInt(num.trim())).sort((a, b) => a - b);
    target = null;
    document.getElementById('searchInput').value = '';
    document.getElementById('result').innerHTML = '';
    renderArray();
}

function renderArray() {
    const arrayContainer = document.getElementById('arrayContainer');
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.textContent = value;
        arrayContainer.appendChild(box);
    });
}

function binarySearch() {
    const searchValue = parseInt(document.getElementById('searchInput').value);
    if (isNaN(searchValue)) {
        alert('Please enter a valid number');
        return;
    }

    target = searchValue;
    let low = 0;
    let high = array.length - 1;

    isSearching = true;
    let interval = setInterval(() => {
        if (low <= high) {
            let mid = Math.floor((low + high) / 2);
            highlightElement(mid, 'highlight');

            if (array[mid] === target) {
                highlightElement(mid, 'found');
                document.getElementById('result').textContent = `Found target at index ${mid} ,POSITION= ${mid+1}`;
                clearInterval(interval);
                return;
            } else if (array[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }

            // Reset highlight for the next iteration
            setTimeout(() => {
                document.querySelectorAll('.box').forEach(box => {
                    box.classList.remove('highlight');
                });
            }, 500);
        } else {
            document.getElementById('result').textContent = 'Target not found';
            clearInterval(interval);
        }
    }, 1000);
}

function highlightElement(index, className) {
    const boxes = document.querySelectorAll('.box');
    boxes[index].classList.add(className);
}