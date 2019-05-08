const assert = require('assert');
const EventEmitter = require('events');

class WaitForWVEvent extends EventEmitter {
  constructor() {
    super();
    this.nameSpace = 'docViewer';
    this.WVEvent = null;
    this.callback = () => {};
  }

  command(...args) {
    if (args.length > 1) {
      if (args[0] === 'annotManager') {
        this.nameSpace = args[0];
        this.WVEvent = args[1];
        if (args[2] && typeof args[2] === 'function') {
          this.callback = args[2];
        }
      } else {
        this.WVEvent = args[0];
        if (args[1] && typeof args[1] === 'function') {
          this.callback = args[1];
        }
      }
    } else if (args.length === 1) {
      this.WVEvent = args[0];
    }

    const timeoutInMilliseconds = 10000000;
    this.failTimeout = setTimeout(() => {
      assert.ok(false, `${this.WVEvent} from ${this.nameSpace} didn't get triggered in ${timeoutInMilliseconds} ms`);
    }, timeoutInMilliseconds);

    this.api      
      .waitForReaderControl()
      // .timeoutsAsyncScript(timeoutInMilliseconds)
      .executeAsync(
        function(nameSpace, wvEvent, done) {
          const docViewer = window.readerControl.docViewer;
          const obj = nameSpace !== 'docViewer'
            ? docViewer.getAnnotationManager()
            : docViewer;

          obj.one(wvEvent, () => {
            done();
          });
        }, 
      
        [this.nameSpace, this.WVEvent], 

        () => {
          // using arrow function here to force the context of "this" to be the instance of this class
          // instead of the client window in this callback
          clearTimeout(this.failTimeout);
          this.callback.call(this.api);
          this.emit('complete');
        }
      );
  }
}

module.exports = WaitForWVEvent;