'use strict';

function TAJAXStorage(AjaxStorageKey) {
  var self = this;
  var UpdatePassword; // Переменная для хранения сгенерированного пароля при выполнении операций 'LOCKGET' и 'UPDATE'
  var lHash = {};     // Локальное хранилище

  var ajaxStorageAddress = 'http://fe.it-academy.by/AjaxStringStorage2.php'; // Ссылка на сервер, url в наших запросах

  self.checkAjaxStorage = function() {
    $.ajax({
      url: ajaxStorageAddress,
      type: 'POST',
      data: {
        f: 'READ',
        n: AjaxStorageKey
      },
      cache: false,
      success: function(data) {                   // Проверяем, есть ли в БД сервиса AjaxStringStorage2 запраш-е данные
        if (data.result.length !== 0) {           // Если есть, парсим их и сохр-м в локальном хэше
          lHash = JSON.parse(data.result);
        } else {                                  // Если таких данных нет, добавляем их в БД сервиса из лок-го хэша в виде строки JSON
          $.ajax({
            url: ajaxStorageAddress,
            type: 'POST',
            data: {
              f: 'INSERT',
              n: AjaxStorageKey,
              v: JSON.stringify(lHash)
            },
            cache: false,
            error: errorHandler
          })
        }
      },
      error: errorHandler
    });
  };

  self.lockStorage = function() { // Получаем свежие данные с сервера и блокируем на 1 минуту для последующего изменения командой UPDATE
    UpdatePassword = Math.random();

    $.ajax({
      url: ajaxStorageAddress,
      type: 'POST',
      data: {
        f: 'LOCKGET',
        n: AjaxStorageKey,
        p: UpdatePassword
      },
      cache: false,
      error: errorHandler
    })
  };

  self.updateStorage = function() { // Обн-ые данные из лок-го хэша сохр-ся на сервере с указанием того же пароля, который был сген-н при операции "LOCKGET"
    $.ajax({
      url: ajaxStorageAddress,
      type: 'POST',
      data: {
        f: 'UPDATE',
        n: AjaxStorageKey,
        p: UpdatePassword,
        v: JSON.stringify(lHash)
      },
      cache: false,
      error: errorHandler
    })
  };

  self.addValue = function(key, value) {
    lHash[key] = value;
    console.log(lHash);
    self.lockStorage();
    self.updateStorage();
  };

  self.getValue = function(key) {
    return lHash[key];
  };

  self.deleteValue = function(key) {
    if (lHash[key] !== undefined) {
      delete lHash[key];
      this.lockStorage();
      this.updateStorage();
      return true;
    } else {
      return false;
    }
  };

  self.getKeys = function() {
    return Object.keys(lHash);
  }
}