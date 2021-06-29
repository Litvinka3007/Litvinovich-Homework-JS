'use strict';

const areaWidth = 600; // Ширина игрового поля
const areaHeight = 400; // Высота игрового поля
const score = 0; // Очки

const paddleHeight = 150; // Размер ракетки (высота)
const paddleWidth = 10; // Размер ракетки (ширина)
const paddleSpeed = 0; // Скорость ракетки
const positionXpaddle1 = 0; // Позиция левого верхнего угла 1 ракетки по оси X
const positionYpaddle1 = 129.5; // Позиция левого верхнего угла 1 ракетки по оси Y
const positionXpaddle2 = 585; // Позиция левого верхнего угла 2 ракетки по оси X
const positionYpaddle2 = 129.5; // Позиция левого верхнего угла 2 ракетки по оси Y

const ballWidth = 30; // Ширина мяча
const ballHeight = 30; // Высота мяча
const ballPosX = areaWidth / 2 - ballWidth / 2; // Позиция левого верхнего угла мяча по оси X
const ballPosY = areaHeight / 2 - ballHeight / 2; // Позиция левого верхнего угла мяча по оси Y
const ballSpeedX = 0; // Скорость мяча по оси X
const ballSpeedY = 0; // Скорость мяча по оси Y

const offset = 5;
let gameInterval = undefined;

// Создаю панель с кнопкой "СТАРТ!" и счётом игры
var section = document.getElementById('section');
var scorePanel = document.createElement('div');
scorePanel.id = 'scorePanelID';
section.appendChild(scorePanel);

// Создаю кнопку "СТАРТ!"
var buttonStart = document.createElement('button');
buttonStart.id = 'startBtn';
buttonStart.textContent = 'старт!';
scorePanel.appendChild(buttonStart);

// Создаю мини-панель со счётом игры
var scores = document.createElement('div');
scores.innerHTML = '<span id="player1">0</span><span>:</span><span id="player2">0</span>';
scores.id = 'pointsTable';
scorePanel.appendChild(scores);

// Создаю игровое поле
var area = document.createElement('div');
area.id = 'playingArea';
section.appendChild(area);

// Создаю мяч
var ballElem = document.createElement('div');
ballElem.id = 'ball';
area.appendChild(ballElem);

// Функция-конструктор мяча
function Ball() {
  this.x = ballPosX;
  this.y = ballPosY;
  this.speedX = ballSpeedX;
  this.speedY = ballSpeedY;
  this.width = ballWidth;
  this.height = ballHeight;
}

var ball = new Ball();

function startBall() {
  var side;

  ball.x = ballPosX;
  ball.y = ballPosY;

  if (Math.random() < 0.5) {
    side = 1;
  } else {
    side = -1;
  }

  ball.speedX = side * (Math.random() * 2 + 3); // При старте мяча устанавливвем рандомную скорость по оси X с меняющимся направлением влево либо право
  ball.speedY = Math.random() * 2 + 3; // При старте мяча устанавливаем рандомную скорость по оси Y
}


