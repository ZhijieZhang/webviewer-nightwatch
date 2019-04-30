exports.command = function(samplePath, callback = () => {}) {
  this
    .resizeWindow(1280, 960)
    .url(`http://localhost:3000/samples/${samplePath}`)
    .waitForElementVisible('iframe', 1000)
    .switchToUIFrame(function() {
      callback.call(this);
    });
};