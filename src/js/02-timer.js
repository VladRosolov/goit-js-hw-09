import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMins: document.querySelector('[data-minutes]'),
    dataSecs: document.querySelector('[data-seconds]'),
    inputEl: document.querySelector('#datetime-picker')
}

refs.startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const dateNow = Date.now();
        if (selectedDates[0] < dateNow) {
            window.alert('Please choose a date in the future!')
            return;
        }
        const choiceDate = selectedDates[0].getTime();
        refs.startBtn.removeAttribute('disabled');

        function timer() {
            const intervalId = setInterval(() => {
                const currentDate = Date.now();
                const delta = choiceDate - currentDate;
                if (delta <= 100) {
                    clearInterval(intervalId);
                    return;
                }
                convertMs(delta);
                refs.inputEl.setAttribute('disabled', true)
            }, 1000);
        }
        refs.startBtn.addEventListener('click', timer)

    },
};


flatpickr(refs.inputEl, options);


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    refs.dataDays.textContent = days;
    refs.dataHours.textContent = hours;
    refs.dataMins.textContent = minutes;
    refs.dataSecs.textContent = seconds;

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


