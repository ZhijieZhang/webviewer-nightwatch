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
    console.log(result.value);
    const webElementId = Object.values(result.value[iframeIndex])[0];
    this.elementIdAttribute(webElementId, 'id', function({ value: id }) {
      this
        // .frame(id, function() {
        .frame(result.value[iframeIndex], function() {
          this.globals.iframe = {webElementId, id};
          callback.call(this);
        });
    });
  });
  
  return this;
};