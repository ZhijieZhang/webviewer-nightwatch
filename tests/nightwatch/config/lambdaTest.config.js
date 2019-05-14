const baseConfig = require('./base.config.js');
const lambdaTestConfig = Object.assign(baseConfig, {
  'selenium' : {
    'start_process' : false,
    'server_path' : '',
    'log_path' : '',
    'host' : 'hub.lambdatest.com',
    'port' : 80,
    'cli_args' : {
      'webdriver.chrome.driver' : '',
      'webdriver.ie.driver' : '',
      'webdriver.firefox.profile' : ''
    }
  },
});
const commonCapabilities = {
  'launch_url': 'https://lambdatest.com',
  'selenium_port': 80,
  'selenium_host': 'hub.lambdatest.com',
  'silent': false,
  'screenshots': {
    'enabled': true,
    'path': ''
  },
  'platform': 'Windows 10',
  'resolution': '1920x1080',
  'username': process.env.LT_USERNAME,
  'access_key': process.env.LT_ACCESS_KEY,
  'selenium_version': '3.13.0',
  'tunnel': true,
};
const specificCapabilities = {
  chrome: {
    'version': '73.0',
    'chrome.driver': 73.0
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
lambdaTestConfig['test_settings'].default = lambdaTestConfig['test_settings'].chrome;

console.log(lambdaTestConfig['test_settings'].default);


module.exports = lambdaTestConfig;
