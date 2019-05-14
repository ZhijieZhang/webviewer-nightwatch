const assert = require('assert');
const EventEmitter = require('events');

class WaitForReaderControl extends EventEmitter {
  constructor() {
    super();
    this.timeoutInMilliseconds = 10000;
    this.retryInMilliseconds = 100;
  }

  command(callback) {
    this.startTime = new Date().getTime();    

    this.check(function(found) {
      assert.ok(found, `window.readerControl isn't available in ${this.timeoutInMilliseconds}ms`);
      callback.call(this);

      return this.emit('complete');
    });
  }

  check(callback) {
    const now = new Date().getTime();

    this.api
      .execute(function() {
        return !!window.readerControl;
      }, [], function({ value: hasReaderControl }) {
        if (hasReaderControl) {
          return callback.call(this, true);
        } else if (now - this.startTime < this.timeoutInMilliseconds) {
          return setTimeout(function() {
            this.check(callback);
          }.bind(this), this.retryInMilliseconds);
        } else {
          return callback.call(this, false);
        }
      }.bind(this));
  }
}

module.exports = WaitForReaderControl;