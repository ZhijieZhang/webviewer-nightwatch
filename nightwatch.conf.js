const geckodriver = require("geckodriver");
module.exports = (function (settings) {
  settings.test_workers = false;
  settings.webdriver.server_path = geckodriver.path;
  return settings;
})(require("./nightwatch.json"));