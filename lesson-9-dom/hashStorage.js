function THashStorage() {
  this.storage = {};
}

THashStorage.prototype.addValue = function(key, value) {
  this.storage[key] = value;
};

THashStorage.prototype.getValue = function(key) {
  return this.storage[key];
};

THashStorage.prototype.deleteValue = function(key) {
  if (key in this.storage) {
    return delete this.storage[key];
  } else {
    return false;
  }
};

THashStorage.prototype.getKeys = function() {
  return Object.keys(this.storage);
};