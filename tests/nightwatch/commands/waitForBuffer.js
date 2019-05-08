const assert = require('assert');
const EventEmitter = require('events');

class WaitForBuffer extends EventEmitter {
  constructor() {
    super();
    this.timeoutInMilliseconds = 10000;
    this.retryInMilliseconds = 100;
  }

  // execute the callback function with a PDF buffer array after the length of the array matches the given length
  // this command is specifically targeted to be used for testing console-based samples
  command(length, ...args) {
    let callback = () => {};
        
    if (args.length === 1) {
      typeof args[0] === 'function'
        ? callback = args[0]
        : this.timeoutInMilliseconds = args[0];
      } else if (args.length === 2) {
      this.timeoutInMilliseconds = args[0];
      callback = args[1];
    }

    // so far all the console-based samples use a function saveBufferAsPDFDoc to save the PDF to disk after the sample is finished
    // however if the file is saved to the disk then there's nothing more we can do with it
    // so we override the function to attach the buffer to the window and grab it later
    this.api.execute(
      function () {
        window.saveBuffer = function (buffer, filename, mimeType) {
          (window.buffers = window.buffers || []).push({ buffer, mimeType });
        };
      }
    );
    this.startTime = new Date().getTime();    
    this.check(length, function(found, buffers) {
      assert.ok(found, `window.buffers doesn't have length of ${length} in ${this.timeoutInMilliseconds}ms`);
      callback.call(this.api, buffers);

      return this.emit('complete');
    });
  }

  check(length, callback) {
    const now = new Date().getTime();

    this.api
      .execute(function(length) {
        if (window.buffers && window.buffers.length === length) {
          return window.buffers;
        }

        return false;
      }, [length], function({ value }) {
        if (Array.isArray(value)) {
          return callback.call(this, true, value);
        } else if (now - this.startTime < this.timeoutInMilliseconds) {
          return setTimeout(function() {
            this.check(length, callback);
          }.bind(this), this.retryInMilliseconds);
        } else {
          return callback.call(this, false);
        }
      }.bind(this));
  }
}

module.exports = WaitForBuffer;