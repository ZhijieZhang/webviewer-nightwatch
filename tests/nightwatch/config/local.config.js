const baseConfig = require('./base.config.js');
const localConfig = Object.assign(baseConfig, {
  'selenium' : {
    'start_process' : true,
    'server_path' : './bin/selenium-server-standalone-3.141.59.jar',
    'log_path' : '',
    'port' : 4444,
    'cli_args' : {
      'webdriver.chrome.driver' : './node_modules/chromedriver/bin/chromedriver',
      'webdriver.gecko.driver' : './node_modules/geckodriver/bin/geckodriver'
    }
  },
});
localConfig['test_settings'].pnacl = {
  'desiredCapabilities': {
    'browserName': 'chrome',
    'loggingPrefs': { 
      'browser': 'ALL'
    },
    'chromeOptions': {
      'args': ['user-data-dir=/Users/zhijiezhang/Library/Application Support/Google/Chrome'],
      'excludeSwitches': ['disable-component-update']
    },
  }
};
localConfig['test_settings'].default = localConfig['test_settings'].chrome;

module.exports = localConfig;