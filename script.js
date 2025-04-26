const display = document.getElementById('display');
const historyBox = document.getElementById('history');
const clickSound = document.getElementById('click-sound');

function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function appendValue(value) {
    display.value += value;
}

function appendFunction(func) {
    display.value += func + '(';
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function appendPower() {
    display.value += '**';
}

function calculate() {
    try {
        const result = Function('return ' + display.value)();
        const scientific = Number(result);
        historyBox.innerHTML += `<div>${display.value} = ${scientific}</div>`;
        display.value = scientific;
    } catch {
        display.value = 'Error';
    }
}

function toggleTheme() {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
}

// Shift-toggle button functionality
document.querySelectorAll('.toggle-fn').forEach(button => {
    button.addEventListener('click', event => {
        playSound();
        const isShift = event.shiftKey;
        const normal = button.getAttribute('data-normal');
        const shift = button.getAttribute('data-shift');

        if (normal === '**2' || normal === '**3') {
            display.value += isShift ? shift : normal;
        } else if (normal === 'Math.exp') {
            display.value +='Math.exp('
        } else {
            display.value += (isShift ? shift : normal) + '(';
        }
    });
});

document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '%'].includes(key)) {
        appendValue(key);
        playSound();
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
        playSound();
    } else if (key === 'Backspace') {
        deleteLast();
        playSound();
    } else if (key === 'Escape') {
        clearDisplay();
        playSound();
    }
});
