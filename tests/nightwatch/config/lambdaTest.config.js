const config = {
  'src_folders': ['tests/nightwatch/release/release.test.js'],
  'custom_commands_path': ['tests/nightwatch/commands'],
  'custom_assertions_path': ['tests/nightwatch/assertions'],
  'page_objects_path': ['tests/nightwatch/pageObjects'],
  'globals_path': '../globals.js',

  'test_runner': 'mocha',

  'selenium': {
    'start_process': false,
    'server_path': '',
    'log_path': '',
    'host': 'hub.lambdatest.com',
    'port': 80,
    'cli_args': {
      'webdriver.chrome.driver': '',
      'webdriver.ie.driver': '',
      'webdriver.firefox.profile': ''
    }
  },

  'test_workers': { 'enabled': true, 'workers': 'auto' },

  'test_settings': {
    'default': {
      'request_timeout_options': {
        'timeout': 1000000
      },
      // 'launch_url': 'https://lambdatest.com',
      // 'selenium_port': 80,
      // 'selenium_host': 'hub.lambdatest.com',
      'silent': false,
      'screenshots': {
        'enabled': true,
        'path': ''
      },
      'username': '',
      'access_key': '',

      'skip_testcases_on_fail': false,

      'desiredCapabilities': {
        'build': 'Nightwatch-Selenium-Sample',
        'visual': true,
        'video': true,
        'console': true,
        'network': true
      }
    },

    'chrome': {
      'desiredCapabilities': {
        'platform': 'Windows 8',
        'browserName': 'chrome',
        'version': '71.0',
        'resolution': '1920x1080',
        'tunnel': true
      }
    },
    'safari': {
      'desiredCapabilities': {
        'platform': 'macos 10.13',
        'browserName': 'safari',
        'version': '11.0'
      }
    },
    'firefox': {
      'desiredCapabilities': {
        'platform': 'win10',
        'browserName': 'firefox',
        'version': '60'
      }
    },
    'edge': {
      'desiredCapabilities': {
        'platform': 'Windows 10',
        'browserName': 'MicrosoftEdge',
        'version': '17.0'
      }
    }
  }
};

if (process.env.LT_USERNAME) {
  config['test_settings']['default']['username'] = process.env.LT_USERNAME;
}

if (process.env.LT_ACCESS_KEY) {
  config['test_settings']['default']['access_key'] = process.env.LT_ACCESS_KEY;
}

module.exports = config;
// if (process.env.SELENIUM_HOST) {
//   config.selenium.host = process.env.SELENIUM_HOST;
// }
// if (process.env.SELENIUM_PORT) {
//   config.selenium.host = process.env.SELENIUM_PORT;
// }
