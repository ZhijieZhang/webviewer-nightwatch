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

    this.api
      .getLog('browser', function(logs) {
        let found = false;
        for (let log of logs) {
          if (log.message.includes(message)) {
            found = true;
            break;
          }
        }

        if (found) {
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
}

module.exports = WaitForConsoleLog;