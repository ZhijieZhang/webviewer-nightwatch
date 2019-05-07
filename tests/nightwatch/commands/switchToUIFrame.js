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
    const webElementId = result.value[iframeIndex].ELEMENT;
    this.elementIdAttribute(webElementId, 'id', function({ value: id }) {
      this
        .frame(id, function() {
          // this variable will be used in the captureElementScreenshot command
          // to determine if we are currently inside an iframe and which iframe we are in
          this.iframe = {
            webElementId,
            id
          };
        })
        .waitForElementPresent('.App', function() {
          callback.call(this);
        });
    });
  });
  
  return this;
};