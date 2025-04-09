let array = [];
let delay = 300; // Default sorting speed

document.getElementById("speedRange").addEventListener("input", function () {
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

async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
    let numbers = document.querySelectorAll(".number");
    let stepsContainer = document.getElementById("sortingSteps");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].classList.add("swapping");

        await new Promise(resolve => setTimeout(resolve, delay));

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];

            bars[j + 1].style.height = `${array[j] * 3}px`;
            numbers[j + 1].textContent = array[j];

            bars[j].classList.add("swapping");
            bars[j + 1].classList.add("swapping");

            await new Promise(resolve => setTimeout(resolve, delay));

            bars[j].classList.remove("swapping");
            bars[j + 1].classList.remove("swapping");

            j--;
        }

        array[j + 1] = key;

        bars[j + 1].style.height = `${key * 3}px`;
        numbers[j + 1].textContent = key;

        bars[i].classList.remove("swapping");

        stepsContainer.innerHTML += `<p><strong>Pass ${i}:</strong> [${array.join(", ")}]</p>`;
    }

    for (let i = 0; i < array.length; i++) {
        bars[i].classList.add("sorted");
    }

    stepsContainer.innerHTML += `<p><strong>Final Sorted Array:</strong> [${array.join(", ")}]</p>`;
}