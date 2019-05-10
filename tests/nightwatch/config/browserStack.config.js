const baseConfig = require('./base.config.js');
const browserStackConfig = Object.assign(baseConfig, {
  'selenium': {
    'start_process': false,
    'host': 'hub-cloud.browserstack.com',
    'port': 80
  }
});
const commonCapabilities = {
  'os': 'Windows',
  'os_version': '10',
  'resolution': '1920x1080',
  'browserstack.local': 'true',
  'browserstack.selenium_version': '3.14.0',
  'browserstack.user': 'zhijiezhang1',
  'browserstack.key': 'QKPysHGgp6Ykq92rT9Hf',
};
const specificCapabilities = {
  chrome: {
    'browser_version': '74.0',
  }
};
const browserSettings = browserStackConfig['test_settings'];

Object.keys(browserSettings).forEach(browser => {
  browserSettings[browser].desiredCapabilities = Object.assign(
    browserSettings[browser].desiredCapabilities, 
    commonCapabilities, 
    specificCapabilities[browser]
  );
});
browserStackConfig['test_settings'].default = browserStackConfig['test_settings'].chrome;

console.log(browserStackConfig);

module.exports = browserStackConfig;
