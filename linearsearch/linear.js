let array = [];

function generateArray() {
    const input = document.getElementById("arrayInput").value;
    array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    createArrayBoxes();
}

function createArrayBoxes() {
    const container = document.getElementById("arrayContainer");
    container.innerHTML = "";
    array.forEach((num, index) => {
        const div = document.createElement("div");
        div.classList.add("box");
        div.innerText = num;
        div.setAttribute("id", "box-" + index);
        container.appendChild(div);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function linearSearch() {
    const searchValue = parseInt(document.getElementById("searchInput").value);
    document.getElementById("result").innerText = "Searching...";
    
    for (let i = 0; i < array.length; i++) {
        let box = document.getElementById("box-" + i);
        box.classList.add("highlight");
        await sleep(500);
        
        if (array[i] === searchValue) {
            box.classList.add("found");
            document.getElementById("result").innerText = `Found ${searchValue} at index ${i}, position = ${i+1}`;
            return;
        }
        box.classList.remove("highlight");
    }
    document.getElementById("result").innerText = "Number not found!";
}