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

async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");
    let numbers = document.querySelectorAll(".number");
    let len = array.length;
    let stepsContainer = document.getElementById("sortingSteps");

    for (let i = 0; i < len - 1; i++) {
        let stepText = `<p><strong>Pass ${i + 1}:</strong> `;
        let swapped = false;

        for (let j = 0; j < len - 1 - i; j++) {
            bars[j].classList.add("swapping");
            bars[j + 1].classList.add("swapping");

            await new Promise(resolve => setTimeout(resolve, delay));

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;

                numbers[j].textContent = array[j];
                numbers[j + 1].textContent = array[j + 1];

                swapped = true;
            }

            bars[j].classList.remove("swapping");
            bars[j + 1].classList.remove("swapping");
        }

        bars[len - 1 - i].classList.add("sorted");

        stepText += `[${array.join(", ")}]</p>`;
        stepsContainer.innerHTML += stepText;

        if (!swapped) break;
    }

    bars[0].classList.add("sorted");
    stepsContainer.innerHTML += `<p><strong>Final Sorted Array:</strong> [${array.join(", ")}]</p>`;
}