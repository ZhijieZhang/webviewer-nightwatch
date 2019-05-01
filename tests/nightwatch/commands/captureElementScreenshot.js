const Jimp = require('jimp');
const Buffer = require('buffer').Buffer;

// take a screenshot of the visible region of the element
// this command makes a few assumptions based on the type of the element argument
// if element is a string, then it assumes:
//  1. current frame is the UI iframe
//  2. the UI is loaded in a iframe
//  3. the UI is 100% height and 100% width
//  4. we are going to take a screenshot of an element in the UI iframe and it exists
// if element is an object, then it assumes:
//  1. the element has the shape of: { selector }
//  2. we are going to take a screenshot of an element in the current frame
exports.command = function(element, callback = () => {}) {
  let iframeX,
      iframeY,
      elementX,
      elementY,
      elementWidth,
      elementHeight;

  if (typeof element === 'string') {
    this
      .frameParent()
      .getLocation('iframe', function({value: { x, y }}) {
        iframeX = x;
        iframeY = y;
      })
      .switchToUIFrame();
  } else if (typeof element === 'object') {
    iframeX = 0;
    iframeY = 0;
    element = element.selector;
  }

  this
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
      });
    });

  return this;
};