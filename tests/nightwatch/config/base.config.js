module.exports = {
  'src_folders': ['tests/nightwatch/release/release.test.js'],
  'custom_commands_path': ['tests/nightwatch/commands'],
  'custom_assertions_path': ['tests/nightwatch/assertions'],
  'page_objects_path': ['tests/nightwatch/pageObjects'],
  'globals_path': '../globals.js',

  'test_runner': 'mocha',

  'test_settings': {
    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'loggingPrefs': { 
          'browser': 'ALL'
        }
      }
    },
    'firefox': {
      'desiredCapabilities': {
        'browserName': 'firefox',
        'acceptInsecureCerts': true
      }
    }
  }
};

