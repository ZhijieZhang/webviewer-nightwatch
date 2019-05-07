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

  // this.iframe is set after we successfully switched to another iframe by calling switchToUIFrame()
  // we use the information of it to determine if we are inside an iframe
  // and the location of the iframe we are in
  if (this.iframe) {
    const { webElementId, id } = this.iframe;
    
    this
      .frameParent()
      .elementIdLocation(webElementId, function({value: { x, y }}) {
        iframeX = x;
        iframeY = y;
      })
      .frame(id);
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
        .screenshot(false, function({ value: encodedScreenshot }) {
          Jimp.read(new Buffer(encodedScreenshot, 'base64')).then(function(screenshot) {
            screenshot
              .crop(elementX, elementY, elementWidth, elementHeight)
              .resize(elementWidth / devicePixelRatio, elementHeight / devicePixelRatio);
    
            callback.call(this, screenshot);
          });
      });
    });


  return this;
};