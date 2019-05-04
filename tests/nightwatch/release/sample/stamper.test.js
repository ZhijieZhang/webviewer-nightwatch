describe('Stamper', function() {
  it('stamp text and images onto various pages in a PDF document', function(client) {
    client
      .loadSample('full-apis/StamperTest')
      .getPDFBufferAfter('Done', function([
        stampedEven,
        stampedVegetable,
        stampedFishCorner,
        stampedTwentyOdd,
        stampedTwentyEven,
        stampedCorner,
        stampedHidden
      ]) {
        client
          .loadSample('viewing/viewing', {
            buffer: stampedEven
          })
          .waitForWVEvent('pageComplete')
          .readerControl('setCurrentPageNumber', 6)
          .waitForWVEvent('pageComplete')
          .assert.screenshot('#pageContainer5', 'stamper-even.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedVegetable
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'stamper-vegetable.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedFishCorner
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'stamper-fish-corner.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedTwentyOdd
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'stamper-20-odd.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedTwentyEven
          })
          .waitForWVEvent('pageComplete')
          .readerControl('setCurrentPageNumber', 6)
          .waitForWVEvent('pageComplete')
          .assert.screenshot('#pageContainer5', 'stamper-20-even.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedCorner
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'stamper-corner.test.png');

        client
          .loadSample('viewing/viewing', {
            buffer: stampedHidden
          })
          .waitForWVEvent('pageComplete')
          .assert.screenshot('.pageContainer', 'stamper-hidden.test.png');
      });
  });
});