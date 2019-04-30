const assert = require('assert');

// this test passes if docViewer.getSelectedText returns the expected value.
// we are skipping the paste part because "keys" API seems to be broken at this moment, 
// which prevents us from using ctrl/command + v to paste and check the string value
describe('Text Selection', function() {
  beforeEach(function(client, done) {
    client
      .execute(function() {
        window = window || window[0];
        window.Tools.Tool.ENABLE_AUTO_SWITCH = false;
      })
      .readerControl('setToolMode', 'TextSelect', done);
  });

  it('select and copy the text in the same page', function(client) {
    client
      .moveToElement('#pageContainer0', 100, 630)
      .mouseButtonDown('left')
      .moveToElement('#pageContainer0', 300, 680)
      .mouseButtonUp('left')
      .waitForElementVisible('[data-element="textPopup"]', 5000)
      .click('[data-element="copyTextButton"]')
      .readerControl('docViewer', 'getSelectedText', function(text) {
        assert.strictEqual(text, 'Embed & customize PDFTron WebViewer in a web app to rapidly grow\nmarket appeal, revenue streams, an');
      });
  });

  it('select and copy the text in multiple pages', function(client) {
    client
      .moveToElement('#pageContainer0', 100, 630)
      .mouseButtonDown('left')
      // wait 2 * 100ms to slow down the selection here to avoid the situation 
      // where sometimes in PDF file getSelectedText will return empty string
      // it should be okay to pause a bit here since in reality none will select text as fast as this
      .pause(100)
      .moveToElement('#pageContainer1', 300, 100)
      .pause(100)
      .mouseButtonUp('left')
      .waitForElementVisible('[data-element="textPopup"]', 5000)
      .click('[data-element="copyTextButton"]')
      .readerControl('docViewer', 'getSelectedText', function(text) {
        assert.strictEqual(text, 'Embed & customize PDFTron WebViewer in a web app to rapidly grow\nmarket appeal, revenue streams, and customer satisfaction.\nWebViewer');
      });
  });
});
