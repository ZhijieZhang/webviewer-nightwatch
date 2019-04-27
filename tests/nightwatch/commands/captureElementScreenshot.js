const Jimp = require('jimp');
const Buffer = require('buffer').Buffer;

// take a screenshot of the visible region of the element
// this command makes a few assumptions:
// 1. the UI is loaded in a iframe
// 2. the UI is 100% height and 100% width
// 3. the element argument is a element that exists in the UI iframe
exports.command = function(element, callback = () => {}) {
  let iframeX,
      iframeY,
      elementX,
      elementY,
      elementWidth,
      elementHeight;

  this
    .frameParent()
    .getLocation('iframe', function({value: { x, y }}) {
      iframeX = x;
      iframeY = y;
    })
    .switchToUIFrame()
    .getLocation(element, function({ value:{ x, y }}) {
      elementX = iframeX + x;
      elementY = iframeY + y;
    })
    .getElementSize(element, function({value: { width, height }}) {
      elementWidth = width;
      elementHeight = height;
    })
    .screenshot(false, function({ value: encodedScreenshot }) {
      Jimp.read(new Buffer(encodedScreenshot, 'base64')).then(function(screenshot) {
        screenshot.crop(
          elementX,
          elementY,
          elementWidth,
          elementHeight
        );

        callback.call(this, screenshot);
      })
    })

  return this;
}