const assert = require('assert');
const EventEmitter = require('events');
const getBrowserName = require('../utils/getBrowserName');

class WaitForConsoleLog extends EventEmitter {
  constructor() {
    super();
    this.timeoutInMilliseconds = 15000;
    this.retryInMilliseconds = 100;
    this.allLogMessages = [];
  }

  command(message, timeoutInMilliseconds) {
    const browserName = getBrowserName(this.api);
    // currently the log interface has not been decided in W3C WebViewer Spec so there's no way to get the logs when using 
    // geckodriver: https://github.com/mozilla/geckodriver/issues/330
    // edgedriver: https://docs.microsoft.com/en-us/microsoft-edge/webdriver
    if (browserName !== 'chrome') {
      console.log('waitForConsoleLog skipped for drivers other than the chrome driver');
      return this.emit('complete');
    }

    if (timeoutInMilliseconds) {
      this.timeoutInMilliseconds = timeoutInMilliseconds;
    }

    this.startTime = new Date().getTime();    
    this.check(message, function(found) {
      assert.ok(found, `${message} didn't logged in console in ${this.timeoutInMilliseconds} ms`);

      return this.emit('complete');
    });
  }

  check(message, callback) {
    const now = new Date().getTime();
    const messages = typeof message === 'string' ? [message] : [...message];

    this.api
      .getLog('browser', function(logs) {
        // it seems that this API doesn't return the all log history but only returns logs that were logged between
        // two calls, since we need to get the entire logs we store it in a variable
        this.allLogMessages.push(...logs.map(log => log.message));

        if (this.appearAll(this.allLogMessages, messages)) {
          return callback.call(this, true);
        } else if (now - this.startTime < this.timeoutInMilliseconds) {
          return setTimeout(function() {
            this.check(message, callback);
          }.bind(this), this.retryInMilliseconds);
        } else {
          return callback.call(this, false);
        }
      }.bind(this));
  }

  // returns if all strings in arr2 can be a substring of an string in arr1
  // the string will be removed in arr1 if it contains a string in arr2
  // For example: ['Done a'], ['Done'] => true
  //              ['Done a'], ['Done', 'Done a'] => false
  appearAll(arr1, arr2) {
    let j = 0;
    for (let i = 0; i < arr2.length; i++) {
      let appear = false;

      for (; j < arr1.length; j++) {
        if (arr1[j].includes(arr2[i])) {
          appear = true;
          j++;
          break;
        }  
      }

      if (!appear) {
        return false;
      }
    }

    return true;
  }
}

module.exports = WaitForConsoleLog;