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
    this
      .frame(result.value[iframeIndex], function() {
        this.globals.iframe = {frame, webElementId};
        callback.call(this);
      });

  });
  
  return this;
};