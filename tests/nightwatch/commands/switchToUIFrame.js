const getBrowserName = require('../utils/getBrowserName');

exports.command = function(arg = 0, callback = () => {}) {
  let iframeIndex, iframeSelector;
  if (typeof arg === 'number') {
    iframeIndex = arg;
    iframeSelector = 'iframe';
  } else if (typeof arg === 'string') {
    iframeSelector = arg;
    iframeIndex = 0;
  }

  this.elements('css selector', iframeSelector, function(result) {
    const frame = result.value[iframeIndex];
    const webElementId = Object.values(frame)[0];
    const browserName = getBrowserName(this);
    
    this.globals.iframe = {
      webElementId,
      frame: arg
    };

    if (browserName === 'firefox') {
      this.frame(frame, function() {
        callback.call(this);
      });
    } else {
      this.elementIdAttribute(webElementId, 'id', function(result) {
        this.frame(result.value, function() {
          callback.call(this);
        });
      });
    }
  });
  
  return this;
};