const assert = require('assert');
const EventEmitter = require('events');

class WaitForWVEvent extends EventEmitter {
  constructor() {
    super();
    this.nameSpace = 'docViewer';
    this.WVEvent = null;
    this.isWVEventTriggered = null;
    this.timeoutRetryInMilliseconds = 100;
    this.defaultTimeoutInMilliseconds = 6000;
    this.startTimeInMilliseconds = null;
  }

  command(...args) {
    if (args.length === 2) {
      this.nameSpace = args[0];
    }
    this.WVEvent = args[args.length - 1];
    this.isWVEventTriggered = false;
    this.startTimeInMilliseconds = new Date().getTime();

    const me = this;
    this.api.getAttribute('iframe', 'id', function(result) {
      me.api
      .frame(result.value)
      .executeAsync(
        function(nameSpace, wvEvent, done) {
          window = window[0] || window;
          const docViewer = window.readerControl.docViewer;
          const obj = nameSpace === 'docViewer'
            ? docViewer
            : docViewer.getAnnotationManager();

          obj.on(wvEvent, () => {
            done();
          });
        }, 
      
        [me.nameSpace, me.WVEvent], 

        function() {
          me.isWVEventTriggered = true;
        }
      );
    })

    this.check(function(eventTriggered) {
      assert.ok(eventTriggered);
      return this.emit('complete');
    }, this.defaultTimeoutInMilliseconds)
  }

  check(callback, maxTimeInMilliseconds) {
    const now = new Date().getTime();
    if(this.isWVEventTriggered) {
      callback(true);
    } else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
      setTimeout(() => {
        this.check(callback, maxTimeInMilliseconds);
      }, this.timeoutRetryInMilliseconds);
    } else {
      callback(false);
    }
  }
}

module.exports = WaitForWVEvent;