describe('Stamper', function() {
  it.only('stamp text and images onto various pages in a PDF document', function(client) {
    client
      .loadSample('full-apis/StamperTest')
      .waitForBuffer(7, function([
        stampedEvenPDFBuffer,
        stampedVegetablePDFBuffer,
        stampedFishCornerPDFBuffer,
        stampedTwentyOddPDFBuffer,
        stampedTwentyEvenPDFBuffer,
        stampedCornerPDFBuffer,
        stampedHiddenPDFBuffer
      ]) {
        client
          .loadSample('viewing/viewing', {
            buffer: stampedEvenPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('setCurrentPageNumber', 6)
          .waitForWVEvent('pageComplete')
          .assert.screenshot('#pageContainer5', 'stamper-even.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedVegetablePDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('.pageContainer', 'stamper-vegetable.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedFishCornerPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('.pageContainer', 'stamper-fish-corner.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedTwentyOddPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('.pageContainer', 'stamper-20-odd.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedTwentyEvenPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .readerControl('setCurrentPageNumber', 6)
          .waitForWVEvent('pageComplete')
          .assert.screenshot('#pageContainer5', 'stamper-20-even.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedCornerPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('.pageContainer', 'stamper-corner.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedHiddenPDFBuffer
          })
          .waitForWVEvent('pageComplete')
          .waitForElementNotVisible('[data-element="progressModal"]')
          .assert.screenshot('.pageContainer', 'stamper-hidden.test.png');
      });
  });
});