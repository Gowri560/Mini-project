// let array = [];
// let delay = 300;

// document.getElementById("speedRange").addEventListener("input", function() {
//     delay = this.value;
//     document.getElementById("speedValue").textContent = delay + "ms";
// });

// function generateArray() {
//     const input = document.getElementById("arrayInput").value;
//     array = input.split(",").map(num => parseInt(num.trim()));
//     displayArray();
//     document.getElementById("sortingSteps").innerHTML = ""; // Clear previous steps
// }

// function displayArray() {
//     const barContainer = document.getElementById("barContainer");
//     const numberContainer = document.getElementById("numberContainer");

//     barContainer.innerHTML = "";
//     numberContainer.innerHTML = "";

//     array.forEach((value) => {
//         const bar = document.createElement("div");
//         bar.classList.add("bar");
//         bar.style.height = `${value * 3}px`;
//         bar.style.backgroundColor = "rgb(7, 7, 136)"; // Default blue
//         barContainer.appendChild(bar);

//         const num = document.createElement("div");
//         num.classList.add("number");
//         num.textContent = value;
//         numberContainer.appendChild(num);
//     });
// }

// async function quickSort() {
//     let bars = document.querySelectorAll(".bar");
//     let numbers = document.querySelectorAll(".number");
//     let stepsContainer = document.getElementById("sortingSteps");

//     await quickSortHelper(0, array.length - 1, bars, numbers, stepsContainer);
// }

// async function quickSortHelper(low, high, bars, numbers, stepsContainer) {
//     if (low < high) {
//         let pivotIndex = await partition(low, high, bars, numbers, stepsContainer);
//         await quickSortHelper(low, pivotIndex - 1, bars, numbers, stepsContainer);
//         await quickSortHelper(pivotIndex + 1, high, bars, numbers, stepsContainer);
//     } else if (low === high) {
//         bars[low].style.backgroundColor = "rgb(255, 255, 255)"; // Mark single elements as sorted
//     }
// }

// async function partition(low, high, bars, numbers, stepsContainer) {
//     let pivot = array[high];
//     let i = low - 1;
//     let stepText = `<p><strong>Partitioning:</strong> [${array.join(", ")}] with pivot ${pivot}</p>`;
//     stepsContainer.innerHTML += stepText;

//     for (let j = low; j <= high - 1; j++) {
//         bars[j].style.backgroundColor = "rgb(104, 12, 12)"; // Red (swapping)
//         await new Promise(resolve => setTimeout(resolve, delay));

//         if (array[j] < pivot) {
//             i++;
//             swap(i, j, bars, numbers);
//         }
//         bars[j].style.backgroundColor = "rgb(7, 7, 136)"; // Back to blue
//     }

//     swap(i + 1, high, bars, numbers);
    
//     bars[i + 1].style.backgroundColor = "rgb(255, 255, 255)"; // Pivot is now correctly placed (sorted)

//     return i + 1;
// }

// function swap(i, j, bars, numbers) {
//     let temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;

//     bars[i].style.height = `${array[i] * 3}px`;
//     bars[j].style.height = `${array[j] * 3}px`;

//     numbers[i].textContent = array[i];
//     numbers[j].textContent = array[j];
// }

let delay = 300; // Default delay
let bars = [];
let numbers = [];
let sortingSteps = document.getElementById("sortingSteps");

// Updates the speed based on the range input
document.getElementById("speedRange").addEventListener("input", function () {
    delay = parseInt(this.value);
    document.getElementById("speedValue").innerText = `${delay}ms`;
});

// Function to generate the array from user input
function generateArray() {
    let input = document.getElementById("arrayInput").value;
    let array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (array.length === 0) {
        alert("Please enter valid numbers separated by commas.");
        return;
    }

    bars = array;
    numbers = [...array];
    displayArray();
}

// Function to display the array as bars and numbers
function displayArray() {
    let barContainer = document.getElementById("barContainer");
    let numberContainer = document.getElementById("numberContainer");
    barContainer.innerHTML = "";
    numberContainer.innerHTML = "";

    for (let i = 0; i < bars.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${bars[i] * 3}px`;
        barContainer.appendChild(bar);

        let number = document.createElement("div");
        number.classList.add("number");
        number.innerText = numbers[i];
        numberContainer.appendChild(number);
    }
}

// Function to perform Quick Sort with animation
async function quickSort() {
    sortingSteps.innerHTML = "";
    await quickSortHelper(0, bars.length - 1);
    markSorted();
}

// Helper function for Quick Sort
async function quickSortHelper(low, high) {
    if (low < high) {
        let pivotIndex = await partition(low, high);
        await quickSortHelper(low, pivotIndex - 1);
        await quickSortHelper(pivotIndex + 1, high);
    }
}

// Partition function for Quick Sort
async function partition(low, high) {
    let pivot = bars[high];
    let i = low - 1;

    updateSortingSteps(`Choosing pivot: ${pivot}`);
    
    for (let j = low; j < high; j++) {
        if (bars[j] < pivot) {
            i++;
            updateSortingSteps(`Swapping ${bars[i]} and ${bars[j]}`);
            await swapBars(i, j);
        }
    }
    
    updateSortingSteps(`Swapping pivot ${bars[i + 1]} with ${pivot}`);
    await swapBars(i + 1, high);

    return i + 1;
}

// Function to swap two bars with animation
async function swapBars(i, j) {
    let barContainer = document.getElementById("barContainer").children;
    let numberContainer = document.getElementById("numberContainer").children;

    // Highlight bars being swapped
    barContainer[i].classList.add("swapping");
    barContainer[j].classList.add("swapping");

    await new Promise(resolve => setTimeout(resolve, delay));

    // Swap values
    [bars[i], bars[j]] = [bars[j], bars[i]];
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];

    // Update UI
    barContainer[i].style.height = `${bars[i] * 3}px`;
    barContainer[j].style.height = `${bars[j] * 3}px`;
    numberContainer[i].innerText = numbers[i];
    numberContainer[j].innerText = numbers[j];

    await new Promise(resolve => setTimeout(resolve, delay));

    // Remove swap highlight
    barContainer[i].classList.remove("swapping");
    barContainer[j].classList.remove("swapping");
}

// Function to mark all bars as sorted
function markSorted() {
    let barContainer = document.getElementById("barContainer").children;
    for (let i = 0; i < bars.length; i++) {
        barContainer[i].classList.add("sorted");
    }
    updateSortingSteps("Sorting completed.");
}

// Function to update the sorting process steps
function updateSortingSteps(step) {
    let stepElement = document.createElement("p");
    stepElement.innerText = step;
    sortingSteps.appendChild(stepElement);
    sortingSteps.scrollTop = sortingSteps.scrollHeight;
}

