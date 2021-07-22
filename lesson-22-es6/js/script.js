'use strict';

const articlesList = 'articles/articles_list.json'; // Путь к списку статей энциклопедии

let articles = {
  list: {}, // Полный список статей энциклопедии
  sortedList: [], // Массив, содержащий отсортированный список статей
  articleTitle: null, // Название загруженной статьи
  articleHTML: null, // Содержание загруженной статьи

  load(pathLoad) {
    $.ajax(pathLoad, {
      type: 'GET',
      dataType: 'json',
      async: false,
      cache: false,
      success: (data) => { // Помещаем полученные статьи в хэш
        this.list = data;
      },
      error: errorHandler,
    });
    this.sortList(); // Вызываем метод для сортировки статей в алфавитном порядке
  },

  loadArticle(title) {
    $.ajax(`articles/${this.list[title]}.html`, {
      type: 'GET',
      async: false,
      dataType: 'html',
      cache: false,
      success: (data) => {
        this.articleTitle = title;
        this.articleHTML = data;
      },
      error: errorHandler,
    });
  },

  sortList() {
    this.sortedList = Object.keys(this.list).sort(); // Сортируем статьи в алфавитном порядке
  },
};

window.onhashchange = renderNewState; // Реагируем на изменение хэша в адресной строке и вызываем метод отрисовки нового состояния
renderNewState();

function renderNewState() {
  let hash = window.location.hash; // Получаем текущий хэш
  let state = decodeURIComponent(hash.substr(1)); // Вырезаем нужную часть из URL и декодируем

  if (state === '') { // Если ничего не получили из хэша, загружается главная страница
    state = {pageName: 'main'};
  } else {
    state = JSON.parse(state);
  }

  articles.load(articlesList);

  let page = ''; // Какую страницу хотим загрузить?

  switch (state.pageName) { // Динамически формируем контент страницы
    case 'main':
      page += '<h1 class="title" id="title">Энциклопедия волшебных существ Вселенной Гарри Поттера</h1>';
      page += '<div><a class="contents" id="contents" href="/" onclick="switchToContents(event)">Содержание энциклопедии</a></div>';
      break;
    case 'contents':
      if (articles.sortedList) {
        articles.sortList();
      }
      let items = articles.sortedList;
      page += '<h1 class="title" id="title">Содержание</h1>';
      page += '<div>';

      for (let i = 0; i < items.length; i++) {
        page += `<ul>${items[i][0]}`;
        for (let j = i; j < items.length; j++) {
          if (items[i][0] === items[j][0]) {
            page += `<li><a id="article" href="articles/${
                articles.list[items[j]]
            }.html" onclick="switchToArticlePage(event)">${items[j]}</a></li>`;
          } else {
            page += "</ul>";
            break;
          }
        }
      }
      page += '</div>';
      break;
    case 'article':
      if (articles.articleTitle == null) {
        articles.loadArticle(Object.keys(articles.list)[0]);
      }
      page += "<ul class='menu'>";
      articles.sortedList.forEach((item) => {
        page += `<li><a id="article" href="articles/${articles.list[item]}.html" onclick="switchToArticlePage(event)">${item}</a></li>`;
      });
      page += '</ul>';
      page += `<h1 class="title" id="title">${articles.articleTitle}</h1>`;
      page += `${articles.articleHTML}`;
      break;
  }

  document.getElementById('wrapper').innerHTML = page;
}

function switchToState(pageName) { // Меняем хэш, сразу срабатывает подписка window.onhashchange = renderNewState, вызывается renderNewState()
  location.hash = encodeURIComponent(JSON.stringify(pageName)); // Кодируем адрес
}

function switchToContents(event) {
  event.preventDefault();

  articles.sortList();
  switchToState({pageName: 'contents'}); // Передаём, какая страница нас интересует
}

function switchToArticlePage(event) {
  event.preventDefault();

  let articleTitle = event.target.textContent;
  let pathToArticle = event.target.href;

  $.ajax(pathToArticle, {
    type: 'HEAD',
    success: () => {
      articles.loadArticle(articleTitle);
      switchToState({pageName: 'article'});
      renderNewState();
    },
    error: errorHandler,
  });
}

function errorHandler(jqXHR, StatusStr, ErrorStr) {
  alert(StatusStr + ' ' + ErrorStr);
}