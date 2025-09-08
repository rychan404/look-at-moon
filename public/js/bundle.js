(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const MINUTES_IN_DAY = 24 * 60;
const SECONDS_IN_DAY = MINUTES_IN_DAY * 60;
const SYNODIC_MONTH = 29.530588853;

const MOON_PHASES = [
    { name: 'new-moon', end: 1 },
    { name: 'waxing-crescent', end: 6.38264692644 },
    { name: 'first-quarter', end: 8.38264692644 },
    { name: 'waxing-gibbous', end: 13.76529385288 },
    { name: 'full-moon', end: 15.76529385288 },
    { name: 'waning-gibbous', end: 21.14794077932 },
    { name: 'last-quarter', end: 23.14794077932 },
    { name: 'waning-crescent', end: 28.53058770576 },
    { name: 'new-moon', end: SYNODIC_MONTH }
]

/**
 * 
 * @param {number} year Year
 * @param {number} month Month
 * @param {number} day Day
 * @param {number} hours Hours
 * @param {number} minutes Minutes
 * @param {number} seconds Seconds
 * @param {number} utcOffset Timezone offset to UTC, i.e. -4 or +4
 */
function calculate(year, month, day, hours, minutes, seconds, utcOffset = 0) {
    let julianNewMoonReference = gregorianToJulian(2000, 1, 6, 18, 14, 0, 0); //Lunation Number 18:14 UTC, January 6, 2000
    let julianCalculate = gregorianToJulian(year, month, day, hours, minutes, seconds, utcOffset);

    let age = (julianCalculate - julianNewMoonReference) % SYNODIC_MONTH;
    let phase = getPhase(age);

    return {
        age: roundToTwoDecimals(age),
        name: phase.name
    }
}

function getPhase(age) {
    return MOON_PHASES.find((m) => age <= m.end);
}

function gregorianToJulian(year, month, day, hour, minute, second, utcOffset) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    let A = Math.floor(year / 100);
    let B = 2 - A + Math.floor(A / 4);
    let jDay = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
    let jTime = ((hour * (60 * 60)) + (minute * 60) + second) / SECONDS_IN_DAY;

    return jDay + jTime - utcOffset / 24;
}

function roundToTwoDecimals(num) {
    return Math.round(num * 100) / 100;
}

module.exports = {
    calculate: calculate
}
},{}],2:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).MicroModal=t()}(this,(function(){"use strict";function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var n,i,r,a,s,l=(n=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],i=function(){function o(e){var n=e.targetModal,i=e.triggers,r=void 0===i?[]:i,a=e.onShow,s=void 0===a?function(){}:a,l=e.onClose,c=void 0===l?function(){}:l,d=e.openTrigger,u=void 0===d?"data-micromodal-trigger":d,f=e.closeTrigger,h=void 0===f?"data-micromodal-close":f,v=e.openClass,g=void 0===v?"is-open":v,m=e.disableScroll,y=void 0!==m&&m,b=e.disableFocus,p=void 0!==b&&b,w=e.awaitCloseAnimation,E=void 0!==w&&w,k=e.awaitOpenAnimation,M=void 0!==k&&k,A=e.debugMode,C=void 0!==A&&A;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.modal="string"==typeof n?document.getElementById(n):n,this.config={debugMode:C,disableScroll:y,openTrigger:u,closeTrigger:h,openClass:g,onShow:s,onClose:c,awaitCloseAnimation:E,awaitOpenAnimation:M,disableFocus:p},r.length>0&&this.registerTriggers.apply(this,t(r)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}var i,r,a;return i=o,(r=[{key:"registerTriggers",value:function(){for(var e=this,t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];o.filter(Boolean).forEach((function(t){t.addEventListener("click",(function(t){return e.showModal(t)}))}))}},{key:"showModal",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add(this.config.openClass),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.awaitOpenAnimation){var o=function t(){e.modal.removeEventListener("animationend",t,!1),e.setFocusToFirstNode()};this.modal.addEventListener("animationend",o,!1)}else this.setFocusToFirstNode();this.config.onShow(this.modal,this.activeElement,t)}},{key:"closeModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.modal;if(this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement&&this.activeElement.focus&&this.activeElement.focus(),this.config.onClose(this.modal,this.activeElement,e),this.config.awaitCloseAnimation){var o=this.config.openClass;this.modal.addEventListener("animationend",(function e(){t.classList.remove(o),t.removeEventListener("animationend",e,!1)}),!1)}else t.classList.remove(this.config.openClass)}},{key:"closeModalByIdOrElement",value:function(e){this.modal="string"==typeof e?document.getElementById(e):e,this.modal&&this.closeModal()}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var t=document.querySelector("body");switch(e){case"enable":Object.assign(t.style,{overflow:""});break;case"disable":Object.assign(t.style,{overflow:"hidden"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(e){(e.target.hasAttribute(this.config.closeTrigger)||e.target.parentNode.hasAttribute(this.config.closeTrigger))&&(e.preventDefault(),e.stopPropagation(),this.closeModal(e))}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.retainFocus(e)}},{key:"getFocusableNodes",value:function(){var e=this.modal.querySelectorAll(n);return Array.apply(void 0,t(e))}},{key:"setFocusToFirstNode",value:function(){var e=this;if(!this.config.disableFocus){var t=this.getFocusableNodes();if(0!==t.length){var o=t.filter((function(t){return!t.hasAttribute(e.config.closeTrigger)}));o.length>0&&o[0].focus(),0===o.length&&t[0].focus()}}}},{key:"retainFocus",value:function(e){var t=this.getFocusableNodes();if(0!==t.length)if(t=t.filter((function(e){return null!==e.offsetParent})),this.modal.contains(document.activeElement)){var o=t.indexOf(document.activeElement);e.shiftKey&&0===o&&(t[t.length-1].focus(),e.preventDefault()),!e.shiftKey&&t.length>0&&o===t.length-1&&(t[0].focus(),e.preventDefault())}else t[0].focus()}}])&&e(i.prototype,r),a&&e(i,a),o}(),r=null,a=function(e){if("string"==typeof id?!document.getElementById(e):!e)return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e,"'"),"background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'.concat(e,'"></div>')),!1},s=function(e,t){if(function(e){e.length<=0&&(console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>'))}(e),!t)return!0;for(var o in t)a(o);return!0},{init:function(e){var o=Object.assign({},{openTrigger:"data-micromodal-trigger"},e),n=t(document.querySelectorAll("[".concat(o.openTrigger,"]"))),a=function(e,t){var o=[];return e.forEach((function(e){var n=e.attributes[t].value;void 0===o[n]&&(o[n]=[]),o[n].push(e)})),o}(n,o.openTrigger);if(!0!==o.debugMode||!1!==s(n,a))for(var l in a){var c=a[l];o.targetModal=l,o.triggers=t(c),r=new i(o)}},show:function(e,t){var o=t||{};o.targetModal=e,!0===o.debugMode&&!1===a(e)||(r&&r.removeEventListeners(),(r=new i(o)).showModal())},close:function(e){e?r.closeModalByIdOrElement(e):r.closeModal()}});return"undefined"!=typeof window&&(window.MicroModal=l),l}));

},{}],3:[function(require,module,exports){
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
},{"celestial-moon":1,"micromodal":2}]},{},[3]);
