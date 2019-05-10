module.exports = (function(settings) {
  settings.selenium = {
    'start_process': false,
    'host': 'hub-cloud.browserstack.com',
    'port': 80
  };

  settings['test_settings'] = {
    'default': {
      'desiredCapabilities': {
        'os' : 'Windows',
        'os_version' : '10',
        'browserName' : 'Chrome',
        'browser_version' : '74.0',
        'resolution' : '1920x1080',
        'browserstack.local' : 'true',
        'browserstack.selenium_version' : '3.14.0',
        'browserstack.user' : 'zhijiezhang1',
        'browserstack.key' : 'QKPysHGgp6Ykq92rT9Hf',
        'loggingPrefs': { 
          'browser': 'ALL'
        }
      }
    }
  };

  return settings;
})(require('./nightwatch.json'));
