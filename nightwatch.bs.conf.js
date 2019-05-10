module.exports = (function(settings) {
  settings.selenium = {
    'start_process': false,
    'host': 'hub-cloud.browserstack.com',
    'port': 80
  };

  settings['test_settings'] = {
    'default': {
      'desiredCapabilities': {
        'browserstack.user': 'zhijiezhang1',
        'browserstack.key': 'QKPysHGgp6Ykq92rT9Hf',
        'browserstack.local': true,
        'browserstack.debug': true,
        'browserstack.video': true,
        'os': 'Windows',
        'os_version': '10',
        'browserName': 'Chrome',
        'browser_version': '74.0',
        'resolution': '1280x1024',
        'loggingPrefs': { 
          'browser': 'ALL'
        }
      }
    }
  };

  return settings;
})(require('./nightwatch.json'));
