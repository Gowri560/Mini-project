// let array = [];
// let delay = 300;
// let passCounter = 1;
// let divideSteps = [];

// document.getElementById("speedRange").addEventListener("input", function () {
//     delay = this.value;
//     document.getElementById("speedValue").textContent = delay + "ms";
// });

// function generateArray() {
//     const input = document.getElementById("arrayInput").value;
//     array = input.split(",").map(num => parseInt(num.trim()));

//     if (array.some(isNaN)) {
//         alert("Please enter valid numbers separated by commas.");
//         return;
//     }

//     displayArray();
//     passCounter = 1;
//     document.getElementById("sortingSteps").innerHTML = "";
//     divideSteps = [];
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
//         barContainer.appendChild(bar);

//         const num = document.createElement("div");
//         num.classList.add("number");
//         num.textContent = value;
//         numberContainer.appendChild(num);
//     });
// }

// async function startMergeSort() {
//     let bars = document.querySelectorAll(".bar");
//     let numbers = document.querySelectorAll(".number");
//     passCounter = 1;
//     divideSteps = [];

//     captureDividingSteps(0, array.length - 1);

//     for (let step of divideSteps) {
//         document.getElementById("sortingSteps").innerHTML += step;
//         await new Promise(resolve => setTimeout(resolve, delay));
//     }

//     await mergeSort(0, array.length - 1, bars, numbers);
//     highlightSortedBars(bars);
// }

// function highlightSortedBars(bars) {
//     for (let i = 0; i < bars.length; i++) {
//         bars[i].classList.add("sorted");
//     }
// }

// function captureDividingSteps(left, right) {
//     if (left >= right) return;

//     let mid = Math.floor((left + right) / 2);
//     divideSteps.push(`<p><strong>Dividing:</strong> [${array.slice(left, right + 1).join(", ")}] into 
//     [${array.slice(left, mid + 1).join(", ")}] and [${array.slice(mid + 1, right + 1).join(", ")}]</p>`);

//     captureDividingSteps(left, mid);
//     captureDividingSteps(mid + 1, right);
// }

// async function mergeSort(left, right, bars, numbers) {
//     if (left >= right) return;

//     let mid = Math.floor((left + right) / 2);

//     await mergeSort(left, mid, bars, numbers);
//     await mergeSort(mid + 1, right, bars, numbers);
//     await merge(left, mid, right, bars, numbers);
// }

// // Proper Merge Function to Swap Correctly
// async function merge(left, mid, right, bars, numbers) {
//     let temp = [];
//     let numTemp = [];
//     let i = left, j = mid + 1;
    
//     let positions = []; // Store the original positions to swap later

//     for (let k = left; k <= right; k++) {
//         bars[k].classList.add("merging");
//         numbers[k].classList.add("merging");
//     }
//     await new Promise(resolve => setTimeout(resolve, delay));

//     while (i <= mid && j <= right) {
//         if (array[i] <= array[j]) {
//             temp.push(array[i]);
//             numTemp.push(numbers[i].textContent);
//             positions.push(i);  // Store position for swapping
//             i++;
//         } else {
//             temp.push(array[j]);
//             numTemp.push(numbers[j].textContent);
//             positions.push(j);  // Store position for swapping
//             j++;
//         }
//     }

//     while (i <= mid) {
//         temp.push(array[i]);
//         numTemp.push(numbers[i].textContent);
//         positions.push(i);
//         i++;
//     }
//     while (j <= right) {
//         temp.push(array[j]);
//         numTemp.push(numbers[j].textContent);
//         positions.push(j);
//         j++;
//     }

//     document.getElementById("sortingSteps").innerHTML += `<p><strong>Pass ${passCounter}:</strong> Merging [${temp.join(", ")}]</p>`;
//     passCounter++;

//     // Swap and Move Elements Correctly (Fixes Duplication!)
//     for (let k = left, index = 0; k <= right; k++, index++) {
//         array[k] = temp[index];

//         // **Swap bar heights properly**
//         let fromIndex = positions[index];
//         swapBars(bars[fromIndex], bars[k]);

//         // **Swap number positions properly**
//         numbers[k].textContent = numTemp[index];

//         bars[k].classList.remove("merging");
//         numbers[k].classList.remove("merging");

//         await new Promise(resolve => setTimeout(resolve, delay));
//     }
// }

// // Function to Swap Bar Heights Properly
// function swapBars(bar1, bar2) {
//     let tempHeight = bar1.style.height;
//     bar1.style.height = bar2.style.height;
//     bar2.style.height = tempHeight;
// }

let array = [];

function generateArray() {
    const input = document.getElementById("arrayInput").value;
    array = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    displayArray();
}

function displayArray() {
    const barContainer = document.getElementById("barContainer");
    barContainer.innerHTML = "";
    
    array.forEach((value) => {
        const barWrapper = document.createElement("div");
        barWrapper.classList.add("bar-wrapper");

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bar.dataset.value = value;
        barWrapper.appendChild(bar);

        const num = document.createElement("div");
        num.classList.add("number");
        num.textContent = value;
        barWrapper.appendChild(num);

        barContainer.appendChild(barWrapper);
    });
}

async function mergeSort(arr, left, right) {
    if (left >= right) return;
    
    let mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
    let bars = document.querySelectorAll(".bar");
    let numbers = document.querySelectorAll(".number");
    let leftPart = arr.slice(left, mid + 1);
    let rightPart = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    while (i < leftPart.length && j < rightPart.length) {
        bars[k].classList.add("swapping");
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (leftPart[i] <= rightPart[j]) {
            arr[k] = leftPart[i];
            i++;
        } else {
            arr[k] = rightPart[j];
            j++;
        }
        bars[k].style.height = `${arr[k] * 3}px`;
        numbers[k].textContent = arr[k];
        bars[k].classList.remove("swapping");
        k++;
    }
    
    while (i < leftPart.length) {
        bars[k].classList.add("swapping");
        await new Promise(resolve => setTimeout(resolve, 300));
        arr[k] = leftPart[i];
        bars[k].style.height = `${arr[k] * 3}px`;
        numbers[k].textContent = arr[k];
        bars[k].classList.remove("swapping");
        i++; k++;
    }
    
    while (j < rightPart.length) {
        bars[k].classList.add("swapping");
        await new Promise(resolve => setTimeout(resolve, 300));
        arr[k] = rightPart[j];
        bars[k].style.height = `${arr[k] * 3}px`;
        numbers[k].textContent = arr[k];
        bars[k].classList.remove("swapping");
        j++; k++;
    }
}

async function startMergeSort() {
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
    await mergeSort(array, 0, array.length - 1);
    
    document.querySelectorAll(".bar").forEach(bar => bar.classList.add("sorted"));
    
    document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}
