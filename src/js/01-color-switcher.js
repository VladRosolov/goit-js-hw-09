const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.setAttribute('enabled', false)
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    stopBtn.setAttribute('enabled', false)
});


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }