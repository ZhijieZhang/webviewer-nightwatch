const geckodriver = require("geckodriver");
module.exports = (function (settings) {
  // settings.test_workers = false;
  return settings;
})(require("./nightwatch.json"));