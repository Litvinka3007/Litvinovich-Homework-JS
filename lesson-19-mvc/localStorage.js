'use strict';

function TLocalStorage(localStorageKey) {
  var self = this;
  var lsHash = {};

  self.Reset = function() {
    lsHash = {};
    var hashFromStorage = localStorage.getItem(localStorageKey);
    if (hashFromStorage) {
      lsHash = JSON.parse(hashFromStorage);
    }
    return lsHash;
  };

  self.addValue = function(key, value) {
    lsHash[key] = value;
    var hashFromStorage = localStorage.getItem(localStorageKey); // Получаем из LS сохранённые ранее данные
    if (hashFromStorage !== null) { // Если в LS что-то есть,
      localStorage.removeItem(localStorageKey); // то удаляем значение с указанным ключом
      localStorage.setItem(localStorageKey, JSON.stringify(lsHash)); // и сохраняем новое значение с этим ключом в формате JSON
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(lsHash)); // Если в LS ничего нет, просто сохраняем новое значение с указанным ключом в формате JSON
    }
  };

  self.getValue = function(key) { // Получаем из хранилища данные с указанным ключом
    return lsHash[key];
  };

  self.deleteValue = function(key) {
    var hashFromStorage = localStorage.getItem(localStorageKey);
    if (lsHash[key] !== undefined) { // Если значение с запрошенным ключом есть в хранилище, удаляем его
      delete lsHash[key];
      if (hashFromStorage !== null) { // Если значение с запрошенным ключом есть в LS, удаляем его
        localStorage.removeItem(localStorageKey);
        localStorage.setItem(localStorageKey, JSON.stringify(lsHash)); // Сохраненяем в LS обновлённое хранилище в формате JSON
      }
      return true;
    } else {
      return false;
    }
  };

  self.getKeys = function() { // Получаем данные из хранилища
    return Object.keys(lsHash);
  };
}