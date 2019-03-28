const assert = require('assert');
const EventEmitter = require('events');

class WaitForWVEvent extends EventEmitter {
  constructor() {
    super();
    this.nameSpace = 'docViewer';
    this.WVEvent = null;
  }

  command(...args) {
    if (args.length === 2) {
      this.nameSpace = args[0];
    }
    this.WVEvent = args[args.length - 1];

    const timeoutInMilliseconds = 6000;
    this.failTimeout = setTimeout(() => {
      assert.ok(false, `${this.WVEvent} from ${this.nameSpace} didn't get triggered in ${timeoutInMilliseconds}`);
    }, timeoutInMilliseconds);

    this.api      
      .timeoutsAsyncScript(timeoutInMilliseconds)
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
      
        [this.nameSpace, this.WVEvent], 

        () => {
          // using arrow function here to force the context of "this" to be the instance of this class
          // instead of the client window in this callback
          clearTimeout(this.failTimeout);
          return this.emit('complete');
        }
      );
  }
}

module.exports = WaitForWVEvent;