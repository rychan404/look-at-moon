"use strict"
const moon = require('celestial-moon');
const MicroModal = require('micromodal');
const dayjs = require('dayjs');
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
MicroModal.init();
const calendar = document.createElement('img');
const dateDisplay = document.querySelector('.date');
const datePicker = document.getElementById('date');
const timePicker = document.getElementById('time');
const finishBtn = document.querySelector('.modal__btn-primary');
const moonPhaseDisplay = document.querySelector('.moon-phase');
let date = {
    month: dayjs().month(),
    day: dayjs().date(),
    year: dayjs().year(),
    hour: dayjs().hour(),
    minute: dayjs().minute(),
    utcOffset: dayjs().utcOffset()
};
const moonPhase = moon.calculate(date.year, date.month, date.day, date.hour, date.minute, 0, date.utcOffset);
dateDisplay.textContent = dayjs().format('M/D/YYYY');
moonPhaseDisplay.textContent = moonPhase.name.replace('-', ' ');
datePicker.value = dayjs().format('YYYY-MM-DD');

calendar.setAttribute('data-micromodal-trigger', 'modal-1');
calendar.style.width = '1.25ch';
calendar.src = './svg/calendar-month.svg';
calendar.alt = 'pixel art calendar icon';

dateDisplay.onmouseover = function(event) {
   dateDisplay.insertAdjacentElement('afterend', calendar);
};

dateDisplay.onmouseout = function(event) {
    calendar.remove();
};

calendar.addEventListener('click', function() {
    MicroModal.show('modal-1');
});

finishBtn.addEventListener('click', function() {
    const dateObj = dayjs(datePicker.value);
    const newDate = dateObj.format('M/D/YYYY');
    dateDisplay.textContent = newDate;
    const time = timePicker.value.split(':');
    date = {
        month: dateObj.month() + 1,
        day: dateObj.date(),
        year: dateObj.year(),
        hour: time[0],
        minute: time[1],
        utcOffset: dateObj.utcOffset() / 60
    }
    const moonPhase = moon.calculate(date.year, date.month, date.day, date.hour, date.minute, 0, date.utcOffset);
    moonPhaseDisplay.textContent = moonPhase.name.replace('-', ' ');
    MicroModal.close('modal-1');
});