'use strict';

const canvas = document.getElementById('canvas');
const base = canvas.getContext('2d');
canvas.width = canvas.height = 600;

const baseRadius = canvas.width / 2;  // радиус canvas
base.translate(baseRadius, baseRadius); // центр canvas
const clockRadius = baseRadius * 0.95; // радиус циферблата
const numbersRadius = baseRadius * 0.75; // радиус расположения цифр на циферблате
const numCircleRadius = baseRadius * 0.11; // радиус кругов с цифрами
const dotSize = baseRadius * 0.04; // размер точки в центре часов
const fontSize = clockRadius * 0.1 + 'px Arial';// размер шрифта
const digitalClockWidth = baseRadius / 1.5; // ширина цифровых часов
const digitalClockHeight = baseRadius / 6; // высота цифровых часов

setInterval(createClock, 0);

// UI

function createClock() {
  createClockFace();
  createDigitalClock();
  createDecorativeDot(dotSize);
  updateTime();
}

function createClockFace() {
  base.save();
  base.beginPath();
  base.arc(0, 0, clockRadius, 0, 2 * Math.PI);
  base.fillStyle = '#FA6775';
  base.strokeStyle = '#F52549';
  base.lineWidth = 15;
  base.fill();
  base.stroke();

  for (let number = 1; number <= 12; number++) {
    var angle = number / 12 * Math.PI * 2;
    var x = ((clockRadius - numbersRadius) / 2 - dotSize * 2.5) + Math.round(Math.sin(angle) * numbersRadius);
    var y = ((clockRadius - numbersRadius) / 2 - dotSize * 2.5) - Math.round(Math.cos(angle) * numbersRadius);
    createHourCircle(x, y);
    createHourNumbers(number, x, y);
  }

  base.restore();
}

function createHourCircle(x, y) {
  base.save();
  base.fillStyle = 'white';
  base.strokeStyle = '#F52549';
  base.lineWidth = '1';
  base.beginPath();
  base.arc(x, y, numCircleRadius, 0, 2 * Math.PI);
  base.fill();
  base.stroke();
  base.restore();
}

function createHourNumbers(number, x, y) {
  base.save();
  base.font = fontSize;
  base.fillStyle = 'black';
  base.textBaseline = 'middle';
  base.textAlign = 'center';
  base.fillText(number, x, y);
  base.restore();
}

function createArrow(angel, arrowWidth, arrowLength) {
  base.save();
  base.beginPath();
  base.strokeStyle = 'black';
  base.lineWidth = arrowWidth;
  base.lineCap = 'round';
  base.moveTo(0, 0);
  base.rotate(angel);
  base.lineTo(0, -arrowLength);
  base.stroke();
  base.rotate(-angel);
  base.restore();
}

function createDecorativeDot(size) {
  base.save();
  base.beginPath();
  base.arc(0, 0, size, 0, 2 * Math.PI);
  base.fillStyle = 'black';
  base.fill();
  base.restore();
}

function createDigitalClock() {
  base.save();
  base.beginPath();
  base.fillStyle = '#FEF3E2';
  base.rect(-digitalClockWidth / 2, digitalClockHeight, digitalClockWidth, digitalClockHeight);
  base.fill();
  base.restore();
  createDigitalNumbers();
}

function createDigitalNumbers() {
  base.save();
  base.font = fontSize;
  base.fillStyle = 'black';
  base.textAlign = 'center';
  base.textBaseline = 'middle';
  base.fillText(updateDigitalClock(), 0, digitalClockHeight * 1.5);
  base.restore();
}

// Logic

function updateTime() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  var thisHourRotate = (hour * Math.PI / 6 ) + (minute * Math.PI / (6 * 60));
  createArrow(thisHourRotate, clockRadius * 0.025, clockRadius * 0.5);

  var thisMinuteRotate = (minute * Math.PI / 30);
  createArrow(thisMinuteRotate, clockRadius * 0.015, clockRadius * 0.6);

  var thisSecondRotate = second * Math.PI / 30;
  createArrow(thisSecondRotate, clockRadius * 0.008, clockRadius * 0.7);
}

function updateDigitalClock() {
  var now = new Date();
  var time = now.toLocaleTimeString();
  return time;
}