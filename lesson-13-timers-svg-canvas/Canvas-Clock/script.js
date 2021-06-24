'use strict';

var baseRadius = 500; // радиус циферблата
var numbersBaseRadius = baseRadius / 2.5; // радиус оси цифр циферблата
var hourHandLength = baseRadius / 4; // длина часовой стрелки
var minuteHandLength = baseRadius / 3.5; // длина минутной стрелки
var secondHandLength = baseRadius / 3; // длина секундной стрелки
var circleRadius = baseRadius / 37.5; // радиус кругов с цифрами
var numberInCircleSize = circleRadius * 2 - 8; // размер цифр

var digitalClockWidth = baseRadius / 3.3; // ширина цифровых часов
var digitalClockHeight = baseRadius / 12.5; // высота цифровых часов
var digitalClockFont = (baseRadius / 23) + 'px'; // размер цифр на цифровых часах

var dotSize = 6; // размер точки в центре часов
//var wrapper = document.getElementById('wrapper');

const canvas = document.querySelector('#clock');
canvas.width = baseRadius;
canvas.height = baseRadius;
const base = canvas.getContext('2d');

setInterval(createClock, 1000);

// UI

function createClock() {
  createMainCircle();
  createDigitalClock();
  createDigitalNumbers();
  createClockFace();
  createHourArrow(hourHandLength, 'black');
  createMinuteArrow(minuteHandLength, 'white');
  createSecondArrow(secondHandLength, 'red');
  createDecorativeDot(dotSize);
}

function createMainCircle() {
  base.fillStyle = '#FA6775';
  base.strokeStyle = '#F52549';
  base.lineWidth = '10';
  base.beginPath();
  base.arc(baseRadius / 2, baseRadius / 2, baseRadius / 2 - 5, 0,Math.PI * 2, false);
  base.fill();
  base.stroke();
}

function createClockFace() {
  for (var number = 1; number <= 12; number++) {
    var angle = number / 12 * Math.PI * 2;
    var x = ((baseRadius - circleRadius + 6) / 2) + Math.round(Math.sin(angle) * numbersBaseRadius);
    var y = ((baseRadius - circleRadius + 16) / 2) - Math.round(Math.cos(angle) * numbersBaseRadius);
    createHourCircle(x, y, base);
    createHourNumbers(x, y, number, base);
  }
}

function createHourCircle(circleX, circleY) {
  base.fillStyle = 'white'
  base.strokeStyle = 'white';
  base.lineWidth = '1';
  base.beginPath();
  base.arc( circleX + 10, circleY, circleRadius, 0, Math.PI * 2);
  base.fill();
  base.stroke();
}

function createHourNumbers(circleX, circleY, number) {
  base.font = `${numberInCircleSize} sans-serif`;
  base.fillStyle = 'black';
  base.textAlign = 'center';
  base.fillText(number, circleX + 9.6, circleY + 1.5);
}

function createHourArrow(size, color) {
  base.save();
  base.translate(500, 500);
  base.rotate(rotateHourHandle());
  base.beginPath();
  base.fillStyle = color;
  base.fillRect(0,0, size, 4);
  base.translate(-500, -500);
  base.restore();
}

function createMinuteArrow(size, color) {
  base.save();
  base.translate(500, 500);
  base.rotate(rotateMinuteHandle());
  base.beginPath();
  base.fillStyle = color;
  base.fillRect(0,0, size, 4);
  base.translate(-500, -500);
  base.restore();
}

function createSecondArrow(size, color) {
  base.save();
  base.translate(500, 500);
  base.rotate(rotateSecondHandle());
  base.beginPath();
  base.fillStyle = color;
  base.fillRect(0,0, size, 4);
  base.translate(-500, -500);
  base.restore();
}

function createDecorativeDot(size) {
  base.beginPath();
  base.arc(baseRadius / 2, baseRadius / 2, size, 0, Math.PI * 2);
  base.fillStyle = 'white';
  base.fill();
}

function createDigitalClock() {
  base.fillStyle = '#FEF3E2';
  base.beginPath();
  base.fillRect(baseRadius / 2 - digitalClockWidth / 2, baseRadius / 2 + digitalClockHeight * 2, digitalClockWidth, digitalClockHeight);
}

function createDigitalNumbers() {
  var updateDigitalTime = updateDigitalClock();
  base.beginPath();
  base.font = `${digitalClockFont} sans-serif`;
  base.fillStyle = 'black';
  base.textAlign = 'center';
  base.textBaseline='middle';
  base.fillText(updateDigitalTime, baseRadius / 2, baseRadius / 2 + digitalClockHeight * 2.5)
}

// Logic

function rotateHourHandle() {
  var temp = new Date();
  var hour = temp.getHours();

  var thisHourRotate = ((hour / 12) * 360 - 90) / (180 / Math.PI);

  return thisHourRotate;
}

function rotateMinuteHandle() {
  var temp = new Date();
  var minute = temp.getMinutes();

  var thisMinuteRotate = (( minute / 60 ) * 360 - 90) / (180 / Math.PI);

  return thisMinuteRotate;
}

function rotateSecondHandle() {
  var temp = new Date();
  var second = temp.getSeconds();

  var thisSecondRotate = ((second / 60) * 360 - 90) / (180 / Math.PI);

  return thisSecondRotate;
}

function formatDateTime(dt) {
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var seconds = dt.getSeconds();

  return converter(hours, 2) + ':' + converter(minutes, 2) + ':' + converter(seconds, 2);
}

function converter(val, length) {
  var timeValue = val.toString();

  while (timeValue.length < length) {
    timeValue = '0' + timeValue;
  }

  return timeValue;
}

function updateDigitalClock() {
  var time = new Date();
  var formatTime = formatDateTime(time);

  return formatTime;
}