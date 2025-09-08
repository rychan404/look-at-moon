const moon = require('celestial-moon');
const MicroModal = require('micromodal');

const phase = moon.calculate(2025, 9, 7, 4, 39, 0, -4);
console.log(phase.age);
console.log(phase.name);
MicroModal.init();

const calendar = document.createElement('img');
const date = document.querySelector('.date');
calendar.setAttribute('data-micromodal-trigger', 'modal-1');
calendar.style.width = '1.5ch';
calendar.src = './svg/calendar-month.svg';
calendar.alt = 'pixel art calendar icon';

date.onmouseover = function(event) {
   date.insertAdjacentElement('afterend', calendar);
};

date.onmouseout = function(event) {
    calendar.remove();
};

calendar.addEventListener('click', function() {
    MicroModal.show('modal-1');
});