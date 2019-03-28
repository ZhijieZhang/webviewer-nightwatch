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
      assert.ok(false);
    }, timeoutInMilliseconds);

    const me = this;
    this.api.getAttribute('iframe', 'id', function(result) {
      me.api
      .frame(result.value)
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
      
        [me.nameSpace, me.WVEvent], 

        function() {
          clearTimeout(me.failTimeout);
          return me.emit('complete');
        }
      );
    })
  }
}

module.exports = WaitForWVEvent;