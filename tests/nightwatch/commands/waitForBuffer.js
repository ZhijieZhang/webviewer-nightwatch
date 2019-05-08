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
    if (args.length === 1) {
      typeof args[0] === 'function'
        ? this.callback = args[0]
        : this.timeoutInMilliseconds = args[0];
      } else if (args.length === 2) {
      this.timeoutInMilliseconds = args[0];
      this.callback = args[1];
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
    this.check(length, function(found) {
      assert.ok(found, `window.buffers doesn't have length of ${length} in ${this.timeoutInMilliseconds}ms`);
      if (!found) {
        return this.emit('complete');
      }

      if (length < 3) {
        this.api.execute(function() {
          return window.buffers;
        }, [], function({ value: buffers }) {
          this.callback.call(this, buffers);
          return this.emit('complete');
        }.bind(this));
      } else {
        this.buffers = [];

        Array
          .from({ length }, (_, index) => index)
          .forEach(function(index) {
            console.log('starting:', index);

            this.api.execute(function(index) {
              return window.buffers[index];
            }, [index], function({ value: buffer }) {
              this.buffers[index] = buffer;

              console.log('ending:', index);

              if (this.buffers.length === length) {
                this.callback.call(this, this.buffers);
                return this.emit('complete');
              }
            }.bind(this));
          }.bind(this));
      }
    });
  }

  check(length, callback) {
    const now = new Date().getTime();

    this.api
      .execute(function(length) {
        return window.buffers && window.buffers.length === length;
      }, [length], function({ value: lengthMatched }) {
        if (lengthMatched) {
          return callback.call(this, true);
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