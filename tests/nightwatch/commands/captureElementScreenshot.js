const Jimp = require('jimp');
const Buffer = require('buffer').Buffer;

// take a screenshot of the visible region of the element inside the current frame
exports.command = function(element, callback = () => {}) {
  let iframeX,
      iframeY,
      elementX,
      elementY,
      elementWidth,
      elementHeight;

  if (this.globals.iframe) {
    const { webElementId, frame } = this.globals.iframe;
    
    this
      .frameParent()
      .elementIdLocation(webElementId, function({value: { x, y }}) {
        iframeX = x;
        iframeY = y;
      })
      .switchToUIFrame(frame);
  } else {
    iframeX = 0;
    iframeY = 0;
  }

  this
    .execute(function() {
      return window.devicePixelRatio;
    }, [], function({ value: devicePixelRatio }) {
      this
        .getLocation(element, function({ value:{ x, y }}) {
          elementX = (iframeX + x) * devicePixelRatio;
          elementY = (iframeY + y) * devicePixelRatio;
        })
        .getElementSize(element, function({value: { width, height }}) {
          elementWidth = width * devicePixelRatio;
          elementHeight = height * devicePixelRatio;
        })
        // switching to parent frame isn't technically necessary, this is a workaround for
        // geckodriver as it takes screenshot in the current frame, not the top one: https://github.com/mozilla/geckodriver/issues/936
        // we will switch back to the frame we are currently in after screenshot has been captured
        .frameParent()
        .screenshot(false, function({ value: encodedScreenshot }) {
          Jimp.read(new Buffer(encodedScreenshot, 'base64')).then(function(screenshot) {
            screenshot
              .crop(elementX, elementY, elementWidth, elementHeight)
              .resize(elementWidth / devicePixelRatio, elementHeight / devicePixelRatio);
    
            if (this.globals.iframe) {
              this.switchToUIFrame(this.globals.iframe.frame, function() {
                callback.call(this, screenshot);
              });
            } else {
              callback.call(this, screenshot);
            }
          }.bind(this));
      });
    });


  return this;
};