'use strict';

(function() {

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
  var gameInterval = null;

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
  area.style.width = areaWidth + 'px';
  area.style.height = areaHeight + 'px';
  area.id = 'playingArea';
  section.appendChild(area);

  // Создаю мяч
  ball = document.createElement('div');
  ball.id = 'ball';
  area.appendChild(ball);

  // Создаю ракетку1
  paddle1 = document.createElement('div');
  paddle1.className = 'paddle';
  paddle1.id = 'paddle1';
  area.appendChild(paddle1);

  // Создаю ракетку2
  paddle2 = document.createElement('div');
  paddle2.className = 'paddle';
  paddle2.id = 'paddle2';
  area.appendChild(paddle2);

  startGame();

  function startGame() {
    stopGame();
    gameInterval = setInterval(showGame, 1000 / 50);
  }

  function stopGame() {
    clearInterval(gameInterval);
  }

  // Функция-конструктор ракетки
  function Paddle(x, y) {
    this.x = x;
    this.y = y;
    this.width = paddleWidth;
    this.height = paddleHeight;
    this.score = score;
    this.speed = paddleSpeed;
  }

  var paddle1 = new Paddle(positionXpaddle1, positionYpaddle1);
  var paddle2 = new Paddle(positionXpaddle2, positionYpaddle2);

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

  // Запуск игры и запуск мяча
  document.getElementById('startBtn').addEventListener('click', function() {
    startGame();
    startBall();
  })

  // Запуск мяча из середины поля в случайном направлении под случайным углом
  function startBall() {
    var side;

    ball.x = ballPosX; // Позиционируем мяч в центре игрового поля
    ball.y = ballPosY;

    if (Math.random() < 0.5) { // При старте мяча рандомно устанавливаем сторону, в которую он полетит
      side = 1;
    } else {
      side = -1;
    }

    ball.speedX = side * (Math.random() * 2 + 3); // При старте мяча устанавливвем рандомную скорость по оси X с меняющимся направлением влево либо право
    ball.speedY = Math.random() * 2 + 3; // При старте мяча устанавливаем рандомную скорость по оси Y
  }

  // При нажатии на кнопки меняем скорость ракеток (смещение вверх/вниз)
  document.addEventListener('keydown', function(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 16) { // Если нажата клавиша Shift - на 10px вверх
      paddle1.speed = -10;
    }
    if (EO.keyCode === 17) { // Если нажата клавиша Ctrl - на 10px вниз
      paddle1.speed = 10;
    }
    if (EO.keyCode === 38) { // Если нажата клавиша Up arrow - на 10px вверх
      paddle2.speed = -10;
    }
    if (EO.keyCode === 40) { // Если нажата клавиша Down arrow - на 10px вниз
      paddle2.speed = 10;
    }
  }, false);

  // При отпускании(отжатии) кнопки ракетка перестаёт перемещаться
  document.addEventListener('keyup', function(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 16) {
      paddle1.speed = 0;
    }
    if (EO.keyCode === 17) {
      paddle1.speed = 0;
    }
    if (EO.keyCode === 38) {
      paddle2.speed = 0;
    }
    if (EO.keyCode === 40) {
      paddle2.speed = 0;
    }
  }, false);

  // Отрисовка игрового процесса
  function showGame() {
    paddle1.y += paddle1.speed; // Устанавливаем новое положение ракеток по оси Y, равное текущему положению плюс смещение по скорости
    paddle2.y += paddle2.speed;

    ball.x += ball.speedX; // При старте мяча изменяется скорость по X и Y- тем самым меняются позиции мяча по X и Y
    ball.y += ball.speedY; // Устанавливаем новое положение мяча по осям X и Y, равное текущему положению плюс смещение по скорости по обеим осям

    // Вышла ли ракетка выше стены?
    if (paddle1.y <= 0) {
      paddle1.y = 0;
    }

    if (paddle2.y <= 0) {
      paddle2.y = 0;
    }

    // Вышла ли ракетка ниже стены?
    if (paddle1.y >= areaHeight - paddle1.height) {
      paddle1.y = areaHeight - paddle1.height;
    }

    if (paddle2.y >= areaHeight - paddle2.height) {
      paddle2.y = areaHeight - paddle2.height;
    }

    // Логика для левой ракетки
    if (ball.x <= paddle1.width + offset) {
      if (ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) { // если мяч находится в рамках высоты ракетки
        ball.speedX = -ball.speedX;
      } else {
        ball.x = 0;
        paddle2.score++;
        stopGame();
      }
    }

    // Логика для правой ракетки
    if (ball.x >= areaWidth - ball.width - paddle2.width - offset) {
      if (ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) { // если мяч находится в рамках высоты ракетки
        ball.speedX = -ball.speedX;
      } else {
        ball.x = areaWidth - ballWidth - offset;
        paddle1.score++;
        stopGame();
      }
    }

    // Вылетел ли мяч выше или ниже за пределы поля?
    if (ball.y <= 0 || ball.y >= areaHeight - ball.height - offset) {
      ball.speedY = -ball.speedY;
    }

    document.getElementById("paddle1").style.top = (paddle1.y) + "px";
    document.getElementById("paddle2").style.top = (paddle2.y) + "px";

    document.getElementById("ball").style.left = (ball.x) + "px";
    document.getElementById("ball").style.top = (ball.y) + "px";

    document.getElementById('player1').innerHTML = paddle1.score.toString();
    document.getElementById('player2').innerHTML = paddle2.score.toString();
  }
}())