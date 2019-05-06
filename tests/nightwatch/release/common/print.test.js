module.exports = function() {
  describe('Print', function() {
    it('show the print modal and append canvases to the container which will show during the print process', function(client) {
      client
        .readerControl('useEmbeddedPrint', false)
        .click('[data-element="menuButton"]')
        .waitForElementVisible('[data-element="menuOverlay"]')
        .click('[data-element="printButton"]')
        .waitForElementVisible('[data-element="printModal"]')
        .click('.buttons .button')
        .waitForElementPresent('#print-handler img:nth-child(3)', 10000);
    });
  });
};

