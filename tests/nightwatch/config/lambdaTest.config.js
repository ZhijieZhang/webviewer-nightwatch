require('dotenv').config();
const baseConfig = require('./base.config.js');
const lambdaTestConfig = Object.assign(baseConfig, {
  'selenium': {
    'start_process': false,
    'server_path': '',
    'log_path': '',
    'host': 'hub.lambdatest.com',
    'port': 80,
    'cli_args': {
      'webdriver.chrome.driver': '',
      'webdriver.firefox.profile': ''
    }
  },

  // 'test_workers' : {'enabled' : true, 'workers' : 'auto'},
});
const commonCapabilities = {
  'build': 'WebViewer-Release',
  'video': true,
  'resolution': '1920x1080',
  'tunnel': true
};
const specificCapabilities = {
  chrome: {
		'platform' : 'Windows 10',
    'version' : '72.0',
    'chrome.driver' : 72.0,
    'selenium_version' : '3.13.0',
  }
};
const browserSettings = lambdaTestConfig['test_settings'];

Object.keys(browserSettings).forEach(browser => {
  browserSettings[browser].desiredCapabilities = Object.assign(
    browserSettings[browser].desiredCapabilities, 
    commonCapabilities, 
    specificCapabilities[browser]
  );
});
browserSettings.default = {
  'screenshots': {
    'enabled': true,
    'path': ''
  },
  'username': process.env.LT_USERNAME,
  'access_key': process.env.LT_ACCESS_KEY,
  'skip_testcases_on_fail': false
};

module.exports = lambdaTestConfig;