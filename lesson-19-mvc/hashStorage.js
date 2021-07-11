function THashStorage() {
  var self = this,
      pHash = {};

  self.addValue = function(key, value) {
    pHash[key] = value;
  };

  self.getValue = function(key) {
    return pHash[key];
  };

  self.deleteValue = function(key) {
    return delete pHash[key];
  };

  self.getKeys = function() {
    return (Object.keys(pHash));
  };
}