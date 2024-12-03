let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

document.addEventListener("DOMContentLoaded", displayHistory);

function appendValue(value) {
    document.getElementById('input').value += value;
}

function calculate() {
    const input = document.getElementById('input');
    try {
        const result = eval(input.value);
        if (!isNaN(result)) {
            history.push(`${input.value} = ${result}`);
            localStorage.setItem('calcHistory', JSON.stringify(history));
            displayHistory();
            input.value = result;
        } else {
            input.value = '';
            alert('Nepareiza ievade!');
        }
    } catch (e) {
        input.value = '';
        alert('Nepareiza ievade!');
    }
}

function clearInput() {
    document.getElementById('input').value = '';
}

function displayHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';
    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `${item} <button onclick="deleteHistory(${index})">Delete</button>`;
        historyDiv.appendChild(div);
    });
}

function deleteHistory(index) {
    history.splice(index, 1);
    localStorage.setItem('calcHistory', JSON.stringify(history));
    displayHistory();
}

function clearHistory() {
    history = [];
    localStorage.removeItem('calcHistory');
    displayHistory();
}
