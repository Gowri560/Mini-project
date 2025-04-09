let array = [];
let delay = 300; // Default speed in milliseconds

// Update speed based on slider input
document.getElementById("speedRange").addEventListener("input", function() {
    delay = this.value;
    document.getElementById("speedValue").textContent = delay + "ms";
});

function generateArray() {
    const input = document.getElementById("arrayInput").value;
    array = input.split(",").map(num => parseInt(num.trim()));
    displayArray();
    document.getElementById("sortingSteps").innerHTML = ""; // Clear previous steps
}

function displayArray() {
    const barContainer = document.getElementById("barContainer");
    const numberContainer = document.getElementById("numberContainer");

    barContainer.innerHTML = "";
    numberContainer.innerHTML = "";

    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        barContainer.appendChild(bar);

        const num = document.createElement("div");
        num.classList.add("number");
        num.textContent = value;
        numberContainer.appendChild(num);
    });
}

async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
    let numbers = document.querySelectorAll(".number");
    let len = array.length;
    let stepsContainer = document.getElementById("sortingSteps");

    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        bars[minIndex].classList.add("selecting");

        for (let j = i + 1; j < len; j++) {
            bars[j].classList.add("selecting");

            await new Promise(resolve => setTimeout(resolve, delay));

            if (array[j] < array[minIndex]) {
                bars[minIndex].classList.remove("selecting");
                minIndex = j;
                bars[minIndex].classList.add("selecting");
            }

            bars[j].classList.remove("selecting");
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;

            numbers[i].textContent = array[i];
            numbers[minIndex].textContent = array[minIndex];

            bars[i].classList.add("swapping");
            bars[minIndex].classList.add("swapping");

            await new Promise(resolve => setTimeout(resolve, delay));

            bars[i].classList.remove("swapping");
            bars[minIndex].classList.remove("swapping");
        }

        bars[i].classList.remove("selecting");
        bars[i].classList.add("sorted");

        stepsContainer.innerHTML += `<p><strong>Pass ${i + 1}:</strong> [${array.join(", ")}]</p>`;
    }

    bars[len - 1].classList.add("sorted");
    stepsContainer.innerHTML += `<p><strong>Final Sorted Array:</strong> [${array.join(", ")}]</p>`;
}