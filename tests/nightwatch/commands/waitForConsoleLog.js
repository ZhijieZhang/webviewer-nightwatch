const assert = require('assert');
const EventEmitter = require('events');

class WaitForConsoleLog extends EventEmitter {
  constructor() {
    super();
    this.timeoutInMilliseconds = 15000;
    this.retryInMilliseconds = 100;
  }

  command(message) {
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
        if (this.appearAll(logs.map(log => log.message), messages)) {
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
    for (let i = 0; i < arr2.length; i++) {
      let appear = false;

      for (let j = 0; j < arr1.length; j++) {
        if (arr1[j].includes(arr2[i])) {
          arr1.splice(j, 1);
          appear = true;
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